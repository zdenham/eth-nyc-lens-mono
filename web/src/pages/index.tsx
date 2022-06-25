import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '../components/Button';
import { ConnectWallet } from '../components/ConnectWallet';
import { Container } from '../components/Container';
import { Hero } from '../components/Hero';
import { Scene } from '../components/Scene';

const Index = () => {
    const { push } = useRouter();
    const { data } = useAccount();

    const goToApp = useCallback(() => push('/dashboard'), []);

    return (
        <>
            <Scene />
            <Container mb='400px'>
                <Hero flexShrink={0} />
                {data?.address ? (
                    <VStack justifyContent='center' flexGrow={1}>
                        <Button onClick={goToApp}>Go to App</Button>
                    </VStack>
                ) : (
                    <ConnectWallet flexGrow={1} />
                )}
            </Container>
        </>
    );
};

export default Index;
