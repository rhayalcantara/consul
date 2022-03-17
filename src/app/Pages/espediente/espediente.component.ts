import { core } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormularioConsultaComponent } from 'src/app/Components/formulario-consulta/formulario-consulta.component';
import { Consultas, Consultasdts } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';



@Component({
  selector: 'app-espediente',
  templateUrl: './espediente.component.html',
  styleUrls: ['./espediente.component.css']
})
export class EspedienteComponent implements OnInit {
 
  public totalSize: number = 0;
  public pageSize: number = 5;
  public currentPage: number = 0;

  public consultas: Consultasdts[]=[];
  public consulta:Consultas={
    id: 0,
  pacienteid: 0,
  doctor: 0,
  fecha: null!,
  revision_por_sistema: "",
  antecedentes_personales: "",
  ninez: "",
  adolecencia: "",
  adultez: "",
  habitos_toxicos: "",
  cafe: false,
  alcohol:false,
  tizana: false,
  antecedentes_ginocoobterico: "",
  antecedentes_familiares: "",
  hta: "",
  tbp: "",
  hc: "",
  er: "",
  ca: "",
  examen_fisico: "",  
  ta:   "",
  fc:   "",
  fr:   "",
  fo:   "",
  cabeza:  "",
  cuello:    "",
  torax:   "",
  corazon:   "",
  purmones:  "",
  abdomen:   "",
  extremidades: "",
  ge:  "",
  tr:  "",
  ekg: "",
  analitica: "",
  rx_torax:  "",
  otros:  "",
  dx: "",
  tx: "",
  record: "",
  peso:0,
  temperatura:0
  };
  public formGroup: FormGroup;
  private ignorarExistenCambiosPendientes: boolean = false;
  private modoEdicion: boolean = false;
  //private modalRef
  public config: any={
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };
  public labels: any = {
    previousLabel: "<",
    nextLabel: ">",
    screenReaderPaginationLabel: "paginacion",
    screenReaderPageLabel: "paginacion1",
    screenReaderCurrentLabel: "paginacion2"
  };
  public campos:string[]=[];

  public page:number=0;
  public totalregistros:number=0;
  public buscando:boolean=false;
  public textobuscar:string='';

  constructor(private toastr: MatDialog,
      private tool: DatosService,
      private fb: FormBuilder
    ) {
      this.formGroup = fb.group({});
     }

  ngOnInit() {
    this.getconsultas();
  } 
   handlePage (event:any) {
    //this.config.currentPage = event;
    //this.page= this.config.currentPage-1;
    this.page = event.pageIndex;
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;

    if (this.buscando){
      this.updatedatosfiltro(this.page,this.textobuscar);
    }else{
      this.updatedatos(this.page);
    }
  }
  abrilformulario(){
    console.log('enviando',this.consulta);
    const dialogRef =  this.toastr.open(FormularioConsultaComponent,{width: '70%',
    height: '70%',data:{consulta: this.consulta}} );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);     
      this.getconsultas();
  
    });
  }

  buscar(event:any){
    console.log('cambio',event.target.value);
    this.textobuscar=event.target.value;
    if (this.textobuscar==''){
      // si limpia entonces ir a la primera pagina    
      this.getconsultas();
    }else{
      // buscan la cantidad de datos encontrados
      this.tool.GetConsultascuentafiltro(this.textobuscar).subscribe(rep=>{
        if (rep>0){
          // actualizar cantidad de datos en la paginacion
          this.totalSize = rep;
          this.totalregistros = rep;
          this.config= {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: rep
          };
          this.buscando=true;
          this.page=0;
           // mostrar los datos
          this.updatedatosfiltro(this.page,this.textobuscar);
        }else{
          // si no hay datos mostrar un mensaje
          this.tool.showMessage('No se encontro Datos','Busqueda','info')
        }
        
      });
    }
   
  }

  getconsultas(){
    this.page=0;
    
    this.tool.GetConsultascuenta().subscribe(rep=>{
      this.totalSize = rep;
      this.totalregistros = rep;
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: rep
      };
      this.labels = {
        previousLabel: "<",
        nextLabel: ">",
        screenReaderPaginationLabel: "paginacion",
        screenReaderPageLabel: "paginacion1",
        screenReaderCurrentLabel: "paginacion2"
      }; 
    });

    this.updatedatos(this.page);
  }

   updatedatos(page:number){
    this.currentPage=this.page;
    this.tool.GetConsultasdts(page,this.pageSize).subscribe(rep=>{
      console.log(rep);
      
      this.consultas = rep;      
    });
   }
   updatedatosfiltro(page:number,texto:string){
     this.currentPage=page;
    this.tool.GetConsultasdtsfiltro(page,this.pageSize,texto).subscribe(rep=>{
      console.log(rep);
      this.consultas = rep;      
    });
   }

  abrirmodaledit(expe: Consultasdts){
    
    this.campos=Object.keys(this.consulta);
    this.consulta=JSON.parse(JSON.stringify(expe));  
    console.log('enviando', this.consulta); 
    
    const dialogRef =  this.toastr.open(FormularioConsultaComponent,{ width: '70%',
    height: '70%',data:{consulta: this.consulta}}  );
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);           
      if (this.buscando){
        this.updatedatosfiltro(this.page,this.textobuscar);
      }else{
        this.updatedatos(this.page);
      }
  });
  }

}
