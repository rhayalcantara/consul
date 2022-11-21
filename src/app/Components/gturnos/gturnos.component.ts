import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { PacientePersona, Turno } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { BuscarpacientesComponent } from '../buscarpacientes/buscarpacientes.component';


@Component({
  selector: 'app-gturnos',
  templateUrl: './gturnos.component.html',
  styleUrls: ['./gturnos.component.css']
})
export class GturnosComponent implements OnInit {

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
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private dialogRef: MatDialogRef<GturnosComponent>,
  private fb: FormBuilder,
  protected datosservices: DatosService,
  private toastr: MatDialog) { this.formGroup=this.fb.group({})}

  ngOnInit() {
    this.dialogRef.updateSize('80%', '80%');
    this.Doctor = this.data.LTurno.doctor
    console.log("doctor",this.Doctor)
    console.log("data",this.data)
    this.turno.fecha= this.data.LTurno.fecha;
    this.turno.agenda_consultorio_id = this.data.LTurno.id
    this.turno.tanda = this.data.LTurno.tandaid
    this.turno.valor = this.data.LTurno.valor
    this.formGroup=this.fb.group({});

    let newFormControl: FormControl = new FormControl();      
    newFormControl.setValue(this.Doctor+"-"+this.data.LTurno.tanda);
    this.formGroup.addControl("doctor", newFormControl);

    let newFormControl2: FormControl = new FormControl();      
    newFormControl2.setValue("");
    this.formGroup.addControl("nombres", newFormControl2);

    let newFormControlrecord: FormControl = new FormControl();      
    newFormControlrecord.setValue("");
    this.formGroup.addControl("record", newFormControlrecord);

    let newFormControl3: FormControl = new FormControl();      
    newFormControl3.setValue("");
    this.formGroup.addControl("apellidos", newFormControl3);

    let newFormControl4: FormControl = new FormControl();      
    newFormControl4.setValue("");
    this.formGroup.addControl("numero_identificacion", newFormControl4);
    

    let newFormControl5: FormControl = new FormControl();      
    this.formGroup.addControl("id", newFormControl5);


    let valor: FormControl = new FormControl();      
    this.formGroup.addControl("valor", valor);
    valor.setValue(this.turno.valor);

    let cobrado: FormControl = new FormControl();      
    this.formGroup.addControl("cobrado", cobrado);
    cobrado.setValue("0.00");
    
  }
  abribusquedapaciente(){
    const dialogRef = this.toastr.open(BuscarpacientesComponent,{ width: '70%',
    height: '70%',data:""});

  
    dialogRef.afterClosed().subscribe(result => {
      this.paciente =   result;
      this.turno.paciente_id = this.paciente.pacienteid;
      this.formGroup.controls["record"].setValue(this.paciente.paciente.record);
      this.formGroup.controls["id"].setValue(this.paciente.pacienteid);
      this.formGroup.controls["nombres"].setValue(result.persona.nombres);
      this.formGroup.controls["apellidos"].setValue(result.persona.apellidos);
      this.formGroup.controls["numero_identificacion"].setValue(result.persona.numero_identificacion);      
      console.log('Se Actualizo el paciente',this.paciente)
    });    
  }
  grabar(){
    
    this.turno.cobrado =+this.formGroup.controls["cobrado"].value
    if ( (this.turno.valor - this.turno.cobrado)!=0 ){
      this.datosservices.showMessage("Hay Diferencias entre lo Cobrado y el valor a Cobrar","Error","Error");
      return
    }
    
    this.datosservices.insertTurno(this.turno).subscribe((resp)=>{
      this.turno= resp;
      
      this.dialogRef.close(this.turno);
    });
  }
cancelar(){}
}
