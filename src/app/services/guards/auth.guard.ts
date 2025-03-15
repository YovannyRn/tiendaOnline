import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../auth/token.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UseSatateService } from '../auth/use-satate.service';

export const authGuard: CanActivateFn = async(route, state) => {

  const tokenService = inject(TokenService);
  const router = inject(Router);
  const http = inject(HttpClient);
  const useStateService = inject(UseSatateService);
  const accessToken = tokenService.getAccessToken();
  const refreshToken = tokenService.getRefreshToken();

  if (!accessToken){
    router.navigate(['login']);
    return false
  }

  try {
    const response: any =await firstValueFrom(
      http.post(`${environment.apiUrl}/users/check-token`,{
        username: 'yovanny',
        token: accessToken
      })

    )

    const userRole = useStateService.getRole();

    if (userRole === 'CLIENT') {
      
      router.navigate(['']); 
      return false;
    }

    return true;
  }
  catch (error) {
    tokenService.removeToken()
    router.navigate(['login']);
    return false
  }
  return true;
};
