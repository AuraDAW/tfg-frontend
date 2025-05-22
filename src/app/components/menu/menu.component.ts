import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DialogHelpComponent } from '../dialog-help/dialog-help.component';
import { Observable } from 'rxjs';
import { TeamsService } from '../../services/teams/teams.service';
import { UsersService } from '../../services/users/users.service';
@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, MatSlideToggleModule, MatButtonModule, MatMenuModule, CommonModule, TranslateModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isLoggedIn$!: Observable<boolean>;
  public language: 'en' | 'es' = 'en';
  public isAuthenticated!:boolean;
  public userId!:number;
  public role!:number

  private router = inject(Router)
  public serviceAuth = inject(AuthService)
  private serviceTeams = inject(TeamsService)
  private serviceUsers = inject(UsersService)

  constructor(private translate: TranslateService, private dialog: MatDialog) {
    this.translate.addLangs(['en', 'es']); //adds possible translations
    this.translate.setDefaultLang('en'); //default translation if none is found
    const saved = localStorage.getItem('language'); //gets currently set language from localStorage, in case user reloads app with f5
    this.language = saved === 'es' ? 'es' : 'en'; //sets this.language to the one obtained from localStorage, or "en" if none was set
    this.translate.use(this.language); 
  }
  
  ngOnInit(){
    this.isLoggedIn$ = this.serviceAuth.isLoggedIn$;
    if (this.serviceAuth.isLoggedIn()) {
      this.serviceAuth.startTokenExpirationWatcher();
      //subscribe to the role observable to auto update role variable whenever user logs in or out
      this.serviceAuth.role$.subscribe(role => {
        console.log("role updated");
        this.role = role!;
    });
    }
  }
  toggleLanguage(isSpanish: boolean) {
    this.language = isSpanish ? 'es' : 'en';
    this.translate.use(this.language);
    localStorage.setItem('language', this.language); // Optional: remember language
  }
  
  /**
   * @description Opens the "help" dialog window.
   */
  openDialog(){
    this.dialog.open(DialogHelpComponent);
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
