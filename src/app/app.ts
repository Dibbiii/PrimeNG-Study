import { Component, OnInit, inject } from '@angular/core';
import { PrimeNG } from 'primeng/config'; // Il nuovo cuore della v21
import { ButtonModule } from 'primeng/button';
import { UserFormComponent } from './components/user-form-component/user-form-component';
import { FlightSearchComponent } from './components/flight-search-component/flight-search-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule, UserFormComponent, FlightSearchComponent],
  templateUrl: './app.html',
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
