import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersFormComponent } from './components/form/users-form.component';
import { UsersListComponent } from './components/list/users-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    UsersFormComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule
  ]
})
export class UsersModule { }
