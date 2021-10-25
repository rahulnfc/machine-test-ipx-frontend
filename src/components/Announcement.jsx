import styled from 'styled-components';

const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
`;

const Announcement = () => {
    return (
        <Container> Super Deal! Free Shipping on Orders Over $50 </Container>
    )
}

export default Announcement
