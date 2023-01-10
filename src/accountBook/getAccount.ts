import changeDate from '../utiles/changeDate';
import observer from '../utiles/observer';
import punctuation from '../utiles/punctuation';
import { AccountItem } from '../utiles/types/AccountBook';

const accountListEl = document.querySelector('#accountList');
const dateTextEl = document.querySelector('#dateText');
const viewTypeEl: HTMLSelectElement | null = document.querySelector('#viewGraph');
const tableHeaderEl = document.querySelector('#tableHeader');
const tableFooterEl = document.querySelector('#tableFooter');

const appendRowEl = (parentEl: HTMLTableRowElement, text: string | number, format?: string) => {
  const tdEl = document.createElement('td');

  if (typeof text === 'number') {
    text = text.toString();
  }

  // 하드코딩을 피할 수 있는 방법 생각 필요
  if (format === 'date' && !isNaN(Date.parse(text))) {
    tdEl.textContent = new Intl.DateTimeFormat('kr').format(new Date(text));
  }
  if (format === 'type') {
    tdEl.textContent = text === 'EXPENSE' ? '지출' : '수입';
  }
  if (format === 'price') {
    tdEl.textContent = punctuation(text);
  }
  if (!format) {
    tdEl.textContent = text;
  }
  parentEl.append(tdEl);
};

const printRow = (data: AccountItem) => {
  const trEl = document.createElement('tr');
  const { ID, DATE_, CATEGORY, MEMO, PRICE, EMAIL, type, thisMonth, lastTotal } = data;
  appendRowEl(trEl, ID);
  appendRowEl(trEl, DATE_, 'date');
  appendRowEl(trEl, CATEGORY);
  appendRowEl(trEl, type, 'type');
  appendRowEl(trEl, MEMO);
  appendRowEl(trEl, PRICE, 'price');
  appendRowEl(trEl, EMAIL);

  accountListEl?.append(trEl);

  if (thisMonth || lastTotal) {
    printStatistics(thisMonth, lastTotal);
  }
};

const printStatistics = (currMonthPrice: number, lastMonthPrice: number) => {
  if (!(tableHeaderEl && tableFooterEl)) {
    return;
  }

  const compareText = viewTypeEl?.value === 'expense' ? '썼어요' : '받았어요';
  const totalText = viewTypeEl?.value === 'expense' ? '지츌' : '수입';

  if (currMonthPrice >= lastMonthPrice) {
    tableHeaderEl.innerHTML = `<p>이전 달 보다 <span class="priceHighlight">
    ${punctuation(currMonthPrice - lastMonthPrice)}</span> 더 ${compareText}</p>`;
  } else {
    tableHeaderEl.innerHTML = `<p>이전 달 보다 <span class="priceHighlight">
    ${punctuation(Math.abs(currMonthPrice - lastMonthPrice))}</span> 덜 ${compareText}</p>`;
  }

  tableFooterEl.innerHTML = `<p">총 ${totalText}: <span class="priceHighlight">
  ${punctuation(currMonthPrice)}</span>원</p>`;
};

export const getTableData = async (viewType: string = 'all') => {
  if (!(viewTypeEl && accountListEl && tableHeaderEl && tableFooterEl && dateTextEl)) {
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/${viewType}?date=${dateTextEl.textContent}`);
    const data = await res.json();

    accountListEl.innerHTML =
      '<tr><td>ID</td><td>날짜</td><td>카테고리</td><td>구분</td><td>메모</td><td>금액</td><td>유저</td></tr>';
    tableHeaderEl.innerHTML = '';
    tableFooterEl.innerHTML = '';

    data.map((item: AccountItem) => printRow(item));
  } catch (err) {
    accountListEl.innerHTML = `<p>에러가 발생했어요 :( <br /> ${err}</p>`;
  }
};

export const init = () => {
  if (!viewTypeEl) {
    return;
  }

  changeDate();
  getTableData();
  observer(dateTextEl, () => {
    getTableData(viewTypeEl.value);
  });

  viewTypeEl.addEventListener('change', () => {
    getTableData(viewTypeEl.value);
  });
};
