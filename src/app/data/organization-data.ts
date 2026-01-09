import { TreeNode } from 'primeng/api';

export const ORGANIZATION_DATA: TreeNode[] = [
  { // Struttura ricorsiva che p-tree sa srotolare automaticamente
    label: 'CEO - Alessandra',
    expanded: true, // Parte già aperto
    type: 'person',
    styleClass: 'bg-primary-50 text-primary-900 font-bold',
    children: [
      {
        label: 'CTO - PrimeNG Expert',
        expanded: true,
        type: 'person',
        children: [
          {
            label: 'Fronted Team Lead',
            type: 'person',
            children: [
              { label: 'Senior Dev', type: 'person' },
              { label: 'Junior Dev', type: 'person' },
            ],
          },
          {
            label: 'Backend Team Lead',
            type: 'person',
            children: [{ label: 'Java Architect', type: 'person' }],
          },
        ],
      },
      {
        label: 'CFO - Money Manager',
        type: 'person',
        children: [{ label: 'Accountant', type: 'person' }],
      },
    ],
  },
];
