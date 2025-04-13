import { IUserRepository } from '@domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private userRepository: IUserRepository) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
