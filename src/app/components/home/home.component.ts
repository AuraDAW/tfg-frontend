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
  public logo:string="logos/smogon_logo.png";
  // idealmente, ruta1 se obtiene de una variable entorno .env, y ruta2 se obtiene de la BD
  public ruta1:string="logos/";
  public ruta2:string="smogon_logo.png";
}
