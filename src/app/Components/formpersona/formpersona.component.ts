import { Component, OnInit,Inject  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

import { Doctor, Doctordts, Especialidades, Paciente, Parentesco, Persona, Personaparentesco, Personaparentescodts, Status } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { BuscarpersonaComponent } from '../buscarpersona/buscarpersona.component';

@Component({
  selector: 'app-formpersona',
  templateUrl: './formpersona.component.html',
  styleUrls: ['./formpersona.component.css']
})
export class FormpersonaComponent implements OnInit {

  formGroup: FormGroup;
  persona: Persona=null!;
  pariente:Personaparentescodts=null!;
  doctor:Doctordts=null!;
  paciente:Paciente=null!;
  parestescos:Parentesco[]=[];
  especialidades:Especialidades[]=[];
  tipoidentificaciones:Status[]=[];
  rol:string='Paciente';
  accion:string="Agregar";
  campos:string[]=[];
  constructor(
      @Inject(MAT_DIALOG_DATA) public data:any,
      private dialogRef: MatDialogRef<FormpersonaComponent>,
      private fb: FormBuilder,
      protected datosservices: DatosService,
      private toastr: MatDialog
      
      ) 
      { 
        this.formGroup=this.fb.group({});
      }

  ngOnInit() {
    //llena los tipo de identificaciones
    this.datosservices.GetTipoIdentificacion().subscribe(rep=>{
      this.tipoidentificaciones = rep;
    });
    //inicializa el formgroup
    this.formGroup=this.fb.group({});
    //pasa los datos de la persona que llegaron
    console.log('llego la data',this.data);
    this.rol=this.data.rol;

    switch(this.rol){
      case "Paciente":
        this.paciente= this.data.paciente;
        this.persona = this.data.persona;
        if (this.paciente.record == null){
          this.paciente.record="";
        }
        let newFormControl2: FormControl = new FormControl();      
        newFormControl2.setValue(this.paciente.record);
        this.formGroup.addControl("record", newFormControl2);        
        break;
      case "Pariente":
        this.pariente = this.data.pariente;
        console.log(this.pariente);
        this.persona = this.pariente.pariente;
        let newFormControl: FormControl = new FormControl();      
        newFormControl.setValue(this.pariente.parentescoid);
        this.formGroup.addControl("parentescoid", newFormControl);

        break;
        case "Doctor":
          this.doctor = this.data.doctor;
          this.persona = this.doctor.persona;
          let newFormControlds: FormControl = new FormControl();      
          newFormControlds.setValue(this.data.doctor.especialiadid);
          this.formGroup.addControl("especialiadid", newFormControlds);
          let newFormControld2: FormControl = new FormControl();      
          newFormControld2.setValue(this.data.doctor.fechacreacion);
          this.formGroup.addControl("fechacreacion", newFormControld2);
          break;        
    }
    if (this.persona.id!=0){
      this.accion="Editando "
    }
    //obtiene los parentescos
    this.datosservices.GetParentescos().subscribe(rep=>{
      this.parestescos=rep;
      console.log(rep);
    });
    //obtine las especialidades
    this.datosservices.Getespecialidades().subscribe(rep=>{
      this.especialidades=rep;
    })
    //optiene las propidades del objeto
    this.campos=Object.keys(this.persona);
   
    this.actualizadatodform();

  }
actualizadatodform(){
      //llenar el formgroup con los datos de la persona
      for (let control of this.campos) {
        let newFormControlx: FormControl = new FormControl();   
        if (control!='fecha_nacimiento')   {
          newFormControlx.setValue(this.persona[control as keyof Persona]);
        }else{
          newFormControlx.setValue(new Date(this.persona[control]).toISOString().substr(0, 10))
        }
        
        this.formGroup.addControl(control, newFormControlx);
      }  
}
  grabar(){
    //actualiza la persona con los datos del usuario
    // for (let control of this.campos) {
    //   if (control=='tipo_identificacion'){
    //     this.persona[control] = +this.formGroup.controls[control].value;
    //   }else{
    //     this.persona[control]=this.formGroup.controls[control].value;
    //   }
      
    // }
    this.persona = JSON.parse(JSON.stringify(this.formGroup.value));
    
    
    if (this.formGroup.controls["id"].value == 0){
      //inserta la persona
      this.datosservices.Insertpersona(this.persona).subscribe(rep=>{
        
        this.persona=rep;
        this.casosrol("insert");
      });
    }else{
      //actualiza la persona
      this.datosservices.Updatepersona(this.persona).subscribe(rep=>{        
        this.dialogRef.close(this.persona);
        this.casosrol("update");
      });
    }
  }


casosrol(accion:string){
  console.log('casosrol',this.rol);
  switch (this.rol){
    case "Paciente":
        if (this.paciente.id==0){
          
            //crear el paciente
            let paciente:Paciente={
              id: 0,
              personaid:this.persona.id,          
              fechacreacion: new Date(),
              historial_clinico:"",
              record: this.formGroup.controls["record"].value
            }
            this.datosservices.Insertpaciente(paciente).subscribe(rep =>{
              this.datosservices.showMessage("Grabado","Agregando Paciente","success");
              this.dialogRef.close(rep);
            });    
        }else{
          this.paciente.record = this.formGroup.controls["record"].value;
          console.log("el paciente:",this.paciente)
          
          this.datosservices.UpdatepPaciente(this.paciente).subscribe(rep =>{
            this.datosservices.showMessage("Grabado","Agregando Paciente","success");
            this.dialogRef.close(rep);
          })
          this.datosservices.showMessage("Actualizado","Actualizando Paciente","success")
        }          
      break;
    case "Pariente":
        let p :Personaparentesco={
          id:this.pariente.id,
          personaid:this.pariente.persona.id,
          parentescoid: +this.formGroup.controls['parentescoid'].value,
          personaid_parentesco:this.persona.id
        }        
        console.log(p);
        if (this.pariente.id==0){
          //agregar el pariente

          this.datosservices.InsertPersonaPariente(p).subscribe(rep =>{
            this.datosservices.showMessage("Grabado","Agregando "+this.rol,"success");
            this.dialogRef.close(rep);
          });
        }else{
          this.datosservices.UpdatePersonaPariente(p).subscribe(rep =>{
            this.datosservices.showMessage("Actualizado","Actualizado "+this.rol,"success");
            this.dialogRef.close(rep);
          });
        }
        break;
    case "Doctor":
          let doc:Doctor ={
            id:this.doctor.id,
            personaid:this.persona.id,
            especialiadid:+this.formGroup.controls['especialiadid'].value,
            fechacreacion:new Date(),
            statusid:0
          }
          console.log('casorol',doc);
          if (this.doctor.id==0){
            this.datosservices.InsertDoctores(doc).subscribe(rep=>{
              this.datosservices.showMessage("Grabado","Agregando "+this.rol,"success");
              this.dialogRef.close(rep);
            });
          }else{
            this.datosservices.UpdateDoctor(doc).subscribe(rep=>{
              this.datosservices.showMessage("Actualizado","Actualizado "+this.rol,"success");
              this.dialogRef.close(rep);
            });
          }
    break;
  }
}
buscaexistente(){
  const dialogRef = this.toastr.open(BuscarpersonaComponent,{data:{rol:this.rol}});

  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);     
    this.persona=result;
    for (let control of this.campos) {           
      this.formGroup.controls[control].setValue(result[control]) ;
    }  
  }); 
}
cancelar(){}
}
