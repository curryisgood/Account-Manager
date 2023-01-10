import {
  fixedIncome,
  floatIncome,
  fixedExpense,
  floatExpense,
  sumFixedExpense,
  sumFloatExpense,
  sumFixedIncome,
  sumFloatIncome,
  initSum,
} from '../utiles/category';
import { printMainSummary } from './printSummary';
import { AccountItem } from '../utiles/types/AccountBook';

type Summary = {
  [key: string]: number;
};

type SummaryKey = 'fixedIncome' | 'floatIncome' | 'fixedExpense' | 'floatExpense';

const expenseTable = document.querySelector('#expenseGraph');
const incomeTable = document.querySelector('#incomeGraph');

const summary = {
  fixedIncome: 0,
  floatIncome: 0,
  fixedExpense: 0,
  floatExpense: 0,
};

export const calcData = (data: AccountItem[]) => {
  if (!(expenseTable && incomeTable)) {
    return;
  }

  for (let key in summary) {
    summary[key as SummaryKey] = 0;
  }

  initSum();

  data.map((item) => {
    // ts에서 object in
    if (item.CATEGORY in fixedIncome) {
      summary.fixedIncome += item.PRICE;
      sumFixedIncome(item.CATEGORY, item.PRICE);
    }
    if (item.CATEGORY in floatIncome) {
      summary.floatIncome += item.PRICE;
      sumFloatIncome(item.CATEGORY, item.PRICE);
    }
    if (item.CATEGORY in fixedExpense) {
      summary.fixedExpense += item.PRICE;
      sumFixedExpense(item.CATEGORY, item.PRICE);
    }
    if (item.CATEGORY in floatExpense) {
      summary.floatExpense += item.PRICE;
      sumFloatExpense(item.CATEGORY, item.PRICE);
    }
  });

  expenseTable.innerHTML = '';
  incomeTable.innerHTML = '';

  printMainSummary('totalExpense', summary['fixedExpense'] + summary['floatExpense']);
  printMainSummary('totalIncome', summary['fixedIncome'] + summary['floatIncome']);
  for (let key in summary as Summary) {
    printMainSummary(key, summary[key as SummaryKey]);
  }
};
