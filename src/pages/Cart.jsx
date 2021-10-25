import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import CartTable from '../components/CartTable'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Announcement from '../components/Announcement'
import { UserContext } from '../context/usercontext'
const cookies = new Cookies()
const server = 'http://localhost:3001'

const Cart = () => {
    const { setCartProducts} = useContext(UserContext)
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
            }).catch(error => {
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
            <Navbar />
            <CartTable />
        </div>
    )
}

export default Cart
