import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-flight-search-component',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    Select,
    DatePicker,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './flight-search-component.html',
  styleUrl: './flight-search-component.scss',
})
export class FlightSearchComponent {
  private fb = inject(FormBuilder);

  cities = signal([
    { name: 'New York', code: 'NYC' },
    { name: 'London', code: 'LON' },
    { name: 'Paris', code: 'PAR' },
  ]);

  selectedDeparture = signal<{ name: string; code: string } | null>(null);
  arrivalsList = computed(() => {
    const departure = this.selectedDeparture();
    if (!departure) {
      return this.cities();
    }
    return this.cities().filter((c) => c.code !== departure.code);
  });

  flightForm = this.fb.group({
    departures: [null, Validators.required],
    arrivals: [null, Validators.required],
    dates: [null, Validators.required],
    passengers: [1, [Validators.required, Validators.min(1)]],
  });

  constructor() {
    this.flightForm.get('departures')?.valueChanges.subscribe((city) => {
      this.selectedDeparture.set(city);
    });
  }

  onSubmit() {
    if (this.flightForm.valid) {
      alert('Form submitted!');
      console.log(this.flightForm.value);
    }
  }
}
