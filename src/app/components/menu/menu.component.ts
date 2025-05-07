import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  public isLogged!:boolean;
  private serviceAuth = inject(AuthService)

  ngOnInit(){
    this.isLogged=this.serviceAuth.isLoggedIn();
    console.log(this.isLogged);
  }
}
