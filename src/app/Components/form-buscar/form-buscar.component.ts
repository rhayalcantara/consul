import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntreFecha } from 'src/app/Interfaces/interfaces';


@Component({
  selector: 'app-form-buscar',
  templateUrl: './form-buscar.component.html',
  styleUrls: ['./form-buscar.component.css']
})

export class FormBuscarComponent implements OnInit {

  formGroup:FormGroup; 
  titulo:string ="Busqueda"
  fechabuscar:EntreFecha
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialogRef: MatDialogRef<FormBuscarComponent>,
              private fb:FormBuilder
              ) 
      { 
            this.fechabuscar.desde ='2021-01-01'
            this.fechabuscar.hasta= '2021-01-01'
            } 
ngOnInit(): void {
  console.log('datos que llegaron',this.data)
  this.dialogRef.updateSize('50%', '60%');
  this.formGroup = this.fb.group({});
  this.titulo=this.data.titulo;
  let desdeFormControl: FormControl = new FormControl();
  let hastaFormControl: FormControl = new FormControl();
  this.formGroup.addControl("desde",desdeFormControl);
  this.formGroup.addControl("hasta",hastaFormControl);
}
                          

  buscar(){
    this.fechabuscar.desde = this.formGroup.controls["desde"].value
    this.fechabuscar.hasta = this.formGroup.controls["hasta"].value
    this.dialogRef.close(this.fechabuscar);
  }
}
 


