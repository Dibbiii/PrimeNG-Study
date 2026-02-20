import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [
    FormsModule,
    SelectModule,
    RadioButtonModule,
    CheckboxModule,
    ToggleSwitchModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './job-details.html',
  styleUrl: './job-details.scss',
})
export class JobDetails {
  // Remote Policy
  remotePolicy: string | null = null; 
  remoteRequirement: string | null = null;
  wfhAllowed: boolean = false;
  
  // Locations
  selectedRegion: string | null = null;
  selectedCity: string | null = null;
  
  regionOptions = [
    { label: 'Italy', value: 'Italy' },
    { label: 'European Union', value: 'European Union' },
    { label: 'Worldwide', value: 'Worldwide'}
  ];
  
  cityOptions = [
    { label: 'Bologna, Italy', value: 'Bologna, Italy' },
    { label: 'Milan, Italy', value: 'Milan, Italy' },
    { label: 'Rome, Italy', value: 'Rome, Italy' }
  ];

  // Compensation
  currency: string = 'EUR';
  minSalary: number | null = null;
  maxSalary: number | null = null;
  salaryPeriod: string = 'Annual';
  showSalary: boolean = false;
  
  currencyOptions = [
    { label: '€ EUR', value: 'EUR' },
    { label: '$ USD', value: 'USD' }
  ];
  
  periodOptions = [
    { label: 'Annual', value: 'Annual' },
    { label: 'Monthly', value: 'Monthly' }
  ];

  // Equity
  minEquity: number | null = null;
  maxEquity: number | null = null;
  showEquity: boolean = false;

  // Employment
  employmentType: string | null = null;
  employmentTypeOptions = [
    { label: 'Full-time', value: 'Full-time' },
    { label: 'Part-time', value: 'Part-time' },
    { label: 'Contract', value: 'Contract' },
    { label: 'Internship', value: 'Internship' },
    { label: 'Temporary', value: 'Temporary' }
  ];

  // Visa
  visaSponsorship: string | null = null;
}
