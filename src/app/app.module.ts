import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { LoginComponent } from './Components/login/login.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './Pages/home/home.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { ErrorInterceptor } from './security/error.interceptor';
import { DatosService } from './Services/datos.service';
import { ParentescosComponent } from './Pages/parentescos/parentescos.component';
import { ListaturnosComponent } from './Components/listaturnos/listaturnos.component';
import { FormUserComponent } from './Components/form-user/form-user.component';
import { FormRolComponent } from './Components/form-rol/form-rol.component';
import { ListusersComponent } from './Components/listusers/listusers.component';
import { ListrolesComponent } from './Components/listroles/listroles.component';
import { ListconsultadoctorComponent } from './Components/listconsultadoctor/listconsultadoctor.component';
import { ListcajaComponent } from './Components/listcaja/listcaja.component';
import { FormCobroConsultaComponent } from './Components/form-cobro-consulta/form-cobro-consulta.component';
import { ListaturnostvComponent } from './Components/listaturnostv/listaturnostv.component';
import { ListaturnospacientesComponent } from './Components/listaturnospacientes/listaturnospacientes.component';
import { GturnosComponent } from './Components/gturnos/gturnos.component';
import { FormDetalleTandaConsultorioComponent } from './Components/form-detalle-tanda-consultorio/form-detalle-tanda-consultorio.component';
import { ListAgendaConsultoriodetalleddComponent } from './Components/list-agenda-consultoriodetalledd/list-agenda-consultoriodetalledd.component';
import { ListAgendaConsultorioComponent } from './Components/list-agenda-consultorio/list-agenda-consultorio.component';
import { FormAgendaConsultorioComponent } from './Components/form-agenda-consultorio/form-agenda-consultorio.component';
import { ListdocComponent } from './Components/listdoc/listdoc.component';
import { TipoIdentificacionComponent } from './Pages/tipo-identificacion/tipo-identificacion.component';
import { FormTandaComponent } from './Components/form-tanda/form-tanda.component';
import { TandaComponent } from './Pages/tanda/tanda.component';
import { FormConsultorioComponent } from './Components/form-consultorio/form-consultorio.component';
import { ListConsultoriosComponent } from './Components/list-consultorios/list-consultorios.component';
import { ConsultoriosComponent } from './Pages/consultorios/consultorios.component';
import { BuscardoctoresComponent } from './Components/buscardoctores/buscardoctores.component';
import { BuscarpacientesComponent } from './Components/buscarpacientes/buscarpacientes.component';
import { FormpacientesComponent } from './Components/formpacientes/formpacientes.component';
import { FormespecialidadComponent } from './Components/formespecialidad/formespecialidad.component';
import { ExpecialidadesComponent } from './Pages/expecialidades/expecialidades.component';
import { DoctoresComponent } from './Pages/doctores/doctores.component';
import { FormpersonaparentescoComponent } from './Components/formpersonaparentesco/formpersonaparentesco.component';
import { FormparentescoComponent } from './Components/formparentesco/formparentesco.component';
import { PacientePersonaComponent } from './Pages/paciente-persona/paciente-persona.component';
import { FormpersonaComponent } from './Components/formpersona/formpersona.component';
import { BuscarpersonaComponent } from './Components/buscarpersona/buscarpersona.component';
import { EspedienteComponent } from './Pages/espediente/espediente.component';
import { FormularioConsultaComponent } from './Components/formulario-consulta/formulario-consulta.component';
import { PacientesConsultasComponent } from './Pages/pacientes-consultas/pacientes-consultas.component';
import { FormulariopersonaComponent } from './Components/formulariopersona/formulariopersona.component';
import { StatusComponent } from './Pages/status/status.component';
import { LpersonasComponent } from './Pages/personas/lpersonas.component';
import { SearchFilterPipe } from './Pipes/search-filter.pipe';
import { LTurnosComponent } from './Pages/lturnos/lturnos.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavMenuComponent,
    HomeComponent,
    ParentescosComponent,
    LpersonasComponent,
    StatusComponent,
    FormulariopersonaComponent,
    PacientesConsultasComponent,
    FormularioConsultaComponent,
    EspedienteComponent,
    BuscarpersonaComponent,
    FormpersonaComponent,
    PacientePersonaComponent,
    FormparentescoComponent,
    FormpersonaparentescoComponent,
    DoctoresComponent,
    ExpecialidadesComponent,
    FormespecialidadComponent,
    FormpacientesComponent,
    BuscarpacientesComponent,
    BuscardoctoresComponent,
    ConsultoriosComponent,
    ListConsultoriosComponent,
    FormConsultorioComponent,
    TandaComponent,
    FormTandaComponent,
    TipoIdentificacionComponent,
    ListdocComponent,
    FormAgendaConsultorioComponent,
    ListAgendaConsultorioComponent,
    ListAgendaConsultoriodetalleddComponent,
    FormDetalleTandaConsultorioComponent,
    GturnosComponent,    
    ListaturnostvComponent,
    FormCobroConsultaComponent,
    ListcajaComponent,
    ListconsultadoctorComponent,
    ListrolesComponent,
    ListusersComponent,
    FormRolComponent,
    FormUserComponent,
    ListaturnosComponent,
    ListaturnospacientesComponent,
    SearchFilterPipe,
    LoginComponent,
    LTurnosComponent
  ],
  entryComponents:[LoginComponent,FormularioConsultaComponent,
    BuscarpersonaComponent,FormpersonaComponent,
    FormparentescoComponent,FormpersonaparentescoComponent,
    FormespecialidadComponent,FormpacientesComponent,
    BuscarpacientesComponent,BuscardoctoresComponent,
    ListConsultoriosComponent,FormConsultorioComponent,
    FormTandaComponent,FormAgendaConsultorioComponent,
    FormDetalleTandaConsultorioComponent,GturnosComponent,
    ListaturnospacientesComponent,FormCobroConsultaComponent,
    FormRolComponent,FormUserComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule, 
    MatIconModule, 
    MatDividerModule,
    MatDialogModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
 ],
  providers: [  DatosService,NgbModal,
    { provide: HTTP_INTERCEPTORS,useClass: JwtInterceptor,multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
