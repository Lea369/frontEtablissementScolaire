import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classe/classes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';
import { ClasseCreateDto } from 'src/app/models/classe-create-dto';
import { Location } from '@angular/common'


@Component({
  selector: 'app-create-classe',
  templateUrl: './create-classe.component.html',
  styleUrls: ['./create-classe.component.css']
})
export class CreateClasseComponent implements OnInit {

  formulaireAjout: FormGroup;
  classeCreate = new ClasseCreateDto();
  classe = new ClasseUpdateDto();
  etudiants = new Array<EtudiantUpdateDto>();
  etudiant: EtudiantUpdateDto;
  messageSucces='';
  messageSucces2='';
  messageEchec='';
  messageEchec2='';
  tableau: boolean;
  emptyListe: boolean;
 
  
  constructor(
    private serviceClasses: ClassesService,
    private serviceEtudiants: EtudiantsService,
    private location: Location) { }

  ngOnInit(): void {
    this.tableau = false;
    this.emptyListe = true;
    this.formulaireAjout = new FormGroup({
      name: new FormControl(this.classeCreate.name, Validators.required),
    });
    
  }

  retour(): void {
    this.location.back();
  }

  save() {
    this.serviceClasses.create(this.classeCreate).subscribe(
      //SUCCESS ==> 200
      (responseDto) => {
        if (!responseDto.error) {
          this.classe = responseDto.body;
          this.messageSucces = 'Création réussie.';
          this.messageEchec = '';
          this.tableau = true;
          this.getEtudiants();
        }
      },
      //FAIL ==> 400, 404, 500...
      (responseDtoError) => {
        if (responseDtoError.error) {
          this.messageEchec = 'Erreur lors de la création.';
          this.messageSucces = '';
          this.tableau = false;
        }
      }
    );
  }

  getEtudiants(): void {
    this.serviceEtudiants.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.etudiants = responseDto.body;
          if (this.etudiants.length == 0) {
            this.emptyListe = true;
          }
          else {
            this.emptyListe = false;
          }
        }
      }
    )
  }
  
  addToClasse(identifiant: number): void {
    this.serviceEtudiants.getEtudiant(identifiant).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.etudiant = responseDto.body;
          this.etudiant.classe = this.classe;
          this.serviceEtudiants.updateEtudiant(this.etudiant).subscribe(
            (responseDto) => {
              if (!responseDto.error) {
              this.messageSucces = '';
              this.messageEchec2 = '';
              this.messageSucces2 = 'Ajout de l\'etudiant ' +this.etudiant.name+ ' ' +this.etudiant.surname+ ' à la classe ' +this.classe.name+ '.';
              }
            },
            (responseDto) => {
              if (responseDto.error) {
                this.messageSucces = '';
                this.messageEchec2 = 'Erreur : l\'etudiant ' +this.etudiant.name+ ' ' +this.etudiant.surname+ ' n\'a pas été ajouté.';
                this.messageSucces2 = '';
              }
            }
          );
        }
      }
    );
  }

}
