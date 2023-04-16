import Todo from './Components/todo';
import './App.css';

function App() {
  const root = document.getElementById('root')
  root.classList.add('darkmode')
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;
