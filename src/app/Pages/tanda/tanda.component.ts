import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormTandaComponent } from 'src/app/Components/form-tanda/form-tanda.component';
import { Tanda } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';


@Component({
  selector: 'app-tanda',
  templateUrl: './tanda.component.html',
  styleUrls: ['./tanda.component.css']
})
export class TandaComponent implements OnInit {

  Tandas:Tanda[] = [];
  tanda:Tanda={
    id:0,
    descripcion:'',
    status:1
  }
  public config: any={
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.Tandas.length
  };
  public labels: any = {
    previousLabel: "<",
    nextLabel: ">",
    screenReaderPaginationLabel: "paginacion",
    screenReaderPageLabel: "paginacion1",
    screenReaderCurrentLabel: "paginacion2"
  };
 public term:string = "";
  constructor(private toastr: MatDialog,
      private tool: DatosService) { }

  ngOnInit() {
    this.gettandas();
  }
  onPageChange(event:any) {
    this.config.currentPage = event;
  }
  gettandas(){
      this.tool.GetTandas().subscribe(rep=>{
        this.Tandas=rep;
        this.config = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.Tandas.length
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
  abrilformulario(){
 
    const dialogRef = this.toastr.open(FormTandaComponent,{data:{tanda:this.tanda}});
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);     
      this.gettandas();
    }); 
  }
  abrirmodaledit(tanda:Tanda){
    const dialogRef = this.toastr.open(FormTandaComponent,{data:{tanda: tanda}})
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);     
      this.gettandas();
    }); 
  }

}
