import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  handshake(): string {
    return 'Server is up!';
  }
}
