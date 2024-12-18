import React from 'react';
import * as ReactDOM from 'react-dom';

interface ILoadingPanel {
  id?: string;
}

const LoadingPanel = ({ id = '' }: ILoadingPanel) => {
  const loadingPanel = (
    <div className="k-loading-mask">
      <div className="k-loading-image" />
    </div>
  );

  const gridContent = document && document.querySelector(`${id} .k-grid-content`);
  return gridContent ? ReactDOM.createPortal(loadingPanel, gridContent) : loadingPanel;
};

export default LoadingPanel;
