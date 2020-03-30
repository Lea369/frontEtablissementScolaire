import { Component, OnInit, Input } from '@angular/core';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { NoteUpdateDto } from 'src/app/models/note-update-dto';
import { ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common';


@Component({
  selector: 'app-note-etudiant',
  templateUrl: './note-etudiant.component.html',
  styleUrls: ['./note-etudiant.component.css']
})
export class NoteEtudiantComponent implements  OnInit {
  
  @Input() email: string;
  allNotes = new Array<NoteUpdateDto>();

  constructor(protected route: ActivatedRoute,
    protected service: EtudiantsService,
    protected location: Location) {
  }

  ngOnInit(): void {
    
    this.getNotes();
    
  }

  getNotes(): void {
    this.service.notes(this.email).subscribe(
      (responseDto) => {
        if(!responseDto.error && responseDto.body != null){
          this.allNotes = responseDto.body;
        }
      }
    );
  }

}
