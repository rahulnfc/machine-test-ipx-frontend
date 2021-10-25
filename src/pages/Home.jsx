import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Announcement from '../components/Announcement'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
const server = 'http://localhost:3001'

const Home = (props) => {
    const [userData, setUserData] = useState({});
    const { cartCount, setCartCount } = props
    const [products, setProducts] = useState([]);
    const token = cookies.get('userjwt')
    const userId = localStorage.getItem('userId')
    const history = useHistory()

    useEffect(() => {
        // check token is available
        if (!token) {
            history.push('/login')
        } else {
            // send browser cookies to the backend using the axios
            axios.get(`${server}/api/user/`, { headers: { Authorization: `Bearer ${token} ${userId}` } }).then((res) => {
                setUserData(res.data.user)
                console.log(res.data.user)
            }).catch(error => {
                cookies.remove('userjwt')
                localStorage.removeItem('userId')
                localStorage.removeItem('isAuthenticated')
                history.push('/login')
            })
        }
    }, [userId, token, history, setUserData])
    return (
        <div>
            <Announcement />
            <Navbar
                username={userData.username}
                cartCount={cartCount}
                setProducts={setProducts}
            />
            <Card
                key='productCard'
                products={products}
                setProducts={setProducts}
                setCartCount={setCartCount}
            />
        </div>
    )
}

export default Home
