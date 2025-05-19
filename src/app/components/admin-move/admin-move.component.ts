import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { Type } from '../../models/type';
import { ActivatedRoute, Router } from '@angular/router';
import { TypesService } from '../../services/types/types.service';
import { MovesService } from '../../services/moves/moves.service';
import { Move } from '../../models/move';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-move',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './admin-move.component.html',
  styles: ``
})
export class AdminMoveComponent {
  public frm!:FormGroup;
  public aTypes:Type[]=[];
  public id!:number;

  private activateRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private serviceTypes = inject(TypesService)
  private serviceMoves = inject(MovesService)
  private fb = inject(FormBuilder)

  ngOnInit(){
    this.loadTypes();
    this.validacionesFrm();
    this.loadUpdate();
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

    private validacionesFrm(){
    this.frm=this.fb.group({
      name_en:["",[Validators.required]],
      name_es:["",[Validators.required]],
      description_en:["",[Validators.required]],
      description_es:["",[Validators.required]],
      type:["",[Validators.required]],
      power:["",[Validators.required]],
      accuracy:["",[Validators.required]],
    })
  }

  private loadUpdate(){
    this.activateRoute.paramMap.subscribe(params=>{
      this.id = parseInt(params.get("id")!);
    })
    //if id exists, load pokemonData info into inputs for editing
    if(this.id){
      this.serviceMoves.getMove(this.id).subscribe({
        next:(data)=>{
          console.log(data);
          this.frm.get("name_en")?.setValue(data[0].name_en);
          this.frm.get("name_es")?.setValue(data[0].name_es);
          this.frm.get("description_en")?.setValue(data[0].description_en);
          this.frm.get("description_es")?.setValue(data[0].description_es);
          this.frm.get("type")?.setValue(data[0].type);
          this.frm.get("power")?.setValue(data[0].power);
          this.frm.get("accuracy")?.setValue(data[0].accuracy);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

  saveMove(){
    const moveToAdd:Move={
      id:this.id,
      name_en:this.frm.get("name_en")?.value,
      name_es:this.frm.get("name_es")?.value,
      description_en:this.frm.get("description_en")?.value,
      description_es:this.frm.get("description_es")?.value,
      type:this.frm.get("type")?.value,
      power:this.frm.get("power")?.value,
      accuracy:this.frm.get("accuracy")?.value,
    }
    console.log(moveToAdd);
    if(!this.id){ //if id does not exist, then we are trying to create a new pokemon
      this.addMove(moveToAdd);
    }else{
      this.updateMove(moveToAdd);
    }
  }

  private addMove(move: Move) {
    this.serviceMoves.postMove(move).subscribe({
      next: (data) => {
        Swal.fire('The move has been added', "", "success");
        this.frm.reset();
        this.router.navigateByUrl(`/adminPanel`);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private updateMove(move: Move) {
    this.serviceMoves.updateMove(move).subscribe({
      next: (data) => {
        Swal.fire('The move has been updated', "", "success");
        this.frm.reset();
        this.router.navigateByUrl('/adminPanel')
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
}
