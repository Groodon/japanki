import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { isDevMode } from '@angular/core';

// Inserts the base url for the http-calls
@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: (isDevMode() ? `http://localhost:8080/${req.url}` : `https://japanki.herokuapp.com/${req.url}`)});
    return next.handle(apiReq);
  }
}
