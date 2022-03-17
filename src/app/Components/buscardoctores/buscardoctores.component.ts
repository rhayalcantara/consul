import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Doctordts } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { FormpersonaComponent } from '../formpersona/formpersona.component';

@Component({
  selector: 'app-buscardoctores',
  templateUrl: './buscardoctores.component.html',
  styleUrls: ['./buscardoctores.component.css']
})
export class BuscardoctoresComponent implements OnInit {
  doctores:Doctordts[]=[];
  public config: any;
  public labels: any;
  public term:string ="";
  constructor(private toastr: MatDialog,
    private datosservice:DatosService) { }

    ngOnInit() {
      this.getdoctores();
    }
    onPageChange(event:any) {
      this.config.currentPage = event;
    }
    getdoctores(){
      this.datosservice.GetDoctores().subscribe(rep =>{
        this.doctores=rep;
        this.config = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.doctores.length
        };
        this.labels = {
          previousLabel: "<",
          nextLabel: ">",
          screenReaderPaginationLabel: "paginacion",
          screenReaderPageLabel: "paginacion1",
          screenReaderCurrentLabel: "paginacion2"
        };        
      })
    }
  
    abrirmodal(){
      let doctor:Doctordts={
        id:0,
        personaid:0,
        especialiadid:0,
        fechacreacion: new Date(),
        statusid:0,
        persona:{
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
        },
        especialidad:{  
          id:0,
          descripcion:'',
        },
        pacientes:[]
      }
      const dialogRef = this.toastr.open(FormpersonaComponent,{data:{doctor: doctor,rol:'Doctor'}});
    
      dialogRef.afterClosed().subscribe(result => {
            
        this.getdoctores();
      }); 
    }
    abrirmodaledit(doctor:Doctordts){
      
      const dialogRef = this.toastr.open(FormpersonaComponent,{data:{doctor: doctor,rol:'Doctor'}});
    
      dialogRef.afterClosed().subscribe(result => {
           
        this.getdoctores();
      }); 
    }

}
