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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Statbar } from '../../models/statbar';
import { PokemonTeam } from '../../models/pokemon-team';
import { PokemonTeamService } from '../../services/pokemon-team/pokemon-team.service';
import Swal from 'sweetalert2';
import { D } from '@angular/cdk/keycodes';
import { TeamsService } from '../../services/teams/teams.service';
@Component({
  selector: 'app-pokemon-frm',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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

  ngOnInit(){
    this.obtainId();
    this.validacionesFrm();
    this.obtainData();
    this.obtainDataForUpdate();
  }

  private obtainId(){
    this.activateRoute.paramMap.subscribe(params=>{
      this.teamId = parseInt(params.get("teamId")!);
      this.id = parseInt(params.get("id")!);
    })
    console.log("teamId", this.teamId);
    console.log("id", this.id);
  }

  private obtainDataForUpdate(){
    if(this.id){ //if id exists = we are trying to update a pokemon, otherwise this method does not execute
      this.servicePokemonTeam.getPokemonTeamId(this.id).subscribe({
        next:(data)=>{
          // console.log(data);
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
    })
  }

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
    if(!this.id){ //si no existe el ID como parametro, es decir, estamos creando una nueva tarea
      this.addPokemon(pokemonToAdd);
    }else{
      this.updatePokemon(pokemonToAdd);
    }
  }

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

  private obtainData(){
    this.obtainTypes();
    this.obtainItems();
    this.obtainAbilities();
    this.obtainMoves();
    this.obtainAllPokemonData();
  }

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

  private obtainItems(){
    this.serviceItems.getItems().subscribe({
      next:(data)=>{
        this.aItems=data;
        // console.log(this.aItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  private obtainAbilities(){
    this.serviceAbilities.getAbilities().subscribe({
      next:(data)=>{
        this.aAbilities=data;
        // console.log(this.aItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  private obtainMoves(){
    this.serviceMoves.getMoves().subscribe({
      next:(data)=>{
        this.aMoves=data;
        // console.log(this.aItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

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

  onChangeEvent($event: Event) {
    this.obtainPokemonDataId();
  }

  private obtainPokemonDataId(){
    this.selectedPokemon = this.frm.get("pokemonId")?.value;
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

  private setStatBars(){
    this.aStatbar=[];
    const statValues = [this.aPokemonDataId[0].base_hp,this.aPokemonDataId[0].base_atk,
    this.aPokemonDataId[0].base_def,this.aPokemonDataId[0].base_spatk,this.aPokemonDataId[0].base_spdef,this.aPokemonDataId[0].base_spd,];
    // console.log(statValues);
    for (let index = 0; index < statValues.length; index++) {
      const valuePercent = Math.round((statValues[index]/200)*100)
      let colorBar="";
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

      const stat:Statbar={
        width: valuePercent+"%",
        color: colorBar
      }

      this.aStatbar.push(stat)
    }

    // console.log(this.aStatbar);
  }


}
