import { Injectable }                 from '@angular/core';
import { HttpClient }                 from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, tap }             from 'rxjs/operators';

interface User {
  logon: string;
  password: string;
}

function isInDb(users: User[], curUser: User): boolean {
  return !!users.find(user => (user.logon === curUser.logon) && (user.password === curUser.password));
}

@Injectable({providedIn: 'root'})
export class AuthService {

  get token(): string { return localStorage.getItem('token'); }
  set token(token: string) { localStorage.setItem('token', token); }

  get isAuthorized(): boolean { return !!this.token; }

  constructor(
    private http: HttpClient
  ) {
  }

  postUser(user: User): Observable<any> {
    return this.http.post('users', user);
  }

  logon(logonUser: User): Observable<any> {
    return this.http.get<User[]>('users').pipe(
      switchMap(users => isInDb(users, logonUser) ? of('token') : throwError({message: 'Нет пользователя'})),
      tap(token => this.token = token)
    );
  }
}
