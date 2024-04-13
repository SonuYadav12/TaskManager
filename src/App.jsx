import React from 'react';
import Todo from './components/Todo';


const App = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${"b10.avif"})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <Todo />
    </div>
  );
};

export default App;
