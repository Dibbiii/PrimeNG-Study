import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Recupero il token 
  const token = localStorage.getItem('token');

  // Se il token esiste clono la richiesta e aggiungo l'header
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  // Altrimenti procedo senza fare niente (es. per il login)
  return next(req);
};
