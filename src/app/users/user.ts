import { AbstractUser } from './users.service';
export default class User extends AbstractUser {

  constructor(data: AbstractUser) {
    super();
    Object.assign(this, data);
  }

  hasPermission(permission: number): boolean {
    return this.permissions.includes(permission);
  }
}
