const mongoose = require('mongoose');


const make_database_connection = async () => {

    try {
        await mongoose.connect(process.env['DATABASE_URI'])
        console.log("veritabanına başarılı bir şekilde bağlanıldı.")
    } catch (error) {
        
        console.log("veritabanına bağlanırken bir hata meydana geldi:", error)
    }
   

}




module.exports = make_database_connection