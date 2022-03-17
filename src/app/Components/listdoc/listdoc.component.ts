import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Documento } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';


@Component({
  selector: 'app-listdoc',
  templateUrl: './listdoc.component.html',
  styleUrls: ['./listdoc.component.css']
})
export class ListdocComponent implements OnInit {
  public ruta:string="";
  public Documentos:Documento[]=[];
  public term:string="";
  constructor(private tool:DatosService) {
  
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
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
   // a.download = doc.ruta;
    a.href = URL.createObjectURL(downloadedFile);
    this.ruta = a.href
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
}

  getdocs(){
    this.tool.GetDocumentostipo(this.cod.toString(),this.identificador).subscribe(rep=>{
      console.log('documentos',rep);
      this.Documentos = rep;
    })
  }

}
