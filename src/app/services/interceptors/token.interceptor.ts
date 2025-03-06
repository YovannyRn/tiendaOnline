import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../auth/token.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  /**
   * a={
   * name = yovanny
   * }
   * 
   * {...a,age:27}
   * 
   * h = {
   * content-type: application/json
   * }
   * 
   * {
   * ...h,
   * 'Authorization': 'Bearer' + accessToken -> if accessToken
   * }
   * 
   */

  const tokenService = inject(TokenService);
  const accessToken = tokenService.getAccessToken();

  const cloneReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      ...(accessToken ? {'Authorization': 'Bearer ' + accessToken} : {})
    }
  });

  return next(cloneReq);
};
