# Compositionとcomponent

layout、繰り返しitem、card、componentの構造、hierarchy、responsive compositionを扱うときに読む。

## composition前に分類する

プロダクトの仕事とcollectionの関係から構造を選ぶ。

- **Comparative grid（比較grid）:** ユーザーが同列の対象を比較する。安定した意味上のslotと揃ったactionが重要。
- **Priority or featured collection（優先・featured collection）:** 階層を意図的に不均等にする。span、scale、placementが異なってよい。
- **Timeline or conversation（timeline・conversation）:** 順序と発言者が中心になる。高さの違いに意味がある。
- **Editorial composition（editorial composition）:** 読むリズムと物語上の強調が中心になる。機械的な均等化が弱めることがある。
- **Work surface（work surface）:** density、selection、bulk action、stateの可視性が中心になる。cardよりlist、table、split paneが適することがある。

画面は複数のarchetypeを組み合わせてもよいが、各regionには明確な仕事が必要である。

各sectionまたはsurfaceは1つの主要な仕事を担う。containerを埋めるためだけに、関係のないcontentとactionを組み合わせない。

## ページ規模のcomposition語彙

ページまたは主要routeでは、styleを決める前に支配的なcompositionを名前で定義する。新奇性のノルマではなく、仕事から選ぶ。

- **Bento / priority collection:** 不均等なblockでfeatured contentや証拠の重みの違いを伝える。
- **Long document / editorial:** 連続した読書とsectionのリズムで体験を作る。
- **Workbench:** screenshot、control、live product stateで使い方を示す。
- **Conversational FAQ:** questionとanswerが主なnavigationとcontent rhythmになる。
- **Manifesto / statement:** 強い宣言を先に置き、supporting proofが続く。
- **Photographic / visual-led:** 実画像またはproduct objectが主な意味を担う。
- **Split studio:** textとproofを意図的な2分割の関係で交互に置く。
- **Index / portfolio:** 実collectionの閲覧とfilteringがproductの仕事になる。

すべてのrouteに異なるcompositionを無理に割り当てない。候補を隣接画面とProjectの`DESIGN.md`と比較し、同じtaskを支えるなら安定したcompositionを再利用する。異なる形が必要な場合は例外として記録する。この語彙はplanning aidであり、template catalogueではない。

## card skeleton

cardは、その境界がgrouping、scanning、comparison、selection、actionの助けになる場合だけ使う。比較用collectionでは次を守る。

1. identity、title、metadata、summary、status、actionなど、安定した意味上の順序を保つ。
2. ユーザーが比較するslotを確保し、揃える。
3. contentの長さにかかわらず、primary actionを予測可能な位置に置く。
4. 長いcontent、欠落したcontent、localized contentを、意味の順序を変えずに扱う。
5. 比較が実質的に改善する場合だけ高さを揃える。均等化によって重要なcontentが切れたり、誤解を招く空白が生じたりする場合はcontentに高さを決めさせる。
6. collectionがeditorial、時系列、または意図的にfeaturedである場合は、高さの同一化を避ける。

比較可能なcardでは、表示されるaction数と順序も比較軸である。itemごとに利用可能性が異なる場合は、disabled stateを含む安定したaction set、または共通のoverflow／menu entryを優先する。data依存のaction variationは、metadata欠落の偶発的な副作用ではなく、cardの仕事から意図的に生じる場合だけ許可する。

nested card、すべての主要sectionをcardにすること、独立したobjectではないlist itemをcardで包むことを避ける。

card全体がinteractiveなら、明確なprimary destinationを1つ持たせる。競合するnested actionを避け、複数controlが不可欠ならそれぞれlabelを付けたcontrolとして公開する。interactionとDOM orderの要件は[interaction-content-accessibility.md](interaction-content-accessibility.md)で扱う。

比較可能なcardにprimary destinationが1つだけあり、独立したcontrolがない場合は、card全体を1つのnative linkまたはbuttonにし、「開く」のような重複するvisible actionを省く。その選択を比較対象のcard全体で一貫させ、明確なhover／focus-visible stateとaccessible nameを保つ。後から個別controlへ戻す場合は、cardの仕事を意図的に変更したものとして記録する。

## hierarchyとdensity

  - 各local decision areaに、最も優先する次のactionを1つ定める。peer actionの重みを揃えてよいのは、選択が本当に中立な場合だけ。
  - 重要で頻繁に必要なinformationを初期表示に残す。隠すinformationが任意またはadvancedで、collapsed stateでも主要taskを支えられる場合だけ、accordion、disclosure、tabs、drill-inを使う。
  - 重要なstatus、deadline、error、primary actionを、hover、tooltip、collapsed disclosureだけに隠してはならない。
  - すべてのseparator、container、badge、emphasis treatmentには意味上の仕事が必要。
  - ページ固有のstyle分岐より、目的が明確な少数のcomponent variantを優先する。

## navigation、form、list、table

  - navigationは現在地、destination、戻り道を明確にする。同じdestinationにはrouteをまたいで同じlabelとinteractionを使う。
  - formを1つのflowとして扱う。visible label、input、constraint、help、validation、error、success、submit stateを含める。placeholder textはlabelではない。
  - listとtableはcomparison axis、alignment、row action、empty state、overflow behaviorを保つ。視覚的な新奇性よりscanningを優先する。

## responsive composition

content pressureとlayout transitionから変換を定義する。何がstack、wrap、visual reorder、disclosure化され、何がfixedのままかを決める。配置が機能しているelementは動かさない。名前付きdevice widthだけでなく、実際のbreakpointの前後と負荷の高いcontentで確認する。

visual reorderによって、誤解を招くreading orderやfocus orderを作ってはならない。順序や挙動が変わる場合は、必ずinteraction Referenceを読む。

## 状態変化の基準点

ページや主要状態で最初に認識・操作する見出し、主要操作、選択中の項目などの基準点を選ぶ。内容量・編集・エラーによる伸縮で意図せず跳ねる場合は、基準線とスクロール領域を定め、代表状態間で位置と意味上の順序、操作の到達性を確認する。レイアウト要件にない固定座標を全画面へ強制しない。
