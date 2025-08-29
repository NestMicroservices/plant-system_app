import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { DashLayout } from './dashboard/DashLayout';
import { IndirectCostsView } from './dashboard/indirect-costs/IndirectCostsView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashLayout />}>
          <Route index element={<Navigate to={'/indirect-costs'} />} />
          <Route path='/indirect-costs' element={<IndirectCostsView />} />
          <Route path='/*' element={<div>No Content</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
