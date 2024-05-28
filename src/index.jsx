// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { Routers } from './routes/Routes.jsx';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './utils/context/AuthContext.jsx';

const theme = extendTheme ({
    styles: {
        global: {
            body: {
                bg: 'gray.50',
            },
        },
    },
})

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthProvider>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <Routers>
            <ToastContainer />
          </Routers>
        </ChakraProvider>
      </BrowserRouter>
      </AuthProvider>
  </StrictMode>,
)