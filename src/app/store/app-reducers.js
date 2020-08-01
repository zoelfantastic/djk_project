import { connectRouter } from 'connected-react-router'
import history from './history';

const router = connectRouter(history);

export default { router }