import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokeHttpInterceptor } from './core/token-http-interceptor';

import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokeHttpInterceptor])),
{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      lang: 'en',
      // providers: [
      //   {
      //     id: GoogleLoginProvider.PROVIDER_ID,
      //     provider: new GoogleLoginProvider(
      //       '438660733238-9q92dbb5p029dr4pe0mviimrlp2h99un.apps.googleusercontent.com',{
      //         oneTapEnabled:false,
      //         prompt:"consent"
      //       }),
      //   },
      // ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }
  ]
};
