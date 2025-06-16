const { app } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

// Caminho para o arquivo de histórico
const historyFilePath = path.join(app.getPath('userData'), 'history.json');

// Função para ler o histórico do arquivo JSON
function readHistory() {
  try {
    if (fs.existsSync(historyFilePath)) {
      const data = fs.readFileSync(historyFilePath, 'utf-8');
      return JSON.parse(data);
    } else {
      return []; // Retorna array vazio se o arquivo não existe
    }
  } catch (error) {
    console.error('Failed to read history file:', error);
    return []; // Retorna array vazio em caso de erro
  }
}

// Função para salvar um novo texto no histórico
function saveToHistory(textEntry) {
  try {
    const history = readHistory();
    history.push(textEntry); // Adiciona a nova entrada
    fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Failed to save to history file:', error);
    return false;
  }
}

// Função para deletar um item do histórico pelo ID (nome do texto)
function deleteFromHistory(itemId) {
  try {
    let history = readHistory();
    const initialLength = history.length;
    history = history.filter(item => item.id !== itemId);

    if (history.length < initialLength) { // Verifica se algum item foi realmente removido
      fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2), 'utf-8');
      return history; // Retorna o histórico atualizado
    } else {
      console.warn(`Item with id "${itemId}" not found in history.`);
      return null; // Ou retorna o histórico original se o item não foi encontrado, dependendo da preferência
    }
  } catch (error) {
    console.error('Failed to delete from history file:', error);
    return null; // Retorna null em caso de erro
  }
}

// Função para atualizar um item existente no histórico
function updateInHistory(itemId, newText) {
  try {
    let history = readHistory();
    const itemIndex = history.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
      history[itemIndex].text = newText;
      history[itemIndex].updatedAt = new Date().toISOString();
      fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2), 'utf-8');
      return history;
    } else {
      console.warn(`Item with id "${itemId}" not found for update.`);
      return null;
    }
  } catch (error) {
    console.error('Failed to update item in history file:', error);
    return null;
  }
}


module.exports = {
  readHistory,
  saveToHistory,
  deleteFromHistory,
  updateInHistory
};