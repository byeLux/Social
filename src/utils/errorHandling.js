export function logError(error) {
    console.error('API request failed', {
        status: error.response?.status,
        code: error.code,
        method: error.config?.method,
    });
}
