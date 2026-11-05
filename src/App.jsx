import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Search from './components/Search'
import Playlist from './components/Playlist'
import Like from './components/Like'
import Navabar from './components/Navabar'


function App() {
  return (
    <BrowserRouter>
    <Navabar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/playlist' element={<Playlist/>}/>
        <Route path='/like' element={<Like/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
