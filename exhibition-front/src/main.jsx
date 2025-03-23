import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MainPage from './MainPage.jsx'; // MainPage 불러오기

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <MainPage />
  </StrictMode>,
)