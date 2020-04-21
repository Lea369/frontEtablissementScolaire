import { Component, OnInit } from '@angular/core';
import { EtudiantCreateDto } from 'src/app/models/etudiant-create-dto';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { ResponseDto } from 'src/app/models/response-dto';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common'
import { ClassesService } from 'src/app/services/classe/classes.service';

@Component({
  selector: 'app-create-etudiant',
  templateUrl: './create-etudiant.component.html',
  styleUrls: ['./create-etudiant.component.css']
})
export class CreateEtudiantComponent implements OnInit {

  formulaireAjout: FormGroup;
  etudiant = new EtudiantCreateDto();
  allClasses = new Array<ClasseUpdateDto>();
  emptyListe: boolean;
  messageSucces = '';
  messageEchec = '';
  


  constructor(
    private serviceEtudiants: EtudiantsService,
    private serviceClasses: ClassesService,
    private location: Location) { }

  ngOnInit() {
    this.emptyListe = true;
    this.getClasses();
    this.formulaireAjout = new FormGroup({
      name: new FormControl(this.etudiant.name, Validators.required),
      surname: new FormControl(this.etudiant.surname, Validators.required),
      mail: new FormControl(this.etudiant.mail, [Validators.required, Validators.email]),
      identity: new FormControl(this.etudiant.identity, [Validators.required, Validators.minLength(6)]),
      phone: new FormControl(this.etudiant.phone, [Validators.required, Validators.minLength(9)]),
      adress: new FormControl(this.etudiant.adress),
      postalCode: new FormControl(this.etudiant.postalCode),
      city: new FormControl(this.etudiant.city),
      s: new FormControl(this.etudiant.s, Validators.required),
      classe: new FormControl(this.etudiant.classe)
    });
  }

  getClasses() {
    this.serviceClasses.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allClasses = responseDto.body;
          if (this.allClasses.length == 0) {
            this.emptyListe = true;
          }
          else {
            this.emptyListe = false;
          }
        }
      }
    )
  }

  save() {
    this.serviceEtudiants.create(this.etudiant).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.messageEchec = '';
          this.messageSucces = 'Création reussie';
          console.log(this.etudiant);
        }
      },
      (responseDtoError) => {
        if (responseDtoError.error) {
          this.messageSucces = '';
          this.messageEchec = 'Erreur lors de la création : cet email ou ce CNI est déjà utilisé';
        }
      }
    );
  }

  retour(): void {
    this.location.back();
  }

}
