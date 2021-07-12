import { User } from 'src/transactions/entities/user.entity';

export const users: { [key: number]: User } = {
  42: {
    transactionPrice: 0.05,
    transactions: [
      {
        date: '2021-01-01',
        amount: '100.40',
        currency: 'USD',
        client_id: 42,
      },
      {
        date: '2021-01-02',
        amount: '100.40',
        currency: 'USD',
        client_id: 42,
      },
    ],
  },
};
