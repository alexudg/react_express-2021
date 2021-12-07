import { Box, AppBar, Container, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}> {/* take all width */}
            <AppBar position='static' color='primary'>
                <Container>
                    <Toolbar>
                        <Typography 
                            variant='h6' 
                            sx={{ flexGrow: 1 }}> {/* take all width */}
                            <Link 
                                to='/' 
                                style={{ color: 'white', textDecoration: 'none' }}> {/* equivalent to <a href=''> */}
                                React 2021
                            </Link>
                        </Typography>
                        <Button 
                            variant='contained' 
                            color='success' 
                            onClick={() => navigate('/user/insert')}>
                            Nuevo usuario
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}