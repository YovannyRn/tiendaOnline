import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UseSatateService } from '../auth/use-satate.service';
 // Asegúrate de importar el servicio

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const useStateService = inject(UseSatateService); 


  const userRole = useStateService.getRole();

  if (userRole === 'CLIENT') {
    router.navigate(['']);
    return false;
  }

  return true;
};