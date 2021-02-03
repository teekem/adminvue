import httpClient from './httpClient';

const END_POINT = '/adminusers';


const getApplicants = () => httpClient.get(END_POINT);

// you can pass arguments to use as request parameters/data
const getApplicant = (user_id) => httpClient.get(END_POINT, { user_id });
// maybe more than one..
const createApplicant = (username, password) => httpClient.post(END_POINT, { username, password });

export {
    getApplicants,
    getApplicant,
    createApplicant
}