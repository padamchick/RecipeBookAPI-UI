import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserAccount } from '../../auth/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMe(): Observable<UserAccount> {
    return this.http.get<UserAccount>(`${this.apiUrl}/accounts/me`)
  }

  updateAccount(body) {
    return this.http.patch(`${this.apiUrl}/accounts`, body)
  }
}
