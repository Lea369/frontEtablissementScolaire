import { Component, OnInit } from '@angular/core';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { NoteUpdateDto } from 'src/app/models/note-update-dto';
import { DetailEtudiantsComponent } from '../detail-etudiants/detail-etudiants.component';
import { ActivatedRoute } from '@angular/router';
import { Location, getNumberOfCurrencyDigits } from '@angular/common';

@Component({
  selector: 'app-note-etudiant',
  templateUrl: './note-etudiant.component.html',
  styleUrls: ['./note-etudiant.component.css']
})
export class NoteEtudiantComponent extends DetailEtudiantsComponent {
  
  allNotes = new Array<NoteUpdateDto>();

  constructor(protected route: ActivatedRoute,
    protected service: EtudiantsService,
    protected location: Location) {
    super(route,
      service,
      location);
  }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.service.notes(this.etudiant).subscribe(
      (responseDto) => {
        if(!responseDto.error){
          this.allNotes = responseDto.body;
        }
      }
    );
  }

}
