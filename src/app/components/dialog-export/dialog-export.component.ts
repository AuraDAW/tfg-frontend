import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-dialog-export',
  imports: [MatButtonModule, MatDialogModule, TranslateModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dialog-export.component.html',
  styles: ``
})
export class DialogExportComponent {
  public arrayTest:string[]=[]
  public frm!:FormGroup;
  private snackbar = inject(MatSnackBar)
  
  constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<DialogExportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    if(data){
      this.arrayTest = data;
      this.frm = this.fb.group({
        export:[data]
      })
    }
  }

  copyClipboard(element:HTMLElement){
    const text = element.textContent || "";
    navigator.clipboard.writeText(text).then(() => {
    this.snackbar.open("Copied to clipboard!", "Dismiss",{
      duration:3000
    })
  }).catch(err => {
    this.snackbar.open("Failed to copy.", "Dismiss",{
      duration:3000
    })
  });
    
  }

}
