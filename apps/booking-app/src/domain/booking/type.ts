/**
 * Entityを表現する
 * UIにもDBにも依存しない
 * TODO IDはどうする？
 */
export type Booking = {
  id?: string;
  name: string;
  date: Date;
};
