import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function Login() {

  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")

  // make api request
  const makeAPIRequest = async (e) => {
        // sayfanın yenilenmesiini engelle
        e.preventDefault()
        
        const data = {

            ad: username,
            sifre: password
        }
        const request = await fetch("http://localhost:4000/api/v1/login", {

            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const response = await request.json()
        console.log("APIDAN GELEN VERİ:", response)
        if (response.output.action === "account_not_found") {

            alert(response.output.mesaj)

        } else {
            // hesap bulundu login yap
            alert("Hesap bulundu.")
        }
  }

  return (
    
    <>
    
    <div className='container mt-5'>
        
        <h3>Giriş Yap</h3>
        <hr />


        <form onSubmit={makeAPIRequest}>


            <div className='mb-3'>

                <input type="text" placeholder='Kullanıcı Adı' value={username} onChange={(e) => setUsername(e.target.value)} />

            </div>

            <div className="mb-3">

                <input type="password"  placeholder='şifre' value={password}  onChange={(e) => setPassword(e.target.value)}  />
            </div>

            <div>
                <p>Bir hesabınız yok mu? Buradan
                    <Link className='no-line' to="/kayit"> kayıt olabilirsiniz</Link>
            
                </p>
            </div>

           <div>

                <button className='btn btn-success' type='submit'>Giriş Yap</button>
           </div>

        </form>

    </div>
    
    
    </>
  )
}
