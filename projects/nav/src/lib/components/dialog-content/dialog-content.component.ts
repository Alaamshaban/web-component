import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'cloudinn-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {

  selectInstanceCtrl = new FormControl();
  filteredInstances$: Observable<string[]>;
  instances: string[];
  Isloading = true;

  constructor(
    private auth: AuthService,
    private zone: NgZone,
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  close() {
    this.zone.run(() => {
      this.dialogRef.close();
    });
  }

  ngOnInit() {
    this.filteredInstances$ = this.selectInstanceCtrl.valueChanges.pipe(startWith(''));
    this.filteredInstances$
      .pipe(
        tap(res => {
          this.Isloading = true;
        }),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(val => {
          return this.auth.get_user_instances(this.auth.user.id, val);
        })
      ).subscribe(res => {
        this.Isloading = false;
        this.instances = res.results;
      });
  }
  selectInstance(instance) {
    this.dialogRef.close(instance);
  }
}

