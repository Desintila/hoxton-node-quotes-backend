import express from "express"
import cors from 'cors'


const app = express()
app.use(cors())

type Quote = {
    text: string
    author: string
}

const quotes: Quote[] = [
    {
        text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
        author: 'Nelson Mandela'
    },
    {
        text: 'The way to get started is to quit talking and begin doing.',
        author: 'Walt Disney'
    },
    {
        text: 'If life were predictable it would cease to be life, and be without flavor.',
        author: 'Eleanor Roosevelt'
    },
    {
        text: 'If you look at what you have in life, you wll always have more. If you look at what you do not have in life, you will never have enough.',
        author: 'Oprah Winfrey'
    },
    {
        text: 'If you set your goals ridiculously high and it is a failure, you will fail above everyone else s success.',
        author: 'James Cameron'
    },
    {
        text: 'Life is what happens when you are busy making other plans. ',
        author: 'John Lennon'
    },
    {
        text: 'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
        author: 'Mother Teresa'
    },
    {
        text: 'Always remember that you are absolutely unique. Just like everyone else. ',
        author: 'Margaret Mead'
    },
    {
        text: 'The future belongs to those who believe in the beauty of their dreams.',
        author: 'Eleanor Roosevelt'
    },
    {
        text: 'Tell me and I forget. Teach me and I remember. Involve me and I learn. ',
        author: 'Benjamin Franklin'
    }
]



app.get('/quotes', (req, res) => {
    res.send(quotes)
})

app.listen(3001)
