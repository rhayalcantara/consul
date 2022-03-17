import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TurnoDTS } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { SignalrcustomService } from 'src/app/Services/signalrcustom.service';
import { FormCobroConsultaComponent } from '../form-cobro-consulta/form-cobro-consulta.component';

@Component({
  selector: 'app-listcaja',
  templateUrl: './listcaja.component.html',
  styleUrls: ['./listcaja.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListcajaComponent implements OnInit {
  fecha :string="";
  today = new Date();
  public lpturnos:TurnoDTS[]=[];
  constructor(private sglr:SignalrcustomService,
              private datos:DatosService,
              private cd: ChangeDetectorRef,
              private  toastr: MatDialog) { }

  ngOnInit() {
    this.sglr.emNotifica.subscribe(
      (t)=>{
        console.log('turno que llego',t);
        
            this.getdatos();
           
         
    });
    this.fecha =formatDate(this.today, 'yyyy-MM-dd', 'en-US', '-0430');
    this.getdatos();
  }
  getdatos(){
    this.datos.GetLPTurnoscaja(this.fecha).subscribe(
      (rep)=>{
        console.log('datos',rep)
        this.lpturnos=rep;
        this.cd.detectChanges();
    });

  }
  llamar(lturno:TurnoDTS){
    const dialogRef = this.toastr.open(FormCobroConsultaComponent,{data:{LTurno:lturno}});
  
    dialogRef.afterClosed().subscribe((result) => {

      console.log('The dialog was closed',result);   
      //this.datos.showMessage("Numero : " + result.numero,"Turno","success")  
      this.getdatos();
    });
  }
 buscar(even:any){
   
 }

}
