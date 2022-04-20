import React from 'react';

// コンポーネントの読み込み
import DataReset from './DataReset';
import DataUndo from './DataUndo';
import URLOutput from './URLOutput';

// スキル, ジョブ設定の読み込み
import { JOBS } from '../sorcerer_data';

// Jobごとのアイコンを読み込む
import JobIcon0 from '../icons/2-1_magician.png';
import JobIcon1 from '../icons/2-5_sage.png';
import JobIcon2 from '../icons/2-6_professor.png';
import JobIcon3 from '../icons/2-7_sorcerer.png';

// 引数の型設定
type Props = {
  job: number;
  lv: number[];
  current_lv: number;
  onClickReset: () => void;
  onClickUndo: () => null | undefined;
};


// コンポーネント
const Information: React.FC<Props> = (props) => {
  const job_icons = [JobIcon0, JobIcon1, JobIcon2, JobIcon2, JobIcon3, JobIcon3];

  return(
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
};

export default Information;