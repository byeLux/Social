import { logError } from '../utils/errorHandling';
import axiosClient from './axiosClient';

export async function getDetails(page, token) {
    const res = await axiosClient.get('/details', {
        params: { page },
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}

export async function createDetails(details, token) {
    try {
        const res = await axiosClient.post(
            '/details',
            {
                firstName: details.firstName,
                lastName: details.lastName,
                username: details.username,
                email: details.email,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        return res;
    } catch (error) {
        logError(error);
        throw error;
    }
}

export async function updateDetails(detailsId, editedDetails, token) {
    try {
        const res = await axiosClient.put(
            `/details/${encodeURIComponent(detailsId)}`,
            {
                details_id: detailsId,
                firstName: editedDetails.firstName,
                lastName: editedDetails.lastName,
                username: editedDetails.username,
                email: editedDetails.email,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        return res;
    } catch (error) {
        logError(error);
        throw error;
    }
}

export async function deleteDetails(detailsId, token) {
    try {
        const res = await axiosClient.delete(
            `/details/${encodeURIComponent(detailsId)}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        return res;
    } catch (error) {
        logError(error);
        throw error;
    }
}
