import { CommonModule, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Team } from '../../models/team';
import { TeamsService } from '../../services/teams/teams.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { AuthService } from '../../services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-team-manager',
  imports: [CommonModule, NgStyle, TranslateModule],
  templateUrl: './team-manager.component.html',
  styles: ``
})
export class TeamManagerComponent {
  // definir variables
  public aTeams:Team[]=[];
  public userId!:number;
  public userRole!:number;
  // definir servicios
  private router = inject(Router)
  private serviceTeams = inject(TeamsService);
  private serviceAuth = inject(AuthService)
  constructor(private dialog: MatDialog) {}

  ngOnInit(){
    console.log("teamManager is logged",this.serviceAuth.isLoggedIn());
    //if method returns anything other than null, then token is real and returned the user id
    //thus we can use the ! operator to specify it will never be null
    if(this.serviceAuth.getUserIdFromToken()!=null){
      this.userId = this.serviceAuth.getUserIdFromToken()!;
      this.userRole = this.serviceAuth.getRoleFromToken()!;
    }
    //if user is admin show all teams, if user is not admin show only their teams
    if(this.userRole==2){
      this.showAllTeams();
    }else{
      this.showTeamsUser()
    }
  }

  private showAllTeams(){
    this.serviceTeams.getTeams().subscribe({
      next:(data)=>{
        this.aTeams=data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  /**
   * @description Shows all teams that belong to the currently logged in user.
   */
  private showTeamsUser(){
    this.serviceTeams.getTeamsUser(this.userId).subscribe({
      next:(data)=>{
        this.aTeams=data;
        console.log(this.aTeams);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  /**
   * @description Shows a modal window with a form inside: name and description. On submit, said name and description will be used
   * to create a new Team. It then redirects to same page so the new team will show up onscreen.
   */
  createTeam() {
    const dialogRef = this.dialog.open(DialogFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      // if result exists, execute if (should always execute since you cannot submit without having validated and data is required for validation)
      if (result) {
        const team: Team = {
          id: undefined,
          name: result.name,
          description: result.description,
          user_id: this.userId,
          pokemon_1: undefined,
          pokemon_2: undefined,
          pokemon_3: undefined,
          pokemon_4: undefined,
          pokemon_5: undefined,
          pokemon_6: undefined
        }
        console.log(team);
        this.serviceTeams.postPokemonTeam(team).subscribe({
          next: (data) => {
            Swal.fire('El equipo ha sido añadido', "", "success")
            this.showTeamsUser();
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    });
  }

  /**
   * @description Redirects to the team whose edit icon was clicked.
   * @param team The team to edit.
   */
  editTeam(team:Team){
    this.router.navigateByUrl(`/teamBuilder/${team.user_id}/${team.id}`)
  }

  viewTeam(team:Team){
    this.router.navigateByUrl(`/teamViewer/${team.id}`)
  }

  /**
   * @description Shows a modal window (sweetAlert), on submit it deletes the team whose delete icon was clicked.
   * @param team The team to delete.
   */
  deleteTeam(team:Team){
    Swal.fire({
      title:`¿Do you wish to delete the team ${team.name}?`,
      showCancelButton:true,
      confirmButtonText:"Delete",
      cancelButtonText:"Cancel"
    }).then((result)=>{ 
      if(result.isConfirmed){
        // si se pulsa boton de confirmar, eliminar tarea
        this.serviceTeams.deleteTeam(team.id!).subscribe({
          next:(data)=>{
            Swal.fire(`${data.message}`,"","success")
            this.showTeamsUser() //actualizamos la tabla
          },
          error:(err)=>{
            Swal.fire(`${err.message}`,"","error")
          }
        })
      }
    })
  }
  
}
