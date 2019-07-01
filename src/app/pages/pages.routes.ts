import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginGuardGuard } from '../services/service.index';
import { CuentasComponent } from './cuentas/cuentas/cuentas.component';
import { ClientesComponent } from './cuentas/clientes/clientes.component';
import { TransaccionesComponent } from './cuentas/transacciones/transacciones.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios'} },
            { path: 'cuentas', component: CuentasComponent, data: { titulo: 'Mantenimiento de Cuentas'} },
            { path: 'clientes', component: ClientesComponent, data: { titulo: 'Mantenimiento de Clientes'} },
            { path: 'transacciones', component: TransaccionesComponent, data: { titulo: 'Mantenimiento de Transacciones'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];



export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
