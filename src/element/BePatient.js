import { Box, Container, keyframes, ChakraProvider } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(1.2) rotate(0); border-radius: 20%; }
  50% { transform: scale(1.2) rotate(270deg); border-radius: 30%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 30%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`;

const animation = `${animationKeyframes} 2s ease-in-out infinite`;

export default function BePatient() {
  return (
    <ChakraProvider>
      <Container h="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box
        as={motion.div}
        animation={animation}
        padding="2"
        bg="rgb(255, 94, 65)"
        color="white"
        width="100px"
        height="100px"
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        textAlign="center"
        fontSize="1rem"
        fontWeight={800}
      >CHEF<br />REPUBLIC</Box>
    </Container>
    </ChakraProvider>
  )
}