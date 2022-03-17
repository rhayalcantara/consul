import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { Menu } from './Interfaces/interfaces';
import { DatosService } from './Services/datos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'consul';
  constructor( 
    ) { 

    }
  ngOnInit(): void {
    
  }
  ngOnDestroy(){
    alert("salir")
    localStorage.removeItem('usuario')
  }

}
