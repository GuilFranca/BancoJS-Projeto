const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');
const path = require('path');

// Constantes
const ARQUIVO_USUARIOS = path.join(__dirname, 'usuarios.json');
const SALDO_INICIAL = 100;

class Conta {
    constructor(nome, senha, saldo = SALDO_INICIAL) {
        this.nome = nome;
        this.senha = senha;
        this.saldo = saldo;
    }

    depositar(valor) {
        if (valor <= 0 || isNaN(valor)) {
            throw new Error('Valor de depósito inválido');
        }
        this.saldo += valor;
        return this.saldo;
    }

    sacar(valor) {
        if (valor <= 0 || isNaN(valor)) {
            throw new Error('Valor de saque inválido');
        }
        if (valor > this.saldo) {
            throw new Error('Saldo insuficiente');
        }
        this.saldo -= valor;
        return this.saldo;
    }

    transferir(valor, destinatario) {
        this.sacar(valor);
        destinatario.depositar(valor);
    }
}

// Sistema de persistência
class BancoDados {
    static carregarContas() {
        try {
            if (fs.existsSync(ARQUIVO_USUARIOS)) {
                const dados = fs.readFileSync(ARQUIVO_USUARIOS, 'utf-8');
                const contas = JSON.parse(dados);
                return contas.map(c => new Conta(c.nome, c.senha, c.saldo));
            }
        } catch (err) {
            console.error('Erro ao carregar contas:', err.message);
        }
        return [];
    }

    static salvarContas(contas) {
        try {
            fs.writeFileSync(ARQUIVO_USUARIOS, JSON.stringify(contas, null, 2));
            return true;
        } catch (err) {
            console.error('Erro ao salvar contas:', err.message);
            return false;
        }
    }
}

// Gerenciamento de sessão
let usuarioLogado = null;
const contas = BancoDados.carregarContas();

// Interface do usuário
class InterfaceBanco {
    static mostrarMenuPrincipal() {
        console.log('\n=== FRANBANK ===');
        console.log('1 - Login');
        console.log('2 - Registrar');
        console.log('3 - Sair');
    }

    static mostrarMenuOperacoes() {
        console.log('\n=== MENU DE OPERAÇÕES ===');
        console.log(`Usuário: ${usuarioLogado.nome} | Saldo: R$ ${usuarioLogado.saldo.toFixed(2)}`);
        console.log('1 - Depositar');
        console.log('2 - Sacar');
        console.log('3 - Transferir');
        console.log('4 - Sair');
    }

    static formatarDinheiro(valor) {
        return `R$ ${parseFloat(valor).toFixed(2)}`;
    }
}

// Operações
class OperacoesBanco {
    static login() {
        console.log('\n=== LOGIN ===');
        const nome = prompt('Nome: ');
        const senha = prompt('Senha: ');

        const conta = contas.find(c => c.nome === nome && c.senha === senha);
        if (!conta) {
            console.log('\nCredenciais inválidas!');
            return false;
        }

        usuarioLogado = conta;
        console.log(`\nBem-vindo, ${nome}!`);
        return true;
    }

    static registrar() {
        console.log('\n=== NOVO CADASTRO ===');
        const nome = prompt('Nome: ');
        
        if (contas.some(c => c.nome === nome)) {
            console.log('\nNome de usuário já existe!');
            return;
        }

        const senha = prompt('Senha: ');
        const novaConta = new Conta(nome, senha);
        contas.push(novaConta);
        BancoDados.salvarContas(contas);
        console.log('\nConta criada com sucesso!');
    }

    static depositar() {
        try {
            const valor = parseFloat(prompt('Valor para depósito: R$ '));
            usuarioLogado.depositar(valor);
            BancoDados.salvarContas(contas);
            console.log(`\nDepósito de ${InterfaceBanco.formatarDinheiro(valor)} realizado com sucesso!`);
            console.log(`Novo saldo: ${InterfaceBanco.formatarDinheiro(usuarioLogado.saldo)}`);
        } catch (err) {
            console.log(`\nErro: ${err.message}`);
        }
    }

    static sacar() {
        try {
            const valor = parseFloat(prompt('Valor para saque: R$ '));
            usuarioLogado.sacar(valor);
            BancoDados.salvarContas(contas);
            console.log(`\nSaque de ${InterfaceBanco.formatarDinheiro(valor)} realizado com sucesso!`);
            console.log(`Novo saldo: ${InterfaceBanco.formatarDinheiro(usuarioLogado.saldo)}`);
        } catch (err) {
            console.log(`\nErro: ${err.message}`);
        }
    }

    static transferir() {
        try {
            const destinatarioNome = prompt('Nome do destinatário: ');
            const destinatario = contas.find(c => c.nome === destinatarioNome);
            
            if (!destinatario) {
                console.log('\nDestinatário não encontrado!');
                return;
            }

            const valor = parseFloat(prompt('Valor para transferência: R$ '));
            usuarioLogado.transferir(valor, destinatario);
            BancoDados.salvarContas(contas);
            
            console.log(`\nTransferência de ${InterfaceBanco.formatarDinheiro(valor)} para ${destinatarioNome} realizada!`);
            console.log(`Novo saldo: ${InterfaceBanco.formatarDinheiro(usuarioLogado.saldo)}`);
        } catch (err) {
            console.log(`\nErro: ${err.message}`);
        }
    }
}

// Fluxo principal
function main() {
    let opcao;
    while (true) {
        if (!usuarioLogado) {
            InterfaceBanco.mostrarMenuPrincipal();
            opcao = prompt('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    OperacoesBanco.login();
                    break;
                case '2':
                    OperacoesBanco.registrar();
                    break;
                case '3':
                    console.log('\nObrigado por usar o FranBank!');
                    return;
                default:
                    console.log('\nOpção inválida!');
            }
        } else {
            InterfaceBanco.mostrarMenuOperacoes();
            opcao = prompt('Escolha uma operação: ');

            switch (opcao) {
                case '1':
                    OperacoesBanco.depositar();
                    break;
                case '2':
                    OperacoesBanco.sacar();
                    break;
                case '3':
                    OperacoesBanco.transferir();
                    break;
                case '4':
                    usuarioLogado = null;
                    console.log('\nSessão encerrada.');
                    break;
                default:
                    console.log('\nOpção inválida!');
            }
        }
    }
}

// Inicia o sistema
main();