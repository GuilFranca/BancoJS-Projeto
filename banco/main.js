const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');
const { json } = require('stream/consumers');

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

listaConta = [];
let usuario;

try {
    const dadosExistentes = fs.readFileSync('usuarios.json', 'utf-8')
    listaConta = JSON.parse(dadosExistentes);
} catch (err) {
    console.log('Arquivo não encontrado, iniciando nova lista de usuário.')
}

function acessoBanco() {

    let operador;

    while (operador != '4') {

        console.log('-=-=-=-=-= FRANBANK =-=-=-=-=-');
        console.log(`${ usuario.nome}: R$${ usuario.saldo}`)
        console.log('1 - Depositar\n2 - Sacar\n3 - Realizar transação\n4 - Sair');

        operador = prompt('Digite a operação que deseja realizar: ');

        switch (operador) {

            case '1':
                let deposito = parseFloat(prompt('Deposito: R$'));
                usuario.saldo += deposito;
                console.log(`Saldo atualizado da conta ${usuario.nome}: ${usuario.saldo}`);
                // Atualiza o arquivo JSON
                fs.writeFileSync('usuarios.json', JSON.stringify(listaConta, null, 2));
                break;

            case '2':
                let saque = parseFloat(prompt('Saque: R$'));
                usuario.saldo -= saque;
                console.log(`Saldo atualizado da conta ${usuario.nome}: ${usuario.saldo}`);
                // Atualiza o arquivo JSON
                fs.writeFileSync('usuarios.json', JSON.stringify(listaConta, null, 2));
                break;

            case '3':
                let usuarioRecebe = prompt('Usuário que receberá a transação: ');
                let recebedor = listaConta.find(u => u.nome === usuarioRecebe);
                let transacao = parseFloat(prompt('Valor Transação: R$'));

                usuario.saldo -= transacao;
                recebedor.saldo += transacao;

            console.log(`Saldo atualizado da conta ${ usuario.nome }: ${ usuario.saldo }`);

                // Atualiza o arquivo JSON
                fs.writeFileSync('usuarios.json', JSON.stringify(listaConta, null, 2));
                break;

            case '4':
                console.log('Saindo...')
                break;

            default:
                console.log('Operação inválida!')
                break;
        }

    }

}

function login() {
    console.log("-=-=-=-=-= LOGIN =-=-=-=-=-");
    let login = prompt('Login: ');
    let senhaLogin = prompt('Senha: ');

    let usuarioLogado = listaConta.find(u => u.nome === login && u.senha === senhaLogin);

    if (usuarioLogado) {
        console.log(`Usuáriologado ${ login }`);
        usuario = listaConta.find(u => u.nome === login);
        acessoBanco();
    } else {
        console.log('Usuário ou senha incorretos!')
    }

}

function registrarUsuario() {
    console.log("-=-=-=-=-= NOVO CADASTRO =-=-=-=-=-");

    const nome = prompt('Login: ');
    const senha = prompt('Senha: ');

    const novaConta = new Conta(nome, senha);

    listaConta.push(novaConta);

    fs.writeFileSync('usuarios.json', JSON.stringify(listaConta, null, 2));
    console.log('Usuário cadastrado com sucesso!');

}

// 3. Exemplo de uso no menu
let opcao;
while (opcao !== '3') {
    console.log('\n=== MENU ===');
    console.log('1 - Login');
    console.log('2 - Registrar novo usuário');
    console.log('3 - Sair');

    opcao = prompt('Escolha uma opção: ');

    switch (opcao) {
        case '1':
            login();
            break;
        case '2':
            registrarUsuario();
            break;
        case '3':
            console.log('Saindo...');
            break;
        default:
            console.log('Opção inválida!');
    }
}



console.log(listaConta);

// // Transforma a lista em um JSON
// const jsonUsuarios = JSON.stringify(listaConta, null, 2);

// // Transforma o JSON em um arquivo
// fs.writeFileSync('usuarios.json', jsonUsuarios);

// // Carrega o arquivo JSON
// const dadosCarregadosUsuarios = JSON.parse(fs.readFileSync('usuarios.json', 'utf-8'));
// console.log(dadosCarregadosUsuarios[0]);