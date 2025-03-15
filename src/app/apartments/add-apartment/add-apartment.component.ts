import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apartment } from 'src/app/Core/Models/apartment';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent {
  apartForm = new FormGroup({
    apartNum: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    floorNum: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    surface: new FormControl('', Validators.required),
    terrace: new FormControl(false),
    surfaceTerrace: new FormControl({ value: '', disabled: true }), // Désactivé par défaut
    category: new FormControl('', Validators.required),
    residenceId: new FormControl('', Validators.required)
  });
  newApart!: Apartment;

  constructor() {
    this.apartForm.get('terrace')?.valueChanges.subscribe(value => {
      if (value) {
        this.apartForm.get('surfaceTerrace')?.enable();
      } else {
        this.apartForm.get('surfaceTerrace')?.disable();
        this.apartForm.get('surfaceTerrace')?.setValue('');
      }
    });
  }


  onSubmit() {
    if (this.apartForm.valid) {
      this.newApart = {
        apartNum: Number(this.apartForm.value.apartNum),
        floorNum: Number(this.apartForm.value.floorNum),
        surface: Number(this.apartForm.value.surface),
        terrace: this.apartForm.value.terrace || false, 
        surfaceTerrace: this.apartForm.value.terrace ? Number(this.apartForm.value.surfaceTerrace) : 0,
        category: this.apartForm.value.category!,
        residenceId: Number(this.apartForm.value.residenceId)
      };
  
      console.log("Nouvel appartement ajouté :", this.newApart);
      this.apartForm.reset(); 
    }
  }
  

  isFieldInvalid(field: string): boolean {
    return !!(this.apartForm.get(field)?.invalid && this.apartForm.get(field)?.touched);
  }

  onTerraceChange() {
    const terraceValue = this.apartForm.get('terrace')?.value;
    if (terraceValue === true) { // Vérification correcte pour un boolean
      this.apartForm.get('surfaceTerrace')?.enable();
    } else {
      this.apartForm.get('surfaceTerrace')?.disable();
      this.apartForm.get('surfaceTerrace')?.setValue('');
    }
  }
}
