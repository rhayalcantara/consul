import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Paciente, PacientePersona, Persona } from 'src/app/interfaces';
import { DatosServices } from 'src/app/service/datos.service';
import { FormpersonaComponent } from '../formpersona/formpersona.component';


@Component({
  selector: 'app-formpacientes',
  templateUrl: './formpacientes.component.html',
  styleUrls: ['./formpacientes.component.css']
})
export class FormpacientesComponent implements OnInit {

  public buscando:boolean=false;
  public pacientepersonas:PacientePersona[];
  public busqueda:boolean=false;
  public textobuscar:string='';
  public paciente:Paciente={
    id: 0,
    personaid:0,          
    fechacreacion: new Date(),
    historial_clinico:""
  };
  private persona:Persona ={
    id:0,
    nombres:"",
    apellidos:"",
    apodo:"",
    fecha_nacimiento:null,
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
  public numeros:string[];
  public totalregistros:number=0;
  public config: any;
  public labels: any;
  public page:number=-1;

  constructor(private dataservice:DatosServices,
    private toastr: MatDialog) { }

  ngOnInit() {
    
    this.getdatos();
    
  }
  onPageChange(event) {

   this.config.currentPage = event;
   this.page = this.config.currentPage-1;
    if (this.buscando){
      this.updatedatosfiltro(this.page,this.textobuscar);
    }else{
      this.updatedatos(this.page);
    }

  }

  getdatos(){
    this.page=0;
    this.dataservice.GetPacientePersonasCount().subscribe(rep=>{
      console.log('total registros',rep);
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
  buscar(event){
    console.log('cambio',event.target.value);
    this.textobuscar=event.target.value;
    if (this.textobuscar==''){
      // si limpia entonces ir a la primera pagina    
      this.getdatos();
    }else{
      // buscan la cantidad de datos encontrados
      this.dataservice.GetPacientePersonasCountfiltro(this.textobuscar).subscribe(rep=>{
        if (rep>0){
          // actualizar cantidad de datos en la paginacion
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

    this.dataservice.GetPacientePersonas(page).subscribe(rep =>{
      console.log('pp',rep);
      this.pacientepersonas = rep;                      
    });  
  }
  updatedatosfiltro(page: number,texto:string){

    this.dataservice.GetPacientePersonasfiltro(page,texto).subscribe(rep =>{
      console.log('filtro respuesta',rep);
      this.pacientepersonas = rep;                      
    });  
  }

  abrilformulario(){
    this.paciente.personaid = this.persona.id;
    const dialogRef = this.toastr.open(FormpersonaComponent,{data:{persona: this.persona, paciente: this.paciente,rol:'Paciente'}}  );
     
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);           
      if (this.buscando){
        this.updatedatosfiltro(this.page,this.textobuscar);
      }else{
        this.updatedatos(this.page);
      }
  });

}
  abrilformularioeditar(paciente:PacientePersona){
    const dialogRef = this.toastr.open(FormpersonaComponent,{data:{persona: paciente.persona,paciente:paciente.persona,rol:'Paciente'}}  );
     
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