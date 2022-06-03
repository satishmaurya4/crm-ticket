import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Suspense } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={
              <div>
                Loading...
              </div>
            }>
              <Login />
            </Suspense>
          }
        />
        <Route
          path='/home'
          element={
            <Suspense fallback={
              <div>
                Loading...
              </div>
            }>
              <Home />
            </Suspense>
          }
        />

        </Routes>
    </Router>
  );
}

export default App;
