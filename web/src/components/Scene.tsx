import React, { useRef } from 'react';
import {
    Canvas as ThreeCanvas, MeshProps, useFrame, useLoader,
} from '@react-three/fiber';
import { Box, BoxProps } from '@chakra-ui/react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { zIndexes } from '../constants';

const Canvas: React.FC<BoxProps> = ({ children }) => (
    <Box position='fixed' zIndex={zIndexes.canvas}>
        <ThreeCanvas camera={{ position: [0, 0, 5] }}>
            {children}
        </ThreeCanvas>
    </Box>
);

const Sphere: React.FC = () => {
    const mesh = useRef<MeshProps>();
    const texture = useLoader(TextureLoader, '/grass-rock.jpg');

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (mesh.current) {
            mesh.current.position.y = Math.sin(time) * 0.15;
            mesh.current.rotation.x += 0.003;
            mesh.current.rotation.z += 0.003;
        }
    });

    return (
        <>
            <ambientLight intensity={0.2} />
            <directionalLight />
            <mesh ref={mesh}>
                <sphereGeometry args={[1]} />
                <meshStandardMaterial map={texture} />
            </mesh>
        </>
    );
};

export const Scene: React.FC = () => (
    <Canvas w='100vw' h='100vh'>
        <Sphere />
    </Canvas>
);
