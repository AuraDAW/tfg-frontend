import { CommonModule, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Team } from '../../models/team';
import { TeamsService } from '../../services/teams/teams.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';

@Component({
  selector: 'app-team-manager',
  imports: [CommonModule, NgStyle],
  templateUrl: './team-manager.component.html',
  styles: ``
})
export class TeamManagerComponent {
  // definir variables
  public aTeams:Team[]=[];
  // definir servicios
  private router = inject(Router)
  private serviceTeams = inject(TeamsService);
  constructor(private dialog: MatDialog) {}

  ngOnInit(){
    this.showAllTeams();
  }

  private showAllTeams(){
    this.serviceTeams.getTeams().subscribe({
      next:(data)=>{
        this.aTeams=data;
        console.log(this.aTeams);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  createTeam(){
    const dialogRef = this.dialog.open(DialogFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      // if result exists, execute if (should always execute since you cannot submit without having validated and data is required for validation)
      if (result) {
        const team:Team={
          id:undefined,
          name:result.name,
          description:result.description,
          user_id:1,
          pokemon_1:undefined,
          pokemon_2:undefined,
          pokemon_3:undefined,
          pokemon_4:undefined,
          pokemon_5:undefined,
          pokemon_6:undefined
        }
        console.log(team);
      this.serviceTeams.postPokemonTeam(team).subscribe({
        next:(data)=>{
          Swal.fire('El equipo ha sido añadido',"","success")
          this.showAllTeams();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  });
}

  editTeam(team:Team){
    this.router.navigateByUrl(`/teamBuilder/${team.user_id}/${team.id}`)
  }

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
            this.showAllTeams() //actualizamos la tabla
          },
          error:(err)=>{
            Swal.fire(`${err.message}`,"","error")
          }
        })
      }
    })
  }
}
