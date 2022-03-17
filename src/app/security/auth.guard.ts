import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DatosService } from '../Services/datos.service';





@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private datoservice: DatosService
       
    ) {
       
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const usuario = this.datoservice.usuarioData;
                
        if (usuario){            
            let path:string = "/"+route.url[0].path
            
            if (usuario.menues.find(x=>x.url === path)){
                console.log(path)
                return true;
            }else{
                this.datoservice.logout();
                this.router.navigate([''], { queryParams: { returnUrl: state.url }});
                //this.router.navigateByUrl('');
                return false;
            }
            
        }
        this.router.navigate([''], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
