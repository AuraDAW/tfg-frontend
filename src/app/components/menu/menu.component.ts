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
@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, MatSlideToggleModule, MatButtonModule, MatMenuModule, CommonModule, TranslateModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  public language: 'en' | 'es' = 'en';
  public isAuthenticated!:boolean;
  public userId!:number;
  private serviceAuth = inject(AuthService)
  private router = inject(Router)

  constructor(private translate: TranslateService, private dialog: MatDialog) {
    this.translate.addLangs(['en', 'es']); //adds possible translations
    this.translate.setDefaultLang('en'); //default translation if none is found
    const saved = localStorage.getItem('language'); //gets currently set language from localStorage, in case user reloads app with f5
    this.language = saved === 'es' ? 'es' : 'en'; //sets this.language to the one obtained from localStorage, or "en" if none was set
    this.translate.use(this.language); 
  }
  
  toggleLanguage(isSpanish: boolean) {
    this.language = isSpanish ? 'es' : 'en';
    this.translate.use(this.language);
    localStorage.setItem('language', this.language); // Optional: remember language
  }
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
