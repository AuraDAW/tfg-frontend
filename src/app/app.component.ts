import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from "./components/footer/footer.component";
import {TranslateModule} from "@ngx-translate/core";   // <--- standalone only
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  imports: [MenuComponent,FooterComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
