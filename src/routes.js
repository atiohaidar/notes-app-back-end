const { addNoteHandler, getAllNotesHandler, getNotesByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler") // karena handler bisa ngirim banyak, makanya make destructuring

const routes= [
        {
            method: 'POST',
            path: '/notes',
            handler: addNoteHandler//fungsi handlernya di folder lain

        },
        {
            method: 'GET',
            path: '/notes',
            handler: getAllNotesHandler

        },
        {
            method: 'GET',
            path: '/notes/{id}',
            handler: getNotesByIdHandler

        },
        {
            method: 'PUT',
            path: '/notes/{id}',
            handler: editNoteByIdHandler

        },
        {
            method: 'DELETE',
            path: '/notes/{id}',
            handler: deleteNoteByIdHandler

        },


    ]
module.exports = routes