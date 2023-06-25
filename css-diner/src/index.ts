import { App } from './components/app/app';
import './css/index.css';


const app = new App();
console.log(app, app.nextLvl, 'nextlvl');
document.querySelector('.lantern__title')?.addEventListener('click', () => {
  app.nextLvl()
});
document.querySelector('.logo__title')?.addEventListener('click', () => {
  app.prevLvl()
});
// app.checkInputValue();

const button = document.querySelector('.input__enter');
const input = document.querySelector('.input__field');
button?.addEventListener('click', () => {
  if (input instanceof HTMLInputElement) {
    console.log(input?.value)
    app.checkInputValue(input?.value)
  }
});