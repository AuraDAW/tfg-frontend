import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { Type } from '../../models/type';
import { TypesService } from '../../services/types/types.service';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../../services/items/items.service';
import { Item } from '../../models/item';
import { AbilitiesService } from '../../services/abilities/abilities.service';
import { Ability } from '../../models/ability';
import { Move } from '../../models/move';
import { MovesService } from '../../services/moves/moves.service';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { PokemonData } from '../../models/pokemon-data';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Statbar } from '../../models/statbar';
import { PokemonTeam } from '../../models/pokemon-team';
import { PokemonTeamService } from '../../services/pokemon-team/pokemon-team.service';
import Swal from 'sweetalert2';
import { TeamsService } from '../../services/teams/teams.service';
import { PokemonPathPipe } from '../../pipes/pokemonPath/pokemon-path.pipe';
import { PokemonShinyPathPipe } from '../../pipes/pokemonShinyPath/pokemon-shiny-path.pipe';
import { TypePathPipe } from '../../pipes/typePath/type-path.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { AutocompleteSelectComponent } from "../autocomplete-select/autocomplete-select.component";

@Component({
  selector: 'app-pokemon-frm',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PokemonPathPipe, PokemonShinyPathPipe, TypePathPipe, TranslateModule,
    MatInputModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule, AutocompleteSelectComponent],
  templateUrl: './pokemon-frm.component.html',
  styles: ``
})
export class PokemonFrmComponent {
  // definir variables
  public frm!:FormGroup;
  public selectedPokemon!: number;
  public shiny:boolean=false;
  public aStatbar:Statbar[]=[];
  public teamId!:number;
  public id!:number
  // definir arrays para rellenar con datos de la BD
  public aTypes : Type[]=[];
  public aItems:Item[]=[];
  public aAbilities:Ability[]=[];
  public aMoves:Move[]=[];
  public aPokemonData:PokemonData[]=[];
  public aPokemonDataId:PokemonData[]=[];
  public aPokemonTypes:Type[]=[];
  // inyectar servicios
  private fb=inject(FormBuilder)
  private router = inject(Router)
  private activateRoute = inject(ActivatedRoute)
  private serviceTypes = inject(TypesService)
  private serviceItems = inject(ItemsService)
  private serviceAbilities = inject(AbilitiesService)
  private serviceMoves = inject(MovesService)
  private servicePokemonData = inject(PokemonDataService)
  private servicePokemonTeam = inject(PokemonTeamService)
  private serviceTeams = inject(TeamsService)

  constructor(private translate: TranslateService){}

  ngOnInit(){
    this.obtainId();
    this.validacionesFrm();
    this.obtainData();
    this.obtainDataForUpdate();

    // we subscribe to the pokemonId select, so that when it changes it will execute the following methods to:
    // 1- Reset all selects and inputs to default value 
    // 2- Rebuild all selects (futureproofing to allow easy implementation when i make it so a pokemon can only have moves they actually learn)
    this.frm.get('pokemonId')!.valueChanges.subscribe(pokemon => {
      this.resetAllFields();
      // there is no point in executing resetsAbilitiesMoves as its a placeholder for a future method
      // it would only slow down the application (negligible tbf)
      this.resetsAbilitiesMoves(pokemon);
    });
  }

  /**
   * @description Resets all fields in the form (except pokemonId) to their default values. 
   * Can't use frm.reset() as it also resets the pokemonId.
   */
  private resetAllFields(){
    this.frm.patchValue({
      "ability":"",
      "item":"",
      "level":"100",
      "teratype":"",
      "isShiny":"",
      "move1":"",
      "move2":"",
      "move3":"",
      "move4":"",
      "ivhp":"31",
      "ivatk":"31",
      "ivspatk":"31",
      "ivdef":"31",
      "ivspdef":"31",
      "ivspd":"31",
      "evhp":"0",
      "evatk":"0",
      "evspatk":"0",
      "evdef":"0",
      "evspdef":"0",
      "evpd":"0",
    })
  }

  /**
   * @description Future proofing method: Currently does not execute. It rebuilds the arrays containing the data of 
   * abilities and moves. Later on, it will use method "getAllAbilitiesPokemon" to get all abilities belonging 
   * to the currently selected pokemon.
   * @param pokemonId The pokemon currently selected in the form.
   */
  private resetsAbilitiesMoves(pokemonId: any) {
    // calls to method to obtain abilities and moves, later on method will be updated so it only gets those of the currently selected pokemon
    this.obtainAbilities(pokemonId);
    this.obtainMoves(pokemonId);
  }

  /**
   * @description Obtains teamId and id from the url and stores into corresponding variables (id being the id of the pokemon being edited)
   */
  private obtainId(){
    this.activateRoute.paramMap.subscribe(params=>{
      this.teamId = parseInt(params.get("teamId")!);
      this.id = parseInt(params.get("id")!);
    })
    console.log("teamId", this.teamId);
    console.log("id", this.id);
  }

  /**
   * @description If id exists we are trying to update an existing pokemon, this method obtains their data to show in the form.
   * If id does not exist, method does nothing.
   */
  private obtainDataForUpdate(){
    if(this.id){ 
      this.servicePokemonTeam.getPokemonTeamId(this.id).subscribe({
        next:(data)=>{
          // set all values in the form
          this.frm.get("pokemonId")?.setValue(data[0].id_pokemon);
          this.frm.get("ability")?.setValue(data[0].ability);
          this.frm.get("item")?.setValue(data[0].item);
          this.frm.get("level")?.setValue(data[0].level);
          this.frm.get("teratype")?.setValue(data[0].tera_type);
          this.frm.get("isShiny")?.setValue(data[0].is_shiny);
          this.frm.get("move1")?.setValue(data[0].move_1);
          this.frm.get("move2")?.setValue(data[0].move_2);
          this.frm.get("move3")?.setValue(data[0].move_3);
          this.frm.get("move4")?.setValue(data[0].move_4);
          this.frm.get("ivhp")?.setValue(data[0].iv_hp);
          this.frm.get("ivatk")?.setValue(data[0].iv_atk);
          this.frm.get("ivspatk")?.setValue(data[0].iv_spatk);
          this.frm.get("ivdef")?.setValue(data[0].iv_def);
          this.frm.get("ivspdef")?.setValue(data[0].iv_spdef);
          this.frm.get("ivspd")?.setValue(data[0].iv_spd);
          this.frm.get("evhp")?.setValue(data[0].ev_hp);
          this.frm.get("evatk")?.setValue(data[0].ev_atk);
          this.frm.get("evspatk")?.setValue(data[0].ev_spatk);
          this.frm.get("evdef")?.setValue(data[0].ev_def);
          this.frm.get("evspdef")?.setValue(data[0].ev_spdef);
          this.frm.get("evpd")?.setValue(data[0].ev_spd);
          this.obtainPokemonDataId();
        }
      })
    }
  }

  /**
   * @description Adds all required validation to the form elements.
   */
  private validacionesFrm(){
    this.frm=this.fb.group({
      pokemonId:["",[Validators.required]],
      ability:['', [Validators.required]],
      item:['', [Validators.required]],
      level:['100', [Validators.min(1), Validators.max(100)]],
      teratype:['', [Validators.required]],
      isShiny:[''],
      move1:['', [Validators.required]],
      move2:['', [Validators.required]],
      move3:['', [Validators.required]],
      move4:['', [Validators.required]],
      evhp:['0', [Validators.min(0), Validators.max(252)]],
      ivhp:['31', [Validators.min(0), Validators.max(31)]],
      evatk:['0', [Validators.min(0), Validators.max(252)]],
      ivatk:['31', [Validators.min(0), Validators.max(31)]],
      evdef:['0', [Validators.min(0), Validators.max(252)]],
      ivdef:['31', [Validators.min(0), Validators.max(31)]],
      evspatk:['0', [Validators.min(0), Validators.max(252)]],
      ivspatk:['31', [Validators.min(0), Validators.max(31)]],
      evspdef:['0', [Validators.min(0), Validators.max(252)]],
      ivspdef:['31', [Validators.min(0), Validators.max(31)]],
      evspd:['0', [Validators.min(0), Validators.max(252)]],
      ivspd:['31', [Validators.min(0), Validators.max(31)]],
    }, {validators:[this.EVTotalValidator()]})
  }

  /**
   * @description Method that will sum all EV values to check if the sum is equal or lower than 510
   * @returns boolean, true if total EV are less or equal to 510
   */
  private EVTotalValidator(){
    return (formGroup: AbstractControl): ValidationErrors | null => {
    const controls = formGroup as FormGroup;
    const fields = ['evhp', 'evatk', 'evdef', 'evspatk', 'evspdef', 'evspd'];

    const total = fields.reduce((sum, field) => {
      const control = controls.get(field);
      const value = control ? parseInt(control.value, 10) || 0 : 0;
      return sum + value;
    }, 0);

    return total > 510 ? { evTotalExceeded: true } : null;
  };
  }

  /**
   * @description Creates a pokemonTeam object with data from the form, then either uses it to create a new pokemon or update an existing one.
   */
  savePokemon(){
    const pokemonToAdd:PokemonTeam={
      id:this.id,
      id_pokemon:this.frm.get("pokemonId")?.value,
      move_1:this.frm.get("move1")?.value,
      move_2:this.frm.get("move2")?.value,
      move_3:this.frm.get("move3")?.value,
      move_4:this.frm.get("move4")?.value,
      ability:this.frm.get("ability")?.value,
      item:this.frm.get("item")?.value,
      iv_atk:this.frm.get("ivatk")?.value,
      iv_spatk:this.frm.get("ivspatk")?.value,
      iv_def:this.frm.get("ivdef")?.value,
      iv_spdef:this.frm.get("ivspdef")?.value,
      iv_spd:this.frm.get("ivspd")?.value,
      iv_hp:this.frm.get("ivhp")?.value,
      ev_atk:this.frm.get("evatk")?.value,
      ev_spatk:this.frm.get("evspatk")?.value,
      ev_def:this.frm.get("evdef")?.value,
      ev_spdef:this.frm.get("evspdef")?.value,
      ev_spd:this.frm.get("evspd")?.value,
      ev_hp:this.frm.get("evhp")?.value,
      is_shiny:this.frm.get("isShiny")?.value,
      tera_type:this.frm.get("teratype")?.value,
      level:this.frm.get("level")?.value
    }
    console.log(pokemonToAdd);
    if(!this.id){ //if id does not exist, then we are trying to create a new pokemon
      this.addPokemon(pokemonToAdd);
    }else{
      this.updatePokemon(pokemonToAdd);
    }
  }

  /**
   * @description Adds a pokemonTeam to the DB with data from the form, then shows a message confirming the action has been realized.
   * @param pokemon The pokemonTeam to be added to the DB.
   */
  private addPokemon(pokemon:PokemonTeam){
    this.servicePokemonTeam.postPokemonTeam(pokemon).subscribe({
      next:(data)=>{
        this.serviceTeams.addPokemonToTeam(this.teamId, data.id).subscribe({
          next:(data)=>{
            Swal.fire('The pokemon has been added', "","success");
            this.frm.reset();
            this.router.navigateByUrl(`/teamBuilder/1/${this.teamId}`)
          }
        }) 
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  /**
   * @description Updates an existing pokemonTeam with data from the form, then shows a message confirming the action has been realized.
   * @param pokemon The pokemonTeam to be updated.
   */
  private updatePokemon(pokemon:PokemonTeam){
    this.servicePokemonTeam.updatePokemonTeam(pokemon).subscribe({
      next:(data)=>{
        Swal.fire('The pokemon has been updated.',"","success")
        this.frm.reset();
        this.router.navigateByUrl(`/teamBuilder/1/${this.teamId}`)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  /**
   * @description Calls to all methods to obtain the data to fill all selects + display currently selected pokemonData.
   */
  private obtainData(){
    this.obtainTypes();
    this.obtainItems();
    // no mostramos movimientos ni habilidades hasta haber seleccionado un Pokemon
    // this.obtainAbilities();
    // this.obtainMoves();
    this.obtainAllPokemonData();
  }

  /**
   * @description Calls to serviceTypes, obtains all types and stores them in aTypes array.
   */
  private obtainTypes(){
    this.serviceTypes.getTypes().subscribe({
      next:(data)=>{
        this.aTypes=data;
        // console.log(this.aTypes);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  /**
   * @description Calls to serviceItems, obtains all items and stores them in aItems array.
   */
  private obtainItems(){
    this.serviceItems.getItems().subscribe({
      next:(data)=>{
        this.aItems=data;
        console.log("items",this.aItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  /**
   * @description Calls to serviceAbilities, obtains all abilities and stores them in aAbilities array.
   */
  private obtainAbilities(pokemonId:number){
    this.serviceAbilities.getPokemonAbilities(pokemonId).subscribe({
      next:(data)=>{
        this.aAbilities=data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  /**
   * @description Calls to serviceMoves, obtains all moves and stores them in aMoves array.
   */
  private obtainMoves(pokemonId:number){
    this.serviceMoves.getPokemonMoves(pokemonId).subscribe({
      next:(data)=>{
        this.aMoves=data;
        // console.log(this.aItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  /**
   * @description Calls to servicePokemonData, obtains all PokemonData and stores it in aPokemonData array.
   */
  private obtainAllPokemonData(){
    this.servicePokemonData.getPokemonData().subscribe({
      next:(data)=>{
        this.aPokemonData=data;
        // console.log(this.aItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  /**
   * @description Method that receives an event when changing the selected pokemon and obtains various data
   * @param $event change event when user selects a different pokemon
   */
  onChangeEvent($event: MatSelectChange) {
    this.obtainPokemonDataId();
  }

  /**
   * @description Obtains the currently selected pokemon and calls to servicePokemonData to obtain their data.
   */
  private obtainPokemonDataId(){
    this.selectedPokemon = this.frm.get("pokemonId")?.value;
    console.log(this.selectedPokemon);
    if(this.selectedPokemon){
      this.servicePokemonData.getPokemonDataId(this.selectedPokemon).subscribe({
        next:(data)=>{
          this.aPokemonDataId=data;
          console.log(this.aPokemonDataId);
          this.setStatBars();
          this.obtainPokemonTypes();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

  /**
   * @description Calls to serviceTypes and obtains the types of the currently selected pokemon 
   */
  obtainPokemonTypes(){
    this.serviceTypes.getPokemonDataTypes(this.selectedPokemon).subscribe({
      next:(data)=>{
        this.aPokemonTypes=data;
        console.log(this.aPokemonTypes);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  /**
   * @description Creates 6 elements in aStatbar array with the corresponding width and color so they may be displayed onscreen.
   */
  private setStatBars(){
    this.aStatbar=[];
    // gets the base stats of the currently selected pokemon
    const statValues = [this.aPokemonDataId[0].base_hp,this.aPokemonDataId[0].base_atk,
    this.aPokemonDataId[0].base_def,this.aPokemonDataId[0].base_spatk,this.aPokemonDataId[0].base_spdef,this.aPokemonDataId[0].base_spd,];
    // console.log(statValues);
    for (let index = 0; index < statValues.length; index++) {
      const valuePercent = Math.round((statValues[index]/200)*100)
      let colorBar="";
      // sets what color the statbar should have depending on how high the base stat should be
      if(statValues[index]<30){
       colorBar = "#f34444";
      }else if(statValues[index]>=30 && statValues[index]<=59){
       colorBar = "#ff7f0f";
      }else if(statValues[index]>=60 && statValues[index]<=89){
       colorBar = "#ffdd57";
      }else if(statValues[index]>=90 && statValues[index]<=119){
       colorBar = "#a0e515";
      }else if(statValues[index]>=120 && statValues[index]<=149){
       colorBar = "#23cd5e";
      }else if(statValues[index]>=150){
       colorBar = "#00c2b8";
      }

      // creates a Statbar object with the corresponding width and color, then pushes it inside the aStatbar array.
      const stat:Statbar={
        width: valuePercent+"%",
        color: colorBar
      }

      this.aStatbar.push(stat)
    }
  }
  // Getter to cast the control to FormControl
  get pokemonControl(): FormControl {
    return this.frm.get('pokemonId') as FormControl;
  }
}
