import Database from "better-sqlite3";


const db = new Database('./data.db', {
    verbose: console.log
})

let authors = [
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


let quotes = [
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


const dropTableQuotes = db.prepare(`DROP TABLE Quotes;`)
dropTableQuotes.run()

const createAuthors = db.prepare(`
CREATE TABLE  IF NOT EXISTS Authors(
    id INTEGER,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    image TEXT,
    age NUMBER,
    PRIMARY KEY (id)
);
`)

createAuthors.run()

const createQuotes = db.prepare(`
CREATE TABLE  IF NOT EXISTS Quotes(
    id INTEGER,
    text TEXT NOT NULL,
    author_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES Authors(id)
);
`)

createQuotes.run()

const createAuthor = db.prepare(`
INSERT INTO Authors(firstName,lastName,image,age ) VALUES (?,?,?,?);
`)

const createQuote = db.prepare(`
INSERT INTO Quotes(text,author_id) VALUES (?,?);
`)

for (const author of authors) {
    createAuthor.run(author.firstName, author.lastName, author.image, author.age);
}

for (const quote of quotes) {
    createQuote.run(quote.text, quote.authorId);
}