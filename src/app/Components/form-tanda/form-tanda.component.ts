import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tanda } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';

import { FormConsultorioComponent } from '../form-consultorio/form-consultorio.component';

@Component({
  selector: 'app-form-tanda',
  templateUrl: './form-tanda.component.html',
  styleUrls: ['./form-tanda.component.css']
})
export class FormTandaComponent implements OnInit {
  formGroup: FormGroup;
  tanda:Tanda={
    id:0,
    descripcion:'',
    status:1
  };
  campos:string[]=[];

  constructor(      @Inject(MAT_DIALOG_DATA) public data:any,
  private dialogRef: MatDialogRef<FormTandaComponent>,
  private fb: FormBuilder,
  protected datosservices: DatosService) {
    this.formGroup=this.fb.group({});
   }

  ngOnInit() {
      //pasa los datos de la consultorio que llegaron
      this.tanda = this.data.tanda;

      //optiene las propidades del objeto
      this.campos=Object.keys(this.data.tanda);
      //inicializa el formgroup
      this.formGroup=this.fb.group({});
      //llenar el formgroup con los datos del consultorio
      for (let control of this.campos) {
        let newFormControl: FormControl = new FormControl();      
        newFormControl.setValue(this.data.tanda[control]);
        this.formGroup.addControl(control, newFormControl);
      } 
  }
  grabar(){
    //actualiza la persona con los datos del usuario
   
    // for (let control of this.campos) {
    //     this.tanda[control]=this.formGroup.controls[control].value;
    // }
    this.tanda=JSON.parse(JSON.stringify(this.formGroup.value));
    if (this.formGroup.controls["id"].value == 0){
      //inserta la consultorio
      this.datosservices.InsertTandas(this.tanda).subscribe(rep=>{
  
        this.tanda=rep;
        this.datosservices.showMessage("Grabado","Agregando Parentesco","success");
        this.dialogRef.close(rep);
        
      });
    }else{
      //actualiza
      this.datosservices.UpdateTandas(this.tanda).subscribe(rep=>{
        this.datosservices.showMessage("Actualizado","Actualizando Parentesco","success")
        this.dialogRef.close(this.tanda);
      });
    }
  }
cancelar(){}
}
