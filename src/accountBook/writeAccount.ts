import { getTableData } from './getAccount';
import { getCookie } from '../utiles/cookie';
import { categoryList } from '../utiles/category';
import { InputType } from '../utiles/types/Element';

const categoryEl: InputType = document.querySelector('#formCategory');
const dateEl: InputType = document.querySelector('#formDate');
const formEl: HTMLFormElement | null = document.querySelector('#writeForm');
const memoEl: InputType = document.querySelector('#formMemeo');
const priceEl: InputType = document.querySelector('#formPrice');
const postTypeEl = document.querySelectorAll('input[name="formType"]');
const categoryCombobox = document.querySelector('#formCategory');
const viewTypeEl: HTMLSelectElement | null = document.querySelector('#viewGraph');

const formRadioEl = document.querySelector('#formRadio');

const apiURL = 'http://localhost:3000';
const email = getCookie('email');

const printCategorys = (id: string = 'expense') => {
  if (!categoryCombobox) {
    return;
  }
  const options = categoryList[id];
  categoryCombobox.innerHTML = '';
  options.map((value) => {
    const optionEl = document.createElement('option');
    optionEl.value = value;
    optionEl.textContent = value;
    categoryCombobox?.append(optionEl);
  });
};

const getApiType = () => {
  let checkedOption = '';

  postTypeEl.forEach((option) => {
    if (!(option instanceof HTMLInputElement)) {
      return;
    }
    if (option.checked) {
      checkedOption = option.value;
    }
  });

  if (!checkedOption) {
    throw new Error('작성 타입이 없습니다.');
  }

  return checkedOption;
};

const createData = async () => {
  const apiType = getApiType();

  if (!email) {
    throw new Error('이메일이 없습니다.');
  }

  const formData = {
    date: dateEl?.value,
    category: categoryEl?.value,
    memo: memoEl?.value,
    price: priceEl?.value,
    email: email[1],
  };

  return await fetch(`${apiURL}/api/${apiType}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
};

const initForm = () => {
  if (!(formEl && dateEl && priceEl && memoEl)) {
    return;
  }

  dateEl.value = new Date().toLocaleDateString().slice(0, -1).replace(/ /g, '').replace(/\./g, '-');

  formEl.onsubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      await createData();

      priceEl.value = '';
      memoEl.value = '';

      getTableData(viewTypeEl?.value);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
      console.log(err);
    }
  };
};

export const init = () => {
  formRadioEl?.addEventListener('change', (e: any) => {
    printCategorys(e.target.id);
  });
  printCategorys();
  initForm();
};
