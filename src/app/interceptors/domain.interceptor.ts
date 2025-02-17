import { Injectable }                                           from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable }                                           from 'rxjs';

@Injectable()
export class DomainInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = `http://localhost:3000/${request.url}`;
    request = request.clone({url});
    return next.handle(request);
  }
}
