import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api'; // <--- FONDAMENTALE
import { MenubarModule } from 'primeng/menubar'; // O 'primeng/menubar'
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast'; // Per feedback

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MenubarModule, SplitButtonModule, ToastModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar implements OnInit { //implement OnInit perchè così siamo obbligati a mettere ngOnInit
  mainMenu: MenuItem[] | undefined;
  saveOptions: MenuItem[] | undefined;

  ngOnInit() { //ngOnInit viene svolta quando angular ha finito di inizializzare il componente
    // Configurazione Menu Principale
    this.mainMenu = [
      {
        label: 'File',
        icon: 'pi pi-file',
        items: [
          // Sottomenu
          { label: 'Nuovo', icon: 'pi pi-plus' },
          { label: 'Apri', icon: 'pi pi-folder-open' },
        ],
      },
      {
        label: 'Utenti',
        icon: 'pi pi-users',
        routerLink: ['/users'], // Navigazione
      },
    ];

    // Configurazione SplitButton
    this.saveOptions = [
      { 
        label: 'Salva con nome', 
        icon: 'pi pi-file-edit', 
        command: () => this.saveAs() 
      },
      { 
        label: 'Salva e Invia', 
        icon: 'pi pi-send', 
        command: () => this.saveAndSend() 
      },
    ];
  }

  save() {
    console.log('Salvataggio standard...');
  }
  saveAs() {
    console.log('Save As...');
  }
  saveAndSend() {
    console.log('Sending...');
  }
}
