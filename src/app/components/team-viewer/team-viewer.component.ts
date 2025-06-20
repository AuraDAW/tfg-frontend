import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin, firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { PokemonData } from '../../models/pokemon-data';
import { PokemonTeam } from '../../models/pokemon-team';
import { Team } from '../../models/team';
import { AbilitiesService } from '../../services/abilities/abilities.service';
import { ItemsService } from '../../services/items/items.service';
import { MovesService } from '../../services/moves/moves.service';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { PokemonTeamService } from '../../services/pokemon-team/pokemon-team.service';
import { TeamsService } from '../../services/teams/teams.service';
import { TypesService } from '../../services/types/types.service';
import { DialogExportComponent } from '../dialog-export/dialog-export.component';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { CommonModule, NgStyle } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PokemonPathPipe } from '../../pipes/pokemonPath/pokemon-path.pipe';
import { PokemonShinyPathPipe } from '../../pipes/pokemonShinyPath/pokemon-shiny-path.pipe';
import { TypePathPipe } from '../../pipes/typePath/type-path.pipe';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-team-viewer',
  imports: [CommonModule, PokemonPathPipe, PokemonShinyPathPipe, TypePathPipe,TranslateModule],
  templateUrl: './team-viewer.component.html',
  styles: ``
})
export class TeamViewerComponent {
// definir variables
  private teamId!:number;
  public role!:number;
  public isFavoritedTeam:boolean=false;
  constructor(private dialog: MatDialog) {}
  // definir arrays para rellenar con datos de la BD
  public aTeams:Team[]=[];
  public aPokemonTeamIds:number[]=[];
  public aPokemonTeamInfo:PokemonTeam[]=[];
  public aPokemonData:PokemonData[]=[];
  public aFullPokemonTeam: { teamInfo: any, baseData: any,teraTypeImage: string }[] = [];
  public aExport:String[]=[];
  // inyectar servicios
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private serviceTeams = inject(TeamsService);
  private servicePokemonTeam = inject(PokemonTeamService);
  private servicePokemonData = inject(PokemonDataService)
  private serviceAbilities = inject(AbilitiesService)
  private serviceTypes = inject(TypesService)
  private serviceItems = inject(ItemsService)
  private serviceMoves = inject(MovesService)
  private serviceAuth = inject(AuthService)

 ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params=>{
      this.teamId = parseInt(params.get("teamId")!);
    })
    this.obtainTeamInfo();
    if (this.serviceAuth.isLoggedIn()) {
      this.role = this.serviceAuth.getRoleFromToken()!;
    }
    this.serviceTeams.isFavorited(this.teamId).subscribe(isFav=>{
      this.isFavoritedTeam = isFav;
    });
  }

  /**
   * @description Obtains info of the currently selected team.
   */
  private obtainTeamInfo() {
    this.serviceTeams.getTeam(this.teamId).subscribe({
      next:(data)=>{
        this.aTeams = data;
        // console.log("Team data",this.aTeams);
        for (const team of this.aTeams) {
          for (let i = 1; i <= 6; i++) {
            // loops through pokemon_1 to pokemon_6, obtains their id and pushes it into an array
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

  /**
   * @description Creates a requestsMap with requests for getPokemonTeamId, stores the result of each service call into another map.
   */
  private obtainPokemonTeamInfo(){
    // maps each id to a pokemonTeamService call
    const requests = this.aPokemonTeamIds.map(id => this.servicePokemonTeam.getPokemonTeamId(id));
    // subscribes to all requests in the "requests" map, so it can obtain the data of all pokemonIds
    forkJoin(requests).subscribe({
      next: (results) => {
        // gets the 1st element of each result (request returns array so it must select the 1st element of it)
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

  /**
   * @description Obtains the aPokemonTeamInfo map, creates 2 new maps with requests to obtain pokemonTeam info and type
   */
  private obtainPokemonData() {
    // creates map with all requests to get pokemonData of each pokemon in the team
    const baseDataRequests = this.aPokemonTeamInfo.map(info =>
      this.servicePokemonData.getPokemonDataFromTeam(info.id_pokemon!)
    );
    // map of requests to serviceTypes to obtain type data of the teratype of each pokemon in the team 
    const teraTypeRequests = this.aPokemonTeamInfo.map(info =>
      this.serviceTypes.getType(info.tera_type!)
    );

    // subscribes to all requests in both maps
    forkJoin([
      forkJoin(baseDataRequests),
      forkJoin(teraTypeRequests)
    ]).subscribe({
      next: ([baseDataResults, teraTypeResults]) => {
        // filters the results: both service calls return an array so we obtain the first element inside array
        const filteredBaseData = baseDataResults
          .map(res => Array.isArray(res) && res.length > 0 ? res[0] : null);
        const filteredTeraData = teraTypeResults.map((res, index) => {
          if (Array.isArray(res) && res.length > 0) {
            // console.log(`Tera type [${index}]:`, res[0]);
            return res[0]; // extract the first object
          }
        });
        // loops up to the number of pokemon inside team, stores data into aFullPokemonTeam array
        // teamInfo: pokemonTeam, has the moves/abilities/items/teraType of pokemon
        // baseData: pokemonData, used to show name and image of pokemon
        // teraData: type, used to show the teraType image of the pokemon's teraType
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

  favoriteTeam(){
    this.serviceTeams.favoriteTeam(this.teamId).subscribe({
      next:(data)=>{
        //if api returned added inside message, show marked as fav message in alert, otherwise show remove message
        const message = data.message === "added"
        ? "The team has been marked as favorite"
        : "The team has been removed from favorites";
        // update isFavoriteTeam so the text inside button changes
        if(data.message==="added"){
          this.isFavoritedTeam=true;
        }else{
          this.isFavoritedTeam=false;
        }
        console.log(this.isFavoritedTeam);
        Swal.fire(message,"","success");
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  async exportTeam() {
    await this.generateShowdownTeam(this.aFullPokemonTeam);
    const dialogRef = this.dialog.open(DialogExportComponent,{
      data:this.aExport
    });
    //reset array to empty so that if user clicks again, the text does not repeat itself
    this.aExport = [];
  }

  private generateShowdownTeam = async (fullPokemonTeamData: any[]) => {
    for (let index = 0; index < fullPokemonTeamData.length; index++) {
      // first, we must obtain ability, item, move, teratype names from their ids
      const baseData = fullPokemonTeamData[index].baseData;
      const teamInfo = fullPokemonTeamData[index].teamInfo;
      // call to service and make it async with firstValueFrom, so it always has all the names before trying to format
      const abilityData = await firstValueFrom(this.serviceAbilities.getAbility(teamInfo.ability));
      const abilityName = abilityData[0].name_en;
      const itemData = await firstValueFrom(this.serviceItems.getItem(teamInfo.item));
      const itemName = itemData[0].name_en;
      const teratypeData:{[key: string]: any} = await firstValueFrom(this.serviceTypes.getType(teamInfo.tera_type));
      const teratypeName = teratypeData[0].name_en;
      const move1Data = await firstValueFrom(this.serviceMoves.getMove(teamInfo.move_1));
      const move1Name = move1Data[0].name_en;
      const move2Data = await firstValueFrom(this.serviceMoves.getMove(teamInfo.move_2));
      const move2Name = move2Data[0].name_en;
      const move3Data = await firstValueFrom(this.serviceMoves.getMove(teamInfo.move_3));
      const move3Name = move3Data[0].name_en;
      const move4Data = await firstValueFrom(this.serviceMoves.getMove(teamInfo.move_4));
      const move4Name = move4Data[0].name_en;
      const evs = [
        { stat: 'HP', value: teamInfo.ev_hp },
        { stat: 'Atk', value: teamInfo.ev_atk },
        { stat: 'Def', value: teamInfo.ev_def },
        { stat: 'SpA', value: teamInfo.ev_spatk },
        { stat: 'SpD', value: teamInfo.ev_spdef },
        { stat: 'Spe', value: teamInfo.ev_spd }
      ].filter(ev => ev.value > 0); // Only include EVs with non-zero values
      const ivs = [
        { stat: 'HP', value: teamInfo.iv_hp },
        { stat: 'Atk', value: teamInfo.iv_atk },
        { stat: 'Def', value: teamInfo.iv_def },
        { stat: 'SpA', value: teamInfo.iv_spatk },
        { stat: 'SpD', value: teamInfo.iv_spdef },
        { stat: 'Spe', value: teamInfo.iv_spd }
      ].filter(iv => iv.value < 31); // Only include IVs with values lower than 31 
      // Format the Pokemon's data into Showdown format
      const exportString = `${baseData.name_en} @ ${itemName}
Ability: ${abilityName}
Tera Type: ${teratypeName}
Level: ${teamInfo.level}
EVs: ${evs.map(ev => `${ev.value} ${ev.stat}`).join(' / ')}
IVs: ${ivs.map(iv => `${iv.value} ${iv.stat}`).join(' / ')}
- ${move1Name}
- ${move2Name}
- ${move3Name}
- ${move4Name}\n\n`
this.aExport.push(exportString);
    };
  };
}
