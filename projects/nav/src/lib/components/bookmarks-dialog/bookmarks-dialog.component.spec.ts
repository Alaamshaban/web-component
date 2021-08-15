import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookmarksDailogComponent } from './bookmarks-dialog.component';

describe('BookmarksComponent', () => {
  let component: BookmarksDailogComponent;
  let fixture: ComponentFixture<BookmarksDailogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarksDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
