import React from 'react';

type Props = {
  onClick: () => null | undefined;
};

const DataUndo: React.FC<Props> = (props) => {
  return(
    <div className="data-undo">
      <button onClick={props.onClick}>アンドゥ</button>
    </div>
  );
};

export default DataUndo;