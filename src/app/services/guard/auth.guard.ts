import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const serviceAuth = inject(AuthService)
  const router = inject(Router)

  if(serviceAuth.isLoggedIn()){
    return true;
  }
    router.navigateByUrl("/login")
    return false;
};
