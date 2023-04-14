import 'modern-normalize/modern-normalize.css';
import '../sass/main.scss';
const queryForm = document.querySelector('.header-form');
import { sendRequest } from './modules/sendRequest';

queryForm.addEventListener('submit', sendRequest);

