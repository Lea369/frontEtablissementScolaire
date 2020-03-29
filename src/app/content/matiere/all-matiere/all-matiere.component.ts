import { Component, OnInit } from '@angular/core';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { MatiereCreateDto } from 'src/app/models/matiere-create-dto';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';

@Component({
  selector: 'app-all-matiere',
  templateUrl: './all-matiere.component.html',
  styleUrls: ['./all-matiere.component.css']
})
export class AllMatiereComponent implements OnInit {

  showCreate = false;
  messageEchec: string;

  allMatiere = new Array<MatiereUpdateDto>();
  matiere = new MatiereCreateDto();
  allEtudiant = new Array<EtudiantUpdateDto>();
  
  constructor(private service: MatiereService, private etudiantService: EtudiantsService) { }

  toggle() {
    if (this.showCreate) {
      this.showCreate = false;
    } else {
      this.showCreate = true;
    }
  }
  
  ngOnInit(): void {
    this.getAll();
    this.getEtudiants();
  }

  getEtudiants(): void {
    this.etudiantService.getAll().subscribe(etudiants => this.allEtudiant=etudiants.body);
  }

  getAll() {
    this.service.getAll().subscribe(
      (responseDto) => {
        if(!responseDto.error){
          this.allMatiere = responseDto.body;
        }
      }
    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allMatiere = this.allMatiere.filter(
            element =>  element.idMatiere !== id
          );
        }
      }
    );
  }

  create(){
  if(this.matiere.nomMatiere){
    this.service.create(this.matiere).subscribe(
      responseDto => {
      if (!responseDto.error) {
      document.location.reload();
      }
    },
    responseError =>{
      console.log(responseError);
      this.messageEchec = "Erreur " + responseError.status + ".";

      if (responseError.status === 400) {
        this.messageEchec += " Veuillez verifier les valeurs dans le formulaire."
      }

    }
  );
} else {
  this.messageEchec = "Veuillez remplir le nom pour enregistrer la matière."
}
}

}
