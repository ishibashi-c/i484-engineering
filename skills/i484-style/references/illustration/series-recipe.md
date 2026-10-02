# Project series recipe

複数画像を一つのproject seriesとして読ませる必要があるときに使う。共有文法を保ちつつ、各主題固有のrecognition anchorを守るproduction aidであり、普遍style engineではない。

## 共有文法

- 一つのdominant subjectと明確なgrounding plane。
- 4〜7程度の大きなplane / bandを目安にし、細部よりsilhouetteとrelationshipを優先する。
- foreground anchor、middle-distance connector、restrained background fieldを役割として分ける。
- neutralを基盤に、subject accentとreflection / echo accentを限定的に使う。
- 各画像で2〜4件のrecognition anchorとその関係を先に定める。
- text-safe areaとcrop ratioは用途から決める。cropで優先関係を失う場合はcenter cropで済ませずrecomposeする。

## Ratioの考え方

`hero-wide`、`card-landscape`、`article-portrait`など用途ごとに、主題とquiet zoneの関係を設計する。比率名や固定パーセントを守ること自体を目的にせず、headline / captionと優先アンカーが競合しないことを基準にする。

master compositionから別ratioを作る場合も、priority-one anchorとそのrelationが読めることを優先し、secondary detailを減らす、clusterを移す、必要ならratioごとに再生成する。

## 観測条件

requested ratioが重要なら実際のpixel dimensionsを確認する。full imageと対象cropでpriority-one anchorと関係が読めるかを見る。hashやdimensionsは対象assetの同一性・寸法を確認できるが、視覚的一貫性そのものの証明ではない。
