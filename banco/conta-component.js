export class Conta {
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