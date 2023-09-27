// import { ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
// import { EditCustomerComponent } from './edit-customer.component';
// import { CustomerService } from 'src/app/service/customer.service';
// import { Customer } from '../../../../Model/Customer';
// import { of } from 'rxjs';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { InjectionToken } from '@angular/core';

// // Define the InjectionToken for MatMdcDialogData
// export const MAT_MDC_DIALOG_DATA_MOCK = new InjectionToken<any>('MAT_MDC_DIALOG_DATA_MOCK');

// // Define a mock service for CustomerService using useClass pattern
// class CustomerServiceMock {
//   AddCustomer(data: any) {
//     return of(data);
//   }
// }



// describe('EditCustomerComponent', () => {
//   let component: EditCustomerComponent;
//   let fixture: ComponentFixture<EditCustomerComponent>;
//   let service: CustomerService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [EditCustomerComponent],
//       imports: [ReactiveFormsModule],
//       providers: [
//         {provide: MAT_MDC_DIALOG_DATA_MOCK, useValue: {} },
//         { provide: CustomerService, useClass: CustomerServiceMock },
//         // You might need to provide other dependencies here like MatDialog
//       ],
//     });
//     fixture = TestBed.createComponent(EditCustomerComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     service = TestBed.inject(CustomerService);
//   });

//   it('Unit test for customer post method', fakeAsync(() => {
//     const testpost: Customer[] = [
//       { id: null, firstName: 'ABC', lastName: 'XYZ', birthDate: [1989, 1, 29] },
//     ];

//     const spy = spyOn(service, 'AddCustomer').and.returnValue(of(testpost));

//     component.Saveuser();
//     tick();

//     // Check if the AddCustomer method was called
//     expect(spy).toHaveBeenCalled();

//     // Verify the length of the customer array after Saveuser()
//     expect(component.Saveuser.length).toEqual(1);
//   }));

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
