import changeDate from '../utiles/changeDate';
import oberver from '../utiles/observer';
import { calcData } from './calcPrice';

const dateTextEl = document.querySelector('#dateText');

const getData = async () => {
  if (!dateTextEl?.textContent) {
    return;
  }

  const res = await fetch(`http://localhost:3000/api/all?date=${dateTextEl.textContent}`);
  return await res.json();
};

const init = async () => {
  changeDate();
  const data = await getData();

  calcData(data);
  oberver(dateTextEl, async () => {
    const data = await getData();
    calcData(data);
  });
};

init();
