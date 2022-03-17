import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { FormpersonaComponent } from '../formpersona/formpersona.component';


@Component({
  selector: 'app-buscarpersona',
  templateUrl: './buscarpersona.component.html',
  styleUrls: ['./buscarpersona.component.css']
})
export class BuscarpersonaComponent implements OnInit {
  @Input() rol:string='' ;
  public personas: Persona[]=[];
  public formGroup: FormGroup;
  public config: any;
  public labels: any;
 public term: string = "";
  constructor(protected datosservices: DatosService,
    private dialogRef_local: MatDialogRef <BuscarpersonaComponent >,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private toastr: MatDialog,
    private fb: FormBuilder) { 
      this.formGroup =fb.group({});
    }

  ngOnInit() {
    if (this.rol==''){
      
      this.rol=this.data.rol;
     
    }

    let tipopersona:string ='Personas';
    if (this.rol=='Paciente'){
      tipopersona='Personas/PersonasnoPacientes'
    }
    this.datosservices.GetPersonas(tipopersona).subscribe((rep) => {

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
  }
  onPageChange(event:any) {
    this.config.currentPage = event;
  }
  // abrirmodal(){
  //   let persona:Persona ={
  //     id: 0,
  //     nombres:'',
  //     apellidos: '',
  //     apodo: '',
  //     fecha_nacimiento: null,
  //     lugar_nacimiento: '', 
  //     sexo: '',
  //     ocupacion: '',
  //     procedencia: '', 
  //     raza: '', 
  //     numero_identificacion: '', 
  //     tipo_identificacion: 5 ,
  //     telefono_casa:'',
  //     celular:''

  //   };    
  //   const dialogRef = this.toastr.open(FormpersonaComponent,{data:{persona: persona}})
  //   dialogRef.afterClosed().subscribe(result => {
  
  //     this.dialogRef_local.close(result);
  //   }); 
  
  // }

}
