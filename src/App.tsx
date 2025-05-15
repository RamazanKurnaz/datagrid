import { ReactElement } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux'
import DashboardLayout from './DashboardWrapper'
import CustomersPage from './pages/Customers'
import VehiclesPage from './pages/Vehicles'
import Modal from './components/Modal'

function App(): ReactElement {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />

          {/* Ana route'lar direkt erişim için */}
          <Route path="/" element={<DashboardLayout />}>
            {/* ORTAK bölümü route'ları */}
            <Route path="customers" element={<CustomersPage />} />
            <Route path="contacts" element={<div>Kişiler Sayfası</div>} />
            <Route path="vendors" element={<div>Tedarikçiler Sayfası</div>} />
            <Route path="item-list" element={<div>Malzemeler Sayfası</div>} />
            <Route path="service-list" element={<div>Hizmetler Sayfası</div>} />
            <Route path="categories" element={<div>Ürün Kategorileri</div>} />
            <Route path="itemgroup" element={<div>Ürün Kitleri</div>} />
            <Route
              path="institutional-assets"
              element={<div>Şirket Bilgileri</div>}
            />
            <Route path="notes" element={<div>Notlar</div>} />
            <Route path="uniss" element={<div>Birimler</div>} />

            {/* Teknik Servis bölümü route'ları */}
            <Route path="/technical-service">
              <Route path="overview" element={<div>Genel Bakış</div>} />
              <Route
                path="technical-team-management"
                element={<div>Teknik Ekip</div>}
              />
              <Route
                path="customer-asset-management"
                element={<div>Müşteri Varlıkları</div>}
              />
              <Route path="service-management" element={<div>Servis</div>} />
              <Route path="maintenance" element={<div>Bakım</div>} />
              <Route path="car-management" element={<VehiclesPage />} />
              <Route path="warranty-trackings" element={<div>Garanti</div>} />
            </Route>
          </Route>
        </Routes>
        <Modal />
      </Router>
    </Provider>
  )
}

export default App
