import React from 'react';

import { PREFIX, SKILLS } from '../sorcerer_data';

type Props = {
  id: number;
  key: number;
  lv: number;
  max_lv: number;
  disable: boolean;
  finished: boolean;
  onClick: (i: number) => void;
};

const Skill: React.FC<Props> = (props) => {
  let class_name = "skill " + PREFIX + "-skill-" + props.id;
  let handleClick = props.onClick;

  // クリックできない時の設定をする
  // ポイントを振り終わっていたら
  if( props.finished ) {
    handleClick = () => null;

    // ポイントを振っていないスキルはグレーアウト
    if( props.lv === 0 ) {
      class_name += " skill-disable";
    }
  }
  else if( props.disable ) {
    class_name += " skill-disable";
    handleClick = () => null;
  }

  // レンダー
  return (
    <div
      className={class_name}
      onClick={() => handleClick(props.id)}
    >
      <div className="skill-container">
        <div>
          {SKILLS[props.id].Name}<br />
          Lv: {props.lv}/{props.max_lv}
        </div>
      </div>
    </div>
  );
};

export default Skill;