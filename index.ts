import express from "express"
import cors from 'cors'


const app = express()
app.use(cors())
app.use(express.json())

type Quote = {
    text: string
    firstName: string
    lastName: string
    image: string
    age: number
    id: number
}

const quotes: Quote[] = [
    {
        text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
        firstName: 'Nelson',
        lastName: 'Mandela',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/800px-Nelson_Mandela_1994.jpg',
        age: 95,
        id: 1
    },
    {
        text: 'The way to get started is to quit talking and begin doing.',
        firstName: 'Walt',
        lastName: 'Disney',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Walt_Disney_1946.JPG',
        age: 65,
        id: 2
    },
    {
        text: 'If life were predictable it would cease to be life, and be without flavor.',
        firstName: 'Eleanor',
        lastName: 'Roosevelt',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Eleanor_Roosevelt_portrait_1933.jpg/800px-Eleanor_Roosevelt_portrait_1933.jpg',
        age: 78,
        id: 3
    },
    {
        text: 'If you look at what you have in life, you wll always have more. If you look at what you do not have in life, you will never have enough.',
        firstName: 'Oprah',
        lastName: 'Winfrey',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Oprah_in_2014.jpg/800px-Oprah_in_2014.jpg',
        age: 68,
        id: 4
    },
    {
        text: 'If you set your goals ridiculously high and it is a failure, you will fail above everyone else s success.',
        firstName: 'James',
        lastName: 'Cameron',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/James_Cameron_by_Gage_Skidmore.jpg/662px-James_Cameron_by_Gage_Skidmore.jpg',
        age: 67,
        id: 5
    },
    {
        text: 'Life is what happens when you are busy making other plans. ',
        firstName: 'John',
        lastName: 'Lennon',
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/John_Lennon_1969_%28cropped%29.jpg',
        age: 40,
        id: 6
    },
    {
        text: 'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
        firstName: 'Mother Teresa',
        lastName: 'Bojaxhiu',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Mutter_Teresa_von_Kalkutta.jpg/800px-Mutter_Teresa_von_Kalkutta.jpg',
        age: 87,
        id: 7
    },
    {
        text: 'Always remember that you are absolutely unique. Just like everyone else. ',
        firstName: 'Margaret',
        lastName: 'Mead',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Margaret_Mead_%281901-1978%29.jpg/800px-Margaret_Mead_%281901-1978%29.jpg',
        age: 76,
        id: 8
    },
    {
        text: 'The future belongs to those who believe in the beauty of their dreams.',
        firstName: 'Eleanor',
        lastName: 'Roosevelt',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Eleanor_Roosevelt_portrait_1933.jpg/800px-Eleanor_Roosevelt_portrait_1933.jpg',
        age: 78,
        id: 9
    },
    {
        text: 'Tell me and I forget. Teach me and I remember. Involve me and I learn. ',
        firstName: 'Benjamin',
        lastName: 'Franklin',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg/330px-Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg',
        age: 84,
        id: 10
    }
]



app.get('/quotes', (req, res) => {
    res.send(quotes)
})

app.get('/randomquote', (req, res) => {
    const randomIndex = (Math.floor(Math.random() * quotes.length))
    const quote = quotes[randomIndex]
    res.send(quote)
})


app.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const match = quotes.find(quote => quote.id === id)
    if (match)
        res.send(match)
    else {
        res.status(400).send({ error: 'Not Found' })
    }
})

app.post('/quotes', (req, res) => {

    const text = req.body.text
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const image = req.body.image
    const age = req.body.age


    const errors = []

    if (typeof text !== 'string') errors.push('Quote missing')
    if (typeof firstName !== 'string') errors.push('FirstName missing')
    if (typeof lastName !== 'string') errors.push('LastName missing')
    if (typeof image !== 'string') errors.push('Image missing')
    if (typeof age !== 'number') errors.push('Number missing')

    if (errors.length === 0) {
        const newQuote: Quote = {
            text: text,
            firstName: firstName,
            lastName: lastName,
            image: image,
            age: age,
            id: Math.random()
        }

        quotes.push(newQuote)
        res.send(newQuote)
    }
    else {
        res.status(400).send({ error: errors })
    }
})


app.listen(3001)
