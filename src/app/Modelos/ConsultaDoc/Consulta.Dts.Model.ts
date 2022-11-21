import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  PersonaDoctor_ext, PersonaPaciente_ext } from "src/app/Interfaces/interfaces";
import { DatosService } from "src/app/Services/datos.service";
import { ConsultaModelo } from "./Consulta.model";
@Injectable({
    providedIn: 'root'
})
export class ConsultaDtsModel extends ConsultaModelo{
    doctor_ext:PersonaDoctor_ext
    paciente:PersonaPaciente_ext
    constructor(private _datos:DatosService,
                private  _http: HttpClient){
        super(_datos, _http);
        this.doctor_ext={
            doctor:{   
                id:0,
                personaid:0,
                especialiadid:0,
                fechacreacion:new Date(),
                statusid:0
            },
            especialialidad:{
                id:0,
                descripcion:""
            },
            fechacreacion:new Date(),
            status:{  
                id: 0,
                descripcion: "",
                Identifier: ""
            },
            id: 0,
            nombres: "",
            apellidos: "",
            apodo: "",
            fecha_nacimiento:new  Date,
            lugar_nacimiento: "",
            sexo: "",
            ocupacion: "",
            procedencia: "",
            raza: "",
            numero_identificacion: "",
            tipo_identificacion: 0,
            telefono_casa:"",
            celular:""
        }
        this.paciente={
            id: 0,
            nombres: "",
            apellidos: "",
            apodo: "",
            fecha_nacimiento:new  Date(),
            lugar_nacimiento: "",
            sexo: "",
            ocupacion: "",
            procedencia: "",
            raza: "",
            numero_identificacion: "",
            tipo_identificacion: 0,
            telefono_casa:"",
            celular:"",
            pacienteid: 0,
            fechacreacion: new Date(),
            historial_clinico: ""

        }
    }
}