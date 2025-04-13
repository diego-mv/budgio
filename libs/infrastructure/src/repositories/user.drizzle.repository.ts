import { IUserRepository } from '@domain';

export class UserDrizzleRepository implements IUserRepository {
  async getById(id: string): Promise<unknown> {
    console.log(id);
    return 0;
  }
}
