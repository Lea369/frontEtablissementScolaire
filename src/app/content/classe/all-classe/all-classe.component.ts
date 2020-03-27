import { Component, OnInit } from '@angular/core';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';
import { ClassesService } from 'src/app/services/classe/classes.service';
import { ClasseCreateDto } from 'src/app/models/classe-create-dto';

@Component({
  selector: 'app-all-classe',
  templateUrl: './all-classe.component.html',
  styleUrls: ['./all-classe.component.css']
})
export class AllClasseComponent implements OnInit {

  allClasse = new Array<ClasseUpdateDto>();
  messageValidation: string;
  messageEchec: string;
  classe = new ClasseCreateDto();
  
  constructor(private service: ClassesService) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allClasse = responseDto.body;
        }
        
      }
    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allClasse = this.allClasse.filter(
            element =>  element.id !== id
          );
        }
        console.log('result after delete: ', this.allClasse);
      }
    );
  }

  save() {
    this.service.create(this.classe).subscribe(
      //SUCCESS ==> 200
      (responseDto) => {
        if (!responseDto.error) {
          this.messageValidation = 'Creation reussie';
          document.location.reload();
        }
      },
      //FAIL ==> 400, 404, 500...
      (responseDtoError) => {
        if (responseDtoError.error) {
          this.messageEchec = 'Erreur de création';
        }
      }
    );
  }


}
