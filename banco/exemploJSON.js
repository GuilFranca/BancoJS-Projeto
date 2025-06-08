// const fs = require('fs');

// // 1. Criar lista de peças
// const listaPecas = [
//     { codigo: "001", nome: "Peça A", quantidade: 10, preco: 5.99 },
//     { codigo: "002", nome: "Peça B", quantidade: 5, preco: 12.50 }
// ];

// // 2. Converter para JSON
// const jsonPecas = JSON.stringify(listaPecas, null, 2);

// // 3. Salvar em arquivo
// fs.writeFileSync('pecas.json', jsonPecas);

// // 4. Ler o arquivo de volta
// const dadosCarregados = JSON.parse(fs.readFileSync('pecas.json', 'utf-8'));
// console.log(dadosCarregados);

// class Conta {
//     constructor(nome, senha, saldo = 100) {
//         this.nome = nome;
//         this.senha = senha;
//         this.saldo = saldo;
//     }

//     getSaldo() {
//         return this.saldo;
//     }

// }

// const conta = new Conta('Gui', '123');
// const conta2 = new Conta('Raquel', '123', 1000);

// console.log(conta.getSaldo());

// // Criando a lista de contas
// let listaConta = [];

// // Inserindo as contas na lista
// listaConta.push(conta);
// listaConta.push(conta2);

// console.log(listaConta);

// // Criando um JSON onde armazenarei os contas
// const jsonContas = JSON.stringify(listaConta, null, 2);
// console.log(jsonContas);

// // Cria um arquivo JSON para guardar as contas salvas
// const fs = require('fs');
// fs.writeFile('contas.json', jsonContas, (err) => {
//     if (err) throw err;
//     console.log('Arquivo salvo como "contas.json"!');
// })

// const dadosCarregados = JSON.parse(fs.readFileSync('contas.json', 'utf-8'));
// console.log(dadosCarregados[0].nome);