import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaincompanyService {

  constructor(private http: HttpClient) { }

  get mainCompany(): Observable<any> {
    return this.http.get('/api/core/maincompany/?include[]=logo');
  }
}
