import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  public isAuthenticated!:boolean;
  public userId!:number;
  private serviceAuth = inject(AuthService)
  private router = inject(Router)

  ngOnInit(){
    //if method returns anything other than null, then token is real and returned the user id
    //thus we can use the ! operator to specify it will never be null
    if(this.serviceAuth.getUserIdFromToken()!=null){
      this.userId = this.serviceAuth.getUserIdFromToken()!;
    }
    this.isAuthenticated=this.serviceAuth.isLoggedIn();
  }

  ngOnChanges(){
    this.isAuthenticated=this.serviceAuth.isLoggedIn();
  }

  /**
   * @description Method executed when pressing the "Logout" menu option. It calls to serviceAuth and logs the user out.
   * It redirects the user to /home after logging out so they're not stuck inside team-builder or smth and view anything.
   */
  logout(){
    this.serviceAuth.logout();
    this.router.navigateByUrl("/home")
  }
}
