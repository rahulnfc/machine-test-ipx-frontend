import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CartTable from '../components/CartTable'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Announcement from '../components/Announcement'
const cookies = new Cookies()
const server = 'http://localhost:3001'

const Cart = (props) => {
    const { cartCount } = props;
    const [cartProducts, setCartProducts] = useState([]);
    const token = cookies.get('userjwt')
    const userId = localStorage.getItem('userId')
    const history = useHistory()

    useEffect(() => {
        // check token is available
        if (!token) {
            history.push('/login')
        } else {
            // get cart products
            axios.get(`${server}/api/user/cart/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setCartProducts(res.data)
            }).catch(err => {
                cookies.remove('userjwt')
                localStorage.removeItem('userId')
                localStorage.removeItem('isAuthenticated')
                history.push('/login')
            })
        }
    }, [token, userId, history, setCartProducts])

    return (
        <div>
            <Announcement />
            <Navbar
                cartCount={cartCount}
            />
            <CartTable
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
            />
        </div>
    )
}

export default Cart
