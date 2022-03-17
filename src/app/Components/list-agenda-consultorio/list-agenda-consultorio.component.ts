import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgendaConsultorio, AgendaConsultoriodetalle, AgendaConsultoriodts } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';

import { FormAgendaConsultorioComponent } from '../form-agenda-consultorio/form-agenda-consultorio.component';

@Component({
  selector: 'app-list-agenda-consultorio',
  templateUrl: './list-agenda-consultorio.component.html',
  styleUrls: ['./list-agenda-consultorio.component.css']
})
export class ListAgendaConsultorioComponent implements OnInit {

  public totalregistros:number=0;
  public config: any;
  public labels: any;
  public page:number=-1;
  public agendaconsultorio: AgendaConsultorio ={
    id:0,
    consultorio_id:0,
    doctor:0
  };
  public buscando:boolean=false;
  public textobuscando:string='';
  public agendaconsultorios: AgendaConsultoriodts[]=[];

  constructor( private  toastr: MatDialog,
               private datos:DatosService) { }

  ngOnInit() {
    this.getdatos()
  }
  onPageChange(event:any) {
    this.config.currentPage = event;
    this.page = event -1;
    if (this.buscando){
      //esta buscando
      this.updatedatosfiltro(this.page,this.textobuscando);
    }else{
      //no esta buscando
      this.updatedatos(this.page);
    }
  }
  buscar(event:any){
    console.log('cambio',event.target.value);
    this.textobuscando=event.target.value;
    if (this.textobuscando==''){
      // si limpia entonces ir a la primera pagina 
      this.buscando=false;   
      this.getdatos();
    }else{
      // buscan la cantidad de datos encontrados
      this.datos.GetAgendaConsultorioCountfiltro(this.textobuscando).subscribe(rep=>{
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
          this.updatedatosfiltro(this.page,this.textobuscando);
        }else{
          // si no hay datos mostrar un mensaje
          this.datos.showMessage('No se encontro Datos','Busqueda','success')
        }
        
      });
    }
   
  }

  getdatos(){
    this.page=0;
    this.datos.GetAgendaConsultorioCount().subscribe(rep=>{
      this.totalregistros=rep;
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

  updatedatos(page:number){
    this.datos.GetAgendaConsultorios(page).subscribe(rep =>{
      this.agendaconsultorios = rep;                      
    });
  }
  updatedatosfiltro(page:number,filtro:string){
    this.datos.GetAgendaConsultoriofiltro(page,filtro).subscribe(rep=>{
      this.agendaconsultorios = rep;
    });
  }
 
  abrirmodal(){    
    let acds:AgendaConsultoriodetalle[]=[];
    let tandaid = 1;
    let valor = 200;
    let cnt_max = 20;
    for(let i=1;i<8;i++){

      if (i>5){
        tandaid = 2;
        valor = 0;
        cnt_max=0;
      }

      let acd: AgendaConsultoriodetalle =  {
        id:0,
        agenda_consultorioid:0,
        diasemana:i,
        tanda_id:tandaid,
        valor:valor,
        cnt_max:cnt_max
      };
      acds.push(acd);
      
    }
    console.log('acds',acds);
    const dialogRef = this.toastr.open(FormAgendaConsultorioComponent,{data:{agendaconsultorio:this.agendaconsultorio,
                                                                             agendaconsultoriodetalle:acds}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.onPageChange(1);
    }); 
  }
  abrirmodaledit(agendaconsultorio:AgendaConsultoriodts){
    let acds:AgendaConsultoriodetalle[]=[];
 
    this.datos.GetAgendaConsultorioDetalles(agendaconsultorio.id).subscribe(rep=>{
      acds = rep;
      const dialogRef = this.toastr.open(FormAgendaConsultorioComponent,{data:{agendaconsultorio:agendaconsultorio,
                                                                               agendaconsultoriodetalle:acds}});
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed',result);
        console.log(this.page);
        this.onPageChange(this.page+1);         
      }); 
    });

    // let tandaid = 1;
    // let valor = 200;
    // let cnt_max = 20;
    // for(let i=1;i<8;i++){

    //   if (i>5){
    //     tandaid = 0;
    //     valor = 0;
    //     cnt_max=0;
    //   }

    //   let acd: AgendaConsultoriodetalle =  {
    //     id:0,
    //     agenda_consultorioid:0,
    //     diasemana:i,
    //     tanda_id:tandaid,
    //     valor:valor,
    //     cnt_max:cnt_max
    //   };
    //   acds.push(acd);
      
    // }
                                                                            
  }
}
