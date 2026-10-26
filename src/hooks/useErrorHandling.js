import { useState } from 'react';
import { logError } from '../utils/errorHandling';
import { ERROR_MESSAGES, NETWORK_ERROR_MESSAGE } from '../constants/errorMessages';
import { deleteItemAsync } from '../utils/tokenStorage';

export function useErrorHandling(onUnauthorized) {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function withErrorHandling(operation, errorKey) {
        setError(false);
        setErrorMessage('');
        try {
            const result = await operation();
            return result;
        } catch (error) {
            logError(error);
            //Se non sono autorizzato rimuovo il token dallo storage
            if (error.response?.status === 401 && onUnauthorized) {
                try {
                    await deleteItemAsync('token');
                } catch (storageError) {
                    logError(storageError);
                }
                onUnauthorized();
            }
            const messages = ERROR_MESSAGES[errorKey];

            if (error.response) setErrorMessage(messages.response);
            else if (error.request) setErrorMessage(NETWORK_ERROR_MESSAGE);
            else setErrorMessage(messages.unknown);

            setError(true);
            return null;
        }
    }

    return { error, errorMessage, setError, setErrorMessage, withErrorHandling };
}
