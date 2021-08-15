import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteBoookmarkDaialogComponent } from './delete-boookmark-daialog.component';

describe('DeleteBoookmarkDaialogComponent', () => {
  let component: DeleteBoookmarkDaialogComponent;
  let fixture: ComponentFixture<DeleteBoookmarkDaialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBoookmarkDaialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBoookmarkDaialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
