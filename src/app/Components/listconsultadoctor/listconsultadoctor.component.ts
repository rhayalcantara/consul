import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { Lturno, TurnoDTS, Usuario } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';


@Component({
  selector: 'app-listconsultadoctor',
  templateUrl: './listconsultadoctor.component.html',
  styleUrls: ['./listconsultadoctor.component.css']
})
export class ListconsultadoctorComponent implements OnInit {

  fecha :string="";
  today = new Date();
  public lturnos:Lturno[]=[];
  public lt:TurnoDTS[]=[];
  usuario:Usuario=null!;
  estado:string="Cargando...";
  constructor(private datos:DatosService) {
     this.datos.usuario.subscribe(res => {
       this.usuario = res;
     });
   }

  ngOnInit() {
    this.fecha =formatDate(this.today, 'yyyy-MM-dd', 'en-US', '-0430');
    this.getdatos(this.fecha);
  }

  getdatos(fecha:string) {
    this.datos.GetLTurnos(fecha).subscribe(result => {
      this.lturnos=result.filter(x=>x.doctorid == this.usuario.doctor.id);
      if (this.lturnos.length==0){
        this.estado="No Hay Pacientes para consultar";
      }else{
        this.datos.GetLPTurnos(this.fecha,this.lturnos[0].id).subscribe(
          (rep)=>{
          console.log(rep);
          this.lt = rep;
        });
      }
    })
  }
  llamar2(L:any) {}
  buscar(L:any) {}
}
