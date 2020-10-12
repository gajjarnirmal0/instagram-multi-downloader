import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import store, { persistor } from '../redux/store';

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import SearchError from './SearchError';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <ErrorBoundary>
              <Provider store={store}>
                <PersistGate persistor={persistor}>
                  <SearchForm></SearchForm>
                  <br />
                  <SearchError></SearchError>
                  <SearchResult></SearchResult>
                </PersistGate>
              </Provider>
            </ErrorBoundary>

          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
