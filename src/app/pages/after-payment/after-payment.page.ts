import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ClientOrderResponse, OrderItem} from "../../interfaces/order.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-after-payment',
  templateUrl: './after-payment.page.html',
  styleUrls: ['./after-payment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AfterPaymentPage implements OnInit {

  clientOrder: ClientOrderResponse | undefined = undefined

  constructor(private route: ActivatedRoute, private orderService: OrderService,) { }

  ngOnInit() {
    const status = this.route.snapshot.queryParamMap.get('status');
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    console.log('status: ', status)
    console.log('orderId: ', orderId)
    if(orderId && status && status === 'approved') {
      this.activateOrder(orderId).subscribe({
        next: (resp: ClientOrderResponse) => {
          this.clientOrder = resp
        },
        error: () => {
          //Muestro error en el pago
        }

      })
    } else {
      //Muestro error en el pago
    }
  }

  private activateOrder(orderId: string): Observable<ClientOrderResponse> {
      return this.orderService.activateOrder(orderId)
  }
}
