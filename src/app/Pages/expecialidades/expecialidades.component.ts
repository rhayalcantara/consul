import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormespecialidadComponent } from 'src/app/Components/formespecialidad/formespecialidad.component';
import { Especialidades } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';


@Component({
  selector: 'app-expecialidades',
  templateUrl: './expecialidades.component.html',
  styleUrls: ['./expecialidades.component.css']
})
export class ExpecialidadesComponent implements OnInit {
  especialidades:Especialidades[]=[];
  public config: any;
  public labels: any;
  public term:string="";
  constructor(private dataservice:DatosService,
    private toastr: MatDialog) { }

  ngOnInit() {
    this.getespecialidades();
  }
  onPageChange(event:any) {
    this.config.currentPage = event;
  }
  getespecialidades(){
    this.dataservice.Getespecialidades().subscribe(rep=>{
      this.especialidades = rep;
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.especialidades.length
      };
      this.labels = {
        previousLabel: "<",
        nextLabel: ">",
        screenReaderPaginationLabel: "paginacion",
        screenReaderPageLabel: "paginacion1",
        screenReaderCurrentLabel: "paginacion2"
      }; 
    })
  }
  abrirmodal(){
    let especialidad:Especialidades ={
      id: 0,
      descripcion:''
    };    
    const dialogRef = this.toastr.open(FormespecialidadComponent,{data:{especialidad: especialidad}})
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);     
      this.getespecialidades();
    }); 
  }
  abrirmodaledit(especialidad:Especialidades){

    const dialogRef = this.toastr.open(FormespecialidadComponent,{data:{especialidad: especialidad}})
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);     
      this.getespecialidades();
    }); 
  }
}
