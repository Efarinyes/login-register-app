import { Injectable, computed, inject, signal } from '@angular/core';
import { enviroments } from '../../../enviroments/enviroments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenInterface, LoginResponse, User } from '../interfaces';
import { RegisterResponse } from '../interfaces/register-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = enviroments.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User | null>(null)
  private _authStatus = signal<AuthStatus>( AuthStatus.checking)

  public currentUser = computed( () => this._currentUser());
  public authStatus = computed( () => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe()
  }

  private setAuthenticaation( user: User, token: string ): boolean {

    this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token )
          console.log({user, token})

          return true
  }

  signUp( name: string, email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;
    const body = { name, email, password };

    return this.http.post<RegisterResponse>(url, body)
      .pipe(
        map( ({user, token }) => this.setAuthenticaation(user, token)),
        catchError( err => throwError( ()=> err.error.message ))
      )
  }

  login ( email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password }

    return this.http.post<LoginResponse>(url, body)

      .pipe(
        map( ({ user, token }) => this.setAuthenticaation(user, token )),
        catchError( err => throwError( () => err.error.message )
        )
      )
  }

  checkAuthStatus(): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token ) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

      return this.http.get<CheckTokenInterface>(url, { headers })

        .pipe(
          map( ({ user, token }) => this.setAuthenticaation(user, token )),
          catchError( () => {
            this._authStatus.set( AuthStatus.notAuthenticated );
            return of(false)
          })

        )

  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );

  }

}
