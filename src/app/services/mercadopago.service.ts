import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable} from "rxjs";
import {SecureService} from "../utils/secure.service";
import {ClientOrderResponse, CreateClientOrder} from "../interfaces/order.interface";
import {HttpParams} from "@angular/common/http";
import {Preference} from "../interfaces/mercadopago.interface";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  constructor(private secureService: SecureService) {
  }
  createPreference(): Observable<Preference> {
    return this.secureService.post( `/mercadopago/create-preference`, undefined)
  }

}
