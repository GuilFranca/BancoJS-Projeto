const prompt = require('prompt-sync')({ sigint: true });

class Conta {
    constructor(nome, senha, saldo = 100) {
        this.nome = nome;
        this.senha = senha;
        this.saldo = saldo;
    }

    setNome(nome) {
        this.nome = nome;
    }

    setSenha(senha) {
        this.senha = senha;
    }

    setSaldo(saldo) {
        this.saldo = saldo;
    }

    getNome() {
        return this.nome;
    }

    getSenha() {
        return this.senha;
    }

    getSaldo() {
        return this.saldo;
    }

}


let operador;
let nome;
let senha;

while (operador != 3) {

    console.log('-=-=-=-=-=-=FranBank=-=-=-=-=-=-');

    console.log('1 - Logar\n2 - Registar\n3 - Sair\n');

    operador = prompt('Digite o que deseja fazer: ');

    console.log('\n')

    switch (operador) {
        case '1':
            let nomeLogin;
            let senhaLogin;

            console.log('-=-=-=-=-=-=Login=-=-=-=-=-=-');
            nomeLogin = prompt('Nome: ');
            senhaLogin = prompt('Senha: ');

        case '2':
            console.log('-=-=-=-=-=-=Registro=-=-=-=-=-=-');
            nome = prompt('Nome: ');
            senha = prompt('Senha: ');

        case '3':
            console.log('-=-=-=-=-=-=Programa Encerrado=-=-=-=-=-=-');
    }

}

console.log('Até mais');



const conta = new Conta('Gui', '123');
const conta2 = new Conta('Raquel', '123', 1000);

console.log(conta.getSaldo());

// Criando a lista de contas
let listaConta = [];

// Inserindo as contas na lista
listaConta.push(conta);
listaConta.push(conta2);

console.log(listaConta);

// Criando um JSON onde armazenarei os contas
const jsonContas = JSON.stringify(listaConta, null, 2);
console.log(jsonContas);

// Cria um arquivo JSON para guardar as contas salvas
const fs = require('fs');
fs.writeFile('contas.json', jsonContas, (err) => {
    if (err) throw err;
    console.log('Arquivo salvo como "contas.json"!');
})

const dadosCarregados = JSON.parse(fs.readFileSync('contas.json', 'utf-8'));
console.log(dadosCarregados[0].nome);