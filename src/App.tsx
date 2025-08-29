import { BrowserRouter, Route, Routes } from 'react-router';

import { DashLayout } from './dashboard/DashLayout';
import { IndirectCostsView } from './dashboard/indirect-costs/IndirectCostsView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashLayout />}>
          <Route path='/' element={<IndirectCostsView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
