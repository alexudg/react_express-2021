import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@mui/material';

export default function UsersList() {
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        await fetch('http://localhost:4000/users')
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setUsers(data);
            });
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const navigate = useNavigate();

    async function handleDelete(id) {
        //console.log(id);
        await fetch(`http://localhost:4000/users/${id}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            if (data.success) 
                loadUsers();
        });
    }

    return (
        <>
            <h1>Lista de usuarios</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Usuario</TableCell>
                        <TableCell>Correo</TableCell>
                        <TableCell>Edad</TableCell>
                        <TableCell>Estatura</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user =>
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.userName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell>{user.height}</TableCell>
                            <TableCell>
                                <Button 
                                    variant='contained'
                                    onClick={() => navigate(`/user/update/${user.id}`)}
                                    >Modificar</Button>
                                <Button 
                                    variant='contained' 
                                    color='error' 
                                    sx={{ marginLeft: '0.5rem' }}
                                    onClick={() => handleDelete(user.id)}
                                    >Eliminar</Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6} sx={{ textAlign: 'center' }}>{users.length} usuarios</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    );
}