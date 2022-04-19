// ========================================
// いろいろimportする
//
// Reactコンポーネント
import React, { useState, useMemo, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// モーダルウィンドウを出すヤツ
import ReactModal from 'react-modal';

// クリップボードにコピーするヤツ
import { CopyToClipboard } from 'react-copy-to-clipboard';

// gzip圧縮するヤツ
import { Buffer } from 'buffer';
import Zlib from 'zlib';

// Base64文字列をURL Safeで扱うヤツ
import { encode as encodeURLSafe, decode as decodeURLSafe, trim as trimURLSafe } from 'url-safe-base64';

// CSSの読み込み
import 'ress';
import './common.css';
import './sorcerer.css';

// スキル, ジョブ設定の読み込み
import { PREFIX, SKILLS, JOBS } from './sorcerer_data';

// Jobごとのアイコンを読み込む
import JobIcon0 from './2-1_magician.png';
import JobIcon1 from './2-5_sage.png';
import JobIcon2 from './2-6_professor.png';
import JobIcon3 from './2-7_sorcerer.png';


// ========================================
// Interface
//
interface ISimulatorProps {}

interface ISkillListProps {
  job: number;
  lv: number[];
  current_lv: number;
  onClick: (i: number) => void;
}

interface IInformationProps {
  job: number;
  lv: number[];
  current_lv: number;
  onClickReset: () => void;
  onClickUndo: () => null | undefined;
}

interface IDataResetProps {
  onClick: () => void;
}

interface IDataUndoProps {
  onClick: () => null | undefined;
}

interface IURLOutputProps {
  lv: number[];
}

interface ISkillProps {
  id: number;
  key: number; 
  lv: number;
  max_lv: number;
  disable: boolean;
  finished: boolean;
  onClick: (i: number) => void;
}


// ========================================
// 関数
//
// lv配列を圧縮してBase64にする
function encodeJobLv(lv: number[]): string {
  const lv2text = lv.join(',');
  const compressed = Buffer.from(Zlib.deflateSync(lv2text));
  const base64text = compressed.toString('base64');
  const urlsafe = trimURLSafe(encodeURLSafe(base64text));

  return urlsafe;
}

// Base64をlv配列にする
function decodeJobLv(query: string): number[] {
  const base64text = decodeURLSafe(query);
  const binary = Buffer.from(base64text, 'base64');

  let decompressed;
  try {
    decompressed = Zlib.inflateSync(binary);
  } catch(e) {
    decompressed = Array(SKILLS.length).fill(0).join(',');
  }

  const lv = decompressed.toString().split(',', SKILLS.length).map(Number);
  return lv;
}


// ========================================
// コンポーネント
//
const Simulator = (props: ISimulatorProps) => {
  // 初期化
  // URLからクエリーを読み込んでデコードする
  const query = window.location.search.substring(1);
  const lv = useMemo(() => decodeJobLv(query), [query]);
  const current_lv = lv.reduce((s,e) => s+e, 0);

  let job = 0;
  while( JOBS[job].MaxLv <= current_lv && job < JOBS.length - 1 ) { job++; }

  // Hookする
  const [Job, setJob] = useState(job);
  const [Lv, setLv] = useState(lv);
  const [CurrentLv, setCurrentLv] = useState(current_lv);
  const [History, setHistory] = useState([ lv ]);


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
  }

  // 状態をリセットする
  const resetData = useCallback(() => {
    const lv = Array(SKILLS.length).fill(0);

    setJob(0);
    setLv(lv);
    setCurrentLv(0);
    setHistory([ lv ]);
  },[]);

  // 状態をアンドゥする
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
  }

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
}

const Information = (props: IInformationProps) => {
  const job_icons = [JobIcon0, JobIcon1, JobIcon2, JobIcon2, JobIcon3, JobIcon3];

  return (
    <div className="information">
      <div className="status">
        <div><img alt="" src={job_icons[props.job]} width="32" height="32" /></div>
        <div className="job-data">
          {JOBS[props.job].Name}<br />
          {props.current_lv}/{JOBS[props.job].MaxLv}
        </div>
      </div>

      <DataReset onClick={props.onClickReset} />
      <DataUndo onClick={props.onClickUndo} />
      <URLOutput lv={props.lv} />
    </div>
  );
}

const DataReset = React.memo((props: IDataResetProps) => {
  return (
    <div className="data-reset">
      <button onClick={props.onClick}>リセット</button>
    </div>
  );
});

const DataUndo = (props: IDataUndoProps) => {
  return (
    <div className="data-undo">
      <button onClick={props.onClick}>アンドゥ</button>
    </div>
  );
}

const URLOutput = (props: IURLOutputProps) => {
  const [Url, setUrl] = useState(window.location.origin + window.location.pathname);

  // モーダルの準備
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setShowModal(true)
    setUrl(window.location.origin + window.location.pathname + '?' + encodeJobLv(props.lv));
  }, [props.lv]);

  const handleCloseModal = useCallback(() => setShowModal(false), []);

  // レンダー
  return (
    <div className="url-output">
      <button onClick={handleOpenModal}>URL出力</button>
      <ReactModal
          isOpen={showModal}
          onRequestClose={handleCloseModal}
          contentLabel="URL出力"
          className="modal"
          overlayClassName="overlay"
      >
        <input type="url" readOnly value={Url} /><br /><br />
        <CopyToClipboard text={Url}>
          <button>コピー</button>
        </CopyToClipboard>
        <button onClick={handleCloseModal}>閉じる</button>
      </ReactModal>
    </div>
  );
}

const SkillList = (props: ISkillListProps) => {
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

  const renderSkill = (i: number, props: ISkillListProps) => {
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
}

const Skill = (props: ISkillProps) => {
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
}

// ========================================
// 描画
//
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

/*
ReactDOM.render(
  <React.StrictMode>
    <Simulator />
  </React.StrictMode>,
  document.getElementById('root')
);
*/