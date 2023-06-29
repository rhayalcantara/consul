import { formatDate } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog,  MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Consultas, Doctordts, PacientePersona, po, Presu_Odon, ProcedimientoDTS } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { HelperService } from 'src/app/Services/HelpService';


@Component({
  selector: 'app-formulario-consulta',
  templateUrl: './formulario-consulta.component.html',
  styleUrls: ['./formulario-consulta.component.css']
})
export class FormularioConsultaComponent implements OnInit {

  public graba:boolean = false;
  public term:string="";
  public actual:string ="active";
  public anteriores:string ="";
  public odontologia:string="";
  public odontologiax:string="";
  public monto:number =0.00;
  public presu:Presu_Odon[]=[];
  public presu_ante:Presu_Odon[]=[];
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
  public procedimientosdts:ProcedimientoDTS[] = [];
  public b:boolean = false;
  public formGroup: FormGroup;
  public campos:string[]=[];
  public identificador:string="Expediente";
  @ViewChild('fileInput',{static: false}) fileInput: ElementRef=null!;
  files = [];

  constructor(
      @Inject(MAT_DIALOG_DATA) public data:any,
      public dialogRef: MatDialogRef<FormularioConsultaComponent>,
      private fb: FormBuilder,
      private tool:DatosService,
      private helper:HelperService
  ) { this.formGroup=this.fb.group({})}

  ngOnInit() {
    this.paciente={
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
    this.doctor={
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
    }
    this.helper.changeMessageDoctor(this.doctor);
    this.helper.changeMessagePaciente(this.paciente);

    this.graba = this.data.graba;
    this.campos=Object.keys(this.consulta);
    this.consulta = this.data.consulta;
   
    for (let control of this.campos) {
      let newFormControl: FormControl = new FormControl();  
      if (control=='fecha'){
        if (this.consulta.id!=0 || (this.consulta.id==0 && this.consulta.doctor!=0)){
       
           this.getdoctor(this.data.consulta.doctor);
           if (this.consulta.pacienteid!=0){
            this.getpaciente(this.data.consulta.pacienteid);
           }
           
          newFormControl.setValue(new Date(this.data.consulta['fecha']).toISOString().substring(0, 10));
          
        }else{
          newFormControl.setValue(new Date().toISOString().substring(0, 10));
        }
      }else{
    
        newFormControl.setValue(this.data.consulta[control]);       
      }
      this.formGroup.addControl(control, newFormControl);
    }    
    this.tool.GetProcedimientosCuenta().subscribe(rep=>{
      this.tool.GetProcedimientos(0,rep,'',1008).subscribe({next:(result:ProcedimientoDTS[]) =>
        {
          this.procedimientosdts = result
          console.log('procedimientos',this.procedimientosdts)
        },error:(err:Error) =>{
          this.tool.showMessage("Error: " + err.message,"Error","error")
      }})
    })
  }


  //  odontologia
  eliminar(p:Presu_Odon){
    this.presu.splice(this.presu.indexOf(p),1);
    this.suma();
  }
  abrilformulario(){
    let valor = this.procedimientosdts[0]
    let item:Presu_Odon={
      id:0,
      fecha:new Date(),
      procedimiento:valor.id,      
      valor: valor.monto,
      consultaid:this.consulta.id
    }
    this.presu.push(item)
  }
  suma(){
    this.monto=0;
    this.presu.forEach(x=> {
      this.monto +=x.valor;
    });
  }
  valueChange(valor:any,campo:string,p:Presu_Odon){
    
    switch(campo){
      case "fecha":
          p.fecha=valor.target.value;
        break;
        case "procedimiento":
          p.procedimiento=valor.target.value;
          p.valor = this.procedimientosdts.find(x=> x.id==valor.target.value).monto
          console.log(p)
          this.suma()
        break;
        case "valor":          
          p.valor=+valor.target.value;
          this.suma()
        break; 

    }
    console.log(valor,campo,p);
  }
  //********************* */

  // entra los datos del doctor y paciente
  actualizadoctor(doc:Doctordts){
    this.doctor = doc;
    this.consulta.doctor = this.doctor.id 
    if(this.doctor.especialiadid==1008){
      this.cambiatag('odontologia')
    }   
  }
  actualizapaciente(pac:PacientePersona){
    this.paciente=pac;
    this.consulta.pacienteid = this.paciente.pacienteid
  }
// *************************************
 
 
grabar(){
    //actualiza los valores de la consulta con los datos del formgroup
    // for (let control of this.campos) {
    //   this.consulta[control]=this.formGroup.controls[control].value;
    // }
    this.consulta=JSON.parse(JSON.stringify(this.formGroup.value));
    this.consulta.pacienteid= this.paciente.pacienteid;
    this.consulta.doctor = this.doctor.id;

    if (this.consulta.id==0){
      this.tool.InsertConsulta(this.consulta).subscribe(rep=>{
        this.consulta = rep;
        this.upload(this.consulta.id);
        
        if (this.doctor.especialidad.descripcion=="Odontología"){
          //poner el consultaid a la presupuesto
          this.presu.forEach(x=>{
            x.consultaid = this.consulta.id;
            x.fecha = new Date (formatDate(x.fecha, 'yyyy-MM-dd', 'en-US', '-0430'));
          });
          if (this.presu.length>0){
            this.tool.setPreOdon(this.presu).subscribe({next: (rep:Presu_Odon[])=>{
              this.presu=rep;
          }})
          }
 
        }
        this.dialogRef.close(rep);
      });
    }else{

      this.tool.UpdateConsulta(this.consulta).subscribe(rep=>{
        this.upload(this.consulta.id);
        if (this.doctor.especialidad.descripcion=="Odontología"){
          
          this.presu_ante.forEach(x=>{
            this.tool.delPreondonConsulta(x).subscribe(rep=>{
              console.log('eliminado',x.id)
            });
          })
          
          //poner el consultaid a la presupuesto
          this.presu.forEach(x=>{
            x.id=0
            x.consultaid = this.consulta.id;
            x.fecha = new Date (formatDate(x.fecha, 'yyyy-MM-dd', 'en-US', '-0430'));
          });
          console.log('enviando ',this.presu)
            this.tool.setPreOdon(this.presu).subscribe({next: (rep:Presu_Odon[])=>{
              this.presu=rep;
          }})
          

        }
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

  getpaciente(id: number){
    this.tool.GetPacientePersona(id).subscribe(
    {
      next:(rep:PacientePersona)=>
      { 
        this.paciente = rep;        
      },
      error:(err:Error)=>
      {
        this.tool.showMessage("Error: " + err.message,"Desplegando Datos del Paciente","error")
      },
      complete:()=>
      {
        this.helper.changeMessagePaciente(this.paciente);  
      }
    });
  }

  getdoctor(id:number){
    this.tool.GetDoctor(id).subscribe(
    {
      next:(rep:Doctordts)=>
      {
        
        this.doctor = rep;
        if (this.doctor.especialiadid==1008){
          this.cambiatag('odontologia');
          
          if (this.consulta.id!=0){
            this.tool.GetPreodonConsulta(this.consulta.id.toString()).subscribe({next:(rep:Presu_Odon[])=>{
              this.presu = rep;
              
              this.presu_ante.push(... rep)
             
              console.log('llego el presupuesto',this.presu)
              this.suma();
            }})
          }
        }
      },
      error:(err:Error)=>
      {
        this.tool.showMessage("Error: " + err.message,"Desplegando datos del Doctor","error");
      },
      complete:()=> 
      {
        console.log("envia doctor:",this.doctor)
        this.helper.changeMessageDoctor(this.doctor);
      }
      
    });
  }

  cancelar(){
    this.dialogRef.close(null);
  }
  cambiatag(actual:string){
    switch(actual){
      case "actual":
        this.actual="active";
        this.anteriores=""
        this.odontologia=""
        break;
      case "anteriores":
        this.actual="";
        this.anteriores="active"
        this.odontologia=""
        break;
        case "odontologia":
          this.actual="";
          this.anteriores=""
          this.odontologia="active"
          this.odontologiax="active"
          break;        
    }
  }
}
