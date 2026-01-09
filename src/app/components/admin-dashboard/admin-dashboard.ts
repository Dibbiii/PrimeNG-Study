import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TreeModule, TreeNodeSelectEvent } from 'primeng/tree';
import { StyleClassModule } from 'primeng/styleclass';
import { CardModule } from 'primeng/card';
import { TreeNode } from 'primeng/api';
import { ORGANIZATION_DATA } from '../../data/organization-data';

@Component({
  selector: 'app-admin-dashboard',
  imports: [TreeModule, ButtonModule, StyleClassModule, CardModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
  files = signal<TreeNode[]>(ORGANIZATION_DATA);
  selectedNode = signal<TreeNode | null>(null);
  onNodeSelect(event: TreeNodeSelectEvent) {
    console.log(event.node);
    this.selectedNode.set(event.node);
  }
}
