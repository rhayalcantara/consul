import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormpersonaComponent } from 'src/app/Components/formpersona/formpersona.component';
import { Doctordts } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';


@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent implements OnInit {

  doctores:Doctordts[]=[];
  public config: any;
  public labels: any;
  public totalSize: number = 0;
  public pageSize: number = 5;
  public currentPage: number = 0;
  constructor(private toastr: MatDialog,
          private datosservice:DatosService) { }
  public term:string ="";
  ngOnInit() {
    this.getdoctores();
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
   
    this.getdoctores()
}

  getdoctores(){
    this.doctores=[];
    this.datosservice.GetDoctores().subscribe(rep =>{
      this.doctores=rep;
      this.totalSize =this.doctores.length;
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
      console.log('The dialog was closed',result);     
      this.getdoctores();
    }); 
  }
  abrirmodaledit(doctor:Doctordts){
    
    const dialogRef = this.toastr.open(FormpersonaComponent,{data:{doctor: doctor,rol:'Doctor'}});
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);     
      this.getdoctores();
    }); 
  }
}
