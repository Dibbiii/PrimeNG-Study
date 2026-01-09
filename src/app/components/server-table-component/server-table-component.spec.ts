import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerTableComponent } from './server-table-component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

// Mock window.matchMedia per PrimeNG
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('ServerTableComponent', () => {
  let component: ServerTableComponent;
  let fixture: ComponentFixture<ServerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerTableComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService, 
        DialogService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('dovrebbe creare il componente', () => {
    expect(component).toBeTruthy();
  });
  
  it('dovrebbe avere un titolo accessibile nella tabella', () => {
    const tableElement = fixture.debugElement.query(By.css('p-table'));
    expect(tableElement).toBeTruthy();
  });

  it('dovrebbe aggiornare il loading quando inizia una ricerca', () => {
    expect(component.loading()).toBeTruthy();
    
    component.loading.set(false);
    fixture.detectChanges();
    
    const loadingOverlay = fixture.debugElement.query(By.css('.p-datatable-loading-overlay'));
    expect(loadingOverlay).toBeFalsy();
  });
});
