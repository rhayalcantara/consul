import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormparentescoComponent } from 'src/app/Components/formparentesco/formparentesco.component';
import { Parentesco } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';


@Component({
  selector: 'app-parentescos',
  templateUrl: './parentescos.component.html',
  styleUrls: ['./parentescos.component.css']
})
export class ParentescosComponent implements OnInit {

  parentescos :Parentesco[]=[];
  public config: any;
  public labels: any;
  public term:string ="";
  constructor(private dataservice:DatosService,
    private toastr: MatDialog
    ) { }

  ngOnInit() {
    this.getdatos();
  }
  onPageChange(event:any) {
    this.config.currentPage = event;
  }
  getdatos(){
    this.dataservice.GetParentescos().subscribe(rep =>{
      console.log(rep);
      this.parentescos=rep;
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.parentescos.length
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
    let parentesco:Parentesco={
      id: 0,
      parentesco:''                 
    };    
    const dialogRef = this.toastr.open(FormparentescoComponent,{data:{parentesco: parentesco}})
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);     
      this.getdatos();
    }); 
  }
  abrirmodaledit(parentesco:Parentesco){
    const dialogRef = this.toastr.open(FormparentescoComponent,{data:{parentesco: parentesco}})
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);     
      this.getdatos();
    }); 
  }
}
