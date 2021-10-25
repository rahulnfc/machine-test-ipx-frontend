import { useEffect } from 'react'
import { ShoppingCartOutlined } from '@material-ui/icons'
import styled from 'styled-components'
import axios from 'axios'
const server = 'http://localhost:3001'

const Container = styled.div`
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    top: 5rem;
    flex-wrap: wrap;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);  
    @media (max-width: 768px) {
        justify-content: center;
    }
`;
const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 15rem;
    height: 20rem;
    margin: 30px 15px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;
const ProductImage = styled.img`
    width: 10rem;
    height: 10rem;
    border-radius: 5px;
    margin: 20px 0;
    cursor: pointer;
`;
const ProductDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 15rem;
    height: 20rem;
    & h5 {
        white-space: nowrap;
        width: 50%;
        overflow: hidden;
        text-overflow: '---';
    }
    & p {
        margin-top: 10px;
        font-size: 1.2rem;
    }
`;
const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 10px;
`;
const Button = styled.button`
    background-color: teal;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px;
    margin: 10px;
    cursor: pointer;
    &:hover {
        background-color: #fff;
        color: teal;
    }
`;

const Card = (props) => {
    const { products, setProducts, setCartCount } = props
    const userId = localStorage.getItem('userId');

    const addToCart = (async (productId) => {
        await axios.post(`${server}/api/user/addToCart`, { productId, userId }).then(res => {
            setCartCount(res.data.cartCount)
        })
    });

    useEffect(() => {
        axios.get(`${server}/api/products`).then(res => {
            setProducts(res.data)
        }).catch(err => {
            console.log(err.response)
        })
    }, [setProducts]);

    return (
        <Container>
            {products.map(product => {
                return (
                    <ProductCard key={product._id}>
                        <ProductImage src={product.image} alt={product.title} />
                        <ProductDetails>
                            <h5>{product.title}</h5>
                            <p>${product.price}</p>
                        </ProductDetails>
                        <Buttons>
                            <Button onClick={() => addToCart(product._id)}>
                                <ShoppingCartOutlined />
                                <p> Add to Cart</p>
                            </Button>
                        </Buttons>
                    </ProductCard>
                )
            })}
        </Container>
    )
}

export default Card
