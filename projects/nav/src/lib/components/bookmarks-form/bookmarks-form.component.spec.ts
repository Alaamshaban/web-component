import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookmarksFormComponent } from './bookmarks-form.component';

describe('BookmarksFormComponent', () => {
  let component: BookmarksFormComponent;
  let fixture: ComponentFixture<BookmarksFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarksFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
