import { Component, OnInit } from '@angular/core';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';

@Component({
  selector: 'app-search-etudiant',
  templateUrl: './search-etudiant.component.html',
  styleUrls: ['./search-etudiant.component.css']
})
export class SearchEtudiantComponent implements OnInit {

  numero: number;
  etudiant1 = new EtudiantUpdateDto();
  message1 = '';
  single1: boolean;
  email: string;
  allEtudiants2 = new Array<EtudiantUpdateDto>();
  allEtudiants22 = new Array<EtudiantUpdateDto>();
  message2 = '';
  single2: boolean;
  cni: number;
  allEtudiants3 = new Array<EtudiantUpdateDto>();
  allEtudiants33 = new Array<EtudiantUpdateDto>();
  message3 = '';
  single3: boolean;


  constructor(private serviceEtudiants: EtudiantsService) { }

  ngOnInit(): void {
    this.single1 = false;
    this.single2 = false;
    this.single3 = false;
  }

  getSingle1(numero: number) {
    this.serviceEtudiants.getEtudiant(numero).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.single3 = false;
          this.message3 = '';
          this.allEtudiants3 = [];
          this.allEtudiants33 = [];
          this.single2 = false;
          this.message2 = '';
          this.allEtudiants2 = [];
          this.allEtudiants22 = [];
          this.single1 = true;
          this.message1 = '';
          this.etudiant1 = responseDto.body;
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.single3 = false;
          this.message3 = '';
          this.allEtudiants3 = [];
          this.allEtudiants33 = [];
          this.single2 = false;
          this.message2 = '';
          this.allEtudiants2 = [];
          this.allEtudiants22 = [];
          this.single1 = false;
          this.message1 = 'Aucun étudiant n\'existe avec cet ID';
          this.etudiant1 = null;
        }
      }
    )
  }

  getSingle2(email: string) {
    this.serviceEtudiants.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allEtudiants2 = responseDto.body;
          this.allEtudiants22 = this.allEtudiants2.filter(element =>  element.mail == email);
          if (this.allEtudiants22.length == 0) {
            this.message1 = '';
            this.etudiant1 = null;
            this.single1 = false;
            this.single3 = false;
            this.message3 = '';
            this.allEtudiants3 = [];
            this.allEtudiants33 = [];
            this.message2 = 'Aucun étudiant n\'existe avec cet email';
            this.single2 = false;
          }
          else {
            this.message1 = '';
            this.etudiant1 = null;
            this.single1 = false;
            this.single3 = false;
            this.message3 = '';
            this.allEtudiants3 = [];
            this.allEtudiants33 = [];
            this.message2 = '';
            this.single2 = true;
          }
        }
      }
    );
  }

  getSingle3(cni: number) {
    this.serviceEtudiants.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allEtudiants3 = responseDto.body;
          this.allEtudiants33 = this.allEtudiants3.filter(element =>  element.identity == cni);
          if (this.allEtudiants33.length == 0) {
            this.message1 = '';
            this.etudiant1 = null;
            this.single1 = false;
            this.message2 = '';
            this.allEtudiants2 = [];
            this.allEtudiants22 = [];
            this.single2 = false;
            this.message3 = 'Aucun étudiant n\'existe avec ce CNI';
            this.single3 = false;
          }
          else {
            this.message1 = '';
            this.etudiant1 = null;
            this.single1 = false;
            this.message2 = '';
            this.allEtudiants2 = [];
            this.allEtudiants22 = [];
            this.single2 = false;
            this.message3 = '';
            this.single3 = true;
          }
        }
      }
    );
  }


  delete(id: number) {
    this.serviceEtudiants.delete(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          if (this.single1) {
            this.getSingle1(id);
          }
          if (this.single2) {
            this.getSingle2(this.email);
          }
          if (this.single3) {
            this.getSingle3(this.cni);
          }
        }
      }
    );
  }
}
