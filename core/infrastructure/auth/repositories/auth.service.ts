import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { AuthGateway } from '@domain/auth/gateways/auth.gateway';
import { User } from '@domain/auth/models/user.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthGateway {

  login(email: string): Observable<User> {
    return of<User>({id:"1", email, token:"6734bb62", role:"administrator", name:"ryan"})
  }
  
  logout(): Observable<void> {
    return of<void>()
  }
}
