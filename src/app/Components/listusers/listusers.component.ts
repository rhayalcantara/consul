import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDTS } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';

import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {
  public config: any;
  public labels: any;
  public Users:UserDTS[]=[];
  user:UserDTS = {
    id: 0,
    user: '',
    rol :'',
    persona :'',
    email: '',
    phone  : '',
    status :''
  }
  public term:string ="";
  constructor(private datos:DatosService,private toastr: MatDialog) { }

  ngOnInit() {
    this.labels = {
      previousLabel: "<",
      nextLabel: ">",
      screenReaderPaginationLabel: "paginacion",
      screenReaderPageLabel: "paginacion1",
      screenReaderCurrentLabel: "paginacion2"
    };
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.Users.length
    };
      this.getuser();
  
  }
  getuser(){
    this.datos.GetUsersDTS().subscribe((rep)=>{
      this.Users = rep;
      console.log(rep)
      this.config.totalItems= this.Users.length;
      this.config.itemsPerPage=5;
      this.config.currentPage=1;
            
    });
  }
  onPageChange(event:any) {
    this.config.currentPage = event;
  }
  abrirmodaledit(user:UserDTS){
    const dialogRef = this.toastr.open(FormUserComponent,{data:{user: user}})
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.datos.showMessage("Se Realizo con Exito la Operacion","Mantenimiento","success");
      }else{
        this.datos.showMessage("Se cancelo la Operacion","Mantenimiento","warning");
      }     
      this.getuser();
    }); 
  }
  abrirmodal(){
    
    const dialogRef = this.toastr.open(FormUserComponent,{data:{user: this.user}})
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);     
      this.getuser();
    });  
  }

}
