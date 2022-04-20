# これは何？
[ラグナロクマスターズ](https://ragnarokm.gungho.jp/)のスキル振りをシミュレートするヤツです。その中でもソーサラー用になります。Reactの習作として作ったのでいろいろグダグダな書き方になっています。リファクタリングする前の状態ですが公開してみます。

## メモ
### アイコンの著作権
[ラグマス運営サイト](https://ragnarokm.gungho.jp/member/)にて配布されていたファンキットからアイコンを取り出して使っています。が、いつの間にかファンキットの配布ページがなくなってしまっているので権利関係がよく分からなくなってしまいました。当リポジトリで再配布する形になっていますが権利を侵害する目的ではないことを明記しておきます。

### Webpackの設定
上書きされがちなファイルなのでメモとして残しておきます。

```JavaScript:/node_modules/react-scripts/config/webpack.config.js
    resolve: {
      fallback: {
        "assert": require.resolve("assert"),
        "buffer": require.resolve("buffer"),
        "stream": require.resolve("stream-browserify"),
        "zlib": require.resolve("browserify-zlib"),
      },
	  }

```
