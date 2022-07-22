const express = require('express');

const app = express()

app.use(express.json())

let produtos = [
    {
        "name" : "caneta",
        "description": "bic",
        "price":129,
        "id": 1
    }
]

app.post('/produto/criar', (req, res) => {
    const content = [...produtos, ...req.body]
    produtos = content
    res.status(201).json(produtos)
    })

app.put('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const content = req.body;
    const produto = produtos.find((produto) => produto.id === id)

    if (!produto) {
        return res.status(400).json({"message": "Produto nao encontrado"})
    }

    produtos=produtos.map((produto) => produto.id === id ? content : produto) 
    res.status(200).json(produtos)
})


app.delete('/produtos/:id', (req, res) => {
const id = Number(req.params.id);
const content = req.body;

const produto = produtos.find((produto) => produto.id === id)

if (!produto) {
    return res.status(400).json({"message": "Produto nao encontrado"})
}

produtos=produtos.filter((produto) => produto.id !== id) 

res.status(200).json(produtos)
})

    
app.get('/produtos', (req, res) => {
    res.status(200).json(produtos)
})



app.listen(3001,() => 
console.log('SERVIDOR ON')
)