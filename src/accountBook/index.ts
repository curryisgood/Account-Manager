import * as getAccount from './getAccount';
import * as writeAccount from './writeAccount';

window.onerror = (message, url, line, col, error) => {
  alert(`${message}\n At ${line}:${col} of ${url}`);
};

getAccount.init();
writeAccount.init();
