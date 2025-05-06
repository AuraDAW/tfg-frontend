<<<<<<< HEAD
import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
=======
import { Component, inject } from '@angular/core';
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
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
<<<<<<< HEAD
import { ActivatedRoute, Router } from '@angular/router';
import { Statbar } from '../../models/statbar';
import { PokemonTeam } from '../../models/pokemon-team';
import { PokemonTeamService } from '../../services/pokemon-team/pokemon-team.service';
import Swal from 'sweetalert2';
=======
import { Router } from '@angular/router';
import { Statbar } from '../../models/statbar';
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
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
<<<<<<< HEAD
  public teamId!:number;
  public id!:number
=======
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
  // definir arrays para rellenar con datos de la BD
  public aTypes : Type[]=[];
  public aItems:Item[]=[];
  public aAbilities:Ability[]=[];
  public aMoves:Move[]=[];
  public aPokemonData:PokemonData[]=[];
  public aPokemonDataId:PokemonData[]=[];
<<<<<<< HEAD
  public aPokemonTypes:Type[]=[];
=======
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f

  // inyectar servicios
  private fb=inject(FormBuilder)
  private router = inject(Router)
<<<<<<< HEAD
  private activateRoute = inject(ActivatedRoute)
=======
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
  private serviceTypes = inject(TypesService)
  private serviceItems = inject(ItemsService)
  private serviceAbilities = inject(AbilitiesService)
  private serviceMoves = inject(MovesService)
  private servicePokemonData = inject(PokemonDataService)
<<<<<<< HEAD
  private servicePokemonTeam = inject(PokemonTeamService)

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
=======


  ngOnInit(){
    this.validacionesFrm();
    this.obtainData()
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
  }

  private validacionesFrm(){
    this.frm=this.fb.group({
      pokemonId:["",[Validators.required]],
      ability:['', [Validators.required]],
      item:['', [Validators.required]],
<<<<<<< HEAD
      level:['100', [Validators.min(1), Validators.max(100)]],
      teratype:['', [Validators.required]],
      isShiny:[''],
=======
      level:['100', [Validators.required, Validators.min(1), Validators.max(100)]],
      teratype:['', [Validators.required]],
      isShiny:['',],
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
      move1:['', [Validators.required]],
      move2:['', [Validators.required]],
      move3:['', [Validators.required]],
      move4:['', [Validators.required]],
<<<<<<< HEAD
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
        Swal.fire('El pokemon ha sido añadido',"","success")
        this.frm.reset();
        this.router.navigateByUrl(`/teamBuilder/1/${this.teamId}`)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  private updatePokemon(pokemon:PokemonTeam){
    this.servicePokemonTeam.updatePokemonTeam(pokemon).subscribe({
      next:(data)=>{
        Swal.fire(`${data.message}`,"","success")
        this.frm.reset();
        this.router.navigateByUrl("/teamBuilder/1")
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

=======
      evhp:['0', [Validators.required, Validators.min(1), Validators.max(252)]],
      ivhp:['31', [Validators.required, Validators.min(0), Validators.max(31)]],
      evatk:['0', [Validators.required, Validators.min(1), Validators.max(252)]],
      ivatk:['31', [Validators.required, Validators.min(0), Validators.max(31)]],
      evdef:['0', [Validators.required, Validators.min(1), Validators.max(252)]],
      ivdef:['31', [Validators.required, Validators.min(0), Validators.max(31)]],
      evspatk:['0', [Validators.required, Validators.min(1), Validators.max(252)]],
      ivspatk:['31', [Validators.required, Validators.min(0), Validators.max(31)]],
      evspdef:['0', [Validators.required, Validators.min(1), Validators.max(252)]],
      ivspdef:['31', [Validators.required, Validators.min(0), Validators.max(31)]],
      evspd:['0', [Validators.required, Validators.min(1), Validators.max(252)]],
      ivspd:['31', [Validators.required, Validators.min(0), Validators.max(31)]],
    })
  }
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
  private obtainData(){
    this.obtainTypes();
    this.obtainItems();
    this.obtainAbilities();
    this.obtainMoves();
<<<<<<< HEAD
    this.obtainAllPokemonData();
=======
    this.obtainPokemonData();
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
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

<<<<<<< HEAD
  private obtainAllPokemonData(){
=======
  private obtainPokemonData(){
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
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

<<<<<<< HEAD
  onChangeEvent($event: Event) {
    this.obtainPokemonDataId();
  }

  private obtainPokemonDataId(){
=======
  obtainPokemonDataId($event: Event) {
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
    this.selectedPokemon = this.frm.get("pokemonId")?.value;
    if(this.selectedPokemon){
      this.servicePokemonData.getPokemonDataId(this.selectedPokemon).subscribe({
        next:(data)=>{
          this.aPokemonDataId=data;
          console.log(this.aPokemonDataId);
          this.setStatBars();
<<<<<<< HEAD
          this.obtainPokemonTypes();
=======
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

<<<<<<< HEAD
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

=======
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
  private setStatBars(){
    this.aStatbar=[];
    const statValues = [this.aPokemonDataId[0].base_hp,this.aPokemonDataId[0].base_atk,
    this.aPokemonDataId[0].base_def,this.aPokemonDataId[0].base_spatk,this.aPokemonDataId[0].base_spdef,this.aPokemonDataId[0].base_spd,];
<<<<<<< HEAD
    // console.log(statValues);
=======
    console.log(statValues);
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
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

<<<<<<< HEAD
    // console.log(this.aStatbar);
  }


=======
    console.log(this.aStatbar);
    // const hpPercent = Math.round((this.aPokemonDataId[0].base_hp/200)*100)
    // this.hpbar={
    //   width:  hpPercent + "%",
    //   color: "#00c2b8"
    // }
    // console.log(this.hpbar);
  }
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
}
