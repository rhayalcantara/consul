import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BuscarpacientesComponent } from 'src/app/Components/buscarpacientes/buscarpacientes.component';
import { Consultas, PacientePersona, Presu_Enf, ProcedimientoDTS } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';

@Component({
  selector: 'app-enfermeria',
  templateUrl: './enfermeria.component.html',
  styleUrls: ['./enfermeria.component.css']
})
export class EnfermeriaComponent implements OnInit {
  public formGroup:FormGroup
  presu=[]
  procedimientosdts:ProcedimientoDTS[]=[]
  monto: number=0
  graba: boolean=true
  campos:string[]=[];
  public consulta:Consultas={
    id: 0,
  pacienteid: 0,
  doctor: 0,
  fecha: new Date('01/01/1900'),
  revision_por_sistema: "",
  antecedentes_personales: "",
  ninez: "",
  adolecencia: "",
  adultez: "",
  habitos_toxicos: "",
  cafe: false,
  alcohol:false,
  tizana: false,
  antecedentes_ginocoobterico: "",
  antecedentes_familiares: "",
  hta: "",
  tbp: "",
  hc: "",
  er: "",
  ca: "",
  examen_fisico: "",  
  ta:   "",
  fc:   "",
  fr:   "",
  fo:   "",
  cabeza:  "",
  cuello:    "",
  torax:   "",
  corazon:   "",
  purmones:  "",
  abdomen:   "",
  extremidades: "",
  ge:  "",
  tr:  "",
  ekg: "",
  analitica: "",
  rx_torax:  "",
  otros:  "",
  dx: "",
  tx: "",
  record: "",
  peso:0,
  temperatura: 0,
  observacion:'',
  historialclinico:''
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private toastr: MatDialog,
              private tool: DatosService,
              public dialogRef: MatDialogRef<EnfermeriaComponent>,
              private fb: FormBuilder,
              ) {
                this.formGroup=fb.group({});
               }

  ngOnInit(): void {
  
    this.campos=Object.keys(this.consulta);
    this.consulta = this.data.consulta;
    
    this.tool.GetProcedimientosCuenta().subscribe(rep=>{
      this.tool.GetProcedimientos(0,rep,'',1013).subscribe({next:(result:ProcedimientoDTS[]) =>
        {
          this.procedimientosdts = result
          //console.log('procedimientos',this.procedimientosdts)
        },error:(err:Error) =>{
          this.tool.showMessage("Error: " + err.message,"Error","error")
      }})
    })
    if (this.consulta.pacienteid == null) {
      this.getpaciente(this.data.consulta.paciente_id);
    }else{
      this.getpaciente(this.data.consulta.pacienteid);
    }
    
    for (let control of this.campos) {
      let newFormControl: FormControl = new FormControl();  
      if (control=='fecha'){
          newFormControl.setValue(new Date().toISOString().substring(0, 10));
      }else{
         newFormControl.setValue(this.data.consulta[control]);       
      }
      this.formGroup.addControl(control, newFormControl);
    } 
    let nombres: FormControl = new FormControl();   
    let apellidos: FormControl = new FormControl();  
    let numero_identificacion: FormControl = new FormControl();   
    let sexo: FormControl = new FormControl();
    let nacionalidad: FormControl = new FormControl();
    this.formGroup.addControl('nombres', nombres);
    this.formGroup.addControl('apellidos',apellidos);
    this.formGroup.addControl('numero_identificacion', numero_identificacion);
    this.formGroup.addControl('sexo', sexo);
    this.formGroup.addControl('nacionalidad', nacionalidad);
    this.getpreenf()
  }
  
  getpaciente(id: number){
    this.tool.GetPacientePersona(id).subscribe(
    {
      next:(rep:PacientePersona)=>
      { 
       //paciente
       this.formGroup.controls["nombres"].setValue(rep.persona.nombres);
       this.formGroup.controls["apellidos"].setValue(rep.persona.apellidos);
       this.formGroup.controls["numero_identificacion"].setValue(rep.persona.numero_identificacion);
       this.formGroup.controls['sexo'].setValue(rep.persona.sexo);
       this.formGroup.controls['nacionalidad'].setValue(rep.persona.lugar_nacimiento)
      
      },
      error:(err:Error)=>
      {
        this.tool.showMessage("Error: " + err.message,"Desplegando Datos del Paciente","error")
      }
    });
  }
  abribusquedapaciente(){
    const dialogRef = this.toastr.open(BuscarpacientesComponent,{width:"70%" ,height:"80%" ,data:""});
    dialogRef.afterClosed().subscribe((result:PacientePersona) => {
      this.getpaciente(result.pacienteid)
      
    });
  }
  eliminar(p:Presu_Enf){
    this.presu.splice(this.presu.indexOf(p),1);
    this.suma();
  }
  abrilformulario(){
    let valor = this.procedimientosdts[0]
    let item:Presu_Enf={
      id:0,
      fecha:new Date(),
      procedimiento:valor.id,      
      valor: valor.monto,
      consultaid:this.consulta.id,
      observacion:""
    }
    this.presu.push(item)
  }
  suma(){
    this.monto=0;
    this.presu.forEach(x=> {
      this.monto +=x.valor;
    });
  }
  valueChange(valor:any,campo:string,p:Presu_Enf): void {
    switch(campo){
      case "fecha":
          p.fecha=valor.target.value;
        break;
        case "procedimiento":
          p.procedimiento=valor.target.value;
          p.valor = this.procedimientosdts.find(x=> x.id==valor.target.value).monto
          
          this.suma()
        break;
        case "observacion":
          p.observacion =valor.target.value;
          break;
        case "valor":          
          p.valor=+valor.target.value;
          this.suma()
        break; 

    }
  }
  cancelar(){}
  grabar(){
    this.presu.forEach(element => {
      element.id =0;
    });
    if (this.presu.length>0){
       console.log('grabar',this.presu)
      this.tool.setPreEnf(this.presu).subscribe({next: (rep:Presu_Enf[])=>{
        this.presu=rep;
    }})
    }
    this.dialogRef.close();
  }
  getpreenf(){
    this.tool.GetPreEnfConsulta(this.consulta.id.toString()).subscribe({next: (rep:Presu_Enf[])=>{
      console.log('llego',rep)
      this.presu=rep;
    }})
  }
}
