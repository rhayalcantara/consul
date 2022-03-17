import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Status } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';





@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  public status: Status[]=[];
  public formGroup: FormGroup;
  private ignorarExistenCambiosPendientes: boolean = false;
  private modoEdicion: boolean = false;
 public term: string ="";
  constructor(protected datosservices: DatosService,
    private dialog :MatDialog,
    public modal: NgbModal,
    private fb: FormBuilder) {
      this.formGroup =fb.group({});
     }

  ngOnInit() {
    this.datosservices.GetStatus().subscribe((rep) => {
      this.status = rep;
    });
    this.formClear();
  }

  openDialog(){
    //this.dialog.open(DialogShowmessgeComponent)
  }
  
  formClear() {
    this.formGroup = this.fb.group({
      id: new FormControl(0),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }

  insert(obj:Status) {
    this.datosservices.Insertstatus(obj).subscribe(rep => {
      obj = rep;
      this.datosservices.GetStatus().subscribe((rep) => {
        this.status = rep;
      });
      console.log("llego datos en update", rep);
      this.datosservices.showMessage('Grabado Exitosamente', 'Insert Status', 'success');
    },
      error => {
        //this.datosservices.showMessage(error.message, 'Insert Status', 'error');
      });
  }

  update(obj: Status) {
    console.log("entro en update");
    this.datosservices.Updatestatus(obj).subscribe(rep => {
      this.datosservices.GetStatus().subscribe((rep) => {
        this.status = rep;
      });
      console.log("llego datos en update", rep);
      this.datosservices.showMessage('Grabado Exitosamente', 'Update Status', 'success');
    },
      error => {
        //this.datosservices.showMessage(error.message, 'Update Status', 'error');
      });
  }

  save() {
    this.ignorarExistenCambiosPendientes = true;

   
    const formValue: any = Object.assign({}, this.formGroup.value);

    const statu: Status = {
      id: formValue.id,
      descripcion: formValue.descripcion,
      Identifier: ""
    };

    console.log(statu);
    if (!this.modoEdicion) {
      this.insert(statu);
    } else {
      this.update(statu);
    }
    this.modoEdicion = false;
  }

  edit(obj: Status) {
    this.modoEdicion = true
    console.log("editando", obj);
    this.formGroup = this.fb.group({
      id: new FormControl(obj.id),
      descripcion: new FormControl(obj.descripcion, [Validators.required, Validators.maxLength(50)])
    });
    
  }

  delete(obj: Status) {
    
    console.log("eliminado", obj);
    this.datosservices.Deletestatus(obj).subscribe(rep => {
      console.log("eliminado el objeto", rep);
      this.datosservices.GetStatus().subscribe((rep) => {
        this.status = rep;
      });
    }
    )

  }


}
