import { createRoot } from 'react-dom/client';
import { AppComponent } from './main-layout';
import './styles.scss';

window.onload = () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <AppComponent />
  );
};
