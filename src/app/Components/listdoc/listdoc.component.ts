import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Documento } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';
import { VisorpdfComponent } from '../visorpdf/visorpdf.component';


@Component({
  selector: 'app-listdoc',
  templateUrl: './listdoc.component.html',
  styleUrls: ['./listdoc.component.css']
})
export class ListdocComponent implements OnInit {
  public ruta:string="";
  public Documentos:Documento[]=[];
  public term:string="";
  constructor(private tool:DatosService,private toastr: MatDialog) {
  
   }
  @Input("cod") cod:number = 0;
  @Input("identificador") identificador:string="";

  ngOnInit() {
    console.log("docum",this.cod,"idenficador",this.identificador);
    this.getdocs();
  }

  delete(doc:Documento){
    this.tool.DeleteDocumentos(doc).subscribe(rep=>{
      this.getdocs();
    });
  }
  abrirmodaledit(doc:Documento){
    this.tool.getdocumentofile(doc.id).subscribe((event) => {
      console.log('archivo',event)
      this.downloadFile(event,doc);
   
    },err => console.log('error',err.message));

  }

  private downloadFile(data:any,doc:any) {
    const downloadedFile = data;
    console.log(downloadedFile);
   // const a = document.createElement('a');
   // a.setAttribute('style', 'display:none;');
   // document.body.appendChild(a);
   // a.download = doc.ruta;
   // a.href = URL.createObjectURL(downloadedFile);
   // this.ruta = a.href
    /*
    const targetElement = document.querySelector('#iframeContainer');
    const iframe = document.createElement('iframe');
    iframe.src = URL.createObjectURL(downloadedFile);
    targetElement.appendChild(iframe);
   */
    const dialogRef = this.toastr.open(VisorpdfComponent,{width:"85%" ,height:"70%" ,data:{url:URL.createObjectURL(downloadedFile)}});

  /*
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
    */
}

  getdocs(){
    this.tool.GetDocumentostipo(this.cod.toString(),this.identificador).subscribe(rep=>{
      console.log('documentos',rep);
      this.Documentos = rep;
    })
  }

}
