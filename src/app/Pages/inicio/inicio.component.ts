import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/Components/login/login.component';
import { Menu, Usuario } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor( 
    private toastr: MatDialog ,
    private router: Router,
    private datos:DatosService) { }
    private usuario:Usuario=null!;
  ngOnInit() {
    
  }
  
  ngAfterViewInit() {
    
     this.usuario = this.datos.usuarioData;
   
    if (this.usuario) {
 
      this.activamenu();
      
    }else{

       const dialogRef = this.toastr.open(LoginComponent,{disableClose:true });
      
       dialogRef.afterClosed().subscribe((result) => {
        this.usuario = this.datos.usuarioData;
        
        this.activamenu();
       
        });
          
        
    }

    }

    activamenu(){
      
      this.usuario.menues.forEach((menue) => {
    
        if(menue.id==this.usuario.menuhome){
  
          this.router.navigateByUrl(menue.url);
        }
      })
    }

}
