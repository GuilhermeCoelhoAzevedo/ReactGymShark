import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import {Main, Container} from './styles'

function DefaultPage({ children }) {
    return (
        <>
            <Container>
            <NavBar />
            <Main>
                {children}
            </Main>
            <Footer/>
            </Container>
        </>
    );
}

export default DefaultPage;