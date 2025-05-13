import { Routes, Route } from 'react-router-dom';

//ROUTES COMPONENTS
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/Home';
import HomeCard from './components/HomeCard';
import PerfilView from './better/PerfilUsuarioView';
import SyncfyWidgetComponent from "./components/SyncfyWidgetComponent";
import PlansView from './components/Planes';



function App() {
  return (
    <div className= "bg-light" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh' 
    }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/planes" element={<PlansView />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/homecard" element={<HomeCard />} />
        <Route path="/syncfy" element={<SyncfyWidgetComponent />} />
      </Routes>
    </div>
  );
}

export default App;
