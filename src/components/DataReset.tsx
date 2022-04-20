import React from 'react';

type Props = {
  onClick: () => void;
};

const DataReset: React.FC<Props> = (props) => {
  return(
    <div className="data-reset">
      <button onClick={props.onClick}>リセット</button>
    </div>
  );
};

export default DataReset;