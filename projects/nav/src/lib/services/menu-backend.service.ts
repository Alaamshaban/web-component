import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { NavItemModel } from '../models/nav.model';

@Injectable({
  providedIn: 'root'
})
export class MenuBackendService {
  private menuData = new BehaviorSubject<NavItemModel[]>([]);
  private menuData$ = this.menuData.asObservable();

  constructor(private http: HttpClient) { }

  public getMainMenu(): Observable<NavItemModel[]> {
    this.http.get('/api/core/menus/main/').subscribe(
      (data: any[]) => {
        const items = [];
        for (const d of data) {
          items.push({
            title: d.name,
            path: d.url,
            icon: d.icon
          });
        }
        this.menuData.next(items);
      },
      (err) => {},
      () => {}
    );

    return this.menuData$;
  }
}
