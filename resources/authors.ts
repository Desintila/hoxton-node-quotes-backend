import { Router } from "express"
import { quotes } from "./quotes"

const router = Router()

export type Author = {
    firstName: string
    lastName: string
    image: string
    age: number
    id: number
}


export let authors: Author[] = [
    {
        firstName: 'Nelson',
        lastName: 'Mandela',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/800px-Nelson_Mandela_1994.jpg',
        age: 95,
        id: 1
    },
    {
        firstName: 'Walt',
        lastName: 'Disney',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Walt_Disney_1946.JPG',
        age: 65,
        id: 2
    },
    {
        firstName: 'Eleanor',
        lastName: 'Roosevelt',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Eleanor_Roosevelt_portrait_1933.jpg/800px-Eleanor_Roosevelt_portrait_1933.jpg',
        age: 78,
        id: 3
    },
    {
        firstName: 'Oprah',
        lastName: 'Winfrey',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Oprah_in_2014.jpg/800px-Oprah_in_2014.jpg',
        age: 68,
        id: 4
    },
    {
        firstName: 'James',
        lastName: 'Cameron',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/James_Cameron_by_Gage_Skidmore.jpg/662px-James_Cameron_by_Gage_Skidmore.jpg',
        age: 67,
        id: 5
    },
    {
        firstName: 'John',
        lastName: 'Lennon',
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/John_Lennon_1969_%28cropped%29.jpg',
        age: 40,
        id: 6
    },
    {
        firstName: 'Mother Teresa',
        lastName: 'Bojaxhiu',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Mutter_Teresa_von_Kalkutta.jpg/800px-Mutter_Teresa_von_Kalkutta.jpg',
        age: 87,
        id: 7
    },
    {
        firstName: 'Margaret',
        lastName: 'Mead',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Margaret_Mead_%281901-1978%29.jpg/800px-Margaret_Mead_%281901-1978%29.jpg',
        age: 76,
        id: 8
    },
    {
        firstName: 'Benjamin',
        lastName: 'Franklin',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg/330px-Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg',
        age: 84,
        id: 9
    }
]

router.get('/', (req, res) => {
    let copyOfAuthors = JSON.parse(JSON.stringify(authors))

    for (const author of copyOfAuthors) {
        const authorQuotes = quotes.filter(quote => quote.authorId === author.id)
        author.quotes = authorQuotes
    }
    res.send(copyOfAuthors)
})



router.post('/', (req, res) => {

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
        const newAuthor: Author = {
            firstName: firstName,
            lastName: lastName,
            image: image,
            age: age,
            id: Math.random()
        }

        authors.push(newAuthor)
        res.send(newAuthor)
    }
    else {
        res.status(400).send({ error: errors })
    }
})


router.patch('/:id', (req, res) => {
    const id = Number(req.params.id)
    const updateAuthor = authors.find(author => author.id === id)

    if (updateAuthor) {

        if (typeof req.body.firstName === 'string') {
            updateAuthor.firstName = req.body.firstName
        }

        if (typeof req.body.lastName === 'string') {
            updateAuthor.lastName = req.body.lastName
        }

        if (typeof req.body.image === 'string') {
            updateAuthor.image = req.body.image
        }

        if (typeof req.body.age === 'number') {
            updateAuthor.age = req.body.age
        }


        res.send(updateAuthor)
    }


    else {
        res.status(404).send({ error: 'Author not found' })
    }
})


router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    const match = authors.find(author => author.id === id)

    if (match) {
        authors = authors.filter(author => author.id !== id)
        res.send('Author deleted')
    }
    else {
        res.status(404).send({ error: 'Author not found' })
    }
})
export default router