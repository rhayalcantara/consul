import { Component, OnInit,ChangeDetectorRef,ChangeDetectionStrategy  } from '@angular/core';
import { AgendaConsultorio, Doctordts, Status, Turno, TurnoDTS } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { SignalrcustomService } from 'src/app/Services/signalrcustom.service';


@Component({
  selector: 'app-listaturnostv',
  templateUrl: './listaturnostv.component.html',
  styleUrls: ['./listaturnostv.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaturnostvComponent implements OnInit {
  index:number = -1
  lpturnos:TurnoDTS[]=[];
  

  turno:Turno={
    id:0,
    fecha:null!, 
    agenda_consultorio_id:0,
    tanda:0,
    numero:0,
    paciente_id:null!,
    valor:0,
    cobrado:0,
    status:0
  }
  agendaconsultoario:AgendaConsultorio={
    id: 0,
    consultorio_id: 0,
    doctor: 0,
  }
  constructor(private sglr:SignalrcustomService,
              private datos:DatosService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.sglr.emNotifica.subscribe(
      (t)=>{
        console.log('turno que llego',t);
        this.turno= JSON.parse(t);
        console.log('turno trasformado',this.turno);
        
        let lpturno:TurnoDTS={
          id:this.turno.id,
          fecha:null!, 
          agenda_consultorio_id:this.turno.agenda_consultorio_id,
          tanda:0,
          numero:this.turno.numero,
          paciente_id:0,
          valor:0,
          cobrado:0,
          status:this.turno.status,
          paciente:'', 
          doctor:'',   
          tanddescripcion:'', 
          doctorid:0,        
          statusdescripcion:'',
          record: ''
        }   
        console.log('lt',lpturno);

        if (!this.lpturnos.some(e=> e.id===lpturno.id) ){
            if (lpturno.status==12 || lpturno.status==14){
              this.getagendaconsultorio(lpturno,true);
            }
            
        }else{ 
          this.RemoveElementFromArray(lpturno);          
          this.getagendaconsultorio(lpturno,true);
        }
           
         
    });

    this.sglr.exNotifica.subscribe((x)=>{
      console.log (x);
      this.turno= JSON.parse(x);     
      let lpturno:TurnoDTS={
        id:this.turno.id,
        fecha:null!, 
        agenda_consultorio_id:this.turno.agenda_consultorio_id,
        tanda:0,
        numero:this.turno.numero,
        paciente_id:0,
        valor:0,
        cobrado:0,
        status:this.turno.status,
        paciente:'', 
        doctor:'',   
        tanddescripcion:'', 
        doctorid:0,        
        statusdescripcion:'',
        record:''

      }   
      this.getagendaconsultorio(lpturno,false);
      console.log('lp tranformado',lpturno);
      this.RemoveElementFromArray(lpturno);
    });


  }

  RemoveElementFromArray(element: TurnoDTS) {
    this.lpturnos.forEach((value,index)=>{
        if(value.id==element.id) this.lpturnos.splice(index,1);
        this.cd.detectChanges();
    });
}


  getagendaconsultorio(lt:TurnoDTS,bandera:boolean){
    console.log('llego agenda lt',lt);
    this.datos.GetAgendaConsultorio(lt.agenda_consultorio_id).subscribe(
      (rep)=>{this.agendaconsultoario = rep;
          //busca el doctor
          console.log('llego agenda',this.agendaconsultoario);
          let dd:Doctordts={
            id:0,
            personaid:0,
            especialiadid:0,
            fechacreacion: null!,
            statusid:0,
            persona:null!,
            especialidad:null!,
            pacientes:null!,
          }      
          let ss:Status = {
            id: 0,
            descripcion: '',
            Identifier: ''
          }

          this.datos.GetDoctor(this.agendaconsultoario.doctor).subscribe(
            
              (doc) => { 
                dd = doc;                
                lt.doctor=dd.persona.nombres+' '+dd.persona.apellidos
                console.log('llego doctor',lt);
                this.datos.GetStatu(lt.status).subscribe(
                  (sta)=>{ss=sta;
                    console.log('llego status',sta);
                        lt.statusdescripcion=ss.descripcion;
                        if (bandera){
                          this.lpturnos.push(lt);
                          this.cd.detectChanges();
                          console.log('turno entrante',this.lpturnos);
                        }

                      }
              );                
              });    
      
 
      

    });


    
  }

 


}
