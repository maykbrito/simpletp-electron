const teleprompter = document.getElementById('teleprompter');
const saveToHistoryBtn = document.getElementById('save-to-history-btn');
const historyList = document.getElementById('history-list');
const { ipcRenderer } = require('electron');

// Elementos do Modal de Histórico
const historyModal = document.getElementById('history-modal');
const openHistoryBtn = document.getElementById('open-history-btn');
const closeHistoryModalBtn = document.getElementById('close-history-modal-btn');
const saveToHistoryBtnModal = document.querySelector('#history-modal-content #save-to-history-btn'); // Botão de salvar dentro do modal