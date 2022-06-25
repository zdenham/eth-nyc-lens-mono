import { ConnectWallet } from '../components/ConnectWallet';
import { Container } from '../components/Container';
import { Hero } from '../components/Hero';
import { Scene } from '../components/Scene';

const Index = () => (
    <>
        <Scene />
        <Container mb='400px'>
            <Hero flexShrink={0} />
            <ConnectWallet flexGrow={1} />
        </Container>
    </>
);

export default Index;
