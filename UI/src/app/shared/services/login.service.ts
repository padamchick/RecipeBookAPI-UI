import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginService {

  redirectSubject = new Subject<boolean>();

}
