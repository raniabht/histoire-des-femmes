import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Accueil from './frontend/pg/Accueil'
import YearTimeline from './frontend/pg/Timeline'
import DetailEvent from './frontend/pg/DetailEvent'
import DetailPortrait from './frontend/pg/DetailPortrait'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Page publique — visible par tous les visiteurs */}
        <Route path="/" element={<Accueil/>} />
        {/* <Route path="/" element={<Tl/>} /> */}
        


        <Route path="/articles" element={<YearTimeline />} />
        <Route path="/evenement/:id" element={<DetailEvent />} />
        <Route path="/portrait/:id" element={<DetailPortrait />} />






      </Routes>
    </BrowserRouter>
  )
}

export default App