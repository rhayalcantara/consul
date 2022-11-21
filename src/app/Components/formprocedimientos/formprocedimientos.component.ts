import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Especialidades, Procedimiento } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';

@Component({
  selector: 'app-formprocedimientos',
  templateUrl: './formprocedimientos.component.html',
  styleUrls: ['./formprocedimientos.component.css']
})
export class FormprocedimientosComponent implements OnInit {
  procedimiento:Procedimiento={
    id: 0,
    descripcion: '',
    monto: 0,
    especialiadid: 0
  }
  especialidades:Especialidades[]=[];
  formGroup: FormGroup;
  campo: string[]
  constructor(protected datosservices: DatosService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<FormprocedimientosComponent>) { 
      this.formGroup =this.fb.group({})
    }

  ngOnInit(): void {
        //obtine las especialidades
        this.datosservices.Getespecialidades().subscribe(rep=>{
          console.log(rep)
          this.especialidades=rep;
        })
        this.campo = Object.keys(this.procedimiento)
        for (let control of this.campo){
          let newFormControl: FormControl = new FormControl();      
          newFormControl.setValue(this.data.procedimiento[control]);
          this.formGroup.addControl(control, newFormControl);
        }
  }
  grabar(){
    //obtine los datos 
    this.procedimiento = this.formGroup.value;
    console.log("procedimiento",this.procedimiento)
    if (this.procedimiento.id===0){
      //grabar nuevo

      this.datosservices.InsertProcedimiento(this.procedimiento).subscribe(rep =>{
        this.datosservices.showMessage("Grabado","Agregando","sucess")
        this.dialogRef.close(rep);
      })
    }else{
      //actualizar
      this.datosservices.UpdateProcedimiento(this.procedimiento).subscribe({
        next:(rep:Procedimiento)=>{
          this.datosservices.showMessage("Actualizando","Modificado","sucess")
          this.dialogRef.close(rep);
        }
      })
    }

  }
  cancelar(){
    this.dialogRef.close(null);
  }
}
