import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersFormComponent } from './components/form/users-form.component';
import { UsersListComponent } from './components/list/users-list.component';

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
  ]
})
export class UsersModule { }
