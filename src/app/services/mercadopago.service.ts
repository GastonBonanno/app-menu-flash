import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable} from "rxjs";
import {SecureService} from "../utils/secure.service";
import {Item, Preference} from "../interfaces/mercadopago.interface";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  constructor(private secureService: SecureService) {
  }
  createPreference(itemList: Item[], companyId: string | undefined, orderId: number | undefined): Observable<Preference> {
    return this.secureService.post( `/mercadopago/create-preference?companyId=${companyId}&orderId=${orderId}`, itemList)
  }

}
