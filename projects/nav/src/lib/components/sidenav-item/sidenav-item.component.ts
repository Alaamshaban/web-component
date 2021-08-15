import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NavItemModel } from '../../models/nav.model';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'cloudinn-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent {
  @Input() navItem: NavItemModel;
  @Input() sub_page = false;
  constructor(
    private navService: NavService) {
  }

  goToPath(item: NavItemModel, parent: String) {
    this.navService.goToPath(item, parent);
    if (window.innerWidth < 767) {
      this.navService.closeSideNav();
    }
  }
}
