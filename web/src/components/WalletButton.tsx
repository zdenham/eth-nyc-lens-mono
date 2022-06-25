import { ButtonProps, Image, Text } from '@chakra-ui/react';
import { Button } from './Button';

interface WalletButtonProps extends ButtonProps {
    readonly name: string;
    readonly src: string;
}

export const WalletButton: React.FC<WalletButtonProps> = ({ name, src, onClick }) => (
    <Button kind='secondary' w='100%' justifyContent='center' onClick={onClick}>
        <Image src={src} boxSize='32px' mr='10px' />
        <Text as='span' color='black'>{name}</Text>
    </Button>
);
