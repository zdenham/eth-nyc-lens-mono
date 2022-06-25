import React, { useEffect, useRef } from 'react';
import {
    Canvas as ThreeCanvas, MeshProps, SphereGeometryProps, useFrame, useLoader
} from '@react-three/fiber';
import { Box, BoxProps } from '@chakra-ui/react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';
import { zIndexes } from '../constants';

const Canvas: React.FC<BoxProps> = ({ children }) => (
    <Box position='fixed' zIndex={zIndexes.canvas}>
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
            mesh.current.position.y = position[1] + Math.sin(time) * 0.15;
            mesh.current.rotation.x += 0.003;
            mesh.current.rotation.z += 0.003;
        }
    });

    useEffect(() => {
        if (mesh.current) {
            mesh.current.position.x = position[0];
            mesh.current.position.y = position[1];
            mesh.current.position.z = position[2];
        }
    }, [mesh]);

    return (
        <mesh ref={mesh}>
            <sphereGeometry ref={geometry} args={[1]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};

interface LineProps {
    readonly points: [number, number, number][];
}

const Line: React.FC<LineProps> = ({ points }) => {
    const ref = useRef<THREE.Line>();

    useFrame(() => {
        if (ref.current) {
            ref.current.geometry.setFromPoints(points.map((point) => new THREE.Vector3(...point)));
        }
    });

    return (
        <line ref={ref}>
            <bufferGeometry />
            <lineBasicMaterial color='green' />
        </line>
    );
};

export const Scene: React.FC = () => (
    <Canvas w='100vw' h='100vh'>
        <ambientLight intensity={0.2} />
        <directionalLight />
        <Sphere position={[-10, 3, -10]} />
        <Line points={[[-10, 3, -10], [6, 0, -1]]} />
        <Sphere position={[6, 0, -1]} />
        <Line points={[[6, 0, -1], [-3, -1, 3]]} />
        <Sphere position={[-3, -1, 3]} />
        <Line points={[[-3, -1, 3], [-10, 3, -10]]} />
    </Canvas>
);
