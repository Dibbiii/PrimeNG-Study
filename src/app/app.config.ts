import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura'; // Importiamo il tema Aura
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Abilitiamo le animazioni (essenziali per dropdown, dialog, ecc.)
    // Usiamo 'Async' per non bloccare il caricamento iniziale della pagina (Lazy loading delle animazioni)
    provideAnimationsAsync(),
    //provideAnimations(),

    provideRouter(routes),

    provideHttpClient(withFetch()),
    // 2. Configuriamo PrimeNG
    providePrimeNG({
      // Gestione del Tema (Styled Mode)
      theme: {
        preset: Aura, // Usiamo il preset Aura
        options: {
          darkModeSelector: '.my-app-dark', // Opzionale: selettore per la dark mode
          cssLayer: {
            name: 'primeng', // Importante per l'ordine di caricamento CSS
            order: 'tailwind-base, primeng, tailwind-utilities', // Se usi Tailwind, definisce chi vince
          },
        },
      },
      // Configurazioni Globali
      ripple: true, // Attiva l'effetto onda sui click
      inputStyle: 'filled', // Stile dei campi input: 'outlined' (vuoti) o 'filled' (con sfondo grigino)
      zIndex: {
        modal: 1100, // Livello base per i dialoghi
        overlay: 1000, // Livello base per i menu a tendina
        menu: 1000, // Livello base per i menu
        tooltip: 1200, // Livello base per i suggerimenti
      },
    }),
  ],
};
