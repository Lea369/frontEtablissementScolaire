import { Component, OnInit } from '@angular/core';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { ResponseDto } from 'src/app/models/response-dto';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';
import { EtudiantCreateDto } from 'src/app/models/etudiant-create-dto';
import { ClassesService } from 'src/app/services/classe/classes.service';


@Component({
  selector: 'app-all-etudiant',
  templateUrl: './all-etudiant.component.html',
  styleUrls: ['./all-etudiant.component.css']
})
export class AllEtudiantComponent implements OnInit {
  
  allEtudiant = new Array<EtudiantUpdateDto>();

  etudiant: EtudiantUpdateDto;

  etudiantcreate = new EtudiantCreateDto();

  listeClasse = new Array<ClasseUpdateDto>(); 

  messageValidation: string;
  messageEchec: string;

  constructor(private service: EtudiantsService, private serviceClasse: ClassesService) { }

  ngOnInit() {
    this.getAll();
  }


  getAll() {
    this.service.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allEtudiant = responseDto.body;
        }
      }
    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allEtudiant = this.allEtudiant.filter(
            element =>  element.identifiant !== id
          );
        }
        console.log('result after delete: ', this.allEtudiant);
      }
    );
  }

  save() {
    this.service.create(this.etudiantcreate).subscribe(
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


  desinscrit(classe: ClasseUpdateDto): void {
    const index: number = this.etudiant.listclasse.indexOf(classe);
    if(index!=-1){
    this.etudiant.listclasse.splice(index, 1);
    }
    this.service.updateEtudiant(this.etudiant).subscribe(
      responseDto => {
        if(!responseDto.error){
          this.messageValidation = "mise à jour réussie."
          document.location.reload();
        }
      },
        responseDtoError => {
          if(responseDtoError.error) {
            this.messageEchec = 'Erreur de la mise à jour';
            document.location.reload();
          }
        }
      
      );
  }

 // TODO: Je ne crois pas que cette fonction est utile dans all-etudiant
 // Potentiellement à supprimer - G
 /*
  getEtudiant(id: number) {
    this.service.getEtudiant(id).subscribe(
      responseDto => {
        console.log('debug responseDto', ResponseDto);
        if (!responseDto.error) {
          this.etudiant = responseDto.body;
        }
      }
    );
    }
    */

}
