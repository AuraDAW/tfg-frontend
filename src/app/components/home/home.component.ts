import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { LogoPathPipe } from '../../pipes/logoPath/logo-path.pipe';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";   // <--- standalone only
import { Team } from '../../models/team';
import { TeamsService } from '../../services/teams/teams.service';
import { User } from '../../models/user';
import { UsersService } from '../../services/users/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [RouterLink, LogoPathPipe, CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  public aTeamsWeek:Team[]=[];
  public aUsers:User[]=[];
  public userNamesMap = new Map<number, string>();

  private serviceTeams = inject(TeamsService)
  private serviceUsers = inject(UsersService)

  ngOnInit(){
    this.loadTeamOfTheWeek();
  }

  private loadTeamOfTheWeek() {
    this.serviceTeams.getFavoritedTeams().subscribe({
      next: (data) => {
        console.log(data);
        this.aTeamsWeek = data;

        // Fetch user data for each team
        data.forEach((team) => {
          if(team.id !=null){
          this.serviceUsers.getTeamCreator(team.user_id).subscribe({
            next: (userData) => {
              // Store the user's name in the map
              this.userNamesMap.set(team.id!, userData.username!);
              console.log(this.userNamesMap);
            },
            error: (err) => {
              console.error(`Error fetching user for team ${team.id}:`, err);
            }
          });
        }
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

