import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ✅ Added ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { ResidencesComponent } from './residences/residences.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResidenceDetailsComponent } from './residences/residence-details/residence-details.component';
import { AddResidenceComponent } from './residences/add-residence/add-residence.component';
import { ApartmentsComponent } from './apartments/apartments/apartments.component';
import { ApartmentsByResidenceComponent } from './apartments/apartments-by-residence/apartments-by-residence.component';
import { AddApartmentComponent } from './apartments/add-apartment/add-apartment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ResidencesComponent,
    HomeComponent,
    NotFoundComponent,
    ResidenceDetailsComponent,
    AddResidenceComponent,
    ApartmentsComponent,
    ApartmentsByResidenceComponent,
    AddApartmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // ✅ Required for ngModel (Template-driven forms)
    ReactiveFormsModule // ✅ Required for FormGroup and FormControl (Reactive Forms)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
