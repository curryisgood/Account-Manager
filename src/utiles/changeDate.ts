const header: HTMLElement | null = document.querySelector('#dateBox');
const dateTextEl: HTMLElement | null = document.querySelector('#dateText');

const changeDate = () => {
  if (!(header && dateTextEl)) {
    return;
  }

  dateTextEl.textContent = new Date()
    .toLocaleDateString()
    .replace(/ /g, '')
    .slice(0, -4)
    .replace(/\./g, '-');

  header.onclick = async (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' && target.dataset.btn) {
      dateFormat(target.dataset.btn);
    }
  };
};

const dateFormat = async (type: string) => {
  if (!dateTextEl?.textContent) {
    return;
  }

  const currDate: string[] = dateTextEl?.textContent?.split('-');
  const year = Number(currDate[0]);
  const month = Number(currDate[1]);

  if (type === 'next') {
    if (Number(currDate[1]) >= 12) {
      currDate[0] = year + 1 >= 10 ? String(year + 1) : '0' + String(year + 1);
      currDate[1] = '01';
    } else {
      currDate[1] = month + 1 >= 10 ? String(month + 1) : '0' + String(month + 1);
    }
  }
  if (type === 'prev') {
    if (Number(currDate[1]) <= 1) {
      currDate[0] = year - 1 >= 10 ? String(year - 1) : '0' + String(year - 1);
      currDate[1] = '12';
    } else {
      currDate[1] = month - 1 >= 10 ? String(month - 1) : '0' + String(month - 1);
    }
  }

  dateTextEl.textContent = currDate.join('-');
};

export default changeDate;
