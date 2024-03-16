開発過程の試行錯誤をここにメモしていきます

## 3/16

### nodeのアップグレード

#### 背景

yarnを使うにはnodeのバージョンが18.17.0以上である必要があった

`You are using Node.js 16.14.0. For Next.js, Node.js version >= v18.17.0 is required.`

#### 方針

nvmを使用してnodeをアップグレード

#### 手順

nvmをインストール

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

インストール検証

```bash
command -v nvm
```

インストールできていないっぽい(`nvm command not found`)のでシェルを確かめて変更を反映

```bash
echo $SHELL
source ~/.zshrc
```

安定版のnodeをインストールして設定

```bash
nvm install 20.11.1
nvm use 20.11.1
```

#### 参考

https://qiita.com/takokke/items/df01818d65a0d4b1da90

https://qiita.com/ffggss/items/94f1c4c5d311db2ec71a

### commitlintのインストール

#### 背景

開発体験向上

#### 手順

commitlintのインストール

```bash
# mac
yarn add @commitlint/{config-conventional,cli}
```

huskyのインストール

```bash
yarn husky install
```

ルートにcommitlint.config.jsを作成し、コミットメッセージのフォーマットを設定

```bash
cat > commitlint.confing.js
```

.husky/commlit-msgの内容を以下に書き換え

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/husky.sh"

yarn commitmsg
```

.husky/husky.shを以下に書き換え

```bash
省略
```

package.jsonの”scripts”に以下を追加

```json
"commitmsg": "commitlint -e $GIT_PARAMS",
```

#### その他

ワークディレクトリを書き換えずに直前のコミットを取り消す

```bash
git reset --soft HEAD^
```

#### 参考

https://zenn.dev/kalubi/articles/27fa889c338cdf
https://zenn.dev/tingtt/articles/b7482fb829ce39
https://qiita.com/shuntaro_tamura/items/06281261d893acf049ed

### Storybookのインストール

コンポーネントの挙動確認のためのツール。
<br>
デザインとかを確認したり調整したりするためのものなので、一通りアプリの骨組み作りが終わったあとで実装する。

#### 背景

開発効率向上

#### 参考

https://zenn.dev/chris_d_k/articles/a9a05e963c11cd

### Qiitaの検索機能

Qiitaでは記事を検索する際にオプションを組み合わせることで、タイトルや記事の内容・投稿日時、ユーザなどを細かく指定できる。APIを用いた記事の一覧取得においても同様にオプションを適用できる。

本アプリにおいてもすべての検索オプションに対応したい。ただしUXの観点から、使用頻度の高そうなオプションのみデフォルトで一覧表示画面から設定できるようにし、その他の細かいオプションについては「詳細な条件を設定」のようなボタンを押下してモーダルを表示する形式で実装する。

この検索条件の設定について、とりあえず`feat-home-structure`ブランチでは一覧表示画面に仮のテキストボックスを一つだけ配置しておく。モーダルの実装は行わない。

### formタグについて

フォーム作るときって必ずformタグで囲まなきゃダメだっけ？
https://chat.openai.com/share/ce301ac2-ffe0-4e09-92fc-36edb4a225d4

囲まなきゃいけないっぽいけど、詳細検索のモーダルはどうしよう。formタグ内に詳細検索モーダルのコンポーネントを配置して、なんかの変数(`isOpenDetails`みたいな)の値によってモーダルを表示するかどうか切り替えればいいかな。
