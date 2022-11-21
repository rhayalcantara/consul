import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Especialidades } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';

@Component({
  selector: 'app-procedimientos',
  templateUrl: './procedimientos.component.html',
  styleUrls: ['./procedimientos.component.css']
})
export class ProcedimientosComponent implements OnInit {

  especialidades:Especialidades[]=[];
  formGroup: FormGroup;
  constructor(protected datosservices: DatosService,) { }

  ngOnInit(): void {
     //obtine las especialidades
     this.datosservices.Getespecialidades().subscribe(rep=>{
      this.especialidades=rep;
    })
  }
  cancelar(){}
  grabar(){}
}
