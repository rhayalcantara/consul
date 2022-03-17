import { EventEmitter, Injectable } from '@angular/core';
import {HubConnection,HubConnectionBuilder} from '@aspnet/signalr';
import { DatosService } from './datos.service';



@Injectable({
  providedIn: 'root'
})
export class SignalrcustomService {
  public Urlsignalr: string = "";
  //public Urlsignalr: String = "http://localhost/webapiclinica/cnn";
  public emNotifica:EventEmitter<string> = new EventEmitter();
  public exNotifica:EventEmitter<string> = new EventEmitter();
  public hubConnection:HubConnection;
  //public hubConnection2:HubConnection;
  constructor(private datos:DatosService) {
    this.Urlsignalr=datos.urlserver+"cnn";
    console.log('Urlsignalr',this.Urlsignalr)
    let  builder = new HubConnectionBuilder();
    this.hubConnection = builder.withUrl(this.Urlsignalr).build();
    this.hubConnection.on("CambioTurno",(mensaje)=>{
      //console.log('Signalr',mensaje);
      this.emNotifica.emit(mensaje);
    });
    
    this.hubConnection.on("Eliminaturno",(mensaje)=>{
      //console.log('Signalr elimina',mensaje);
      this.exNotifica.emit(mensaje);
    });
    
    this.hubConnection.start();
  }
}
