import {  HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AgendaConsultorio, AgendaConsultoriodetalle, AgendaConsultoriodts, 
         AuthRequest, Barrios, Consultas, Consultasdts, Consultorio, Doctor, 
         Doctordts, Documento, Especialidades, Lturno, Menu, Paciente, PacientePersona, 
         Parentesco, Persona, Personaparentesco, Personaparentescodts, Response, Roles, 
         RolesMenu, Status, Tanda, Turno, TurnoDTS, User, UserDTS, Usuario } from '../Interfaces/interfaces';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DatosService {


 
 
  //public Url: String = "http://192.168.0.10:9095/api/";
  public url_root:string = "https://localhost:5001/"
  //public url_root:string = "http://rhayalcantara-001-site2.ftempurl.com/"
   public Url: string = this.url_root+"api/";
  // public Url: string = "http://rhayalcantara-001-site2.ftempurl.com/api/";
    public get urlserver(): string {
      return this.url_root;
    } 
  private usuarioSubject:BehaviorSubject<Usuario>;

  public usuario : Observable<Usuario>;
  public get usuarioData(): Usuario {
    return this.usuarioSubject.value;
  }
  
  
  constructor(
     private http: HttpClient,
    private toastr: MatDialog
    //,
   
  ) {
    
    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')|| '{}'));
    this.usuario = this.usuarioSubject.asObservable();
  }

  public showMessage(message: string, title: any, messageType: string) {
    switch (messageType) {
      case 'success':

        Swal.fire({
          title: title,
          text: message,
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        break;
       case 'info':
      
      
         Swal.fire({
          title: title,
          text: message,
          icon: 'info',
          confirmButtonText: 'ok'
        })
         break;
       case 'error':
     //    this.toastr.error(message, title);
          Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            confirmButtonText: 'ok'
          })
              break;
       case 'warning':
     //    this.toastr.warning(message, title);
        Swal.fire({
          title: title,
          text: message,
          icon: 'warning',
          confirmButtonText: 'ok'
        })
        break;
    }
   }




   // Menues 
   public GetRolesMenu(id: number): Observable<RolesMenu[]> {
    
    return this.http.get<RolesMenu[]>(this.Url + `menurols/menuidstring?rolesid=${id}`);
  }

  public GetMenu(menues: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.Url + `menus/m?menues=${menues}`);
  }

  //Users

  public GetUsersDTS(): Observable<UserDTS[]> {
    return this.http.get<UserDTS[]>(this.Url + 'Users/UserDTS');
  }
  public GetUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.Url + 'Users');
  }  
  public GetUser(id:string): Observable<User> {
    return this.http.get<User>(this.Url + `Users/${id}`);
  }  
  public GetUsername(username:string): Observable<UserDTS> {
    return this.http.get<UserDTS>(this.Url + `Users/UserDTSName?name=${username}`);
  }  

  
  public GetUserlogin(authRequest:AuthRequest): Observable<Response> {
   
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.post<Response>(this.Url + `Users/login`,JSON.stringify(authRequest), { headers })
    .pipe(
      map((res: Response) =>{
        console.log('regreso')
          if (res.exito === 1){
            const usuario: Usuario = res.data;
            localStorage.setItem('usuario',JSON.stringify(usuario));
            this.usuarioSubject.next(usuario);
          }
          return res;
      })
    )
    ;
  }  

  logout(){
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null!);
  }

  public insertuser(obj:User):Observable<User>{
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    
    return this.http.post<User>(this.Url + 'Users', JSON.stringify(obj), { headers } ); 
  }

  public Updateuser(obj: User){
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.put(this.Url + `Users/${obj.id}`, JSON.stringify(obj), { headers });
  }
  
//Roles
public GetRoles(): Observable<Roles[]> {
  return this.http.get<Roles[]>(this.Url + 'Roles');
}

public insertRoles(obj:Roles):Observable<Roles>{
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });
 
  return this.http.post<Roles>(this.Url + 'Roles', JSON.stringify(obj), { headers } ); 
}
public UpdateRoles(obj: Roles){
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  return this.http.put(this.Url + `Roles/${obj.id}`, JSON.stringify(obj), { headers });
} 

//Agenda Consultorios
public GetAgendaConsultorioCount(): Observable<number> {
  return this.http.get<number>(this.Url + 'Agenda_Consultorio/cuenta');
}
public GetAgendaConsultorioCountfiltro(texto:string): Observable<number> {
  return this.http.get<number>(this.Url + `Agenda_Consultorio/cuentafiltro?filtro=${texto}`);
}
public GetAgendaConsultorios(page:number): Observable<AgendaConsultoriodts[]> {
  return this.http.get<AgendaConsultoriodts[]>(this.Url + `Agenda_Consultorio?page=${page}&pagesize=5`);
}
public GetAgendaConsultoriofiltro(page:number,texto:string): Observable<AgendaConsultoriodts[]> {
  return this.http.get<AgendaConsultoriodts[]>(this.Url + `Agenda_Consultorio/filtro?page=${page}&pagesize=5&filtro=${texto}`);
}

public GetAgendaConsultorio(id:number):Observable<AgendaConsultoriodts>{
  return this.http.get<AgendaConsultoriodts>(this.Url + `Agenda_Consultorio/${id}`);
} 

public insertAgendaConsultorio(obj:AgendaConsultorio):Observable<AgendaConsultorio>{
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });
  
  return this.http.post<AgendaConsultorio>(this.Url + 'Agenda_Consultorio', JSON.stringify(obj), { headers } ); 
}
public UpdateAgendaConsultorio(obj: AgendaConsultorio){
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  return this.http.put(this.Url + `Agenda_Consultorio/${obj.id}`, JSON.stringify(obj), { headers });
} 

public GetAgendaConsultorioDetalles(id:number):Observable<AgendaConsultoriodetalle[]>{
  return this.http.get<AgendaConsultoriodetalle[]>(this.Url + `Detalle_Agenda_Consultorio_Tandas/agenda?agendac=${id}`);
} 

public insertAgendaConsultorioDetalle(obj:AgendaConsultoriodetalle):Observable<AgendaConsultoriodetalle>{
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });
  return this.http.post<AgendaConsultoriodetalle>(this.Url + 'Detalle_Agenda_Consultorio_Tandas', JSON.stringify(obj), { headers } );
}
public UpdateAgendaConsultorioDetalle(obj: AgendaConsultoriodetalle){
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  return this.http.put(this.Url + `Detalle_Agenda_Consultorio_Tandas/${obj.id}`, JSON.stringify(obj), { headers });
} 
//Turnos

public GetLTurnos(fecha:string): Observable<Lturno[]> {
  
  return this.http.get<Lturno[]>(this.Url + `Turnos/lturnos?fecha=${fecha}`);
}
public GetLPTurnos(fecha:string,acid:number): Observable<TurnoDTS[]> {
  
  return this.http.get<TurnoDTS[]>(this.Url + `Turnos/lpturnos?fecha=${fecha}&acid=${acid}`);
}
public GetLPTurnoscaja(fecha:string): Observable<TurnoDTS[]> {
  
  return this.http.get<TurnoDTS[]>(this.Url + `Turnos/lpturnoscaja?fecha=${fecha}`);
}
public GetTurno(id:string): Observable<Turno> {
  return this.http.get<Turno>(this.Url + `Turnos/${id}`);
}

public insertTurno(obj:Turno):Observable<Turno>{
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });
  return this.http.post<Turno>(this.Url + 'turnos', JSON.stringify(obj), { headers } );

}
public UpdateTurno(obj: Turno){
  
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  return this.http.put(this.Url + `Turnos/${obj.id}`, JSON.stringify(obj), { headers });
}  

//Archivos 
public Uploadfile(file: File,cod:number,identificador:string): Observable<HttpEvent<any>>{
  const formData: FormData = new FormData();
    formData.append('files', file);
   
    const req = new HttpRequest('POST', this.Url + `Documentos/doc?cod=${cod}&identificador=${identificador}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  public getdocumentofile(id:number){
    return this.http.get(this.Url + `Documentos/files/${id}`, {
      reportProgress: true,
      responseType: 'blob',
  });
      
  }
  
//Documentos
public GetDocumentos(): Observable<Documento[]> {
  return this.http.get<Documento[]>(this.Url + 'Documentos');
}  

public GetDocumentostipo(cod:string,identificador:string): Observable<Documento[]> {
  return this.http.get<Documento[]>(this.Url + `Documentos/tipo?cod=${cod}&identificador=${identificador}`);
}  
public DeleteDocumentos(obj: Documento): Observable<Documento> {
 return this.http.delete<Documento>(this.Url + `Documentos/${obj.id}`);

}



//Tandas
public GetTandas(): Observable<Tanda[]> {
  return this.http.get<Tanda[]>(this.Url + 'Tandas');
}
public GetTanda(id:number):Observable<Tanda>{
  return this.http.get<Tanda>(this.Url + `Tandas/${id}`);
}
public InsertTandas(obj: Tanda): Observable<Tanda> {
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });
  
  return this.http.post<Tanda>(this.Url + 'Tandas', JSON.stringify(obj), { headers } );
 
}
public UpdateTandas(obj: Tanda){
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  return this.http.put(this.Url + `Tandas/${obj.id}`, JSON.stringify(obj), { headers });
}  

//Consultorios
public GetConsultorios(): Observable<Consultorio[]> {
  return this.http.get<Consultorio[]>(this.Url + 'consultorios');
}
public InsertConsultorio(obj: Consultorio): Observable<Consultorio> {
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });
  
   return this.http.post<Consultorio>(this.Url + 'Consultorios', JSON.stringify(obj), { headers } );
}

public UpdateConsultorio(obj: Consultorio){
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  return this.http.put(this.Url + `Consultorios/${obj.id}`, JSON.stringify(obj), { headers });
}

//Consultas
public GetConsultascuenta(): Observable<number> {
  return this.http.get<number>(this.Url + 'Paciente_Consulta/cuenta');
}
public GetConsultascuentafiltro(texto:string): Observable<number> {
  return this.http.get<number>(this.Url + `Paciente_Consulta/cuentafiltro?filtro=${texto}`);
}
public GetConsultasdts(page:number,pagesize:number): Observable<Consultasdts[]> {
  return this.http.get<Consultasdts[]>(this.Url + `Paciente_Consulta/dts?page=${page}&pagesize=${pagesize}`);
}
public GetConsultasdtsfiltro(page:number,pagesize:number,texto:string): Observable<Consultasdts[]> {
  return this.http.get<Consultasdts[]>(this.Url + `Paciente_Consulta/filtro?page=${page}&pagesize=${pagesize}&filtro=${texto}`);
}
public GetConsultas(): Observable<Consultas[]> {
  return this.http.get<Consultas[]>(this.Url + 'Paciente_Consulta');
}
public InsertConsulta(obj: Consultas): Observable<Consultas> {
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  return this.http.post<Consultas>(this.Url + 'Paciente_Consulta', JSON.stringify(obj), { headers } );
}
public UpdateConsulta(obj: Consultas){
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  return this.http.put(this.Url + `Paciente_Consulta/${obj.id}`, JSON.stringify(obj), { headers });
}

//doctores
public GetDoctorescount(): Observable<number> {
  return this.http.get<number>(this.Url + `doctors/cuenta`);
}
public GetDoctorescountfiltro(filtro: string): Observable<number> {
  return this.http.get<number>(this.Url + `doctors/cuentafiltro?filtro=${filtro}`);
}
public GetDoctores(): Observable<Doctordts[]> {
  return this.http.get<Doctordts[]>(this.Url + `doctors/dts`);
}
public GetDoctoresPaginacion(page: number,pageSize: number): Observable<Doctordts[]> {
  return this.http.get<Doctordts[]>(this.Url + `doctors/dtspaginacion?page=${page}&pageSize=${pageSize}`);
}
public GetDoctoresfiltro(page: number,pageSize: number,filtro:string): Observable<Doctordts[]> {
  return this.http.get<Doctordts[]>(this.Url + `doctors/dtsfiltro?page=${page}&pageSize=${pageSize}&filtro=${filtro}`);
}
public GetDoctor(id:number):Observable<Doctordts>{
  return this.http.get<Doctordts>(this.Url + `doctors/dts/${id}`);
}

public InsertDoctores(obj: Doctor): Observable<Doctor> {
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  return this.http.post<Doctor>(this.Url + 'doctors', JSON.stringify(obj), { headers } );
}

public UpdateDoctor(obj: Doctor){
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  return this.http.put(this.Url + `doctors/${obj.id}`, JSON.stringify(obj), { headers });
}



//especialidades
public Getespecialidades(): Observable<Especialidades[]> {
  return this.http.get<Especialidades[]>(this.Url + 'Especialidads');
}
public Getespecialidad(id:number):Observable<Especialidades>{
  return this.http.get<Especialidades>(this.Url + `Especialidads/${id}`);
}
public Insertespecialidad(obj: Especialidades): Observable<Especialidades> {
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  return this.http.post<Especialidades>(this.Url + 'Especialidads', JSON.stringify(obj), { headers } );
}

public Updateespecialidad(obj: Especialidades){
  var headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  return this.http.put(this.Url + `Especialidads/${obj.id}`, JSON.stringify(obj), { headers });
}

public Deleteespecialidad(obj: Especialidades): Observable<Especialidades> {

  return this.http.delete<Especialidades>(this.Url + `Especialidads/${obj.id}`);
}

    //Parentescodts
     public GetParentescosdts(id: number): Observable<Personaparentescodts[]> {
      return this.http.get<Personaparentescodts[]>(this.Url + `persona_parentescodts/parientes/${id}`);
    }

    //PersonaParentesco
    public InsertPersonaPariente(obj: Personaparentesco): Observable<Personaparentesco> {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      });
  
      return this.http.post<Personaparentesco>(this.Url + 'persona_parentesco', JSON.stringify(obj), { headers } );
    }
    public UpdatePersonaPariente(obj: Personaparentesco){
      var headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      });
  
      return this.http.put(this.Url + `persona_parentesco/${obj.id}`, JSON.stringify(obj), { headers });
    }
   //Parentesco
   public GetParentescos(): Observable<Parentesco[]> {
    return this.http.get<Parentesco[]>(this.Url + 'Parentescoes');
  }
  public GetParentesco(id:number):Observable<Parentesco>{
    return this.http.get<Parentesco>(this.Url + `Parentescoes/${id}`);
  }
  public InsertParentesco(obj: Parentesco): Observable<Parentesco> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    return this.http.post<Parentesco>(this.Url + 'Parentescoes', JSON.stringify(obj), { headers } );
  }

  public UpdateParentesco(obj: Parentesco){
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    return this.http.put(this.Url + `Parentescoes/${obj.id}`, JSON.stringify(obj), { headers });
  }

  public DeleteParentesco(obj: Parentesco): Observable<Parentesco> {

    return this.http.delete<Parentesco>(this.Url + `Parentescoes/${obj.id}`);
  }

    //Personas
    public GetPersonas(rol: string): Observable<Persona[]> {
      
      return this.http.get<Persona[]>(this.Url + rol);
    }
    public GetPersona(id:number):Observable<Persona>{
      return this.http.get<Persona>(this.Url + `personas/${id}`);
    }
    public Insertpersona(obj: Persona): Observable<Persona> {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      });
  
      return this.http.post<Persona>(this.Url + 'personas', JSON.stringify(obj), { headers } );
    }
  
    public Updatepersona(obj: Persona){
      var headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      });
      
      return this.http.put(this.Url + `personas/${obj.id}`, JSON.stringify(obj), { headers });
    }
  
    public Deletepersona(obj: Persona): Observable<Persona> {
  
      return this.http.delete<Persona>(this.Url + `personas/${obj.id}`);
    }

    //Pacientes
    public GetPacientes(): Observable<Paciente[]> {
      return this.http.get<Paciente[]>(this.Url + 'pacientes');
    }
    public GetPaciente(id:number):Observable<Paciente>{
      return this.http.get<Paciente>(this.Url + `Pacientes/${id}`);
    }    
    public Insertpaciente(obj: Paciente): Observable<Paciente> {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      });
  
      return this.http.post<Paciente>(this.Url + 'Pacientes', JSON.stringify(obj), { headers } );
    }    
    public UpdatepPaciente(obj: Paciente){
      var headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      });
  
      return this.http.put(this.Url + `Pacientes/${obj.id}`, JSON.stringify(obj), { headers });
    }
  
    public DeletePaciente(obj: Paciente): Observable<Paciente> {
  
      return this.http.delete<Paciente>(this.Url + `Pacientes/${obj.id}`);
    }

    //PacientePersona

    public GetPacientePersonasCount(): Observable<number> {
      return this.http.get<number>(this.Url + 'PacientePersonas/cuenta');
    }
    public GetPacientePersonasCountfiltro(texto:string): Observable<number> {
      return this.http.get<number>(this.Url + `PacientePersonas/cuentafiltro?filtro=${texto}`);
    }
    public GetPacientePersonas(page:number,pagesize:number): Observable<PacientePersona[]> {
      return this.http.get<PacientePersona[]>(this.Url + `PacientePersonas?page=${page}&pagesize=${pagesize}`);
    }
    public GetPacientePersonasfiltro(page:number,pagesize:number,texto:string): Observable<PacientePersona[]> {
      return this.http.get<PacientePersona[]>(this.Url + `PacientePersonas/filtro?page=${page}&pagesize=${pagesize}&filtro=${texto}`);
    }

    public GetPacientePersona(id:number):Observable<PacientePersona>{
      return this.http.get<PacientePersona>(this.Url + `PacientePersonas/${id}`);
    }  

    //tipo identificacion
    public GetTipoIdentificacion(): Observable<Status[]> {
      return this.http.get<Status[]>(this.Url + 'TipoIdentificacion');
    }
    public GetTipoIdentificacionx(id:string): Observable<Status> {
      return this.http.get<Status>(this.Url + `TipoIdentificacion/${id}`);
    }
  
    public InsertTipoIdentificacion(obj: Status): Observable<Status> {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      });
  
      return this.http.post<Status>(this.Url + 'TipoIdentificacion', JSON.stringify(obj), { headers } );
    }
  
    public UpdateTipoIdentificacion(obj: Status){
      var headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      });
  
      return this.http.put(this.Url + `TipoIdentificacion/${obj.id}`, JSON.stringify(obj), { headers });
    }
  
    public DeleteTipoIdentificacion(obj: Status): Observable<Status> {
  
      return this.http.delete<Status>(this.Url + `TipoIdentificacion/${obj.id}`);
    }
  

    //status
  public GetStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(this.Url + 'status');
  }
  public GetStatu(id:number): Observable<Status> {
    return this.http.get<Status>(this.Url + `status/${id}`);
  }
  public Insertstatus(obj: Status): Observable<Status> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    return this.http.post<Status>(this.Url + 'status', JSON.stringify(obj), { headers } );
  }

  public Updatestatus(obj: Status){
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    return this.http.put(this.Url + `status/${obj.id}`, JSON.stringify(obj), { headers });
  }

  public Deletestatus(obj: Status): Observable<Status> {

    return this.http.delete<Status>(this.Url + `status/${obj.id}`);
  }

  //Barrios
  public GetBarrios(): Observable<Barrios[]> {
    return this.http.get<Barrios[]>(this.Url + 'Barrios');
  }


}