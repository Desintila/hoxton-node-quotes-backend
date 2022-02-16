import { Router } from "express"
import { Author, authors } from "./authors"

const router = Router()

type Quote = {
    text: string
    authorId: number
    id: number
}

type quoteDetails = {
    text: string
    authorId: number
    id: number
    author: Author
}
export let quotes: Quote[] = [
    {
        text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
        authorId: 1,
        id: 1
    },
    {
        text: 'The way to get started is to quit talking and begin doing.',
        authorId: 2,
        id: 2
    },
    {
        text: 'If life were predictable it would cease to be life, and be without flavor.',
        authorId: 3,
        id: 3
    },
    {
        text: 'If you look at what you have in life, you wll always have more. If you look at what you do not have in life, you will never have enough.',
        authorId: 4,
        id: 4
    },
    {
        text: 'If you set your goals ridiculously high and it is a failure, you will fail above everyone else s success.',
        authorId: 5,
        id: 5
    },
    {
        text: 'Life is what happens when you are busy making other plans. ',
        authorId: 6,
        id: 6
    },
    {
        text: 'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
        authorId: 7,
        id: 7
    },
    {
        text: 'Always remember that you are absolutely unique. Just like everyone else. ',
        authorId: 8,
        id: 8
    },
    {
        text: 'The future belongs to those who believe in the beauty of their dreams.',
        authorId: 3,
        id: 9
    },
    {
        text: 'Tell me and I forget. Teach me and I remember. Involve me and I learn. ',
        authorId: 9,
        id: 10
    }
]



router.get('/', (req, res) => {
    let copyOfQuotes = JSON.parse(JSON.stringify(quotes))

    for (const quote of copyOfQuotes) {
        const author = authors.find(author => author.id === quote.authorId)
        quote.author = author
    }
    res.send(copyOfQuotes)
})



router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    const match = quotes.find(quote => quote.id === id)


    if (match) {

        const author = authors.find(author => author.id === match.authorId)

        const quote = { ...match, ...author }
        res.send(quote)
    }
    else {
        res.status(400).send({ error: 'Not Found' })
    }



})

router.post('/', (req, res) => {

    const text = req.body.text
    const authorId = req.body.authorId


    const errors = []

    if (typeof text !== 'string') errors.push('Quote missing')
    if (typeof authorId !== 'number') errors.push('Author missing')

    if (errors.length === 0) {
        const newQuote: Quote = {
            text: text,
            authorId: authorId,
            id: Math.random()
        }

        quotes.push(newQuote)
        res.send(newQuote)
    }
    else {
        res.status(400).send({ error: errors })
    }
})


router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    const match = quotes.find(quote => quote.id === id)

    if (match) {
        quotes = quotes.filter(quote => quote.id !== id)
        res.send('Quote deleted')
    }
    else {
        res.status(404).send({ error: 'Quote not found' })
    }
})


router.patch('/:id', (req, res) => {
    const id = Number(req.params.id)
    const changeQuote = quotes.find(quote => quote.id === id)

    if (changeQuote) {

        if (typeof req.body.text === 'string') {
            changeQuote.text = req.body.text
        }

        if (typeof req.body.authorId === 'number') {
            changeQuote.authorId = req.body.age
        }

        res.send(changeQuote)
    }


    else {
        res.status(404).send({ error: 'Quote not found' })
    }

})
export default router