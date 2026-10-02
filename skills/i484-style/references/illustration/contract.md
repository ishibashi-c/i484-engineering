# 幾何学イラストの契約

幾何学表現を指定された主題を、認識に必要な関係を保った平面、量塊、帯、重なり、限定色、反射へ変換する。実画像で主題・保持条件・視覚文法が成立すると確認できた候補と、重要な未解決事項を返す。観測できなければ合格を述べない。

文章からの生成、主題画像の幾何学化、作風を別の主題へ適用すること、他の媒体へ視覚文法を渡すことを扱う。画像入力がある場合は、生成前に[生成仕様](prompt-contract.md)でedit target、subject reference、style reference、supporting referenceを区別する。

生成・変換前は[視覚言語](visual-language.md)と[生成仕様](prompt-contract.md)、生成後の判断前は[視覚レビュー](visual-review.md)を読む。ラスター画像の制作には利用環境の標準画像生成機能を使う。必要な機能がなければ、生成仕様と未生成の状態を返す。生成を実行したとは報告しない。

## Authoring contract

1. 用途、主題、比率、入力画像の役割、保持すべき文字や関係を把握する。
2. 主題を読める認識アンカーと、支配・交差・反射・収束・順序などの関係を定める。2〜4件程度は目安とし、認識に必要な関係を数のために省かない。
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

## 評価の境界

style referenceから固有の配置やロゴを別の主題へ移さない。subject referenceとedit targetでは、依頼された固有性や位置関係を保持する。主題の保持と作風の転用を混同しない。

AIの事前評価とユーザーの好み・採用判断を分ける。ユーザーが評価していない候補を承認済みの方向へ一般化しない。deterministicなSVGや正確な文字の制作が必要な場合は、利用可能な実装機能へ必要な仕様を返し、受け手が存在しないhandoffを完了扱いにしない。
