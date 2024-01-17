
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CreateUserRequest, CreateUserResponse, LoginUserRequest, LoginUserResponse} from "../interfaces/user.interface";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, from, map, mergeMap, Observable, tap} from "rxjs";
import {TokenService} from "../services/token.service";
import {FieldValidation} from "../interfaces/validations.interface";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class Validations {

  constructor() {
  }

  validateField(field: string, fieldValidation: FieldValidation){
    if (field != undefined && field.toString().length >= fieldValidation.size)
      fieldValidation.error = `Debe ser menor a ${fieldValidation.size} caracteres`;
    else
      fieldValidation.error =null
  }
}
