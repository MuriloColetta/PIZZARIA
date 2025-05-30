function exibirMensagem(texto, tipo) {
  const mensagem = document.getElementById('mensagem')
  mensagem.textContent = texto
  mensagem.className = `mensagem ${tipo}`
  mensagem.classList.remove('hidden')
  setTimeout(() => {
    mensagem.classList.add('hidden')
  }, 3000)
}

function validarLogin() {
  const usuario = document.getElementById('usuario').value
  const senha = document.getElementById('senha').value
  const usuarioCorreto = 'admin'
  const senhaCorreta = '1234'
  
  if (usuario === usuarioCorreto && senha === senhaCorreta) {
    exibirMensagem('Login realizado com sucesso!', 'sucesso')
    setTimeout(() => {
      window.location.href = 'pizzaria.html'
    }, 1000)
  } else {
    exibirMensagem('Usuário ou senha incorretos.', 'Error')
  }
}

let pizzaria = []
let pizzaParaAlterar = null;

function mostrarSecao(secao) {
    document.getElementById("cadastro").classList.add("hidden");
    document.getElementById("cardapio").classList.add("hidden");
    document.getElementById("alterar").classList.add("hidden");
    document.getElementById("venda").classList.add("hidden");
    document.getElementById("relatorio").classList.add("hidden");
    document.getElementById(secao).classList.remove("hidden");
} 

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
        document.getElementById('erroCadastro').innerHTML = ''
    } else {
        document.getElementById('erroCadastro').innerHTML = ('Preencha todos os campos')
        document.getElementById('sucessoCadastro').innerHTML = ''
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
        alert('Pizza não encontrada.')
        document.getElementById('form-alterar').classList.add('hidden')
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
            document.getElementById('erroAlterar').innerHTML = ''
            document.getElementById('form-alterar').classList.add('hidden')
        } else {
            document.getElementById('erroAlterar').innerHTML = ('Preencha todos os campos')
            document.getElementById('sucessoAlterar').innerHTML = ''
        }
    }
}

let vendas = []

function registrarVenda() {
    const sabor = document.getElementById('venda-sabor').value
    const cliente = document.getElementById('venda-cliente').value

    const pizzaNoCardapio = pizzaria.find((pizza) => pizza.sabor.toLowerCase() === sabor.toLowerCase())

    if (pizzaNoCardapio) {
        const preco = pizzaNoCardapio.preco

        if (cliente) {
            const listarVendas = document.getElementById('lista-vendas')
            const item = document.createElement('li')
            item.textContent = `Sabor: ${sabor}, Preço: R$${preco.toFixed(2)}, Cliente: ${cliente}`
            listarVendas.appendChild(item)

            vendas.push({ sabor, preco, cliente })

            document.getElementById('venda-sabor').value = ''
            document.getElementById('venda-cliente').value = ''
            document.getElementById('sucessoVenda').innerHTML = 'Venda registrada.'
            document.getElementById('erroVenda').innerHTML = ''
        } else {
            document.getElementById('erroVenda').innerHTML = 'Preencha todos os campos.'
            document.getElementById('sucessoVenda').innerHTML = ''
        }
    } else {
        document.getElementById('erroVenda').innerHTML = `A pizza de sabor "${sabor}" não está no cardápio.`
        document.getElementById('sucessoVenda').innerHTML = ''
    }
}

let totalVendas = 0;

function gerarRelatorioVendas() {
    const tabelaRelatorio = document.getElementById('tabela-relatorio-vendas')
    tabelaRelatorio.innerHTML = ''

    totalVendas = 0;

    if (vendas.length === 0) {
        document.getElementById('erroRelatorio').innerHTML = 'Nenhuma venda registrada.'
        return
    }

    vendas.forEach((venda) => {
        const linha = document.createElement('tr')
        linha.innerHTML = `
            <td>${venda.cliente}</td>
            <td>${venda.sabor}</td>
            <td>R$${venda.preco.toFixed(2)}</td>
            
        `
        tabelaRelatorio.appendChild(linha)

        totalVendas += venda.preco;
    })

    const linhaTotal = document.createElement('tr')
    linhaTotal.innerHTML = `
        <td colspan="2"><strong>Total de Vendas:</strong></td>
        <td><strong>R$${totalVendas.toFixed(2)}</strong></td>
    `
    tabelaRelatorio.appendChild(linhaTotal)

    document.getElementById('relatorio').classList.remove('hidden')
    document.getElementById('erroRelatorio').innerHTML = ''
}