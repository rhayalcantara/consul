import { Injectable } from "@angular/core";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { BehaviorSubject } from "rxjs";
@Injectable()
export default class Utils {
   static downloadAsPDF(pagos:any[],titulo:string) {
    
        let campos:string[]=[];
        campos = Object.keys(pagos[0])
        console.log('los campos',campos);
        let titulos1:any[]=[];
        let titulos2:any[]=[];
        let titulos3:any[]=[];
        let conwhit:string[]=[];
        let porciento:number=100/campos.length;
        let n:number=0;
        var totales_name:string[]=[];
        var totales_valores:number[]=[];
        campos.forEach(x=>{
          n++;
          let tipo=typeof x
          if(tipo=='number'){        
              totales_name.push(x)
              totales_valores.push(0);
          }
    
          if (n==1){
            titulos1.push({text:'Dispensario Medico San Agustin ', style: 'header',colSpan: campos.length, alignment: 'center'})
            titulos2.push({text:titulo, style: 'subheader',colSpan:campos.length, alignment: 'center'})
          }else{
            titulos1.push({})
            titulos2.push({})
          }
          titulos3.push({text: this.capitalizeFirstLetter(x),style: 'tableHeader'})
          conwhit.push(`${porciento}%`);
        })
    
        const documentDefinition:any = { 
          footer: function(currentPage:number) { 
              return [
                  {text: 'Rhay Alcantara Programador (809-303-8210)',fontSize:8 ,alignment:  'center' },
                  {text: 'Pag:'+currentPage.toString() ,alignment:  'right',margin: [ 0, 0, 50, 0 ] }  ]
              
            },
          content:[ ],
         styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 5]
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
    
      var tabla = 
      {
        table: 
        {
          widths: [/*'20%','20%','20%','20%','20%'*/],
          headerRows: 3,        
          body: [ 
                /*  [{text:'Dispensario Medico San Agustin ', style: 'header',colSpan: 5, alignment: 'center'},{},{},{},{}],                 
                  [{text:'Alumnos Atrazados', style: 'subheader',colSpan: 5, alignment: 'center'},{},{},{},{}],                               
                  [{text: 'NombreUnido',style: 'tableHeader'} , {text:'Curso',style: 'tableHeader'}, {text:'Tanda',style: 'tableHeader'},{text:'Tanda',style: 'tableHeader'},{text:'Valor',style: 'tableHeader'}]	*/				
                ]
        }
      }
    
      conwhit.forEach(f=>{
        tabla.table.widths.push(f)
      })
      /*tabla.table.widths.push(conwhit)*/
      tabla.table.body.push(titulos1)
      tabla.table.body.push(titulos2)
      tabla.table.body.push(titulos3)
    
    
      var cont={
        style: 'tableExample',
        table: {},
        layout: 'lightHorizontalLines'
      }
      var array :any[][] = []
     // var total = 0;
      var cnt = 0;
      
    for (var i = 0; i < pagos.length; i++) { 
     // let num = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pagos[i].balance);
      let row:any[]=[];
      campos.forEach(x=>{
        if(totales_name.includes(x)){
          totales_valores[totales_name.indexOf(x)]+=pagos[i][x]
          let num = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pagos[i].balance);
          row.push({text:`${num}`,fontSize:8,bold:false})
        }else{
          row.push({text:`${pagos[i][x]}`,fontSize:8,bold:false})
        }
        
      })
      array.push(
        row
      )
     // total+=pagos[i].balance
      cnt++;
    }
    //let num = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total);
    let footer:any[]=[];
    
    for (let i = 0; i < campos.length; i++){
      if (totales_name.length>0){
        if (totales_name.includes(campos[i])){
          let num = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totales_valores[totales_name.indexOf(campos[i])]);
          footer.push({text:num,fontSize:15,bold:true})
        }else{
          footer.push({});
        } 
      }else{
        if(i+1<=(campos.length-2)){
          footer.push({});
        }
      }
    }
    if(totales_name.length==0){
      footer.push(...[{text:'Total',fontSize:15,bold:true},{text:`${cnt}`,fontSize:10,bold:true}])
    }
    
    
    
    array.push(footer)
    array.forEach(a=>{
      tabla.table.body.push(a)
    })
    
      cont.table = tabla.table
    
      documentDefinition.content.push(cont)
      console.log(documentDefinition)
        pdfMake.createPdf(documentDefinition).open();
        //.download(); 
        // pdfMake.createPdf(documentDefinition).getDataUrl().then((dataUrl) => {
        //   console.log(dataUrl);
        //   const dialogRef = this.toastr.open(VisorpdfComponent,{width:"85%" ,height:"70%" ,data:{url:dataUrl}});
        //   dialogRef.afterClosed().subscribe(result => {
        //     console.log(result);
        //   })
        // }, err => {
        //   console.error(err);
        // });
         
      }
    static  capitalizeFirstLetter(texto:string):string {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
      }
      private message = new BehaviorSubject<string>('');
      public customMessage = this.message.asObservable();
      
      public changeMessage(msg: string): void {
        this.message.next(msg);
      }
}