import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Transaction } from './entities/transaction.entity';
import { users } from '../../db/users';
import {
  verifyTransactionsMonth,
  TURNOVER_DISCOUNT_COMISSION,
  DEFAULT_TRANSCATION_PRICE,
  MIN_TRANSACTION_PRICE,
  MIN_TURNOVER_DISCOUNT,
} from '../utils';

@Injectable()
export class TransactionsService {
  create(transaction: Transaction): number {
    if (!users[transaction.client_id]) {
      users[transaction.client_id] = {
        transactions: [transaction],
      };
    }
    return users[transaction.client_id].transactions.push(transaction);
  }

  getClientTurnoverForMonth(client_id): number {
    return users[client_id].transactions.reduce((acc, curr) => {
      if (verifyTransactionsMonth(curr)) return acc + Number(curr.amount);
      return acc;
    }, 0);
  }

  async calculateComission(transaction: Transaction) {
    const { client_id, currency, amount } = transaction;

    const exchangeRate = await this.getExchangeRate(currency);
    const amountInEuro = Number(amount) / Number(exchangeRate);
    this.create({ ...transaction, amount: amountInEuro.toString() });

    if (this.getClientTurnoverForMonth(client_id) >= MIN_TURNOVER_DISCOUNT) {
      return TURNOVER_DISCOUNT_COMISSION;
    }

    if (users[client_id].transactionPrice) {
      return users[client_id].transactionPrice;
    }

    if (currency === 'EUR') {
      return Math.max(
        DEFAULT_TRANSCATION_PRICE * Number(amount),
        MIN_TRANSACTION_PRICE,
      );
    }

    return Math.max((5 / 1000) * amountInEuro, MIN_TRANSACTION_PRICE);
  }

  async getExchangeRate(currencyCode = 'EUR') {
    const exchangeRatesReq: AxiosResponse = await axios.get(
      'https://api.exchangerate.host/2021-01-01',
    );
    return exchangeRatesReq.data.rates[currencyCode];
  }
}
