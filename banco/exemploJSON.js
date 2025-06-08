const fs = require('fs');

// 1. Criar lista de peças
const listaPecas = [
    { codigo: "001", nome: "Peça A", quantidade: 10, preco: 5.99 },
    { codigo: "002", nome: "Peça B", quantidade: 5, preco: 12.50 }
];

// 2. Converter para JSON
const jsonPecas = JSON.stringify(listaPecas, null, 2);

// 3. Salvar em arquivo
fs.writeFileSync('pecas.json', jsonPecas);

// 4. Ler o arquivo de volta
const dadosCarregados = JSON.parse(fs.readFileSync('pecas.json', 'utf-8'));
console.log(dadosCarregados);