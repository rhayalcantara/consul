import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

//import { AuthenticationService } from '@app/_services';

import { Router,RouterStateSnapshot, CanActivate, ActivatedRouteSnapshot, } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DatosService } from '../Services/datos.service';
import { LoginComponent } from '../Components/login/login.component';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: DatosService,
        private router: Router,
        public dialog: MatDialog) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
               // this.router.navigate(['']);
               const dialogRef = this.dialog.open(LoginComponent,{
                width: '500px',
                height: '400px', 
                disableClose:true });
                dialogRef.afterClosed().subscribe((result) => {
                    //this.router.navigateByUrl('home');
                    //next.handle(request);
                    location.reload();
                    });
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
            //return next.handle(request);
        }))
    }
}