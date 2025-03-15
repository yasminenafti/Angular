import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Residence } from '../../Core/Models/residence';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent {
  @Output() residenceAdded = new EventEmitter<Residence>();

  isUpdateMode = false;
  residenceId!: number;

  listResidences: Residence[] = [
    { id: 1, name: "El fel", address: "Borj Cedria", image: "../../assets/images/R1.jpg", status: "Disponible" },
    { id: 2, name: "El yasmine", address: "Ezzahra", image: "../../assets/images/R2.jpg", status: "Disponible" },
    { id: 3, name: "El Arij", address: "Rades", image: "../../assets/images/R3.jpg", status: "Vendu" },
    { id: 4, name: "El Anber", address: "inconnu", image: "../../assets/images/R3.jpg", status: "En Construction" }
  ];

  residenceForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.residenceForm = this.fb.group({
      id: [Math.floor(Math.random() * 1000) + 1], // Générer un ID aléatoire caché
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern('(https?://.*.(?:png|jpg|jpeg|gif|svg))')]], // Validation URL
      status: ['Disponible', Validators.required], // Valeur par défaut
      apartments: this.fb.array([]) // Tableau pour les appartements
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isUpdateMode = true;
        this.residenceId = Number(id);
        this.loadResidence(this.residenceId);
      }
    });
  }

  loadResidence(id: number) {
    const residence = this.listResidences.find(r => r.id === id);
    if (residence) {
      this.residenceForm.patchValue({
        id: residence.id.toString(),
        name: residence.name,
        address: residence.address,
        image: residence.image,
        status: residence.status,
      });
    } else {
      console.error("Résidence introuvable avec l'ID :", id);
    }
  }

  get apartments(): FormArray {
    return this.residenceForm.get('apartments') as FormArray;
  }

  addApartment() {
    const apartmentForm = this.fb.group({
      apartNum: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      floorNum: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      surface: ['', Validators.required],
      terrace: [false],
      surfaceTerrace: [{ value: '', disabled: true }],
      category: ['', Validators.required]
    });

    apartmentForm.get('terrace')?.valueChanges.subscribe(value => {
      if (value) {
        apartmentForm.get('surfaceTerrace')?.enable();
      } else {
        apartmentForm.get('surfaceTerrace')?.disable();
        apartmentForm.get('surfaceTerrace')?.setValue('');
      }
    });

    this.apartments.push(apartmentForm);
  }

  removeApartment(index: number) {
    this.apartments.removeAt(index);
  }

  onSubmit() {
    if (this.residenceForm.valid) {
      console.log("Nouvelle résidence avec appartements :", this.residenceForm.value);
      this.residenceAdded.emit(this.residenceForm.value);
      this.residenceForm.reset();
      this.apartments.clear();
      this.router.navigate(['/residences']);
    } else {
      alert("Veuillez remplir tous les champs !");
    }
  }
  isFieldInvalid(field: string, group?: AbstractControl): boolean {
    if (!group) {
      group = this.residenceForm;
    }
  
    const control = group instanceof FormGroup ? group.get(field) : group;
    return !!(control?.invalid && control?.touched);
  }
  

  
}
