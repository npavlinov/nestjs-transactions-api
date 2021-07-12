import { Transaction } from 'src/transactions/entities/transaction.entity';

export function verifyTransactionsMonth(transaction: Transaction) {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const transactionYear = Number(transaction.date.slice(0, 4));
  const transactionMonth = Number(transaction.date.slice(5, 7));
  return transactionYear === year && transactionMonth === month;
}
