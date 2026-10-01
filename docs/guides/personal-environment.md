# 個人用開発環境の導入書

この文書は、IshibashiCustomizeが採用した開発環境を別のPCで再構築するAIへの引き継ぎ書です。対象はmacOSのCodex環境です。i484 Engineering全利用者への必須設定ではありません。

導入する能力と目的をここで管理し、[README](../../README.md)から参照します。Skill本体、専用インストーラー、認証情報は収録しません。AIは導入先の状態と最新の公式手順を確認し、必要な設定を追加してください。既存設定や独自編集は保護してください。

確認日: 2026年10月2日。記載した版は動作を照合した際の参考値です。新規導入では対応する安定版を選び、採用した版と差分を報告してください。旧環境との完全一致が必要な場合は、以下の確認済み版を使ってください。

## 別PCでAIに渡す依頼

```text
この導入書に従い、私のCodex開発環境を構築してください。
導入先の既存設定を確認し、採用一覧の能力だけを追加してください。
設定の追加、検証、必要な文書更新まで進めてください。
本人認証は私に引き継ぎ、金銭が発生する操作は金額と継続課金の有無を報告し、実行指示を待ってください。
完了時には導入元、採用版、保存先、確認結果、未確認事項を報告してください。
```

## i484 Engineering

[ishibashi-c/i484-engineering](https://github.com/ishibashi-c/i484-engineering)を、計画・実装・検証・レビュー・Git操作・shippingの工程を担当するプラグインとして導入します。i484-product-design、i484-visualize、i484-geometric-illustrationは専門判断や成果物を担当します。各Skillの導入目的と使う条件は[READMEの採用一覧](../../README.md#39-skills)を参照してください。

CodexアプリとCLI、Gitを用意し、導入前にCLIのhelpで構文を確認してください。確認時のコマンドは次のとおりです。

```bash
codex plugin marketplace add https://github.com/ishibashi-c/i484-engineering.git
codex plugin add i484-engineering@i484-engineering-plugin
codex plugin list --json
```

既に登録済みの場合は、公式の更新手順を使ってください。確認済みプラグイン版は3.30.1、ソースcommitは`f264f908d3a72ea91b8e940aa54d917300b59d42`です。固定版を再現する場合は、marketplace追加時の`--ref`でこのcommitを指定できます。

導入後は新しいCodexセッションでSkillの公開状態を確かめてください。同じSkillの手動コピーを別の検索先へ追加しないでください。プラグイン同梱の`ui_skills`接続は本体側で管理します。

## 独立して導入する外部Skill

採用する外部Skillは次の2個です。配置先は`~/.agents/skills/`とし、Skill本体と参照ファイルを上流の原版から取得してください。ライセンスと著作権表示も保持します。yomiyasuはフォーク、独自改変、CEへの同梱を行いません。

| Skill | 導入目的と期待する効果 | 使う条件・責務の境界 | 導入元と取得対象 |
| --- | --- | --- | --- |
| yomiyasu | 不自然な日本語を、意味を保って読みやすくする | 日本語文書・UI文言・翻訳の品質確認。まとまった変更で同梱lintを実行し、CEの差分として検証する | [nanaism/yomiyasu](https://github.com/nanaism/yomiyasu)の`skills/yomiyasu/`とルートの`LICENSE` |
| ultracite | JS/TSのlint・format・checkをそろえる | JS/TSプロジェクトの品質提供元。プロジェクトへUltraciteを設定し、まとまった変更で既存の検査コマンドを使う | [haydenbleasel/ultracite](https://github.com/haydenbleasel/ultracite)の`skills/ultracite/`とルートの`LICENSE` |

確認済みソースcommitは、yomiyasuが`30ee6041c328ce21d38a7963f667e079a93d7a12`、Ultraciteが`15f7ae03fd0a40df1ebc9b373aa1f76570e4fbd7`です。上流の取得対象に変更がある場合は、現在の構成を確認してから取得してください。

CodexのSkill導入機能、または上流の公式手順で指定したSkillだけを導入してください。リポジトリ内の全Skillをまとめて追加しないでください。取得後は`SKILL.md`が参照するファイルの存在を確認します。yomiyasuの同梱lintを使う場合はPython、ローカルのMCPやJS/TS品質検査には対応するNode.js環境も必要です。

Natural Japanese、mattpocock系、superpowers系、gstackのqa、Emil Kowalski系の独立Skillは採用一覧に含めません。導入先に既存の未採用Skillがある場合は報告し、今回の導入だけを根拠に削除しないでください。

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

新規プロジェクトは`~/Workspace/Projects/`直下に作成します。永続成果物は`~/Workspace/Codex/`の`active/`、`artifacts/`、`scratch/`、`archive/`へ用途に応じて保存してください。Project固有の保存先を優先し、指定がないportable HTMLは`html-docs/i484-visualize/`へ保存します。公開名義が未定の新規成果物には`IshibashiCustomize`を使い、既存成果物の名義・ライセンス・著作権表示を保持してください。

## 導入完了の確認

プラグインの登録名と採用版、外部Skill2個の配置先と出典、MCP6接続の登録名を照合してください。新しいCodexセッションでSkillが公開され、必要な参照ファイルを読めることも確認します。可能な範囲で、yomiyasuのlint、プロジェクトのUltracite検査、MCPの読み取り操作を試してください。検証のために課金や本番データの変更を行わないでください。

報告では「導入済み」「セッションに公開」「読み込み確認」「実行確認」を区別してください。MCPは「設定あり」「認証済み」「接続確認」「実操作確認」を分けます。未認証・未実行は未確認として残し、導入したことだけで動作確認済みとしないでください。

## 更新方法

Plugin・MCP・Skillを追加・削除したり役割を変えたりする場合は、同じ作業でこの導入書の目的、期待する効果、使う条件、責務の境界、出典、確認済み版を更新してください。READMEには導入書への案内を維持します。PCごとの確認結果は`~/Workspace/Codex/active/development-environment/README.md`へ記録してください。

別の環境を変更するのは、その環境で導入・更新を依頼されたときです。この文書やi484本体の更新だけでは、各PCの外部Skill・MCP・Global指示を自動変更しません。専用の同期処理や常駐処理は設けません。
