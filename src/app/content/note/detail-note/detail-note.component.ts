import { Component, OnInit } from '@angular/core';
import { NoteUpdateDto } from 'src/app/models/note-update-dto';
import { NotesService } from 'src/app/services/note/notes.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-detail-note',
  templateUrl: './detail-note.component.html',
  styleUrls: ['./detail-note.component.css']
})
export class DetailNoteComponent implements OnInit {

  note = new NoteUpdateDto();

  constructor(
    private serviceNotes: NotesService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNote();

  }

  getNote() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.serviceNotes.getNote(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.note = responseDto.body;
        }
      }
    )
  }

  retour() {
    this.location.back();
  }
}
