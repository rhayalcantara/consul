import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Consultorio } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { FormConsultorioComponent } from '../form-consultorio/form-consultorio.component';

@Component({
  selector: 'app-list-consultorios',
  templateUrl: './list-consultorios.component.html',
  styleUrls: ['./list-consultorios.component.css']
})
export class ListConsultoriosComponent implements OnInit {

    consultorios:Consultorio[]=[]
    public config: any;
    public labels: any;
    public term:string ="";
  constructor(private datosservice:DatosService,
    private toastr: MatDialog) { }

  ngOnInit() {
    this.getconsultorios();
  }
  onPageChange(event:any) {
    this.config.currentPage = event;
  }
  
  getconsultorios(){
    this.datosservice.GetConsultorios().subscribe(rep=>{
      console.log('Datos que llegaron de consultorios',rep);
      this.consultorios = rep;
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.consultorios.length
      };
      this.labels = {
        previousLabel: "<",
        nextLabel: ">",
        screenReaderPaginationLabel: "paginacion",
        screenReaderPageLabel: "paginacion1",
        screenReaderCurrentLabel: "paginacion2"
      };         
    });    
  }
  abrirmodal(){
    let Consultorio:Consultorio={
      id: 0,
      descripcion:'',
      status:1                 
    }; 
    const dialogRef = this.toastr.open(FormConsultorioComponent,{data:{consultorio:Consultorio}});
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);     
      this.getconsultorios();
    }); 
  }
  abrirmodaledit(Consultorio:Consultorio){
    const dialogRef = this.toastr.open(FormConsultorioComponent,{data:{Consultorio: Consultorio}})
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);     
      this.getconsultorios();
    }); 
  }
}
