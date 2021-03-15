import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'rsuite/dist/styles/rsuite-default.css';

import { Redirect, Route, Switch } from 'react-router-dom';

import ContentPage from '../src/pages/ContentPage';
import ContentPageRsuite from './pages/rsuite/ContentPageRsuite';
import DisplaySecretContent from '../src/pages/DisplaySecretContent';
import DisplaySecretContentPageRsuite from './pages/rsuite/DisplaySecretContentRsuite';
import RouteConstatns from '../src/constants/RouteConstants';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <div className='App'>
        <Switch>
          <Route
            exact
            path={RouteConstatns.CONTENT_PAGE}
            component={ContentPage}
          />
          <Route
            exact
            path={RouteConstatns.RSUITE_CONTENT_PAGE}
            component={ContentPageRsuite}
          />
          <Route
            exact
            path={RouteConstatns.DISPLAY_SECRET_CONTENT}
            component={DisplaySecretContent}
          />
          <Route
            exact
            path={RouteConstatns.RSUITE_DISPLAY_SECRET_CONTENT}
            component={DisplaySecretContentPageRsuite}
          />
          <Redirect to={RouteConstatns.RSUITE_CONTENT_PAGE} />
        </Switch>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </div>
    </>
  );
}

export default App;
