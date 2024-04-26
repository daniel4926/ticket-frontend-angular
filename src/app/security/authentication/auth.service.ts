import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from "rxjs";import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/app/core/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'token';
  private AUTHORITY_KEY = 'authority';

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  baseUrl: string = `${environment.url_api_auth}`;

  constructor(private http: HttpClient) {}


  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.AUTHORITY_KEY);
  }


  getAuthorityCurrent(authorities: string[]): string | null {
    const localAuthorityCurrent = localStorage.getItem(this.AUTHORITY_KEY) || null;
    if (localAuthorityCurrent) {
      return localAuthorityCurrent;
    }

    return authorities.length === 1 ? authorities[0] : null;
  }

  getAuthorityCurrentDetail(authorities: any[], authorityCurrent: string): any {
    const authorityCurrentDetail = authorities.find(authority => authority.name_role === authorityCurrent);
    return authorityCurrentDetail || {};
  }


  authorityChange(state: any, authority: string): any {
    localStorage.setItem(this.AUTHORITY_KEY, authority);
    return {
      ...state,
      authorityCurrent: authority,
      authorityCurrentDetail: this.getAuthorityCurrentDetail(state.authoritiesDisplay, authority)
    };
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      // Si hay un token presente, se considera que el usuario está autenticado
      return true;
    } else {
      // Si no hay un token presente, se considera que el usuario no está autenticado
      return false;
    }
  }




/*
  authenticate(token?: string): any {
    if (token) { this.setToken(token); }

    const _token = token ? token : this.getToken();
    if (!_token) { return { ...defaultUser }; }

    const currentTime = Date.now() / 1000;
    const { user_name = '', permissions = [], exp = 0, authorities = [], user, role, agencia } = jwtDecode(_token);

    if (exp < currentTime) {
      console.log("Token expirado");
      this.removeToken();
      return { ...defaultUser };
    }

    const authorityCurrent = this.getAuthorityCurrent(role);
    axios.defaults.headers.common["Authorization"] = 'Bearer ' + _token;
    return {
      ...defaultUser,
      userName: user_name,
      userDetails: user,
      permissions,
      id: user.id,
      exp,
      authorities,
      authoritiesDisplay: role,
      authorityCurrent,
      authorityCurrentDetail: this.getAuthorityCurrentDetail(role, authorityCurrent),
      isAuthenticated: true,
      agenciaAssigned: agencia,
      withAgenciaAssigned: agencia !== null
    };
  }
*/

}
