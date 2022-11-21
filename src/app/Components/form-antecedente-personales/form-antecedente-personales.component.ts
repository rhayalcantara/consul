import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona_cf } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { HelperService } from 'src/app/Services/HelpService';

@Component({
  selector: 'app-form-antecedente-personales',
  templateUrl: './form-antecedente-personales.component.html',
  styleUrls: ['./form-antecedente-personales.component.css']
})
export class FormAntecedentePersonalesComponent implements OnInit {
  public formGroup: FormGroup;
  public campos:string[]=[];
  public persona_cf:Persona_cf={
    id: 0,
    personaid: 0,
    pacienteid: 0,
    fecha: '',
    peso: '',
    talla: '',
    condicion_fisica: '',
    cafe: false,
    alcohol: false,
    tizana: false,
    atecedentespersonales: '',
    ninez: '',
    adolencencia: '',
    adultez: '',
    habitostoxico: '',
    antecedentesginocoobterico: '',
    antecedentesfamiliares: '',
    observacion: ''
  }
  public term: string ="";
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              public dialogRef: MatDialogRef<FormAntecedentePersonalesComponent>,
              private fb: FormBuilder,
              private tool:DatosService
              //private helper:HelperService
) { 
  this.formGroup=this.fb.group({})
  this.campos=Object.keys(this.persona_cf);
    //llenar el formgroup con los datos del consultorio
  for (let control of this.campos) {
    
    let newFormControl: FormControl = new FormControl();      
    if (control=="fecha"){
      newFormControl.setValue(new Date(this.data.personacf[control]).toISOString().substring(0, 10));
    }else{
      newFormControl.setValue(this.data.personacf[control]);
    }
    
    this.formGroup.addControl(control, newFormControl);
  } 

}

  ngOnInit(): void {
    // console.log("la personacf",this.data.personacf)
    this.persona_cf = this.data.personacf
    
  }
  grabar(){
    this.persona_cf=JSON.parse(JSON.stringify(this.formGroup.value));
    if (this.persona_cf.id==0){
      //nuevo
      this.tool.AddPersonacf(this.persona_cf).subscribe({next:(rep:Persona_cf)=>{
        this.tool.showMessage("Grabado","Antecedentes Personales","success");
        this.dialogRef.close(rep);
      }})
    }else{
      //edit
      console.log("la pcf",this.persona_cf)
      this.tool.updatePersonacf(this.persona_cf).subscribe({next:(rep:Persona_cf)=>{
        this.tool.showMessage("Actualizado","Antecedentes Personales","success");
        this.dialogRef.close(rep);
      },error:(err)=>{
        this.tool.showMessage(err.message,"Error","error")
      }
      })
    }
 
  }
  cancelar(){
    this.dialogRef.close();
  }
}
