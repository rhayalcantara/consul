import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Parentesco } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';


@Component({
  selector: 'app-formparentesco',
  templateUrl: './formparentesco.component.html',
  styleUrls: ['./formparentesco.component.css']
})
export class FormparentescoComponent implements OnInit {

  formGroup: FormGroup;
  parentesco: Parentesco=null!;
  campos:string[]=[];
  constructor(  
      @Inject(MAT_DIALOG_DATA) public data:any,
      private dialogRef: MatDialogRef<FormparentescoComponent>,
      private fb: FormBuilder,
      protected datosservices: DatosService) { 
    this.formGroup=this.fb.group({});
  }

  ngOnInit() {
    //pasa los datos de la persona que llegaron
    
    
    this.parentesco = this.data.parentesco;
    //optiene las propidades del objeto
    this.campos=Object.keys(this.data.parentesco);
    //inicializa el formgroup
    this.formGroup=this.fb.group({});
    //llenar el formgroup con los datos de la persona
    for (let control of this.campos) {
      let newFormControl: FormControl = new FormControl();      
      newFormControl.setValue(this.data.parentesco[control]);
      this.formGroup.addControl(control, newFormControl);
    }     
  }
  grabar(){
    //actualiza la persona con los datos del usuario
    // for (let control of this.campos) {
    //   this.parentesco[control]=this.formGroup.controls[control].value;
    // }
    this.parentesco=JSON.parse(JSON.stringify(this.formGroup.controls));
    if (this.formGroup.controls["id"].value == 0){
      //inserta la persona
      this.datosservices.InsertParentesco(this.parentesco).subscribe(rep=>{

        this.parentesco=rep;
        this.datosservices.showMessage("Grabado","Agregando Parentesco","success");
        this.dialogRef.close(rep);
        
      });
    }else{
      //actualiza
      this.datosservices.UpdateParentesco(this.parentesco).subscribe(rep=>{
        this.datosservices.showMessage("Actualizado","Actualizando Parentesco","success")
        this.dialogRef.close(this.parentesco);
      });
    }
  }
cancelar(){}
}
