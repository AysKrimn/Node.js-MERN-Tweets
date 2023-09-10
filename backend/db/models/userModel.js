const mongoose = require('mongoose')


// şema oluştur
const userSchema = new mongoose.Schema({


    name: String,
    password: String,
    email: String,
    role: {

        type: String,
        default: "User"
    }


}, {

    timestamps: true
    // timestamps true = hesabın oluşturulma ve güncellenme tarihlerini
    // otomatik bir şekilde mongoose bizim için oluşturur.
})

// şemayı mongodb'e mongoose aracılığı ile kayıt ettir
const userModel = mongoose.model('Users', userSchema);

// userModeli, model olarak dışarıya çıakrt
module.exports = userModel