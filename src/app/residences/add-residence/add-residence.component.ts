import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Residence } from '../../Core/Models/residence';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent {
  @Output() residenceAdded = new EventEmitter<Residence>();

  addForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  isUpdateMode = false;
  residenceId!: number;

  listResidences: Residence[] = [
    { id: 1, name: "El fel", address: "Borj Cedria", image: "../../assets/images/R1.jpg", status: "Disponible" },
    { id: 2, name: "El yasmine", address: "Ezzahra", image: "../../assets/images/R2.jpg", status: "Disponible" },
    { id: 3, name: "El Arij", address: "Rades", image: "../../assets/images/R3.jpg", status: "Vendu" },
    { id: 4, name: "El Anber", address: "inconnu", image: "../../assets/images/R3.jpg", status: "En Construction" }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isUpdateMode = true;
        this.residenceId = Number(id);
        this.loadResidence(this.residenceId);
      } else {
        this.addForm.patchValue({ id: (Math.floor(Math.random() * 1000) + 1).toString() });
      }
    });
  }

  loadResidence(id: number) {
    const residence = this.listResidences.find(r => r.id === id);
    if (residence) {
      this.addForm.patchValue({
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

  saveResidence() { 
    if (this.addForm.valid) {
      const updatedResidence: Residence = {
        id: Number(this.addForm.value.id),  
        name: this.addForm.value.name!,
        address: this.addForm.value.address!,
        image: this.addForm.value.image!,
        status: this.addForm.value.status!,
      };

      if (this.isUpdateMode) {
        console.log("Mise à jour de la résidence:", updatedResidence);
      } else {
        console.log("Ajout d'une nouvelle résidence:", updatedResidence);
        this.residenceAdded.emit(updatedResidence);
      }

      this.router.navigate(['/residences']);
    } else {
      alert("Veuillez remplir tous les champs !");
    }
  }
}
