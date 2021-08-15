import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: UserModel;
  token: string;
  auditDate: null;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public ensure_tenant_selected(): Promise<boolean> {
    return this.http.get(`/api/ensure_tenant_selected/?next=/fo/`).toPromise() as Promise<boolean>;
  }

  public get_user(): Observable<UserModel> {
    return this.http.get<UserModel>(`/shadowinn/api/user/ `);
  }

  public get_user_token(): string | null {
    if (!this.user) {
      return null;
    }
    return this.user['token'];
  }

  public ensureAuth(): Observable<UserModel> {
    const instance_id = this.cookieService.get('instance_id');
    const ob = new EventEmitter<UserModel>();
    this.get_user().subscribe(res => {
      this.user = res;
      this.token = res.token;
      if (instance_id) {
        this.user.hasInstance = true;
      } else {
        this.user.hasInstance = false;
      }
      ob.next(this.user);
    }, err => {
      const baserUrl = window.location.origin;
      window.open(`${baserUrl}/account/login/?next=${window.location.href.split(baserUrl)[1]}`, '_self');
    });
    return ob;
  }

  public get_user_instances(userID, name?): Observable<any> {
    let query = new HttpParams().set('user_id', userID);
    if (name) {
      query = query.set('name', name);
    }

    return this.http.get(`/api/clients/`, { params: query });
  }

  getAuditDate() {
    return this.http.get('/shadowinn/api/auditdate/');
  }

  getUserPermissions() {
    const headers = new HttpHeaders();
    headers.set('authorization', `bearer ${this.token}`);
    return this.http.get('/api/core/permissions/');
  }

  setLanguage(lang): Observable<any> {
    const body = {
      language_code: lang
    };

    let headers = new HttpHeaders();
    headers = headers.set('X-CSRFToken', this.cookieService.get('csrftoken'));
    return this.http.post('/core/setlanguage/', body, { headers: headers });
  }
}
