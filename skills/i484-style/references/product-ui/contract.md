# プロダクトUIの契約

ユーザーの目的、情報、操作、状態、アクセシビリティに照らして、今回のUIへ好みを適用し、必要な設計条件を返す。主要な操作や状態を損なう問題、改善方向、主張を確認する観測条件が明確なときに、この領域の判断が成立する。工程の統括はCEに残す。

## 必要な知識

ユーザーが状態を理解する、情報を選ぶ・入力する、移動する、操作を完了する、失敗から回復する能力を変えうる判断では、設計判断の前に[usability-checklist.md](usability-checklist.md)を読む。今回の結果を変えうる観点をtask / control / stateと結び付ける。純粋な見た目だけの変更では、この読み込みを要求しない。

構造や部品を選ぶ前は[composition-components.md](composition-components.md)、設計主張を評価する前は[design-evaluation.md](design-evaluation.md)を読む。文脈の違いが判断を変える場合は[context-surface-intent.md](context-surface-intent.md)でProduct truth、Design truth、Surface intentを区別する。

具体化した既知のscreen / flow / componentに重要な欠落の可能性がある場合は[completeness-audit.md](completeness-audit.md)を読む。利用可能な`checklist-design`に直接一致するものがあればauditを補助判断に使い、critiqueを既定の代替にしない。利用できなければ、確認できない範囲を示して継続する。

内蔵知識と現在の専門知識で重要な判断を支えられず、UI Skills MCPを利用できる場合だけ[external-ui-knowledge.md](external-ui-knowledge.md)を読む。外部registryは常時検索せず、工程やroutingの権限へ使わない。

## 品質の区別

- **Data parity:** 件数、フィールド、欠落値、派生状態、代替assetが実データ契約と一致する。
- **Visual parity:** 階層、形状、余白、文字、狭幅での変換が合意した意図を保つ。
- **Interaction parity:** 操作、状態遷移、キーボード、focus、validation、復旧がユーザーの目的を成立させる。

一つの成立を別の証拠にしない。UI内の図版では、用途、配置、crop、比率、背景、代替説明を定める。幾何学画像が明示的に必要な場合だけ同じSkillのillustration領域を使う。
