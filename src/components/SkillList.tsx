import React, { useMemo } from 'react';

// コンポーネントの読み込み
import Skill from './Skill';

import { SKILLS, JOBS } from '../sorcerer_data';

type Props = {
  job: number;
  lv: number[];
  current_lv: number;
  onClick: (i: number) => void;
};

const SkillList: React.FC<Props> = (props) => {
  // 転職段階でスキルIDを分別しておく
  const job_list = useMemo(() => {
    const job0 = [];
    const job1 = [];
    const job2 = [];
    const job3 = [];

    for( let i = 0; i < SKILLS.length; i++ ) {
      if( SKILLS[i].RequireJob === 0 ) { job0.push(i); }
      if( SKILLS[i].RequireJob === 1 ) { job1.push(i); }
      if( SKILLS[i].RequireJob === 2 ) { job2.push(i); }
      if( SKILLS[i].RequireJob === 4 ) { job3.push(i); }
    }

    return({ Job0: job0, Job1: job1, Job2: job2, Job3: job3 });
  },[]);

  // レンダー用の関数
  const renderSkill = (i: number, props: Props) => {
    // スキルをクリックできるかの判定
    let click_disable = false;

    // 前提スキルが必要レベルを満たしていない場合
    const prev_id = SKILLS[i].PrevID;
    const require_lv = SKILLS[i].RequireLv;
    if( prev_id != null && require_lv != null ) {
      if( props.lv[prev_id] < require_lv ) {
        click_disable = true;
      }
    }

    // スキルが現在のジョブで使えるかどうか
    if( props.job < SKILLS[i].RequireJob ) {
      click_disable = true;
    }

    // Jobの最終段階では「身体能力強化」以外を取れない
    if( props.job >= JOBS.length - 1 && i !== SKILLS.length - 1 ) {
      click_disable = true;
    }

    // 最大Lvを計算する
    const max_lv = (props.job >= 3 && SKILLS[i].BreakthroughLv != null) ? SKILLS[i].BreakthroughLv as number : SKILLS[i].MaxLv;

    // 最後までスキルを取り切ったか
    const finished = (props.current_lv === JOBS[JOBS.length-1].MaxLv);

    return(
      <Skill
        id={i}
        key={i}
        lv={props.lv[i]}
        max_lv={max_lv}
        disable={click_disable}
        finished={finished}
        onClick={() => props.onClick(i)}
      />
    );
  };


  // レンダー
  return(
    <div className="skill-list">
      {job_list.Job0.map((i) => renderSkill(i, props))}
      <div className="vertical-line1"> </div>

      {job_list.Job1.map((i) => renderSkill(i, props))}
      <div className="vertical-line2"> </div>

      {job_list.Job2.map((i) => renderSkill(i, props))}
      <div className="vertical-line3"> </div>

      {job_list.Job3.map((i) => renderSkill(i, props))}
      {renderSkill(SKILLS.length - 1, props)}
    </div>
  );
};

export default SkillList;