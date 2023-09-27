/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideRouter } from '@angular/router'
import { DatePipe } from '@angular/common'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { setupVehicle } from 'src/app/common/setup-testdata'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { VehicleComponent } from './vehicle-component.component'

describe('vehicleComponent', () => {
  let component: VehicleComponent
  let fixture: ComponentFixture<VehicleComponent>
  let el: DebugElement
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleComponent, BrowserAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),

        provideRouter([]), DatePipe]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VehicleComponent)
        component = fixture.componentInstance
        el = fixture.debugElement
        fixture.detectChanges()
      })
  })
  it('should create a component', () => {
    expect(component).toBeTruthy()
  })
  it('should display vehicle list', () => {
    component.vehicle$ = setupVehicle()
    fixture.detectChanges()
    console.log(el.nativeElement.outerHTML)
    const vehicle = el.queryAll(By.css('.vehicle-card'))
    expect(vehicle).toBeTruthy('Could not find vehicle')
    expect(vehicle.length).toBe(1)
  })
})
