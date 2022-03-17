import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DatosService } from "../Services/datos.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private datos:DatosService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const usuario = this.datos.usuarioData;
        if (usuario) {
          req =  req.clone({
                setHeaders: { 
                    Authorization:`Bearer ${usuario.token}`
                }
            });
        }

        return next.handle(req);
    }

}