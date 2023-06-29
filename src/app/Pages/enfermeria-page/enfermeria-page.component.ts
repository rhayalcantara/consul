import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnfermeriaComponent } from '../enfermeria/enfermeria.component';
import { Consultas } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-enfermeria-page',
  templateUrl: './enfermeria-page.component.html',
  styleUrls: ['./enfermeria-page.component.css']
})
export class EnfermeriaPageComponent implements OnInit {

  public consulta:Consultas={
    id: 0,
  pacienteid: 0,
  doctor: 0,
  fecha: null!,
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
  temperatura:0,
  observacion:'',
  historialclinico:''
  };
  constructor(private toastr: MatDialog,) { }

  ngOnInit(): void {
    this.abrirenfermeria()
  }

  abrirenfermeria(){
    ///this.consulta=JSON.parse(JSON.stringify(expe));  

    
    const dialogRef =  this.toastr.open(EnfermeriaComponent,{ width: '70%',
    height: '70%',data:{consulta: this.consulta,graba:true}}  );
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);           
      
  });
  }

}
