import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog,  MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Consultas, Doctordts, PacientePersona } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';

import { BuscardoctoresComponent } from '../buscardoctores/buscardoctores.component';
import { BuscarpacientesComponent } from '../buscarpacientes/buscarpacientes.component';


@Component({
  selector: 'app-formulario-consulta',
  templateUrl: './formulario-consulta.component.html',
  styleUrls: ['./formulario-consulta.component.css']
})
export class FormularioConsultaComponent implements OnInit {


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
  temperatura: 0
  };
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
  public doctor:Doctordts={
    id:0,
    personaid:0,
    especialiadid:0,
    fechacreacion: null!,
    statusid:0,
    persona:{
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
    especialidad:{
      id: 0,
      descripcion:''
    },
    pacientes:[]
  };
  public formGroup: FormGroup;
  public campos:string[]=[];
  public identificador:string="Expediente";
  @ViewChild('fileInput',{static: false}) fileInput: ElementRef=null!;
  files = [];

  constructor(
      @Inject(MAT_DIALOG_DATA) public data:any,
      public dialogRef: MatDialogRef<FormularioConsultaComponent>,
      private toastr: MatDialog,
      private fb: FormBuilder,
      private tool:DatosService
  ) { this.formGroup=this.fb.group({})}

  ngOnInit() {
    this.campos=Object.keys(this.data.consulta);
    this.consulta = this.data.consulta;
    this.formGroup=this.fb.group({});

    let nombres: FormControl = new FormControl();   
    let apellidos: FormControl = new FormControl();  
    let numero_identificacion: FormControl = new FormControl();    
    let nombresdoc: FormControl = new FormControl();   
    let apellidosdoc: FormControl = new FormControl();  
    let area: FormControl = new FormControl(); 
  
    this.formGroup.addControl("nombres", nombres);
    this.formGroup.addControl("apellidos", apellidos);
    this.formGroup.addControl("numero_identificacion", numero_identificacion);
    this.formGroup.addControl("nombresdoc", nombresdoc);
    this.formGroup.addControl("apellidosdoc", apellidosdoc);
    this.formGroup.addControl("area", area);



    for (let control of this.campos) {
      //this.consulta[control]=this.data.consulta[control];
      let newFormControl: FormControl = new FormControl();  
      if (control=='fecha'){
        if (this.consulta.id!=0){

           this.getdoctor(this.data.consulta.doctor);
           this.getpaciente(this.data.consulta.pacienteid);
          newFormControl.setValue(new Date(this.data.consulta['fecha']).toISOString().substring(0, 10));
          
        }else{
          newFormControl.setValue(new Date().toISOString().substring(0, 10));
        }
      }else{
    
        newFormControl.setValue(this.data.consulta[control]);       
      }
      this.formGroup.addControl(control, newFormControl);

    }    

  
    // nombres.setValue(this.paciente.persona.nombres);
    // apellidos.setValue(this.paciente.persona.apellidos);
    // numero_identificacion.setValue(this.paciente.persona.numero_identificacion);
    // nombresdoc.setValue(this.doctor.persona.nombres);
    // apellidosdoc.setValue(this.doctor.persona.apellidos);
    // area.setValue(this.doctor.especialidad.descripcion);



  
  }

  grabar(){
    //actualiza los valores de la consulta con los datos del formgroup
    // for (let control of this.campos) {
    //   this.consulta[control]=this.formGroup.controls[control].value;
    // }
    this.consulta=JSON.parse(JSON.stringify(this.formGroup.controls));
    this.consulta.pacienteid= this.paciente.pacienteid;
    this.consulta.doctor = this.doctor.id;
    if (this.consulta.id==0){
      this.tool.InsertConsulta(this.consulta).subscribe(rep=>{
        this.consulta = rep;
        this.upload(this.consulta.id);

        this.dialogRef.close(rep);
      });
    }else{
      
      this.tool.UpdateConsulta(this.consulta).subscribe(rep=>{
        this.upload(this.consulta.id);
        this.dialogRef.close(this.consulta);
      });
    }

  }

  upload(cod:number){
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files.length > 0 ) {
      
      for (let index = 0; index < fileBrowser.files.length; index++){
        const file = fileBrowser.files[index];
        let idt:string = "Expediente";
        this.tool.Uploadfile(file,cod,idt).subscribe(rep =>{
        });
      }   
    }
  }

  abribusquedapaciente(){
    const dialogRef = this.toastr.open(BuscarpacientesComponent,{data:""});

  
    dialogRef.afterClosed().subscribe(result => {
      this.paciente =   result;
      this.formGroup.controls["nombres"].setValue(result.persona.nombres);
      this.formGroup.controls["apellidos"].setValue(result.persona.apellidos);
      this.formGroup.controls["numero_identificacion"].setValue(result.persona.numero_identificacion);
      this.consulta.pacienteid = this.paciente.pacienteid
    });    
  }
  abribusquedadoctores(){
    const dialogRef = this.toastr.open(BuscardoctoresComponent,{data:""});

  
    dialogRef.afterClosed().subscribe(result => {
      this.doctor =   result;
      this.formGroup.controls["nombresdoc"].setValue(this.doctor.persona.nombres);
      this.formGroup.controls["apellidosdoc"].setValue(this.doctor.persona.apellidos);
      this.formGroup.controls["area"].setValue(this.doctor.especialidad.descripcion);
      this.consulta.doctor = this.doctor.id
    });    
  }
  getpaciente(id: number){
    this.tool.GetPacientePersona(id).subscribe(rep=>{ 
      this.paciente = rep;    
      this.formGroup.controls['pacienteid'].setValue(this.paciente.pacienteid);
      this.formGroup.controls['nombres'].setValue(this.paciente.persona.nombres);
      this.formGroup.controls['apellidos'].setValue(this.paciente.persona.apellidos);
      this.formGroup.controls['numero_identificacion'].setValue(this.paciente.persona.numero_identificacion);
    });
  }
  getdoctor(id:number){
    this.tool.GetDoctor(id).subscribe(rep=>{

      this.doctor = rep;
      this.formGroup.controls['doctor'].setValue(this.doctor.id);
      this.formGroup.controls['nombresdoc'].setValue(this.doctor.persona.nombres);
      this.formGroup.controls['apellidosdoc'].setValue(this.doctor.persona.nombres);
      this.formGroup.controls['area'].setValue(this.doctor.especialidad.descripcion);
    });
  }
  cancelar(){
    this.dialogRef.close("");
  }
}
