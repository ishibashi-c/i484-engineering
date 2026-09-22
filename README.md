<div align="center">

<img src="assets/logo.png" alt="i484 Engineering" width="120">

# i484 Engineering

**Compound Engineeringを基盤に、専門知識を必要なときだけ重ねるAIコーディング環境。**

[![Build Status](https://github.com/ishibashi-c/i484-engineering/actions/workflows/ci.yml/badge.svg)](https://github.com/ishibashi-c/i484-engineering/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-39-black.svg)](docs/guides/README.md)

</div>

## 概要

**i484 Engineering** は、AI coding agentが実装手順の細部に縛られすぎず、必要な専門知識と品質基準を使いながら自律的に開発できる環境を目指すプロジェクトです。

エンジニアリングの基盤には [Compound Engineering](https://github.com/EveryInc/compound-engineering-plugin) を採用しています。planning、implementation、debugging、verification、review、Git、shipping、knowledge compoundingなど、一般的なソフトウェア開発の進め方はCompound Engineeringを正とします。

i484独自部分は、その上に**非競合な専門能力**を追加します。現在はProduct Design、構造可視化、幾何学イラストレーションを内包し、Natural JapaneseやUltraciteのような外部Quality ProviderもCEの品質工程から利用できる構成です。

```text
AI coding agent
      │
      ▼
Compound Engineering
= engineering authority
      │
      ├── i484-product-design
      ├── i484-visualize
      ├── i484-geometric-illustration
      │
      └── optional quality providers
          ├── natural-japanese
          └── Ultracite
```

## 設計原則

### 1. EngineeringはCompound Engineeringに任せる

i484は独自の第二workflowを作りません。作業分解、実装順序、検証量、review orchestration、branch / worktree / commit / PR / shippingなどはCompound EngineeringとProject固有の指示に委ねます。

Compound Engineeringとi484のengineering上の指示が競合する場合は、**Compound Engineeringを優先**します。

### 2. Skillは手順書ではなく専門能力として設計する

i484 Skillは、固定されたstate machineを増やすためのものではありません。主に次を与えます。

- 何を良い結果と判断するか
- その領域固有の制約
- 判断に必要な専門知識
- 品質基準
- 主張を支えるために必要なevidence
- 安全に失敗するための境界

実行手順そのものが正しさや安全性を構成する場合を除き、具体的な進め方はAgentとEngineering Frameworkに委ねます。

### 3. 旧i484は「守る構造」ではなく「採掘する資産」として扱う

旧`i484-workflow`、旧`i484-review`、旧`i484-core`をそのままCEへ融合していません。まずCompound Engineeringを新しいbaselineとし、旧i484から**CEに存在しない非engineering知識だけ**を再評価して移植します。

詳しい移行方針は [`MIGRATION.md`](MIGRATION.md) を参照してください。

## i484 Specialist Skills

### `i484-product-design`

プロダクトUIに対する設計判断を支えるKnowledge Skillです。

主な対象:

- UX heuristics
- information hierarchy
- composition
- component semantics
- interaction design
- accessibility
- content stress
- error prevention / recovery
- data / visual / interaction parity
- design claimとevidenceの対応

実装工程やGit操作を指揮せず、**何を良いProduct Designと判断するか**に責務を限定しています。

### `i484-visualize`

説明、構造、関係性、比較などを**単一のportable HTML artifact**として視覚化する専門Skillです。

一般的なWeb開発workflowではなく、「説明のためのartifactそのもの」が成果物である場合に使います。

### `i484-geometric-illustration`

i484独自の幾何学的なvisual languageでイラストレーションを設計・生成・評価する専門Skillです。

構図、面、余白、色、layer、series consistencyなどの視覚判断を担当し、software engineering全般はCompound Engineeringへ委ねます。

## Quality Provider

### Natural Japanese

ユーザー向け日本語を変更した場合に、日本語固有の自然さ、読みやすさ、機械的な文体を専門的に確認するQuality Providerとして利用します。

このrepositoryにはSkill本体を複製していません。利用可能な環境ではCompound Engineeringのquality gate内から適用します。

### Ultracite

JS / TS ProjectでUltraciteを採用している場合、Project固有のlint / format providerとして利用します。

Compound Engineeringは「どの段階で品質確認を行うか」を所有し、Ultraciteは「JS / TSをどうlintするか」を担当します。

## 39 Skills

i484 Engineeringには、Compound Engineering由来の36 Skillとi484独自の3 Specialist Skillがあります。

### 開発の中心

| Skill | 役割 |
| --- | --- |
| `ce-ideate` | 何に取り組む価値があるかを探索する |
| `ce-brainstorm` | 要求やProductの形を明確にする |
| `ce-plan` | 実装可能な計画へ落とし込む |
| `ce-work` | 計画を実装し、品質Gateを通して完了させる |
| `ce-compound` | 得られた知識を次の作業で再利用可能にする |

### 戦略・継続的改善

| Skill | 役割 |
| --- | --- |
| `ce-strategy` | Projectの戦略的な前提を管理する |
| `ce-product-pulse` | 利用状況・performance・errorなどを定期的に観測する |
| `ce-sweep` | 外部feedbackを継続的に取り込む |
| `ce-compound-refresh` | 蓄積されたsolution knowledgeを保守する |

### 調査・設計・改善

| Skill | 役割 |
| --- | --- |
| `ce-bakeoff` | 複数案を独立に比較する |
| `ce-pov` | Project contextに基づく判断を返す |
| `ce-explain` | 実装や設計がどう動くかを根拠付きで説明する |
| `ce-prototype` | 体験可能なthrowaway prototypeを作る |
| `ce-debug` | 症状からroot causeまで因果を追う |
| `ce-code-review` | diff / PRを構造的にreviewする |
| `ce-doc-review` | 要求・計画文書をreviewする |
| `ce-simplify-code` | 挙動を保ったまま最近の実装を整理する |
| `ce-optimize` | 測定可能な対象を改善する |
| `ce-retune` | 新しいmodelに合わせてSkill corpusを再調整する |

### i484 Specialists

| Skill | 役割 |
| --- | --- |
| `i484-product-design` | Product Design固有の判断基準を提供する |
| `i484-visualize` | portable HTMLによる構造可視化を行う |
| `i484-geometric-illustration` | i484の幾何学visual languageでイラストを設計する |

### Research / Context

| Skill | 役割 |
| --- | --- |
| `ce-riffrec-feedback-analysis` | Riffrec recordingを構造化されたfeedbackへ変換する |

### Git / Delivery

| Skill | 役割 |
| --- | --- |
| `ce-commit` | local commitを作る |
| `ce-commit-push-pr` | 変更をpushしPRまで持っていく |
| `ce-babysit-pr` | PRのreview / CIを継続監視する |
| `ce-worktree` | 作業をworktreeへ分離する |

### Autonomous Pipeline

| Skill | 役割 |
| --- | --- |
| `lfg` | planから実装・review・PR監視までを自律的に進める |

### UI / QA / Collaboration

| Skill | 役割 |
| --- | --- |
| `ce-polish` | 動作済みUIをbrowser上でpolishする |
| `ce-proof` | MarkdownをProofへpublish / pullする |
| `ce-dogfood` | branchをbrowserでQAする |
| `ce-test-browser` | current diffのE2E browser testを行う |
| `ce-test-xcode` | iOS appをsimulatorでbuild / testする |

### Workflow Utilities

| Skill | 役割 |
| --- | --- |
| `ce-noslop` | 不自然なAI文体を避けて文章を整える |
| `ce-promote` | shipped featureの告知文案を作る |
| `ce-resolve-pr-feedback` | PR feedbackを評価・修正・replyする |
| `ce-setup` | optional toolとProject configを診断・設定する |
| `ce-handoff` | session handoffを作成・再開する |
| `wtf` | 直前のメッセージや指定した内容を平易に説明するmanual-only Skill |

各Skillの詳細は [`docs/guides/`](docs/guides/README.md) を参照してください。runtime上の正本は各 `skills/<skill>/SKILL.md` です。

## 導入

### Codex App

Custom marketplaceとしてこのrepositoryを登録します。

| Field | Value |
| --- | --- |
| Source | `ishibashi-c/i484-engineering` |
| Git ref | `main` |
| Sparse paths | 空欄 |

登録後、`i484-engineering`をinstallしてCodexを再起動します。

### Codex CLI

```bash
codex plugin marketplace add ishibashi-c/i484-engineering
codex plugin add i484-engineering@i484-engineering-plugin
```

配布上のMarketplace IDは`i484-engineering-plugin`、Plugin IDは`i484-engineering`です。CE由来のSkill名（`ce-*`）はupstreamとの意味・由来を保つため変更しません。

### その他のhost

Claude Code、Cursor、Kimi、Cline、Devin、OpenCode、Piなどに対応するdistribution metadataはCompound Engineeringから継承しています。

これらはSkill本体を複製しているのではなく、各hostから同じ`skills/`を利用するための互換レイヤーです。配布上の名称・作者・repositoryはi484 Engineeringに統一し、CE由来のSkill名とengineering semanticsは維持します。

## Upstreamとの関係

このrepositoryは [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) のGitHub forkです。

```text
EveryInc/compound-engineering-plugin
              │
              │ upstream
              ▼
ishibashi-c/i484-engineering
              │
              └── i484 specialist additions
```

upstream更新時はCompound Engineeringの変更を取り込みます。同じ箇所で競合した場合はCEの新しいengineering semanticsを優先し、その上でi484固有要素が非競合に残せる場合だけ再適用します。

CE本体へのpatchを小さく保ち、i484固有の知識は原則として`i484-*` Skillやi484-owned documentへ分離することで、upstreamとのmerge conflictを抑えます。

## Attribution

Compound Engineeringを基盤としていることを明示し、upstreamのMIT Licenseとcopyright noticeを保持しています。

- Original project: [Compound Engineering](https://github.com/EveryInc/compound-engineering-plugin)
- Organization: Every Inc.
- Upstream maintainers: Kieran Klaassen / Trevin Chow
- License: MIT

詳細な由来と移植元は [`ATTRIBUTION.md`](ATTRIBUTION.md) を参照してください。

## License

MIT Licenseで公開しています。

- `Copyright (c) 2025 Every`
- `Copyright (c) 2026 ishibashi-c`

元のCompound Engineeringに対する著作権表示を保持しつつ、i484独自の追加部分についてもcopyright noticeを明記しています。詳細は [`LICENSE`](LICENSE) を参照してください。

---

i484 Engineeringは、Compound Engineeringと競争するためのframeworkではありません。**Engineeringの進め方はCEから継承し、i484はその上で専門性を追加する**ことを基本方針としています。

<!--
release-metadata compatibility contract for inherited CE tests.
a plugin of 39 skills
39 skills, grouped by i484 Engineering categories

## Skills at a glance
`ce-ideate`
`ce-brainstorm`
`ce-plan`
`ce-work`
`ce-compound`
`ce-strategy`
`ce-product-pulse`
`ce-sweep`
`ce-compound-refresh`
`ce-bakeoff`
`ce-pov`
`ce-explain`
`ce-prototype`
`ce-debug`
`ce-code-review`
`ce-doc-review`
`ce-simplify-code`
`ce-optimize`
`ce-retune`
`i484-product-design`
`i484-visualize`
`i484-geometric-illustration`
`ce-riffrec-feedback-analysis`
`ce-commit`
`ce-commit-push-pr`
`ce-babysit-pr`
`ce-worktree`
`lfg`
`ce-polish`
`ce-proof`
`ce-dogfood`
`ce-test-browser`
`ce-test-xcode`
`ce-noslop`
`ce-promote`
`ce-resolve-pr-feedback`
`ce-setup`
`ce-handoff`
`wtf`
**Learn more**
-->
