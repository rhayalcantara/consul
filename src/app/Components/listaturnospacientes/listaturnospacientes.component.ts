import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Turno, TurnoDTS } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';


@Component({
  selector: 'app-listaturnospacientes',
  templateUrl: './listaturnospacientes.component.html',
  styleUrls: ['./listaturnospacientes.component.css']
})
export class ListaturnospacientesComponent implements OnInit {
  public lpturnos:TurnoDTS[]=[];
  public fecha:string="";
  public acid:number=0;
  public doctor:string="";
  public tanda:string="";

  constructor( @Inject(MAT_DIALOG_DATA) public data:any,
  private dialogRef: MatDialogRef<ListaturnospacientesComponent>,
  public datos:DatosService) { }

  ngOnInit() {
    this.dialogRef.updateSize('70%', '60%');
    this.fecha = this.data.LTurno.fecha;
    this.acid = this.data.LTurno.id;
    //console.log(this.data,'fecha',this.fecha,'acid',this.acid);
    this.getturnospacientes();
  }
  getturnospacientes(){
    this.datos.GetLPTurnos(this.fecha,this.acid).subscribe(
      (rep)=>{
      //console.log(rep);
      this.lpturnos = rep;
    });
  }
  llamar(t:TurnoDTS){
    console.log(t);
    let tuno:Turno={
      id:0,
      fecha:null!, 
      agenda_consultorio_id: 0,
      tanda:0,
      numero:0,
      paciente_id:0,
      valor:0,
      cobrado:0,
      status:12
    };

    tuno.id=t.id;
    tuno.fecha=t.fecha;
    tuno.agenda_consultorio_id=t.agenda_consultorio_id;
    tuno.tanda=t.tanda;
    tuno.numero=t.numero;
    tuno.paciente_id=t.paciente_id;
    tuno.valor=t.valor;
    // console.log(tuno);    

     this.datos.UpdateTurno(tuno).subscribe((rep)=>{
      this.getturnospacientes();
     });
  }
  llamar2(t:TurnoDTS){
    console.log(t);
    let tuno:Turno={
      id:0,
      fecha:null!, 
      agenda_consultorio_id: 0,
      tanda:0,
      numero:0,
      paciente_id:0,
      valor:0,
      cobrado:0,
      status:14
    };

    tuno.id=t.id;
    tuno.fecha=t.fecha;
    tuno.agenda_consultorio_id=t.agenda_consultorio_id;
    tuno.tanda=t.tanda;
    tuno.numero=t.numero;
    tuno.paciente_id=t.paciente_id;
    tuno.valor=t.valor;  
    tuno.cobrado=t.valor;  
    // console.log(tuno);    

     this.datos.UpdateTurno(tuno).subscribe((rep)=>{
      this.getturnospacientes();
     });
  }
  buscar(even:any){
   
  }
}
