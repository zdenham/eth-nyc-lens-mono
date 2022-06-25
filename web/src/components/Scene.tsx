import React, { useRef } from 'react';
import {
    Canvas, MeshProps, useFrame, useLoader,
} from '@react-three/fiber';
import { Box, BoxProps } from '@chakra-ui/react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { zIndexes } from '../constants';

const ThreeCanvas: React.FC<BoxProps> = ({ children }) => (
    <Box position='fixed' zIndex={zIndexes.canvas}>
        <Canvas camera={{ position: [0, 0, 5] }}>
            {children}
        </Canvas>
    </Box>
);

const EtherModel: React.FC = (props) => {
    const mesh = useRef<MeshProps>();
    const texture = useLoader(TextureLoader, '/glass.jpg');

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.y -= 0.01;
        }
    });

    return (
        <mesh ref={mesh} {...props}>
            <meshMatcapMaterial matcap={texture} />
        </mesh>
    );
};

export const Ether: React.FC = () => (
    <ThreeCanvas>
        <EtherModel />
    </ThreeCanvas>
);
