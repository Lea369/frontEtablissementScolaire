import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classe/classes.service';


@Component({
  selector: 'app-create-classe',
  templateUrl: './create-classe.component.html',
  styleUrls: ['./create-classe.component.css']
})
export class CreateClasseComponent implements OnInit {


 
  
  constructor(private service: ClassesService) { }

  ngOnInit(): void {
  }

  
}
