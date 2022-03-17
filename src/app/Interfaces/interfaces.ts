
export interface AgendaConsultoriodetalle{
    id:number;
    agenda_consultorioid:number;
    diasemana:number;
    tanda_id:number;
    valor:number;
    cnt_max:number;
}

export interface AgendaConsultoriodts {
  consultorio: Consultorio;
  doctordts: Doctordts;
  id: number;
  consultorio_id: number;
  doctor: number;
}

export interface AgendaConsultorio {
  id: number;
  consultorio_id: number;
  doctor: number;
  
}

export interface Persona {
  id: number;
  nombres: string;
  apellidos: string;
  apodo: string;
  fecha_nacimiento: Date;
  lugar_nacimiento: string;
  sexo: string;
  ocupacion: string;
  procedencia: string;
  raza: string;
  numero_identificacion: string;
  tipo_identificacion: number;
  telefono_casa:string;
  celular:string;
}
export interface Status {
  id: number;
  descripcion: string;
  Identifier: string;
}
export interface Barrios {
  id: number;
  region: number;
  provincia: number;
  municipio: number;
  distrito_municipal: number;
  seccion: number;
  sector: number;
  sub_barrio: number;
  toponimia_o_Nombre: string;
}
export interface Consultasdts{
  pacientedts:PacientePersona;
  doctordts:Doctordts;
  id: number;
  pacienteid: number;
  doctor: number;
  fecha: Date;
  revision_por_sistema: String;
  antecedentes_personales: String;
  ninez: String;
  adolecencia: String;
  adultez: String;
  habitos_toxicos: String;
  cafe: Boolean;
  alcohol: Boolean;
  tizana: Boolean;
  antecedentes_ginocoobterico: String;
  antecedentes_familiares: String;
  hta: String;
  tbp: String;
  hc: String;
  er: String;
  ca: String;
  examen_fisico: String;  
  ta:   String;
  fc:   String;
  fr:   String;
  fo:   String;
  cabeza:  String;
  cuello:    String;
  torax:   String;
  corazon:   String;
  purmones:  String;
  abdomen:   String;
  extremidades: String;
  ge:  String;
  tr:  String;
  ekg: String;
  analitica: String;
  rx_torax:  String;
  otros:  String;
  dx: String;
  tx: String;
  record: String;
  peso:number;
  temperatura:number;
}
export interface Consultas{
  id: number;
  pacienteid: number;
  doctor: number;
  fecha: Date;
  revision_por_sistema: String;
  antecedentes_personales: String;
  ninez: String;
  adolecencia: String;
  adultez: String;
  habitos_toxicos: String;
  cafe: Boolean;
  alcohol: Boolean;
  tizana: Boolean;
  antecedentes_ginocoobterico: String;
  antecedentes_familiares: String;
  hta: String;
  tbp: String;
  hc: String;
  er: String;
  ca: String;
  examen_fisico: String;  
  ta:   String;
  fc:   String;
  fr:   String;
  fo:   String;
  cabeza:  String;
  cuello:    String;
  torax:   String;
  corazon:   String;
  purmones:  String;
  abdomen:   String;
  extremidades: String;
  ge:  String;
  tr:  String;
  ekg: String;
  analitica: String;
  rx_torax:  String;
  otros:  String;
  dx: String;
  tx: String;
  record: String;
  peso:number;
  temperatura:number;
}
export interface Expediente{
  consulta: Consultas;
  paciente: Persona;
  doctor: Persona;
}
export interface Paciente{
  id: number;
  personaid: number;
  fechacreacion: Date;
  historial_clinico: string;
}
export interface PacientePersona{
   pacienteid: number;
   personaid: number;
   persona: Persona;
   paciente: Paciente;
   tipoIdentificacion:Status;
   consultas?: Consultas[];
}
export interface Parentesco{
  id:number;
  parentesco:string;
}

export interface Personaparentesco{
  id:number;                       
  personaid:number                
  personaid_parentesco:number    
  parentescoid:number
}

export interface Personaparentescodts{
  id:number;                       
  personaid:number                
  personaid_parentesco:number    
  parentescoid:number
  persona:Persona;
  pariente:Persona;
  parentesco:Parentesco;
}

export interface Especialidades{
  id:number;
  descripcion:string;
}

export interface Doctor{
  id:number;
  personaid:number;
  especialiadid:number;
  fechacreacion: Date;
  statusid:number;
}

export interface Doctordts{
  id:number;
  personaid:number;
  especialiadid:number;
  fechacreacion: Date;
  statusid:number;
  persona:Persona;
  especialidad:Especialidades;
  pacientes:Persona[];
}
export interface  Consultorio{
  id:number;
  descripcion:string;
  status:number;

}
export interface  Tanda{
  id:number;
  descripcion:string;
  status:number;

}
export interface  Documento{
  id:number;
  ruta:string;
  identificador:string;
  codigo:number;
  fechaingreso:Date;
  fechamodica:Date;
  
}
export interface Lturno {
  id:number;
  doctorid:number;
  tandaid:number;
  fecha: Date;
  doctor: string;
  tanda: string;
  numero: number;
}
export interface Turno{
  id:number;
  fecha:Date; 
  agenda_consultorio_id:number;
  tanda:number;
  numero:number;
  paciente_id:number;
  valor:number;
  cobrado:number;
  status:number;
}
export interface TurnoDTS {
  id:number;
  fecha:Date; 
  agenda_consultorio_id:number;
  tanda:number;
  numero:number;
  paciente_id:number;
  valor:number;
  status:number;
  paciente:string; 
  doctor:string;   
  tanddescripcion:string; 
  doctorid:number;        
  statusdescripcion:string;

}

export interface Roles{
    id:number;
    descripcion:string;
    nivel:number;
}

export interface User{
  id: number;
  user: string;
  password :string;
  roleId :number;
  personaId :number;
  email: string;
  phone  : string;
  statusId :number;
}

export interface RolesMenu {
  id: number;
  rolesid: number;
  menuid: number;
}

export interface UserDTS{
  id: number;
  user: string;  
  rol :string;
  persona :string;
  email: string;
  phone  : string;
  status :string;
}

export interface Response{
  exito:number;
  mensaje:string;
  data:Usuario;
}
export interface AuthRequest{
  username:string;
  clave:string;
  
}
export interface Usuario{
  username:string;
  token:string;
  menuhome:number;
  rolesid:number;
  menues:Menu[];
  persona: Persona;
  doctor:Doctor;
  visitas:number;
}
export interface Menu {
  id: number;
  url: string;
  icon: string;
  text: string;
}