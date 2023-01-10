type categorys = {
  [key: string]: string[];
};

export const categoryList: categorys = {
  expense: [
    '관리비',
    '구독서비스',
    '교통비',
    '보험',
    '생활용품',
    '식비',
    '의복',
    '취미',
    '통신비',
    '기타',
  ],
  income: ['월급', '상여', '금융소득', '부수입', '기타'],
};

export const fixedIncome = { 월급: 0 };
export const floatIncome = { 상여: 0, 금융소득: 0, 부수입: 0, 기타: 0 };
export const fixedExpense = { 관리비: 0, 보험: 0, 통신비: 0, 구독서비스: 0 };
export const floatExpense = { 교통비: 0, 생활용품: 0, 식비: 0, 의복: 0, 취미: 0, 기타: 0 };

export const initSum = () => {
  for (let key in fixedIncome) {
    fixedIncome[key as keyof typeof fixedIncome] = 0;
  }
  for (let key in floatIncome) {
    floatIncome[key as keyof typeof floatIncome] = 0;
  }
  for (let key in fixedExpense) {
    fixedExpense[key as keyof typeof fixedExpense] = 0;
  }
  for (let key in floatExpense) {
    floatExpense[key as keyof typeof floatExpense] = 0;
  }
};

export const sumFixedIncome = (type: string, price: number) => {
  fixedIncome[type as keyof typeof fixedIncome] += price;
};
export const sumFloatIncome = (type: string, price: number) => {
  floatIncome[type as keyof typeof floatIncome] += price;
};
export const sumFixedExpense = (type: string, price: number) => {
  fixedExpense[type as keyof typeof fixedExpense] += price;
};
export const sumFloatExpense = (type: string, price: number) => {
  floatExpense[type as keyof typeof floatExpense] += price;
};
