const livros = [{}]

const cadastrarLivros = (autor, titulo, ano) => {
    dados = { autor: autor, titulo: titulo, ano: ano }
    livros.push(dados)
    return livros
}

const alterarLivro = (parametro, pAno, pAutor, pTitulo) => {
    let procurar = livros.find((i) => i.autor == parametro)
    procurar.autor = pAutor
    procurar.titulo = pTitulo
    procurar.ano = pAno
    return livros;
}

const exibirLivros = () => {
    return livros
}

const procurarLivros = (parametro) => {
    let procurar = livros.find((i) => i.autor === parametro)
    return procurar;
}

const deletarLivros = (parametro) => {
    let procurar = livros.find((i) => i.autor !== parametro)
    livros = procurar
    return procurar
}

module.exports = { cadastrarLivros, exibirLivros, procurarLivros, alterarLivro, deletarLivros };