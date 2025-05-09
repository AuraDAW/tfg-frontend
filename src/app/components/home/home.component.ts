import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { LogoPathPipe } from '../../pipes/logoPath/logo-path.pipe';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";   // <--- standalone only
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [LogoPathPipe, CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  
}
