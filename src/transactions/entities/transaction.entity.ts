import { IsNotEmpty, IsNumber, IsNumberString, Matches } from 'class-validator';

export class Transaction {
  @Matches(/[0-9]{4}(-[0-9]{2}){2}/)
  date: string;
  @IsNumberString()
  amount: string;
  @IsNotEmpty()
  currency: string;
  @IsNumber()
  client_id: number;
}
