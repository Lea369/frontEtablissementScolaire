import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';

import { AllEtudiantComponent } from './content/etudiant/all-etudiant/all-etudiant.component';
import { AllClasseComponent } from './content/classe/all-classe/all-classe.component';
import { AllExamenComponent } from './content/examen/all-examen/all-examen.component';
import { AllMatiereComponent } from './content/matiere/all-matiere/all-matiere.component';

import { DetailClasseComponent } from './content/classe/detail-classe/detail-classe.component';
import { DetailExamenComponent } from './content/examen/detail-examen/detail-examen.component';


const routes: Routes = [
  { path: 'note', component: AllEtudiantComponent },
 
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
