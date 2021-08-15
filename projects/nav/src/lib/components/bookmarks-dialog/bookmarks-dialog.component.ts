import { MODE } from './../bookmarks-form/bookmarks-form.component';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BookmarkModel, BookmarksService } from '../../services/bookmarks.service';
import { DeleteBoookmarkDaialogComponent } from '../delete-boookmark-daialog/delete-boookmark-daialog.component';

@Component({
  selector: 'cloudinn-bookmarks-dialog',
  templateUrl: './bookmarks-dialog.component.html',
  styleUrls: ['./bookmarks-dialog.component.scss']
})
export class BookmarksDailogComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'url', 'key', 'actions'];
  dataSource: BookmarkModel[];
  deleteBookmarkSpinner: {id: number, loading: boolean};
  modeType = MODE;
  editedBookmark: BookmarkModel;
  createNew = false;

  constructor(
    public dialogRef: MatDialogRef<BookmarksDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private bookmarksService: BookmarksService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.getBookMarks();
  }

  ngOnDestroy() {
  }

  close(): void {
    this.dialogRef.close();
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
