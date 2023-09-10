const express = require('express')
const router = express.Router()

// third party packages
const bcrpyt = require('bcrypt')
// userSchemasını çağır
const userSchema = require('../db/models/userModel')

const check_password = async (hashedPassword, sifre) => {

    const correctPassword = await bcrpyt.compare(sifre, hashedPassword)
    return correctPassword
}

// sunucu post isteklerini parse etmiyor urlencoded ile ilgili bakılacak.
router.post("/login", async (request, response) => {

    const { ad, sifre } = request.body
    console.log("[login] endpoint de ad ve sifre:", ad, sifre)

    const data = {}

    try {
        // kullanıcının godernmis oldugu sifreyi (raw) eşleştir
        // ad, sifre ile eşleşen kullanıcı var mı?
        const user = await userSchema.findOne({ name: ad })
        console.log("bulunan user:", user)

        if (user === null) {

            data.output = {

                action: "account_not_found",
                mesaj: "Böyle bir kullanıcı bulunamadı"
            }

            return response.json(data)

        } else {

            // hesap bulunmuşsa, hesabın şifresini al ve raw password ile eşleşiyor mu diye bak
            const correctPassword = await check_password(user.password, sifre)
            console.log("hash result:", correctPassword)
            // şifreler uyuşmuyorsa
            if(!correctPassword) {

                data.output = {
                    action: "account_not_found",
                    mesaj: "Kullanıcı adı veya parola hatalı"
                }

            } 
            // şifreler uyuşuyorsa
            if (correctPassword) {

                data.output = {
                    action: "account_found"
                }
            }
        

            return response.json(data)
        }
     

    } catch (error) {
        
        response.json(error)
    }


})



// kayıtolma endpointi
router.post("/register", async (request, response) => {

    const { ad, sifre, sifreTekrar, mail } = request.body

    if (!ad) return response.json("Ad boş bırakılamaz")
    if (!sifre) return response.json("Şifre boş bırakılamaz")
    if (!sifreTekrar) return response.json("Şifre tekrar boş bırakılamaz")
    if (!mail) return response.json("E-mail boş bırakılamaz")


    try {
        // user şifresini hashle
        const hashedPassword = await bcrpyt.hash(sifre, 10)
        // useri oluştur
        await userSchema.create({ name: ad, email: mail, password: hashedPassword})

        const data = {
            
            action: "account_created",
            mesaj: "Başarılı bir şekilde hesabınız oluşturuldu.",
        }
        
        response.json(data)
        
    } catch (error) {
        
        response.json(error)
    }

})


// modul olarak dışarı çıkart
module.exports = router