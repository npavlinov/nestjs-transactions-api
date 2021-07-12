import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { MIN_TRANSACTION_PRICE } from '../utils';
import { Transaction } from './entities/transaction.entity';
describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it(`return ${MIN_TRANSACTION_PRICE} when only default rule applies`, async () => {
    const transaction: Transaction = {
      date: '2021-06-01',
      amount: '100',
      currency: 'EUR',
      client_id: 4,
    };
    expect(await service.calculateComission(transaction)).toEqual(
      Number(transaction.amount) * 0.05,
    );
  });
});
