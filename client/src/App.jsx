import {Route, Routes} from 'react-router-dom'
import Login from './page/Login'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}/>
      </Routes>
    </>
  )
}

export default App