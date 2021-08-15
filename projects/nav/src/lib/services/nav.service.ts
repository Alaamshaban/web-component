import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { NavDataModel, NavItemModel } from '../models/nav.model';
import { UserModel } from '../models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private userSubject: Subject<UserModel> = new Subject();
  private permissionsSubject: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private navData = new BehaviorSubject<NavDataModel>({
    title: '',
    showSideNav: true,
    sideNav: [],
    path: '',
    isSideMode: true,
    isOpenedByDefault: false,
    disableToggleWhenLinkClicked: true,
    apps: [],
  });
  private navData$ = this.navData.asObservable();
  path = new BehaviorSubject({ path: '', showIframe: false });
  private isMobileResolution: BehaviorSubject<boolean> = new BehaviorSubject(window.innerWidth < 767 ? true : false);
  private sidenav: MatSidenav;

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private http: HttpClient,
    private translateService: TranslateService) {
    this.setUserPermissions();
  }

  public getNavData(): Observable<NavDataModel> {
    return this.navData$;
  }

  public getPages(): any[] {
    const pages = new Array();
    this.getNavData().subscribe(res => {
      res.sideNav.forEach(nav => {
        nav.pages.forEach((page, index) => {
          nav.pages[index].parent = nav.title;
        });
        pages.push(...nav.pages);
      });
    });
    return pages;
  }

  public setNavData(navData: NavDataModel) {
    this.navData.next(navData);
  }

  changeInstance(instanceId: number) {
    let headers = new HttpHeaders();
    headers = headers.set('X-CSRFToken', this.cookieService.get('csrftoken'));
    return this.http.post(`/api/clients/${instanceId}/select/`, {}, { headers: headers });
  }

  setUser(user: UserModel) {
    localStorage.setItem('token', user['token']);
    this.userSubject.next(user);
  }

  getUser(): Observable<UserModel> {
    return this.userSubject;
  }

  getVersion() {
    const timeStamp = + new Date();
    const baseUrl = window.location.origin;
    const currentUrl = window.location.href.split(baseUrl)[1];
    const app = window.location.href.split(baseUrl)[1].slice(0, currentUrl.indexOf('/#'));
    const versionUrl = baseUrl + app + '/version?' + `ts=${timeStamp}`;
    return this.http.get(versionUrl, { responseType: 'text' });
  }

  setUserPermissions() {
    this.authService.getUserPermissions().subscribe(
      permissions => {
        this.permissionsSubject.next(permissions as string[]);
      }
    );
  }

  getUserPermissions(): Observable<string[]> {
    return this.permissionsSubject;
  }

  makePageSelected(pages, item) {
    pages.forEach((page, i) => {
      if (page.title === item.title) {
        pages[i].selected = true;
      } else {
        pages[i].selected = false;
      }
    });
  }

  goToPath(item: NavItemModel, parent?: String) {
    // make path selected
    if (parent) {
      this.getPages().forEach(page => {
        if (page.pages && page.pages.length > 0) {
          this.makePageSelected(page.pages, item);
        }
        this.makePageSelected(this.getPages(), item);
      });
    }

    // check if path will open in iframe or not
    if (item.type === 'TS') {
      this.getNavData().subscribe(res => {
        res.showIframe = false;
      });
      this.path.next({ path: item.path, showIframe: false });
    } else {
      if (item.confirm) {
        const applyAction = confirm(this.translateService.instant('confirmation_messg'));
        if (applyAction) {
          this.getNavData().subscribe(res => {
            res.src = item.path;
            res.showIframe = true;
          });
        }
      } else {
        this.getNavData().subscribe(res => {
          res.showIframe = true;
          res.src = item.path;
        });
      }
      this.path.next({ path: item.path, showIframe: true });
    }
  }

  getIsMobileResolution(): Observable<boolean> {
    return this.isMobileResolution;
  }

  setWindowResolution(size) {
    if (size < 767) {
      this.isMobileResolution.next(true);
    } else {
      this.isMobileResolution.next(false);
    }
  }

  setSidenavComponent(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  closeSideNav() {
    return this.sidenav.close();
  }

  toggleSideNav() {
    this.sidenav.toggle();
  }

}
