import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Users from './components/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RegistrationForm />
  },
  {
    path: '/users',
    element: <Users />
  }
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
