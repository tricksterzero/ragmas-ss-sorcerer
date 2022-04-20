import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactModal from 'react-modal';

import Simulator from './components/Simulator';

// CSSの読み込み
import 'ress';
import './common.css';
import './sorcerer.css';


// 描画
ReactModal.setAppElement('#root');

const container = document.getElementById('root');
if( container ) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Simulator />
    </React.StrictMode>,
  );
} else {
  console.error('Failed to find the root element.');
}
