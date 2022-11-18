import { Outlet } from 'react-router-dom';

import { Layout } from '../layout/Layout';

const App = () => {
  return (
    <Layout>
      <main>
        <Outlet />
      </main>
    </Layout>
  );
};

export default App;
