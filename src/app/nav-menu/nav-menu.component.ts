import { Component, OnInit, ViewChild } from '@angular/core';
import { Menu, RolesMenu, User, UserDTS, Usuario } from '../Interfaces/interfaces';
import {  MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DatosService } from '../Services/datos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  mostrarmenu = false;
  //usuario: Usuario;
  userdts: UserDTS={
    id: 0,
    user: '',
    rol :'',
    persona :'',
    email: '',
    phone  : '',
    status :''
  };
  user:User={
    id: 0,
    user: '',
    password :'',
    roleId :0,
    personaId :0,
    email: '',
    phone  : '',
    statusId :0
  }
  public usuario:Usuario=null!;
  @ViewChild(MatSidenav, { static: false }) sidenav!: MatSidenav;
 public  navMenus:Menu[]=[];

  constructor(private observer: BreakpointObserver,
    private datos:DatosService,
    private router: Router
    ) { 
      this.datos.usuario.subscribe(
        { next:
          (rep) =>{
            console.log('Cambio de usuario',rep)
            if (rep){
              this.usuario = rep;
              this.navMenus=this.usuario.menues
              this.mostrarmenu=true;
              this.datos.GetUsername(this.usuario.username).subscribe((user) =>{     
                console.log('user',user)         
                this.userdts = user; 
                this.sidenav.close(); 
                this.sidenav.mode='over';                                            
               });          
            }         
            else{
              this.userdts.persona='';
              this.userdts.rol='';
              this.navMenus=[];
            }
     
    
          },error:(err:Error)=> {
            this.datos.showMessage("Error: "+err.message,"Error Cargando Menues","error")
          }
        }
  );
  }
  ngOnInit(): void {


  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  
  ngAfterViewInit() {
    
      this.mostrarmenu=true;
      this.sidenav.mode='over';
      } 
  cerrarmenu(){
   
    this.sidenav.close();
      
    
  }
      
  logout(){
   // this.mostrarmenu=false;
   this.usuario=null!;
   this.navMenus=[];
   this.userdts.persona='';
   this.userdts.rol='';
   this.sidenav.mode='side';
    this.datos.logout();
    this.router.navigateByUrl('/');
    //window.location.reload();

   
  }

  
login() {
  this.sidenav.mode='over';
  this.cerrarmenu();
 
  this.router.navigateByUrl('/');
  
  window.location.reload();
}

}
