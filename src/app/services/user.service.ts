import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateUserRequest,
  CreateUserResponse,
  LoginUserRequest,
  LoginUserResponse,
  ProfileData
} from "../interfaces/user.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, tap} from "rxjs";
import {SecureService} from "../utils/secure.service";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private secureService: SecureService) {
  }

   login(loginUser: LoginUserRequest): Observable<LoginUserResponse> {
    return this.secureService.post('/user/login', loginUser)
  }

  createUser(loginUser: CreateUserRequest): Observable<CreateUserResponse> {
    return this.secureService.post('/user/register', loginUser)
  }

  validateToken(): Observable<boolean> {
    return this.secureService.get('/user/validate-token');
  }

  getCompanyData(): Observable<ProfileData> {
    return this.secureService.get('/user/company-data');
  }

  updateCompanyData(profileData: ProfileData): Observable<ProfileData>{
    return this.secureService.patch('/user/company-data',profileData);
  }

}
