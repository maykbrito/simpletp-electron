let currentlyLoadedItemId = null;

function renderHistory(historyItems) {
  historyList.innerHTML = '';
  if (historyItems && historyItems.length > 0) {
    historyItems.forEach(item => {
      const listItem = document.createElement('li');

      const itemName = document.createElement('span');
      itemName.classList.add('history-item-name');
      itemName.textContent = item.name || 'Sem nome';
      listItem.appendChild(itemName);


      itemName.addEventListener('click', () => {
        teleprompter.innerHTML = item.text;
        currentlyLoadedItemId = item.id;
      });


      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-history-item');
      deleteButton.textContent = 'X';
      deleteButton.setAttribute('data-id', item.id);
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const itemIdToDelete = e.target.getAttribute('data-id');

        ipcRenderer.send('delete-history-item', itemIdToDelete);

        if (currentlyLoadedItemId === itemIdToDelete) {
          currentlyLoadedItemId = null;
        }
      });
      listItem.appendChild(deleteButton);

      historyList.appendChild(listItem);
    });
  } else {
    historyList.innerHTML = '<li>Nenhum texto salvo ainda.</li>';
    currentlyLoadedItemId = null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.send('load-history');
});

saveToHistoryBtn.addEventListener('click', () => {
  const textContent = teleprompter.innerHTML;
  if (!textContent.trim()) {
    alert('Não há texto para salvar.');
    return;
  }

  const entryName = `Texto Salvo em ${new Date().toLocaleString()}`;

  const textEntry = {
    id: Date.now().toString(),
    name: entryName,
    text: textContent,
    createdAt: new Date().toISOString()
  };
  ipcRenderer.send('save-text-to-history', textEntry);
  currentlyLoadedItemId = textEntry.id;
});


if (teleprompter) {
  teleprompter.addEventListener('input', () => {
    if (currentlyLoadedItemId) {
      const newText = teleprompter.innerHTML;
      ipcRenderer.send('update-history-item', { id: currentlyLoadedItemId, text: newText });
    }
  });
}

ipcRenderer.on('adjust-font-size', (_, delta) => adjustFontSize(delta));

ipcRenderer.on('history-loaded', (event, historyItems) => {
  renderHistory(historyItems);
});

ipcRenderer.on('history-saved', (event, updatedHistoryItems) => {
  renderHistory(updatedHistoryItems);

});

ipcRenderer.on('history-save-error', () => {
  alert('Erro ao salvar o texto no histórico.');
});

ipcRenderer.on('history-item-deleted', (event, updatedHistoryItems) => {
  renderHistory(updatedHistoryItems);

});

ipcRenderer.on('history-delete-error', () => {
  alert('Erro ao excluir o item do histórico.');
});

ipcRenderer.on('history-item-updated', (event, updatedHistoryItems) => {
  renderHistory(updatedHistoryItems);
});

ipcRenderer.on('history-update-error', (event, itemId) => {
  alert(`Erro ao atualizar o item ${itemId} no histórico.`);
});
