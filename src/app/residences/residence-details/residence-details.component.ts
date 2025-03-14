
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Residence } from 'src/app/Core/Models/residence';

@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent {
  listResidences:Residence[]=[
    {id:1,"name": "El fel","address":"Borj Cedria", "image":"../../assets/images/R1.jpg", status: "Disponible"},
    {id:2,"name": "El yasmine", "address":"Ezzahra","image":"../../assets/images/R2.jpg", status: "Disponible" },
    {id:3,"name": "El Arij", "address":"Rades","image":"../../assets/images/R3.jpg", status: "Vendu"},
    {id:4,"name": "El Anber","address":"inconnu", "image":"../../assets/images/R3.jpg", status: "En Construction"}
  ];
  constructor(private actR:ActivatedRoute) { }

  id!:number;
  R!:Residence
  ngOnInit() {
   // this.id = this.actR.snapshot.params['id'];
   this.actR.paramMap.subscribe( data => this.id = Number(data.get('id')));
   
   this.R = this.listResidences.find( r => r.id == this.id)!;
   console.log(this.R);
  }

  showNext(){
    this.id++;
    if(this.id > this.listResidences.length){
      this.id = 1;
    }
    this.R = this.listResidences.find( r => r.id == this.id)!;
  
  }
}
