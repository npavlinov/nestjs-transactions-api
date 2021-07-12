import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async makeTransaction(@Body() transaction: Transaction) {
    const comission = await this.transactionsService.calculateComission(
      transaction,
    );
    return {
      amount: comission,
      currency: 'EUR',
    };
  }
}
