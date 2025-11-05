import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    registerCitizen: (data) => api.post('/auth/register/citizen', data),
    loginCitizen: (data) => api.post('/auth/login/citizen', data),
    loginAdmin: (data) => api.post('/auth/login/admin', data)
};

export const applicationAPI = {
    submit: (data) => api.post('/applications/submit', data),
    getCitizenApplications: (citizenID) => api.get(`/applications/citizen/${citizenID}`),
    getAllApplications: (params) => api.get('/applications/all', { params }),
    approve: (applicationID, data) => api.put(`/applications/${applicationID}/approve`, data),
    reject: (applicationID, data) => api.put(`/applications/${applicationID}/reject`, data)
};

export const paymentAPI = {
    process: (data) => api.post('/payments/process', data),
    getDetails: (applicationID) => api.get(`/payments/${applicationID}`)
};

export const passportAPI = {
    getCitizenPassports: (citizenID) => api.get(`/passports/citizen/${citizenID}`),
    getDetails: (passportID) => api.get(`/passports/${passportID}`)
};

export const reportsAPI = {
    getCityStatistics: () => api.get('/reports/city-statistics'),
    getFrequentTravelers: () => api.get('/reports/frequent-travelers'),
    getEmbassyPerformance: () => api.get('/reports/embassy-performance'),
    getDocumentBottlenecks: () => api.get('/reports/document-bottlenecks'),
    getFinancialAnalysis: () => api.get('/reports/financial-analysis'),
    getApplicationReport: (params) => api.get('/reports/application-report', { params }),
    getTotalRevenue: (params) => api.get('/reports/total-revenue', { params })
};

export const embassyAPI = {
    getAll: () => api.get('/embassies'),
    getById: (embassyID) => api.get(`/embassies/${embassyID}`)
};

export const citizenAPI = {
    getProfile: (citizenID) => api.get(`/citizens/${citizenID}`),
    checkEligibility: (citizenID) => api.get(`/citizens/${citizenID}/eligibility`),
    getAlerts: (citizenID) => api.get(`/citizens/${citizenID}/alerts`)
};

export const dashboardAPI = {
    getCitizenStats: (citizenID) => api.get(`/dashboard/citizen/${citizenID}`),
    getAdminStats: () => api.get('/dashboard/admin/stats')
};

export default api;