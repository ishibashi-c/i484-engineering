# Content stressとalternative comparison

長さや状態の違いでlayoutの判断が変わるときに読む。これはcomponent frameworkでも検証手順でもなく、設計判断を壊しやすい代表状態を選ぶための契約である。

## Stress matrix

同じsurfaceについて、関係する範囲で次の状態を考える。

- long Japanese text: 改行、行高、見出しの階層、主要actionの到達性。
- missing image or data: 代替表示が欠落を明示し、aspect ratio、alt、action slotを壊さないか。
- empty and large collection: 空状態のrecoveryと、大量状態でのscan、overflow、paginationまたはvirtualizationの境界。
- saving, success, and error: status、disabled / loading、失敗の影響、再試行または入力保持の違い。

状態は装飾として置かず、各状態で何を読み、次に何を操作するかを考える。長文を隠すtruncation、欠落を空白にするplaceholder、large listを無制限に伸ばすlayoutを、比較しやすさだけで採用しない。完全な意味と回復経路を残す。

## 2案を比べる条件

重要なflowで、情報の比較と連続した読書のどちらが主目的かが未確定なら、次の2方向を同じcontent / stateで比較できる。

| 方向 | 主な仕事 | 観測する失敗 |
| --- | --- | --- |
| comparison-centric | 同列itemのslot、metadata、actionを揃えて差を見つける | 長文でrowが崩れる、disabled / missing stateが比較不能になる |
| reading-centric | 長文の順序、文脈、section rhythmを保って読む | large collectionでscanが遅い、主要actionが埋もれる |

複数案を作ること自体を工程にしない。比較は重要な不確実性を解く場合だけ使い、選択理由は、どのstress状態でどのユーザーtaskが成立するかに結び付ける。

## 観測対象

content stressについて主張する場合は、今回の設計を変えうる条件を観測対象として示す。例えば、狭幅、通常幅、long content、missing、empty、large collection、saving、error、keyboard / focusなどである。

このReferenceはbrowser操作、fixture作成、test追加、prototype保存などの実行方法を指定しない。どのtoolと範囲で確かめるかはengineering frameworkへ委ねる。測定または操作できない条件は`unverified`として扱う。
