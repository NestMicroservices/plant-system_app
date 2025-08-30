import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { DashLayout } from './dashboard/DashLayout';
import { IndirectCostsView } from './dashboard/indirect-costs/IndirectCostsView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Select Plant View</div>} />
        <Route path='/:plantId' element={<DashLayout />}>
          <Route index element={<Navigate to={'indirect-costs'} replace />} />
          <Route path='indirect-costs' element={<IndirectCostsView />} />
        </Route>
        <Route path='404' element={<div>Not Found</div>} />
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
