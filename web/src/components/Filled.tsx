import { Text, TextProps } from '@chakra-ui/react';

export const Filled: React.FC<TextProps> = ({ children }) => (
    <Text as='span' color='green'>{children}</Text>
);
