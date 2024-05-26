import { http, HttpResponse } from 'msw';

const handlers = [
    http.post('/login', () => {
        // Persist user's authentication in the session
        sessionStorage.setItem('is-authenticated', 'true');
        return HttpResponse.json();
    }),
    http.get('/user', () => {
        // Check if the user is authenticated in this session
        const isAuthenticated = sessionStorage.getItem('is-authenticated');
        if (!isAuthenticated) {
            // If not authenticated, respond with a 403 error
            return HttpResponse.json(
                {
                    errorMessage: 'Not authorized',
                },
                {
                    status: 403,
                },
            );
        }
        // If authenticated, return a mocked user details
        return HttpResponse.json({
            username: 'admin',
        });
    }),
];
export default handlers;
