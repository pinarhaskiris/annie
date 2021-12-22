import { useState } from 'react'

import TopBar from './components/TopBar';
import MainBox from './components/MainBox';

function App() {

  return (
    <div>
      <h1>Annie</h1>

      <div id='middle' className='mainItem'>
        <TopBar />
        <MainBox />
      </div>
        
    </div>
  );
}

export default App;