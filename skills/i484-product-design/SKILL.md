---
name: i484-product-design
description: プロダクトUIの設計判断を支える専門Knowledge Skill。ユーザーの仕事、情報構造、composition、interaction、content、accessibility、visual hierarchy、状態と回復を評価し、設計上の制約・改善案・品質基準を与える。実装工程、作業分解、テスト量、レビュー起動、Gitやshippingはengineering frameworkに委ねる。
---

# i484 Product Design

プロダクトUIについて、**何を良い設計と判断するか**を支える。実装の進め方を指揮するSkillではない。

現在の依頼、Projectの仕様・DESIGN.md、既存UI、実データ契約、ユーザーが提示した参考を設計判断の材料として扱う。既存UIは維持そのものを目的にせず、ユーザーの仕事と既存の意味あるpatternに合うかで判断する。

## 責務境界

このSkillが持つのはProduct Design固有の判断である。

- ユーザーが何を読み、比較し、判断し、操作するか。
- 情報階層、composition、密度、文字組み、色、surface、componentの役割。
- navigation、form、control、state、feedback、error prevention、recovery。
- contentの長短・欠落・大量・localized content・loading / empty / errorなどへの耐性。
- native semantics、keyboard、focus、label、contrast、reduced motionを含むaccessibility。
- data / visual / interaction parityを区別したUI fidelityの判断。
- 見た目や操作について、どの観測事実がその主張を支えるかという品質基準。

次はこのSkillの責務ではない。

- planning、task decomposition、実装順序、phase、作業規模の分類。
- test / lint / buildの実行順、検証量、reviewerの起動条件。
- branch、worktree、commit、push、PR、deploy、handoffなどのengineering workflow。
- 他Skillのルーティングや、完了・shippingの統括。

これらはCompound Engineeringなど、現在のengineering frameworkとProject指示を正とする。Product Design上の観点がengineering上の判断と競合する場合、このSkillは工程を上書きせず、必要な設計条件だけを返す。

## 必要な知識だけ読む

| 今回判断するもの | Reference |
|---|---|
| 視覚方向、文字組み、色、参考画像/URLの解釈 | [design-language.md](references/design-language.md) |
| layout、共通部品、一覧、可変content、responsive構造 | [composition-components.md](references/composition-components.md) |
| control、form、navigation、state、focus、accessibility | [interaction-content-accessibility.md](references/interaction-content-accessibility.md) |
| UX、状態可視化、誤操作防止、入力、error recovery、help | [usability-checklist.md](references/usability-checklist.md) |
| 長文、欠落データ、large collection、saving / failure、比較案 | [content-stress-and-alternatives.md](references/content-stress-and-alternatives.md) |

必要なReferenceだけ読む。Reference数を品質指標にせず、既に文脈にある知識を機械的に再読しない。

## 設計判断の核

表面の装飾より先に、ユーザーのtaskと情報の意味を捉える。何を最初に理解し、何を比較し、どこで判断し、どう回復する必要があるかから構造を選ぶ。

- hierarchyは重要度とtask順序を反映する。すべてを同じsurface、同じ強調、同じcardへ押し込まない。
- componentは見た目ではなくroleで選ぶ。button、link、tab、checkbox、switch、selectなどの意味と適用タイミングを一致させる。
- typography、color、spacing、border、badgeは役割を持たせる。装飾の種類を増やすことを固有性と混同しない。
- Project内の一貫性とplatformの慣例を出発点にし、異なる設計が必要ならユーザーtaskから理由を持たせる。
- 一回限りの構成を将来の再利用を想像して基盤化しない。逆に、同じ意味のpatternを画面ごとに別物へしない。

## UXの判断

`usability-checklist.md`の観点を、今回のユーザーtask、control、stateに応じて選ぶ。全項目を機械的に消化しない。

特に次を優先して見る。

- 現在地、処理中、選択、保存、成功、失敗などの状態が理解できるか。
- labelとaction後の結果がユーザーの言葉で予測できるか。
- 間違いを防ぎ、取り消し・再試行・戻る・修正が可能か。
- 同じ意味のcontrolや状態が一貫した見た目と挙動を持つか。
- 記憶を要求するより、候補・例・既存値・状態など認識できる手掛かりを出せているか。
- errorが原因・影響・次の行動を理解できる形で、関係する場所に現れるか。
- 重要な情報とprimary actionが、装飾や補助情報に埋もれていないか。

## Contentと状態

短い理想データだけで成立するUIを良い設計としない。今回のsurfaceに関係する範囲で、次の圧力を考える。

- 短い / 長い / localized content。
- 欠落値、画像失敗、未知値。
- empty、loading、saving、success、error、permission denied。
- 少数とlarge collection。
- keyboard / focus時、狭幅、overflow。

すべてのstateを毎回作る必要はない。設計判断を変えうる代表状態を選び、その状態でも主要task、意味上のslot、回復経路が失われないことを基準にする。

## UI fidelityの3つの軸

モック、fixture、実装、既存画面を比較するときは、必要に応じて次を区別する。これは作業順序ではなく、品質を混同しないための判断軸である。

- **Data parity:** 件数、フィールド、欠落値、派生state、asset fallbackなど、表示される意味が実データ契約と整合しているか。
- **Visual parity:** hierarchy、geometry、spacing、surface、typography、responsive変換など、合意した視覚意図が保たれているか。
- **Interaction parity:** 主要操作、state transition、keyboard / focus、validation、error recoveryが同じユーザーtaskを成立させるか。

一つを確認したことを他の成立証拠にしない。

## Evidenceを設計判断へ結び付ける

このSkillはverification workflowを所有しないが、設計上の主張に必要な観測対象は示す。

- 見た目の主張には実際にrenderされた表示が関係する。
- 操作の主張には実際のstate transition、keyboard / focus、error recoveryが関係する。
- native host固有の見た目や挙動は、そのhostでの観測なしに成立したと断定しない。
- responsiveの主張は名前付きdeviceだけでなく、content pressureやlayout transitionが起きる条件を見る。
- 「使いやすそう」「きれいそう」という印象だけで問題なしとしない。

実際にどのtoolで、どの順序で、どの量を検証するかはengineering frameworkが決める。このSkillは**何を観測すればそのデザイン主張を支持または反証できるか**だけを提供する。

## 参考と視覚方向

参考画像・URLは、targetかreferenceかを依頼文から判断する。観測した構造・文字・色・挙動と推論を区別し、読めない資料の内容を推測しない。

視覚方向を選ぶときは、見栄えの模倣よりも、主役、情報密度、reading rhythm、shape、surface、color role、静かな領域を抽出する。既存Projectのdesign languageがあればそれを基準にし、変更が必要な場合はユーザーtaskと内容から理由を持たせる。

## 他の専門Skillとの境界

- ミニマル幾何学ラスターそのものが必要なら`i484-geometric-illustration`の専門知識を利用できる。Product Design側は用途、配置、crop、比率、背景との関係、代替説明を判断する。
- 単一のポータブルHTMLで説明・図解すること自体が成果物なら`i484-visualize`の領域とする。
- ユーザー向け日本語の自然さを専門的に確認するSkillが利用可能なら、文言品質はその専門知識を併用できる。
- コード品質、lint、typecheck、tests、browser executionはこのSkillの専門領域ではない。

## 出力

必要な設計判断だけを返す。状況に応じて、設計制約、改善案、優先度、影響するstate、観測すべき条件を示す。

このSkillのために固定Phase、V-level、checklist消化報告、reviewer起動、engineering task listを追加しない。実装担当と同じAgentがこのKnowledgeを使ってコードを書いてもよいが、engineering workflowの統括は現在のengineering frameworkに残す。
