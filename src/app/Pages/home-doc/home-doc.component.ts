import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuscarComponent } from 'src/app/Components/form-buscar/form-buscar.component';
import { EntreFecha, Usuario } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';

@Component({
  selector: 'app-home-doc',
  templateUrl: './home-doc.component.html',
  styleUrls: ['./home-doc.component.css']
})
export class HomeDocComponent implements OnInit {
  ppst:[]=[];
  public desde: string='';
  public hasta: string='';
  public usuario:Usuario
  constructor(private  toastr: MatDialog,
              private datos: DatosService) { }

  ngOnInit(): void {
  }
  formbuscarepayit(){
      const dialogRef = this.toastr.open(FormBuscarComponent,{data:{titulo:"Busqueda Fechas"}});
      dialogRef.afterClosed().subscribe((result:EntreFecha) => {
      console.log('The dialog was closed',result);
      this.desde=result.desde;
      this.hasta=result.hasta;
      this.getdatos(result);
    // this.onPageChange(1);
  });
  }
  getdatos(fechas:EntreFecha){
    //this.datos
  }
}
