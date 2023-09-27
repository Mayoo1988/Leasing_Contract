/* eslint-disable @typescript-eslint/promise-function-async */
import { importProvidersFrom } from '@angular/core'
import { AppComponent } from './app/app.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { provideAnimations } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app/app-routing.module'
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser'
import { DatePipe } from '@angular/common'
import { provideRouter } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, MatSnackBarModule, MatDatepickerModule, MatDialog),
    DatePipe,
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter([
      { path: '', loadChildren: () => import('../src/app/routes/customer.route').then(m => m.CUSTOMER_ROUTES) },
      { path: 'customer', loadChildren: () => import('../src/app/routes/customer.route').then(m => m.CUSTOMER_ROUTES) },
      { path: 'vehicle', loadChildren: () => import('../src/app/routes/vehicle.route').then(m => m.VEHICLE_ROUTES) },
      { path: 'leasing', loadChildren: () => import('../src/app/routes/contract.route').then(m => m.CONTRACT_ROUTES) }
    ])
  ]
})
  .catch(err => { console.error(err) })
