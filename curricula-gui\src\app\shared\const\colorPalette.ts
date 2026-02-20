import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

export const ColorPalette = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#000000',  // Testo nero per tutto
      100: '#000000',
      200: '#000000', 
      300: '#000000', 
      400: '#000000', 
      500: '#000000', // Testo principale nero
      600: '#000000', 
      700: '#000000',
      800: '#000000', 
      900: '#000000', 
      950: '#000000', 
      1000: '#000000', // TITOLI
      1100: '#B1DDF0', // SIDEBAR BG
      1200: '#B1DDF0', // MENU BG
      1300: '#000000', // MENU TEXT COLOR
      1400: '#000000', // MENU ACTIVE TEXT COLOR (nero anche quando attivo)
      1500: '#ffffff', // BODY BG
    },
    // INFO diventa il colore d'azione (blu della palette)
    info: {
      50: '#B1DDF0',  
      100: '#B1DDF0',
      200: '#68EDEB', 
      300: '#68EDBF', 
      400: '#68C5ED', 
      500: '#6871ED', // COLORE AZIONE PRINCIPALE (Palette Deep Blue)
      600: '#689BED', 
      700: '#6871ED',
    },
    colorScheme: {
      light: {
        text: {
          color: '#000000',
          mutedColor: '#4b5563',
        },
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          900: '#000000',
        }
      }
    }
  },
  colors: {
    surface: '#ffffff',
    surfaceCard: '#ffffff',
    textColor: '#000000',
    borderColor: '#e2e8f0',
    focusRingColor: '#6871ED',
  },
});