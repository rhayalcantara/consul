import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Roles } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';


@Component({
  selector: 'app-form-rol',
  templateUrl: './form-rol.component.html',
  styleUrls: ['./form-rol.component.css']
})
export class FormRolComponent implements OnInit {
  rol:Roles={
    id:0,
    descripcion:"",
    nivel:0,
  }
  formGroup:FormGroup;
  campos:string[]=[];
  constructor(private dialogRef: MatDialogRef<FormRolComponent>,
    private datos:DatosService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder) {
      this.formGroup=fb.group({});
     }

  ngOnInit() {
    this.dialogRef.updateSize('75%', '60%');
    this.rol = this.data.rol;
    this.campos=Object.keys(this.data.rol);
    this.formGroup=this.fb.group({});
      //llenar el formgroup con los datos del consultorio
      for (let control of this.campos) {
        let newFormControl: FormControl = new FormControl();      
        newFormControl.setValue(this.data.rol[control]);
        this.formGroup.addControl(control, newFormControl);
      } 
  }
  grabar(){
    // for (let control of this.campos) {
    //   if (control=="id" || control=="nivel"){
    //     this.rol[control] = +this.formGroup.controls[control].value
    //   }else{
    //     this.rol[control] = this.formGroup.controls[control].value
    //   }
     
    //}
    this.rol=JSON.parse(JSON.stringify(this.formGroup.controls));
    if (this.rol.id==0){
      this.datos.insertRoles(this.rol).subscribe((rep)=>{
        this.rol.id=rep.id;
        this.datos.showMessage("Grabado","Agregando Rol","success");
        this.dialogRef.close(rep);      
      });
    }else{
      this.datos.UpdateRoles(this.rol).subscribe((rep)=>{
        this.datos.showMessage("Actualizado","Agregando Rol","success");
        this.dialogRef.close(this.rol);   
      })
    }


  }
  cancelar(){
    this.dialogRef.close('');
  }


}
