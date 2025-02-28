import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const cloneReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    }
  });

  return next(cloneReq);
};
