import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable < boolean > | Promise < boolean > | boolean {
    if (typeof window !== 'undefined') {
      const isAuthenticated = localStorage.getItem(environment.tokenKey) !== null;
      if (!isAuthenticated) {
        this.router.navigate(['/auth/login']);
        return false;
      }
      return true;

    }
    return false;

  }
}
