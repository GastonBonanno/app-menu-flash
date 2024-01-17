import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CreateUserRequest, CreateUserResponse, LoginUserRequest, LoginUserResponse} from "../interfaces/user.interface";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, from, map, mergeMap, Observable, tap} from "rxjs";
import {TokenService} from "../services/token.service";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class SecureService {

  constructor( private http: HttpClient, private tokenService: TokenService) {
  }

  post(path: string, body: any | null): Observable<any> {
    return this.createTokenHeader().pipe(
      mergeMap(header => this.http.post<any>(`${URL}${path}`, body, {headers: header}))
    )
  }

  get(path: string): Observable<any> {
    return this.createTokenHeader().pipe(
      mergeMap(header => this.http.get<any>(`${URL}${path}`, {headers: header}))
    )
  }

  patch(path: string, body: any | null): Observable<any> {
    return this.createTokenHeader().pipe(
      mergeMap(header => this.http.patch<any>(`${URL}${path}`, body, {headers: header}))
    )
  }

  put(path: string, params: HttpParams): Observable<any> {
    return this.createTokenHeader().pipe(
      mergeMap(header => this.http.put<any>(`${URL}${path}`, null, {headers: header, params: params}))
    )
  }

  delete(path: string): Observable<any> {
    return this.createTokenHeader().pipe(
      mergeMap(header => this.http.delete<any>(`${URL}${path}`, {headers: header}))
    )
  }

  private createTokenHeader(): Observable<HttpHeaders> {
    return this.tokenService.getToken().pipe(
      mergeMap(async (storedToken) => new HttpHeaders({'auth-token': storedToken ? storedToken : ''}))
    )
  }

}
