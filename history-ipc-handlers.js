const { ipcMain } = require('electron');
const { readHistory, saveToHistory, deleteFromHistory, updateInHistory } = require('./history');

ipcMain.on('load-history', (event) => {
  event.reply('history-loaded', readHistory());
});

ipcMain.on('save-text-to-history', (event, textEntry) => {
  const success = saveToHistory(textEntry);
  if (success) {
    event.reply('history-saved', readHistory());
  } else {
    event.reply('history-save-error');
  }
});

ipcMain.on('delete-history-item', (event, itemId) => {
  const updatedHistory = deleteFromHistory(itemId);
  if (updatedHistory) {
    event.reply('history-item-deleted', updatedHistory);
  } else {
    event.reply('history-delete-error', itemId);
  }
});


ipcMain.on('update-history-item', (event, { id, text }) => {
  const updatedHistory = updateInHistory(id, text);
  if (updatedHistory) {
    event.reply('history-item-updated', updatedHistory);
  } else {
    event.reply('history-update-error', id);
  }
});