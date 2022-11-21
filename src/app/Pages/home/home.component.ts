import { AfterViewInit, Component, OnInit,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import Utils from 'src/app/helpers/help';
import { CartTitle, ConsultaDocSemanal, ConsultaDocSemanalAnos, PacientePersona, PacientePersonaSexo, PacientePersonaSexoTipoidentificacion, PacienteSexoChart } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { ReporteService } from 'src/app/Services/Reportes';
import * as html2canvas from "html2canvas"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  public totalpaciente:number=0;
  public totalpacientef:number=0;
  public ctTotalPaciente:CartTitle={Title: 'Total Paciente',data1: 0,data2:0};
  public ctTotalPacienteF:CartTitle={Title: 'Pacientes Femenino',data1: 0,data2:0};
  public ctTotalPacienteM:CartTitle={Title: 'Pacientes Masculino',data1: 0,data2:0};
  public totalpacientems:string='';
  public totalpacientem:number=0;
  public porcientof:number=0;
  public porcientom:number=0;
  public anoestadistica:number=2022;
  public anos:ConsultaDocSemanalAnos[]=[];
  public ppst:PacientePersonaSexoTipoidentificacion[]=[];
  lineChartData: ChartDataSets[] = [
    { data: [369, 382, 105, 101], label: 'Masculinos' },
    { data: [738, 852, 227, 326], label: 'Femeninos' },
  ];
  lineChartLabels: Label[] = ['December', 'November','October', 'September'];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType:ChartType = 'horizontalBar';

  datapacientessexo:PacienteSexoChart[] = [];
  ChartData: ChartDataSets[] = []; 
  ChartLabels: Label[] = [];
  color:string[] = [];
  ChartType:ChartType = 'line';
  array:ConsultaDocSemanal[] = [];
  constructor(private datos:DatosService,
              private cd: ChangeDetectorRef,
              private rep:ReporteService
              ) { }


  ngOnInit(): void {
    this.getppst()
    
    this.getanos()
    

    this.datos.GetPacientessexochart().subscribe(
      { next:(rep)=>{
        this.datapacientessexo= rep //.filter(d=>d.year===2021);
          // conseguir los filtros 
          let filtros:string[]= [];
          this.datapacientessexo.map(x=>{
            if (!filtros.includes(x.sexo)) 
              {
                filtros.push(x.sexo);
                this.color.push(`rgba(${this.getrandoncolor(0,255)},
                                      ${this.getrandoncolor(0,255)},
                                      ${this.getrandoncolor(0,255)},.28)`)            
              } 
          });        
                             
         
         //conseguir la data por filtros
         for(let cond of filtros) {
           let filtrado = this.datapacientessexo.filter(x=>x.sexo===cond)
           
           let dat:number[] = filtrado.map(x=>x.cnt)
           this.ChartData.push({data:dat, label:cond})
                     
         }
         //conseguir los labels  
         let etiquetas:string[]= [];
         this.datapacientessexo.map(x=>{
           if (!etiquetas.includes(x.year+'-'+x.mes)){
            etiquetas.push(x.year+'-'+x.mes)
            //para cada etiqueta un color
            
           }           
         })
            
         this.ChartLabels=etiquetas;
         this.cd.detectChanges()
    }
  });

    this.datos.GetPacientePersonasCount().subscribe(rep=>{
      this.totalpaciente=rep;
      this.ctTotalPaciente.data1=this.totalpaciente;
      this.ctTotalPaciente.data2=100;
    });

    this.datos.GetPacientePersonasp().subscribe((rep:PacientePersonaSexo[])=>{
      this.totalpacientef=rep.filter(x=>x.sexo=='F')[0].cnt
      this.totalpacientem=rep.filter(x=>x.sexo=='M')[0].cnt

      this.porcientof=(this.totalpacientef/(this.totalpaciente*1.00))*100.00
      this.porcientom=(this.totalpacientem/(this.totalpaciente*1.00))*100.00

      this.ctTotalPacienteF.data1 = this.totalpacientef;
      this.ctTotalPacienteF.data2 = this.porcientof 

      this.ctTotalPacienteM.data1 = this.totalpacientem;
      this.ctTotalPacienteM.data2 = this.porcientom  
      this.cd.detectChanges();

    })
  }
  getanos(){
    this.datos.getestaditicaanos().subscribe({
      next: (rep:ConsultaDocSemanalAnos[])=>{
           
           this.anos = rep.sort((a,b)=>{
             if (a.ano<b.ano) return 1;
             if (a.ano>b.ano) return -1;
             return 0;
           })
          this.anoestadistica = this.anos[0].ano
          this.getarray()
          this.cd.detectChanges();
      },
      error: (err:Error)=>{
        this.datos.showMessage(err.message,'GetAños',"Error")
      }
    })
  }
  getrandoncolor(max:number,min:number){
    return Math.floor(Math.random() * (max - min) + min);
  }
  actano(event){
    console.log(event.target.value)
    this.anoestadistica =event.target.value
    this.getarray();
  }
  getppst(){
    this.datos.GetPacientePersonasis().subscribe(rep=>{
      this.ppst = rep;
      this.cd.detectChanges();
    })
  }
  getarray(){
    this.datos.getestaditicacsd(this.anoestadistica.toString()).subscribe({next:(rep:ConsultaDocSemanal[])=>{
      this.array = rep;
      console.log(this.array);
      this.cd.detectChanges();
    }})
  }
  imprime(){
   this.rep.ConsultaDocSemanalRep(this.array);
  }
  imprimeps(){
    //this.rep.EstadisticaPersonaSexo(this.datapacientessexo)
    
    (html2canvas as any)(document.querySelector("#chart")).then(canvas => {  
      var dataURL = canvas.toDataURL();
      this.rep.EstadisticaPersonaSexo(dataURL,this.datapacientessexo)
      
    });
  }
  imprimepsi(){
    this.rep.EstadisticaPersonaSexoiden(this.ppst)
  }

}
