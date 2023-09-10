import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ passwordAgain, setPasswordAgain ] = useState("")
    const [ email, setEmail ] = useState("")
    const yonlendir = useNavigate()
    // api isteğini gerçekleştir
    const make_api_request = async (event) => {
        // sayfanın yenilenmesini önle
        event.preventDefault()


        const data = {

            ad: username,
            sifre: password,
            sifreTekrar: passwordAgain,
            mail: email
        }

        const request = await fetch("http://localhost:4000/api/v1/register", {

            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const response = await request.json()
        alert(response.mesaj)
        console.log("register endpointinden gelen veri:", response)

        // eğer hesap oluşursa logine yönlendir
        if (response.action === "account_created") {

            // yönlendir
            yonlendir("/giris")
        }

    }


  return (

    <>
    
    <div className='container mt-5'>
        
        <h3>Kayıt Ol</h3>
        <hr />


        <form onSubmit={make_api_request}>


            <div className='mb-3'>

                <input type="text" placeholder='Kullanıcı Adı' value={username} onChange={(e) => setUsername(e.target.value)} />

            </div>

            <div className='mb-3'>

                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />

            </div>

            <div className="mb-3">

                <input type="password"  placeholder='şifre' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>


            <div className="mb-3">

                <input type="password"  placeholder='şifre tekrar' value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} />
            </div>

            <div>
                <p>Zaten bir hesabınız var mı? Buradan
                    <Link className='no-line' to="/giris"> giriş yapabilirsiniz</Link>
                </p>
            </div>

           <div>

                <button className='btn btn-success' type='submit'>Kayıt Ol</button>
           </div>

        </form>

    </div>
    
    
    </>
  )
}
