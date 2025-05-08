import { CommonModule, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonTeam } from '../../models/pokemon-team';
import { Team } from '../../models/team';
import { TeamsService } from '../../services/teams/teams.service';
import { PokemonTeamService } from '../../services/pokemon-team/pokemon-team.service';
import { forkJoin, Observable } from 'rxjs';
import { PokemonData } from '../../models/pokemon-data';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { ItemsService } from '../../services/items/items.service';
import { AbilitiesService } from '../../services/abilities/abilities.service';
import { MovesService } from '../../services/moves/moves.service';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PokemonPathPipe } from '../../pipes/pokemonPath/pokemon-path.pipe';
import { PokemonShinyPathPipe } from '../../pipes/pokemonShinyPath/pokemon-shiny-path.pipe';
import { TypesService } from '../../services/types/types.service';
import { TypePathPipe } from '../../pipes/typePath/type-path.pipe';

@Component({
  selector: 'app-team-builder',
  imports: [CommonModule, NgStyle, PokemonPathPipe, PokemonShinyPathPipe, TypePathPipe],
  templateUrl: './team-builder.component.html',
  styles: ``
})
export class TeamBuilderComponent {
  // definir variables
  private userId!:number;
  private teamId!:number
  constructor(private dialog: MatDialog) {}
  // definimos estos mapas para almacenar el id de un movimiento/habilidad/item y su nombre, para poder mostrarlo en pantalla
  abilityMap: { [id: number]: string } = {};
  itemMap: { [id: number]: string } = {};
  moveMap: { [id: number]: string } = {};
  // definir arrays para rellenar con datos de la BD
  public aTeams:Team[]=[];
  public aPokemonTeamIds:number[]=[];
  public aPokemonTeamInfo:PokemonTeam[]=[];
  public aPokemonData:PokemonData[]=[];
  public aFullPokemonTeam: { teamInfo: any, baseData: any,teraTypeImage: string }[] = [];
  // inyectar servicios
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private serviceTeams = inject(TeamsService);
  private pokemonTeamService = inject(PokemonTeamService);
  private pokemonDataService = inject(PokemonDataService)
  private serviceItems = inject(ItemsService)
  private serviceAbilities = inject(AbilitiesService)
  private serviceMoves = inject(MovesService)
  private serviceTypes = inject(TypesService)

 ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params=>{
      this.userId = parseInt(params.get("userId")!);
      this.teamId = parseInt(params.get("teamId")!);
    })
    this.obtainTeamInfo();
    this.loadMovesAbilitiesItems();
  }

  private obtainTeamInfo() {
    this.serviceTeams.getTeam(this.teamId).subscribe({
      next:(data)=>{
        this.aTeams = data;
        // console.log("Team data",this.aTeams);
        for (const team of this.aTeams) {
          for (let i = 1; i <= 6; i++) {
            const key = `pokemon_${i}` as keyof Team;
            const pokemonId = team[key] as number | null;
            if (pokemonId != null) {
              this.aPokemonTeamIds.push(pokemonId);
            }
          }
        }
        this.obtainPokemonTeamInfo();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  private obtainPokemonTeamInfo(){
    const requests = this.aPokemonTeamIds.map(id => this.pokemonTeamService.getPokemonTeamId(id));
    forkJoin(requests).subscribe({
      next: (results) => {
        this.aPokemonTeamInfo = results
        .map(data => Array.isArray(data) && data.length > 0 ? data[0] : null)
        .filter(info => info !== null);
        this.obtainPokemonData(); 
      },
      error: (err) => {
        console.error("Error fetching team data:", err);
      }
    });
  }

  private obtainPokemonData() {
    const baseDataRequests = this.aPokemonTeamInfo.map(info =>
      this.pokemonDataService.getPokemonDataFromTeam(info.id_pokemon!)
    );
  
    const teraTypeRequests = this.aPokemonTeamInfo.map(info =>
      this.serviceTypes.getType(info.tera_type!)
    );
  
    forkJoin([
      forkJoin(baseDataRequests),
      forkJoin(teraTypeRequests)
    ]).subscribe({
      next: ([baseDataResults, teraTypeResults]) => {
        const filteredBaseData = baseDataResults
          .map(res => Array.isArray(res) && res.length > 0 ? res[0] : null);
          const filteredTeraData = teraTypeResults.map((res, index) => {
            if (Array.isArray(res) && res.length > 0) {
              // console.log(`Tera type [${index}]:`, res[0]);
              return res[0]; // extract the first object
            }
          });
        
        for (let i = 0; i < this.aPokemonTeamInfo.length; i++) {
          const teamInfo = this.aPokemonTeamInfo[i];
          const baseData = filteredBaseData[i];
          const teraData = filteredTeraData[i];
          // console.log("teraData", teraData);
          if (teamInfo && baseData) {
            this.aFullPokemonTeam.push({
              teamInfo: teamInfo,
              baseData: baseData,
              teraTypeImage: teraData.image_small
            });
          }
        }
  
        console.log('Full Pokémon team data with teraType images:', this.aFullPokemonTeam);
      },
      error: (err) => {
        console.error('Error fetching Pokémon or Tera Type data:', err);
      }
    });
  }
  

  private loadMovesAbilitiesItems(): void {
    this.serviceAbilities.getAbilities().subscribe({
      next: (abilities) => {
        abilities.forEach(ability => {
          this.abilityMap[ability.id] = ability.name;
        });
      }
    });
    // console.log("abilityMap",this.abilityMap);
  
    this.serviceItems.getItems().subscribe({
      next: (items) => {
        items.forEach(item => {
          this.itemMap[item.id] = item.name;
        });
      }
    });
  
    this.serviceMoves.getMoves().subscribe({
      next: (moves) => {
        moves.forEach(move => {
          this.moveMap[move.id] = move.name;
        });
      }
    });
  }

  addPokemon(){
    this.router.navigateByUrl(`/pokemonFrm/${this.teamId}`);
  }

  editTeam(){
    const dialogRef = this.dialog.open(DialogFormComponent, {
      data:{name:this.aTeams[0].name,description:this.aTeams[0].description}
    });

    dialogRef.afterClosed().subscribe(result => {
          // if result exists, execute if (should always execute since you cannot submit without having validated and data is required for validation)
          if (result) {
            // must add all data to interface even if method will only care about name and description
            const team:Team={
              id:this.aTeams[0].id,
              name:result.name,
              description:result.description,
              user_id:this.aTeams[0].user_id,
              pokemon_1:this.aTeams[0].pokemon_1,
              pokemon_2:this.aTeams[0].pokemon_2,
              pokemon_3:this.aTeams[0].pokemon_3,
              pokemon_4:this.aTeams[0].pokemon_4,
              pokemon_5:this.aTeams[0].pokemon_5,
              pokemon_6:this.aTeams[0].pokemon_6 
            }
            // console.log(team);
            this.serviceTeams.updatePokemonTeam(team).subscribe({
              next:(data)=>{
                Swal.fire("The team has been updated","","success")
                this.router.navigate([this.router.url]);
              },
              error:(err)=>{
                console.log(err);
              }
            })
        }
      });
  }
}

