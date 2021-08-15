import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShortcutService } from '../../services/shortcut.service';
import * as customValidators from '../../validators/validators';
import { BookmarkModel, BookmarksService, BookmarkReqModel } from '../../services/bookmarks.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export enum MODE {
  CREATE = 'create',
  UPDATE = 'update',
}

@Component({
  selector: 'cloudinn-bookmarks-form',
  templateUrl: './bookmarks-form.component.html',
  styleUrls: ['./bookmarks-form.component.scss']
})
export class BookmarksFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() bookmarks: BookmarkModel[];
  @Input() mode: MODE;
  @Input() editedBookmark: BookmarkModel;
  @Output() close = new EventEmitter<any>();

  form: FormGroup;
  addBookmarkError: string;
  shortcutOptions: string[];
  subs = new Subscription();
  modeType = MODE;

  get nameControl() { return this.form.get('name'); }
  get urlControl() { return this.form.get('url'); }
  get shortcutControl() { return this.form.get('shortcut'); }

  get url(): string {
    return window.location.href;
  }

  get pageTitle(): string {
    return document.title;
  }

  get notAssignedShortCuts(): string[] {
    if (this.bookmarks !== undefined && this.shortcutOptions) {
      const assignedKeys: string[] = this.bookmarks.map(b => b.key);
      return this.shortcutOptions.filter(s => assignedKeys.indexOf(s) === -1);
    }
    return [];
  }

  constructor(
    private bookmarksService: BookmarksService,
    private shortcutService: ShortcutService,
    private router: Router,
    ) {
      this.router.events.subscribe(e => {
        this.setForm(this.pageTitle, this.url, '');
      });
    }

  ngOnInit() {
    this.getShortcutOptions();
  }

  ngOnChanges() {
    if (this.mode === MODE.UPDATE && this.editedBookmark) {
      const b = this.editedBookmark;
      this.bookmarks.splice(this.bookmarks.indexOf(b), 1);
      this.setForm(b.name, b.url, b.key);
    } else if (this.mode === MODE.CREATE) {
      this.setForm(this.pageTitle, this.url, '');
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  setForm(name, url, shortcut) {
    this.form = new FormGroup({
      name: new FormControl(name, Validators.required),
      url: new FormControl(url, [Validators.required, customValidators.isUri]),
      shortcut: new FormControl(shortcut),
    });
  }

  getShortcutOptions() {
    this.subs.add(this.bookmarksService.getBookmarksShortCuts().subscribe(res => {
      this.shortcutOptions = res;
    }));
  }

  submit() {
    this.addBookmarkError = undefined;
    const value = this.form.value;
    const req: BookmarkReqModel = {
      name: value.name,
      url: value.url,
      key: value.shortcut,
    };
    if (this.mode === MODE.CREATE) {
      this.subs.add(this.bookmarksService.addBookmark(req).subscribe(
        res => {
          this.shortcutService.assignKey(res);
          this.bookmarks.push(res);
          this.closeForm();
          this.form.reset();
        },
        err => {
          this.addBookmarkError = err.error;
        }
      ));
    } else if (this.mode === MODE.UPDATE) {
      req.id = this.editedBookmark ? this.editedBookmark.id : undefined;
      this.subs.add(this.bookmarksService.updateBookmark(req).subscribe(
        res => {
          this.shortcutService.assignKey(res);
          this.bookmarks.forEach(b => { // update
            if (b.id === res.id) {
              b = res;
            }
          });
          this.form.reset();
          this.closeForm();
        },
        err => {
          this.addBookmarkError = err.error;
        }
      ));
    }
  }

  closeForm() {
    this.close.emit();
  }
}
