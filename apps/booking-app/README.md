# Booking App

アーキテクチャ検討会で利用したサンプルアプリケーション

## セットアップ

### Firebase（必須）

1. Firestoreの環境を用意する
1. Firebase管理画面のプロジェクトの設定から設定値を取得する
1. .envを作成し、各設定値を入力する

```.env
NEXT_PUBLIC_FIREBASE_APP_ID=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_API_KEY=""
```

### Varcelを利用する場合（optional）

事前にVercelにホストするできる状態にしておく

1. Firestoreの環境を用意する
1. Firebase管理画面のプロジェクトの設定から設定値を取得する
1. VercelのEnv設定画面でFirebaseから取得した設定値を入力する
1. env pullする

```bash
cd apps/booking-app
vc env pull
```

## 開発サーバ起動

```bash
npm run start booking-app
```
