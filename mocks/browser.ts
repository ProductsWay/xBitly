import { setupWorker } from 'msw/browser';

import handlers from './handlers';

const browser = setupWorker(...handlers);

export default browser;
