import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

export const ColorPalette = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#B1DDF0',  
      100: '#B1DDF0',
      200: '#68EDEB', 
      300: '#68EDBF', 
      400: '#68C5ED', 
      500: '#6871ED', // COLORE AZIONE PRINCIPALE (Palette Deep Blue)
      600: '#689BED', 
      700: '#6871ED',
      800: '#4b5563', 
      900: '#000000', 
      950: '#000000', 
      1000: '#000000', // TITOLI
      1100: '#B1DDF0', // SIDEBAR BG
      1200: '#B1DDF0', // MENU BG
      1300: '#000000', // MENU TEXT COLOR
      1400: '#6871ED', // MENU ACTIVE TEXT COLOR
      1500: '#ffffff', // BODY BG
    },
    // Definiamo anche il Secondary usando l'azzurro cielo della palette
    secondary: {
      50: '#B1DDF0',
      500: '#68C5ED',
      700: '#689BED',
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
