import TodoList from "./components/TodoList";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <TodoList />
      <ToastContainer/>
    </div>
  );
}

export default App;
