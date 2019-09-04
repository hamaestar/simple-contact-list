

const contactList = 'contactList';
let contacts = [];

//função para inicializar arquivo local e atualizar a tabela caso o mesmo já exista
function init () {
    if (localStorage.getItem(contactList)) {
        contacts = JSON.parse(localStorage.getItem(contactList));
    } else {
        localStorage.setItem(contactList, JSON.stringify(contacts));
    }
    refreshTable();
}



let submitBtn = document.getElementById('newContactBtn');
let clearBtn = document.getElementById('clearContactsBtn');

submitBtn.addEventListener('click', () => {

    //pega os dados dos inputs
    let newName = document.getElementById('newName').value.trim();
    let newPhone = document.getElementById('newPhone').value.trim();
    let newAddress = document.getElementById('newAddress').value.trim();
    
    //verifica se os campos estão preenchidos
    if (newName === '' || newPhone === '' || newAddress == '') {
        return;
    }


    //verifica se o nome do contato já existe, adiciona o novo contato ao array 'contacts' e atualiza a tabela
    for (i = 0; i < contacts.length; i++) {
        if (contacts[i].name === newName) {
            window.alert(`O contato "${newName}" já existe. Favor escolher um nome válido.`);
            return;
        }
    }
    contacts.push({'name': newName, 'phone': newPhone, 'address': newAddress});
    localStorage.setItem(contactList, JSON.stringify(contacts));
    init();

});

//event listener para o botão de limpar a lista de contatos
clearBtn.addEventListener('click', () => {
    contacts = [];
    localStorage.setItem(contactList, JSON.stringify(contacts));
    refreshTable();
});


//função para preencher a tabela de contatos
function refreshTable() {
    
    let tableBody = document.getElementById('tableBody');
    
    //limpa a tablea antiga, removendo os nodes filhos de tableContainer
    while(tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }


    //itera sobre o array contacts e adiciona os objetos ao corpo da tabela
    for(i = 0; i < contacts.length; i++) {

        //cria a variáveis para armazenar os novos elementos da tabela
        let currentRow = document.createElement('tr');
        let currentNameCol = document.createElement('td');
        let currentPhoneCol = document.createElement('td');
        let currentAddressCol = document.createElement('td');
        let currentDeleteCol = document.createElement('td');

        let currentDeleteBtn = document.createElement('button');
        currentDeleteBtn.className = 'delete-button'

        //preenche os valores das colunas com os atributos do objeto
        currentNameCol.innerHTML = contacts[i].name;
        currentPhoneCol.innerHTML = contacts[i].phone;
        currentAddressCol.innerHTML = contacts[i].address;

        currentDeleteBtn.innerHTML = 'excluir'


        //adiciona os valores à linha
        currentRow.appendChild(currentNameCol);
        currentRow.appendChild(currentPhoneCol);
        currentRow.appendChild(currentAddressCol);
        currentRow.appendChild(currentDeleteCol);

        currentDeleteCol.appendChild(currentDeleteBtn);

        //adiciona a linha ao corpo da tabela
        tableBody.appendChild(currentRow);

    }

    //cria um array com os botões delete
    let deleteBtns = document.getElementsByClassName('delete-button');


    //event listener para todos os botões delete, contidos no array "deleteBtns"
    for (i = 0; i < deleteBtns.length; i++) {

        deleteBtns[i].addEventListener('click', ($event) => {
            //let targetName = $event.target.parentElement.children[0].innerHTML;
            let targetName = $event.target.parentElement.parentElement.children[0].innerHTML;
            let confirm = window.confirm(`Você tem certeza que deseja excluir "${targetName}" da lista de contatos?`);
            if (confirm) {
                deleteContact(targetName);
            }
        })

    }

}


//função que recebe um nome de contato, e o exclui do array "contacts"
function deleteContact(name) {
    let currentList = []; //lista temporária para armazenar todos os nomes que não sejam o valor passado em "name"

    for (i = 0; i < contacts.length; i++) {
        if (contacts[i].name !== name) {
            currentList.push(contacts[i]);
        }
    }
    contacts = currentList; //atualiza o array "contacts" de acordo com a lista temporária
    localStorage.setItem(contactList, JSON.stringify(contacts));
    refreshTable();
}

init();