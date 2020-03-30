import { Component, OnInit, Input } from '@angular/core';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { ResponseDto } from 'src/app/models/response-dto';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';
import { ClassesService } from 'src/app/services/classe/classes.service';


@Component({
  selector: 'app-detail-etudiants',
  templateUrl: './detail-etudiants.component.html',
  styleUrls: ['./detail-etudiants.component.css']
})
export class DetailEtudiantsComponent implements OnInit {

  //@Input() etudiant: EtudiantUpdateDto;

  etudiant: EtudiantUpdateDto;

  messageValidation: string;
  messageEchec: string;

  listeClasse = new Array<ClasseUpdateDto>();  
  montrerModif: boolean = false;
  
  constructor(

    private route: ActivatedRoute,
    private service: EtudiantsService,
    private serviceclasse : ClassesService,
    private location: Location) { }


  ngOnInit(): void {
    this.getEtudiant();
    this.getClasse();
  }

  getClasse(): void{
    this.serviceclasse.getAll().subscribe(
      responseDto => {
        if(!responseDto.error){
          this.listeClasse = responseDto.body;
        }
      }
    );
  }

  getEtudiant(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getEtudiant(id).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.etudiant = responseDto.body;
        }
      },
      respError => {
        console.log(respError);
      }
    );
  }


  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.service.updateEtudiant(this.etudiant)
      .subscribe(() => this.goBack());
  }

  toggle(): void {
    if(this.montrerModif){
      window.location.reload()
    } else {
      this.getEtudiant();
      this.montrerModif = true;
    }
  }







}