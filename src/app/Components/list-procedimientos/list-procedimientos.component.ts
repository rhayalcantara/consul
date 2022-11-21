import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Especialidades, Procedimiento, ProcedimientoDTS } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { FormprocedimientosComponent } from '../formprocedimientos/formprocedimientos.component';

@Component({
  selector: 'app-list-procedimientos',
  templateUrl: './list-procedimientos.component.html',
  styleUrls: ['./list-procedimientos.component.css']
})
export class ListProcedimientosComponent implements OnInit {
  procedimientos:ProcedimientoDTS[]=[];
  especialidades:Especialidades[]=[];
  public config: any;
  public labels: any;
  public totalSize: number = 0;
  public pageSize: number = 5;
  public currentPage: number = 0;  
  term:string=""
  selectedDevice:number = 0;
  constructor(protected datosservices: DatosService, private toastr: MatDialog) { }

    ngOnInit(): void {
      
      this.getcuenta()
      this.getdatos();
    }

    getcuenta(){
      this.datosservices.GetProcedimientosCuenta().subscribe({
        next: (rep:number)=> {
          this.totalSize = rep
        }
      });
      this.datosservices.Getespecialidades().subscribe({ next:(rep:Especialidades[])=>{
        this.especialidades=rep;
      }
    })
    }
    
    getdatos(){
      console.log("select",this.selectedDevice)
      this.datosservices.GetProcedimientos(this.currentPage,this.pageSize,this.term,this.selectedDevice)
                        .subscribe({
                          next:(rep:ProcedimientoDTS[])=>{ 
                                this.procedimientos=rep                                                              
                          }
                          ,error:(err:Error) =>{
                              this.datosservices.showMessage("Error: " + err.message,"Error","error")
                          }
                        })
    }
    abrirmodal(){
      let procedimiento:Procedimiento={
        id: 0,
        descripcion:'',
        monto:0,
        especialiadid:1008      
      }; 
      const dialogRef = this.toastr.open(FormprocedimientosComponent,{data:{procedimiento:procedimiento}});
    
      dialogRef.afterClosed().subscribe(result => {
        //console.log('The dialog was closed',result);     
        this.getdatos();
      }); 
    }
    abrirmodaledit(prod:Procedimiento){

      const dialogRef = this.toastr.open(FormprocedimientosComponent,{data:{procedimiento:prod}});
    
      dialogRef.afterClosed().subscribe(result => {
        //console.log('The dialog was closed',result);     
        this.getdatos();
      }); 
    }

    eliminar(prod:Procedimiento){}
    handlePage(event){
        this.currentPage=event.pageIndex;
        this.pageSize=event.pageSize;
        this.getdatos()
    }
  }


