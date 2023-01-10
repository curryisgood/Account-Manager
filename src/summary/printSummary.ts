import { fixedIncome, floatIncome, fixedExpense, floatExpense } from '../utiles/category';
import punctuation from '../utiles/punctuation';

const expenseTable = document.querySelector('#expenseGraph');
const incomeTable = document.querySelector('#incomeGraph');

const summaryText = {
  totalIncome: '총 수입',
  fixedIncome: '고정 수입',
  floatIncome: '유동 수입',
  totalExpense: '총 지출',
  fixedExpense: '고정 지출',
  floatExpense: '유동 지출',
};

const createSubSummaryEl = (key: string, price: number) => {
  const tr = document.createElement('tr');
  const title = document.createElement('td');
  const value = document.createElement('td');

  tr.className = 'child';
  title.textContent = key;
  value.textContent = punctuation(price);

  tr.append(title);
  tr.append(value);
  return tr;
};

const printSubSummary = (type: string) => {
  if (type === 'fixedExpense') {
    for (let key in fixedExpense) {
      const el = createSubSummaryEl(key, fixedExpense[key as keyof typeof fixedExpense]);
      expenseTable?.append(el);
    }
  }
  if (type === 'floatExpense') {
    for (let key in floatExpense) {
      const el = createSubSummaryEl(key, floatExpense[key as keyof typeof floatExpense]);
      expenseTable?.append(el);
    }
  }
  if (type === 'fixedIncome') {
    for (let key in fixedIncome) {
      const el = createSubSummaryEl(key, fixedIncome[key as keyof typeof fixedIncome]);
      incomeTable?.append(el);
    }
  }
  if (type === 'floatIncome') {
    for (let key in floatIncome) {
      const el = createSubSummaryEl(key, floatIncome[key as keyof typeof floatIncome]);
      incomeTable?.append(el);
    }
  }
};

export const printMainSummary = (type: string, price: number) => {
  const trEl = document.createElement('tr');
  const title = document.createElement('td');
  const value = document.createElement('td');

  trEl.className = type === 'totalExpense' || type === 'totalIncome' ? 'first' : 'second';
  title.textContent = summaryText[type as keyof typeof summaryText];
  value.textContent = punctuation(price);
  trEl.append(title);
  trEl.append(value);

  if (type === 'totalExpense' || type === 'fixedExpense' || type === 'floatExpense') {
    expenseTable?.append(trEl);
  }
  if (type === 'totalIncome' || type === 'fixedIncome' || type === 'floatIncome') {
    incomeTable?.append(trEl);
  }
  printSubSummary(type);
};
