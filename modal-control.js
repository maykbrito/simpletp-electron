
// Funções para controlar o modal de histórico
function openHistoryModal() {
  if (historyModal) historyModal.style.display = 'block';
  ipcRenderer.send('load-history'); // Carrega o histórico ao abrir o modal
}

function closeHistoryModal() {
  if (historyModal) historyModal.style.display = 'none';
}

// Event Listeners para o modal
if (openHistoryBtn) {
  openHistoryBtn.addEventListener('click', openHistoryModal);
}

if (closeHistoryModalBtn) {
  closeHistoryModalBtn.addEventListener('click', closeHistoryModal);
}

// Fechar o modal se clicar fora do conteúdo dele
if (historyModal) {
  historyModal.addEventListener('click', (event) => {
    if (event.target === historyModal) {
      closeHistoryModal();
    }
  });
}
