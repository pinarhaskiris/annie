import { useState } from 'react'

import MainBox from './components/MainBox';

function App() {

  return (
    <div>
      <h1>Annie</h1>

      <div id='middle' className='mainItem'>
        <MainBox />
      </div>
        
    </div>
  );
}

export default App;