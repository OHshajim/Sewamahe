import AppProviders from "./providers/AppProviders";
import { AppRoutes } from "./Routes/AppRoutes";
import { ToastProvider } from "react-toast-notifications";

const App = () => (
    <AppProviders>
        <ToastProvider
            autoDismiss
            autoDismissTimeout={6000}
            placement="top-right"
        >
            <AppRoutes />
        </ToastProvider>
    </AppProviders>
);

export default App;
