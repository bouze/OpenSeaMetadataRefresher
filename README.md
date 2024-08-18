# OpenSeaMetadataRefresher

## 概要
OpenSeaのAPI「[Refresh NFT Metadata](https://docs.opensea.io/reference/refresh_nft)」を使用して、指定のスマートコントラクトの、全NFTのメタデータを更新するNode.js用スクリプト。

## 手順
- SDKを ```npx api install "@opensea/v2.0#hbhlzvrlyxk"``` でインストール
- .envファイルで下記変数を定義
  - API_KEY: OpenSeaのAPIキー
  - INTERVAL_SEC: リクエスト制限回避のためにトークンごとにデータ取得間隔をあける
- 更新したいコレクションの情報を refresher.config.json に追記
- ```node refresher.js``` で実行
