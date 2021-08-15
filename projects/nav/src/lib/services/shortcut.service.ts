import { Injectable } from '@angular/core';
import { BookmarkModel } from './bookmarks.service';

@Injectable({
    providedIn: 'root'
})
export class ShortcutService {

  constructor() { }

  assignKey(bookmark: BookmarkModel) {
    // this._hotkeysService.add(new Hotkey(bookmark.key, (event: KeyboardEvent): boolean => {
    //   window.open(bookmark.url, '_blank');
    //   return false; // Prevent bubbling
    // }));
  }


}
