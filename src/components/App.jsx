import AppRoutes from './../routes/AppRoutes'
import Navigation from './../components/Navigation/Navigation'
import Footer from './../components/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App">
        <Navigation />
        <AppRoutes />
        <Footer />
      </div>
    </div>
  );
}

export default App;
