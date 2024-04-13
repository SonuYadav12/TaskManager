import React from 'react';
import Todo from './components/Todo';

const App = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-b from-blue-300 to-blue-500">
      <Todo />
    </div>
  );
};

export default App;
