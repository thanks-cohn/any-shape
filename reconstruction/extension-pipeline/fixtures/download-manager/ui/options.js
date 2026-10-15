import {isPermitted} from '../policy.js';
document.querySelector('form').addEventListener('submit', async event => {
  event.preventDefault();
  await chrome.runtime.sendMessage({type: 'preferences', url: document.querySelector('input').value});
});
