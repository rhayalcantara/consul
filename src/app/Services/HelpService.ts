import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Doctordts, PacientePersona } from '../Interfaces/interfaces';

@Injectable()
export class HelperService {
  private msg_pacientepersona = new BehaviorSubject<PacientePersona>(
    {
      pacienteid: 0,
      personaid: 0,
      persona: {
        id: 0,
        nombres: '',
        apellidos:'',
        apodo:'',
        fecha_nacimiento:new Date(),
        lugar_nacimiento:'',
        sexo:'',
        ocupacion:'',
        procedencia:'',
        raza:'',
        numero_identificacion:'',
        tipo_identificacion:5,
        telefono_casa:'',
        celular:''
      },
      paciente: null!,
      tipoIdentificacion:{
        id:0,
        descripcion:'',
        Identifier:''
      },
      consultas: []
    }
   );
  public customMessagePaciente = this.msg_pacientepersona.asObservable();
  private msg_doctor = new  BehaviorSubject<Doctordts>(
    {
      id:0,
      personaid:0,
      especialiadid:0,
      fechacreacion: null!,
      statusid:0,
      persona:{
        id: 0,
        nombres: '',
        apellidos:'',
        apodo:'',
        fecha_nacimiento:new Date(),
        lugar_nacimiento:'',
        sexo:'',
        ocupacion:'',
        procedencia:'',
        raza:'',
        numero_identificacion:'',
        tipo_identificacion:5,
        telefono_casa:'',
        celular:''
      },
      especialidad:{
        id: 0,
        descripcion:''
      },
      pacientes:[]
    }
  )
  public customMessageDoctor = this.msg_doctor.asObservable();
  constructor() {}
  public changeMessagePaciente(msg_pacientepersona: PacientePersona): void {
    this.msg_pacientepersona.next(msg_pacientepersona);
  }
  public changeMessageDoctor(msg_doctor:Doctordts){
    this.msg_doctor.next(msg_doctor);
  }
}