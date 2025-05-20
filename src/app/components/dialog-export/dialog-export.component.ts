import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-export',
  imports: [MatButtonModule, MatDialogModule, TranslateModule],
  templateUrl: './dialog-export.component.html',
  styles: ``
})
export class DialogExportComponent {
  public arrayTest:string[]=[]
  
  constructor(
    private dialogRef: MatDialogRef<DialogExportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    if(data){
      this.arrayTest = data;
    }
  }

}
