import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TreeModule, TreeNodeSelectEvent } from 'primeng/tree';
import { StyleClassModule } from 'primeng/styleclass';
import { CardModule } from 'primeng/card';
import { TreeNode } from 'primeng/api';
import { ORGANIZATION_DATA } from '../../data/organization-data';
import { Permission } from '../../interfaces/permission-interface';
import { PickListModule } from 'primeng/picklist';

@Component({
  selector: 'app-admin-dashboard',
  imports: [TreeModule, ButtonModule, StyleClassModule, CardModule, PickListModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
  files = signal<TreeNode[]>(ORGANIZATION_DATA);
  selectedNode = signal<TreeNode | null>(null);
  onNodeSelect(event: TreeNodeSelectEvent) {
    console.log(event.node);
    this.selectedNode.set(event.node);
    // resetPermissionsForUser(event.node.data.id);
  }

  sourcePermissions = signal<Permission[]>([
    { id: 'u_read', name: 'User Read', description: 'Vedere lista utenti' },
    { id: 'u_write', name: 'User Write', description: 'Creare/Modificare utenti' },
    { id: 'u_delete', name: 'User Delete', description: 'Eliminare utenti' },
    { id: 'f_read', name: 'File Read', description: 'Scaricare file' },
    { id: 'f_upload', name: 'File Upload', description: 'Caricare nuovi file' },
    { id: 's_admin', name: 'System Admin', description: 'Accesso completo al sistema' },
  ]);

  // Il target parte vuoto (nessun permesso assegnato)
  targetPermissions = signal<Permission[]>([]);

  onSaveClicked() {
    const selectedUser = this.selectedNode();

    if (!selectedUser) {
      console.warn('⚠️ Nessun utente selezionato');
      return;
    }

    const targetPermissions = this.targetPermissions();

    const permissionAssigned = {
      targetPermissions: targetPermissions.map((perm) => perm.id),

      // "?" si chiama optional chaining operator -> serve a accedere in sicurezza a proprietà di un oggetto che potrebbe essere `null` o `undefined`
      // // Senza "?" se selectedUser fosse null darebbe errore dicendo che non riesce a leggere property of null. Mentre co n "?" ritorna semplicemente 'N/A'
      userName: selectedUser?.label || 'N/A',

      //Se selectedUser è null restituisce undefined
      //Se selectedUser esiste ma data è null restituisce undefined
      //Se entrambi esistono restituisce id
      //Se il risultato è undefined restituisce null
      userId: selectedUser?.data?.id || null,
      permissionDetails: targetPermissions.map((perm) => ({
        id: perm.id,
        name: perm.name,
        description: perm.description,
      })),
    };
    console.log('Permessi Assegnati: ', JSON.stringify(permissionAssigned, null, 2));
    //Perchè null, 2
    //La sintassi di JSON.stringify() è JSON.stringify(value, replacer, space)
    //Value = permissionAssigned -> oggetto da convertire in JSON
    //Replacer = null
    //Space 2 -> lascia 2 spazi per migliorare la leggibilità
    console.table(permissionAssigned);
    alert('Json stampato in console');
  }
}
