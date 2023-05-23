import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit, OnDestroy {
  @Input() set displayDialogAction(value: number) {
    if (value)
      this.displayDialog = true
  }
  @Output() userFormData: EventEmitter<IUser> = new EventEmitter();
  displayDialog!: boolean;
  formGroup!: FormGroup;
  dispatch: Function;
  submitted: boolean = false;
  users!: Array<IUser>;

  accessLevel: string[] = ['admin', 'support', 'designer', 'user', 'developer'];

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<UsersFormComponent>,
  ) {
    this.dispatch = this.defineUser;
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.formGroup.reset();
  }

  private createForm() {
    this.formGroup = this.fb.group({
      id: [null],
      accessLevel: [null, Validators.required],
      status: [null, Validators.required],
      dateOfRegistration: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  public saveUser() {
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.dispatch();
      this.formGroup.reset();
      this.userFormData.emit();
    }
  }

  public hideDialog() {
    this.formGroup.reset();
    this.dialogRef.close();
    this.submitted = false;
  }

  private defineUser() {
    this.usersService.addUser(this.formGroup.value);
    this.displayDialog = false;
  }

}
