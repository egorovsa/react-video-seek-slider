import { createRoot } from 'react-dom/client';
import { DevLayout } from './dev/dev-layout';
import './styles.scss';

window.onload = () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <DevLayout />
  );
};
