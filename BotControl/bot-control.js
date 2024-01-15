function addCommand() {
    const commandName = document.getElementById('commandName').value;
    const commandResponse = document.getElementById('commandResponse').value;

    // Lógica para añadir el comando en el cliente
    const commandList = JSON.parse(localStorage.getItem('commandList')) || [];
    commandList.push({ name: commandName, response: commandResponse });
    localStorage.setItem('commandList', JSON.stringify(commandList));

    updateCommandList();
    alert('Comando añadido con éxito');
}

function editCommand() {
    const commandName = document.getElementById('commandName').value;
    const commandResponse = document.getElementById('commandResponse').value;

    // Lógica para editar el comando en el cliente
    const commandList = JSON.parse(localStorage.getItem('commandList')) || [];
    const index = commandList.findIndex(command => command.name === commandName);

    if (index !== -1) {
        commandList[index].response = commandResponse;
        localStorage.setItem('commandList', JSON.stringify(commandList));
        updateCommandList();
        alert('Comando editado con éxito');
    } else {
        alert('Comando no encontrado');
    }
}

function deleteCommand() {
    const commandName = document.getElementById('commandName').value;

    // Lógica para eliminar el comando en el cliente
    const commandList = JSON.parse(localStorage.getItem('commandList')) || [];
    const updatedList = commandList.filter(command => command.name !== commandName);

    if (updatedList.length < commandList.length) {
        localStorage.setItem('commandList', JSON.stringify(updatedList));
        updateCommandList();
        alert('Comando eliminado con éxito');
    } else {
        alert('Comando no encontrado');
    }
}

function updateCommandList() {
    const commandList = JSON.parse(localStorage.getItem('commandList')) || [];
    const commandItems = document.getElementById('commandItems');
    commandItems.innerHTML = '';

    commandList.forEach(command => {
        const listItem = document.createElement('li');
        listItem.textContent = `!${command.name} - ${command.response}`;
        commandItems.appendChild(listItem);
    });
}
