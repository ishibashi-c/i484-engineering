---
name: i484-style
description: "UI・説明資料へi484の好みを重ね、指定された幾何学イラストを設計・評価する。Use for new or changed product UI, visual explanations, portable HTML, or explicitly requested geometric illustration. Skip backend-only work, plain prose editing, and image requests without geometric direction."
---

# i484 Style

## 成果と完了条件

既存の制作機能と基本品質を保ち、共通の好みを今回の媒体へ適用する。必要な設計判断、独立HTML、または画像生成へ渡す仕様と評価を、ユーザーとCEの次の作業へ返す。

今回の意味・操作・保持条件を満たし、適用した好みとその根拠、重要な未確認事項を説明できたときに完了する。見た目、操作、内容、アクセシビリティの成立を互いの証拠にしない。工程の統括はCEに残し、実装の進め方、検証の実行、レビュー、Git、PR、公開をこのSkillで上書きしない。呼び出し元がある場合は判断と成果物を返し、同じセッションでCEの次の作業へ進む。

## 適用する範囲

新規UI・説明資料には自動適用する。今回の明示指定、Projectの確定した要件、既存ブランドを優先し、基本品質を満たす範囲で好みを加える。既存成果物の修正は依頼された範囲を保ち、好みを理由に全面的な再デザインを始めない。

幾何学イラストの表現は、幾何学表現が指定された場合だけ適用する。表現指定のない画像依頼、写真・写実指定、一般的な画像修復には幾何学表現を追加しない。文章校正や画面に影響しない内部処理は、担当する既存機能に任せる。

好みを適用する前に[共通方針](references/style-principles.md)を読む。情報や主題の関係、文字と色の役割、明快な幾何学、密度と静かな領域を媒体に合わせて選ぶ。全媒体へ同じ色数、形状、フォントを強制しない。具体的な好みの修正は今回の範囲に反映し、永続的な好みへ変更するのはユーザーがその変更を指示した場合だけにする。AIによる品質評価とユーザーの採用判断は区別する。

## 必要な領域を読む

該当する領域の契約を判断前に読む。複合成果物では必要な領域を組み合わせ、全領域の資料を一括で読まない。

| 今回の判断・成果物 | 必須の入口 |
|---|---|
| プロダクトUIの設計・変更・評価 | [product-ui](references/product-ui/contract.md) |
| 説明資料の視覚設計・独立HTMLの制作 | [communication](references/communication/contract.md) |
| 指定された幾何学イラストの生成・変換・評価、視覚文法の適応 | [illustration](references/illustration/contract.md) |

### UIの詳細

意味・操作・状態理解・復旧が変わる判断では、設計判断の前に[UX条件](references/product-ui/usability-checklist.md)を読む。見た目だけの変更では要求しない。具体化した既知の画面や流れに重要な欠落の可能性がある場合は[抜け漏れ確認](references/product-ui/completeness-audit.md)を読む。

設計の文脈が判断を変えるときは[文脈と目的](references/product-ui/context-surface-intent.md)を読む。
視覚方向を決めるときは[UIの視覚言語](references/product-ui/design-language.md)を読む。
構造や部品を選ぶ前は[構成](references/product-ui/composition-components.md)を読む。操作・状態・アクセシビリティを判断するときは[操作条件](references/product-ui/interaction-content-accessibility.md)を読む。
長文・欠落・大量データを扱うときは[内容の変化](references/product-ui/content-stress-and-alternatives.md)を読む。
設計主張を評価する前は[観測条件](references/product-ui/design-evaluation.md)を読む。

内蔵知識と現在の専門知識では重要なUI判断を支えられず、利用可能なUI Skills MCPで補う場合だけ[外部知識](references/product-ui/external-ui-knowledge.md)を読む。外部の工程やルーターを採用しない。

### 説明資料の詳細

章立て・比較・読書順・完全HTMLを設計するときは[文書構造](references/communication/document-structure.md)を読む。
既存の視覚方向がない場合は[資料の視覚言語](references/communication/visual-language.md)を読む。
関係・境界・状態を図にするときは[構造図](references/communication/structural-visualization.md)を読む。
操作で説明の状態を切り替える場合は[対話的な説明](references/communication/interactive-explanations.md)を読む。説明資料を依頼されたことだけでは、独立HTMLや画像生成を必須にしない。

### 幾何学イラストの詳細

生成・変換前は[視覚言語](references/illustration/visual-language.md)と[生成仕様](references/illustration/prompt-contract.md)、生成後の判断前は[実画像の評価](references/illustration/visual-review.md)を読む。複数案が必要なときは[探索](references/illustration/exploration.md)、シリーズは[共通レシピ](references/illustration/series-recipe.md)、都市・橋・水面は[主題の補助](references/illustration/subjects/urban-waterfront.md)、既存方向を継続するときは[承認された方向](references/illustration/approved-style.md)を読む。

## 証拠と返す内容

観測、解釈、提案、未確認を区別する。表示や画像について合格を述べる場合は実際の成果物を観測する。必要な機能や証拠が得られなければ、確認できた範囲と不足を示し、成功を推測しない。重要な問題はユーザーの操作・理解・復旧への影響で優先する。

判断だけの依頼には必要な設計条件と観測条件を返す。制作した場合は成果物への参照、適用した方向、重要な未確認事項を返す。分類名、全チェック項目、新しい状態ファイルを毎回の報告へ追加しない。

保守時の出典は[資料一覧](references/sources.md)、[UI](references/product-ui/sources.md)、[説明資料](references/communication/sources.md)、[イラスト](references/illustration/sources.md)を参照する。
