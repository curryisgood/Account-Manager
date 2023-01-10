import { InputType } from '../utiles/types/Element';

const signupForm: HTMLFormElement | null = document.querySelector('#signup');
const emailEl: InputType = document.querySelector('#emailInputEl');
const passwordEl: InputType = document.querySelector('#passwordInputEl');
const nicknameEl: InputType = document.querySelector('#nicknameInputEl');

const fetchURL = 'http://localhost:3000/api/signup';

const fetchSignup = async () => {
  return await fetch(fetchURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailEl?.value,
      password: passwordEl?.value,
      nickname: nicknameEl?.value,
    }),
  });
};

export const init = () => {
  if (!signupForm) {
    return;
  }
  try {
    signupForm.onsubmit = async (e: SubmitEvent) => {
      e.preventDefault();
      const res = await fetchSignup();

      if (res.status === 400) {
        throw new Error('이미 존재하는 회원입니다.');
      }

      alert('회원가입 완료');
      window.location.href = '/signin';
    };
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      console.log(err);
    }
  }
};

init();
