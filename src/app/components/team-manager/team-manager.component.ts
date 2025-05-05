import { CommonModule, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-team-manager',
  imports: [CommonModule, NgStyle],
  templateUrl: './team-manager.component.html',
  styles: ``
})
export class TeamManagerComponent {
  public description = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur incidunt, a, doloribus maiores eligendi quaerat dolore corporis vitae consequuntur excepturi, doloremque voluptas voluptatibus. Dolores harum, mollitia quos eum voluptatum quibusdam!"
}
