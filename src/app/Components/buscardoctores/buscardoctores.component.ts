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

  public totalSize: number = 0;
  public pageSize: number = 5;
  public currentPage: number = 0;
  public loading:boolean = false;
  constructor(private toastr: MatDialog,
    private datosservice:DatosService) { }

    ngOnInit() {
      this.loading=true;
      this.getcount();
    }

    public handlePage(e: any) {
 
      this.currentPage = e.pageIndex;
      this.pageSize = e.pageSize;
      this.buscar();

  }
  getcount(){
    this.datosservice.GetDoctorescount().subscribe(rep=>{
      this.totalSize = rep
    });
    this.getdoctores();
  }
  getcountfiltro(){
    this.datosservice.GetDoctorescountfiltro(this.term).subscribe(rep=>{
      this.totalSize = rep
    });
    this.getdoctoresfiltro();
  }
    getdoctores(){
      this.datosservice.GetDoctoresPaginacion(this.currentPage,this.pageSize).subscribe(rep =>{
        this.doctores=rep;   
        this.loading=false;
      });
    }
    getdoctoresfiltro(){
      this.datosservice.GetDoctoresfiltro(this.currentPage,this.pageSize,this.term).subscribe(rep =>{
        this.doctores=rep; 
        this.loading=false;  
      });
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
    buscar(){
      this.currentPage=0;
      this.loading=true;
      if (this.term.length==0){
        this.getcount();
      }else{
        this.getcountfiltro();
      }
    }
}
