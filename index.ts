import express from "express"
import cors from 'cors'
import Database from "better-sqlite3"


const app = express()
app.use(cors())
app.use(express.json())

const db = new Database('./data.db', {
    verbose: console.log
})

const getAllQuotes = db.prepare(`SELECT * FROM Quotes qt JOIN Authors at ON qt.author_id=at.id;`)
const getQuote = db.prepare(`SELECT * FROM Quotes qt JOIN Authors at ON qt.author_id=at.id  WHERE qt.id=?; `)
const deleteQuote = db.prepare(`DELETE FROM Quotes WHERE id=?;`)
const getAuthors = db.prepare(`SELECT * FROM Authors;`)
const getAuthor = db.prepare(`SELECT * FROM Authors WHERE id=?; `)
const createAuthor = db.prepare(`INSERT INTO Authors(firstName,lastName,image,age) VALUES(?,?,?,?); `)
const updateAuthor = db.prepare(`UPDATE Authors SET firstName=?,lastName=?,image=?,age=? WHERE id=?;`)
const getSingleQuote = db.prepare(`SELECT * FROM Quotes   WHERE id=?; `)

app.get('/quotes', (req, res) => {
    const allQuotes = getAllQuotes.all()
    res.send(allQuotes)
})


app.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const match = getQuote.get(id)

    if (match)

        res.send(match)

    else {

        res.status(400).send({ error: 'Not Found' })
    }
})

app.get('/authors', (req, res) => {
    const allAuthors = getAuthors.all()
    res.send(allAuthors)
})

app.get('/randomquote', (req, res) => {
    const randomIndex = (Math.floor(Math.random() * getAllQuotes.all().length))

    const quote = getAllQuotes.all()[randomIndex]

    res.send(quote)
})


app.delete('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)

    const result = getSingleQuote.run(id)

    if (result) {
        deleteQuote.run(id)
        res.send('Quote deleted')
    }
    else {

        res.status(404).send({ error: 'Quote not found' })
    }
})


app.post('/authors', (req, res) => {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const image = req.body.image
    const age = req.body.age


    const errors = []

    if (typeof firstName !== 'string') errors.push('FirstName missing')
    if (typeof lastName !== 'string') errors.push('LastName missing')
    if (typeof image !== 'string') errors.push('Image missing')
    if (typeof age !== 'number') errors.push('Number missing')

    if (errors.length === 0) {
        const result = createAuthor.run(firstName, lastName, image, age)

        const author = getAuthor.run(result.lastInsertRowid)
        res.send(author)
    }
    else {
        res.status(400).send({ error: errors })
    }
})



app.patch('/authors/:id', (req, res) => {
    const id = Number(req.params.id)

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const image = req.body.image
    const age = req.body.age

    const result = getAuthor.get(id)

    if (result) {

        updateAuthor.run(firstName, lastName, image, age, id)
        const updatedAuthor = getAuthor.get(id)
        res.send(updatedAuthor)
    }


    else {
        res.status(404).send({ error: 'Author not found' })
    }

})

app.listen(process.env.PORT)


