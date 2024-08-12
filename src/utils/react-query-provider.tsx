import { QueryClient, QueryClientProvider } from 'react-query';

/**
 * Function for configuring a React-Query client
 * - `retry: false` Disables automatic attempts to get data again after failed requests
 */
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

/**
 * React-Query HOC with configured query settings
 */
const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
