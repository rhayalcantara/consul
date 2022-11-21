import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Doctor, Doctordts, Paciente, PacientePersona } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { HelperService } from 'src/app/Services/HelpService';
import { BuscardoctoresComponent } from '../buscardoctores/buscardoctores.component';
import { BuscarpacientesComponent } from '../buscarpacientes/buscarpacientes.component';

@Component({
  selector: 'app-docpac',
  templateUrl: './docpac.component.html',
  styleUrls: ['./docpac.component.css']
})
export class DocpacComponent implements OnInit {
  @Input() paciente:PacientePersona;
  @Input() doctor:Doctordts;
  @Output() newItemEvent_Paciente = new EventEmitter<PacientePersona>();
  @Output() newItemEvent_Doctor = new EventEmitter<Doctordts>();
  formGroup : FormGroup;
  constructor(private toastr: MatDialog,
              private fb: FormBuilder,
              private datos: DatosService,
              private helper: HelperService) 
              { 
                this.formGroup= this.fb.group({});

                let nombres: FormControl = new FormControl();   
                let apellidos: FormControl = new FormControl();  
                let numero_identificacion: FormControl = new FormControl();   
                let sexo: FormControl = new FormControl();
                let nacionalidad: FormControl = new FormControl();
                
                let doctorid: FormControl = new FormControl();
                let nombresdoc: FormControl = new FormControl();   
                let apellidosdoc: FormControl = new FormControl();  
                let area: FormControl = new FormControl(); 
              
                
                this.formGroup.addControl('nombres', nombres);
                this.formGroup.addControl('apellidos',apellidos);
                this.formGroup.addControl('numero_identificacion', numero_identificacion);
                this.formGroup.addControl('sexo', sexo);
                this.formGroup.addControl('nacionalidad', nacionalidad);
                
                this.formGroup.addControl('doctorid',doctorid);
                this.formGroup.addControl('nombresdoc', nombresdoc);
                this.formGroup.addControl('apellidosdoc', apellidosdoc);
                this.formGroup.addControl('area', area);    
                            
                this.helper.customMessageDoctor.subscribe ({
                  next:(msg_doctor:Doctordts)=>{

                      this.doctor=msg_doctor;                      
                      this.actualizadatosdoctor();
                  }
                });
                this.helper.customMessagePaciente.subscribe({
                  next:(msg:PacientePersona)=>{
                    this.paciente=msg;
                    this.actualizadatospaciente();
                  }
                })
                
              }

  ngOnInit(): void {
     


  }
  abribusquedapaciente(){
    const dialogRef = this.toastr.open(BuscarpacientesComponent,{width:"70%" ,height:"80%" ,data:""});
    dialogRef.afterClosed().subscribe((result:PacientePersona) => {
      this.paciente =   result;
      this.newItemEvent_Paciente.emit(this.paciente);
      this.actualizadatospaciente();
    });
  }

  actualizadatosdoctor(){
    //doctor
    this.formGroup.controls['doctorid'].setValue(this.doctor.id);
    this.formGroup.controls['nombresdoc'].setValue(this.doctor.persona.nombres);
    this.formGroup.controls['apellidosdoc'].setValue(this.doctor.persona.nombres);
    this.formGroup.controls['area'].setValue(this.doctor.especialidad.descripcion);
    
  }
  actualizadatospaciente(){
    //paciente
    this.formGroup.controls["nombres"].setValue(this.paciente.persona.nombres);
    this.formGroup.controls["apellidos"].setValue(this.paciente.persona.apellidos);
    this.formGroup.controls["numero_identificacion"].setValue(this.paciente.persona.numero_identificacion);
    this.formGroup.controls['sexo'].setValue(this.paciente.persona.sexo);
    this.formGroup.controls['nacionalidad'].setValue(this.paciente.persona.lugar_nacimiento)

  }
  abribusquedadoctores(){

    const dialogRef = this.toastr.open(BuscardoctoresComponent,{width:"70%" ,height:"80%" ,data:""})
    dialogRef.afterClosed().subscribe((result:Doctordts) => {
      this.doctor =   result;
      this.newItemEvent_Doctor.emit(this.doctor);
      this.actualizadatosdoctor();
    });
   
  }

}
