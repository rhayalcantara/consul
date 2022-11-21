import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { DatosService } from "src/app/Services/datos.service"
import { threadId } from "worker_threads"
import{Consultas} from "../../Interfaces/interfaces"
@Injectable({
  providedIn: 'root'
})
export class ConsultaModelo implements Consultas{
   
  id: number
  pacienteid: number
  doctor: number
  fecha: Date
  revision_por_sistema: String
  antecedentes_personales: String
  ninez: String
  adolecencia: String
  adultez: String
  habitos_toxicos: String
  cafe: Boolean
  alcohol: Boolean
  tizana: Boolean
  antecedentes_ginocoobterico: String
  antecedentes_familiares: String
  hta: String
  tbp: String
  hc: String
  er: String
  ca: String
  examen_fisico: String
  ta: String
  fc: String
  fr: String
  fo: String
  cabeza: String
  cuello: String
  torax: String
  corazon: String
  purmones: String
  abdomen: String
  extremidades: String
  ge: String
  tr: String
  ekg: String
  analitica: String
  rx_torax: String
  otros: String
  dx: String
  tx: String
  record: String
  peso: number
  temperatura: number    
  observacion: String
  historialclinico: String

   private Url:string
   public headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });
    constructor(private datos:DatosService,
        private  http: HttpClient){
           this.Url=datos.Url_api
           this.id= 0
           this.pacienteid= 0
           this.doctor= 0
           this.fecha= null!
           this.revision_por_sistema= ""
           this.antecedentes_personales= ""
           this.ninez= ""
           this.adolecencia= ""
           this.adultez= ""
           this.habitos_toxicos= ""
           this.cafe= false
           this.alcohol=false
           this.tizana= false
           this.antecedentes_ginocoobterico= ""
           this.antecedentes_familiares= ""
           this.hta= ""
           this.tbp= ""
           this.hc= ""
           this.er= ""
           this.ca= ""
           this.examen_fisico= "" 
           this.ta=   ""
           this.fc=   ""
           this.fr=   ""
           this.fo=   ""
           this.cabeza=  ""
           this.cuello=    ""
           this.torax=   ""
           this.corazon=   ""
           this.purmones=  ""
           this.abdomen=   ""
           this.extremidades= ""
           this.ge=  ""
           this.tr=  ""
           this.ekg= ""
           this.analitica= ""
           this.rx_torax=  ""
           this.otros=  ""
           this.dx= ""
           this.tx= ""
           this.record= ""
           this.peso=0
           this.temperatura=0
           this.observacion=''
           this.historialclinico=''
   
        
        }

     public Getcuenta(): Observable<number> {
        return this.http.get<number>(this.Url + 'Paciente_Consulta/cuenta');
      }
      public Getcuentafiltro(texto:string): Observable<number> {
        return this.http.get<number>(this.Url + `Paciente_Consulta/cuentafiltro?filtro=${texto}`);
      }
      public Get(): Observable<Consultas[]> {
        return this.http.get<Consultas[]>(this.Url + 'Paciente_Consulta');
      }
      public InsertConsulta(): Observable<Consultas> {
        // var headers = new HttpHeaders({
        //   'Content-Type': 'application/json; charset=utf-8'
        // });
        var headers = this.headers
        return this.http.post<Consultas>(this.Url + 'Paciente_Consulta', JSON.stringify(this), { headers } );
      }
      public UpdateConsulta(){
        // var headers = new HttpHeaders({
        //   'Content-Type': 'application/json; charset=utf-8'
        // });
        var headers = this.headers
        return this.http.put(this.Url + `Paciente_Consulta/${this.id}`, JSON.stringify(this), { headers });
      } 

      grabar(){
        if(this.id==0){
          //agregar
          this.InsertConsulta().subscribe(data =>{
            this.id=data.id;
            this.datos.showMessage("Grabado con exito","Actualizar","success");
          },(error) => {
            this.datos.showMessage("Error: " + error.message,"Error","Error");
          }
          )
        }else{
          //modificar
          this.UpdateConsulta().subscribe(rep=>{
            this.datos.showMessage("Actualiza con exito","Actualizar","success");
          })
        }
      }  

}
