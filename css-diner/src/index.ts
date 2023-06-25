import { App } from './components/app/app';
import './css/index.css';


const app = new App();
console.log(app, app.nextLvl, 'nextlvl')
document.querySelector('.lantern__title')?.addEventListener('click', () => {
  app.nextLvl()
});
document.querySelector('.logo__title')?.addEventListener('click', () => {
  app.prevLvl()
});
