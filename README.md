# I love Qiita

<img alt="Static Badge" src="https://img.shields.io/badge/FE_framework-Nextjs-blue"> <img alt="Static Badge" src="https://img.shields.io/badge/language-Typescript-blue"> <img alt="Static Badge" src="https://img.shields.io/badge/language-sass-blue"> <img alt="Static Badge" src="https://img.shields.io/badge/CSS_framework-Material_UI-blue"> <img alt="Static Badge" src="https://img.shields.io/badge/license-MIT-blue">

_I love Qiita, where many seekers for knowledge meet up._

これはエンジニア向け情報共有サイトであるQiitaの記事を閲覧するアプリケーションです。記事のタイトルやタグなど好きな条件を指定して検索し、ヒットした記事一覧に表示される要約を参考にしながら好きな記事を読むことができます。

開発過程の検討事項・tips・試行錯誤は[memo.md](./memo.md)にまとめています。

## 環境

| 言語・フレームワーク | バージョン |
| -------------------- | ---------- |
| Node.js              | 20.11.1    |
| Typescript           | 5.4.2      |
| React                | 18.2.0     |
| Next.js              | 14.1.3     |
| Sass                 | 1.72.0     |
| Material UI          | 5.15.13    |

その他のライブラリのバージョンは[package.json](./package.json)または[yarn.lock](./yarn.lock)を参照してください。

## ディレクトリ構成

主要なディレクトリ・ファイルは以下の通りです。

<pre>
.
├── __test__
├── .github
├── .husky
├── .storybook
├── .vscode
├── public
      ├── memo
      ├── readme
      ├── favicon.ico
      └── favicon.svg
├── src
      ├── components
      ├── constants
      ├── functions
      ├── hooks
      ├── pages
            ├── api
            ├── _app.tsx
            ├── _document.tsx
            ├── [articleId].tsx
            └── index.tsx
      ├── state
      ├── stories
            ├── Button
            ├── DetailedArticleHeader
            ├── Divider
            ├── Footer
            ├── LinkText
            └── TextBox
      ├── styles
            ├── common
            ├── modules
            ├── globals.scss
            └── highlight.css
      ├── types
├── .env
├── .env.development
├── .env.local
├── .env.example
├── .eslintignore
├── .eslintre.json
├── .gitignore
├── .prettierrc.json
├── .stylelintrc.json
├── commitlint.config.js
├── jest.config.js
├── memo.md
├── next.config.mjs
├── package-lock.json
├── package.json
├── README.md
├── robots.txt
├── tsconfig.json
└── yarn.lock
</pre>

## 環境変数

[.env.example](./.env.example)をコピペして環境変数ファイルを作成してください。LLMのAPIは二種類ありますがアプリケーションで利用するのはどちらか一方です。[generateSummary.ts](./src/pages/api/generateSummary.ts)の`LLMs`オブジェクトに二種類とも入っているので切り替えてください。応答の速度を重視する場合はGROQ、要約の精度を重視する場合はGPT-4がおすすめです。

| 変数名                          | 役割                                                          |
| ------------------------------- | ------------------------------------------------------------- |
| QIITA_TOKEN                     | QiitaのAPIトークン                                            |
| GROQ_TOKEN                      | [GEOQ](https://wow.groq.com/)(LLM)のAPIトークン               |
| GPT4_TOKEN                      | [GPT-4](https://openai.com/blog/openai-api)(LLM)のAPIトークン |
| NEXT_PUBLIC_DEFAULT_QIITA_TOKEN | 開発環境でQiitaのAPIトークンの入力を省略(true or false)       |

## 環境構築

レポジトリをクローン

```bash
git clone git@github.com:inckayu/I-love-Qiita.git
```

yarnをインストール

```bash
npm install -g yarn
yarn init
```

ライブラリをインストール

```bash
yarn
```

commitlintを作成

```bash
touch commitlint.confing.js
```

ローカルサーバーを起動しプロジェクト立ち上げ

```bash
yarn dev
```

## ルール

### ブランチ

開発の際は原則devブランチからfeatまたはfixブランチを切ってください。

| ブランチ名        | 用途       |
| :---------------- | :--------- |
| main              | 本番環境   |
| dev               | 開発環境   |
| feat-[ブランチ名] | 新機能追加 |
| fix-[ブランチ名]  | 修正       |

#### ブランチ名

ケバブケース(ex: `feat-new-function`)

#### ｍainブランチ

devまたはfixブランチのみマージ可能。

#### devブランチ

featまたはfixブランチはマージ可能。

### git commit

`git commit`する際のメッセージは以下の形式にしてください。`commitlint.config.js`に以下の形式のみ許可するルールを設定してください。

```
:gitmoji: message
```

gitmojiは[こちら](https://gitmoji.dev/)を参照してください。
