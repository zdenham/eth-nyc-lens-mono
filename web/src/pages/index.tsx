import confetti from 'canvas-confetti';
import { HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '../components/Button';
import { ConnectWallet } from '../components/ConnectWallet';
import { Container } from '../components/Container';
import { Hero } from '../components/Hero';
import { Scene } from '../components/Scene';
import { WhyFlourishModal } from '../components/WhyFlourishModal';

const Index = () => {
    const { push } = useRouter();
    const { data } = useAccount();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        confetti({
            colors: ['#FF463E', '#FFCCCA', '#FF838B', '#FFFFFF'],
            particleCount: 400,
            startVelocity: 50,
            origin: { x: 0.5, y: 0 },
            drift: 0,
            angle: 270,
            spread: 270,
        });
    }, []);

    const goToApp = useCallback(() => push('/dashboard'), []);

    return (
        <>
            <Container justifyContent='space-between'>
                <Scene />
                <Hero flexShrink={0} />
                <VStack justifyContent='center' flexGrow={1}>
                    <HStack spacing='16px'>
                        {data?.address ? (
                            <Button onClick={goToApp}>Go to App</Button>
                        ) : (
                            <ConnectWallet />
                        )}
                        <Button kind='secondary' onClick={onOpen}>Why Flourish?</Button>
                    </HStack>
                </VStack>
            </Container>
            {isOpen && <WhyFlourishModal onClose={onClose} />}
        </>
    );
};

export default Index;
