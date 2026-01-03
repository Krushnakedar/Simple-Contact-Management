import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import AllContacts from './pages/AllContacts';
import NewContactForm from './pages/NewContactForm';
import ShowContact from './pages/ShowContact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllContacts />} />
        <Route path="/new" element={<NewContactForm />} />
        <Route path="/contact/:id" element={<ShowContact />} />
      </Routes>
    </Router>
  );
}

export default App;
