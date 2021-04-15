# Domain

## メモ

- ドメインに関する定数の定義（xx率）
- ドメインロジックの定義


業務に関する定数定義

```typescript
const CAR_DATA = [
  { max: 10, min: 5},
  { max: 9, min: 2},
]
```

ドメインロジックは関数で定義する

```typescript
const calcXXX = (a: number, b: number): number => {
  const result = a + b;
  return result;
}

const calcYYY = (a: number, b: number): number => {
  const result = a * b;
  return result;
}
```