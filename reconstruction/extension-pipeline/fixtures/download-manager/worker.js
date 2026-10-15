import {isPermitted} from './policy.js';
chrome.runtime.onMessage.addListener(async message => {
  if (!isPermitted(message.url)) return {error: 'denied'};
  const downloadId = await chrome.downloads.download({url: message.url, conflictAction: 'uniquify'});
  await chrome.storage.local.set({lastDownload: downloadId});
  return {downloadId};
});
chrome.alarms.onAlarm.addListener(() => chrome.storage.local.get('queue'));
