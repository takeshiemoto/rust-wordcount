import { isLeft, isRight } from 'fp-ts/Either';
import * as t from 'io-ts';

const Params = t.type({
  id: t.number,
  title: t.string,
  author: t.string,
});

type ParamsType = t.TypeOf<typeof Params>;

function main() {
  // 何が入っているかわからない外界のデータ
  const maybeParams = {};

  // io-tsでデコードする（これでランタイムチェックが可能になる）
  const p = Params.decode(maybeParams);

  // isLeftはエラー時
  // ScalaのEitherと考え方は基本的に一緒
  if (isLeft(p)) {
    // Error
  }

  // 正しい値が入っていた場合
  // ここではpはParams型として扱うことが出来る
  if (isRight(p)) {
    // some code...
  }
}
