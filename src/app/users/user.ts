import {AbstractUser} from './users.service';

export default class User extends AbstractUser {

  constructor(data: AbstractUser) {
    super();
    Object.assign(this, data);
  }

  hasPermission(permission: string): boolean {
    if (this.isGertranStaff && this.permissions.includes(permission)) {
      return true;
    }

    return this.permissions.includes(permission);
  }

  hasOneOfPermissions(oneOfPermissions: string[]): boolean {
    if (this.isGertranStaff &&  oneOfPermissions.some(permission => this.permissions.includes(permission))) {
      return true;
    }

    return  oneOfPermissions.some(permission => this.permissions.includes(permission));
  }

  isInsuranceCompany(): boolean {
    return this.customer.some(c => c.insuranceCompany);
  }
}
