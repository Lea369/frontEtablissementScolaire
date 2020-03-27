import { Component, OnInit, Input } from '@angular/core';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';
import { ClassesService } from 'src/app/services/classe/classes.service';

@Component({
  selector: 'app-detail-classe',
  templateUrl: './detail-classe.component.html',
  styleUrls: ['./detail-classe.component.css']
})
export class DetailClasseComponent implements OnInit {

  @Input() classe: ClasseUpdateDto;
  constructor(private service : ClassesService) { }

  ngOnInit(): void {
    
  }

 

}
