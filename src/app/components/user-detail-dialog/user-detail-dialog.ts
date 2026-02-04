import { Component, inject, OnInit, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from '../../interfaces/user-interface';
import { Post } from '../../interfaces/post-interface';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-user-detail-dialog',
  standalone: true,
  imports: [ButtonModule, CommonModule, ProgressSpinnerModule, DividerModule, CardModule],
  templateUrl: './user-detail-dialog.html',
  styleUrl: './user-detail-dialog.scss',
})
export class UserDetailDialog implements OnInit {
  config = inject(DynamicDialogConfig); //DynamicDialogConfig per leggere i dati passati dal padre
  ref = inject(DynamicDialogRef); //DynamicDialogRef per controllare la finestra (chiudere o passare dati indietro)
  apiService = inject(ApiService); // Inietto il servizio API (getUserPosts)

  // Signals per gestire lo stato
  posts = signal<Post[]>([]);
  loadingPosts = signal<boolean>(false);
  errorPosts = signal<string | null>(null);

  ngOnInit(): void {
    // Carico i post appena il dialog si apre
    this.loadUserPosts();
  }

  loadUserPosts(): void {
    const userId = this.getUser().id;
    this.loadingPosts.set(true);
    this.errorPosts.set(null);

    this.apiService.getUserPosts(userId).subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.loadingPosts.set(false);
      },
      error: (error) => {
        console.error('Errore nel caricamento dei post:', error);
        this.errorPosts.set('Impossibile caricare i post');
        this.loadingPosts.set(false);
      },
    });
  }

  getUser(): User {
    return this.config.data.user; //'data' è l'oggetto passato dal padre
  }

  close() {
    this.ref.close();
  }

  save() {
    this.ref.close({ success: true, action: 'saved' });
  }
}
