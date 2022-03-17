import { Component, OnInit,Input, Output, EventEmitter   } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Status } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';



@Component({
  selector: 'app-formulariopersona',
  templateUrl: './formulariopersona.component.html',
  styleUrls: ['./formulariopersona.component.css']
})
export class FormulariopersonaComponent implements OnInit {
  tipoidentificaciones:Status[]=[];
  @Input() formGroup: FormGroup =null!;
  @Input() modalRef =null!;
  @Output() objChange = new EventEmitter<string>();
  constructor(protected datosservices: DatosService) {

   }

  ngOnInit() {
    this.datosservices.GetTipoIdentificacion().subscribe(rep=>{
      this.tipoidentificaciones = rep;
    });    
  }
 
  grabar(){
    this.objChange.emit('grabar');
  }
  cancelar(){
    this.objChange.emit('cancelar');
  }

}
