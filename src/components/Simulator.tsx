import React, { useState, useCallback, useMemo } from "react";

// コンポーネントの読み込み
import Information from "./Information";
import SkillList from './SkillList';

import { decodeJobLv } from "../common";
import { SKILLS, JOBS } from '../sorcerer_data';


// コンポーネント本体
const Simulator: React.FC = () => {
  // 初期化
  // URLからクエリーを読み込んでデコードする
  const query = window.location.search.substring(1);
  const lv = useMemo(() => decodeJobLv(query, SKILLS.length), [query]);
  const current_lv = lv.reduce((s,e) => s+e, 0);

  let job = 0;
  while( JOBS[job].MaxLv <= current_lv && job < JOBS.length - 1 ) { job++; }

  // Hookする
  const [Job, setJob] = useState(job);
  const [Lv, setLv] = useState(lv);
  const [CurrentLv, setCurrentLv] = useState(current_lv);
  const [History, setHistory] = useState([ lv ]);


  // イベント用の関数
  // 各スキルをクリックした時の処理
  const handleClick = (i: number) => {
    const max_lv = (Job >= 3 && SKILLS[i].BreakthroughLv != null) ? SKILLS[i].BreakthroughLv : SKILLS[i].MaxLv;

    if( max_lv != null && Lv[i] < max_lv ) {
      const lv = Lv.slice();
      lv[i] = Lv[i] + 1;
      setLv(lv);

      const current_lv = lv.reduce((s,e) => s+e, 0);
      setCurrentLv(current_lv);

      // HistoryにLvを積む
      const history = History.slice();
      history.push(lv);
      setHistory(history);

      // 現在の合計レベルとジョブのすり合わせ
      if( current_lv >= JOBS[Job].MaxLv ) {
        const job = (Job < JOBS.length - 1) ? Job + 1 : Job;
        setJob(job);
      }
    }
  };

  // 状態をリセットする関数
  const resetData = useCallback(() => {
    const lv = Array(SKILLS.length).fill(0);

    setJob(0);
    setLv(lv);
    setCurrentLv(0);
    setHistory([ lv ]);
  },[]);

  // 状態をアンドゥする関数
  const undoData = () => {
    if( History.length > 1 ) {
      let history = History.slice(0, -1);

      let lv = history.pop();
      if( lv === undefined ) { lv = Array(SKILLS.length).fill(0); }
      setLv(lv);

      const current_lv = lv.reduce((s,e) => s+e, 0);
      setCurrentLv(current_lv);

      let job = 0;
      while( JOBS[job].MaxLv <= current_lv && job < JOBS.length - 1 ) { job++; }
      setJob(job);

      history.push( lv );
      setHistory(history);
    } else {
      return null;
    }
  };


  // レンダー
  return(
    <div className="simulator">
      <Information
        job={Job}
        lv={Lv}
        current_lv={CurrentLv}
        onClickReset={resetData}
        onClickUndo={undoData}
      />

      <SkillList
        job={Job}
        lv={Lv}
        current_lv={CurrentLv}
        onClick={(i) => handleClick(i)}
      />
    </div>
  );
};

export default Simulator;