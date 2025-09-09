
import { Provider } from "react-redux";
import AppProviders from "./providers/AppProviders";
import { AppRoutes } from "./Routes/AppRoutes";
import store from "./store";
import { ToastProvider } from "react-toast-notifications";

const App = () => (
    <AppProviders>
        <Provider store={store}>
            <ToastProvider
                autoDismiss
                autoDismissTimeout={6000}
                placement="top-right"
            >
                <AppRoutes />
            </ToastProvider>
        </Provider>
    </AppProviders>
);

export default App;
