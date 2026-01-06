import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-user-form-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    Select,
    DatePicker,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.scss',
})
export class UserFormComponent {
  private fb = inject(FormBuilder);
  
  roles = [ //roles` è un **array di opzioni** che popola il dropdown/select del ruolo nel form
    { name: 'Sviluppatore', code: 'DEV' },
    { name: 'Architect', code: 'ARC' },
    { name: 'Manager', code: 'PM' }
  ];

  userForm = this.fb.group({
    username: ['', Validators.required],
    salary: [null as number | null, [Validators.required, Validators.min(1000)]],
    role: [null, Validators.required],
    availability: [null]
  });

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Dati Form:', this.userForm.value);
      // Notare che 'role' sarà l'intero oggetto {name:..., code:...}
      // 'availability' sarà un array di Date [Start, End]
    }
  }
}
