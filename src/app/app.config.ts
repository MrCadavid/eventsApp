import { provideHttpClient, withFetch,withInterceptors } from '@angular/common/http';
import { ApplicationConfig,provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {AuthGateway} from '@core/domain/auth/gateways/auth-gateway';
import {authInterceptor } from '@core/application/auth/interceptors/auth.interceptor';
import {AuthService} from '@core/infrastructure/auth/repositories/auth-service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(),withInterceptors([authInterceptor])),
    provideAnimations(),
    {
      provide:AuthGateway, useClass:AuthService
    },
  ],
};
