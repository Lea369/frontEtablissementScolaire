import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { AllEtudiantComponent } from './content/etudiant/all-etudiant/all-etudiant.component';
import { AllClasseComponent } from './content/classe/all-classe/all-classe.component';
import { AllExamenComponent } from './content/examen/all-examen/all-examen.component';



const routes: Routes = [
  { path: 'absence', component: AllAbsenceComponent },
  { path: 'absence/detail/:id', component: DetailAbsenceComponent},
  { path: 'classe', component: AllClasseComponent },
  { path: 'classe/detail/:id', component: DetailClasseComponent},
  { path: 'etudiant', component: AllEtudiantComponent },
  { path: 'etudiant/detail/:id', component: DetailEtudiantComponent},
  { path: 'examen', component: AllExamenComponent },
  { path: 'examen/detail/:id', component: DetailExamenComponent},
  { path: 'matiere', component: AllEtudiantComponent },
  { path: 'matiere/detail/:id', component: DetailEtudiantComponent},
  { path: 'note', component: AllEtudiantComponent },
  { path: 'note/detail/:id', component: DetailEtudiantComponent},
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
