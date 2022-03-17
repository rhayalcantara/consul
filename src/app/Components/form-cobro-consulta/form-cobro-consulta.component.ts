import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PacientePersona, Turno } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';


@Component({
  selector: 'app-form-cobro-consulta',
  templateUrl: './form-cobro-consulta.component.html',
  styleUrls: ['./form-cobro-consulta.component.css']
})
export class FormCobroConsultaComponent implements OnInit {
  formGroup: FormGroup;
  turno:Turno={
    id:0,
    fecha:null!,
    agenda_consultorio_id:0,
    tanda:0,
    numero:0,
    paciente_id:0,
    valor:0,
    cobrado:0,
    status:0
  }
  public paciente:PacientePersona={
    pacienteid: 0,
    personaid: 0,
    persona: {
      id: 0,
      nombres: '',
      apellidos:'',
      apodo:'',
      fecha_nacimiento:new Date(),
      lugar_nacimiento:'',
      sexo:'',
      ocupacion:'',
      procedencia:'',
      raza:'',
      numero_identificacion:'',
      tipo_identificacion:5,
      telefono_casa:'',
      celular:''
    },
    paciente: null!,
    tipoIdentificacion:{
      id:0,
      descripcion:'',
      Identifier:''
    },
    consultas: []
  };
  Doctor:string="";  
  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
  private dialogRef: MatDialogRef<FormCobroConsultaComponent>,
  private datos:DatosService) { this.formGroup=this.fb.group({}); }

  ngOnInit() {
    this.dialogRef.updateSize('70%', '70%');
    this.formGroup=this.fb.group({});
    this.getturno(this.data.LTurno.id);

    let newFormControl: FormControl = new FormControl();      
    newFormControl.setValue(this.data.LTurno.doctor);
    this.formGroup.addControl("doctor", newFormControl);

    let newFormControl2: FormControl = new FormControl();      
    newFormControl2.setValue(this.data.LTurno.paciente);
    this.formGroup.addControl("nombres", newFormControl2);

    let valorc: FormControl = new FormControl();      
    valorc.setValue(this.data.LTurno.valor);
    this.formGroup.addControl("valorc", valorc);

    let valor: FormControl = new FormControl();      
    //valor.setValue('0');
    this.formGroup.addControl("valor", valor); 
        
  }
  getturno(id:string){
    this.datos.GetTurno(id).subscribe((rep)=>{
      this.turno= rep;

    });
  }

  grabar(){
    let n:number=0;
    if (this.stringIsNumber(this.formGroup.controls["valor"].value)){
      n=+this.formGroup.controls["valor"].value;
    }
    if (n==0){
      this.datos.showMessage("No puede ser cero","Mensage del Sistema","info");
      return;
    }else{
      this.turno.cobrado=n;
      this.turno.status=16;
      this.datos.UpdateTurno(this.turno).subscribe((rep)=>{
        this.datos.showMessage("Grabado","Mensage del Sistema","info");
        this.dialogRef.close(this.turno);
      })
    }

  }
 stringIsNumber(s:any) {
    var x = +s; // made cast obvious for demonstration
    return x.toString() === s;
  }
  cancelar(){}
}
