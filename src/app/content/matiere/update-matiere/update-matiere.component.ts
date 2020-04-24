import { Component, OnInit } from '@angular/core';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';
import { MatieresService } from 'src/app/services/matiere/matieres.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';

@Component({
  selector: 'app-update-matiere',
  templateUrl: './update-matiere.component.html',
  styleUrls: ['./update-matiere.component.css']
})
export class UpdateMatiereComponent implements OnInit {

  matiere = new MatiereUpdateDto();
  formulaireModif: FormGroup;
  messageSucces = '';
  messageEchec= '';
  messageSucces2 = '';
  messageEchec2 = '';
  emptyListe: boolean;
  listeAllEtudiants: boolean;
  emptyListeAllEtudiants: boolean;
  allEtudiants = new Array<EtudiantUpdateDto>();
  etudiantsParMatiere = new Array<EtudiantUpdateDto>();

  constructor(
    private serviceMatieres : MatieresService,
    private serviceEtudiants : EtudiantsService,
    private route : ActivatedRoute,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.getMatiere();
    this.emptyListe = false;
    this.listeAllEtudiants = false;
    this.formulaireModif = new FormGroup({
      nomMatiere: new FormControl(this.matiere.nomMatiere, Validators.required)
    })
  }

  getMatiere() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.serviceMatieres.getMatiere(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.matiere = responseDto.body;
          if (this.matiere.listeEtudiant.length == 0) {
            this.emptyListe = true;
          } else {
            this.emptyListe = false;
          }
        }
      }
    );
  }

  update() {
    this.serviceMatieres.update(this.matiere).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.messageSucces = 'Modification réussie.';
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.messageEchec = 'Erreur lors de la modification.';
        }
      }
    )
  }

  retour() {
    this.location.back();
  }

  removeFromMatiere(etudiant: EtudiantUpdateDto) {
    console.log('methode removeFromMatiere pour etudiant ID' ,etudiant.identifiant)
    const index = +this.matiere.listeEtudiant.indexOf(etudiant);
    console.log('listeEtudiant initial' ,this.matiere.listeEtudiant);
    console.log('index :' ,index);
        if (index !== -1) {
        this.matiere.listeEtudiant.splice(index, 1);
        console.log('listeEtudiant final' ,this.matiere.listeEtudiant);
        this.serviceMatieres.update(this.matiere).subscribe(
          (responseDto) => {
            if (!responseDto.error) {
              this.messageSucces = '';
              this.messageEchec = '';
              this.messageSucces2 = 'Désinscription de l\'étudiant ' +etudiant.name+ ' ' +etudiant.surname+ ' de la matière ' +this.matiere.nomMatiere+ '.';
              this.messageEchec2 = '';
              console.log(this.matiere);
              if (this.matiere.listeEtudiant.length == 0) {
                this.emptyListe = true;
              } else {
                this.emptyListe = false;
              }
                          
            }
          },
          (responseDto) => {
            if (responseDto.error) {
              this.messageSucces = '';
              this.messageEchec = '';
              this.messageSucces2 = '';
              this.messageEchec2 = 'Erreur : l\'étudiant n\'a pas été désinscrit.';
              
            }
          }
        );
      }
  }

  afficherListeEtudiants() {
    this.listeAllEtudiants = true;
    this.getAllEtudiants();
  }

  getAllEtudiants() {
    this.serviceEtudiants.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allEtudiants = responseDto.body;
          if (this.allEtudiants.length == 0) {
            this.emptyListeAllEtudiants = true;
          } else {
            this.emptyListeAllEtudiants = false;
          }
        }
      }
    )
  }

  addToMatiere(etudiant: EtudiantUpdateDto) {
    console.log('methode addToMatiere pour etudiant ID' ,etudiant.identifiant)
    const index = +this.matiere.listeEtudiant.indexOf(etudiant);
    console.log('listeEtudiant initial' ,this.matiere.listeEtudiant);
    console.log('index :' +index);
    if (index === -1) {
      this.matiere.listeEtudiant.push(etudiant);
      console.log('listeEtudiant final' ,this.matiere.listeEtudiant);
      this.serviceMatieres.update(this.matiere).subscribe(
      (responseDto) => {
          if (!responseDto.error) {
            this.messageSucces = '';
            this.messageEchec = '';
            this.messageEchec2 = '';
            this.messageSucces2 = 'Inscription de l\'étudiant ' +etudiant.name+ ' ' +etudiant.surname+ ' à la matière ' +this.matiere.nomMatiere+ '.';
            this.emptyListe = false;
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
      this.messageEchec2= 'Cet étudiant est déjà inscrit.';
      this.messageSucces2='';
    }

  }

  
}
