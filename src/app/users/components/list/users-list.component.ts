import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDialog } from '../../models/dialog.model';
import { IUser } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { UsersFormComponent } from '../form/users-form.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  user!: IUser | null;
  displayDialog: number = 0;
  data!: IDialog;
  displayedColumns: string[] =  ['dateOfRegistration', 'status', 'accessLevel', 'email'];
  dataSource : Array<IUser> = [
    { id: 1, dateOfRegistration: new Date(), status: true, accessLevel: 'admin', email: 'user1@g.com' },
    { id: 2, dateOfRegistration: new Date(), status: false, accessLevel: 'user', email: 'user2@g.com' },
    { id: 3, dateOfRegistration: new Date(), status: true, accessLevel: 'support', email: 'user3@g.com' },
    { id: 4, dateOfRegistration: new Date(), status: false, accessLevel: 'designer', email: 'user4@g.com' },
    { id: 5, dateOfRegistration: new Date(), status: false, accessLevel: 'user', email: 'user5@g.com' },
    { id: 6, dateOfRegistration: new Date(), status: true, accessLevel: 'admin', email: 'user6@g.com' },
    { id: 7, dateOfRegistration: new Date(), status: false, accessLevel: 'user', email: 'user6@g.com' },
    { id: 8, dateOfRegistration: new Date(), status: true, accessLevel: 'developer', email: 'user8@g.com' },
  ]

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers() {
    this.dataSource = this.usersService.users();
  }

  addUserDialog(): void {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      width: '450px',
    });
    this.user = null;
    this.displayDialog++;
  }

  getFormData() {
    this.loadUsers();
  }

}

