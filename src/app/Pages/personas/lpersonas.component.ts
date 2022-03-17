import { Component,  OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Persona } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';



@Component({
  selector: 'lpersonas',
  templateUrl: './lpersonas.component.html'
})
export class LpersonasComponent implements OnInit {

  public personas: Persona[]=[];
  public formGroup: FormGroup;
  private ignorarExistenCambiosPendientes: boolean = false;
  private modoEdicion: boolean = false;  
  public config: any;
  public labels: any;
  private modalRef : NgbModalRef=null!;
  public term:string ="";
  constructor(protected datosservices: DatosService,
    
    private modal: NgbModal,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal) {
      this.formGroup =fb.group({});
     }
    

    ngOnInit() {
      this.datosservices.GetPersonas('Personas').subscribe((rep) => {
        this.personas = rep;
        this.config = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.personas.length
        };
        this.labels = {
          previousLabel: "<",
          nextLabel: ">",
          screenReaderPaginationLabel: "paginacion",
          screenReaderPageLabel: "paginacion1",
          screenReaderCurrentLabel: "paginacion2"
        };    

      });
      this.formClear();
    }  
    onPageChange(event:any) {
      this.config.currentPage = event;
    }
    botonesopciones(event:any){

      if (event=="grabar"){
        this.modalRef.close();
        this.save(); this.formClear();
      }
      if (event=="cancelar"){
        this.modalRef.close(); this.formClear();
      }
    }

    abrirmodal(content:any):void{
      this.formClear();
      this.modalRef = this.modal.open(content,{ size: 'lg', backdrop: 'static' });
    }
    abrirmodaledit(content:any,obj:Persona){
      this.edit(obj);
      this.modalRef = this.modal.open(content,{ size: 'lg', backdrop: 'static' });
    }
    formClear() {
      this.modoEdicion=false;
      this.formGroup = this.fb.group({
        id: new FormControl(0),
        nombres: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        apellidos: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        apodo: new FormControl('', [Validators.maxLength(50)]),
        fecha_nacimiento: new FormControl(''),
        lugar_nacimiento: new FormControl('', [Validators.maxLength(50)]),
        sexo: new FormControl('', [Validators.required, Validators.maxLength(1)]),
        ocupacion: new FormControl(''),
        procedencia: new FormControl('', [Validators.maxLength(50)]),
        raza: new FormControl('', [Validators.maxLength(50)]),
        numero_identificacion: new FormControl('', [Validators.maxLength(19)]),
        tipo_identificacion: new FormControl(0)                           
      });
    }
  
    insert(obj:Persona) {
      this.datosservices.Insertpersona(obj).subscribe(rep => {
        obj = rep;
        this.datosservices.GetPersonas('Personas').subscribe((rep) => {
          this.personas = rep;
        });
        console.log("llego datos en update", rep);
        this.datosservices.showMessage('Grabado Exitosamente', 'Insert Persona', 'success');
      },
        error => {
          //this.datosservices.showMessage(error.message, 'Insert Status', 'error');
        });
    }
  
    update(obj: Persona) {
      console.log("entro en update");
      this.datosservices.Updatepersona(obj).subscribe(rep => {
        this.datosservices.GetPersonas('Personas').subscribe((rep) => {
          this.personas = rep;
        });
        console.log("llego datos en update", rep);
        this.datosservices.showMessage('Grabado Exitosamente', 'Update Persona', 'success');
      },
        error => {
          //this.datosservices.showMessage(error.message, 'Update Status', 'error');
        });
    }
  
    save() {
      this.ignorarExistenCambiosPendientes = true;
  
     
      const formValue: any = Object.assign({}, this.formGroup.value);
  
      const statu: Persona = {
        id: formValue.id,
        nombres: formValue.nombres,
        apellidos:formValue.apellidos,
        apodo:formValue.apodo,
        fecha_nacimiento:formValue.fecha_nacimiento,
        lugar_nacimiento:formValue.lugar_nacimiento,
        sexo:formValue.sexo,
        ocupacion:formValue.ocupacion,
        procedencia:formValue.procedencia,
        raza:formValue.raza,
        numero_identificacion:formValue.numero_identificacion,
        tipo_identificacion:formValue.tipo_identificacion,
        telefono_casa:formValue.telefono_casa,
        celular:formValue.celular
      };
  
      console.log(statu);
      if (!this.modoEdicion) {
        this.insert(statu);
      } else {
        this.update(statu);
      }
      this.modoEdicion = false;
    }
  
    edit(obj: Persona) {
      this.modoEdicion = true

      console.log("editando", new Date(obj.fecha_nacimiento).toISOString().substr(0, 10));
      this.formGroup = this.fb.group({
        id: new FormControl(obj.id),
        nombres: new FormControl(obj.nombres, [Validators.required, Validators.maxLength(50)]),
        apellidos: new FormControl(obj.apellidos, [Validators.required, Validators.maxLength(50)]),
        apodo: new FormControl(obj.apodo, [Validators.maxLength(50)]),
        fecha_nacimiento: new FormControl(new Date(obj.fecha_nacimiento).toISOString().substr(0, 10)),
        lugar_nacimiento: new FormControl(obj.lugar_nacimiento, [Validators.maxLength(50)]),
        sexo: new FormControl(obj.sexo, [Validators.required, Validators.maxLength(1)]),
        ocupacion: new FormControl(obj.ocupacion),
        procedencia: new FormControl(obj.procedencia, [Validators.maxLength(50)]),
        raza: new FormControl(obj.raza, [Validators.maxLength(50)]),
        numero_identificacion: new FormControl(obj.numero_identificacion, [Validators.maxLength(19)]),
        tipo_identificacion: new FormControl(obj.tipo_identificacion)                           
      });
      
    }
  
    delete(obj: Persona) {
      
      console.log("eliminado", obj);
      this.datosservices.Deletepersona(obj).subscribe(rep => {
        console.log("eliminado el objeto", rep);
        this.datosservices.GetPersonas('Personas').subscribe((rep) => {
          this.personas = rep;
        });
      }
      )
  
    }
}
