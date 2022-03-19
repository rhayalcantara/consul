import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuscarpersonaComponent } from '../buscarpersona/buscarpersona.component';
import { Persona, Roles, Status, User } from 'src/app/Interfaces/interfaces';
import { DatosService } from 'src/app/Services/datos.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
 // CryptoJSx = require("crypto-js");
  User:User={
    id: 0,
    user: '',
    password :'',
    roleId :0,
    personaId :0,
    email: '',
    phone  : '',
    statusId :0
  }  
  campos:string[] = [];
  roles:Roles[]=[];  
  clave:string='';
  private persona:Persona ={
    id:0,
    nombres:"",
    apellidos:"",
    apodo:"",
    fecha_nacimiento:null!,
    lugar_nacimiento:"",
    sexo:"",
    ocupacion:"",
    procedencia:"",
    raza:"",
    numero_identificacion:"",
    tipo_identificacion:5,
    telefono_casa:'',
    celular:''
  };
  formGroup: FormGroup;
  status:Status[]=[];
  constructor( @Inject(MAT_DIALOG_DATA  ) public data:any,
               private fb: FormBuilder,
               private datos:DatosService,
               private toastr: MatDialog,
               private dialogRef: MatDialogRef<FormUserComponent>) {
                 this.formGroup=this.fb.group({});
                }

  ngOnInit() {
       //llena los Status
    this.datos.GetStatus().subscribe(rep=>{
      this.status = rep;
    });
      this.getroles();
        //pasa los datos de la consultorio que llegaron
        //this.User = this.data.user;
        //optiene las propidades del objeto
        this.campos=Object.keys(this.User);
        //inicializa el formgroup
        
        this.formGroup=this.fb.group({});
        if (this.data.user.id!=0){
          this.getuser(this.data.user.id);
        }
        
        let nombres: FormControl = new FormControl();      
        nombres.setValue('');
        this.formGroup.addControl('nombres', nombres);
        let apellidos: FormControl = new FormControl();      
        apellidos.setValue('');
        this.formGroup.addControl('apellidos', apellidos);  
        let tipo_identificacion: FormControl = new FormControl();      
        apellidos.setValue('');
        this.formGroup.addControl('tipo_identificacion', tipo_identificacion);   
        let numero_identificacion: FormControl = new FormControl();      
        apellidos.setValue('');
        this.formGroup.addControl('numero_identificacion', numero_identificacion);                
        //llenar el formgroup con los datos del ususario
        for (let control of this.campos) {
          let newFormControl: FormControl = new FormControl();      
          this.formGroup.addControl(control, newFormControl);
        }                 

  }
  getroles(){
    this.datos.GetRoles().subscribe((role:Roles[]) => {
      this.roles=role;
    });
  }
  getuser(n:number){
    this.datos.GetUser(n.toString()).subscribe((u:User)=>{

      this.User = u;
      //llenar el formgroup con los datos del consultorio
      for (let control of this.campos) {
        
        if (control!='password'){          
          this.formGroup.controls[control].setValue (this.User[control as keyof User]);
        }
                
      } 
      this.clave=this.User.password;

       


       var originalText = this.User.password
       
  
      this.formGroup.controls['password']
      .setValue(originalText);
       this.getperona(this.User.personaId);
    })
  }
  getperona(id:number){
    
    this.datos.GetPersona(id).subscribe((person)=>{
      this.formGroup.controls['personaId'].setValue(person.id);  
      this.formGroup.controls['nombres'].setValue (person.nombres);
      this.formGroup.controls['apellidos'].setValue (person.apellidos);
      this.formGroup.controls['numero_identificacion'].setValue (person.numero_identificacion);
      this.getstatus(person.tipo_identificacion);
    })
  }
  getstatus(id:number){
    this.datos.GetTipoIdentificacionx(id.toString()).subscribe((rep)=>{
      this.formGroup.controls['tipo_identificacion'].setValue (rep.descripcion);
    })
  }
  buscaexistente(){
    const dialogRef = this.toastr.open(BuscarpersonaComponent,{data:{rol:''}} );
     
    dialogRef.afterClosed().subscribe(result => {
        
      this.getperona(result.id);
  });

}
anytostring(x:any):string{
  return x.toString();
}
anytonumber(x:any):number{
  return x.toNumber();
}
grabar(){

  // for (const control in this.User) {

  //   // if (control=='id' || control=='personaId' || control=='roleId' || control=='statusId'){
  //   //   this.User[control]=+this.formGroup.controls[control].value
  //   // }else{
  //   //   if(control=='user'|| control=='password'|| control=='email'|| control=='phone'  ){
  //   //      this.User[control]=this.formGroup.controls[control].value
  //   //   }
   
  //   // }
  //   console.log(this.formGroup.controls[control].value)
  //   console.log(this.User)  
  // }  

  //this.User=this.formGroup.value as User
 // this.User=this.castAny<User>(this.User,this.formGroup.value)
  
  this.User = JSON.parse(JSON.stringify(this.formGroup.value))
  console.log(this.User)  

  // console.log('antes',this.User)
  // this.User=JSON.parse(JSON.stringify(this.formGroup.controls));
  // console.log('despues',this.User)

  if(this.User.personaId==0 || this.User.personaId==null){
    this.datos.showMessage("Selecione una Persona","Error Falta Persona","error");
    return;
  }

  // this.User.password = this.User.password;
  if (this.User.id==0 || this.User.id==null ){
    this.User.id=0;
    this.datos.insertuser(this.User).subscribe((result) => {      
      this.dialogRef.close(result);
    }),(error:any) => {console.log("error",error);};
  }else{
    
    this.datos.Updateuser(this.User).subscribe((result) => {
      this.dialogRef.close(this.User);
    })
  }
  
}
cancelar(){
  this.dialogRef.close();
}
castAny<T>(target: T, source: object): T {
  const result: T = Object.assign({}, target);
  Object.keys(target).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      result[key as keyof T] = source[key as keyof typeof source];
    }
  });
  return result;
}

}
