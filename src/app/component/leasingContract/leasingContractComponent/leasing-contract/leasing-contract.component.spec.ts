/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideRouter } from '@angular/router'
import { DatePipe } from '@angular/common'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { setupContract } from 'src/app/common/setup-testdata'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { LeasingContractComponent } from './leasing-contract.component'

describe('leasingComponent', () => {
  let component: LeasingContractComponent
  let fixture: ComponentFixture<LeasingContractComponent>
  let el: DebugElement
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeasingContractComponent, BrowserAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),

        provideRouter([]), DatePipe]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LeasingContractComponent)
        component = fixture.componentInstance
        el = fixture.debugElement
        fixture.detectChanges()
      })
  })
  it('should create a component', () => {
    expect(component).toBeTruthy()
  })
  it('should display contract list', () => {
    component.contract$ = setupContract()
    fixture.detectChanges()
    const vehicle = el.queryAll(By.css('.contract-card'))
    expect(vehicle).toBeTruthy('Could not find vehicle')
    expect(vehicle.length).toBe(1)
  })
})
