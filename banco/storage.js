export function armazenamentoJson() {

    // Criando um JSON onde armazenarei os contas
    const jsonContas = JSON.stringify(listaConta, null, 2);
    console.log(jsonContas);

    // Cria um arquivo JSON para guardar as contas salvas
    const fs = require('fs');
    fs.writeFile('contas.json', jsonContas, (err) => {
        if (err) throw err;
        console.log('Arquivo salvo como "contas.json"!');
    })

}

export function carregamentoJson() {
    const dadosCarregados = JSON.parse(fs.readFileSync('contas.json', 'utf-8'));
    console.log(dadosCarregados[0].nome);
}
