const fs = require('fs');

function readAndSendFile(target, filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return fileContent;
    } catch (error) {
        console.error(`Error al leer el archivo ${filePath}: ${error.message}`);
        return 'Error al leer el archivo.';
    }
}

module.exports = { readAndSendFile };