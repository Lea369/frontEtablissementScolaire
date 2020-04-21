import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './content/dashboard/dashboard.component';

import { AllEtudiantComponent } from './content/etudiant/all-etudiant/all-etudiant.component';
import { AllAbsenceComponent } from './content/absence/all-absence/all-absence.component';
import { AllClasseComponent } from './content/classe/all-classe/all-classe.component';
import { AllExamenComponent } from './content/examen/all-examen/all-examen.component';
import { AllMatiereComponent } from './content/matiere/all-matiere/all-matiere.component';
import { AllNoteComponent } from './content/note/all-note/all-note.component'

import { DetailAbsenceComponent } from './content/absence/detail-absence/detail-absence.component';
import { DetailClasseComponent } from './content/classe/detail-classe/detail-classe.component';
import { DetailExamenComponent } from './content/examen/detail-examen/detail-examen.component';
import { DetailMatiereComponent } from './content/matiere/detail-matiere/detail-matiere.component';
import { DetailNoteComponent } from './content/note/detail-note/detail-note.component';
import { CreateClasseComponent } from './content/classe/create-classe/create-classe.component';
import { UpdateClasseComponent } from './content/classe/update-classe/update-classe.component';
import { SearchClasseComponent } from './content/classe/search-classe/search-classe.component';
import { CreateEtudiantComponent } from './content/etudiant/create-etudiant/create-etudiant.component';
import { SearchEtudiantComponent } from './content/etudiant/search-etudiant/search-etudiant.component';
import { DetailEtudiantComponent } from './content/etudiant/detail-etudiant/detail-etudiant.component';
import { UpdateEtudiantComponent } from './content/etudiant/update-etudiant/update-etudiant.component';
import { CreateAbsenceComponent } from './content/absence/create-absence/create-absence.component';
import { UpdateAbsenceComponent } from './content/absence/update-absence/update-absence.component';
import { SearchAbsenceComponent } from './content/absence/search-absence/search-absence.component';


const routes: Routes = [
  { path: 'absence', component: AllAbsenceComponent },
  { path: 'absence/add', component: CreateAbsenceComponent },
  { path: 'absence/detail/:id', component: DetailAbsenceComponent },
  { path: 'absence/update/:id', component: UpdateAbsenceComponent },
  { path: 'absence/search', component: SearchAbsenceComponent },
  { path: 'classe', component: AllClasseComponent },
  { path: 'classe/add', component: CreateClasseComponent },
  { path: 'classe/detail/:id', component: DetailClasseComponent },
  { path: 'classe/update/:id', component: UpdateClasseComponent },
  { path: 'classe/search', component: SearchClasseComponent },
  { path: 'etudiant', component: AllEtudiantComponent },
  { path: 'etudiant/add', component: CreateEtudiantComponent},
  { path: 'etudiant/detail/:id', component: DetailEtudiantComponent },
  { path: 'etudiant/update/:id', component: UpdateEtudiantComponent },
  { path: 'etudiant/search', component: SearchEtudiantComponent },
  { path: 'examen', component: AllExamenComponent },
  { path: 'examen/detail/:id', component: DetailExamenComponent },
  { path: 'matiere', component: AllMatiereComponent },
  { path: 'matiere/detail/:id', component: DetailMatiereComponent },
  { path: 'note', component: AllNoteComponent },
  { path: 'note/detail/:id', component: DetailNoteComponent },
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
