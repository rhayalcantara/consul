import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Paciente, PacientePersona, Persona } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { FormpersonaComponent } from '../formpersona/formpersona.component';


@Component({
  selector: 'app-formpacientes',
  templateUrl: './formpacientes.component.html',
  styleUrls: ['./formpacientes.component.css']
})
export class FormpacientesComponent implements OnInit {

  public totalSize: number = 0;
  public pageSize: number = 5;
  public currentPage: number = 0;

  public buscando:boolean=false;
  public pacientepersonas:PacientePersona[]=[];
  public busqueda:boolean=false;
  public textobuscar:string='';
  public paciente:Paciente={
    id: 0,
    personaid:0,          
    fechacreacion: new Date(),
    historial_clinico:"",
    record:""
  };
  public persona:Persona ={
    id:0,
    nombres:"",
    apellidos:"",
    apodo:"",
    fecha_nacimiento:null!,
    lugar_nacimiento:"",
    sexo:"",
    ocupacion:"",
    procedencia:"",
    raza:"",
    numero_identificacion:"",
    tipo_identificacion:5,
    telefono_casa:'',
    celular:''
  };
  public numeros:string[]=[];
  public totalregistros:number=0;
  public config: any;
  public labels: any;
  public page:number=-1;

  constructor(private dataservice:DatosService,
    private toastr: MatDialog) { }

  ngOnInit() {
    
    this.getdatos();
    
  }
  public handlePage(e: any) {
    this.page = e.pageIndex;
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    console.log(
        'handle', this.pageSize);
    if (this.textobuscar!=''){
      this.buscar(this.textobuscar)
    }else{
      this.updatedatos(this.page)
    }
}

  getdatos(){
    this.page=0;
    this.dataservice.GetPacientePersonasCount().subscribe(rep=>{
      this.totalSize=rep
      this.totalregistros =rep;
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
  buscar(event:any){

    this.textobuscar=event.target.value;
    if (this.textobuscar==''){
      // si limpia entonces ir a la primera pagina    
      this.getdatos();
    }else{
      // buscan la cantidad de datos encontrados
      this.dataservice.GetPacientePersonasCountfiltro(this.textobuscar).subscribe(rep=>{
        if (rep>0){
          // actualizar cantidad de datos en la paginacion
          this.totalSize=rep
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
          this.dataservice.showMessage('No se encontro Datos','Busqueda','success')
        }
        
      });
    }
   
  }

  updatedatos(page: number){
    this.currentPage = page;
    this.dataservice.GetPacientePersonas(page,this.pageSize).subscribe(rep =>{

      this.pacientepersonas = rep;                      
    });  
  }
  updatedatosfiltro(page: number,texto:string){
    this.currentPage = page;
    this.dataservice.GetPacientePersonasfiltro(page,this.pageSize,texto).subscribe(rep =>{

      this.pacientepersonas = rep;                      
    });  
  }

  abrilformulario(){
    this.paciente.personaid = this.persona.id;
    const dialogRef = this.toastr.open(FormpersonaComponent,{data:{persona: this.persona, paciente: this.paciente,rol:'Paciente'}}  );
     
    dialogRef.afterClosed().subscribe(result => {
     
      if (this.buscando){
        this.updatedatosfiltro(this.page,this.textobuscar);
      }else{
        this.updatedatos(this.page);
      }
  });

}
  abrilformularioeditar(paciente:PacientePersona){
    const dialogRef = this.toastr.open(FormpersonaComponent,{data:{persona: paciente.persona,paciente:paciente.paciente,rol:'Paciente'}}  );
     
    dialogRef.afterClosed().subscribe(result => {
       
      if (this.buscando){
        this.updatedatosfiltro(this.page,this.textobuscar);
      }else{
        this.updatedatos(this.page);
      }
  });
  }

}