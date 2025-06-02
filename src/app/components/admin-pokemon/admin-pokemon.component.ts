import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { Type } from '../../models/type';
import { TypesService } from '../../services/types/types.service';
import { PokemonData } from '../../models/pokemon-data';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-pokemon',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, 
  MatFormFieldModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatIconModule],
  templateUrl: './admin-pokemon.component.html',
  styles: ``
})
export class AdminPokemonComponent {
  public frm!:FormGroup;
  public aTypes:Type[]=[];
  public fileName: string = '';
  public id!:number;

  private activateRoute = inject(ActivatedRoute)
  private router = inject(Router);
  private serviceTypes=inject(TypesService);
  private servicePokemonData=inject(PokemonDataService);

  private fb = inject(FormBuilder)
  ngOnInit(){
    this.validacionesFrm();
    this.loadTypes();
    this.loadUpdate();
  }

  private validacionesFrm(){
    this.frm=this.fb.group({
      id:[""],
      name_en:["",[Validators.required]],
      name_es:["",[Validators.required]],
      pokedex_id:["",[Validators.required]],
      type_1:["",[Validators.required]],
      type_2:[""],
      base_hp:["",[Validators.required]],
      base_atk:["",[Validators.required]],
      base_def:["",[Validators.required]],
      base_spatk:["",[Validators.required]],
      base_spdef:["",[Validators.required]],
      base_spd:["",[Validators.required]],
      image:[null,[Validators.required]],
      imageShiny:[null,[Validators.required]]
    })
  }

  private loadUpdate(){
    this.activateRoute.paramMap.subscribe(params=>{
      this.id = parseInt(params.get("id")!);
    })
    //if id exists, load pokemonData info into inputs for editing
    if(this.id){
      this.servicePokemonData.getPokemonDataId(this.id).subscribe({
        next:(data)=>{
          console.log(data);
          this.frm.get("id")?.setValue(this.id);
          this.frm.get("name_en")?.setValue(data[0].name_en);
          this.frm.get("name_es")?.setValue(data[0].name_es);
          this.frm.get("pokedex_id")?.setValue(data[0].pokedex_id);
          this.frm.get("type_1")?.setValue(data[0].type);
          this.frm.get("type_2")?.setValue(data[0].type_2);
          this.frm.get("base_hp")?.setValue(data[0].base_hp);
          this.frm.get("base_atk")?.setValue(data[0].base_atk);
          this.frm.get("base_def")?.setValue(data[0].base_def);
          this.frm.get("base_spatk")?.setValue(data[0].base_spatk);
          this.frm.get("base_spdef")?.setValue(data[0].base_spdef);
          this.frm.get("base_spd")?.setValue(data[0].base_spd);
          
        },
        error:(err)=>{
          console.log(err);
        }
      })

    }
  }

  private loadTypes(){
    this.serviceTypes.getTypes().subscribe({
      next:(data)=>{
        this.aTypes=data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onFileChange(event: Event, controlName: 'image' | 'imageShiny'): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      console.log(file);
      this.frm.patchValue({ [controlName]: file });
      this.frm.get(controlName)?.markAsTouched();
    }
  }

  triggerFileInput(inputId: 'image' | 'imageShiny'): void {
    const input = document.getElementById(inputId) as HTMLInputElement;
    input?.click();
  }


  savePokemon() {
    let type1 = this.frm.get("type_1")?.value;
    let type2 = this.frm.get("type_2")?.value;
    //if type2 is null or type2 is equal to type1, set type2 to null (pokemon is monotype)
    if(!type2|| type2 === type1){
      type2=null;
    }
    const pokemonToAdd = new FormData();
    //create pokemon to add to database, by default set name_es as same as name_en
    pokemonToAdd.append("id",this.frm.get("id")?.value);
    pokemonToAdd.append('pokedex_id',this.frm.get("pokedex_id")?.value);
    pokemonToAdd.append('name_en',this.frm.get("name_en")?.value);
    pokemonToAdd.append('name_es',this.frm.get("name_es")?.value);
    pokemonToAdd.append('type',type1);
    pokemonToAdd.append("type_2",type2);
    pokemonToAdd.append('base_atk',this.frm.get("base_atk")?.value);
    pokemonToAdd.append('base_def',this.frm.get("base_def")?.value);
    pokemonToAdd.append('base_spatk',this.frm.get("base_spatk")?.value);
    pokemonToAdd.append('base_spdef',this.frm.get("base_spdef")?.value);
    pokemonToAdd.append('base_spd',this.frm.get("base_spd")?.value);
    pokemonToAdd.append('base_hp',this.frm.get("base_hp")?.value);

    pokemonToAdd.append("image", this.frm.get("image")?.value);
    pokemonToAdd.append("image_shiny", this.frm.get("imageShiny")?.value);
    console.log(pokemonToAdd);
    if(!this.id){ //if id does not exist, then we are trying to create a new pokemon
      this.addPokemon(pokemonToAdd);
    }else{
      this.updatePokemon(pokemonToAdd);
    }
  }

  private addPokemon(pokemon:FormData){
    this.servicePokemonData.postPokemonData(pokemon).subscribe({
      next:(data)=>{
        Swal.fire('The pokemon has been added', "","success");
        this.frm.reset();
        this.router.navigateByUrl(`/adminPanel`);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  private updatePokemon(pokemon:FormData){
    this.servicePokemonData.updatePokemonData(pokemon).subscribe({
      next:(data)=>{
        Swal.fire('The pokemon has been updated',"","success");
        this.frm.reset();
        this.router.navigateByUrl('/adminPanel')
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
