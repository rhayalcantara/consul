import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { DatosService } from 'src/app/Services/datos.service';
import {Persona} from '../../Interfaces/interfaces';

export class PersonaModel  {

    public persona:Persona
    public estado:string ="";
    constructor(private datos:DatosService){
        this.persona={
            id: 0,
            nombres:"",
            apellidos: "",
            apodo: "",
            fecha_nacimiento: null!,
            lugar_nacimiento: "",
            sexo: "",
            ocupacion: "",
            procedencia: "",
            raza: "",
            numero_identificacion: "",
            tipo_identificacion: 0,
            telefono_casa: "",
            celular: "",
            };
        this.estado="iniciado";
    }
    set person(obj:Persona){
        this.person=obj;
        this.estado="Cambios"
    }
    grabar() {
        if (this.persona.id==0){
            //inserta la persona
            this.datos.Insertpersona(this.persona)
            .subscribe((rep)=>{
                this.persona=rep;
                this.estado="Grabado"               
            }),
            (err: string)=>{this.estado = err; };
        }else{
            this.datos.Updatepersona(this.persona).subscribe((rep)=>{
                this.persona = rep;               
            }),
            (err: string)=>{this.estado = err };
        }
    }
    getPersonbyid(id: number):Observable<Persona>{        
        return this.datos.GetPersona(id);
    }

}