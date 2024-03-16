開発過程の試行錯誤をここにメモしていきます

## nodeのアップグレード

### 背景

yarnを使うにはnodeのバージョンが18.17.0以上である必要があった

`You are using Node.js 16.14.0. For Next.js, Node.js version >= v18.17.0 is required.`

### 方針

nvmを使用してnodeをアップグレード

### 手順

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

### 参考

https://qiita.com/takokke/items/df01818d65a0d4b1da90

https://qiita.com/ffggss/items/94f1c4c5d311db2ec71a

## commitlintのインストール

### 背景

開発体験向上

### 手順

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

### その他

ワークディレクトリを書き換えずに直前のコミットを取り消す

```bash
git reset --soft HEAD^
```

### 参考

https://zenn.dev/kalubi/articles/27fa889c338cdf
https://zenn.dev/tingtt/articles/b7482fb829ce39
https://qiita.com/shuntaro_tamura/items/06281261d893acf049ed
