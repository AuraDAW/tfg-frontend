import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { LogoPathPipe } from '../../pipes/logoPath/logo-path.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [LogoPathPipe, CommonModule],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

}
