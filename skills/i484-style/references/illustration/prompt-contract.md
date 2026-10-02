# プロンプト契約

## 画像入力の役割

生成前に各画像を分類する。

- `edit target`: この画像自体を変更する。
- `subject reference`: 主題の形、固有性、位置関係を参照する。
- `style reference`: 構図、形状文法、色の役割、密度、表面処理だけを参照する。
- `supporting reference`: 一部の物体、色、関係を補助する。

複数の役割を曖昧なまま混ぜない。style referenceから固有の人物、ロゴ、文字、ランドマーク配置を新しい画像へ移さない。

## コンパクトな視覚レシピ

必要な項目だけを解く。

```text
asset_role: <用途>
transformation: <direct | subject | world>
subject: <一つの主題>
recognition_anchors:
  - <優先度1の関係>
composition_layers: <背景 / 中景 / 構造 / 前景など>
shape_grammar: <支配する形と許容する曲線>
palette_roles: <背景、主量塊、副量塊、構造、接地、accent>
depth_reflection: <重なり、側面、反射、またはnone>
quiet_zone: <低密度領域>
omissions: <積極的に省くもの>
exact_text: <引用した文字またはnone>
ratio: <指定または用途に合う比率>
```

数値を埋めること自体を目的にしない。未指定の密度、抽象度、色比率を普遍値のように固定しない。

## 生成仕様の順序

画像生成プロンプトは、必要に応じて次の情報を短いラベル付き仕様へまとめる。

1. **Use and canvas:** 用途、比率、ラスター画像であること。
2. **Primary request:** ユーザーの依頼。
3. **Input roles:** 参照画像の役割。
4. **Subject and anchors:** 主題と保存する関係。
5. **Composition:** レイヤー、焦点、横断構造、静かな領域。
6. **Style and shape:** ミニマル幾何学、限定色、平面と量塊、許容する奥行き。
7. **Palette roles:** 色と各色の仕事。
8. **Text:** 必要な場合だけ逐語指定する。
9. **Constraints:** 維持条件、主要な省略、drift guard。

ユーザー指定が十分なら正規化に留め、新しい主題、物語、ロゴ、コピーを追加しない。

## Reference付き生成

style referenceは「同じ画像」にするためではなく、転用する関係を明示するために使う。例えば layered composition、role-based palette、block rhythm、crossing structure、simplified reflection を転用し、exact skyline、bridge geometry、landmark positions、panel layout、color sequenceは複製しない。

Subject transformationでは、維持する関係と省略する表面情報を両方書く。

## 修復

再試行ではプロンプト全体を無目的に書き換えない。元の主題、入力役割、優先アンカー、色の役割、比率を保ち、観測した失敗に対応する狭い変更だけを加える。

- ランドマークが埋もれた → 周囲の量塊を低くし、支配関係を強める。
- 橋が装飾線になった → 両岸を結ぶ構造として前後関係を強める。
- 写実化した → 窓と材質を除き、大面積の色面と狭い側面へ戻す。
- 色が散った → accentの役割を限定し、類似色を主色族へ統合する。

同じhard failureが狭い修復後も持続する場合は、無制限に試行を増やさず未解決として扱う。

## Exact text handoff

exact textがproduction-criticalで画像生成では逐語性を保てない場合は、背景・イラスト生成とdeterministic text overlayを分けるcode-nativeまたはraster-compositing経路へhandoffする。実際の合成コードはこのSkillの責務ではない。
