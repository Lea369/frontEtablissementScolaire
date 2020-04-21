import { Component, OnInit } from '@angular/core';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { ClassesService } from 'src/app/services/classe/classes.service';
import { ActivatedRoute } from '@angular/router';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-classe',
  templateUrl: './update-classe.component.html',
  styleUrls: ['./update-classe.component.css']
})
export class UpdateClasseComponent implements OnInit {
  
  formulaireModif: FormGroup;
  classe = new ClasseUpdateDto();
  etudiantsParClasse = new Array<EtudiantUpdateDto>();
  etudiants = new Array<EtudiantUpdateDto>();
  etudiant = new EtudiantUpdateDto();
  emptyliste: boolean;
  listeAllEtudiants: boolean;
  messageSucces='';
  messageSucces2='';
  messageEchec='';
  messageEchec2='';
  
  constructor(
    private route: ActivatedRoute,
    private serviceClasses: ClassesService,
    private serviceEtudiants: EtudiantsService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getClasse();
    this.getEtudiantsParClasse();
    this.listeAllEtudiants = false;
    this.formulaireModif = new FormGroup({
      name: new FormControl(this.classe.name, Validators.required),
    });
     
  }

  retour(): void {
    this.location.back();
  }

  getClasse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.serviceClasses.getClasse(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.classe = responseDto.body;
        }
      }
     );
  }
 
  getEtudiantsParClasse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.serviceEtudiants.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.etudiantsParClasse = responseDto.body.filter(element => (element.classe !== null && element.classe.id == id));
          if (this.etudiantsParClasse.length==0) {
            this.emptyliste = true;
          }
          else {
            this.emptyliste = false;
          }
        }
      }
    );
  }

  ajoutListeEtudiants(): void {
    this.listeAllEtudiants = true;
    this.getEtudiants();
  }

  getEtudiants(): void {
    this.serviceEtudiants.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.etudiants = responseDto.body;
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
                this.messageEchec = '';
                this.messageSucces2 = 'Ajout de l\'etudiant ' +this.etudiant.identifiant+ ' à la classe ' +this.classe.name;
                this.getEtudiantsParClasse();
              }
            },
            (responseDto) => {
              if (responseDto.error) {
                this.messageSucces = '';
                this.messageEchec = '';
                this.messageEchec2 = 'Erreur : l\'etudiant n\'a pas été ajouté à la classe';
                this.getEtudiantsParClasse();
              }
            }
          );
        }
      }
    );
  }

  removeFromClasse(identifiant: number): void {
    this.serviceEtudiants.getEtudiant(identifiant).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.etudiant = responseDto.body;
          this.etudiant.classe = null;
          this.serviceEtudiants.updateEtudiant(this.etudiant).subscribe(
            (responseDto) => {
              if (!responseDto.error) {
              this.messageSucces = '';
              this.messageSucces2 = 'Retrait de l\'etudiant ' +this.etudiant.identifiant+ ' de la classe ' +this.classe.name;
              this.getEtudiantsParClasse();
            }
            },
            (responseDto) => {
              if (responseDto.error) {
                this.messageSucces = '';
                this.messageEchec2 = 'Erreur : l\'etudiant n\'a pas été retiré de la classe';
                this.getEtudiantsParClasse();
              }
            }
          );
        }
      }
    );
  }

  update(): void {
    this.serviceClasses.update(this.classe).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.messageSucces = 'Modification reussie';
          this.messageEchec = '';
          this.getClasse();
        }
      },
      (responseDtoError) => {
        if (responseDtoError.error) {
          this.messageEchec = 'Erreur lors de la modification';
          this.messageSucces = '';
          this.getClasse();
        }
      }
    );
  }

}


