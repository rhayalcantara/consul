import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {formatDate } from '@angular/common';
import { GturnosComponent } from '../gturnos/gturnos.component';
import { ListaturnospacientesComponent } from '../listaturnospacientes/listaturnospacientes.component';
import { Lturno } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';

@Component({
  selector: 'app-listaturnos',
  templateUrl: './listaturnos.component.html',
  styleUrls: ['./listaturnos.component.css']
})
export class ListaturnosComponent implements OnInit {

  public lturnos:Lturno[]=[];
  fecha :string="";
  today = new Date();
  constructor(private  toastr: MatDialog,
    private datos:DatosService) { }

  ngOnInit() {
    this.fecha =formatDate(this.today, 'yyyy-MM-dd', 'en-US', '-0430');
    this.getturnos(this.fecha);
  }
  getturnos(fecha:string){
    this.datos.GetLTurnos(fecha).subscribe(rep=>{
      this.lturnos = rep;
    });
  }
  crearturno(lturno:Lturno){
   
    const dialogRef = this.toastr.open(GturnosComponent,{ width: '70%',
    height: '70%',data:{LTurno:lturno}});
  
    dialogRef.afterClosed().subscribe((result) => {

 
      this.datos.showMessage("Numero : " + result.numero,"Turno","success")  
      this.getturnos(this.fecha);
    });
  }
  listar(lturno:Lturno){    
    const dialogRef = this.toastr.open(ListaturnospacientesComponent,{ width: '70%',
    height: '70%',data:{LTurno:lturno}});
    dialogRef.afterClosed().subscribe(result => {
  
      this.getturnos(this.fecha);
    });
  }
  buscar(even:any){
   
  }
}
