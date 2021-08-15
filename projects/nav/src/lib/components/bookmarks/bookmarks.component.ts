import { MODE } from './../bookmarks-form/bookmarks-form.component';
import { BookmarksService } from './../../services/bookmarks.service';
import { BookmarksDailogComponent } from './../bookmarks-dialog/bookmarks-dialog.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ShortcutService } from '../../services/shortcut.service';
import { BookmarkModel } from '../../services/bookmarks.service';


@Component({
  selector: 'cloudinn-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit, OnDestroy {

  @ViewChild(MatMenuTrigger, { static: true }) menuTrigger: MatMenuTrigger;

  menuIsClosed = true;
  subs = new Subscription();
  bookmarks: BookmarkModel[];
  modeType = MODE;

  constructor(
    public dialog: MatDialog,
    private bookmarksService: BookmarksService,
    private shortcutService: ShortcutService,
    ) { }

  ngOnInit() {
    this.getBookMarks();
    this.subs.add(
      this.menuTrigger.menuOpened.subscribe(() => {
        document.addEventListener(
          'scroll',
          () => {
            this.menuTrigger.closeMenu();
          },
          { once: true }
        );
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  closed() {
    this.menuIsClosed = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BookmarksDailogComponent, {
      data: {good: 'good'},
      minWidth: '600px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getBookMarks();
    });
  }

  closeMenu(event) {
    this.menuTrigger.closeMenu();
  }

  getBookMarks() {
    this.bookmarksService.getBookmarks().subscribe(
      res => {
        this.bookmarks = res;
        res.forEach(bookmark => {
          this.shortcutService.assignKey(bookmark);
        });
      },
      err => {
        // console.log(err);
      },
    );
  }

}
