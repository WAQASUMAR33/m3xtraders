import Sidebar from '../components/Header';
import Header from '../components/Sidebar';

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