import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PacientePersona, Persona } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';


@Component({
  selector: 'app-paciente-persona',
  templateUrl: './paciente-persona.component.html',
  styleUrls: ['./paciente-persona.component.css']
})
export class PacientePersonaComponent implements OnInit {

  public pacientepersonas:PacientePersona[]=[];
  private persona:Persona ={
    id:0,
    nombres:"",
    apellidos:"",
    apodo:"",
    fecha_nacimiento:null!,
    lugar_nacimiento:"",
    sexo:"",
    ocupacion:"",
    procedencia:"",
    raza:"",
    numero_identificacion:"",
    tipo_identificacion:5,
    telefono_casa:'',
    celular:''
  };
  constructor(private dataservice:DatosService,
    private toastr: MatDialog) { }

  ngOnInit() {
    //this.getdatos();
  }
//   getdatos(){
//     this.dataservice.GetPacientePersonas().subscribe(rep =>{
//       console.log('pp',rep);
//       this.pacientepersonas = rep;
//     });
//   }
//   abrilformulario(){
//     let paciente:Paciente={
//       id: 0,
//       personaid:this.persona.id,          
//       fechacreacion: new Date(),
//       historial_clinico:""
//     }
//     const dialogRef = this.toastr.open(FormpersonaComponent,{data:{persona: this.persona,paciente: paciente,rol:'Paciente'}}  );
     
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed',result);           
//       this.getdatos();
//   });

// }
//   abrilformularioeditar(pa:PacientePersona){

//     const dialogRef = this.toastr.open(FormpersonaComponent,{data:{persona: pa.persona,paciente: pa.paciente,rol:'Paciente'}}  );
     
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed',result);           
//       this.getdatos();
//   });
//   }

}
