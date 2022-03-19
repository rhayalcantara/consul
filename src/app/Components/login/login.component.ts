import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from 'src/app/Services/datos.service';
import { AuthRequest, Response } from 'src/app/Interfaces/interfaces';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup;
  loading = false;
  submitted = false;
  public email: string="";
  public password: string="";
  constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<LoginComponent>,
      private datos: DatosService
      
  ) { 
    this.formGroup = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  onSubmit() {
     this.submitted = true;


      // stop here if form is invalid
      if (this.formGroup.invalid) {
          return;
      }

      this.loading = true;
      
      var originalText  = this.f.password.value.trim();
      let authRequest:AuthRequest ={
          username: this.f.username.value, 
          clave : originalText
      }

      this.datos.GetUserlogin(authRequest).subscribe(
            (rep:Response) => {              
                if (rep.exito===1){
                    this.loading=true;
                    this.dialogRef.close(this.loading);
                }else{
                    this.datos.showMessage(rep.mensaje,"Error","error");
                }
              },
              (error) => {
                  this.datos.showMessage(error.message,"Error","error");
                  this.loading = false;
              }
            );
    }

}
