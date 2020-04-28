import { Component, OnInit } from '@angular/core';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { ActivatedRoute } from '@angular/router';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { Location } from '@angular/common'
import { AbsenceUpdateDto } from 'src/app/models/absence-update-dto';
import { NoteUpdateDto } from 'src/app/models/note-update-dto';
import { MatieresService } from 'src/app/services/matiere/matieres.service';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';

@Component({
  selector: 'app-detail-etudiant',
  templateUrl: './detail-etudiant.component.html',
  styleUrls: ['./detail-etudiant.component.css']
})
export class DetailEtudiantComponent implements OnInit {

  etudiant = new EtudiantUpdateDto();
  tableauNotes: boolean;
  tableauAbsences: boolean;
  tableauMatieres: boolean;
  allAbsences = new Array<AbsenceUpdateDto>();
  allNotes = new Array<NoteUpdateDto>();
  allMatieres = new Array<MatiereUpdateDto>();
  allMatieresParEtudiant = new Array<MatiereUpdateDto>();
  messageAbsences = '';
  messageNotes = '';
  messageMatieres = '';
  somme1: number;
  somme2: number;
  moyenne: number;

  constructor(
    private route: ActivatedRoute,
    private serviceEtudiants: EtudiantsService,
    private serviceMatieres: MatieresService,
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
    this.tableauMatieres = false;
    this.messageMatieres = '';
    this.getAbsences(email);
  }

  getAbsences(email: string) {
    this.serviceEtudiants.getAbsences(email).subscribe(
      (responseDto) => {
        if (!responseDto.error && responseDto.body != null) {
          this.allAbsences = responseDto.body;
          this.messageAbsences = 'Nombre d\'absences : ' +this.allAbsences.length;
        }
      },
      (responseDto) => {
        if (responseDto.body == null) {
          this.allAbsences = [];
          this.messageAbsences = 'Aucune absence n\'est enregistrée pour cet étudiant.';
        }
      }
    )
  }

  afficherNotes(email: string) {
    this.tableauNotes = true;
    this.tableauAbsences = false;
    this.messageAbsences = '';
    this.tableauMatieres = false;
    this.messageMatieres = '';
    this.getNotes(email);
  }

  getNotes(email: string): void {
    this.serviceEtudiants.getNotes(email).subscribe(
      (responseDto) => {
        if (!responseDto.error && responseDto.body != null) {
          this.allNotes = responseDto.body;
          this.somme1 = 0;
          this.somme2 = 0;
          for (var i=0; i < this.allNotes.length; i++) {
            this.somme1 = this.somme1 + this.allNotes[i].value * this.allNotes[i].examen.coefExamen;
            this.somme2 = this.somme2 + this.allNotes[i].examen.coefExamen;
          };
          this.moyenne = this.somme1/this.somme2;
          this.messageNotes = 'Moyenne générale de l\'étudiant : ' +this.moyenne+ '/20';
        }
      },
      (responseDto) => {
        if (responseDto.body == null) {
          this.allNotes = [];
          this.messageNotes = 'Aucune note n\'est enregistrée pour cet étudiant.';
        }
      }
    );
  }

  afficherMatieres(email: string) {
    this.tableauMatieres = true;
    this.tableauNotes = false;
    this.tableauAbsences = false;
    this.messageNotes = '';
    this.messageAbsences = '';
    this.getMatieres(email);
  }

  getMatieres(email: string) {
    this.serviceMatieres.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allMatieres = responseDto.body;
          this.allMatieresParEtudiant = this.allMatieres.filter( 
            (element) => element.listeEtudiant.find(
              (element) => element.mail === email)
            );
          if (this.allMatieresParEtudiant.length == 0) {
            this.allMatieresParEtudiant = [];
            this.messageMatieres = 'Aucune matière n\'est enregistrée pour cet étudiant.';
          } else {
            this.messageMatieres = 'Nombre de matières : ' +this.allMatieresParEtudiant.length;
          }
          
        }
      }
    );
  }

  retour(): void {
    this.location.back();
  }

}
