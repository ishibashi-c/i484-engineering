# interaction、content、accessibility

control、navigation、form、dynamic state、DOM order、responsive reorder、content behavior、accessibilityが対象に含まれるときに読む。

## interaction contract

各interactive componentで起こり得るstateを特定する。default、該当する場合のhover、focus-visible、active、selected、disabled、loading、empty、success、error、long-contentを含める。不可能なstateを省く場合は、偶然ではなく意図的に省く。

- pointer、keyboard、touch、assistive technologyで同じaction modelを利用できるようにする。
- native interactive elementを優先する。完全なnative contractを持たない`div`や`span`でbuttonやlinkを模倣しない。
- visual layoutが変わっても、DOM orderとfocus orderを論理的に保つ。
- keyboardで到達できるactionには、見えるfocus indicatorを用意する。
- controlには安定したlabelと、十分な大きさで重ならないtargetを与える。
- icon-only controlにはaccessible nameを付け、装飾だけのiconはassistive technologyから隠す。
- hover、drag、swipe、その他のgestureで提供するactionには、keyboard、tap、clickの代替手段を用意する。
- destructive consequenceを隠したり、commitよりcancelを難しくしたりしない。
- native contextではplatform conventionを、web contextでは確立したproduct conventionを尊重する。

dialogとmenuでは、initial focus、focusをcontainするかどうか、Escapeと明示的なclose behavior、close後のfocus returnを定義する。webのmodal dialogに適合する場合はnative `<dialog>`と`showModal()`を優先できる。custom modalを使う場合は、適切な`role="dialog"`、`aria-modal="true"`、visible titleへの`aria-labelledby`、必要な説明への`aria-describedby`、背景を`inert`相当にすること、focus containment、Escape／close、focus returnを契約に含める。dialogではないpopoverやmenuにdialogの`aria-modal`やmodal用のcontainmentを誤適用せず、それぞれのsemanticsとfocus behaviorを定義する。

## content behavior

- actionまたはdestinationを説明する具体的なlabelを使う。contextだけで解決できない場合は、曖昧でgenericなcall to actionを避ける。
- truncation時も完全な意味を保つ。切り詰めたtextが装飾または重複でない限り、完全なtextまたはdestinationへ別経路を用意する。
- errorは影響を受けたinputの近くに置き、problem、impact、recovery actionを示す。loading、empty、partial-data、disabled、success、unavailable stateは意図的に定義し、互いに別のstateを装わない。
- progressive disclosureでもdiscoverability、state、keyboard operation、隠された内容の明確なsummaryを保つ。

## accessibility invariant

- 必須の意味やstateには、text、structure、icon-label、その他のcolor以外のcueを持たせる。
- custom roleより先にnative semanticsを使う。name、role、value、relationship、live updateはrenderされる内容と一致させる。
- 影響を受ける条件でcontrast、zoom、text resizing、reduced-motion behaviorを利用可能に保つ。
- responsive changeによってoverlap、clipping、操作不能なcontrol、意図しないsemantic reorder、content lossを起こさない。
- narrow widthでもcore functionalityと重要informationを保つ。taskを削除せずpresentationを変換する。
- safety-sensitiveまたはcommunity interfaceでは、人気による圧力、人のrankingを示すcue、曖昧なconsent、安心感を損なうinteraction patternを避ける。

## 対象時の[WCAG 2.2 AA最低契約](https://www.w3.org/TR/WCAG22/)

影響を受ける条件にだけ適用し、固定的なdevice matrixにはしない。通常のtextはcontrast 4.5:1以上、大きいtextは3:1以上を確認する。activeなUI componentと意味のあるgraphicのnon-textは3:1以上とし、非活性、UAが外観を定め作者が変更しない場合、または特定の表現が不可欠な場合など、適用可能な例外を明示する。text resize 200%、通常の縦スクロールは幅320 CSS px相当（縦書きは高さ256 CSS px相当）でreflowし、二次元layoutが本質的な部分などの例外を明示する。pointer inputのtargetは24×24 CSS px以上とし、spacing、equivalent、inline、UA control、essentialの例外を確認する。keyboard focusが見え、focused componentがauthor-created contentで完全には隠れないことも確認する。

## i484追加minimum（WCAG適合レベルとは別）

`prefers-reduced-motion: reduce`では過度なmotionを抑え、主要操作とstateの理解を保つ。測定または操作できない条件は`pass`にせず`unverified`と記録する。これらはこのSkillの追加minimumであり、WCAG 2.2 AAまたはAAAの達成主張に置き換えない。

## AAAまたはProject独自の追加基準

WCAG 2.2 AAAや、AAより厳しいProject基準はこの最低契約に含めない。採用する場合は、対象条件・基準・証拠を別途明示して評価する。

## 観測上の注意

source inspectionでmarkupや静的contractの事実は確認できるが、focusの可視性、clipping、visual order、interaction feedbackなど実際の表示・操作が必要な主張までは証明できない。設計判断を返すときは、どのstate・modality・failure pathがその主張を支持または反証する観測対象になるかを示し、未観測の条件を`pass`として扱わない。

実際にどのtool、test、browser、host、順序、範囲で観測するかはengineering frameworkに委ねる。
