import { Transaction } from './transaction.entity';

export class User {
  transactionPrice?: number;
  transactions: Transaction[];
}
