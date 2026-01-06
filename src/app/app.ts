import { Component, OnInit, inject } from '@angular/core';
import { PrimeNG } from 'primeng/config'; // Il nuovo cuore della v21
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <div class="p-5 flex flex-column align-items-center gap-3">
      <h1>Benvenuta nel corso PrimeNG v21</h1>
      <p-button label="Cliccami" icon="pi pi-check" (onClick)="testRipple()"></p-button>
    </div>
  `,
})
export class App implements OnInit {
  // Injection del nuovo servizio v21
  private primeng = inject(PrimeNG);

  ngOnInit() {
    // Configurazione runtime moderna
    this.primeng.ripple.set(true); // Uso dei Signals se supportato
  }

  testRipple() {
    console.log('Ripple attivo!');
  }
}
