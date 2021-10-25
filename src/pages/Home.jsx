import { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Announcement from '../components/Announcement'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { UserContext } from '../context/usercontext'
const cookies = new Cookies()
const server = 'http://localhost:3001'

const Home = () => {
    const {setUserData} = useContext(UserContext)
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
            <Navbar />
            <Card />
        </div>
    )
}

export default Home
