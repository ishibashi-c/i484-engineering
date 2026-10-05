# 個人用開発環境の導入書

この文書は、IshibashiCustomizeが採用した開発環境を別のPCで再構築するAIへの引き継ぎ書です。対象は個人用のCodex環境とGoogle Antigravity IDEです。Antigravity CLIも使う場合は、本文に記したCLI固有の保存先を選んでください。i484 Engineering全利用者への必須設定ではありません。

導入する能力と目的をここで管理し、[README](../../README.md)から参照します。Skill本体、専用インストーラー、認証情報は収録しません。AIは導入先の状態と最新の公式手順を確認し、必要な設定を追加してください。既存設定や独自編集は保護してください。

確認日: 2026年10月5日。記載した版は動作を照合した際の参考値です。新規導入では対応する安定版を選び、採用した版と差分を報告してください。旧環境との完全一致が必要な場合は、以下の確認済み版を使ってください。

## 別PCでAIに渡す依頼

```text
この導入書に従い、私が指定したCodexまたはGoogle Antigravityの開発環境を構築してください。
最初に対象アプリと利用面を確認し、対象の手順だけを実行してください。
導入先の既存設定を確認し、採用一覧の能力だけを追加してください。
設定の追加、検証、必要な文書更新まで進めてください。
本人認証は私に引き継ぎ、金銭が発生する操作は金額と継続課金の有無を報告し、実行指示を待ってください。
完了時には導入元、採用版、保存先、確認結果、未確認事項を報告してください。
```

## Codex版i484 Engineering

[ishibashi-c/i484-engineering](https://github.com/ishibashi-c/i484-engineering)を、計画・実装・検証・レビュー・Git操作・shippingの工程を担当するプラグインとして導入します。i484-styleは共通の好みと3つの内部領域で専門判断や成果物を担当します。自動適用の対象は新規UI・説明資料です。幾何学イラストは、その表現の指定時だけ使います。既存ブランドと明示指定を優先し、工程はCEに残します。各Skillの導入目的と使う条件は[READMEの採用一覧](../../README.md#37-skills)を参照してください。

CodexアプリとCLI、Gitを用意し、導入前にCLIのhelpで構文を確認してください。確認時のコマンドは次のとおりです。

```bash
codex plugin marketplace add https://github.com/ishibashi-c/i484-engineering.git
codex plugin add i484-engineering@i484-engineering-plugin
codex plugin list --json
```

既に登録済みの場合は、公式の更新手順を使ってください。2026年10月5日に確認した最新リリースは3.31.1、ソースcommitは`8e7831c81dd9afe9c57e7f29cda619b187e27692`です。固定版を再現する場合は、このリリースを指定してください。

導入後は新しいCodexセッションでSkillの公開状態を確かめてください。同じSkillの手動コピーを別の検索先へ追加しないでください。プラグイン同梱の`ui_skills`接続は本体側で管理します。

## Google Antigravity

この節はAntigravity 2.0または単体Antigravity IDEを主対象とし、2026年10月5日にGoogleの公式資料を確認しました。Codex Pluginのmarketplace登録をAntigravity用のPluginとして流用しません。i484 Engineeringの導入元は同じGitHubリポジトリですが、この環境方針では実物の設定バックアップや専用インストーラーを配らず、AIが導入先を調べて構成する手順として管理します。

### i484 EngineeringとSkill

Antigravityは`SKILL.md`を使うAgent Skills形式を読み込みます。ただし、GoogleがSkillsの仕様として説明しているfrontmatterは`name`と`description`です。i484 Engineeringの37 Skillを調べると、32個に`argument-hint`、9個に`disable-model-invocation`、4個に`allowed-tools`があります。未対応の項目を機械的に削ると、呼び出し条件やツール境界が失われます。全Skillをそのまま有効化して同等に動くとは扱わないでください。[Google Antigravity Skills](https://antigravity.google/docs/skills?app=antigravity-ide)

導入時はまず37個をステージング領域へ複製し、各Skillの追加frontmatterとCodex固有のコマンド・機能を棚卸しします。`argument-hint`は入力例の表示用として省略できます。`disable-model-invocation`と`allowed-tools`は公式Skills仕様に同等機能が示されていないため、次のSkillをそのまま自動検出対象へ登録しないでください。

| 元の指定 | 対象Skill | Antigravityでの扱い |
| --- | --- | --- |
| `disable-model-invocation` | `ce-dogfood`、`ce-polish`、`ce-product-pulse`、`ce-promote`、`ce-retune`、`ce-setup`、`ce-sweep`、`ce-test-xcode`、`wtf` | 明示呼び出しだけにする規則へ移せるか個別に確認。説明文へ「明示依頼時のみ」と書くだけでは同じ制御の保証にならない。 |
| `allowed-tools` | `ce-product-pulse`、`ce-proof`、`ce-resolve-pr-feedback`、`ce-sweep` | Antigravity側で同じツール境界を設定・検証できるまで有効化しない。一般的な権限設定をSkill単位の制限と見なさない。 |

Google Rulesの`trigger: manual`は手動で適用するルール向けで、Skillの呼び出し制御を置き換えるものではありません。明確な同等手段がないSkillは`要調整`として一覧に残し、自動実行させないでください。本文中のCodex専用処理やモデル指定もAntigravityで同じように動くとは限りません。登録したSkillについて、読み込みだけでなく必要な呼び出し経路と制約も検証し、その結果を互換性一覧に記録してください。[Google Antigravity Rules](https://antigravity.google/docs/rules/)

単体IDEの共通Skill保存先は`~/.gemini/config/skills/<skill-name>/`、プロジェクト限定なら`<workspace>/.agents/skills/<skill-name>/`です。CLIでは`~/.gemini/antigravity-cli/skills/`を使います。i484のソースチェックアウトにある`skills/`はそのまま自動検出されません。互換性を確認したSkillだけを選んだ保存先へ配置してください。要調整のSkillはステージング領域に残し、同等の呼び出し条件・ツール境界を作れた場合だけ有効化します。既存の同名Skillがある場合は出典と差分を調べ、独自編集を保護してください。配置後はAntigravityのCustomizations画面または`/skills`で一覧を確認します。

対象版を固定する場合は、確認済みのリリースタグからソースを取得してください。

```bash
git clone --depth 1 --branch i484-engineering-v3.31.1 \
  https://github.com/ishibashi-c/i484-engineering.git
```

更新時は公式リリースを確認し、採用版と取得したcommitを記録します。現在のSkillと導入先の同名Skillを比較してから更新してください。`yomiyasu`とUltraciteはi484本体のSkillへ混ぜず、次節の外部Skillとして原版を保ちます。

### 共通ルール

Antigravityは`~/.gemini/AGENTS.md`、`~/.gemini/GEMINI.md`、または`~/.gemini/config/AGENTS.md`などから個人用ルールを読み込みます。既存ファイルがある場合は上書きせず、i484の方針を統合してください。対象プロジェクトに置いた`AGENTS.md`はそのプロジェクトにも適用されます。[Google Antigravity Rules](https://antigravity.google/docs/rules/)

既存のGlobal指示に、i484 Engineeringを工程の担当とすること、i484-styleの適用条件、yomiyasuとUltraciteの役割、秘密情報と本人認証の扱い、金銭が発生する前の報告、既存変更の保護、GitHub操作の権限を反映します。Codex固有のSkill検索先、`codex`コマンド、`gpt-6-luna`の起動引数は移しません。Antigravityで利用可能なサブエージェントとモデルを調べ、限定作業と重要判断の分類だけを引き継ぎます。指定モデルが利用できない場合は親モデルで実行するか、機能がない場合は委託せずに進めてください。費用の発生する機能は料金と継続課金を確認し、実行指示を得るまで有効にしません。

### 外部Skill

採用する外部SkillはyomiyasuとUltraciteです。上流から取得したフォルダを`~/.gemini/config/skills/`へ配置します。Antigravity CLIではCLI用Global Skills保存先を使います。yomiyasuは原版を保ち、フォークや独自改変をしません。Ultracite Skillの配置だけではJS/TSのlintが有効にならないため、対象プロジェクトごとにUltraciteの公式手順でlint providerを設定してください。

### MCP

Antigravity IDEはMCP Storeと独自サーバー設定に対応します。Global設定先は`~/.gemini/config/mcp_config.json`、プロジェクト設定先は`<workspace>/.agents/mcp_config.json`です。採用済みの6接続は上の「個人設定として残すMCP」表を基準にし、CodexのTOMLをJSONの`mcpServers`へ変換します。ローカル起動型は`command`と`args`、リモート接続は`serverUrl`を使います。[Google Antigravity MCP](https://antigravity.google/docs/mcp)

```json
{
  "mcpServers": {
    "playwright": { "command": "npx", "args": ["-y", "@playwright/mcp@0.0.83"] },
    "context7": { "serverUrl": "https://mcp.context7.com/mcp" },
    "shadcn": { "command": "npx", "args": ["shadcn@4.21.0", "mcp"] },
    "vercel": { "serverUrl": "https://mcp.vercel.com" },
    "sanity": { "serverUrl": "https://mcp.sanity.io" }
  }
}
```

この例は秘密情報を必要としない接続だけを示します。`namecom`は`NAME_TOKEN`、`NAME_USERNAME`、`NAME_API_URL`を安全に渡せる方法を確認してから追加してください。トークンを文書やGit管理下のJSONへ書かないでください。OAuth同意やパスワード入力はユーザーが行います。接続設定、認証、接続確認、実操作は別々に報告します。

### 導入後の確認

CustomizationsのSkills一覧に有効化したSkillと外部Skill2個があることを確認してください。37個すべてを登録済みとみなさず、互換性一覧で`有効`と`要調整`を区別します。使い捨てのプロジェクトで`ce-plan`、`ce-work`、`i484-style`を呼び出し、想定した作業経路が動くことを確かめます。要調整Skillは、呼び出し条件やツール境界を保つ代替策の有無も調べてください。MCPは各接続の状態と安全な読み取り操作までにとどめ、本番データの変更や費用が発生する検証は行いません。

このリポジトリではルートの`AGENTS.md`に従い、テストに`bun run test`を使います。この入口はテスト前検査を実行します。macOSのCrashReporter設定は変更しません。コード変更がない環境導入では、Skillの読み込み、設定形式、MCP接続状態を確認し、未認証や未実行を成功として報告しないでください。

## 独立して導入する外部Skill

採用する外部Skillは次の2個です。配置先は`~/.agents/skills/`とし、Skill本体と参照ファイルを上流の原版から取得してください。ライセンスと著作権表示も保持します。yomiyasuはフォーク、独自改変、CEへの同梱を行いません。

| Skill | 導入目的と期待する効果 | 使う条件・責務の境界 | 導入元と取得対象 |
| --- | --- | --- | --- |
| yomiyasu | 不自然な日本語を、意味を保って読みやすくする | 日本語文書・UI文言・翻訳の品質確認。まとまった変更で同梱lintを実行し、CEの差分として検証する | [nanaism/yomiyasu](https://github.com/nanaism/yomiyasu)の`skills/yomiyasu/`とルートの`LICENSE` |
| ultracite | JS/TSのlint・format・checkをそろえる | JS/TSプロジェクトの品質提供元。プロジェクトへUltraciteを設定し、まとまった変更で既存の検査コマンドを使う | [haydenbleasel/ultracite](https://github.com/haydenbleasel/ultracite)の`skills/ultracite/`とルートの`LICENSE` |

確認済みソースcommitは、yomiyasuが`30ee6041c328ce21d38a7963f667e079a93d7a12`、Ultraciteが`15f7ae03fd0a40df1ebc9b373aa1f76570e4fbd7`です。上流の取得対象に変更がある場合は、現在の構成を確認してから取得してください。

CodexのSkill導入機能、または上流の公式手順で指定したSkillだけを導入してください。リポジトリ内の全Skillをまとめて追加しないでください。取得後は`SKILL.md`が参照するファイルの存在を確認します。yomiyasuの同梱lintを使う場合はPython、ローカルのMCPやJS/TS品質検査には対応するNode.js環境も必要です。

Natural Japanese、mattpocock系、superpowers系、gstackのqa、Emil Kowalski系の独立Skillは採用一覧に含めません。導入先に既存の未採用Skillがある場合は報告し、今回の導入だけを根拠に削除しないでください。

### プロセステストの安全とネイティブ委託モデル

i484 Engineeringの通常テスト入口は、worker起動前にテスト内の危険なシグナル送信を検査します。対象はrepository内のTypeScript、JavaScript、Pythonのテストファイルと、明示されたテストファイルです。共通ルールは [`tests/helpers/process-safety.ts`](../../tests/helpers/process-safety.ts)、事前検査は [`scripts/check-process-test-safety.ts`](../../scripts/check-process-test-safety.ts) です。macOSではクラッシュ通知につながるシグナルと未登録のシグナル検査を理由付きで除外し、`SIGINT`、`SIGTERM`、`SIGHUP`の確認を残します。Linuxの既存`SIGQUIT`検査も維持します。

事前検査は完全な言語解析器ではなく、曖昧な構文は手動確認が必要です。JSX・TSXにシグナルAPI名がある場合は、文字列内の例示や安全なシグナルも含めて通常の入口で停止し、手動確認を求めます。`bun test`を直接呼ぶと事前検査を通りません。実行文字列、生成コード、計算されたメソッド別名、`tests/`外からのimportは完全には追跡できず、外部から指定するdirectoryやglobの列挙も検査対象として保証しません。これらは手動で確認してください。この仕組みが扱う対象は、検出可能なシグナル送信と終了処理の確認です。Pythonのあらゆる異常終了を防ぐ保証はなく、macOSのCrashReporter設定も変更しません。

ネイティブsubagentの委託判断は、依頼を受ける各CE Skillが行います。範囲、入力、合否基準が起動前に定まった限定作業では、利用可能性と親モデル以下の能力を確認したうえでLunaを先に指定します。個人環境のCodex設定例は次のとおりです。

```yaml
native_subagent_models:
  codex:
    model: gpt-6-luna
    effort: medium
```

設定階層はcheckout-localの`config.local.yaml`、teamの`config.yaml`、Skillの既定値の順です。map内のhost entryは全体を置換し、空のmapは設定上書きを無効にします。Global指示と実行中のユーザー指示が優先です。利用host、指定引数、親以下の能力を確認できない場合は親を継承し、その理由を記録してください。

正しさ・security・adversarial review、全体architecture、research全体の解釈、最終統合判断は親モデルが担当します。短い作業を節約だけのために委託せず、明示された実装engineやreview targetも置き換えません。起動前の引数修正は1回までです。容量待ちは枠が空くまで待ちます。利用不可や合否不合格ではworkerを停止し、成果物と差分を親へ渡して引き継ぎます。別providerや有料APIへ自動で切り替えません。

既存の実行記録へ作業、分類、選択理由、要求モデル・推論設定、起動結果、成果の検証、提供モデルの証拠、fallback理由を記録します。モデル指定の成功は実際の提供モデルの確認を意味せず、提供モデルが不明でも再実行の理由にはなりません。成果の合格は別に検証します。費用の実測がない場合、削減効果を断定せず、Luna指定件数・親への引き継ぎ件数・不合格理由を報告してください。

実行時の共通契約は、[ce-work](../../skills/ce-work/references/native-model-policy.md)、[ce-code-review](../../skills/ce-code-review/references/native-model-policy.md)、[ce-doc-review](../../skills/ce-doc-review/references/native-model-policy.md)、[ce-explain](../../skills/ce-explain/references/native-model-policy.md)、[ce-plan](../../skills/ce-plan/references/native-model-policy.md)、[ce-simplify-code](../../skills/ce-simplify-code/references/native-model-policy.md)の各参照文書に詳細があります。

## 個人設定として残すMCP

次の6接続を導入します。接続設定の登録と、認証・通信・実操作の成功は別々に確認してください。

| 接続名 | 目的・使う条件 | 設定例・出典 |
| --- | --- | --- |
| playwright | CEによるブラウザ検証で、ブラウザ操作が必要な場合 | `npx -y @playwright/mcp@0.0.83`。[Microsoft Playwright MCP](https://github.com/microsoft/playwright-mcp) |
| context7 | 利用するライブラリの現行ドキュメントを取得する場合 | `https://mcp.context7.com/mcp`。[Context7](https://github.com/upstash/context7) |
| shadcn | shadcn/uiのコンポーネントやregistryを利用する場合 | `npx shadcn@4.21.0 mcp`。[公式MCP説明](https://ui.shadcn.com/docs/mcp) |
| vercel | 指定したVercelプロジェクトの状態確認や操作 | `https://mcp.vercel.com`。[公式MCP説明](https://vercel.com/docs/mcp) |
| sanity | 指定したSanityプロジェクトのコンテンツや構成を扱う場合 | `https://mcp.sanity.io`。[公式MCP説明](https://www.sanity.io/docs/ai/mcp-server) |
| namecom | 指定したドメインの状態確認や管理 | `npx -y namecom-mcp@1.2.1`。[namecom-mcp](https://www.npmjs.com/package/namecom-mcp) |

ローカル起動型3接続の版は、確認済み環境の参考値です。新しい版を採用する場合は、コマンド互換性と接続結果を確認してください。CodexのMCP設定へ既存項目を保持したまま追加します。

```toml
[mcp_servers.playwright]
command = "npx"
args = ["-y", "@playwright/mcp@0.0.83"]

[mcp_servers.context7]
url = "https://mcp.context7.com/mcp"

[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@4.21.0", "mcp"]

[mcp_servers.vercel]
url = "https://mcp.vercel.com"

[mcp_servers.sanity]
url = "https://mcp.sanity.io"

[mcp_servers.namecom]
command = "npx"
args = ["-y", "namecom-mcp@1.2.1"]
env_vars = ["NAME_TOKEN", "NAME_USERNAME", "NAME_API_URL"]
```

namecomには上記3個の環境変数を用意してください。値はPC側の安全な設定で渡し、文書・コード・commit・ログには残しません。OAuth同意やパスワード入力はユーザーが行います。設定を調べるときも、秘密値を含む設定ファイル全体を出力しないでください。

## Codexが提供する能力との区別

システムSkill、computer-use、実行用ツール、公式サービスプラグインとOAuth接続はCodex側で管理します。会話に表示されているだけの能力は、個人環境への採用済みとは扱いません。公式プラグインは、ユーザーが対象サービスの利用を指定したときに必要なものを選んでください。

UI Skills MCPはi484本体の外部知識取得に使います。個人設定の6接続へ重複登録しません。Checklist Designも必須の独立Skillには含めません。汎用レビュー・debug・QAの既定経路はCEとし、外部Skillは明示指定か不足する専門知識を補う場合に限ります。

## Global指示と保存先

導入先のGlobal指示へ次の方針を反映してください。既存指示との相違は確認し、独自設定を一括で上書きしないでください。この方針は個人環境用です。

開発工程ではi484 Engineeringを使い、各専門Skillの責務を分けます。日本語品質はyomiyasu、JS/TS品質はUltraciteを担当とし、修正後の検証はCEの工程で行います。lintはまとまった変更で実行してください。

依頼の完了に必要なcommit・push・公開・deploy・PR作成・mergeは、対象と差分を明確にし、必要な検証、プロジェクト固有の手順、ツールの承認要件を満たして実行できます。購入、課金プラン変更、有料リソース作成は、対象・金額または料金体系・継続課金の有無を先に報告し、実行指示を得てください。既に許可された対象・金額・期間は再確認しません。

本人認証はユーザーへ任せ、秘密情報を記録しないでください。GitHubの既定アカウントは`ishibashi-c`です。別アカウントや認証失敗を理由に勝手に切り替えないでください。既存の未commit変更を保護し、依頼範囲外の破壊、force push、履歴改変へ委託範囲を広げないでください。

新規プロジェクトは`~/Workspace/Projects/`直下に作成します。永続成果物は`~/Workspace/Codex/`の`active/`、`artifacts/`、`scratch/`、`archive/`へ用途に応じて保存してください。Project固有の保存先を優先し、指定がないportable HTMLは`html-docs/i484-style/communication/`へ保存します。公開名義が未定の新規成果物には`IshibashiCustomize`を使い、既存成果物の名義・ライセンス・著作権表示を保持してください。

## 導入完了の確認

Codexではプラグインの登録名と採用版、新しい会話でのSkill公開を確認してください。Antigravityでは選んだIDEまたはCLIのSkill保存先とSkills一覧を確認します。どちらも外部Skill2個の配置先と出典、MCP6接続の登録名を照合し、必要な参照ファイルを読み込めることを確かめます。具体的なi484-style適用条件は[i484-styleガイド](i484-style.md)を参照してください。可能な範囲で、yomiyasuのlint、プロジェクトのUltracite検査、MCPの読み取り操作を試してください。検証のために課金や本番データの変更を行わないでください。

報告では「導入済み」「セッションに公開」「読み込み確認」「実行確認」を区別してください。MCPは「設定あり」「認証済み」「接続確認」「実操作確認」を分けます。未認証・未実行は未確認として残し、導入したことだけで動作確認済みとしないでください。

## 更新方法

Plugin・MCP・Skillを追加・削除したり役割を変えたりする場合は、同じ作業でこの導入書の目的、期待する効果、使う条件、責務の境界、出典、確認済み版を更新してください。READMEには導入書への案内を維持します。PCごとの確認結果は`~/Workspace/Codex/active/development-environment/README.md`へ記録してください。

別の環境を変更するのは、その環境で導入・更新を依頼されたときです。この文書やi484本体の更新だけでは、各PCの外部Skill・MCP・Global指示を自動変更しません。専用の同期処理や常駐処理は設けません。
