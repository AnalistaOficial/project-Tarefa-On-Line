import {BrowserRouter} from 'react-router-dom';
import RoutesApp from './routes';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
   
      <BrowserRouter>
        <RoutesApp/>
        <ToastContainer />  
      </BrowserRouter>      
  )
}

export default App
