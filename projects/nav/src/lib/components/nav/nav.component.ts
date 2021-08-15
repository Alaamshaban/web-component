import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, Input, NgZone, Output, Renderer2, Inject, HostListener, OnChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth.service';
import { NavService } from '../../services/nav.service';
import { MenuBackendService } from '../../services/menu-backend.service';
import { NavDataModel, NavItemModel } from '../../models/nav.model';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MaincompanyService } from '../../services/maincompany.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { UserModel } from '../../models/user.model';
import { DOCUMENT } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'cloudinn-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnChanges, OnDestroy {
  public userMenu: NavItemModel[] = [];
  @ViewChild('sidenav') sidenav: MatSidenav;
  @Input() navData: NavDataModel;
  @Input() requestToUpdateAuditDate$;
  @Output() goToPath = new EventEmitter<any>();
  @Output() getUser = new EventEmitter<UserModel>();
  @Output() changeLanguage = new EventEmitter<string>();
  @Output() getAuditDate = new EventEmitter<string>();
  @Output() getUserPermissions = new EventEmitter<string[]>();
  currentAppVersion;
  public apps: NavItemModel[] = [];
  private subs = new Subscription();
  public instance;
  dialogOpened = false;
  isPopup = false;
  public text;
  public Copied;
  public userData;
  public lang;
  public languages = [
    { 'code': 'en-us', 'name': 'English', 'country': 'gb' },
    { 'code': 'ar', 'name': 'العربية', 'country': 'eg' },
    { 'code': 'es', 'name': 'Spanish', 'country': 'es' },
    { 'code': 'fr', 'name': 'French', 'country': 'fr' },
    { 'code': 'nl', 'name': 'Dutch', 'country': 'nl' },
    { 'code': 'nl-be', 'name': 'Dutch (BE)', 'country': 'be' },
    { 'code': 'pt', 'name': 'Portuguese (PT)', 'country': 'pt' },
  ];
  public insatnce_logo;
  isMobileResolution$: Observable<boolean>;
  private _document?: Document;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.navService.setWindowResolution(event.target.innerWidth);
  }
  constructor(
    public navService: NavService,
    public menuService: MenuBackendService,
    public auth: AuthService,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private translateService: TranslateService,
    private _router: Router,
    private route: ActivatedRoute,
    private mainCompany: MaincompanyService,
    public snackBar: MatSnackBar,
    private _renderer2: Renderer2,
    private zone: NgZone,
    @Inject(DOCUMENT) _document?: any
  ) {
    this.isMobileResolution$ = this.navService.getIsMobileResolution();
    this._document = document as Document;
  }

  ngOnInit() {
    const pressed = [];
    const keyCodes = '174038';
    document.onkeyup = (e) => {
      // tslint:disable-next-line: deprecation
      pressed.push(e.keyCode);
      pressed.splice(-keyCodes.length - 1, pressed.length - keyCodes.length);
      if (pressed.join('').includes(keyCodes)) {
        this.copyLink();
        while (pressed.length) {
          pressed.pop();
        }
      }
    };
    // listener on instance_id in cookie every 20 sec
    setInterval(() => {
      const instance_id = this.cookieService.get('instance_id');
      if (!instance_id && !this.dialogOpened) {
        this.zone.run(() => {
          this.openDialog();
        });
      }
    }, 20000);
    // listener on app version every 2 min
    setInterval(() => {
      this.getAppVersion();
    }, 120000);
    // listener on user has logged out every 10 sec
    setInterval(() => {
      if (!this.cookieService.get('user_id')) {
        const baserUrl = window.location.origin;
        window.open(`${baserUrl}/account/login/?next=${window.location.href.split(baserUrl)[1]}`, '_self');
      }
    }, 10000);

    this.route.queryParams.pipe(filter(p => p.pop)).subscribe(p => {
      (p.pop === 1 || p.pop === '1') ? this.isPopup = true : this.isPopup = false;
    });
    this.route.queryParams.subscribe(p => {
      if (p['tenant_id']) {
        const currect_instance = this.cookieService.get('instance_id');
        if (p['tenant_id'] !== currect_instance) {
          this.navService.changeInstance((p['tenant_id'])).subscribe(res => {
            window.location.reload();
          }
          );
        }
      }
    });

    this.navService.path.subscribe(path => {
      this.goToPath.emit(path);
    });

    this.navService.getUser().subscribe(user => {
      this.getUser.emit(user);
    });

    this.navService.getUserPermissions().subscribe(permissions => {
      this.getUserPermissions.emit(permissions);
    });

    this.instance = this.cookieService.get('instance_name');
    this.lang = this.cookieService.get('django_language');
    const index = this.languages.findIndex(l => l['code'] === this.lang);
    this.set_lang(this.lang, index);
    this.ensureUserAuth();
    if (this.cookieService.get('instance_id')) {
      this.subs.add(this.mainCompany.mainCompany.subscribe(res => {
        this.insatnce_logo = res.main_companies[0].logo;
      }));

      this.requestAuditDate();
      this.subs.add(this.menuService.getMainMenu().subscribe(
        (menuData: NavItemModel[]) => {
          this.apps = menuData;
        }
      ));
    }
  }

  ngOnChanges() {
    if (this.requestToUpdateAuditDate$) {
      this.requestToUpdateAuditDate$.subscribe(res => {
        if (res.update) {
          this.requestAuditDate();
        }
      });
    }
  }

  requestAuditDate() {
    this.subs.add(this.auth.getAuditDate().subscribe(res => {
      this.auth.auditDate = res['audit_date'];
      this.getAuditDate.emit(res['audit_date']);
    }));
  }
  logOut() {
    localStorage.removeItem('token');
  }

  ensureUserAuth() {
    this.subs.add(this.auth.ensureAuth().subscribe((userRes) => {
      if (userRes.hasInstance) {
        this.navService.setUser(userRes);
        this.setUserMenu();
        this.userData = JSON.parse(atob(userRes.token.split('.')[1]));
      } else {
        this.openDialog();
      }
      this.setNickelledLauncher();
      this.setUserGuidingLauncher();
    }));
  }

  setNickelledLauncher() {
    if (this.auth.user) {
      // nickelled Integration ..
      const script = this._renderer2.createElement('script');
      script.type = `text/javascript`;
      script.text = `
      (function () {
        var NickelledLaunchers = window.NickelledLaunchers = NickelledLaunchers || {
          setUser: function (u) {
            this.userData = u
          }
        };
        NickelledLaunchers.userData = {
          appId: "cloudinn.net-421641",
          userId: ${this.auth.user.id}
        };
        (function () {
          var s, f; s = document.createElement("script");
          s.async = true; s.src = "https://cdn.nickelled.com/launchers-2.min.js";
          f = document.getElementsByTagName("script")[0]; f.parentNode.insertBefore(s, f);
        })();
      })();
    `;
      this._renderer2.appendChild(this._document.body, script);
    }
  }

  setUserGuidingLauncher() {
    if (this.auth.user) {
      // userguiding Integration ..
      const script = this._renderer2.createElement('script');
      script.type = `text/javascript`;
      script.text = `
      (function(g,u,i,d,e,s){g[e]=g[e]||[];var f=u.getElementsByTagName(i)[0];var k=u.createElement(i);k.async=true;k.src='https://static.userguiding.com/media/user-guiding-'+s+'-embedded.js';f.parentNode.insertBefore(k,f);if(g[d])return;var ug=g[d]={q:[]};ug.c=function(n){return function(){ug.q.push([n,arguments])};};var m=['previewGuide','finishPreview','track','identify','triggerNps','hideChecklist','launchChecklist'];for(var j=0;j<m.length;j+=1){ug[m[j]]=ug.c(m[j]);}})(window,document,'script','userGuiding','userGuidingLayer','991680452ID');
      (function () {
        window.userGuiding.identify(${this.auth.user.id});
      })();
      `;
      this._renderer2.appendChild(this._document.body, script);
    }
  }

  set_lang(language, index) {
    this.auth.setLanguage(language).subscribe(res => {
      if (language.includes('-')) {
        language = `${language.slice(0, language.indexOf('-'))}
        _${language.slice(language.indexOf('-') + 1, language.length).toUpperCase()}`;
      }
      this.translateService.use(language);
      this.changeLanguage.emit(language);
      const selectedlang = this.languages[index];
      this.languages.splice(index, 1);
      this.languages.unshift(selectedlang);
    });
  }

  getAppVersion() {
    this.navService.getVersion().subscribe(res => {
      if (!this.currentAppVersion) {
        this.currentAppVersion = res;
      }
      if (res !== this.currentAppVersion) {
        this.currentAppVersion = res;
        this.openAlert();
      }
    });
  }

  openAlert() {
    const snackBarRef = this.snackBar.open('There is a new version available now, please reload to get it', 'reload', {
      duration: 0,
      horizontalPosition: 'end',
      panelClass: ['alert-snackbar']
    });
    snackBarRef.onAction().subscribe(() => {
      window.location.reload();
    });
  }

  setUserMenu() {
    if (this.auth.user) {
      this.userMenu = [{
        title: 'Profile',
        path: `/auth/user/${this.auth.user.id}/?reset=True&frameless=1`,
        type: 'HMS',
        parent: 'Reservation'
      },
      {
        title: 'Change Password',
        path: `/auth/user/${this.auth.user.id}/password_change/?reset=True&frameless=1`,
        type: 'HMS',
        parent: 'Reservation'
      },
      {
        title: 'Account Security',
        path: `/account/two_factor/?reset=True&frameless=1`,
        type: 'HMS',
        parent: 'Reservation'
      }];
    }

  }

  copyLink() {
    this.setCopiedLink();
    if (this.userData.is_staff) {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = this.text;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      alert(this.Copied + this.text);
    }
  }

  setCopiedLink(): void {
    this.Copied = 'Copied successfully';
    this.text = `
    URL: ${window.location.href}?tenant_id=${this.cookieService.get('instance_id')}
    Instance id: ${this.cookieService.get('instance_id')}
    Instance name: ${this.cookieService.get('instance_name')}`;
  }

  isTouchScreen() {
    return ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.maxTouchPoints > 0);
  }

  closeSidenav() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  navigateX(item: NavItemModel) {
    const queryParams = [];
    for (const key in item.queries) {
      if (item.queries.hasOwnProperty(key)) {
        queryParams.push(item.queries);
      }
    }
    this._router.navigate([item.path], {
      queryParams: queryParams[0],
    });
  }

  openDialog() {
    this.dialogOpened = true;
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '50%',
      minHeight: 'calc(60vh - 60px)',
      maxHeight: 'calc(90vh-90px)',
      height: 'auto',
      panelClass: 'instance-dialog',
      data: {
        active_instance: this.instance
      },
      autoFocus: false,
      disableClose: false
    });
    this.subs.add(dialogRef.afterClosed().subscribe(result => {
      this.dialogOpened = false;
      if (result) {
        this.navService.changeInstance(result.id).subscribe(res => {
          window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
          window.location.reload();
        });
      }
    }));
  }

  navigateToLink() {
    if (!this.navData.disableToggleWhenLinkClicked) {
      this.navService.toggleSideNav();
    } else {
      return;
    }
  }

  toggleSidenav() {
    if (this.navData.sideNavType === 'default') {
      this.navService.setSidenavComponent(this.sidenav);
    }
    this.zone.run(() => {
      this.navService.toggleSideNav();
    });
  }

  _navigate(route: string) {
    this.sidenav.close();
    // this.navigate.next(route);
  }

  hasPermission(currentPermissions: string[]): Observable<boolean> {
    let hasPermission = false;
    return this.navService.getUserPermissions().pipe(map(permissions => {
      for (let i = 0; i < currentPermissions.length; i++) {
        if (permissions[currentPermissions[i]] !== undefined) {
          hasPermission = true;
          break;
        }
      }
      return hasPermission;
    }));
  }

  setNavPermissions(navData) {
    if (navData.pages) {
      navData.pages.forEach((page, i, object) => {
        if (page.allowedPermissions && page.allowedPermissions.length > 0) {
          // @todo subscribe once for all the permissions
          this.subs.add(this.hasPermission(page.allowedPermissions).subscribe(res => {
            object[i].show = res;
          }));
        } else {
          object[i].show = true;
        }
        if (page.pages) {
          this.setNavPermissions(page);
        }
      });
    }
  }
}

