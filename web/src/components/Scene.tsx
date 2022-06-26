/* eslint-disable prefer-destructuring */
import React, { useEffect, useRef } from 'react';
import {
    Canvas as ThreeCanvas, MeshProps, SphereGeometryProps, useFrame, useLoader
} from '@react-three/fiber';
import { Box, BoxProps } from '@chakra-ui/react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const Canvas: React.FC<BoxProps> = ({ children }) => (
    <Box position='absolute'>
        <ThreeCanvas camera={{ position: [0, 0, 5] }}>
            {children}
        </ThreeCanvas>
    </Box>
);

interface SphereProps {
    readonly position: [number, number, number];
}

const Sphere: React.FC<SphereProps> = ({ position }) => {
    const mesh = useRef<MeshProps>();
    const geometry = useRef<SphereGeometryProps>();
    const texture = useLoader(TextureLoader, '/grass-rock.jpg');

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (mesh.current) {
            // @ts-ignore
            mesh.current.position.y = position[1] + Math.sin(time) * 0.1;

            // @ts-ignore
            mesh.current.rotation.x += 0.003;
            // @ts-ignore
            mesh.current.rotation.z += 0.003;
        }
    });

    useEffect(() => {
        if (mesh.current) {
            // @ts-ignore
            mesh.current.position.x = position[0];
            // @ts-ignore
            mesh.current.position.y = position[1];
            // @ts-ignore
            mesh.current.position.z = position[2];
        }
    }, [mesh]);

    return (
        <mesh ref={mesh as any}>
            <sphereGeometry ref={geometry as any} args={[1]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};

export const Scene: React.FC = () => (
    <Canvas minW='100vw' minH='100vh' style={{ marginTop: 40 }}>
        <ambientLight intensity={0.2} />
        <directionalLight />
        <Sphere position={[0, -1, 4]} />
    </Canvas>
);
