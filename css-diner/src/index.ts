import { App } from './components/app/app';
import './css/index.css';


const app = new App();



// app.checkInputValue();

const button = document.querySelector('.input__enter');
const input = document.querySelector('.input__field');
button?.addEventListener('click', () => {
  if (input instanceof HTMLInputElement) {
    app.checkInputValue(input?.value)
  }
});