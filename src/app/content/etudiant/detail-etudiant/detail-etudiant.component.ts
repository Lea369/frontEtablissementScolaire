import { Component, OnInit } from '@angular/core';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { ActivatedRoute } from '@angular/router';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { Location } from '@angular/common'
import { AbsenceUpdateDto } from 'src/app/models/absence-update-dto';
import { NoteUpdateDto } from 'src/app/models/note-update-dto';

@Component({
  selector: 'app-detail-etudiant',
  templateUrl: './detail-etudiant.component.html',
  styleUrls: ['./detail-etudiant.component.css']
})
export class DetailEtudiantComponent implements OnInit {

  etudiant = new EtudiantUpdateDto();
  tableauNotes: boolean;
  tableauAbsences: boolean;
  allAbsences = new Array<AbsenceUpdateDto>();
  allNotes = new Array<NoteUpdateDto>();
  messageAbsences = '';
  messageNotes = '';
  
  constructor(
    private route: ActivatedRoute,
    private serviceEtudiants: EtudiantsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.tableauNotes = false;
    this.tableauAbsences = false;
    this.getEtudiant();
  }

  getEtudiant(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.serviceEtudiants.getEtudiant(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.etudiant = responseDto.body;
        }
      },
    );
  }

  afficherAbsences(email : string) {
    this.tableauAbsences = true;
    this.tableauNotes = false;
    this.messageNotes = '';
    this.getAbsences(email);
  }

  getAbsences(email: string) {
    this.serviceEtudiants.getAbsences(email).subscribe(
      (responseDto) => {
        if (!responseDto.error && responseDto.body != null) {
          this.allAbsences = responseDto.body;
          this.messageAbsences = '';
        }
      },
      (responseDto) => {
        if (responseDto.body == null) {
          this.allAbsences = [];
          this.messageAbsences = 'Cet etudiant n\'a aucune absence enregistrée';
        }
      }
    )
  }

  afficherNotes(email: string) {
    this.tableauNotes = true;
    this.tableauAbsences = false;
    this.messageAbsences = '';
    this.getNotes(email);
  }

  getNotes(email: string): void {
    this.serviceEtudiants.getNotes(email).subscribe(
      (responseDto) => {
        if (!responseDto.error && responseDto.body != null) {
          this.allNotes = responseDto.body;
          this.messageNotes = '';
        }
      },
      (responseDto) => {
        if (responseDto.body == null) {
          this.allNotes = [];
          this.messageNotes = 'Cet etudiant n\'a aucune note enregistrée';
        }
      }
    );
  }

  retour(): void {
    this.location.back();
  }

}
