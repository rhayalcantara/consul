import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntreFecha } from 'src/app/Interfaces/interfaces';



@Component({
  selector: 'app-form-buscar-fecha',
  templateUrl: './form-buscar-fecha.component.html',
  styleUrls: ['./form-buscar-fecha.component.css']
})
export class FormBuscarFechaComponent implements OnInit {

  formGroup:FormGroup; 
  titulo:string ="Busqueda Entre Fecha"
  fechabuscar:EntreFecha={
    desde:'2021-01-01',
    hasta:'2021-01-01'
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialogRef: MatDialogRef<FormBuscarFechaComponent>,
              private fb:FormBuilder
              ) {
                this.formGroup = this.fb.group({
                  desde:[''],
                  hasta:['']
                });
               }


  ngOnInit() {
    // this.dialogRef.updateSize('30%', '65%');
    this.titulo=this.data.titulo;
  }
  buscar(){
    this.fechabuscar.desde = this.formGroup.controls["desde"].value
    this.fechabuscar.hasta = this.formGroup.controls["hasta"].value
    this.dialogRef.close(this.fechabuscar);
  }

}
