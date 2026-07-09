import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppToaster = () => (
  <ToastContainer
    position="bottom-right"
    autoClose={4000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    theme="dark"
    toastClassName="!bg-surface-card !text-slate-100 !rounded-xl !font-body"
  />
);

export default AppToaster;
