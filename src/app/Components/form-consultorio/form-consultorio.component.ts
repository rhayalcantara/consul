import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consultorio } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';


@Component({
  selector: 'app-form-consultorio',
  templateUrl: './form-consultorio.component.html',
  styleUrls: ['./form-consultorio.component.css']
})
export class FormConsultorioComponent implements OnInit {

  formGroup: FormGroup;
  consultorio:Consultorio = {id:0,
  descripcion:'',
  status:0};
  campos:string[]=[];
  constructor( @Inject(MAT_DIALOG_DATA) public data:any,
  private dialogRef: MatDialogRef<FormConsultorioComponent>,
  private fb: FormBuilder,
  protected datosservices: DatosService) { 
    this.formGroup=this.fb.group({});
  }

  ngOnInit() {
  
      //pasa los datos de la consultorio que llegaron
      this.consultorio = this.data.Consultorio;

      //optiene las propidades del objeto
      this.campos=Object.keys(this.data.Consultorio);
      //inicializa el formgroup
      this.formGroup=this.fb.group({});
      //llenar el formgroup con los datos del consultorio
      for (let control of this.campos) {
        let newFormControl: FormControl = new FormControl();      
        newFormControl.setValue(this.data.Consultorio[control]);
        this.formGroup.addControl(control, newFormControl);
      } 


    } 
    grabar(){
      //actualiza la persona con los datos del usuario
      
      this.consultorio =JSON.parse(JSON.stringify(this.formGroup.controls));
      // for (let control of this.campos) {
      //     if (control=="descripcion"){
      //       this.consultorio[control]=this.formGroup.controls[control].value;
      //     }
      //     else{
      //       this.consultorio[control]=+this.formGroup.controls[control].value;
      //     }

      // }
     
      if (this.formGroup.controls["id"].value == 0){
        //inserta la consultorio
        this.datosservices.InsertConsultorio(this.consultorio).subscribe(rep=>{
          this.consultorio=rep;
          this.datosservices.showMessage("Grabado","Agregando Consultorio","success");
          this.dialogRef.close(rep);
          
        });
      }else{
        //actualiza
        this.datosservices.UpdateConsultorio(this.consultorio).subscribe(rep=>{
          this.datosservices.showMessage("Actualizado","Actualizando Consultorio","success")
          this.dialogRef.close(this.consultorio);
        });
      }
    }  

    cancelar(){
      this.dialogRef.close("");
    }
}
