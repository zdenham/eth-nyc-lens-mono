/* eslint-disable max-len */
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { ValueProps } from '../components/ValueProps';
import { Button } from './Button';

export interface ConnectModalProps {
    readonly onClose: any;
}

export const WhyFlourishModal: React.FC<ConnectModalProps> = ({ onClose }) => (
    <Modal isOpen onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader fontSize='20px'>Why Flourish?</ModalHeader>
            <ModalCloseButton />
            <ModalBody mt='20px'>
                <ValueProps />
            </ModalBody>
            <ModalFooter justifyContent='center' pb='60px'>
                <Button onClick={onClose}>Close</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
);
