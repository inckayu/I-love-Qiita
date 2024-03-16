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

### Storybookの下調べ

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

### fetchした記事の型定義

`/api/v2/items`でfetchした記事オブジェクトの型定義が面倒そうだったが、[オブジェクトから型を自動生成してくれるツール](https://jvilk.com/MakeTypes/)で解決

### 今後の流れ

- 記事タイトルで記事の検索ができる
- 詳細表示画面で記事の詳細情報が見れる
- 任意のAPIキーを入力してAPIを叩く(現状は環境変数に設定したキーを用いている)
- APIキーが未入力の場合は何かしら通知する
- Recoilを用いた状態管理

以上四点の実装を最初の目標にする。これを達成したら一旦`main`にマージする。

状態管理は今まで`useProvider`を用いた実装しか経験したことがない。とりあえず最初はRecoilを用いた実装にチャレンジしてみて、厳しそうだったら一旦前者にしておく。開発期間が二週間あって割と長いので最後に余裕があったら後者に再チャレンジする。でも一旦前者で実装したのを後者に書き直すのは手間がかかりそう...

その後は、Storybook, CSS(SASS), MUIを用いてUIを作り込む。いい機会なのでSASSの構文を勉強したい。

Storybookは使ったことがないのでゼロから勉強することになる。ざっと調べた感じだと一つのコンポーネントに対して一つのStorybookファイル(`xxxx.stories.tsx`)を作り、細かいデザインを指定したりするっぽいという理解。<br>GUIでコンポーネントの挙動やPropsを確認したりできるのがメリットらしいけど今のところ面倒くさそうという印象。メリットを十分に理解できていない。

最低限の機能＆デザインの実装が終わったら

- リファクタ
- ホスティング(vercel)
- 詳細検索

の順で実装。リファクタは念入りに行う。ついでにuseEffectとかuseCallbackとかのhooksについてしっかり理解しておく。

ユーザとのチャットを基にいい感じの記事を自動で検索してくれるチャットボット機能を生成AIのAPIを用いて実装しても面白そう。でもあんまり技術的にアピールできる要素が少ない気がする。

あとはfirestoreを使って過去に検索した条件などを保存するとか。その場合はユーザが本アプリにアクセスした際にCookieに適当なIDを保存しておいて、そのIDでユーザを識別する。ただしCookieの安全な管理は正直あんまり理解できていないしネットワーク系の知識もないので、下手な実装をしてボロを出すリスクを考えたほうがいいかも。

### Recoil

インストール

```bash
yarn add recoil
```

stateディレクトリ内のxxxState.tsで状態を定義する。思ったよりシンプルで簡単そう。

state定義のファイルはどういう単位で分割するのがいいのだろう。一つのファイルにつき一つのrecoil/selectorを定義するのが良いのか、例えば記事一覧表示画面に関係するものはすべて一つのファイル内で定義するのが良いのか。
https://chat.openai.com/c/62771726-35b3-4616-87d4-4b0a46909505

とりあえず前者の方針でいく。膨らんできたらまとめる。

selectorを使うと関数のメモ化や計算処理の分離ができる。リファクタのときに念頭に置いておく。

#### 参考

https://zenn.dev/mostlove/articles/9ee8640b4d9ae9

### 正規表現

英大文字・英小文字・数字・アンダースコアのいずれかの1文字以上の繰り返しにマッチする正規表現は

```
/^\w+$/
```

このとき`^`(文字列の開始)と、`$`(文字列の終わり)をつけることで、`\w`のみで構成される文字列とマッチする。仮にこれら２つをつけないと、「3hlああ8g8s」のような文字列ともマッチする。(対象となる文字列のどこか一部に正規表現を満たす部分が存在すれば良いから)

### Storybook再考

もうちょっと調べた結果、結構便利かもしれない。ただ短期の個人開発だとあまり恩恵を受けることはできなさそう。とりあえずテストとして`Circle.tsx`を作って使い方を簡単に確認する。SASSと組み合わせて使えるかどうかなども検証。

#### 手順

`src/stories/`ディレクトリに`[コンポーネント名].tsx`と`[コンポーネント名].stories.tsx`を作成。

コンポーネントはすべて`stories`ディレクトリで定義するっぽい。

Propsなどで動的に変わる要素以外はsassファイルに定義して良さそう。

#### 参考

<https://www.youtube.com/watch?v=D52gjW9T3YM>(プライベートブラウザで開くこと)

### デザイン作成

[figma](https://www.figma.com/file/PWNYfomzX4y31fwN8jpBqH/I-love-Qiita?type=design&node-id=0%3A1&mode=design&t=8dJ9ebFsT5sUQyd1-1)でデザイン作成する。

レスポンシブ対応も後々する。優先度は低い。

まずはデザインシステム作ったあとでモックアップを作成する。

デザインシステムは[デジタル庁のデザインシステム](<https://www.figma.com/file/NCAqaM8jcWtd54ovH8TXXq/Design-System-1.4.1-(Community)>)を参考にしつつ作成したい。ここまでがっちり定義する必要はないので使う色やフォントの定義、ボタンやテキストエリアなどの基本的なUIコンポーネントのデザインが作成できれば良い。デザインのセンスはないのでAIに頼りたいところだが、webページのデザイン作成に特化したものはあるのかな...
