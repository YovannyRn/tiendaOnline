import {Routes} from '@angular/router';

import {LayoutComponent} from './cliente/layout/layout.component';
import {LayoutBackComponent} from './backoffice/layout/layout.component';

import {HomeComponent} from './cliente/home/home.component';
import {LoginComponent} from './cliente/login/login.component';
import {RegistroComponent} from './cliente/registro/registro.component';
import {TiendaComponent} from './cliente/tienda/tienda.component';
import {ControlPanelComponent} from './backoffice/control-panel/control-panel.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { PerfilComponent } from './backoffice/perfil/perfil.component';
import { authGuard } from './services/guards/auth.guard';
import { publicGuard } from './services/guards/public.guard';
import { PructosComponent } from './backoffice/pructos/pructos.component';
import { PoliticaPrivacidadComponent } from './cliente/privacidadSeguridad/politica-privacidad/politica-privacidad.component';
import { roleGuard } from './services/guards/role-guard.guard';

export const routes: Routes = [

  // cliente
  // localhost:4200 -> www.ejemplo.com
  {
    path: "", component: LayoutComponent, children: [ // -> www.ejemplo.com
      {path: "", component: HomeComponent}, // -> www.ejemplo.com
      {path: "login",canActivate:[publicGuard], component: LoginComponent}, // -> www.ejemplo.com/login
      {path: "registro",canActivate:[publicGuard], component: RegistroComponent}, // -> www.ejemplo.com/registro
      {path: "tienda", component: TiendaComponent}, // www.ejemplo.com/tienda
      
    ]
  },
  // backoffice
  // www.ejemplo.com/app
  {
    path: "app",canActivate: [authGuard, roleGuard], component: LayoutBackComponent, children: [ // -> www.ejemplo.com/app
      // www.ejemplo.com/app -> no hay parámetros después del app, por lo tanto angular buscar dentro de esta sección de children el path que esté vacío ""

      {path: "", redirectTo: "control-panel", pathMatch: "full"}, // -> www.ejemplo.com/app
      {path: "control-panel", component: ControlPanelComponent}, // -> www.ejemplo.com/app/control-panel
      {path: "perfil", component: PerfilComponent}, // -> www.ejemplo.com/app/perfil
      {path: "productos", component: PructosComponent}, // -> www.ejemplo.com/app/productos
      {path: "privacidad", component: PoliticaPrivacidadComponent}, // www.ejemplo.com/privacidad
    ]
  },

  // Si el usuario introduce una url que no existe en la parte superior
  {path: "**", component: PageNotFoundComponent},
];
















