import Sidebar from '../components/sidebar';
import Header from '../components/header';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row ">
      <div>
      <Sidebar/>
      </div>
      <div className="flex flex-col w-full className={inter.className}">
      <Header/>
      {children}
      </div>

    </div>

  );
};

export default Layout;