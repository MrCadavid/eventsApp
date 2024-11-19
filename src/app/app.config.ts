import { provideHttpClient,withFetch} from '@angular/common/http';
import { ApplicationConfig,provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {AuthService} from '@infrastructure/auth/repositories/auth.service';
import {AuthGateway} from '@domain/auth/gateways/auth.gateway';

import {EventService} from '@infrastructure/events/repositories/event.service';
import {EventGateway} from '@domain/events/gateways/event.gateway';

import { WebSocketGateway } from '@domain/websocket/gateways/websocket.gateway';
import { WebSocketService } from '@infrastructure/websocket/repositories/websocket.service';
import { routes } from './app.routes';
import { NotificationGateway } from '@domain/notifications/gateways/notification.gateway';
import { NotificationService } from '@infrastructure/websocket/repositories/notifications.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideAnimations(),
    {
      provide:AuthGateway, useClass:AuthService
    },
    {
      provide:EventGateway, useClass:EventService
    },
    {
      provide:WebSocketGateway, useClass:WebSocketService
    },
    {
      provide:NotificationGateway, useClass:NotificationService
    },
  ],
};
