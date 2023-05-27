import { SelectionModel } from '@angular/cdk/collections';
import { identifierName } from '@angular/compiler';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IDialog } from '../../models/dialog.model';
import { IUser } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { UsersFormComponent } from '../form/users-form.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, AfterViewInit {
  user!: IUser | null;
  displayDialog: number = 0;
  data!: IDialog;
  displayedColumns: string[] = ['select', 'id', 'registrationDate', 'status', 'accessLevel', 'email', 'manageUsers'];
  dataSource!: MatTableDataSource<IUser>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection = new SelectionModel<IUser>(true, []);

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private loadUsers() {
    let response = this.usersService.users();
    this.dataSource = new MatTableDataSource<IUser>(response);
  }

  public addUserDialog(): void {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      disableClose: true,
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers();
    });
    this.user = null;
  }

  filterUsers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateUser(user: IUser) {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      disableClose: true,
      width: '450px',
      data: {
        id: user.id,
        email: user.email,
        accessLevel: user.accessLevel,
        registrationDate: user.registrationDate,
        status: user.status
      }
    });
    dialogRef.afterClosed().subscribe(()=> {
      this.loadUsers();
    });
  }

  deleteUser(user: IUser) {
    this.usersService.deleteUser(user);
    this.loadUsers();
  }

  deleteUsers(selection: Array<IUser>) {
    for(let item of selection){
      this.usersService.deleteUser(item);
    }
    this.loadUsers();
  }

  getFormData() {
    this.loadUsers();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: IUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}


