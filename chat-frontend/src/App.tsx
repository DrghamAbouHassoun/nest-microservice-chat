import './App.css';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import MainRouter from './router/MainRouter';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from './layout/Layout';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <div className="App">
          <MainRouter />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
