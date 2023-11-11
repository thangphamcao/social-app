import './App.css';
import router from './router';
import { useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
        mutations: {},
    },
});

const App = () => {
    const element = useRoutes(router);
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">{element}</div>;
        </QueryClientProvider>
    );
};

export default App;
