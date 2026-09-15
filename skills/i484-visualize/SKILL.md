---
name: i484-visualize
description: 説明・比較・図解・技術引き継ぎを単一の自己完結型HTMLファイルにする。ポータブルなページが必要な場合、または指定された視覚言語をHTML/SVGへ適応する場合に使い、通常の文章回答や小さなインライン図には適用しない。
---

# i484 視覚的コミュニケーション

読者が理解・判断するための、単一のポータブルHTMLを作る。Webアプリの基盤や公開操作は持ち込まない。ユーザー指定とProjectの保存先・視覚方向を優先する。

## 責務境界とスタイル統合

このSkillの正本は「何を伝えるか」「どの根拠をどの順序で読ませるか」「それをポータブルなHTML/SVGへどう翻訳するか」である。視覚スタイルは内容の意味を変えないauthoring-time inputとして扱い、スタイルを理由に事実、証拠境界、アクセシビリティ、読み順を変更しない。

- 常にこのSkillが担当する: 読者、主張、観測・解釈・未確認の区別、情報階層、semantic HTML、表、根拠リンク、情報SVG、レスポンシブ、成果物固有の検証。
- 既存のデザインシステムまたはユーザー指定の方向があればReuseし、なければこのSkillの視覚言語を使う。スタイルを決める前に、主役、関係、境界、密度、静かな領域を短いvisual briefへ整理する。
- ユーザーが幾何学的な方向、i484 geometric、またはgeometric visual languageを指定した場合だけ、`i484-geometric-illustration`の視覚言語をauthoring-time inputとして利用する。geometric側へHTML、CSS、SVG、ARIA、表、リンク、ブラウザQAの実装を委譲しない。
- 主題がプロダクトUI設計そのものの場合は、`i484-product-design`の専門判断を利用できるが、HTML成果物のauthoring責務はこのSkillに残す。

## 内容から構成を選ぶ

読者、主題、伝える結論、根拠を把握する。散文・表で明確なら文書、関係が主張を支えるなら図解、両方が必要なら複合にする。モード名の報告や別の根拠マップファイルは不要。観測、提案、解釈、未確認を内容上で区別し、見栄えを根拠にしない。

- ページの章立て・比較・読書順を設計するとき: [document-structure.md](references/document-structure.md)。
- 既存の視覚方向がないとき: [visual-language.md](references/visual-language.md)。
- 関係・境界・状態を図解するとき: [structural-visualization.md](references/structural-visualization.md)。
- step-through、current/alternative boundary、data/permission、assumption、evidence linkを含む説明を作るとき: [interactive-explanations.md](references/interactive-explanations.md)。

必要なReferenceだけ読む。図や用語集は理解を実際に改善する場合に置く。見出し、段落、表、figure、detailsなど意味に合うHTMLを使い、装飾より読み順・行長・階層を整える。

幾何学的な視覚言語を使う場合も、転用するのは構図、関係、形状文法、色の役割、密度、リズムであり、参照画像の作品、固有配置、文字、ロゴ、ピクセル表現ではない。

## 出力契約と成果物固有の検証

HTML文書のメタデータ、埋め込みCSS、外部表示依存を避ける契約は[document-structure.md](references/document-structure.md)の「完全HTMLの契約」を参照する。図には短い名前と、関係・主張を伝える本文や表による同等の説明を用意し、装飾SVGは支援技術から隠す。

インタラクションは説明を置き換えず、既に書かれた状態の表示を切り替える。step-throughはデータ、actor、permission、evidenceを含む番号付き経路を持ち、current/alternative boundaryは両方の意味を本文でも示す。assumptionは結論へ与える影響を明記し、根拠のない数量シミュレーションを作らない。実例は[interactive-explanations.md](references/interactive-explanations.md)を参照する。

成果物を作った場合は、同梱validatorを利用できる。

```bash
node <i484-visualize>/scripts/validate-html.mjs <artifact.html>
```

これは基本メタデータ、重複ID、代表的な外部表示依存、情報SVGの名前・明示的な説明参照を検査する。HTML parser、scriptの動的挙動、説明の意味的同等性、rendererの代替ではない。

表示について主張する場合は、実際のrenderで文章、表、図のoverflow、読める順序、操作部品のlabel/focusなどを観測する必要がある。どのbrowser/toolを使い、engineering全体のどの時点で検証するかはCompound Engineeringなど現在のengineering frameworkに委ねる。

指定された保存先へ説明的な名前で保存する。未指定なら上位のartifact保存規則、それもなければcwdを使う。最終成果物ではファイルへの参照と重要な未確認事項を示す。

このSkillはbranch、commit、PR、deploy、一般コードレビュー、engineering task decompositionを所有しない。

保守時だけ[出典](references/sources.md)を参照する。
