// env dosyalarını yükle
require('dotenv').config()
// application level
const express = require('express')
const app = express()
const port = 4000

// nodejs'in path kütüphanesi
const path = require('path')

// third party middlewares
const cors = require('cors')
// tüm endpointlerde cros kullan
app.use(cors())

// userAPI routerini çek
const userAPI = require('./api/userAPI')

// veritabanını bağlantı fonksiyonunu çek
const db_connection = require('./db/connect/connection')
// bağlan
db_connection()

// tarayıcının javascript ile nodejs'nin javascripti aynı değildir
// nodejs de: alert, prompt, window document, navigasyon vs tarayıcıda çalışan metotlar burada yoktur.
function sayfayiHazirla(dosyaAdi) {
    const dir = path.join(__dirname, 'pages')
    console.log("path:", dir)

    return `${dir}/${dosyaAdi}`

}


//  http://localhost:4000/api/v1/kullanicilar

// built-in middleware
// app.use(express.urlencoded({ extended: false }))
app.use(express.json())  // json olarak gelen verileri ayıkla ve requestin body kısmına entegre et

// anasayfaya istek geldiğinde 
app.get("/", (request, response) => {
    console.log("routerdeyim şuan")
    console.log("anasayfadaki kullanıcı:", request.name)
// userin ip adresi, hangi tarayıcıdan istek atmis?, proxy var mı, 
// console.log("HOST:", request.hostname)
// console.dir("ip:", request.ip)
// console.log("endpoint:", request.originalUrl)
// cevap dön
const anasayfa = sayfayiHazirla("index.html")
response.sendFile(anasayfa)

})


const rootPath = "/api/v1"
// app'e userAPI routerlerini kullanmasını söyle
app.use(rootPath, userAPI)



// uygulamayı ateşle
app.listen(port, () => {
    console.log(`Backend ${port}'da çalışıyor.`)
})