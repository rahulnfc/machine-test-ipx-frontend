import { useContext, useEffect } from 'react'
import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import styled from 'styled-components'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { UserContext } from '../context/usercontext'
const cookies = new Cookies()
const server = 'http://localhost:3001'

const Container = styled.div`
    height: 60px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    position: fixed;
    top: 1.8rem;
    z-index: 100;
    background-color: white;
    @media (max-width: 320px) {
        height: 5rem;
    }
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 320px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    @media (max-width: 425px) {
        display: none;
    }
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    border-radius: 10px;
`;

const Input = styled.input`
    border: none;
    outline: none;
    border-radius: 5px;
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled(Link)`
    font-weight: bold;
    font-size: 2rem;
    text-decoration: none;
    color: black;
    cursor: pointer;
    &:hover {
        color: teal;
    }
    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    text-decoration: none;
    color: black;
    &:hover {
        color: teal;
    }
`;

const Navbar = () => {
    const history = useHistory()
    const { userData, cartCount, setCartCount, logined, setLogined, search, setSearch } = useContext(UserContext)
    const userId = localStorage.getItem('userId')

    const handleLogout = () => {
        setLogined(false)
        if (!logined) {
            cookies.remove('userjwt')
            localStorage.removeItem('userId')
            localStorage.removeItem('isAuthenticated')
            history.push('/login')
        }
    }

    useEffect(() => {
        // fetch the cart count
        axios.get(`${server}/api/user/cartCount/${userId}`).then(res => {
            setCartCount(res.data)
        }).catch(error => {
            console.log(error)
        })
    });

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <Search style={{ color: 'gray', fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo to='/'>TrendZStation.</Logo>
                </Center>
                <Right>
                    {userData.username !== undefined && <MenuItem> Hi, <span style={{ color: 'teal' }}>{userData.username}</span></MenuItem>}
                    <MenuItem>
                        <Link to='/cart' style={{ textDecoration: 'none', color: 'black' }}>
                            <Badge badgeContent={cartCount} color="primary" >
                                <ShoppingCartOutlined />
                            </Badge>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
