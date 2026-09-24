# Context and surface intent

Product UIを判断するとき、比較的長く保たれるProduct上の事実、Design上の関係、今回のsurfaceだけが必要とする成功条件を混同しないために使う。これはcontext fileのschemaや作成手順ではなく、利用可能なProject contextをどう読むかというDesign判断の基準である。

## 3つのcontextを分ける

### Product truth

Product truthは、visual treatmentが変わっても保たれる事実と制約である。ユーザー、job、目的、主要capability、terminology、platform、brand上の確定事項、利用可能なevidence、accessibility上の必要条件などが該当する。

明示された変更要求がない限り、Design判断の都合でProduct truthを書き換えない。実在しないproof、customer、metric、capability、constraintをDesignの空白を埋めるために発明しない。

### Design truth

Design truthは、複数のsurfaceやstateで再利用する価値があるvisual / interaction relationshipである。typographyのrole、colorのrole、spacingとdensity、geometry、component semantics、state表現、motion characterなどが該当する。

既存実装はevidenceであって、それ自体がDesign truthではない。繰り返し現れ、同じsemantic roleを安定して支え、現在のProject仕様やユーザーtaskと矛盾しないpatternをdurableな候補として扱う。単発の例外、偶発的な不整合、legacy debtを「既存だから」という理由で一般化しない。

### Surface intent

Surface intentは、今回の画面・route・artifactでユーザーが何を成功させる必要があるかを表す。Product全体のカテゴリではなく、そのsurfaceで中心になるtask、判断、理解、体験、state、actionの優先順位から決める。

Projectが`PRODUCT.md`、`DESIGN.md`、surface briefなどを持つ場合は、それぞれの責務に合う情報源として読む。存在しない場合にこのSkillが新しい管理artifactを要求または作成する必要はない。利用可能な仕様、実装、実データ、ユーザー指示から判断し、確認できないものは推測で確定しない。

## Surface intentの4つの型

型はtemplateではなく、どの品質を優先するかを決めるための判断軸である。一つのProduct内でもsurfaceごとに異なってよい。複数が関係するときは、Design判断を実際に変えるdominant intentを一つ定め、secondary intentは必要な場合だけ残す。

- **Persuasion:** ユーザーが比較、評価、選択、申込などの意思決定をする。claimの明確さ、proofの正直さ、信頼、差異、次のactionを優先する。表現力は使えるが、根拠や選択肢を雰囲気で覆わない。
- **Operation:** ユーザーが作業、管理、編集、監視、設定を完了する。scanability、予測可能性、state visibility、速度、error prevention、recoveryを優先し、routine taskをvisual演出のために遅くしない。
- **Comprehension:** ユーザーが記事、document、help、説明、データの意味を理解する。reading order、measure、heading構造、wayfinding、参照関係、長いcontentへの耐性を優先する。
- **Experience:** 作品、media、showcase、galleryなど対象そのものを体験する。artifactを主役にし、interface chromeを必要以上に競合させない。強いvisual expressionを許容しても、navigation、interaction、accessibilityを曖昧にしない。

## IntentがDesign判断を変えるところ

同じvisual techniqueでもSurface intentによって役割が変わる。

- **Composition:** Persuasion / Experienceでは焦点の強弱や非対称性が意味を持ちうる。Operation / Comprehensionでは安定した位置関係、scan、reading continuityの価値が高い。
- **Typography / color:** Persuasion / Experienceではcharacterを強く運べる。Operation / Comprehensionではroleの安定、読みやすさ、status / action / wayfindingの意味を優先する。
- **Motion:** Persuasion / Experienceでは少数の重要なmomentがvoiceを持てる。Operation / Comprehensionではfeedback、state、continuityを支え、繰り返しtaskを待たせない。
- **Density:** Operationでは比較と操作効率、Comprehensionではreading rhythm、Persuasionでは判断に必要なproof、Experienceではartifactの占有率から決める。カテゴリだけで「広い余白」や「高密度」を自動選択しない。

## Context conflictの扱い

明示された現在の要件と確定したProduct truthが矛盾する場合は、Product変更なのかUI表現の変更なのかを区別する。Design truthはProduct truthとsurfaceの主要taskに従う。既存Design patternがsurface intentを妨げる場合は、局所的にAdapt / Replaceする理由をDesign判断として示し、既存patternを守ること自体を目的にしない。

このReferenceはcontext収集、Planning、artifact作成、実装、検証、Git、review、shippingの工程を定義しない。それらは現在のengineering frameworkが所有する。
