import styled from 'styled-components'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from '../context/usercontext';
import { useContext } from 'react';
const server = 'http://localhost:3001'
const userId = localStorage.getItem('userId')

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: relative;
    top: 5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const Table = styled.table`
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 90%;
    table-layout: fixed;
    margin-bottom: 3rem;
    @media screen and (max-width: 600px) {
        border: 0;
    }
`;

const Thead = styled.thead`
    @media screen and (max-width: 600px) {
        border: none;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }
`;

const Tbody = styled.tbody`
    background-color: white;
    height: 3rem;
    color: black;
`;

const Tr = styled.tr`
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: .35em;
    @media screen and (max-width: 600px) {
        border-bottom: 3px solid #ddd;
        display: block;
        margin-bottom: .625em;
    }
`;

const Th = styled.th`
    padding: .625em;
    text-align: center;
    font-size: .85em;
	letter-spacing: .1em;
	text-transform: uppercase;
`;

const Td = styled.td`
    padding: .625em;
    text-align: center;
    @media screen and (max-width: 600px) {
        border-bottom: 1px solid #ddd;
		display: block;
		font-size: .8em;
		text-align: right;
        & ::before {
            content: attr(data-label);
			float: left;
			font-weight: bold;
			text-transform: uppercase;
        }
        & :last-child {
            border-bottom: 0;
        }
    }
`;

const IMG = styled.img`
    width:70px; 
    height: 80px; 
    margin-top: 15px; 
    margin-left: 20px;
`;

const Button = styled.button`
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem;
    background-color: #008659;
    color: white;
    cursor: pointer;
`;

const EmptyCart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;
    & p {
        text-align: center;
    }
    & h3{
        margin-bottom: 2rem;
    }
`;

const Heading = styled.p`
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #008659;
    float: right;
`;

const CartTable = () => {
    const { cartProducts, setCartProducts } = useContext(UserContext);
    
    const increment = (productId) => {
        axios.post(`${server}/api/user/cartincrement`, { productId, userId }).then(response => {
            setCartProducts(response.data.cart)
        }).catch(error => {
            console.log(error)
        })
    }

    const decrement = (productId) => {
        axios.post(`${server}/api/user/cartdecrement`, { productId, userId }).then(response => {
            setCartProducts(response.data.cart)
        }).catch(error => {
            console.log(error)
        })
    }

    const removeProduct = (productId) => {
        // alert for delete confirmation
        if (window.confirm('Are you sure you want to delete this item?')) {
            axios.post(`${server}/api/user/cartdelete`, { productId, userId }).then(response => {
                setCartProducts(response.data.cart)
            }).catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <Container>
            {cartProducts.length === 0 ?
                <EmptyCart>
                    <IMG src="https://image.flaticon.com/icons/png/512/102/102661.png" alt="empty-cart" />
                    <h3>Your cart is empty</h3>
                    <p>You can add items to your cart by clicking on the "Add to Cart" button next to the item.</p>
                    <Link to="/" style={{ margin: '1rem 0' }}> <Button>Continue Shopping</Button> </Link>
                </EmptyCart>
                :
                <>
                    <Heading>
                        Your Cart having <span style={{ color: '#000' }}>{cartProducts.length}</span> items with total amount of <span style={{ color: '#000' }}>
                            ${cartProducts.reduce((total, product) => {
                                return total + product.product.subtotal
                            }, 0)}
                        </span>
                    </Heading>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th scope="col">Item</Th>
                                <Th scope="col">Category</Th>
                                <Th scope="col">Price</Th>
                                <Th scope="col">Quantity</Th>
                                <Th scope="col">Sub Total</Th>
                                <Th scope="col">Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cartProducts.map((product, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td data-label="Item" scope="row" badge="primary">
                                            <IMG src={product.product.image} alt="product" />
                                        </Td>
                                        <Td data-label="Category">
                                            <p>{product.product.category}</p>
                                        </Td>
                                        <Td data-label="Price">
                                            <p> ${product.product.price}</p>
                                        </Td>
                                        <Td data-label="Quantity">
                                            <button onClick={() => increment(product.productId)}>+</button>
                                            <p> {product.quantity} </p>
                                            {product.quantity > 1 ?
                                                <button onClick={() => decrement(product.productId)}>-</button>
                                                :
                                                <button disabled>-</button>
                                            }
                                        </Td>
                                        <Td data-label="Sub Total">
                                            <p> ${product.product.subtotal}</p>
                                        </Td>
                                        <Td data-label="Delete">
                                            <Button onClick={() => { removeProduct(product.productId) }}>Delete</Button>
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </>
            }
        </Container>
    )
}

export default CartTable
