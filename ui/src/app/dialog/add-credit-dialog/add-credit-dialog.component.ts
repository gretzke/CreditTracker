import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../data.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-credit-dialog',
  templateUrl: './add-credit-dialog.component.html',
  styleUrls: ['./add-credit-dialog.component.scss']
})
export class AddCreditDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddCreditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    // delete this.data.data;
    console.log(this.data);
    console.log(JSON.stringify(this.data))
    this.dataService.addCredit(this.data)
  }

}
