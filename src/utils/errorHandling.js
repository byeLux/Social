export function logError(error) {
    console.error('Full error:', error);
    console.error('URL chiamato:', error.config?.baseURL, error.config?.url);
    console.error('Method:', error.config?.method);
}