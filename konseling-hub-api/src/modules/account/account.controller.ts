import { Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('register')
  async register(): Promise<{ message: string }> {
    return { message: 'Register Account' };
  }
}
