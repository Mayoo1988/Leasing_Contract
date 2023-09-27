/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CustomersComponent } from './customers.component'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideRouter } from '@angular/router'
import { DatePipe } from '@angular/common'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { setupCustomer } from 'src/app/common/setup-testdata'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

describe('customersComponent', () => {
  let component: CustomersComponent
  let fixture: ComponentFixture<CustomersComponent>
  let el: DebugElement
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersComponent, BrowserAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),

        provideRouter([]), DatePipe]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CustomersComponent)
        component = fixture.componentInstance
        el = fixture.debugElement
        fixture.detectChanges()
      })
  })
  it('should create a component', () => {
    expect(component).toBeTruthy()
  })
  it('should display customer list', () => {
    component.customers$ = setupCustomer()
    fixture.detectChanges()
    const customer = el.queryAll(By.css('.customer-card'))
    expect(customer).toBeTruthy('Could not find customer')
    expect(customer.length).toBe(1)
  })
})
