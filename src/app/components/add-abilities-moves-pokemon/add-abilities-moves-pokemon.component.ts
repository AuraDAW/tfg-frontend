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
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  private router = inject(Router);

  private fb = inject(FormBuilder)
  ngOnInit(){
    this.validacionesFrm();
    this.loadData();
    // subscribe to changes in pokemonId, so that when the user selects a pokemon we can check the moves and abilities it already has
    this.frm.get('pokemonId')!.valueChanges.subscribe(pokemon => {
      this.selectExistingMovesAbilities(pokemon);
    });
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
        this.servicePokemonData.addMovesToPokemon(movesMap).subscribe({
          next:(data)=>{
            Swal.fire("The moves and abilities have been added to the pokemon", "", "success");
            this.frm.reset();
            this.router.navigateByUrl('/adminPanel');
          },
          error:(err)=>{
            console.log(err);
          }
        })
      },
      error:(err)=>{
        console.log(err);
      }
    })
    
  }

  private selectExistingMovesAbilities(pokemonId:number) {
    this.serviceAbilities.getPokemonAbilities(pokemonId).subscribe({
      next:(data)=>{
        const abilitiesIds = data.map((ability: Ability) => ability.id);
        this.frm.get('abilities')?.setValue(abilitiesIds);
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.serviceMoves.getPokemonMoves(pokemonId).subscribe({
      next:(data)=>{
        const movesIds = data.map((move: Move) => move.id);
        this.frm.get('moves')?.setValue(movesIds);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
