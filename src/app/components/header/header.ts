import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, SplitButtonModule, ToastModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  menu: MenuItem[] | undefined;
  userOptions: MenuItem[] | undefined;

  ngOnInit(): void {
    this.menu = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Products',
        icon: 'pi pi-box',
        items: [
          {
            label: 'Lista',
            icon: 'pi pi-list',
            command: () => {
              console.log('Lista clicked');
            },
          },
          {
            label: 'Add New',
            icon: 'pi pi-plus',
            command: () => {
              console.log('Add New clicked');
            },
          },
        ],
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        disabled: true,
      },
    ];

    this.userOptions = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          alert('Logout Effettuato!');
        },
      },
    ];
  }
  // Funzione per il tasto principale dello SplitButton
  goToProfile() {
    console.log('Navigazione al profilo...');
  }
}
