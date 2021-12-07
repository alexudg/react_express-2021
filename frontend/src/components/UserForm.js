import { useNavigate, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, TextField, Button, CircularProgress } from '@mui/material';

export default function UserForm() {
    const [user, setUser] = useState({
        id: null,
        userName: '',
        email: '',
        age: null,
        height: null
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (eve) => {
        eve.preventDefault();
        user['age'] = parseInt(user['age']);
        user['height'] = parseFloat(user['height']);
        //console.log(JSON.stringify(user)); 
        
        setLoading(true);
        params['id']
            ? await fetch('http://localhost:4000/users', {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                    setLoading(false);
                    if (data.success)
                        navigate('/');
                })
            : await fetch('http://localhost:4000/users', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                    setLoading(false);
                    if (data.success)
                        navigate('/');
                });
    }

    const handleChange = (eve) => {
        //console.log(eve.target.name, eve.target.value);

        /// save value on variable (method compact)
        setUser({ ...user, [eve.target.name]: eve.target.value });
    }

    async function loadUser(id) {
        await fetch(`http://localhost:4000/users/${id}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setUser({
                    id: data['id'],
                    userName: data['userName'],
                    email: data['email'],
                    age: data['age'],
                    height: data['height']
                });
            });
    }

    /// validation of params exists at onLoad this component
    useEffect(() => {
        if (params['id']) {
            //console.log(params);
            //user['id'] = params['id'];
            loadUser(params['id']);
        }
    }, []);

    return (
        <Grid
            container
            direction='column'
            alignItems='center'
            justifyContent='center'>
            <Grid item xs={3}> {/* caution, xs(grid-size) != sx(style) */}
                <Card
                    sx={{ mt: 5 }}>
                    <Typography
                        variant='h6'
                        textAlign='center'>
                        {params['id'] ?
                            'Modificando usuario' : 'Agregando usuario'
                        }
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label='Usuario'
                                variant='filled'
                                placeholder='Nombre de usuario'
                                sx={{ display: 'block', margin: '0.5rem 0' }}
                                inputProps={{ style: { color: 'grey' } }}
                                InputLabelProps={{ style: { color: 'blue' } }}
                                name='userName'
                                value={user.userName}
                                onChange={handleChange}
                            />
                            <TextField
                                label='Correo'
                                variant='filled'
                                placeholder='Correo electrónico'
                                sx={{ display: 'block', margin: '0.5rem 0' }}
                                inputProps={{ style: { color: 'grey' } }}
                                InputLabelProps={{ style: { color: 'blue' } }}
                                name='email'
                                value={user.email}
                                onChange={handleChange}
                            /* multiline rows={x} */
                            />
                            <TextField
                                label='Edad'
                                variant='filled'
                                placeholder='Edad'
                                sx={{ display: 'block', margin: '0.5rem 0' }}
                                inputProps={{ style: { color: 'grey' } }}
                                InputLabelProps={{ style: { color: 'blue' } }}
                                name='age'
                                value={user.age}
                                onChange={handleChange}
                            />
                            <TextField
                                label='Estatura'
                                variant='filled'
                                placeholder='Estatura'
                                sx={{ display: 'block', margin: '0.5rem 0' }}
                                inputProps={{ style: { color: 'grey' } }}
                                InputLabelProps={{ style: { color: 'blue' } }}
                                name='height'
                                value={user.height}
                                onChange={handleChange}
                            />
                            <Button
                                variant='contained' type='submit' disabled={!user.userName || !user.email || !user.age || !user.height || loading}
                                sx={{ marginRight: '0.5rem' }}>
                                {loading
                                    ? <CircularProgress color='inherit' size={24} />
                                    : 'Guardar'
                                }
                            </Button>
                            <Button
                                variant='contained'
                                sx={{ backgroundColor: 'gray' }}
                                onClick={() => navigate('/')}>
                                Cancelar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}