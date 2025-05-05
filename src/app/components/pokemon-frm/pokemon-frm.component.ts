import { Component, inject } from '@angular/core';
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
import { Router } from '@angular/router';
import { Statbar } from '../../models/statbar';
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
  // definir arrays para rellenar con datos de la BD
  public aTypes : Type[]=[];
  public aItems:Item[]=[];
  public aAbilities:Ability[]=[];
  public aMoves:Move[]=[];
  public aPokemonData:PokemonData[]=[];
  public aPokemonDataId:PokemonData[]=[];

  // inyectar servicios
  private fb=inject(FormBuilder)
  private router = inject(Router)
  private serviceTypes = inject(TypesService)
  private serviceItems = inject(ItemsService)
  private serviceAbilities = inject(AbilitiesService)
  private serviceMoves = inject(MovesService)
  private servicePokemonData = inject(PokemonDataService)


  ngOnInit(){
    this.validacionesFrm();
    this.obtainData()
  }

  private validacionesFrm(){
    this.frm=this.fb.group({
      pokemonId:["",[Validators.required]],
      ability:['', [Validators.required]],
      item:['', [Validators.required]],
      level:['100', [Validators.required, Validators.min(1), Validators.max(100)]],
      teratype:['', [Validators.required]],
      isShiny:['',],
      move1:['', [Validators.required]],
      move2:['', [Validators.required]],
      move3:['', [Validators.required]],
      move4:['', [Validators.required]],
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
  private obtainData(){
    this.obtainTypes();
    this.obtainItems();
    this.obtainAbilities();
    this.obtainMoves();
    this.obtainPokemonData();
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

  private obtainPokemonData(){
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

  obtainPokemonDataId($event: Event) {
    this.selectedPokemon = this.frm.get("pokemonId")?.value;
    if(this.selectedPokemon){
      this.servicePokemonData.getPokemonDataId(this.selectedPokemon).subscribe({
        next:(data)=>{
          this.aPokemonDataId=data;
          console.log(this.aPokemonDataId);
          this.setStatBars();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

  private setStatBars(){
    this.aStatbar=[];
    const statValues = [this.aPokemonDataId[0].base_hp,this.aPokemonDataId[0].base_atk,
    this.aPokemonDataId[0].base_def,this.aPokemonDataId[0].base_spatk,this.aPokemonDataId[0].base_spdef,this.aPokemonDataId[0].base_spd,];
    console.log(statValues);
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

    console.log(this.aStatbar);
    // const hpPercent = Math.round((this.aPokemonDataId[0].base_hp/200)*100)
    // this.hpbar={
    //   width:  hpPercent + "%",
    //   color: "#00c2b8"
    // }
    // console.log(this.hpbar);
  }
}
