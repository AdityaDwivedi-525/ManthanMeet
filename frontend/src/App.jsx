// import { useState } from 'react'
// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LandingPage from './pages/landing';
// import Authentication from './pages/authentication';


// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <>
    
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage/>} />
//          <Route path='/auth' element={<Authentication />} />
//       </Routes>
      

//     </Router>
//     </>
//   )
// }

// export default App

import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
import VideoMeetComponent from './pages/VideoMeet.jsx';
import HomeComponent from './pages/home';
import History from './pages/history';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Authentication />} />
       <Route path='/home' element={<HomeComponent />} />
        <Route path='/history' element={<History />} />
      <Route path='/:url' element={<VideoMeetComponent />} />
    </Routes>
  );
}

export default App;