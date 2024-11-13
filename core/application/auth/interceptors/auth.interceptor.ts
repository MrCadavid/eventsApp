import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@env/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem(environment.tokenKey);
  const authReq = token ?
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }) :
    req;

  return next(authReq);
};
