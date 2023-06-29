import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { Consultas, Lturno, Turno, TurnoDTS, Usuario } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { MatDialog } from '@angular/material/dialog';
import { FormularioConsultaComponent } from '../formulario-consulta/formulario-consulta.component';
import { EnfermeriaComponent } from 'src/app/Pages/enfermeria/enfermeria.component';


@Component({
  selector: 'app-listconsultadoctor',
  templateUrl: './listconsultadoctor.component.html',
  styleUrls: ['./listconsultadoctor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListconsultadoctorComponent implements OnInit {
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

  fecha :string="";
  today = new Date();
  public lturnos:Lturno[]=[];
  public lt:TurnoDTS[]=[];
  usuario:Usuario=null!;
  estado:string="Cargando...";
  constructor(private datos:DatosService,private toastr: MatDialog,
    private cd: ChangeDetectorRef) {
     this.datos.usuario.subscribe(res => {
       this.usuario= res;
     });
   }

  ngOnInit() {
    this.fecha =formatDate(this.today, 'yyyy-MM-dd', 'en-US', '-0430');
    this.getdatos(this.fecha);
  }

  getdatos(fecha:string) {
    this.datos.GetLTurnos(fecha).subscribe(result => {
      console.log('listado',result,this.usuario);
      this.lturnos=result.filter(x=>x.doctorid == this.usuario.doctor.id);
      if (this.lturnos.length==0){
        this.estado="No Hay Pacientes para consultar";
      }else{
        this.buscarturnos();
      }
    })
  }

  cambiacolor(){
    this.cd.detectChanges(); 
  console.log('entro')
    // loops through each row
    for (let i = 0; i < this.lt.length; i++) {
        console.log(this.lt[i].statusdescripcion);
          
        switch (this.lt[i].status){
          case 14:
            var row = document.getElementById("statu"+i)            
            if (row!=null){
              row.className = "aconsulta";
            }
            break;
            case 1016:
              var row = document.getElementById("statu"+i)
            console.log(row)
            if (row!=null){
              row.className = "enconsulta";
            }
            break;
        }
                                    
     }

  }
  llamarenfermeria(lpturno:any){
  this.consulta=JSON.parse(JSON.stringify(lpturno));  

    console.log(this.consulta)
    const dialogRef =  this.toastr.open(EnfermeriaComponent,{ width: '70%',
    height: '70%',data:{consulta: this.consulta,graba:true}}  );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);           
      
    });
  }
  llamar2(L:TurnoDTS) {
    //cambia el estatus del turno a consulta
    let turno:Turno = JSON.parse(JSON.stringify(L));
    turno.status=14;
    this.datos.UpdateTurno(turno).subscribe((result:Turno)=>{
      // let index:number= this.lt.indexOf(L)
      // this.lt[index].status= result.status
      // this.lt[index].statusdescripcion= "A Consulta"
      // this.cambiacolor();
      this.buscarturnos();
    });
  }
  buscarturnos(){
    this.lt=[];
    this.datos.GetLPTurnos(this.fecha,this.lturnos[0].id).subscribe(
      (rep)=>{
      console.log(rep);
      this.lt = rep;
      this.cd.detectChanges();
      this.cambiacolor();
    });
  }
  llamar(L:TurnoDTS) {
    //cambia el estatus del turno En consulta
    let turno:Turno = JSON.parse(JSON.stringify(L));
    turno.status=1016;
    this.datos.UpdateTurno(turno).subscribe((result:Turno)=>{
      this.buscarturnos();
    });

      //abrir la pantalla de consulta
      this.consulta={
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
      this.consulta.record = L.record;
      this.consulta.pacienteid = L.paciente_id;
      this.consulta.doctor = L.doctorid;
      this.consulta.fecha = new Date(this.fecha);
      const dialogRef =  this.toastr.open(FormularioConsultaComponent,{width: '70%',
      height: '70%',disableClose: true,data:{consulta: this.consulta,graba:true}} );
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed',result);
        if (result!=null){
          this.consulta=result;
          if (this.consulta.id!=0){
            turno.status=1017;
            this.datos.UpdateTurno(turno).subscribe((result:Turno)=>{
              this.buscarturnos();
            });
          }

        }               
      });
  }
  buscar(L:any) {}
}
