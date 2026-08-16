import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Accueil_av from './frontend/pg/Accueil'
import YearTimeline from './frontend/pg/Timeline'
import Detail_event from './frontend/pg/DetailEvent'
import Detail_portrait from './frontend/pg/DetailPortrait'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Page publique — visible par tous les visiteurs */}
        <Route path="/" element={<Accueil_av/>} />
        {/* <Route path="/" element={<Tl/>} /> */}
        


        <Route path="/articles" element={<YearTimeline />} />
        <Route path="/evenement/:id" element={<Detail_event />} />
        <Route path="/portrait/:id" element={<Detail_portrait />} />






      </Routes>
    </BrowserRouter>
  )
}

export default App