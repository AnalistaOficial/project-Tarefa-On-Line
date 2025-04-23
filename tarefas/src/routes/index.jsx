import {Route, Routes} from 'react-router-dom';

//Pages...
import Private from './Private/'
import Home from '../pages/Home';
import Tarefas from '../pages/Tarefas';
import Register from '../pages/Register';


function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/tarefas' element={<Private> <Tarefas/> </Private>}/>
        </Routes>
    )
}

export default RoutesApp;

