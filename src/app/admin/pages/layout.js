import Sidebar from '../components/Sidebar';
import Header from '../components/Header';


const Layout = ({ children }) => {
  return (
    <div className="flex flex-row">
      <div>
        <Sidebar />
      </div>
      <div className={`flex flex-col `}>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
