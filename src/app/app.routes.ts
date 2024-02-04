import {Route, Routes, UrlSegment} from '@angular/router';
import {TokenGuard} from "./guards/token.guard";
import {inject} from "@angular/core";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage),
    canMatch: [(route: Route, segments: UrlSegment[])=> inject(TokenGuard).canMatch()]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage),
    canMatch: [(route: Route, segments: UrlSegment[])=> inject(TokenGuard).canMatch()]
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders.page').then( m => m.OrdersPage),
    canMatch: [(route: Route, segments: UrlSegment[])=> inject(TokenGuard).canMatch()]
  },
  {
    path: 'scanQr',
    loadComponent: () => import('./pages/qr-scanner/qr-scanner.page').then( m => m.QrScannerPage),
    canMatch: [(route: Route, segments: UrlSegment[])=> inject(TokenGuard).canMatch()]
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
  {
    path: 'page-not-found',
    loadComponent: () => import('./pages/page-not-found/page-not-found.page').then( m => m.PageNotFoundPage)
  },


];
