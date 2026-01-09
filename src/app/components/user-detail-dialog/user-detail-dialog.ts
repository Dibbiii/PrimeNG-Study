import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from '../../interfaces/user-interface';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-detail-dialog',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './user-detail-dialog.html',
  styleUrl: './user-detail-dialog.scss',
})
export class UserDetailDialog {
  config = inject(DynamicDialogConfig); //DynamicDialogConfig per leggere i dati passati dal padre

  ref = inject(DynamicDialogRef); //DynamicDialogRef per controllare la finestra (chiudere o passare dati indietro)

  getUser(): User {
    return this.config.data.user; //'data' è l'oggetto passato dal padre 
  }
  
  close(){
    this.ref.close();
  }
  
  save(){
    this.ref.close({ success: true, action: 'saved' });
  }
}
