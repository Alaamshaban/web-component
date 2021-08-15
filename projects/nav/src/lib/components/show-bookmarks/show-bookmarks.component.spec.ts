import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowBookmarksComponent } from './show-bookmarks.component';

describe('ShowBookmarksComponent', () => {
  let component: ShowBookmarksComponent;
  let fixture: ComponentFixture<ShowBookmarksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBookmarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
