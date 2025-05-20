import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { Type } from '../../models/type';
import { PokemonData } from '../../models/pokemon-data';
import { Move } from '../../models/move';
import { Ability } from '../../models/ability';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { MovesService } from '../../services/moves/moves.service';
import { AbilitiesService } from '../../services/abilities/abilities.service';

@Component({
  selector: 'app-add-abilities-moves-pokemon',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, 
  MatFormFieldModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatIconModule],
  templateUrl: './add-abilities-moves-pokemon.component.html',
  styles: ``
})
export class AddAbilitiesMovesPokemonComponent {
  public frm!:FormGroup;
  public aPokemonData:PokemonData[]=[];
  public aMoves:Move[]=[];
  public aAbilities:Ability[]=[];

  private servicePokemonData = inject(PokemonDataService)
  private serviceMoves = inject(MovesService)
  private serviceAbilities=inject(AbilitiesService)

  private fb = inject(FormBuilder)
  ngOnInit(){
    this.validacionesFrm();
    this.loadData();
  }

  private validacionesFrm(){
    this.frm=this.fb.group({
      pokemonId:["",[Validators.required]],
      abilities:["",[Validators.required]],
      moves:["",[Validators.required]]
    })
  }

  private loadData(){
    this.servicePokemonData.getPokemonData().subscribe({
      next:(data)=>{
        this.aPokemonData=data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.serviceAbilities.getAbilities().subscribe({
      next:(data)=>{
        this.aAbilities=data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.serviceMoves.getMoves().subscribe({
      next:(data)=>{
        this.aMoves=data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  savePokemon(){
    // obtain all ids of all selected moves/abilities
    const pokemonId = this.frm.get("pokemonId")?.value
    const abilitiesId = this.frm.get("abilities")?.value;
    const movesId = this.frm.get("moves")?.value;
    // in order to add all selected moves and abilities to db, first we create a map with the pokemonId and the move/ability id
    const abilityMap = abilitiesId.map((abilityId: number)=>({
      pokemonId: pokemonId,
      abilityId:abilityId
    }));

    const movesMap = movesId.map((moveId: number)=>({
      pokemonId: pokemonId,
      moveId:moveId
    }));

    console.log(abilityMap);
    console.log(movesMap);

    this.servicePokemonData.addAbilitiesToPokemon(abilityMap).subscribe({
      next:(data)=>{
        console.log("added abilities to pokemon");
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.servicePokemonData.addMovesToPokemon(movesMap).subscribe({
      next:(data)=>{
        console.log("added moves to pokemon");
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
