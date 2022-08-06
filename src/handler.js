const { response } = require("@hapi/hapi/lib/validation")
const { nanoid } = require("nanoid")
const notes = require("./notes") // karena notes cuma  ngirim satu, makanya gausah make destructuring
const addNoteHandler= (request, h)=>{
    const {title, tags, body} = request.payload // ngambil body requesnya
    console.log("hallo")
    const id = nanoid(16)// bikin id nya, id kudu unik
    const createdAt = new Date().toISOString() // ngambil waktu
    const updatedAt = createdAt// knapa waktu updatenya = waktu createnya?, karena ini itu nge add noteanya, bukan nge edit, berarti notenya baru dibikin
    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    } // nah hasilnya itu dibikin jadi object, bikinnya make destructuring object
    notes.push(newNote) // di push ke array kosongnnya

    // dicek apakah berhasil atau ngirim ke arraynya(mungkin ini simulasi databasenya)
    const isSuccess = notes.filter((note) => note.id === id).length > 0;// ini klo banyak notes yang idnnya kek gitu lebih dari 0 berarti berhasil
    console.log(notes)
    if (isSuccess){//klo berhasil ngapain
        //base on nyoba, kalau kita ngirim object, maka otomatis content-type: application/json;
        const response = h.response({//kita body responsenya itu json, karena ngirimnya itu object, terus di coba curl nya itu waktu -i itu keterangnannya content-type: application/json;
            status: 'success',//kasih statusnya success
            message: 'Catatan berhasil ditambahkan',// kita kasih messagenya
            data: {
                nodeId: id,

            },
        })
        response.code(201)//kita kasih statuscodenya 201

        return response

    }
    // ini klo ga sukses
    const response = h.response({// ini object, jadi json bedasarkan nyoba juga
        //kalau kaget kok ada properti status, message di response?
        status: 'fail',
        // itu karena kita ngirim object yang kemungkinan besar jadi json
        message: 'Catatan gagal ditambahkan',

    });
    response.code(500);// kasih status codenya 500
    return response
}   

const getAllNotesHandler= ()=>({//posisi kita ga perlu parameternya, terus kita langsung return object aja, maka dia otomatis jadi json, kode statusnya 200 , jadi simple gitu
            status: "success",
            data: {
                notes
            }
})
const getNotesByIdHandler = (request,h)=>{
    const {id} = request.params
    const note = notes.filter((n)=>n.id === id)[0]; // kenapa make [0], karena datanya cuman satu, terus kita ga perlu array, tapi langsung isi arraynya(yang berupa object)
    if (note !== undefined){// ini kalo id nya ada
        return ({//tinggal return objectnya aja
        status: "success",
        data: {
            note
        }
    }
    )
}
//klo gagal
const response = h.response({
    
    status: "fail",
        message: "Catatan tidak ditemukan"
        
        
})
response.code(404)
console.log("gagal")
return response



}


const editNoteByIdHandler = (request,h)=>{
    const {title, tags, body} = request.payload 
    const {id} = request.params
    const updatedAt= new Date().toISOString()//createnya ga dirubah, updatenya doang
    const index = notes.findIndex((note)=>note.id===id) // ngambil index yang id nya kek gitu
    if (index !== -1){
        notes[index] = {
            ...notes[index] ,title,tags,body,updatedAt // kita masukin yang lama, terus tidih sama yang baru
        }
        
        
        const response = h.response({
            status:'sucess',
            message: 'Catatan berhasil diperbarui',
            
        })
        response.code(200);
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbaharui catatan'
    })
    response.code(404)
    return response

}
const deleteNoteByIdHandler = (request, h)=>{
    const {id} = request.params
    const index = notes.findIndex(n=>n.id === id)
    if (index !== -1){
        notes.splice(index,1)
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus'
        });
        response.code(200)
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan'
    })
    response.code(404)
    return response

}
module.exports = {addNoteHandler, getAllNotesHandler, getNotesByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler}
