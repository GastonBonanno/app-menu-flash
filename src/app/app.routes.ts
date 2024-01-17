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
    // canMatch: [(route: Route, segments: UrlSegment[])=> inject(TokenGuard).canMatch()]
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
