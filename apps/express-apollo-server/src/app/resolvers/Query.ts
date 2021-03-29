/**
 * TODO: CodeGeneratorを使って型を定義する
 */
export const Query = {
  totalPhotos: (parent: any, args: any, context: any) =>
    context.db.collection('photos').estimatedDocumentCount(),
  allPhotos: (parent: any, args: any, context: any) =>
    context.db.collection('photos').find().toArray(),
  totalUsers: (parent: any, args: any, context: any) =>
    context.db.collection('users').estimatedDocumentCount(),
  allUsers: (parent: any, args: any, context: any) =>
    context.db.collection('users').find().toArray(),
};
