---
name: i484-geometric-illustration
description: ミニマル幾何学イラストの生成・参照画像変換・視覚レビューを行う専門Skill。都市景観、建築、風景、乗り物、植物などを、認識アンカーと関係を保った限定色の平面・量塊・帯・反射へ抽象化する。プロダクトUIや一般的なengineering workflowは扱わない。
---

# i484 Geometric Illustration

意味のある対象や風景を、認識できる関係を残したミニマル幾何学イラストへ変換する。中心となる視覚言語は平面、量塊、帯、重なり、限定色、反射である。

このSkillは画像authoring固有の判断を持つが、software engineeringのplanning、test、review orchestration、Git、PR、shippingは所有しない。

## 適用モード

- **Direct generation:** 文章から新しい幾何学イラストを作る。
- **Subject transformation:** 入力画像の主題と重要な関係を保ち、表面の細部を幾何学形へ還元する。
- **World extraction:** 参照画像の構図、形状文法、色の役割、密度、リズムを別の主題または媒体へ移す。
- **Visual-language handoff:** `i484-visualize`など別の専門Skillへ、幾何学の視覚レシピだけを渡す。

入力画像がある場合は、`edit target`、`subject reference`、`style reference`、`supporting reference`を区別する。変更対象と参照を混同しない。

## 必要なReference

- 生成・変換: [visual-language.md](references/visual-language.md) と [prompt-contract.md](references/prompt-contract.md)
- 生成後の判断: [visual-review.md](references/visual-review.md)
- 複数案の比較: [exploration.md](references/exploration.md)
- シリーズ整合: [series-recipe.md](references/series-recipe.md)
- 都市・橋・水面: [subjects/urban-waterfront.md](references/subjects/urban-waterfront.md)
- 「i484 style」や既存方向の継続: [approved-style.md](references/approved-style.md)

必要なReferenceだけ読む。

## Authoring contract

1. 用途、主題、比率、入力画像の役割、保持すべき文字や関係を把握する。
2. 主題を読める2〜4件程度の認識アンカーと、その支配・交差・反射・収束・順序などの関係を定める。
3. `visual-language.md`のMeaning / Composition / Shape grammar / Color and light / Density and rhythmから、必要な視覚レシピを作る。
4. `prompt-contract.md`に従って、ユーザー指定、認識アンカー、構図、色の役割、主要な省略、drift guardを一つの生成仕様へまとめる。
5. 利用環境の標準画像生成capabilityで生成する。
6. `visual-review.md`で実画像を観測し、プロンプトの整合だけで品質を合格にしない。
7. hard failureまたは明確なconcernがあれば、保持条件を固定したまま、診断に対応する狭い変更だけを試す。同じ失敗が持続する場合は試行を増やし続けず、最良候補と未解決点を示す。

これは画像生成という成果物に内在するauthoring contractであり、一般的なengineering Phaseではない。

## Visual-language handoff

別SkillがHTML/SVGなどを実装し、幾何学的な方向だけを必要とする場合は画像を生成せず、次を短い視覚レシピとして返す。

- Meaning
- Composition
- Shape grammar
- Color and light
- Density and rhythm
- 認識アンカーと関係
- semantic color roles
- quiet zone / omissions
- narrow-width adaptation
- drift guard

事実、数量、証拠の確定やHTML/CSS/SVG/ARIAの実装は受け手に残す。

## 他の専門Skillとの境界

- UIの構造、control、state、UX、accessibilityは`i484-product-design`の領域。
- ポータブルHTMLによる説明・図解は`i484-visualize`の領域。
- deterministicなSVGやcode-native graphicsそのものが正本なら、画像生成ではなくその実装経路を使う。
- 写真らしさ、商品撮影、一般的な画像修復など、ミニマル幾何学の判断が中心でない依頼には適用しない。

## 完了条件

主題と優先アンカーが読め、関係が保たれ、限定色・大きな面・量塊を中心とする視覚言語が成立し、参照の特徴的な配置を複製していないことを実画像で判断する。

AIの事前評価とユーザーの好み・採用判断を分ける。ユーザーが評価していない候補を「承認済みi484 style」へ一般化しない。

保守時だけ[出典](references/sources.md)を参照する。
