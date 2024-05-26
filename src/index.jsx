// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
// import { store } from './redux/index.js';
// import { Provider } from 'react-redux';
// import LoadingBar  from 'react-redux-loading-bar';
import { StrictMode } from 'react';
import { Routers } from './routes/Routes.jsx';
import { ToastContainer } from 'react-toastify';

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
    {/* <Provider store={store}> */}
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          {/* <LoadingBar /> */}

          <Routers>
            <ToastContainer />
          </Routers>
        </ChakraProvider>
      </BrowserRouter>
    {/* </Provider> */}
  </StrictMode>,
)