import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Especialidades } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';


@Component({
  selector: 'app-formespecialidad',
  templateUrl: './formespecialidad.component.html',
  styleUrls: ['./formespecialidad.component.css']
})
export class FormespecialidadComponent implements OnInit {

  formGroup: FormGroup;
  especialidad:Especialidades=null!;
  campos:string[]=[];
  constructor( @Inject(MAT_DIALOG_DATA) public data:any,
  private dialogRef: MatDialogRef<FormespecialidadComponent>,
  private fb: FormBuilder,
  protected datosservices: DatosService) {
    this.formGroup=this.fb.group({});
   }

  ngOnInit() {
    this.especialidad=this.data.especialidad;
     //optiene las propidades del objeto
     this.campos=Object.keys(this.especialidad);
      //inicializa el formgroup
    this.formGroup=this.fb.group({});
      //llenar el formgroup con los datos de la persona
      for (let control of this.campos) {
        let newFormControlx: FormControl = new FormControl();      
        newFormControlx.setValue(this.especialidad[control as keyof Especialidades]);
        this.formGroup.addControl(control, newFormControlx);
      }      
  }
  grabar(){
    this.especialidad = {
      id:+this.formGroup.controls['id'].value,
      descripcion:this.formGroup.controls['descripcion'].value
    }
    if (this.especialidad.id==0){
      this.datosservices.Insertespecialidad(this.especialidad).subscribe(rep=>{
        this.datosservices.showMessage('Grabado','Agregando Especialidad','success');
        this.dialogRef.close(rep);
      });
    }else{
      this.datosservices.Updateespecialidad(this.especialidad).subscribe(rep=>{
        this.datosservices.showMessage('Actulizado','Actualizando Especialidad','success');
        this.dialogRef.close(rep);
      });
    }
    this.dialogRef.close(this.especialidad);
  }
cancelar(){
  this.dialogRef.close();
}

}
