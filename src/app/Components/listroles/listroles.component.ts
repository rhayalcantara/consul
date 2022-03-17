import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { FormRolComponent } from '../form-rol/form-rol.component';

@Component({
  selector: 'app-listroles',
  templateUrl: './listroles.component.html',
  styleUrls: ['./listroles.component.css']
})
export class ListrolesComponent implements OnInit {
  public config: any;
  public labels: any;
  public term:string ="";
  Roles:Roles[]=[];
  constructor(private datos:DatosService,
    private toastr: MatDialog
    ) { }

  ngOnInit() {
    this.getdatos();
  }
  getdatos(){
    this.datos.GetRoles().subscribe((rep)=>{
      this.Roles=rep;
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.Roles.length
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
    let rol:Roles={
      id:0,
      descripcion:'',
      nivel:0,
    }
    const dialogRef = this.toastr.open(FormRolComponent,{data:{rol: rol}})
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);     
      this.getdatos();
    }); 
  }
  abrirmodaledit(rol:Roles){
    const dialogRef = this.toastr.open(FormRolComponent,{data:{rol: rol}})
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);     
      this.getdatos();
    }); 
  }
  onPageChange(event:any) {
    this.config.currentPage = event;
  }
  delete(event:any) {}
}
