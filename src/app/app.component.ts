import { NavService } from './../../projects/nav/src/lib/services/nav.service';
import { NavDataModel, NavItemModel } from './../../projects/nav/src/lib/models/nav.model';
import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  navData: NavDataModel = {
    title: 'Front Disk',
    showSideNav: true,
    isSideMode: false,
    mode: 'side',
    isOpenedByDefault: true,
    showIframe: false,
    disableToggleWhenLinkClicked: true,
    path: '/',
    sideNav: [
      {
        title: 'Smarthotel',
        path: '/ota/smarthotel/login',
        pages: [
          {
            title: 'Login Settings',
            path: '//ota/smarthotel/login',
            icon: 'account_circle',
            allowedPermissions: ['add_account'],
            type: 'TS'

          },
          {
            title: 'Rate Plans Mapping',
            path: '//ota/smarthotel/mapping/rateplan',
            icon: 'payment',
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Inventory Mapping',
            path: '//ota/smarthotel/mapping/roomtype',
            icon: 'business',
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Channel Mapping',
            path: '//ota/smarthotel/mapping/channels',
            icon: 'swap_horiz',
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Bulk Restrictions',
            path: '//ota/smarthotel/bulkrestrictions',
            icon: 'warning',

            type: 'TS'
          },
          {
            title: 'Restrictions',
            icon: 'warning',
            path: `/ota/smarthotel/restrictions`,

            type: 'TS'
          }, {
            title: 'Logs',
            icon: 'timelapse',
            path: `/ota/smarthotel/logs`,
            allowedPermissions: ['add_account'],
            type: 'TS'
          }]
      },
      {
        title: 'Booking',
        path: '/ota/booking/login',
        pages: [
          {
            title: 'Login Settings',
            path: '//ota/booking/login',
            icon: 'account_circle',
            allowedPermissions: ['add_account'],
            type: 'TS'

          },
          {
            title: 'Rate Plans Mapping',
            path: '//ota/booking/mapping/rateplan',
            icon: 'payment',
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Inventory Mapping',
            path: '//ota/booking/mapping/roomtype',
            icon: 'business',
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Bulk Restrictions',
            path: '//ota/booking/bulkrestrictions',
            icon: 'warning',
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Restrictions',
            icon: 'warning',
            path: `/ota/booking/restrictions`,
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Retreive Single',
            icon: 'cached',
            path: `/ota/booking/retreivesingle`,
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Booking Addons',
            icon: 'attach_money',
            path: `/ota/booking/bookingaddons`,
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Logs',
            icon: 'timelapse',
            path: `/ota/booking/logs`,
            allowedPermissions: ['add_account'],
            type: 'TS'
          }]
      },
      {
        title: 'Expedia',
        path: '/ota/expedia/login',
        pages: [
          {
            title: 'Login Settings',
            path: '//ota/expedia/login',
            icon: 'account_circle',
            allowedPermissions: ['add_account'],
            type: 'TS'

          },
          {
            title: 'Rate Plans Mapping',
            path: '//ota/expedia/mapping/rateplan',
            icon: 'payment',
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Inventory Mapping',
            path: '//ota/expedia/mapping/roomtype',
            icon: 'business',
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Bulk Restrictions',
            path: '//ota/expedia/bulkrestrictions',
            icon: 'warning',
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Restrictions',
            icon: 'warning',
            path: `/ota/expedia/restrictions`,
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Retreive Single',
            icon: 'cached',
            path: `/ota/expedia/retreivesingle`,
            allowedPermissions: ['add_account'],
            type: 'TS'
          }, {
            title: 'Logs',
            icon: 'timelapse',
            path: `/ota/expedia/logs`,
            allowedPermissions: ['add_account'],
            type: 'TS'
          }
        ]
      },
      {
        title: 'MyAllocator',
        path: '/ota/myallocator/login',
        pages: [
          {
            title: 'Login Settings',
            path: '//ota/myallocator/login',
            icon: 'account_circle',
            allowedPermissions: ['add_account'],
            type: 'TS'

          },
          {
            title: 'Rate Plans Mapping',
            path: '//ota/myallocator/mapping/rateplan',
            icon: 'payment',
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Inventory Mapping',
            path: '//ota/myallocator/mapping/roomtype',
            icon: 'business',
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Channel Mapping',
            path: '//ota/myallocator/mapping/channels',
            icon: 'swap_horiz',
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Bulk Restrictions',
            path: '//ota/myallocator/bulkrestrictions',
            icon: 'warning',
            allowedPermissions: ['add_account'],
            type: 'TS'
          },
          {
            title: 'Restrictions',
            icon: 'warning',
            path: `/ota/myallocator/restrictions`,
            allowedPermissions: ['add_account'],
            type: 'TS'
          }, {
            title: 'Logs',
            icon: 'timelapse',
            path: `/ota/myallocator/logs`,
            allowedPermissions: ['add_account'],
            type: 'TS'
          }]

      }
    ],
    apps: [
      {
        title: 'POS',
        path: '/core/navigate/?menu=PS&submenu=CASH',
        icon: 'tablet'
      },
      {
        title: 'Back Office',
        path: '/core/navigate/?menu=BO&submenu=PO'
      },
      {
        title: 'Online Booking',
        path: '/core/navigate/?menu=OB&submenu=RV'
      },
      {
        title: 'Cruise',
        path: '/core/navigate/?menu=CR&submenu=RV'
      },
      {
        title: 'Reports',
        path: '/core/navigate/?menu=RT&submenu=RT'
      },
      {
        title: 'Settings',
        path: '/core/navigate/?menu=ST&submenu=AD'
      }
    ]
  };
  public text;
  public Copied;
  navUrl = 'http://localhost:8080/components/nav-component/nav-component.js';
  constructor(
    private nav: NavService,
    private cookieService: CookieService,
    private translate: TranslateService,
  ) {
    this.nav.setNavData(this.navData);
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en_US');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en_US');
  }

  ngOnInit() {
        // load script
        const existingScript = document.getElementById('logs');
        if (!existingScript) {
          const script = document.createElement('script');
          script.id = 'logs';
          script.src = this.navUrl;
          document.body.appendChild(script);
        } // script loaded
   }



}
