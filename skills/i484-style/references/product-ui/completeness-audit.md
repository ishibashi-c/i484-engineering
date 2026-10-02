# Completeness audit

具体化したscreen / flow / componentについて、種類固有の要素やstateが抜けていないかを確認するときに読む。これは一般的なdesign critiqueではなく、既知のsurface categoryに対するcompleteness確認である。

## Trigger

対象が既知のscreen / flow / componentとして十分に具体化しており、要素やstateの欠落がユーザーtaskの完了、安全、回復を損ないうるならcompleteness auditが関係する。まだsurface intentや構造自体を探索している段階、または既知のcategoryへ無理に当てはめる必要がある場合はauditを先に置かない。

## External auditor

active harnessで外部Skill `checklist-design` が利用でき、対象へ直接一致するchecklistがある場合は、そのSkillの **audit** を使ってcompleteness evidenceを得る。auditのpresent / partially present / missing / not needed / can't tellという区別を、欠落の有無と重要度を考えるinputとして扱う。

`checklist-design` の **critique** は既定では使わない。hierarchy、composition、interaction、accessibility、visual coherenceなどの一般的なProduct Design判断は i484-styleのproduct-ui領域 が所有する。ユーザーがChecklist Design自身のcritiqueを明示的に求めた場合だけ、その依頼として利用できる。

Checklist上でmissingでも、ProjectのProduct truth、Design truth、surface intentに照らして不要なら追加しない。逆にchecklistにない問題でも、主要task、安全、回復を損なうならProduct Design findingとして扱える。Checklistは仕様ではなく、抜け漏れ発見のevidence sourceである。

## Failure and handoff

`checklist-design` が未導入、利用不能、または直接一致するchecklistがない場合はblockしない。i484の内蔵知識で判断を続け、checklist固有のcompletenessだけを未確認として扱う。

Auditの実行方法、browser capture、test、修正順序、Git、review、shippingはこのReferenceも外部Skillも所有しない。Compound Engineeringとactive Project指示が実行を統括する。
