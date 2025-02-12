import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ✅ Ajouté ici

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { ResidencesComponent } from './residences/residences.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ResidencesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // ✅ Ajouté ici aussi pour corriger ngModel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
