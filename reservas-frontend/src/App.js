import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReservationView from './views/ReservationView';

const App = () => {
  return (
    <ChakraProvider>
      <div>
        <ReservationView></ReservationView>
      </div>
    </ChakraProvider>

  );
};

export default App;
