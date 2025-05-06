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

@Component({
  selector: 'app-team-builder',
  imports: [CommonModule, NgStyle],
  templateUrl: './team-builder.component.html',
  styles: ``
})
export class TeamBuilderComponent {
  // definir variables
  private userId!:number;
  private teamId!:number
  // definimos estos mapas para almacenar el id de un movimiento/habilidad/item y su nombre, para poder mostrarlo en pantalla
  abilityMap: { [id: number]: string } = {};
  itemMap: { [id: number]: string } = {};
  moveMap: { [id: number]: string } = {};
  // definir arrays para rellenar con datos de la BD
  public aTeams:Team[]=[];
  public aPokemonTeamIds:number[]=[];
  public aPokemonTeamInfo:PokemonTeam[]=[];
  public aPokemonData:PokemonData[]=[];
  public aFullPokemonTeam: { teamInfo: any, baseData: any }[] = [];
  // inyectar servicios
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private teamsService = inject(TeamsService);
  private pokemonTeamService = inject(PokemonTeamService);
  private pokemonDataService = inject(PokemonDataService)
  private serviceItems = inject(ItemsService)
  private serviceAbilities = inject(AbilitiesService)
  private serviceMoves = inject(MovesService)

 ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params=>{
      this.userId = parseInt(params.get("userId")!);
      this.teamId = parseInt(params.get("teamId")!);
    })
    this.obtainTeamInfo();
    this.loadMovesAbilitiesItems();
  }

  private obtainTeamInfo() {
    this.teamsService.getTeam(this.teamId).subscribe({
      next:(data)=>{
        this.aTeams = data;
        console.log(this.aTeams);
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
        console.log("All PokémonTeam info loaded:", this.aPokemonTeamInfo);
        this.obtainPokemonData(); 
      },
      error: (err) => {
        console.error("Error fetching team data:", err);
      }
    });
  }

  private obtainPokemonData() {
    const requests = this.aPokemonTeamInfo.map(info =>
      this.pokemonDataService.getPokemonDataFromTeam(info.id_pokemon!)
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        // Each result is an array; extract the first object from each
        this.aPokemonData = results
          .map(res => Array.isArray(res) && res.length > 0 ? res[0] : null)
          .filter(data => data !== null);
        this.aFullPokemonTeam = [];
        for (let i = 0; i < this.aPokemonTeamInfo.length; i++) {
          const teamInfo = this.aPokemonTeamInfo[i];
          const baseData = this.aPokemonData[i];
          if (teamInfo && baseData) {
            this.aFullPokemonTeam.push({
              teamInfo: teamInfo,
              baseData: baseData
            });
          }
        }
        console.log('Full Pokémon team data:', this.aFullPokemonTeam);
      },
      error: (err) => {
        console.error('Error fetching one or more Pokémon data entries:', err);
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
    this.router.navigateByUrl("/pokemonFrm/1");
  }
}

