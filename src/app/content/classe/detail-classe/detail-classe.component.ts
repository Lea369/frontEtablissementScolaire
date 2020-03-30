import { Component, OnInit, Input } from '@angular/core';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { ClassesService } from 'src/app/services/classe/classes.service';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-classe',
  templateUrl: './detail-classe.component.html',
  styleUrls: ['./detail-classe.component.css']
})
export class DetailClasseComponent implements OnInit {

  classe: ClasseUpdateDto;
  messageValidation: string;
  messageEchec: string;
  etudiantsParClasse = new Array<EtudiantUpdateDto>();
  etudiants = new Array<EtudiantUpdateDto>();
  etudiant: EtudiantUpdateDto;
  emptyliste: boolean = false;
  modification: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private service: ClassesService,
    private location: Location,
    private serviceEtudiants: EtudiantsService
    ) { }

  ngOnInit(): void {
    this.getClasse();
    this.getEtudiantsParClasse();
    this.getEtudiants();
    
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
 
  getEtudiantsParClasse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.serviceEtudiants.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.etudiantsParClasse = responseDto.body.filter(element => (element.classe !== null && element.classe.id == id));
          if (this.etudiantsParClasse.length==0) {
            this.emptyliste = true;
          }
        }
      }
    );
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

  afficherModification(): void {
    this.modification = true;
  }

  goBack(): void {
    this.location.back();
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
              document.location.reload();
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
              document.location.reload();
              }
            }
          );
        }
      }
    );
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
