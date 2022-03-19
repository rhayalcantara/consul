import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendaConsultoriodetalle, Tanda } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';


@Component({
  selector: 'app-form-detalle-tanda-consultorio',
  templateUrl: './form-detalle-tanda-consultorio.component.html',
  styleUrls: ['./form-detalle-tanda-consultorio.component.css']
})

export class FormDetalleTandaConsultorioComponent implements OnInit {

  formGroup: FormGroup;
  tandas:Tanda[]=[];
  campos:string[]=[];
  dias:string[]=[];
  
  agendaConsultoriodetalle: AgendaConsultoriodetalle={
    id:0,
   agenda_consultorioid:0,
   diasemana:0,
   tanda_id:0,
   valor:0,
   cnt_max:0
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialogRef: MatDialogRef<FormDetalleTandaConsultorioComponent>,
              private datos:DatosService,
              private fb: FormBuilder) { 
                this.formGroup=fb.group({});
              }

  ngOnInit() {
    this.gettandas();


    //pasa los datos de la consultorio que llegaron
    this.agendaConsultoriodetalle = this.data.agendaconsultorio;
    this.dias = this.data.dias;
    //optiene las propidades del objeto
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
  gettandas(){
    this.datos.GetTandas().subscribe(rep=>{
      this.tandas = rep;

    });
  }
  grabar(){
        //actualiza la persona con los datos del usuario
    this.agendaConsultoriodetalle=JSON.parse(JSON.stringify(this.formGroup.value));
      // for (let control of this.campos) {
      //     this.agendaConsultoriodetalle[control]=+this.formGroup.controls[control].value;
      // }


      this.dialogRef.close(this.agendaConsultoriodetalle);
  }  
  cancelar(){}
}
