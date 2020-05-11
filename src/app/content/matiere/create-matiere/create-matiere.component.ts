import { Component, OnInit } from '@angular/core';
import { MatiereCreateDto } from 'src/app/models/matiere-create-dto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatieresService } from 'src/app/services/matiere/matieres.service';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { Location } from '@angular/common'

@Component({
  selector: 'app-create-matiere',
  templateUrl: './create-matiere.component.html',
  styleUrls: ['./create-matiere.component.css']
})
export class CreateMatiereComponent implements OnInit {

  matiereCreate = new MatiereCreateDto();
  matiere = new MatiereUpdateDto();
  allEtudiants = new Array<EtudiantUpdateDto>();
  formulaireAjout: FormGroup;
  messageSucces='';
  messageEchec='';
  tableau: boolean;
  emptyListe: boolean;
  messageSucces2='';
  messageEchec2='';

  constructor(
    private serviceMatieres : MatieresService,
    private serviceEtudiants : EtudiantsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.tableau = false;
    this.emptyListe = true;
    this.formulaireAjout = new FormGroup({
      nomMatiere: new FormControl(this.matiereCreate.nomMatiere, Validators.required)
    })
  }

  save() {
    this.serviceMatieres.create(this.matiereCreate).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.matiere = responseDto.body;
          this.messageSucces = 'Création réussie.';
          this.messageEchec = '';
          this.tableau = true;
          this.getEtudiants();

        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.matiere = null;
          this.messageSucces = '';
          this.messageEchec = 'Erreur lors de la création.';
        }
      }
    )
  }

  getEtudiants() {
    this.serviceEtudiants.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allEtudiants = responseDto.body;
          if (this.allEtudiants.length == 0) {
            this.emptyListe = true;
          } else {
            this.emptyListe = false;
          }
        }
      }
    )
  }

  addToMatiere(etudiant: EtudiantUpdateDto) {
    const index = +this.matiere.listeEtudiant.indexOf(etudiant);
    if (index === -1) {
      this.matiere.listeEtudiant.push(etudiant);
      this.serviceMatieres.update(this.matiere).subscribe(
      (responseDto) => {
          if (!responseDto.error) {
            this.messageSucces = '';
            this.messageEchec = '';
            this.messageEchec2 = '';
            this.messageSucces2 = 'Inscription de l\'étudiant ' +etudiant.name+ ' ' +etudiant.surname+ 
            ' à la matière ' +this.matiere.nomMatiere+ '.';
          }
      },
      (responseDto) => {
          if (responseDto.error) {
            this.messageEchec = '';
            this.messageSucces = '';
            this.messageSucces2 = '';
            this.messageEchec2 = 'Erreur lors de l\'inscription de ' +etudiant.name+ ' ' +etudiant.surname+ '.';
          }
      }
    );
    } else {
      this.messageSucces='';
      this.messageEchec='';
      this.messageSucces2= '';
      this.messageEchec2= 'Erreur : cet étudiant est déjà inscrit.';
    }

  }

  retour() {
    this.location.back();
  }

}
