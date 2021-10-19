// クラス名プレフィクス
export const PREFIX = 'sorcerer';

// スキル
export const SKILLS = [
  // マジシャン
  { ID: 0,  Name: 'ソウルストライク',               MaxLv: 10, BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 0 },
  { ID: 1,  Name: 'ファイアーボルト',               MaxLv: 10, BreakthroughLv: 15,   PrevID: null, RequireLv: null, RequireJob: 0 },
  { ID: 2,  Name: 'ファイアーウォール',             MaxLv: 10, BreakthroughLv: null, PrevID: 1,    RequireLv: 5,    RequireJob: 0 },
  { ID: 3,  Name: 'SP回復力向上',                   MaxLv: 10, BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 0 },
  { ID: 4,  Name: 'コールドボルト',                 MaxLv: 10, BreakthroughLv: 15,   PrevID: null, RequireLv: null, RequireJob: 0 },
  { ID: 5,  Name: 'フロストダイバー',               MaxLv: 10, BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 0 },
  { ID: 6,  Name: 'ライトニングボルト',             MaxLv: 10, BreakthroughLv: 15,   PrevID: null, RequireLv: null, RequireJob: 0 },

  // セージ
  { ID: 7,  Name: 'フリーキャスト',                 MaxLv: 5,  BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 1 },
  { ID: 8,  Name: 'スペルブレイカー',               MaxLv: 5,  BreakthroughLv: 10,   PrevID: 7,    RequireLv: 5,    RequireJob: 1 },
  { ID: 9,  Name: 'ボルケーノ',                     MaxLv: 5,  BreakthroughLv: 10,   PrevID: 2,    RequireLv: 3,    RequireJob: 1 },
  { ID: 10, Name: 'アーススパイク',                 MaxLv: 10, BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 1 },
  { ID: 11, Name: 'ランドプロテクター',             MaxLv: 5,  BreakthroughLv: null, PrevID: 10,   RequireLv: 5,    RequireJob: 1 },
  { ID: 12, Name: 'デリージュ',                     MaxLv: 5,  BreakthroughLv: 10,   PrevID: 5,    RequireLv: 3,    RequireJob: 1 },
  { ID: 13, Name: 'オートスペル',                   MaxLv: 10, BreakthroughLv: 20,   PrevID: null, RequireLv: null, RequireJob: 1 },
  { ID: 14, Name: 'アドバンスドブック',             MaxLv: 10, BreakthroughLv: 20,   PrevID: null, RequireLv: null, RequireJob: 1 },
  { ID: 15, Name: 'バイオレントゲイル',             MaxLv: 5,  BreakthroughLv: null, PrevID: 6,    RequireLv: 5,    RequireJob: 1 },
  { ID: 16, Name: 'エナジーコート',                 MaxLv: 5,  BreakthroughLv: 10,   PrevID: null, RequireLv: null, RequireJob: 1 },

  // プロフェッサー
  { ID: 17, Name: 'メモライズ',                     MaxLv: 5,  BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 2 },
  { ID: 18, Name: 'スパイダーウェブ',               MaxLv: 5,  BreakthroughLv: null, PrevID: 9,    RequireLv: 2,    RequireJob: 2 },
  { ID: 19, Name: 'ダブルキャスティング',           MaxLv: 10, BreakthroughLv: 15,   PrevID: null, RequireLv: null, RequireJob: 2 },
  { ID: 20, Name: '生命力変換',                     MaxLv: 5,  BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 2 },
  { ID: 21, Name: 'ソウルチェンジ',                 MaxLv: 5,  BreakthroughLv: 10,   PrevID: null, RequireLv: null, RequireJob: 2 },
  { ID: 22, Name: 'マインドブレイカー',             MaxLv: 10, BreakthroughLv: 15,   PrevID: null, RequireLv: null, RequireJob: 2 },
  { ID: 23, Name: 'ソウルバーン',                   MaxLv: 10, BreakthroughLv: 20,   PrevID: 22,   RequireLv: 3,    RequireJob: 2 },
  { ID: 24, Name: 'セイフティウォール',             MaxLv: 10, BreakthroughLv: null, PrevID: 16,   RequireLv: 3,    RequireJob: 2 },
  { ID: 25, Name: 'マジックロッド',                 MaxLv: 5,  BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 2 },
  { ID: 26, Name: 'ディスペル',                     MaxLv: 5,  BreakthroughLv: 10,   PrevID: null, RequireLv: null, RequireJob: 2 },

  // ソーサラー
  { ID: 27, Name: 'ストライキング',                 MaxLv: 10, BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 4 },
  { ID: 28, Name: 'サモンエレメンタル',             MaxLv: 10, BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 4 },
  { ID: 29, Name: 'エレメンタルコミュニケーション', MaxLv: 5,  BreakthroughLv: null, PrevID: 28,   RequireLv: 1,    RequireJob: 4 },
  { ID: 30, Name: 'スペルフィスト',                 MaxLv: 10, BreakthroughLv: null, PrevID: 19,   RequireLv: 3,    RequireJob: 4 },
  { ID: 31, Name: 'サイキックウェーブ',             MaxLv: 10, BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 4 },
  { ID: 32, Name: 'アースグレイブ',                 MaxLv: 10, BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 4 },
  { ID: 33, Name: 'ヴェラチュールスピアー',         MaxLv: 20, BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 4 },
  { ID: 34, Name: 'アルージョ',                     MaxLv: 5,  BreakthroughLv: null, PrevID: 33,   RequireLv: 3,    RequireJob: 4 },
  { ID: 35, Name: 'ウォーマー',                     MaxLv: 5,  BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 4 },
  { ID: 36, Name: 'ダイヤモンドダスト',             MaxLv: 20, BreakthroughLv: null, PrevID: 35,   RequireLv: 3,    RequireJob: 4 },

  { ID: 37, Name: '身体能力強化',                   MaxLv: 20, BreakthroughLv: null, PrevID: null, RequireLv: null, RequireJob: 5 },
];

// ジョブ
export const JOBS = [
  { ID: 0, Name: 'マジシャン',               MaxLv: 40 },
  { ID: 1, Name: 'セージ',                   MaxLv: 80 },
  { ID: 2, Name: 'プロフェッサー',           MaxLv: 120 },
  { ID: 3, Name: 'プロフェッサー(上限突破)', MaxLv: 150 },
  { ID: 4, Name: 'ソーサラー',               MaxLv: 210 },
  { ID: 5, Name: 'ソーサラー(上限突破)',     MaxLv: 230 },
];