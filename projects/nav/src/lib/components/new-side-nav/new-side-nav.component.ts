import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NavDataModel } from '../../models/nav.model';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { NavService } from '../../services/nav.service';
import { NavItemModel } from '../../models/nav.model';

@Component({
  selector: 'cloudinn-new-side-nav',
  templateUrl: './new-side-nav.component.html',
  styleUrls: ['./new-side-nav.component.css']
})

export class NewSideNavComponent implements OnInit, AfterViewInit {
  @Input() isMobileResolution$: Observable<any>;
  @Input() navData: NavDataModel;
  @Input() language: string;
  @Input() changeLanguage;
  @ViewChild('newsidenav') newsidenav: MatSidenav;

  mainPages = new Array<NavItemModel>();
  subPages = new Array<NavItemModel>();
  isLast: boolean;
  seconedLevelTitle: string;
  mainPage: NavItemModel;
  currentPageTitle: string;
  isLoading: boolean;

  constructor(private navService: NavService) { }

  ngOnInit(): void {
    this.getMainTitles();
    this.getSubPages(this.navData.sideNav[0], 'first');
    this.navService.setNavData(this.navData);
  }

  ngAfterViewInit() {
    this.navService.setSidenavComponent(this.newsidenav);
  }

  getMainTitles() {
    this.navData.sideNav.forEach(element => {
      this.mainPages.push(element);
    });
  }

  getSubPages(page: NavItemModel, level: string) {
    if (page.pages && page.pages.length > 0) {
      if (level === 'seconed') {
        this.isLast = true;
        this.seconedLevelTitle = this.getSeconedLevelTitle(page);
      } else {
        this.mainPage = page;
        this.isLast = false;
        this.makePageSelected(page);
      }
      this.SubPages = page.pages;
    } else {
      this.isLoading = true;
      this.goToPath(page);
      this.changeLanguage.subscribe(res => {
        this.isLoading = true;
      });
    }
  }

  formatTitles(title) {
    if (title) {
      return title.replace(/[&\/\\#,+()$~%.'":*?<>{}/ /]/g, '');
    }
  }

  makePageSelected(page: NavItemModel) {
    this.mainPages.forEach(mp => {
      if (mp.title === page.title) {
        mp.selected = true;
      } else {
        mp.selected = false;
      }
    });
  }

  getSeconedLevelTitle(page): string {
    return page.title;
  }

  goToPath(item: NavItemModel) {
    this.navService.goToPath(item, this.mainPage.title);
    if (window.innerWidth < 767) {
      this.navService.closeSideNav();
    }
    this.currentPageTitle = item.title;
  }

  get subTitle() {
    return this.isLast ? this.formatTitles(this.seconedLevelTitle) + '-' : '';
  }

  set SubPages(pages: NavItemModel[]) {
    this.subPages = [];
    this.subPages.push(...pages);
  }

  toggleSidenav() {
    this.newsidenav.toggle();
  }

}
