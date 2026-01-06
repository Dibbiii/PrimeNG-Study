import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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

  departuresFrom = [
    { name: 'New York', code: 'NYC' },
    { name: 'London', code: 'LON' },
    { name: 'Paris', code: 'PAR' },
  ];

  arrivalsTo = [
    { name: 'New York', code: 'NYC' },
    { name: 'London', code: 'LON' },
    { name: 'Paris', code: 'PAR' },
  ];

  arrivalsDeparturesValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const departures = formGroup.get('departures')?.value;
      const arrivals = formGroup.get('arrivals')?.value;

      if (!departures || !arrivals) {
        return null;
      }

      if (departures.code === arrivals.code) {
        return { sameCity: true };
      }

      return null;
    };
  }

  flightForm = this.fb.group(
    {
      departures: [null, Validators.required],
      arrivals: [null, Validators.required],
      dates: [null, Validators.required],
      passengers: [1, [Validators.required, Validators.min(1)]],
    },
    {
      validators: this.arrivalsDeparturesValidator(),
    },
  );

  onSubmit() {
    if (this.flightForm.valid) {
      alert('Form submitted!');
      console.log(this.flightForm.value);
    }
  }
}
