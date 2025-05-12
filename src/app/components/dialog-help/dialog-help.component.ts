import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-help',
  imports: [MatButtonModule,MatDialogModule, TranslateModule],
  templateUrl: './dialog-help.component.html',
  styles: ``
})
export class DialogHelpComponent {

}
