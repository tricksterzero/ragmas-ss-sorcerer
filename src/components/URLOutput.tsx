import React, { useState, useCallback } from 'react';

import ReactModal from 'react-modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { encodeJobLv } from '../common';

type Props = {
  lv: number[];
};

const URLOutput: React.FC<Props> = (props) => {
  // 表示用のURL
  const [Url, setUrl] = useState(window.location.origin + window.location.pathname);

  // モーダルの準備
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
    setUrl(window.location.origin + window.location.pathname + '?' + encodeJobLv(props.lv));
  }, [props.lv]);

  const handleCloseModal = useCallback(() => setShowModal(false), []);

  // レンダー
  return(
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
};

export default URLOutput;