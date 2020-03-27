import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AllEtudiantComponent } from './content/etudiant/all-etudiant/all-etudiant.component';
import { CreateEtudiantComponent } from './content/etudiant/create-etudiant/create-etudiant.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { AllMatiereComponent } from './content/matiere/all-matiere/all-matiere.component';
import { CreateMatiereComponent } from './content/matiere/create-matiere/create-matiere.component';
import { DetailMatiereComponent } from './content/matiere/detail-matiere/detail-matiere.component';
import { AllClasseComponent } from './content/classe/all-classe/all-classe.component';
import { CreateClasseComponent } from './content/classe/create-classe/create-classe.component';
import { DetailClasseComponent } from './content/classe/detail-classe/detail-classe.component';
import { AllExamenComponent } from './content/examen/all-examen/all-examen.component';
import { CreateExamenComponent } from './content/examen/create-examen/create-examen.component';
import { DetailExamenComponent } from './content/examen/detail-examen/detail-examen.component';


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    FooterComponent,
    NavBarComponent,
    AllEtudiantComponent,
    CreateEtudiantComponent,
    DashboardComponent,
    AllMatiereComponent,
    CreateMatiereComponent,
    DetailMatiereComponent,
    AllClasseComponent,
    CreateClasseComponent,
    DetailClasseComponent,
    AllExamenComponent,
    CreateExamenComponent,
    DetailExamenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
