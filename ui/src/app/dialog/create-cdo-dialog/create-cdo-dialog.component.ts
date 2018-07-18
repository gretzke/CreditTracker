import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../data.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-cdo-dialog',
  templateUrl: './create-cdo-dialog.component.html',
  styleUrls: ['./create-cdo-dialog.component.scss']
})
export class CreateCdoDialogComponent {

  constructor(public dialogRef: MatDialogRef<CreateCdoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService) { 
      console.log(data);
    }

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
    console.log(this.data);
    console.log(JSON.stringify(this.data))
    
    this.data.mortgages.forEach(element => {
      element.cdoID = this.data.cdoID
    });
    // this.data.owner = this.data.mortgages[0].owner
    this.data.start = new Date()
    this.dataService.createCDO(this.data);
  }
}
