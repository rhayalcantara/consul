import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgendaConsultoriodetalle, Tanda } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { FormDetalleTandaConsultorioComponent } from '../form-detalle-tanda-consultorio/form-detalle-tanda-consultorio.component';

@Component({
  selector: 'app-list-agenda-consultoriodetalledd',
  templateUrl: './list-agenda-consultoriodetalledd.component.html',
  styleUrls: ['./list-agenda-consultoriodetalledd.component.css']
})
export class ListAgendaConsultoriodetalleddComponent implements OnInit {

  public tandas:Tanda[]=[];
  public dias = ["","Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" ];
  @Input("AgendaConsultoriodetalle") agendaconsultoriosdetalle:AgendaConsultoriodetalle[]=[];

 

  constructor(private  toastr: MatDialog,
          private datos:DatosService) { 
    
  }

  ngOnInit() {
    this.gettandas();
    
  }
  grabar(){
    //this.objChange.emit('grabar');
  }
  cancelar(){
   // this.objChange.emit('cancelar');
  }
  gettandas(){
    this.datos.GetTandas().subscribe(rep=>{
      this.tandas = rep;
      console.log('tandas',this.tandas);
    });
  }
  abrirmodaledit(acd:AgendaConsultoriodetalle){
    console.log('sale',acd);
    const dialogRef = this.toastr.open(FormDetalleTandaConsultorioComponent,{data:{agendaconsultorio:acd,dias:this.dias}});
    dialogRef.afterClosed().subscribe((result:AgendaConsultoriodetalle) => {
      // let camp:string[]=[];
      // camp = Object.keys(result);
      // let i:AgendaConsultoriodetalle = this.agendaconsultoriosdetalle.find(x => x.diasemana == result.diasemana);
       var index:number = this.agendaconsultoriosdetalle.indexOf(acd);    
       this.agendaconsultoriosdetalle[index]=result
      // for (let control of camp) {
      //   this.agendaconsultoriosdetalle[index][control]=result[control]        
      // }
      
      console.log('The dialog was closed',result);         
      });   

  }


}
