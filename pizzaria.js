let pizzaria = []

function adicionarPizza() {
    const sabor = document.getElementById('sabor').value
    const ingredientes = document.getElementById('ingredientes').value
    const preco = parseFloat(document.getElementById('preco').value)

    if (sabor && ingredientes && preco) {
        pizzaria.push({sabor, ingredientes, preco})
        document.getElementById('sabor').value = ''
        document.getElementById('ingredientes').value = ''
        document.getElementById('preco').value = ''
        atualizarLista()
        document.getElementById('sucessoCadastro').innerHTML = 'Pizza adicionada com sucesso!'
    } else {
        document.getElementById('erroCadastro').innerHTML = ('Preencha todos os campos')
    }
}

function buscarPizza() {
    const busca = document.getElementById('buscar').value.toLowerCase()
    const resultados = pizzaria.filter ((pizza) => pizza.sabor.toLowerCase().includes(busca))
    atualizarLista(resultados)
}

function atualizarLista(lista = pizzaria) {
    const tabela = document.getElementById('lista-pizza')
    tabela.innerHTML = ''

    lista.forEach((pizza) => {
        const linha = document.createElement('tr')
        linha.innerHTML = `
        <td>${pizza.sabor}</td>
        <td>${pizza.ingredientes}</td>
        <td>R$${pizza.preco.toFixed(2)}</td>
        `
        tabela.appendChild(linha)
    })
}

function buscarPizzaParaAlterar() {
    const busca = document.getElementById('busca-alterar').value.toLowerCase()
    pizzaParaAlterar = pizzaria.find((pizza) => pizza.sabor.toLowerCase().includes(busca))

    if (pizzaParaAlterar) {
        document.getElementById('form-alterar').classList.remove('hidden')
        document.getElementById('novo-sabor').value = pizzaParaAlterar.sabor
        document.getElementById('novo-ingredientes').value = pizzaParaAlterar.ingredientes
        document.getElementById('novo-preco').value = pizzaParaAlterar.preco
    } else {
        document.getElementById('erroBuscar').innerHTML = ('Pizza não encontrada')
    }
}

function alterarPizza() {
    if (pizzaParaAlterar) {
        const novoSabor = document.getElementById('novo-sabor').value
        const novoIngredientes = document.getElementById('novo-ingredientes').value
        const novoPreco = parseFloat(document.getElementById('novo-preco').value)

        if (novoSabor && novoIngredientes && novoPreco) {
            pizzaParaAlterar.sabor = novoSabor
            pizzaParaAlterar.ingredientes = novoIngredientes
            pizzaParaAlterar.preco = novoPreco

            atualizarLista()
            document.getElementById('sucessoAlterar').innerHTML = ('Pizza alterada com sucesso!')
            document.getElementById('form-alterar').classList.add('hidden')
        } else {
            document.getElementById('erroAlterar').innerHTML = ('Preencha todos os campos')
        }
    }
}