import { Component } from '@angular/core';
import { Residence } from '../Core/Models/residence';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent {
  listResidences: Residence[] = [
    { id: 1, name: "El fel", address: "Borj Cedria", image: "../../assets/images/R1.jpg", status: "Disponible", showAddress: false },
    { id: 2, name: "El yasmine", address: "Ezzahra", image: "../../assets/images/R2.jpg", status: "Disponible", showAddress: false },
    { id: 3, name: "El Arij", address: "Rades", image: "../../assets/images/R3.jpg", status: "Vendu", showAddress: false },
    { id: 4, name: "El Anber", address: "inconnu", image: "../../assets/images/R4.jpg", status: "En Construction", showAddress: false }
  ];

  favoris: Residence[] = [];
  searchItem: string = "";

  get filteredResidences(): Residence[] {
    return this.listResidences.filter(res => 
      res.address.toLowerCase().includes(this.searchItem.toLowerCase())
    );
  }

  show(R: Residence) {
    if (R.address === "inconnu") {
      alert("Adresse inconnue");
    } else {
      R.showAddress = !R.showAddress;
    }
  }

  like(R: Residence) {
    if (!this.favoris.includes(R)) {
      this.favoris.push(R);
    }
  }
}
