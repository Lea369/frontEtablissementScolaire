import { Component, OnInit } from '@angular/core';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ClassesService } from 'src/app/services/classe/classes.service';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';

@Component({
  selector: 'app-update-etudiant',
  templateUrl: './update-etudiant.component.html',
  styleUrls: ['./update-etudiant.component.css']
})
export class UpdateEtudiantComponent implements OnInit {

  etudiant = new EtudiantUpdateDto();
  formulaireModif: FormGroup;
  allClasses = new Array<ClasseUpdateDto>();
  emptyListe: boolean;
  messageSucces='';
  messageEchec='';
  
  constructor(
    private serviceEtudiants: EtudiantsService,
    private serviceClasses: ClassesService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getEtudiant();
    this.getClasses();
    this.formulaireModif = new FormGroup({
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
    })
  }

  getEtudiant() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.serviceEtudiants.getEtudiant(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.etudiant = responseDto.body;
        }
      }
    )
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

  update() {
    this.serviceEtudiants.updateEtudiant(this.etudiant).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.messageSucces = 'Modification réussie';
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.messageEchec = 'Erreur lors de la modification : cet email ou cet CIN existe déjà'
        }
      }
    )
  }

  retour(): void {
    this.location.back();
  }
}
