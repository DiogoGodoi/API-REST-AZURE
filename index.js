const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sql = require('mssql')
const dbConfig = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Exibir
app.get('/vidros', (req, res) => {
    try {
        sql.connect(dbConfig.sqlConfig).then((resposta) => {
            let query = `SELECT * FROM Estoque`
            return resposta.request().query(query)
        }).then((dados) => {
            let dadosDB = dados.recordset
            res.json(dadosDB)
        }).catch((erro) => {
            console.log('Erro', erro)
        })
    } catch (erro) {
        console.log('Erro')
        res.json('Erro').status(404)
    }
})

//Cadastrar
app.post('/vidros/cadastrar', (req, res) => {
    try {
        const { nome, unidade, codigo, quantidade, estoqueMin } = req.body
        sql.connect(dbConfig.sqlConfig).then((resposta) => {
            let query = `INSERT INTO Estoque (codigo, nome, unidade, quantidade, estoqueMin) VALUES (${codigo}, '${nome}', '${unidade}', ${quantidade}, ${estoqueMin})`
            return resposta.request().query(query)
        }).then((dados) => {
            let dadosDB = dados.rowsAffected
            res.json(dadosDB)
        }).catch((erro) => {
            console.log(`Erro: ${erro}`)
        })
    } catch (erro) {
        console.log('Erro: ', erro)
        res.json('Erro').status(404)
    }
})

//Pesquisar
app.get('/vidros/:codigo', (req, res) => {
    try {
        let codigo = req.params.codigo
        sql.connect(dbConfig.sqlConfig).then((resposta) => {
            let query = `SELECT * FROM Estoque WHERE codigo=${codigo}`
            return resposta.request().query(query).then((resposta) => {
                console.log(resposta.recordset)
                res.json(resposta.recordset)
            }).catch((erro) => {
                res.json('Erro: ', erro)
            })
        })
    } catch (erro) {
        console.log('Erro', erro)
        res.json('Erro').status(404)
    }
})

//altetar
app.patch('/vidros/alterar/:codigo', (req, res) => {

    try {
        const { nome, unidade, quantidade, estoqueMin } = req.body
        const codigo = req.params.codigo;
        sql.connect(dbConfig.sqlConfig).then((resposta) => {
            let query = `UPDATE Estoque SET nome='${nome}', unidade='${unidade}', quantidade=${quantidade}, estoqueMin=${estoqueMin} WHERE codigo=${codigo}`
            return resposta.request().query(query)
        }).then((resposta) => {
            res.json('Alterado').status(200)
        }).catch((erro) => {
            res.json('Erro: ', erro)
        })
    } catch (erro) {
        console.log('Erro: ', erro)
        res.json('Erro').status(404)
    }

})

//deletar
app.delete('/vidros/deletar/:codigo', (req, res) => {
    try {
        let codigo = req.params.codigo
        sql.connect(dbConfig.sqlConfig).then((resposta) => {
            let query = `DELETE FROM Estoque WHERE codigo=${codigo}`
            return resposta.request().query(query).then((resposta) => {
                res.json('Deletado').status(200)
            }).catch((erro) => {
                res.json('Erro: ', erro)
            })
        })
    } catch (erro) {
        console.log('Erro: ', erro)
        res.json('Erro').status(404)
    }

})

const PORT = 8060

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})