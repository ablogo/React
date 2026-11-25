import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Chart from './components/chart';
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AddProduct } from './components/add_product'

createRoot(document.getElementById('root')!).render(
  /*
    To configure React Router for a browser extension, it should be used HashRouter (or MemoryRouter) instead of BrowserRouter.

    In a browser extension popup or options page, the actual browser URL is something like chrome-extension://<extension-id>/index.html (or /popup.html).
    BrowserRouter tries to read and match against /index.html, which causes path mismatches when combined with basename or nested routes.
    Changing URLs with BrowserRouter via history.pushState breaks when the extension popup reloads or opens a new tab.

    HashRouter stores the route in the URL hash (index.html#/something), completely avoiding collisions with chrome-extension://<id>/index.html
  */
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route index element={<App />} />
        <Route path="chart/:productId" element={<Chart />} />
        <Route path="add-product" element={<AddProduct />} />

        <Route path="*" element={<App />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
