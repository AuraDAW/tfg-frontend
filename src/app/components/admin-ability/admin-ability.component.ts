import { Component, inject } from '@angular/core';
import { AbilitiesService } from '../../services/abilities/abilities.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Ability } from '../../models/ability';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-ability',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './admin-ability.component.html',
  styles: ``
})
export class AdminAbilityComponent {
  public frm!:FormGroup;
  public id!:number;

  private activateRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private serviceAbilities = inject(AbilitiesService)
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
    })
  }
  private loadUpdate() {
    this.activateRoute.paramMap.subscribe(params => {
      this.id = parseInt(params.get("id")!);
    })
    //if id exists, load ability info into inputs for editing
    if (this.id) {
      this.serviceAbilities.getAbility(this.id).subscribe({
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

  saveAbility() {
    const abilityToAdd: Ability = {
      id: this.id,
      name_en: this.frm.get("name_en")?.value,
      name_es: this.frm.get("name_es")?.value,
      description_en: this.frm.get("description_en")?.value,
      description_es: this.frm.get("description_es")?.value,
    }
    console.log(abilityToAdd);
    if (!this.id) {
      this.addAbility(abilityToAdd)
    } else {
      this.updateAbility(abilityToAdd)
    }
  }

  private addAbility(ability: Ability) {
    this.serviceAbilities.postAbility(ability).subscribe({
      next: (data) => {
        Swal.fire("The ability has been created", "", "success");
        this.frm.reset();
        this.router.navigateByUrl('/adminPanel');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  private updateAbility(ability: Ability) {
    this.serviceAbilities.updateAbility(ability).subscribe({
      next: (data) => {
        Swal.fire("The ability has been updated", "", "success");
        this.frm.reset();
        this.router.navigateByUrl("/adminPanel")
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
