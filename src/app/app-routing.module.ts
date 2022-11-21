import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulariopersonaComponent } from './Components/formulariopersona/formulariopersona.component';
import { ListAgendaConsultorioComponent } from './Components/list-agenda-consultorio/list-agenda-consultorio.component';
import { ListProcedimientosComponent } from './Components/list-procedimientos/list-procedimientos.component';
import { ListaturnospacientesComponent } from './Components/listaturnospacientes/listaturnospacientes.component';
import { ListaturnostvComponent } from './Components/listaturnostv/listaturnostv.component';
import { ListcajaComponent } from './Components/listcaja/listcaja.component';
import { ListconsultadoctorComponent } from './Components/listconsultadoctor/listconsultadoctor.component';
import { ListrolesComponent } from './Components/listroles/listroles.component';
import { ListusersComponent } from './Components/listusers/listusers.component';
import { ConsultoriosComponent } from './Pages/consultorios/consultorios.component';
import { DoctoresComponent } from './Pages/doctores/doctores.component';
import { EspedienteComponent } from './Pages/espediente/espediente.component';
import { ExpecialidadesComponent } from './Pages/expecialidades/expecialidades.component';
import { HomeComponent } from './Pages/home/home.component';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { LTurnosComponent } from './Pages/lturnos/lturnos.component';
import { PacientePersonaComponent } from './Pages/paciente-persona/paciente-persona.component';
import { ParentescosComponent } from './Pages/parentescos/parentescos.component';
import { LpersonasComponent } from './Pages/personas/lpersonas.component';
import { StatusComponent } from './Pages/status/status.component';
import { TandaComponent } from './Pages/tanda/tanda.component';
import { TipoIdentificacionComponent } from './Pages/tipo-identificacion/tipo-identificacion.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [ 
  { path: '', component: InicioComponent,pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent,pathMatch: 'full' },
  { path: 'Persona', component: LpersonasComponent, canActivate: [AuthGuard] },
  { path: 'Paciente', component: PacientePersonaComponent, canActivate: [AuthGuard] },
  { path: 'Status', component: StatusComponent, canActivate: [AuthGuard] },
  { path: 'TipoIdentificacion', component: TipoIdentificacionComponent, canActivate: [AuthGuard] },
  { path: 'fpersona', component: FormulariopersonaComponent, canActivate: [AuthGuard] },
  { path: 'expediente', component: EspedienteComponent, canActivate: [AuthGuard] },
  { path: 'parentescos', component: ParentescosComponent, canActivate: [AuthGuard] },
  { path: 'doctores', component: DoctoresComponent, canActivate: [AuthGuard] },
  { path: 'especialidad', component: ExpecialidadesComponent, canActivate: [AuthGuard] },
  { path: 'Consultorios', component: ConsultoriosComponent, canActivate: [AuthGuard] },
  { path: 'Tandas', component: TandaComponent, canActivate: [AuthGuard]},
  { path: 'ConfiConsultorios', component: ListAgendaConsultorioComponent, canActivate: [AuthGuard] },
  { path: 'Turnos', component: ListaturnostvComponent, canActivate: [AuthGuard] },
  { path: 'Cobro', component: ListcajaComponent, canActivate: [AuthGuard] },
  { path: 'Consultadoc', component: ListconsultadoctorComponent, canActivate: [AuthGuard] },
  { path: 'Roles', component: ListrolesComponent, canActivate: [AuthGuard] },
  { path: 'Users', component: ListusersComponent, canActivate: [AuthGuard] },
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'Lturnos', component: LTurnosComponent, canActivate: [AuthGuard]},
  { path: 'proced', component:ListProcedimientosComponent, canActivate: [AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
