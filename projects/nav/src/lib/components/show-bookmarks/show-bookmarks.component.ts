import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BookmarkModel, BookmarksService } from '../../services/bookmarks.service';
import { DeleteBoookmarkDaialogComponent } from '../delete-boookmark-daialog/delete-boookmark-daialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MODE } from '../bookmarks-form/bookmarks-form.component';

@Component({
  selector: 'cloudinn-show-bookmarks',
  templateUrl: './show-bookmarks.component.html',
  styleUrls: ['./show-bookmarks.component.scss']
})
export class ShowBookmarksComponent implements OnInit {

  displayedColumns: string[] = ['name', 'url', 'key', 'actions'];
  dataSource: BookmarkModel[];
  deleteBookmarkSpinner: {id: number, loading: boolean};
  modeType = MODE;
  editedBookmark: BookmarkModel;
  createNew = false;

  @Input() showCloseButton = false;
  @Output() close = new EventEmitter();

  constructor(
    private bookmarksService: BookmarksService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.getBookMarks();
  }

  _close(): void {
    this.close.emit('close');
  }

  getBookMarks() {
    this.bookmarksService.getBookmarks().subscribe(
      res => {
        this.dataSource = res;
      },
      err => {
        // console.log(err);
      },
    );
  }

  openDeleteConfirmationDialog(bookmark: BookmarkModel) {
    const dialogRef = this.dialog.open(DeleteBoookmarkDaialogComponent, {
      width: '400px',
      data: bookmark.name,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteBookmark(bookmark.id);
      }
    });
  }

  deleteBookmark(id: number) {
    this.deleteBookmarkSpinner = {id: id, loading: true};
    this.bookmarksService.deleteBookmark(id).subscribe(
      res => {
        this.deleteBookmarkSpinner = {id: id, loading: false};
        this.dataSource = res;
      },
      err => {
        this.deleteBookmarkSpinner = {id: id, loading: false};
      }
    );
  }

  loading(id: number) {
    if (this.deleteBookmarkSpinner && this.deleteBookmarkSpinner.id === id &&
      this.deleteBookmarkSpinner.loading === true) {
      return true;
    }
    return false;
  }

  finishEditing() {
    this.editedBookmark = undefined;
    this.getBookMarks();
  }

  editBookmark(bookmark: BookmarkModel) {
    this.editedBookmark = bookmark;
  }

  openCreateNewBookmarkForm() {
    this.createNew = true;
  }

  finishCreating() {
    this.createNew = false;
  }


}
