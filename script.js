// projeto-csm/frontend/assets/javascript/script.js

// Variável global para armazenar o ID do animal que está sendo editado
let animalIdToEdit = null; 

// Função utilitária para obter o botão de envio, independentemente se é INPUT ou BUTTON
function getSubmitButton() {
    // Procura por qualquer elemento com type="submit"
    return document.querySelector('[type="submit"]'); 
}


// =======================================================
// 1. CARREGAR DADOS NA INICIALIZAÇÃO (READ)
// =======================================================
async function loadAnimais() {
    try {
        const response = await fetch('http://localhost:3000/api/animais');
        if (!response.ok) {
            throw new Error('Falha ao carregar animais do servidor.');
        }
        const animais = await response.json();
        
        // Limpa a tabela antes de preencher
        const tableBody = document.querySelector("#myTable tbody");
        tableBody.innerHTML = ''; 

        // Adiciona cada animal à tabela
        animais.forEach(animal => {
            addLocalRowToTable(animal.id, animal);
        });

    } catch (error) {
        console.error('Erro na função loadAnimais:', error);
        // Não usamos alert aqui para não travar a inicialização por causa do servidor desligado.
    }
}

// Garante que a função de carregamento seja executada ao carregar a página
window.onload = loadAnimais;


// =======================================================
// 2. CADASTRO/ALTERAÇÃO (CREATE/UPDATE)
// =======================================================
function addToTable() {
    // 1. Coleta os dados do formulário
    const animalData = {
        codigo_lacre: document.getElementById("codigo_lacre").value,
        nome_animal: document.getElementById("nome_animal").value,
        codigo_registro: document.getElementById("codigo_registro").value,
        codigo_registro_pai: document.getElementById("codigo_registro_pai").value,
        codigo_registro_mae: document.getElementById("codigo_registro_mae").value,
        peso_inicial: parseFloat(document.getElementById("peso_inicial").value), 
        data_nascimento: document.getElementById("data_nascimento").value
    };

    // 2. Define o método (POST ou PUT) e a URL
    const method = animalIdToEdit ? 'PUT' : 'POST';
    const url = animalIdToEdit 
        ? `http://localhost:3000/api/animais/${animalIdToEdit}` 
        : 'http://localhost:3000/api/animais';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animalData),
    })
    .then(response => {
        if (!response.ok) {
            // Lança o erro para o catch, informando que o servidor falhou
            throw new Error(`Erro no servidor! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert(`Animal ${animalIdToEdit ? 'alterado' : 'cadastrado'} com sucesso!`);
        
        // Reseta o estado e recarrega a tabela para ver a alteração
        resetFormState();
        loadAnimais(); 
    })
    .catch((error) => {
        console.error('Erro detalhado da operação:', error);
        alert('Erro ao processar a operação. Verifique no console para mais detalhes.');
    });

    return false; 
}


// =======================================================
// 3. EXCLUSÃO (DELETE)
// =======================================================
async function deleteAnimal(id) {
    if (!confirm(`Tem certeza que deseja excluir o animal com ID ${id}?`)) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/animais/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            alert(`Animal com ID ${id} excluído com sucesso!`);
            loadAnimais(); // Recarrega a tabela
        } else {
            const errorData = await response.json();
            alert(`Falha ao excluir animal: ${errorData.message}.`);
        }

    } catch (error) {
        console.error('Erro de rede ao excluir:', error);
        alert('Erro de rede ao tentar excluir o animal.');
    }
}


// =======================================================
// 4. EDIÇÃO (Preenche o formulário para ALTERAÇÃO) - CORRIGIDO
// =======================================================
function editAnimal(id, data) {
    // 1. Define o estado de edição
    animalIdToEdit = id; 

    // 2. Preenche o formulário
    document.getElementById("codigo_lacre").value = data.codigo_lacre;
    document.getElementById("nome_animal").value = data.nome_animal;
    document.getElementById("codigo_registro").value = data.codigo_registro;
    document.getElementById("codigo_registro_pai").value = data.codigo_registro_pai;
    document.getElementById("codigo_registro_mae").value = data.codigo_registro_mae;
    document.getElementById("peso_inicial").value = data.peso_inicial;
    
    // CORREÇÃO: TRUNCA A DATA para o formato HTML yyyy-MM-dd
    const dataFormatada = data.data_nascimento ? data.data_nascimento.substring(0, 10) : '';
    document.getElementById("data_nascimento").value = dataFormatada;

    // 3. Altera o texto do botão (usando a função robusta)
    const submitButton = getSubmitButton();
    if (submitButton) {
        // Usa .value para <input type="submit"> e .textContent para <button type="submit">
        submitButton.value = "Alterar Cadastro";
        submitButton.textContent = "Alterar Cadastro"; 
    }
    
    // Opcional: Adiciona um botão de Cancelar Edição
    let cancelButton = document.getElementById('cancel-edit-btn');
    if (!cancelButton) {
        cancelButton = document.createElement('button');
        cancelButton.id = 'cancel-edit-btn';
        cancelButton.className = 'btn btn-secondary ms-2';
        cancelButton.textContent = 'Cancelar Edição';
        cancelButton.onclick = resetFormState;
        document.querySelector('form').appendChild(cancelButton);
    }
}

// Função para limpar o estado de edição - CORRIGIDO
function resetFormState() {
    animalIdToEdit = null;
    document.querySelector('form').reset();
    
    const submitButton = getSubmitButton();
    if (submitButton) {
        submitButton.value = "Cadastrar Animal";
        submitButton.textContent = "Cadastrar Animal";
    }
    
    const cancelButton = document.getElementById('cancel-edit-btn');
    if (cancelButton) {
        cancelButton.remove();
    }
}

// =======================================================
// 5. FUNÇÃO PARA ADICIONAR LINHA NA TABELA 
// =======================================================
function addLocalRowToTable(id, data) {
    const tableBody = document.querySelector("#myTable tbody");
    const newRow = tableBody.insertRow();
    
    // Adiciona as células
    newRow.insertCell().innerHTML = id;
    newRow.insertCell().innerHTML = data.codigo_lacre;
    newRow.insertCell().innerHTML = data.nome_animal;
    newRow.insertCell().innerHTML = data.codigo_registro;
    newRow.insertCell().innerHTML = data.codigo_registro_pai;
    newRow.insertCell().innerHTML = data.codigo_registro_mae;
    newRow.insertCell().innerHTML = data.peso_inicial;
    
    // Adiciona a data formatada, se existir
    const dataFormatada = data.data_nascimento ? data.data_nascimento.substring(0, 10) : '';
    newRow.insertCell().innerHTML = dataFormatada;
    
    // Célula de Ação
    const actionCell = newRow.insertCell();
    
    // Botão EDITAR (Chama editAnimal)
    const editButton = document.createElement('button');
    editButton.className = "btn btn-info btn-sm me-2";
    editButton.textContent = "Editar";
    editButton.onclick = function() {
        editAnimal(id, data); 
    };
    
    // Botão EXCLUIR (Chama deleteAnimal)
    const deleteButton = document.createElement('button');
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.textContent = "Excluir";
    deleteButton.onclick = function() {
        deleteAnimal(id); 
    };
    
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
}