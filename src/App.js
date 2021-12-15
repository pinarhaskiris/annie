import { useState } from 'react'

import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import MainBox from './components/MainBox';
function App() {

  return (
    <div>
      <h1>Annie</h1>

      <div id='main'>
        <Sidebar />

        <div id='middle' className='mainItem'>
          <TopBar />
          <MainBox />
        </div>
        
      </div>

      
    </div>
  );
}

export default App;