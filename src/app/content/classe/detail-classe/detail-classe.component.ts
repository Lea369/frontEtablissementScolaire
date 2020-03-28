import { Component, OnInit, Input } from '@angular/core';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';
import { ClassesService } from 'src/app/services/classe/classes.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-classe',
  templateUrl: './detail-classe.component.html',
  styleUrls: ['./detail-classe.component.css']
})
export class DetailClasseComponent implements OnInit {

  @Input() classe: ClasseUpdateDto;
  messageValidation: string;
  messageEchec: string;

  constructor(
    private route: ActivatedRoute,
    private service: ClassesService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getClasse();
  }

  getClasse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getClasse(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.classe = responseDto.body;
        }
      }
     );
  }
 
  goBack(): void {
    this.location.back();
  }

  update(): void {
    this.service.update(this.classe).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.messageValidation = 'Mise à jour reussie';
          document.location.reload();
        }
      },
      (responseDtoError) => {
        if (responseDtoError.error) {
          this.messageEchec = 'Erreur de mise à jour';
          document.location.reload();
        }
      }
    );
  }

}
