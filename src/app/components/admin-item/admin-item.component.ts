import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ItemsService } from '../../services/items/items.service';
import { Item } from '../../models/item';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-item',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './admin-item.component.html',
  styles: ``
})
export class AdminItemComponent {
  public frm!:FormGroup;
  public id!:number;

  private activateRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private serviceItems = inject(ItemsService)
  private fb = inject(FormBuilder)

  ngOnInit(){
    this.validacionesFrm();
    this.loadUpdate();
  }

  private validacionesFrm(){
    this.frm=this.fb.group({
      name_en:["",[Validators.required]],
      name_es:["",[Validators.required]],
      description_en:["",[Validators.required]],
      description_es:["",[Validators.required]],
      image:["",[Validators.required]]
    })
  }
  private loadUpdate() {
    this.activateRoute.paramMap.subscribe(params => {
      this.id = parseInt(params.get("id")!);
    })
    //if id exists, load pokemonData info into inputs for editing
    if (this.id) {
      this.serviceItems.getItem(this.id).subscribe({
        next: (data) => {
          console.log(data);
          this.frm.get("name_en")?.setValue(data[0].name_en);
          this.frm.get("name_es")?.setValue(data[0].name_es);
          this.frm.get("description_en")?.setValue(data[0].description_en);
          this.frm.get("description_es")?.setValue(data[0].description_es);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
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

  saveItem(){
    const itemToAdd:Item={
      id:this.id,
      name_en:this.frm.get("name_en")?.value,
      name_es:this.frm.get("name_es")?.value,
      description_en:this.frm.get("description_en")?.value,
      description_es:this.frm.get("description_es")?.value,
      image:this.frm.get("image")?.value.name
    }
    console.log(itemToAdd);
    if(!this.id){
      this.addItem(itemToAdd)
    }else{
      this.updateItem(itemToAdd)
    }
  }

  private addItem(item:Item){
    this.serviceItems.postItem(item).subscribe({
      next:(data)=>{
        Swal.fire("The item has been created","","success");
        this.frm.reset();
        this.router.navigateByUrl('/adminPanel');
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  private updateItem(item:Item){
    this.serviceItems.updateItem(item).subscribe({
      next:(data)=>{
        Swal.fire("The item has been updated","","success");
        this.frm.reset();
        this.router.navigateByUrl("/adminPanel")
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
