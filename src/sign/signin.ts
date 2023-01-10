import { InputType } from '../utiles/types/Element';

const emailEl: InputType = document.querySelector('#emailInputEl');
const passwordEl: InputType = document.querySelector('#passwordInputEl');
const signinEl: HTMLFormElement | null = document.querySelector('#signin');

const fetchSignin = async () => {
  if (!(emailEl && passwordEl && signinEl)) {
    return;
  }

  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailEl.value,
      password: passwordEl.value,
    }),
  });

  emailEl.value = '';
  passwordEl.value = '';
  return res;
};

export const init = () => {
  if (!signinEl) {
    return;
  }

  signinEl.onsubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      const res = await fetchSignin();

      if (!res) {
        throw new Error('로그인 패치 에러');
      }

      if (res.status === 400) {
        throw new Error('일치하는 회원이 없습니다.');
      }

      window.location.href = '/';
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        console.log('로그인 API 에러', err);
      }
    }
  };
};

init();
