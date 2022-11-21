
import { Injectable } from "@angular/core";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as moment from 'moment';
import { ConsultaDocSemanal, PacientePersonaSexoTipoidentificacion, PacienteSexoChart } from '../Interfaces/interfaces';
import { DatosService } from "./datos.service";


@Injectable()
export class ReporteService{

    public documentD:any 
   
    constructor(public datos:DatosService){}
    iniciadocumento(){
        this.documentD = { 
            pageSize:{ width: 180, height:550 },
            pageMargins: [ 5, 10, 5, 10 ],
            footer: function(currentPage:number) { return [{text: 'Rhay Alcantara Programador (809-303-8210)',fontSize:8 ,alignment:  'center' },{text: currentPage.toString() ,alignment:  'right',margin: [ 0, 0, 50, 0 ] }] },
            content: 	
            [],
          
           styles: {
            header: {
              fontSize: 14,
              bold: true,
              margin: [0, 0, 0, 10]
            },
            headerpv: {
                fontSize: 12,
                bold: true,
                alignment:  'center'
              },            
            subheader: {
              fontSize: 12,
              bold: true,
              margin: [0, 10, 0, 5]
            },
            subheader2: {
                fontSize: 8,
                bold: false,
                alignment:  'center'
              },
            tableExample: {
              margin: [0, 5, 0, 15]
            },
            tableHeader: {
              bold: true,
              fontSize: 13,
              color: 'black'
            }
          }
        }; 
    }

    async  ConsultaDocSemanalRep(cds:ConsultaDocSemanal[]){
      this.iniciadocumento();
      let  documentDefinition = this.documentD;
      let fecha = moment().format("DD/MM/YYYY");
      documentDefinition.pageSize='LETTER'
      documentDefinition.pageMargins= [ 15, 10, 20, 30 ] 
      documentDefinition.content.push(           
          
        {image: await this.getBase64ImageFromURL("../../assets/logo.jpg"),width:150,height:150} ,
        {text:'Dispensario Medico San Agustin ', style: 'header',margin: [10, 0, 0, 0]},
        {text:'Listado de Promedio de Consulta Semanal por Doctores', style: 'subheader',margin: [10, 0, 0, 0]}, 
        {text:`Fecha Impreción: ${fecha}`, style: 'subheader',margin: [0, 20, 0, 0]},
      );
     
      var tabla = 
      {
        table: 
        {
          widths: ['50%', '35%', '15%',],
          headerRows: 1,        
          body: [
                  [{text: 'Doctor',style: 'tableHeader'} , {text:'Expecialidad',style: 'tableHeader'}, 
                   {text:'Promedio',style: 'tableHeader'}
                 ]					
                ]
        },
        layout: 'lightHorizontalLines'
      }
      var cont={
        style: 'tableExample',
        table: {},
        layout: 'lightHorizontalLines'
      }
      var array :any[][] = []
      var total = 0;
      var cnt = 0;
      
    for (var i = 0; i < cds.length; i++) { 

      array.push([
        {text:`${cds[i].doc}`,fontSize:10,bold:false},
        {text:`${cds[i].descripcion}`,fontSize:10,bold:false},
        {text:`${cds[i].promediosemanal}`,fontSize:10,bold:false},

      ])
   
      cnt++;
    }
    
    array.push([{text:`${cnt}`,fontSize:10,bold:true},{text:''},{text:''}])
    array.forEach(a=>{
      tabla.table.body.push(a)
    })
    
      cont.table = tabla.table
    
      documentDefinition.content.push(cont)      
        console.log(documentDefinition)
      pdfMake.createPdf(documentDefinition).open();
         //.download(); 
    }

    async EstadisticaPersonaSexo(imagen:any,cds:PacienteSexoChart[]){
      this.iniciadocumento();
      let  documentDefinition = this.documentD;
      let fecha = moment().format("DD/MM/YYYY");
      documentDefinition.pageSize='LETTER'
      documentDefinition.pageMargins= [ 15, 10, 20, 30 ] 

      documentDefinition.content.push(           
          
        {image: await this.getBase64ImageFromURL("../../assets/logo.jpg"),width:150,height:150} ,
        {text:'Dispensario Medico San Agustin ', style: 'header',margin: [10, 0, 0, 0]},
        {text:'Pacientes Nuevos por Sexo', style: 'subheader',margin: [10, 0, 0, 0]}, 
        {text:`Fecha Impreción: ${fecha}`, style: 'subheader',margin: [0, 20, 0, 0]},
        {image: imagen,width:550,height:300 ,margin: [0, 20, 0, 20]} ,
        {image: await this.getBase64ImageFromURL("../../assets/logo.jpg"),width:150,height:150,pageBreak: 'before'} ,
        {text:'Dispensario Medico San Agustin ', style: 'header',margin: [10, 0, 0, 0]},
        {text: 'Detalle',  style: 'subheader'},
      );
      
      
      
      var tabla = 
      {
        table: 
        {
          widths: ['25%', '25%', '25%','25%',],
          headerRows: 1,        
          body: [
                  [{text: 'Año',style: 'tableHeader'} , {text:'Mes',style: 'tableHeader'}, 
                   {text:'Sexo',style: 'tableHeader'},{text:'Cantidad',style: 'tableHeader'}
                 ]					
                ]
        },
        layout: 'lightHorizontalLines'
      }
      var cont={
        style: 'tableExample',
        table: {},
        layout: 'lightHorizontalLines'
      }
      var array :any[][] = []
      var total = 0;
      var cnt = 0;
      
    for (var i = 0; i < cds.length; i++) { 

      array.push([
        {text:`${cds[i].year}`,fontSize:10,bold:false},
        {text:`${cds[i].mes}`,fontSize:10,bold:false},
        {text:`${cds[i].sexo}`,fontSize:10,bold:false},
        {text:`${cds[i].cnt}`,fontSize:10,bold:false},

      ])
   
      cnt++;
    }
    
    array.push([{text:`${cnt}`,fontSize:10,bold:true},{text:''},{text:''},{text:''}])
    array.forEach(a=>{
      tabla.table.body.push(a)
    })
    
      cont.table = tabla.table
    
      documentDefinition.content.push(cont)   
        console.log(documentDefinition)
      pdfMake.createPdf(documentDefinition).open();
         //.download();
    }
    async EstadisticaPersonaSexoiden(cds:PacientePersonaSexoTipoidentificacion[]){
      this.iniciadocumento();
      let  documentDefinition = this.documentD;
      let fecha = moment().format("DD/MM/YYYY");
      documentDefinition.pageSize='LETTER'
      documentDefinition.pageMargins= [ 15, 10, 20, 30 ] 

      documentDefinition.content.push(           
          
        {image: await this.getBase64ImageFromURL("../../assets/logo.jpg"),width:150,height:150} ,
        {text:'Dispensario Medico San Agustin ', style: 'header',margin: [10, 0, 0, 0]},
        {text:'Pacientes por Tipo Identificacion y Sexo', style: 'subheader',margin: [10, 0, 0, 0]}, 
        {text:`Fecha Impreción: ${fecha}`, style: 'subheader',margin: [0, 20, 0, 0]},

      );
      
      
      
      var tabla = 
      {
        table: 
        {
          widths: ['25%', '25%', '25%','25%',],
          headerRows: 1,        
          body: [
                  [{text: 'Tipo Identificacion',style: 'tableHeader'} , {text:'Sexo',style: 'tableHeader'}, 
                   {text:'Cantidad',style: 'tableHeader'},{text:'Porciento',style: 'tableHeader'}
                 ]					
                ]
        },
        layout: 'lightHorizontalLines'
      }
      var cont={
        style: 'tableExample',
        table: {},
        layout: 'lightHorizontalLines'
      }
      var array :any[][] = []
      var total = 0;
      var cnt = 0;
      
    for (var i = 0; i < cds.length; i++) { 

      array.push([
        {text:`${cds[i].tipoidentificacion}`,fontSize:10,bold:false},
        {text:`${cds[i].sexo}`,fontSize:10,bold:false},
        {text:`${cds[i].cnt}`,fontSize:10,bold:false},
        {text:`${cds[i].porciento}`,fontSize:10,bold:false},

      ])
   
      cnt++;
    }
    
    array.push([{text:`${cnt}`,fontSize:10,bold:true},{text:''},{text:''},{text:''}])
    array.forEach(a=>{
      tabla.table.body.push(a)
    })
    
      cont.table = tabla.table
    
      documentDefinition.content.push(cont)   
        console.log(documentDefinition)
      pdfMake.createPdf(documentDefinition).open();
         //.download();
    }
    getBase64ImageFromURL(url) {
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
    
        img.onload = () => {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
    
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
    
          var dataURL = canvas.toDataURL("image/png");
    
          resolve(dataURL);
        };
    
        img.onerror = error => {
          reject(error);
        };
    
        img.src = url;
      });
    }
}