import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { StateService } from '../services/state-service';


export function withLoading<T>(
  stateService: StateService<T>,
  errorHandler: ErrorHandler
): (source: Observable<T | T[]>) => Observable<T | T[]> {
  stateService.setLoading(true);
  
  return (source: Observable<T | T[]>) =>
    source.pipe(
      finalize(() => stateService.setLoading(false)),
      catchError((error: HttpErrorResponse) => {
        errorHandler.handleError(error);
        return throwError(() => error);
      }),
    );
}