import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Team } from '../../models/team';
import { Item } from '../../models/item';
import { Ability } from '../../models/ability';
import { Move } from '../../models/move';
import { PokemonData } from '../../models/pokemon-data';
import { Router } from '@angular/router';
import { ItemsService } from '../../services/items/items.service';
import { AbilitiesService } from '../../services/abilities/abilities.service';
import { MovesService } from '../../services/moves/moves.service';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminpanel',
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
  templateUrl: './adminpanel.component.html',
  styles: ``
})
export class AdminpanelComponent {
  public frm!:FormGroup;
  public aItems:Item[]=[];
  public aAbilities:Ability[]=[];
  public aMoves:Move[]=[];
  public aPokemonData:PokemonData[]=[];
  public aUsers:User[]=[];
  public aCurrentArray:any[]=[];
  public selectedOption!:Number;
  // inyectar servicios
  private fb=inject(FormBuilder)
  private router = inject(Router)
  private serviceItems = inject(ItemsService)
  private serviceAbilities = inject(AbilitiesService)
  private serviceMoves = inject(MovesService)
  private servicePokemonData = inject(PokemonDataService)
  private serviceUsers = inject(UsersService)

  ngOnInit(){
    this.loadItems();
    this.loadAbilities();
    this.loadMoves();
    this.loadPokemonData();
    this.loadUsers();
    this.frm = this.fb.group({
      selectElement:[""]
    });
  }
  
  onChangeEvent($event: Event) {
    this.selectedOption= parseInt(this.frm.get("selectElement")?.value);
    console.log(this.selectedOption);
    this.aCurrentArray = this.currentArray();
  }

  private loadItems(){
    this.serviceItems.getItems().subscribe({
      next:(data)=>{
        this.aItems=data;
        //add entityType to each Item so we may know later if it's an item to send to correct urls
        this.aItems.forEach(element => {
          element.entityType="item";
        });
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  private loadAbilities(){
    this.serviceAbilities.getAbilities().subscribe({
      next:(data)=>{
        this.aAbilities=data;
        //add entityType to each ability so we may know later if it's an ability to send to correct urls
        this.aAbilities.forEach(element => {
          element.entityType="ability";
        });
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  private loadMoves(){
    this.serviceMoves.getMoves().subscribe({
      next:(data)=>{
        this.aMoves=data;
        //add entityType to each move so we may know later if it's a move to send to correct urls
        this.aMoves.forEach(element => {
          element.entityType="move";
        });
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  private loadPokemonData(){
    this.servicePokemonData.getPokemonData().subscribe({
      next:(data)=>{
        this.aPokemonData=data;
        //add entityType to each pokemon so we may know later if it's a pokemon to send to correct urls
        this.aPokemonData.forEach(element => {
          element.entityType="pokemonData";
        });
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  private loadUsers(){
    this.serviceUsers.getUsers().subscribe({
      next:(data)=>{
        this.aUsers=data;
        // add entityType to each user so we may know later if it's a user to send to correct urls
        this.aUsers.forEach(element=>{
          element.entityType="user";
        })
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
  private currentArray(): any[] {
    switch (this.selectedOption) {
      case 1:
        console.log("option 1,pokemon", this.aPokemonData);
        return this.aPokemonData;
      case 2:
        console.log("option 2,moves");
        return this.aMoves;
      case 3:
        console.log("option 3, items");
        return this.aItems;
      case 4:
        console.log("option 4, abilities");
        return this.aAbilities;
      case 5:
        console.log("option 5, users");
        return this.aUsers;
      default:
        console.log("default");
        return [];
    }
  }
  /**
   * @description Redirects to the adminElement of the appropiate type to create a new element: adminPokemon if pokemons are selected to create a new Pokemon, adminMoves to create a new move, etc.
   */
  createElement(){
    switch (this.selectedOption) {
      case 1:
        console.log("crear pokemon");
        this.router.navigateByUrl('/adminPokemon');
        break;
      case 2:
        console.log("crear moves");
        this.router.navigateByUrl('/adminMoves');
        break;
      case 3:
        console.log("crear items");
        this.router.navigateByUrl('/adminItems');
        break;
      case 4:
        console.log("crear abilities");
        this.router.navigateByUrl('/adminAbilities');
        break;
      case 5:
        console.log("crear users");
        this.router.navigateByUrl('/register');
        break;
      default:
        Swal.fire("Please select an option first", '', 'warning');
    }
  }

  /**
   * @description Redirects to the team whose edit icon was clicked.
   * @param team The team to edit.
   */
  editElement(element:any){
    if(this.isPokemonData(element)){
      console.log("it's a pokemon");
      this.router.navigateByUrl(`/adminPokemon/${element.id}`)
    }else if(this.isMove(element)){
      console.log("its a move");
      this.router.navigateByUrl(`/adminMoves/${element.id}`);
    }else if(this.isItem(element)){
      console.log("it's an item");
      this.router.navigateByUrl(`adminItems/${element.id}`);
    }else if(this.isAbility(element)){
      console.log("it's an ability");
      this.router.navigateByUrl(`adminAbilities/${element.id}`);
    }else{
      console.log("Error. No type was found.");
    }
  }

  deleteElement(element:any){
    if(this.isPokemonData(element)){
      Swal.fire({
        title: `¿Are you sure you wish to delete the Pokemon ${element.name_en}?`,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // si se pulsa boton de confirmar, eliminar tarea
          this.servicePokemonData.deletePokemonData(element.id!).subscribe({
            next: (data) => {
              Swal.fire(`${data.message}`, '', 'success');
              this.loadPokemonData(); //actualizamos la tabla
              this.frm.get("selectElement")?.setValue(""); //reseteamos el select
            },
            error: (err) => {
              Swal.fire(`${err.message}`, '', 'error');
            },
          });
        }
      });
    }else if(this.isMove(element)){
            Swal.fire({
        title: `¿Are you sure you wish to delete the move ${element.name_en}?`,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // si se pulsa boton de confirmar, eliminar tarea
          this.serviceMoves.deleteMove(element.id!).subscribe({
            next: (data) => {
              Swal.fire(`${data.message}`, '', 'success');
              this.loadMoves(); //actualizamos la tabla
              this.frm.get("selectElement")?.setValue(""); //reseteamos el select
            },
            error: (err) => {
              Swal.fire(`${err.message}`, '', 'error');
            },
          });
        }
      });
    }else if(this.isItem(element)){
            Swal.fire({
        title: `¿Are you sure you wish to delete the item ${element.name_en}?`,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // si se pulsa boton de confirmar, eliminar tarea
          this.serviceItems.deleteItem(element.id!).subscribe({
            next: (data) => {
              Swal.fire(`${data.message}`, '', 'success');
              this.loadItems(); //actualizamos la tabla
              this.frm.get("selectElement")?.setValue(""); //reseteamos el select
            },
            error: (err) => {
              Swal.fire(`${err.message}`, '', 'error');
            },
          });
        }
      });
    }else if(this.isAbility(element)){
            Swal.fire({
        title: `¿Are you sure you wish to delete the ability ${element.name_en}?`,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // si se pulsa boton de confirmar, eliminar tarea
          this.serviceAbilities.deleteAbility(element.id!).subscribe({
            next: (data) => {
              Swal.fire(`${data.message}`, '', 'success');
              this.loadAbilities(); //actualizamos la tabla
              this.frm.get("selectElement")?.setValue(""); //reseteamos el select
            },
            error: (err) => {
              Swal.fire(`${err.message}`, '', 'error');
            },
          });
        }
      });
    }else{
      console.log("Error. No type was found.");
    }
  }

  isPokemonData(element: any): element is PokemonData {
    return element.entityType==='pokemonData';
  }
  isMove(element: any): element is Move {
    return element.entityType==='move';
  }
  isItem(element: any): element is Item {
    return element.entityType==='item';
  }
  isAbility(element: any): element is Ability {
    return element.entityType==='ability';
  }
}
