import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private KEY_TOKEN: string = 'auth-token'

  constructor( private storage: Storage ) {
    this.storage.create().then();
  }

  saveToken(token: string): Observable<void> {
    return from(this.storage.set(this.KEY_TOKEN, token));
  }

  getToken(): Observable<string> {
    return from(this.storage.get(this.KEY_TOKEN));
  }

  clearToken(): Observable<void> {
    return from(this.storage.clear());
  }



}
