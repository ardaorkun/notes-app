const fs = require('fs')
const chalk = require('chalk')


// Add Note Function
const addNote = (title, body) => {
    const notes = loadNotes()

    //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    
    //debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.green.inverse('Title name ' + title + ' is taken!'))
    }
}


// Remove Note Function
const removeNote = (title) => {
    const notes = loadNotes()

    const updatedNotes = notes.filter((note) => note.title !== title)

    if(updatedNotes.length < notes.length) {
        saveNotes(updatedNotes)
        console.log(chalk.green.inverse('Note removed!'))
    } else {
        console.log(chalk.red.inverse('Title not found!'))
    }
}


// Read Note Function
const readNote = (title) => {
    const notes = loadNotes()

    const chosenNote = notes.find((note) => note.title === title)

    if(chosenNote) {
        console.log(chalk.blue.italic(chosenNote.title))
        console.log(chosenNote.body)
    } else {
        console.log(chalk.red.inverse('Title not found!'))
    }
}


// List Note Function
const listNotes = () => {
    const notes = loadNotes()

    try {
        notes.forEach((note) => console.log(note.title))
        console.log(chalk.green('Your notes'))
    } catch (err) {
        console.log(chalk.red('Loading failed!'))
    }
}


// Save Note Function
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


// Load Note Function
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (err) {
        return []
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}