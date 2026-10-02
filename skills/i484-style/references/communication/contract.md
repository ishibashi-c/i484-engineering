# 説明・図解の契約

読者が理解・比較・判断できる構成へ、共通の好みを適用する。資料形式は今回の用途に合わせ、独立HTMLを求められた場合は単体で開ける文書を作る。通常の文章や小さなインライン図だけで伝わる場合は、その形式を使う。会話内の可視化は公式Visualize、単純な静的関係はMermaidなど、利用環境の適切な機能で制作できる。独立HTMLへの変換を毎回要求しない。

内容、根拠、読み順、図の意味、アクセシビリティを保ち、必要な成果物と未確認事項を返したときに、この領域の制作が完了する。幾何学的な方向が指定され、視覚文法を移す場合はillustration領域を参照する。HTML、表、意味のある図の制作責務はこの領域に残す。

## 内容から構成を選ぶ

読者、主題、伝える結論、根拠を把握する。散文・表で明確なら文書、関係が主張を支えるなら図解、両方が必要なら複合にする。モード名の報告や別の根拠マップファイルは不要。観測、提案、解釈、未確認を内容上で区別し、見栄えを根拠にしない。

- ページの章立て・比較・読書順を設計するとき: [document-structure.md](document-structure.md)。
- 既存の視覚方向がないとき: [visual-language.md](visual-language.md)。
- 関係・境界・状態を図解するとき: [structural-visualization.md](structural-visualization.md)。
- step-through、current/alternative boundary、data/permission、assumption、evidence linkを含む説明を作るとき: [interactive-explanations.md](interactive-explanations.md)。

必要なReferenceだけ読む。図や用語集は理解を実際に改善する場合に置く。見出し、段落、表、figure、detailsなど意味に合うHTMLを使い、装飾より読み順・行長・階層を整える。

幾何学的な視覚言語を使う場合も、転用するのは構図、関係、形状文法、色の役割、密度、リズムであり、参照画像の作品、固有配置、文字、ロゴ、ピクセル表現ではない。

## 出力契約と成果物固有の検証

HTML文書のメタデータ、埋め込みCSS、外部表示依存を避ける契約は[document-structure.md](document-structure.md)の「完全HTMLの契約」を参照する。図には短い名前と、関係・主張を伝える本文や表による同等の説明を用意し、装飾SVGは支援技術から隠す。

インタラクションは説明を置き換えず、既に書かれた状態の表示を切り替える。step-throughはデータ、actor、permission、evidenceを含む番号付き経路を持ち、current/alternative boundaryは両方の意味を本文でも示す。assumptionは結論へ与える影響を明記し、根拠のない数量シミュレーションを作らない。実例は[interactive-explanations.md](interactive-explanations.md)を参照する。

成果物を作った場合は、同梱validatorを利用できる。

```bash
SKILL_DIR="<absolute path of the directory containing the SKILL.md you just read>";
node "$SKILL_DIR/scripts/validate-html.mjs" <artifact.html>
```

これは基本メタデータ、重複ID、代表的な外部表示依存、情報SVGの名前・明示的な説明参照を検査する。HTML parser、scriptの動的挙動、説明の意味的同等性、rendererの代替ではない。

表示について主張する場合は、実際のrenderで文章、表、図のoverflow、読める順序、操作部品のlabel/focusなどを観測する必要がある。どのbrowser/toolを使い、engineering全体のどの時点で検証するかはCompound Engineeringなど現在のengineering frameworkに委ねる。

指定された保存先へ説明的な名前で保存する。未指定なら上位のartifact保存規則、それもなければcwdを使う。最終成果物ではファイルへの参照と重要な未確認事項を示す。
