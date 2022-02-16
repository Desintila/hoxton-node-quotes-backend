import express from "express"
import cors from 'cors'
import quote from './resources/quotes'
import author from './resources/authors'
import { quotes } from "./resources/quotes"
import { authors } from "./resources/authors"
const app = express()
app.use(cors())
app.use(express.json())


app.use('/quotes', quote)
app.use('/authors', author)
app.get('/randomquote', (req, res) => {

    let copyOfQuotes = JSON.parse(JSON.stringify(quotes))

    for (const quote of copyOfQuotes) {
        const author = authors.find(author => author.id === quote.authorId)
        quote.author = author
    }
    const randomIndex = (Math.floor(Math.random() * copyOfQuotes.length))
    const quote = copyOfQuotes[randomIndex]
    res.send(quote)
})




app.listen(3001)


