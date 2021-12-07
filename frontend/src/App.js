import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material'; // package @ui/material
import UserForm from './components/UserForm';
import UsersList from './components/UsersList';
import Menu from './components/Navbar';

export default function App() {
    return (
        <BrowserRouter>
            <Menu/>
            <Container>
                <Routes>
                    <Route path='/' element={<UsersList />} />
                    <Route path='/user/insert' element={<UserForm />} />
                    <Route path='/user/update/:id' element={<UserForm />} />                                        
                </Routes>
            </Container>
        </BrowserRouter>
    )
}