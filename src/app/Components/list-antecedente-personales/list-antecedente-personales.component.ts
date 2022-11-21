import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente, PacientePersona, Persona_cf } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { HelperService } from 'src/app/Services/HelpService';
import { FormAntecedentePersonalesComponent } from '../form-antecedente-personales/form-antecedente-personales.component';

@Component({
  selector: 'app-list-antecedente-personales',
  templateUrl: './list-antecedente-personales.component.html',
  styleUrls: ['./list-antecedente-personales.component.css']
})
export class ListAntecedentePersonalesComponent implements OnInit {
  public personascf:Persona_cf[]= [];
  public pcf:Persona_cf={
    id: 0,
    personaid: 0,
    pacienteid: 0,
    fecha: new Date().toISOString().substring(0, 10),
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
  @Input() paciente:Paciente
  /*={
    id: 0,
    personaid: 0,
    fechacreacion:new Date(),
    historial_clinico: "",
    record: "",
  }*/
  public term:string ="";
  public Cargando:string='Cargando';
  constructor(private datos:DatosService,
    private toastr: MatDialog,
    private helper: HelperService) {
      this.helper.customMessagePaciente.subscribe((msg:PacientePersona) => {
        this.paciente = msg.paciente
        this.getdatos();
      })
     }

  ngOnInit(): void {
    console.log("el paciente",this.paciente)
    this.getdatos;
  }
  getdatos(){
    this.personascf=[];
    if (this.paciente){
      this.datos.GetPersonacf(this.paciente.id).subscribe(
        { next:(rep)=>{
          this.personascf = rep
        },error:(err:Error)=>{
          this.datos.showMessage("Error: " + err.message,"Error","error")
        },complete:()=>{
          this.Cargando="";
        }}
        )
    }

  }
  abrirmodal(){
    const dialogRef =  this.toastr.open(FormAntecedentePersonalesComponent,{ width: '70%',
    height: '70%',data:{personacf:this.pcf}} );
    
    dialogRef.afterClosed().subscribe({ next: (result) => {
     // console.log('The dialog was closed',result);   
     
      this.getdatos()        
    }
  });
  }
  edit(persona:Persona_cf){
    const dialogRef =  this.toastr.open(FormAntecedentePersonalesComponent,{ width: '70%',
    height: '70%',data:{personacf:persona}}  );
    
    dialogRef.afterClosed().subscribe({ next: (result) => {
     // console.log('The dialog was closed',result);   
      this.getdatos()           
    }
  });
  }
}
