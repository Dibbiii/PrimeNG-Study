export interface Table {
  first: number;
  rows: number;
  sortField: string | null;
  sortOrder: number; // 1 = asc, -1 = desc
  filters: { [key: string]: string }; // Oggetto per i filtri (es. { username: 'ale' })
}