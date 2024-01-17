import {Injectable} from '@angular/core';
import {CanMatchFn, UrlTree} from '@angular/router';
import {map, mergeMap, Observable, of, tap} from 'rxjs';
import {UserService} from "../services/user.service";
import {LoginUserResponse} from "../interfaces/user.interface";
import {TokenService} from "../services/token.service";
import {NavController} from "@ionic/angular";
import {isValid} from "ionicons/dist/types/components/icon/validate";

@Injectable({
  providedIn: 'root'
})
export class TokenGuard {

  constructor( private userService: UserService, private tokenService: TokenService, private navCtrl: NavController) { }



  canMatch(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.validateToken().pipe(
      map(isValid => isValid),
      tap( isValid => {
        if(!isValid) this.navCtrl.navigateRoot('/login', {animated: true}).then()
      })
    )
  }
}
