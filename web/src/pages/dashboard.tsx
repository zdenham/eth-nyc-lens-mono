import { Flex, HStack, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Container } from '../components/Container';
import { FollowFeed } from '../components/FollowFeed';
import { Heading } from '../components/Heading';
import { ProfileDiscovery } from '../components/ProfileDiscovery';
import { footerHeight } from '../constants';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

// const LoadingScreen = () => (
//     <VStack spacing='20px'>
//         <Heading>Searching for Profiles...</Heading>
//         <Text>Be sure to enable Bluetooth in your browser!</Text>
//         <Image src='/lens-loading-compressed.gif' />
//     </VStack>
// );

const Dashboard = () => {
    const [timeSinceLastUpdate] = useState(27);
    const isMobile = useMediaQuery(768);

    return (
        <Container mb={footerHeight}>
            <Heading>Your Dashboard</Heading>
            <HStack>
                <Image src='/clock.svg' boxSize='16px' />
                <Text fontSize='14px' color='gray.400'>Last updated <b>{timeSinceLastUpdate}</b> secs ago</Text>
            </HStack>
            {isMobile ? (
                <Tabs align='center' colorScheme='green' mt='20px'>
                    <TabList>
                        <Tab>Profile Discovery</Tab>
                        <Tab>Follow Feed</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <ProfileDiscovery />
                        </TabPanel>
                        <TabPanel p='0'>
                            <FollowFeed />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            ) : (
                <Flex w='100%' mt='40px' borderTop='2px solid #ECECEC' textAlign='left'>
                    <ProfileDiscovery w='65%' />
                    <FollowFeed w='35%' borderLeft='2px solid #ECECEC' />
                </Flex>

            )}
        </Container>
    );
};

export default Dashboard;
