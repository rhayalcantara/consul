import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendaConsultorio, AgendaConsultoriodetalle, AgendaConsultoriodts, Consultorio, Doctordts } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';

@Component({
  selector: 'app-form-agenda-consultorio',
  templateUrl: './form-agenda-consultorio.component.html',
  styleUrls: ['./form-agenda-consultorio.component.css']
})
export class FormAgendaConsultorioComponent implements OnInit {

  formGroup: FormGroup;
  campos:string[]=[];
  consultorios:Consultorio[]=[];
  doctores:Doctordts[]=[];
  agendaconsultorio:AgendaConsultoriodts={
    id:0,
    consultorio_id:0,
    doctor:0,
    consultorio: null!,
    doctordts: null!
  }
  public AgendaConsultoriodetalle:AgendaConsultoriodetalle[]=[];
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private datos:DatosService,
              private dialogRef: MatDialogRef<FormAgendaConsultorioComponent>,
              private fb: FormBuilder) { 
                this.formGroup=fb.group({});
              }

  ngOnInit() {
    this.getconsultorios();
    this.getdoctores();
   // this.agendaconsultorio = this.data.agendaconsultorio;
    this.AgendaConsultoriodetalle = this.data.agendaconsultoriodetalle;

    this.campos=Object.keys(this.data.agendaconsultorio);
      //inicializa el formgroup
      this.formGroup=this.fb.group({});
      //llenar el formgroup con los datos del consultorio
      for (let control of this.campos) {
        let newFormControl: FormControl = new FormControl();      
        newFormControl.setValue(this.data.agendaconsultorio[control]);
        this.formGroup.addControl(control, newFormControl);
      }     
  }

  getconsultorios(){
    this.datos.GetConsultorios().subscribe(rep=>{
      this.consultorios=rep;
    })
  }
  getdoctores(){
    this.datos.GetDoctores().subscribe(rep=>{
      this.doctores = rep;
    });
  }

  grabar(){

    // for (let control of this.campos) {
    //   this.agendaconsultorio[control] = this.formGroup.controls[control].value
    //   }  
    //   let age:AgendaConsultorio = {
    //     id:+this.agendaconsultorio.id,
    //     consultorio_id:+this.agendaconsultorio.consultorio_id,
    //     doctor:+this.agendaconsultorio.doctor
    //   }
      this.agendaconsultorio=JSON.parse(JSON.stringify(this.agendaconsultorio));

    if (this.agendaconsultorio.id==0){
      //agregar
       
        this.datos.insertAgendaConsultorio(this.agendaconsultorio).subscribe(rep=>{
          let ag:AgendaConsultorio=rep;
          let td:number = this.AgendaConsultoriodetalle.length;
          let nt:number =0;
          for (let acd of this.AgendaConsultoriodetalle){
            acd.agenda_consultorioid = ag.id;

            this.datos.insertAgendaConsultorioDetalle(acd).subscribe(reps=>{
                //grabado
                nt++;
                if (td=nt){
                  this.dialogRef.close(rep);
                }
            });
          }

        });

    }else{
      //editar
      this.datos.UpdateAgendaConsultorio(this.agendaconsultorio).subscribe(rep=>{
        
        let td:number = this.AgendaConsultoriodetalle.length;
        let nt:number =0;
        for (let acd of this.AgendaConsultoriodetalle){
          acd.agenda_consultorioid = this.agendaconsultorio.id;

          this.datos.UpdateAgendaConsultorioDetalle(acd).subscribe(reps=>{
              //grabado
              
              nt++;

              if (td==nt){
                this.dialogRef.close(this.agendaconsultorio);
              }
          });
        }
      });
    }
  }
  onChange(n:any){

  }
  onChangeDoctores(n:any){

  }
  cancelar(){
    this.dialogRef.close("");
  }
}
