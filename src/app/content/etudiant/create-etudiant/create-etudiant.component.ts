import { Component, OnInit } from '@angular/core';
import { EtudiantCreateDto } from 'src/app/models/etudiant-create-dto';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { ResponseDto } from 'src/app/models/response-dto';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-etudiant',
  templateUrl: './create-etudiant.component.html',
  styleUrls: ['./create-etudiant.component.css']
})
export class CreateEtudiantComponent implements OnInit {

  etudiant = new EtudiantCreateDto();
  messageValidation: string;
  messageEchec: string;
  etuForm: FormGroup;


  constructor(private service: EtudiantsService) { }

  ngOnInit() {
    this.etuForm = new FormGroup({
      'name': new FormControl(this.etudiant.name, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  get name() { return this.etuForm.get('name'); }

  save() {
    this.service.create(this.etudiant).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.messageValidation = 'Creation reussie';
          document.location.reload();
        }
      },
      (responseDtoError) => {
        if (responseDtoError.error) {
          this.messageEchec = 'Erreur de création';
          document.location.reload();
        }
      }
    );
  }

}
