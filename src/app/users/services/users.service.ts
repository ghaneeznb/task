import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  private counter: number = JSON.parse(localStorage.getItem("users") || "[]").length;

  public users(): Array<IUser> {
    return JSON.parse(localStorage.getItem("users") || "[]");
  }

  addUser(newUser: IUser) {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    newUser.id = this.counter++;
    users.splice(0, 0, newUser);
    localStorage.setItem("users", JSON.stringify(users));
  }

  deleteUser(user: IUser) {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const index = this.users().findIndex(({ id }) => id === user.id);
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
  }

  updateUser(user: IUser) {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    Object.assign((users.find((x: IUser) => x.id === user.id) || {}), user);
    localStorage.setItem("users", JSON.stringify(users));
  }

}
