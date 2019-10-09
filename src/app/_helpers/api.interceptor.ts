import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


// Inserts the base url for the http-calls
@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // When we call the external api at jisho we don't want to use the url to our server
    //if (req.url.indexOf('jisho') != -1) {
    //  req.headers
    //  return next.handle(req);
    //}
    const apiReq = req.clone({ url: `https://japanki.herokuapp.com/${req.url}` });
    return next.handle(apiReq);
  }
}
