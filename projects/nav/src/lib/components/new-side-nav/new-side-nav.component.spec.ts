import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSideNavComponent } from './new-side-nav.component';

describe('NewSideNavComponent', () => {
  let component: NewSideNavComponent;
  let fixture: ComponentFixture<NewSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
