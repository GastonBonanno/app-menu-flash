import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable} from "rxjs";
import {MenuResponse} from "../interfaces/menu.interface";
import {SecureService} from "../utils/secure.service";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private secureService: SecureService) {
  }

  getMenuById(menuId: string | undefined): Observable<MenuResponse> {
    return this.secureService.get('/company-menu/' + menuId);
  }
}
