import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable} from "rxjs";
import {SecureService} from "../utils/secure.service";
import {ClientOrderResponse, CreateClientOrder} from "../interfaces/order.interface";
import {HttpParams} from "@angular/common/http";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private secureService: SecureService) {
  }
  findAllbyUserId(): Observable<ClientOrderResponse[]> {
    return this.secureService.get( `/order/client-email`)
  }

  createOrder(clientOrder: CreateClientOrder): Observable<ClientOrderResponse> {
    return this.secureService.post( `/order`, clientOrder)
  }

  activateOrder(orderId: string): Observable<ClientOrderResponse> {
    let params: HttpParams = new HttpParams({ fromObject: { active: true } });
    return this.secureService.put( `/order/active/${orderId}`, params)
  }

}
