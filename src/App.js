import Index from "./Routes/Index";

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <div className="App">
      <Index /> 
      <ToastContainer />   
    </div>
  );
}

export default App;
