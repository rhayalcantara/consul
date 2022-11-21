import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
  @Input() lineChartData: ChartDataSets[] = []; 
  @Input() lineChartLabels: Label[] = [];
  @Input() color:string[] = [];
  @Input() lineChartType:ChartType = 'line';
  @Input() titulo:string = '';
  
  //lineChartData: ChartDataSets[] = [];
  //lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };
  //lineChartColors: Color[] = [];
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  //lineChartType:ChartType = 'line';

 


  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
   /* for(let c of this.color){
      this.lineChartColors.push({borderColor:c,
                                 backgroundColor:c})
    }*/
    console.log('chart',this.lineChartColors)
    this.cd.detectChanges();
  }

getrandoncolor(max:number,min:number){
  return Math.random() * (max - min) + min;
}

 grouped<T>(datasurce: T[],campodata:string,campolabel:string,valorcondicion:string,campotitulo:string):ChartDataSets{
    let dt = datasurce.filter(d=>d[campolabel] === valorcondicion);
    let datos:number[]=dt.map(a=>a[campodata]);
    console.log('grouped',datos)
    return {data:datos,label:campotitulo}

 }

 cambia(tipo:string){
    this.lineChartType = tipo as ChartType;
    this.cd.detectChanges();
 }

}
