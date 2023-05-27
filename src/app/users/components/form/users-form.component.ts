import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: IUser
  ) {
    this.dispatch = this.defineUser;
    this.createForm();
  }

  ngOnInit(): void {
    this.loadUserUpdateMode(this.data)
  }

  ngOnDestroy(): void {
    this.formGroup.reset();
  }

  private createForm() {
    this.formGroup = this.fb.group({
      id: [null],
      accessLevel: [null, Validators.required],
      status: [true, Validators.required],
      registrationDate: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  public saveUser() {
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.dispatch();
      this.userFormData.emit();
    }
    this.dialogRef.close();
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

  private loadUserUpdateMode(value: IUser) {
    if(value){
      this.formGroup.patchValue({
        id: value.id,
        email: value.email,
        status: value.status,
        registrationDate: new Date(value.registrationDate),
        accessLevel: value.accessLevel,
      });
      this.dispatch = this.updateUser;
    }
  }

  private updateUser() {
    this.usersService.updateUser(this.formGroup.value);
    this.displayDialog = false;
  }

}
