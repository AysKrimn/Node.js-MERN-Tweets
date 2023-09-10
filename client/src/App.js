import './App.css';

import { Routes, Route } from 'react-router-dom'; 


// layout
import MainLayout from './Layout/Main';
// sayfalarımız
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';




function App() {
  return (
    
      <>
      
      {/* routes */}
      
      <Routes>

          <Route element={<MainLayout></MainLayout>}>
            {/* public routes */}
            <Route path='/' element={<HomePage></HomePage>}></Route>
            <Route path='/giris' element={<Login></Login>}></Route>
            <Route path='/kayit' element={<Register></Register>}></Route>
            
          </Route>
         

      </Routes>


      </>
  );
}

export default App;
