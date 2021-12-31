import logo from './logo.svg';
import './App.css';
import Form from './Form'
import Form2 from './Form2'
import Editor from './Editor'
import Header from './Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <Header/>
        <Routes>
            <Route path="/file" element={<Form/>} />
            <Route path="/" exact element={<Form2/>} />
            <Route path="/test" element={<Editor/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
