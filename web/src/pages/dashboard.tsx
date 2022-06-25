import { Image, Text, VStack } from '@chakra-ui/react';
import { Heading } from '../components/Heading';
import { ProfileList } from '../components/ProfileList';
import { navBarHeight } from '../constants';
import { useProfiles } from '../hooks/useProfiles';

const LoadingScreen = () => (
    <VStack spacing='20px'>
        <Heading>Searching for Profiles...</Heading>
        <Text>Be sure to enable Bluetooth in your browser!</Text>
        <Image src='/lens-loading-compressed.gif' />
    </VStack>
);

const Dashboard = () => {
    // const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);
    const { profiles } = useProfiles();

    return (
        <VStack justifyContent='space-between' h={`calc(100vh - ${navBarHeight})`} py='40px'>
            {profiles ? (
                <ProfileList profiles={profiles} />
            ) : (
                <LoadingScreen />
            )}
        </VStack>
    );
};

export default Dashboard;
