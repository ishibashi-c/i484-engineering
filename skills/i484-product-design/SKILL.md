---
name: i484-product-design
description: プロダクトUIの設計判断を支える専門Knowledge Skill。ユーザーの仕事、情報構造、composition、interaction、content、accessibility、visual hierarchy、状態と回復を評価し、設計上の制約・改善案・品質基準を与える。実装工程、作業分解、テスト量、レビュー起動、Gitやshippingはengineering frameworkに委ねる。
---

# i484 Product Design

プロダクトUIについて、**何を良い設計と判断するか**を支える。実装の進め方を指揮するSkillではない。

## Outcome

ユーザーのtask、情報の意味、状態、interaction、accessibility、visual hierarchyに照らして、今回のUIに必要な設計条件と品質判断を返す。

**Done:** 主要taskと重要stateを損なう設計上の問題・制約・改善方向が明確で、見た目や操作についての主張が何を観測すれば支持または反証できるか説明できる。

現在の依頼、Project仕様・DESIGN.md、既存UI、実データ契約、ユーザーが提示した参考を判断材料とする。既存UIは維持そのものを目的にせず、意味あるpatternとユーザーtaskに合うかで扱う。

## 責務境界

このSkillが持つのはProduct Design固有の判断である。

- ユーザーが何を読み、比較し、判断し、操作するか。
- 情報階層、composition、component role、typography、color、surface、密度。
- navigation、form、control、state、feedback、error prevention、recovery。
- 長短・欠落・localized content、loading / empty / errorなどへの耐性。
- semantics、keyboard、focus、label、contrast、reduced motionを含むaccessibility。
- data / visual / interaction parityを分けたUI fidelity。
- 設計上の主張に対応する観測事実とfindingの優先度。

Planning、task decomposition、実装順序、test / lint / build、reviewer起動、branch / worktree / commit / PR / deploy / shipping、他Skillのroutingと完了統括は持たない。そこはCompound Engineeringなど現在のengineering frameworkとProject指示を正とする。競合時は工程を上書きせず、必要な設計条件だけを返す。

## 必要な知識だけ読む

| 判断するもの | Reference |
|---|---|
| 視覚方向、文字組み、色、参考画像/URL | [design-language.md](references/design-language.md) |
| layout、共通部品、一覧、responsive構造 | [composition-components.md](references/composition-components.md) |
| control、form、navigation、state、accessibility | [interaction-content-accessibility.md](references/interaction-content-accessibility.md) |
| usability、誤操作防止、入力、error recovery、help | [usability-checklist.md](references/usability-checklist.md) |
| 長文、欠落、大量データ、saving / failure、比較案 | [content-stress-and-alternatives.md](references/content-stress-and-alternatives.md) |
| renderに基づく評価、component安定性、finding優先度 | [design-evaluation.md](references/design-evaluation.md) |

必要なReferenceだけ読む。Reference数やchecklist消化を品質指標にしない。

## 判断原則

表面の装飾より先に、ユーザーが何を理解し、比較し、判断し、どこで操作・回復する必要があるかから構造を選ぶ。

- hierarchyは重要度とtask順序を反映する。同じsurfaceや強調を無差別に増やさない。
- componentは外観ではなくroleで選び、同じ意味のcontrolやstateには一貫した表現を使う。
- typography、color、spacing、border、badgeは役割を持たせる。装飾の種類を増やすことを固有性と混同しない。
- Project内の一貫性とplatform慣例を出発点にし、外す場合はユーザーtaskから理由を持たせる。
- 一回限りの構成を想像上の再利用のために基盤化せず、反対に同じ意味のpatternを画面ごとに別物へしない。
- 短い理想データだけで成立するUIを合格にしない。判断を変えうる代表状態を選び、主要task・意味上のslot・回復経路が保たれるかを見る。

UXの具体的な観点は`usability-checklist.md`から今回のtaskとstateに関係するものだけを選ぶ。全項目を機械的に実行しない。

## UI fidelity

必要に応じて次を区別する。これは作業順序ではなく品質軸であり、一つの成立を他の証拠にしない。

- **Data parity:** 件数、フィールド、欠落値、派生state、asset fallbackなど、表示される意味が実データ契約と整合するか。
- **Visual parity:** hierarchy、geometry、spacing、surface、typography、responsive変換が合意した視覚意図を保つか。
- **Interaction parity:** 主要操作、state transition、keyboard / focus、validation、error recoveryが同じユーザーtaskを成立させるか。

## Evidence

このSkillはverification workflowを所有しない。設計主張に必要な観測対象だけを示す。詳しい基準は[design-evaluation.md](references/design-evaluation.md)を使う。

見た目の主張には実render、操作の主張には実際のstate transitionやfocus/recovery、native host固有の主張にはそのhostでの観測が関係する。Responsiveは名前付きdeviceを消化するのではなく、content pressureやlayout transitionが起きる条件を見る。観測できない主張は未確認のままにする。

実際のtool、順序、検証量、再実行、review、shippingはengineering frameworkが決める。

## 他の専門Skill

- ミニマル幾何学ラスターが必要なら`i484-geometric-illustration`。Product Designは用途、配置、crop、比率、背景との関係、代替説明を判断する。
- 単一のポータブルHTMLで説明・図解すること自体が成果物なら`i484-visualize`。
- ユーザー向け日本語の自然さを確認する専門Skillが利用可能なら、その知識を併用できる。
- lint、typecheck、tests、browser executionはこのSkillの専門領域ではない。

## Output

必要な設計判断だけを返す。状況に応じて設計制約、改善案、優先度、影響するstate、観測すべき条件を示す。

固定Phase、V-level、engineering task list、reviewer起動、Git/shipping手順を追加しない。同じAgentがこのKnowledgeを使って実装してもよいが、engineering workflowの統括はCEに残す。
