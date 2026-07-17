import { useState } from 'react';
import { logError } from '../utils/errorHandling';
import { ERROR_MESSAGES, NETWORK_ERROR_MESSAGE } from '../constants/errorMessages';

export function useErrorHandling() {
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
            const messages = ERROR_MESSAGES[errorKey];
            if (error.response)      setErrorMessage(messages.response);
            else if (error.request)  setErrorMessage(NETWORK_ERROR_MESSAGE);
            else                     setErrorMessage(messages.unknown);
            setError(true);
            return null;
        }
    }

    return { error, errorMessage, setError, setErrorMessage, withErrorHandling };
}