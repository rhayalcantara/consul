import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Consultas, Consultasdts, Usuario } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { FormularioConsultaComponent } from '../formulario-consulta/formulario-consulta.component';

@Component({
  selector: 'app-lista-expediente-paciente',
  templateUrl: './lista-expediente-paciente.component.html',
  styleUrls: ['./lista-expediente-paciente.component.css']
})
export class ListaExpedientePacienteComponent implements OnInit {
  public totalSize: number = 0; 
  public pageSize: number = 5;
  public currentPage: number = 0;
  public totalregistros: number =0; 
  public term:string ="";
  
  consultas:Consultasdts[] = [];
  @Input() pacienteid:number = 0;
  @Input() nombrepaciente:string = '';

  constructor(             
        private toastr: MatDialog,
        private datos:DatosService) { 
          
        }

  ngOnInit(): void {
    console.log(this.pacienteid,this.nombrepaciente)
    this.getcount();
    this.getdatos();
  }
  
  getdatos(){
    this.consultas=[];
    if (this.pacienteid!=0){
      if (this.term==""){
        this.datos.GetConsultasdtspaciente(this.currentPage,this.pageSize, this.pacienteid).subscribe(rep=>{
          console.log("buscando consulta del paciente",rep);
          this.consultas = rep;
         
        });
      }else{
        this.datos.GetConsultasdtsfiltropaciente(this.currentPage,this.pageSize,this.term,this.pacienteid).subscribe(rep=>{
          this.consultas = rep;
        })
      }
      
    }
  }
  getcount(){
      console.log("entro en getcount");
      this.datos.GetConsultascuentapaciente(this.pacienteid).pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
      })
      ).subscribe(rep=>{
        console.log("total registros",rep)
        this.totalregistros= rep;
        this.totalSize = rep;
      }),(error:any)=>{console.log("error",error)}
      ;
    
    
  }
  abrirmodaledit(expe: Consultasdts){
    
    
    let consulta:Consultas =JSON.parse(JSON.stringify(expe));  
    console.log('enviando', consulta); 
    
    const dialogRef =  this.toastr.open(FormularioConsultaComponent,{ width: '70%',
    height: '70%',data:{consulta: consulta,graba:false}}  );
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);           
  });
  }
  handlePage(event: any): void {
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
    this.getdatos();
  }
  buscar(event:any){
    this.currentPage = 0;
    this.getcount;
    this.getdatos;
  }
}
