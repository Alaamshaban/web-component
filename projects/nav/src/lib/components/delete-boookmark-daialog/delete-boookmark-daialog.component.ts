import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cloudinn-delete-boookmark-daialog',
  templateUrl: './delete-boookmark-daialog.component.html',
  styleUrls: ['./delete-boookmark-daialog.component.scss']
})
export class DeleteBoookmarkDaialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteBoookmarkDaialogComponent>,
    @Inject(MAT_DIALOG_DATA) public name: string) {}

  close(): void {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close(true);
  }

}
