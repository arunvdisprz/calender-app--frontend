import "./App.css";
import Navbar from "./JSfiles/navbar";
import Calenderbar  from "./JSfiles/calenderbar";
import "./SCSSfiles/navbar.scss";
function App() {
  
  return (
    <div className="App">
      <div>
        <Navbar></Navbar>
        <Calenderbar></Calenderbar>
        <div></div>
      </div>
    </div>
  );
}

export default App;
