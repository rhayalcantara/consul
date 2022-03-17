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

  ngOnInit() {
    
  }
  
  ngAfterViewInit() {
    let usuario:Usuario = this.datos.usuarioData;
    
    if (usuario.menuhome!=null) {
      let n = usuario.menuhome-1;
      console.log('Menuhome',n)
      this.router.navigateByUrl(usuario.menues[n].url);
      
    }else{

       const dialogRef = this.toastr.open(LoginComponent,{disableClose:true });
      
      dialogRef.afterClosed().subscribe((result) => {
        usuario = this.datos.usuarioData;
        let n = usuario.menuhome-1;
        console.log('Menuhome',n)
        this.router.navigateByUrl(usuario.menues[n].url);
        });
    }

    }

}
