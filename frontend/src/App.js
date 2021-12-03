import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import UsersList from './components/UsersList';
import { Container } from '@mui/material'; // package @ui/material

export default function App() {
    return (
        <BrowserRouter>
            <Container>
                <Routes>
                    <Route path='/' element={<UsersList />} />
                    <Route path='/user/insert' element={<UserForm />} />
                    <Route path='/user/update' element={<UserForm />} />
                    {/* comentario */}
                </Routes>
            </Container>

        </BrowserRouter>
    )
}