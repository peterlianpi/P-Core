
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model LessonBook
 * 
 */
export type LessonBook = $Result.DefaultSelection<Prisma.$LessonBookPayload>
/**
 * Model StudentCourse
 * 
 */
export type StudentCourse = $Result.DefaultSelection<Prisma.$StudentCoursePayload>
/**
 * Model CourseStatusLog
 * 
 */
export type CourseStatusLog = $Result.DefaultSelection<Prisma.$CourseStatusLogPayload>
/**
 * Model LessonProgress
 * 
 */
export type LessonProgress = $Result.DefaultSelection<Prisma.$LessonProgressPayload>
/**
 * Model Purchase
 * 
 */
export type Purchase = $Result.DefaultSelection<Prisma.$PurchasePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const CourseStatus: {
  ENROLLED: 'ENROLLED',
  PAUSED: 'PAUSED',
  RESUMED: 'RESUMED',
  FINISHED: 'FINISHED',
  CANCELLED: 'CANCELLED'
};

export type CourseStatus = (typeof CourseStatus)[keyof typeof CourseStatus]


export const PurchaseType: {
  MONTHLY_FEE: 'MONTHLY_FEE',
  LESSON_BOOK: 'LESSON_BOOK',
  OTHER: 'OTHER'
};

export type PurchaseType = (typeof PurchaseType)[keyof typeof PurchaseType]


export const PaymentMethod: {
  CASH: 'CASH',
  BANK: 'BANK',
  ONLINE: 'ONLINE',
  TRANSFER: 'TRANSFER'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]

}

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type CourseStatus = $Enums.CourseStatus

export const CourseStatus: typeof $Enums.CourseStatus

export type PurchaseType = $Enums.PurchaseType

export const PurchaseType: typeof $Enums.PurchaseType

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Students
 * const students = await prisma.student.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Students
   * const students = await prisma.student.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lessonBook`: Exposes CRUD operations for the **LessonBook** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LessonBooks
    * const lessonBooks = await prisma.lessonBook.findMany()
    * ```
    */
  get lessonBook(): Prisma.LessonBookDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.studentCourse`: Exposes CRUD operations for the **StudentCourse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentCourses
    * const studentCourses = await prisma.studentCourse.findMany()
    * ```
    */
  get studentCourse(): Prisma.StudentCourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.courseStatusLog`: Exposes CRUD operations for the **CourseStatusLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CourseStatusLogs
    * const courseStatusLogs = await prisma.courseStatusLog.findMany()
    * ```
    */
  get courseStatusLog(): Prisma.CourseStatusLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lessonProgress`: Exposes CRUD operations for the **LessonProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LessonProgresses
    * const lessonProgresses = await prisma.lessonProgress.findMany()
    * ```
    */
  get lessonProgress(): Prisma.LessonProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.purchase`: Exposes CRUD operations for the **Purchase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Purchases
    * const purchases = await prisma.purchase.findMany()
    * ```
    */
  get purchase(): Prisma.PurchaseDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Student: 'Student',
    Course: 'Course',
    LessonBook: 'LessonBook',
    StudentCourse: 'StudentCourse',
    CourseStatusLog: 'CourseStatusLog',
    LessonProgress: 'LessonProgress',
    Purchase: 'Purchase'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "student" | "course" | "lessonBook" | "studentCourse" | "courseStatusLog" | "lessonProgress" | "purchase"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      LessonBook: {
        payload: Prisma.$LessonBookPayload<ExtArgs>
        fields: Prisma.LessonBookFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LessonBookFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonBookPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LessonBookFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonBookPayload>
          }
          findFirst: {
            args: Prisma.LessonBookFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonBookPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LessonBookFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonBookPayload>
          }
          findMany: {
            args: Prisma.LessonBookFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonBookPayload>[]
          }
          create: {
            args: Prisma.LessonBookCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonBookPayload>
          }
          createMany: {
            args: Prisma.LessonBookCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LessonBookCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonBookPayload>[]
          }
          delete: {
            args: Prisma.LessonBookDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonBookPayload>
          }
          update: {
            args: Prisma.LessonBookUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonBookPayload>
          }
          deleteMany: {
            args: Prisma.LessonBookDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LessonBookUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LessonBookUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonBookPayload>[]
          }
          upsert: {
            args: Prisma.LessonBookUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonBookPayload>
          }
          aggregate: {
            args: Prisma.LessonBookAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLessonBook>
          }
          groupBy: {
            args: Prisma.LessonBookGroupByArgs<ExtArgs>
            result: $Utils.Optional<LessonBookGroupByOutputType>[]
          }
          count: {
            args: Prisma.LessonBookCountArgs<ExtArgs>
            result: $Utils.Optional<LessonBookCountAggregateOutputType> | number
          }
        }
      }
      StudentCourse: {
        payload: Prisma.$StudentCoursePayload<ExtArgs>
        fields: Prisma.StudentCourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentCourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentCoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentCourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentCoursePayload>
          }
          findFirst: {
            args: Prisma.StudentCourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentCoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentCourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentCoursePayload>
          }
          findMany: {
            args: Prisma.StudentCourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentCoursePayload>[]
          }
          create: {
            args: Prisma.StudentCourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentCoursePayload>
          }
          createMany: {
            args: Prisma.StudentCourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentCoursePayload>[]
          }
          delete: {
            args: Prisma.StudentCourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentCoursePayload>
          }
          update: {
            args: Prisma.StudentCourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentCoursePayload>
          }
          deleteMany: {
            args: Prisma.StudentCourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentCourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentCourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentCoursePayload>[]
          }
          upsert: {
            args: Prisma.StudentCourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentCoursePayload>
          }
          aggregate: {
            args: Prisma.StudentCourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudentCourse>
          }
          groupBy: {
            args: Prisma.StudentCourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentCourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCourseCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCourseCountAggregateOutputType> | number
          }
        }
      }
      CourseStatusLog: {
        payload: Prisma.$CourseStatusLogPayload<ExtArgs>
        fields: Prisma.CourseStatusLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseStatusLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseStatusLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseStatusLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseStatusLogPayload>
          }
          findFirst: {
            args: Prisma.CourseStatusLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseStatusLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseStatusLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseStatusLogPayload>
          }
          findMany: {
            args: Prisma.CourseStatusLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseStatusLogPayload>[]
          }
          create: {
            args: Prisma.CourseStatusLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseStatusLogPayload>
          }
          createMany: {
            args: Prisma.CourseStatusLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseStatusLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseStatusLogPayload>[]
          }
          delete: {
            args: Prisma.CourseStatusLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseStatusLogPayload>
          }
          update: {
            args: Prisma.CourseStatusLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseStatusLogPayload>
          }
          deleteMany: {
            args: Prisma.CourseStatusLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseStatusLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseStatusLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseStatusLogPayload>[]
          }
          upsert: {
            args: Prisma.CourseStatusLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseStatusLogPayload>
          }
          aggregate: {
            args: Prisma.CourseStatusLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourseStatusLog>
          }
          groupBy: {
            args: Prisma.CourseStatusLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseStatusLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseStatusLogCountArgs<ExtArgs>
            result: $Utils.Optional<CourseStatusLogCountAggregateOutputType> | number
          }
        }
      }
      LessonProgress: {
        payload: Prisma.$LessonProgressPayload<ExtArgs>
        fields: Prisma.LessonProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LessonProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LessonProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>
          }
          findFirst: {
            args: Prisma.LessonProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LessonProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>
          }
          findMany: {
            args: Prisma.LessonProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>[]
          }
          create: {
            args: Prisma.LessonProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>
          }
          createMany: {
            args: Prisma.LessonProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LessonProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>[]
          }
          delete: {
            args: Prisma.LessonProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>
          }
          update: {
            args: Prisma.LessonProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>
          }
          deleteMany: {
            args: Prisma.LessonProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LessonProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LessonProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>[]
          }
          upsert: {
            args: Prisma.LessonProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>
          }
          aggregate: {
            args: Prisma.LessonProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLessonProgress>
          }
          groupBy: {
            args: Prisma.LessonProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<LessonProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.LessonProgressCountArgs<ExtArgs>
            result: $Utils.Optional<LessonProgressCountAggregateOutputType> | number
          }
        }
      }
      Purchase: {
        payload: Prisma.$PurchasePayload<ExtArgs>
        fields: Prisma.PurchaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PurchaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PurchaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          findFirst: {
            args: Prisma.PurchaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PurchaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          findMany: {
            args: Prisma.PurchaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>[]
          }
          create: {
            args: Prisma.PurchaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          createMany: {
            args: Prisma.PurchaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PurchaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>[]
          }
          delete: {
            args: Prisma.PurchaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          update: {
            args: Prisma.PurchaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          deleteMany: {
            args: Prisma.PurchaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PurchaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PurchaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>[]
          }
          upsert: {
            args: Prisma.PurchaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          aggregate: {
            args: Prisma.PurchaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePurchase>
          }
          groupBy: {
            args: Prisma.PurchaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<PurchaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.PurchaseCountArgs<ExtArgs>
            result: $Utils.Optional<PurchaseCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    student?: StudentOmit
    course?: CourseOmit
    lessonBook?: LessonBookOmit
    studentCourse?: StudentCourseOmit
    courseStatusLog?: CourseStatusLogOmit
    lessonProgress?: LessonProgressOmit
    purchase?: PurchaseOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    courses: number
    payments: number
    progress: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | StudentCountOutputTypeCountCoursesArgs
    payments?: boolean | StudentCountOutputTypeCountPaymentsArgs
    progress?: boolean | StudentCountOutputTypeCountProgressArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentCourseWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonProgressWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    lessonBooks: number
    students: number
    payments: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lessonBooks?: boolean | CourseCountOutputTypeCountLessonBooksArgs
    students?: boolean | CourseCountOutputTypeCountStudentsArgs
    payments?: boolean | CourseCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountLessonBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonBookWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentCourseWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseWhereInput
  }


  /**
   * Count Type LessonBookCountOutputType
   */

  export type LessonBookCountOutputType = {
    progress: number
  }

  export type LessonBookCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    progress?: boolean | LessonBookCountOutputTypeCountProgressArgs
  }

  // Custom InputTypes
  /**
   * LessonBookCountOutputType without action
   */
  export type LessonBookCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonBookCountOutputType
     */
    select?: LessonBookCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LessonBookCountOutputType without action
   */
  export type LessonBookCountOutputTypeCountProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonProgressWhereInput
  }


  /**
   * Count Type StudentCourseCountOutputType
   */

  export type StudentCourseCountOutputType = {
    statusLogs: number
  }

  export type StudentCourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statusLogs?: boolean | StudentCourseCountOutputTypeCountStatusLogsArgs
  }

  // Custom InputTypes
  /**
   * StudentCourseCountOutputType without action
   */
  export type StudentCourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourseCountOutputType
     */
    select?: StudentCourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCourseCountOutputType without action
   */
  export type StudentCourseCountOutputTypeCountStatusLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseStatusLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentMinAggregateOutputType = {
    id: string | null
    name: string | null
    birthDate: Date | null
    gender: $Enums.Gender | null
    phone: string | null
    address: string | null
    email: string | null
    guardian: string | null
    joinedAt: Date | null
    orgId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    birthDate: Date | null
    gender: $Enums.Gender | null
    phone: string | null
    address: string | null
    email: string | null
    guardian: string | null
    joinedAt: Date | null
    orgId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    name: number
    birthDate: number
    gender: number
    phone: number
    address: number
    email: number
    guardian: number
    joinedAt: number
    orgId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentMinAggregateInputType = {
    id?: true
    name?: true
    birthDate?: true
    gender?: true
    phone?: true
    address?: true
    email?: true
    guardian?: true
    joinedAt?: true
    orgId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    name?: true
    birthDate?: true
    gender?: true
    phone?: true
    address?: true
    email?: true
    guardian?: true
    joinedAt?: true
    orgId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    name?: true
    birthDate?: true
    gender?: true
    phone?: true
    address?: true
    email?: true
    guardian?: true
    joinedAt?: true
    orgId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: string
    name: string
    birthDate: Date | null
    gender: $Enums.Gender | null
    phone: string | null
    address: string | null
    email: string | null
    guardian: string | null
    joinedAt: Date
    orgId: string
    createdAt: Date
    updatedAt: Date
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthDate?: boolean
    gender?: boolean
    phone?: boolean
    address?: boolean
    email?: boolean
    guardian?: boolean
    joinedAt?: boolean
    orgId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    courses?: boolean | Student$coursesArgs<ExtArgs>
    payments?: boolean | Student$paymentsArgs<ExtArgs>
    progress?: boolean | Student$progressArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthDate?: boolean
    gender?: boolean
    phone?: boolean
    address?: boolean
    email?: boolean
    guardian?: boolean
    joinedAt?: boolean
    orgId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthDate?: boolean
    gender?: boolean
    phone?: boolean
    address?: boolean
    email?: boolean
    guardian?: boolean
    joinedAt?: boolean
    orgId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    name?: boolean
    birthDate?: boolean
    gender?: boolean
    phone?: boolean
    address?: boolean
    email?: boolean
    guardian?: boolean
    joinedAt?: boolean
    orgId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "birthDate" | "gender" | "phone" | "address" | "email" | "guardian" | "joinedAt" | "orgId" | "createdAt" | "updatedAt", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | Student$coursesArgs<ExtArgs>
    payments?: boolean | Student$paymentsArgs<ExtArgs>
    progress?: boolean | Student$progressArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StudentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      courses: Prisma.$StudentCoursePayload<ExtArgs>[]
      payments: Prisma.$PurchasePayload<ExtArgs>[]
      progress: Prisma.$LessonProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      birthDate: Date | null
      gender: $Enums.Gender | null
      phone: string | null
      address: string | null
      email: string | null
      guardian: string | null
      joinedAt: Date
      orgId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students and returns the data updated in the database.
     * @param {StudentUpdateManyAndReturnArgs} args - Arguments to update many Students.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends Student$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Student$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentCoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Student$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Student$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    progress<T extends Student$progressArgs<ExtArgs> = {}>(args?: Subset<T, Student$progressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'String'>
    readonly name: FieldRef<"Student", 'String'>
    readonly birthDate: FieldRef<"Student", 'DateTime'>
    readonly gender: FieldRef<"Student", 'Gender'>
    readonly phone: FieldRef<"Student", 'String'>
    readonly address: FieldRef<"Student", 'String'>
    readonly email: FieldRef<"Student", 'String'>
    readonly guardian: FieldRef<"Student", 'String'>
    readonly joinedAt: FieldRef<"Student", 'DateTime'>
    readonly orgId: FieldRef<"Student", 'String'>
    readonly createdAt: FieldRef<"Student", 'DateTime'>
    readonly updatedAt: FieldRef<"Student", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student updateManyAndReturn
   */
  export type StudentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student.courses
   */
  export type Student$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourse
     */
    select?: StudentCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentCourse
     */
    omit?: StudentCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentCourseInclude<ExtArgs> | null
    where?: StudentCourseWhereInput
    orderBy?: StudentCourseOrderByWithRelationInput | StudentCourseOrderByWithRelationInput[]
    cursor?: StudentCourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentCourseScalarFieldEnum | StudentCourseScalarFieldEnum[]
  }

  /**
   * Student.payments
   */
  export type Student$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    where?: PurchaseWhereInput
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    cursor?: PurchaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Student.progress
   */
  export type Student$progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    where?: LessonProgressWhereInput
    orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[]
    cursor?: LessonProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    level: string | null
    orgId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    level: string | null
    orgId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    name: number
    description: number
    level: number
    orgId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CourseMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    level?: true
    orgId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    level?: true
    orgId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    level?: true
    orgId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: string
    name: string
    description: string | null
    level: string | null
    orgId: string
    createdAt: Date
    updatedAt: Date
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    level?: boolean
    orgId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lessonBooks?: boolean | Course$lessonBooksArgs<ExtArgs>
    students?: boolean | Course$studentsArgs<ExtArgs>
    payments?: boolean | Course$paymentsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    level?: boolean
    orgId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["course"]>

  export type CourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    level?: boolean
    orgId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    level?: boolean
    orgId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "level" | "orgId" | "createdAt" | "updatedAt", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lessonBooks?: boolean | Course$lessonBooksArgs<ExtArgs>
    students?: boolean | Course$studentsArgs<ExtArgs>
    payments?: boolean | Course$paymentsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      lessonBooks: Prisma.$LessonBookPayload<ExtArgs>[]
      students: Prisma.$StudentCoursePayload<ExtArgs>[]
      payments: Prisma.$PurchasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      level: string | null
      orgId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lessonBooks<T extends Course$lessonBooksArgs<ExtArgs> = {}>(args?: Subset<T, Course$lessonBooksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonBookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    students<T extends Course$studentsArgs<ExtArgs> = {}>(args?: Subset<T, Course$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentCoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Course$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Course$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'String'>
    readonly name: FieldRef<"Course", 'String'>
    readonly description: FieldRef<"Course", 'String'>
    readonly level: FieldRef<"Course", 'String'>
    readonly orgId: FieldRef<"Course", 'String'>
    readonly createdAt: FieldRef<"Course", 'DateTime'>
    readonly updatedAt: FieldRef<"Course", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course updateManyAndReturn
   */
  export type CourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.lessonBooks
   */
  export type Course$lessonBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonBook
     */
    select?: LessonBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonBook
     */
    omit?: LessonBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonBookInclude<ExtArgs> | null
    where?: LessonBookWhereInput
    orderBy?: LessonBookOrderByWithRelationInput | LessonBookOrderByWithRelationInput[]
    cursor?: LessonBookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LessonBookScalarFieldEnum | LessonBookScalarFieldEnum[]
  }

  /**
   * Course.students
   */
  export type Course$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourse
     */
    select?: StudentCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentCourse
     */
    omit?: StudentCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentCourseInclude<ExtArgs> | null
    where?: StudentCourseWhereInput
    orderBy?: StudentCourseOrderByWithRelationInput | StudentCourseOrderByWithRelationInput[]
    cursor?: StudentCourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentCourseScalarFieldEnum | StudentCourseScalarFieldEnum[]
  }

  /**
   * Course.payments
   */
  export type Course$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    where?: PurchaseWhereInput
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    cursor?: PurchaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model LessonBook
   */

  export type AggregateLessonBook = {
    _count: LessonBookCountAggregateOutputType | null
    _avg: LessonBookAvgAggregateOutputType | null
    _sum: LessonBookSumAggregateOutputType | null
    _min: LessonBookMinAggregateOutputType | null
    _max: LessonBookMaxAggregateOutputType | null
  }

  export type LessonBookAvgAggregateOutputType = {
    price: number | null
  }

  export type LessonBookSumAggregateOutputType = {
    price: number | null
  }

  export type LessonBookMinAggregateOutputType = {
    id: string | null
    title: string | null
    author: string | null
    price: number | null
    courseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LessonBookMaxAggregateOutputType = {
    id: string | null
    title: string | null
    author: string | null
    price: number | null
    courseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LessonBookCountAggregateOutputType = {
    id: number
    title: number
    author: number
    price: number
    courseId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LessonBookAvgAggregateInputType = {
    price?: true
  }

  export type LessonBookSumAggregateInputType = {
    price?: true
  }

  export type LessonBookMinAggregateInputType = {
    id?: true
    title?: true
    author?: true
    price?: true
    courseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LessonBookMaxAggregateInputType = {
    id?: true
    title?: true
    author?: true
    price?: true
    courseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LessonBookCountAggregateInputType = {
    id?: true
    title?: true
    author?: true
    price?: true
    courseId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LessonBookAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LessonBook to aggregate.
     */
    where?: LessonBookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonBooks to fetch.
     */
    orderBy?: LessonBookOrderByWithRelationInput | LessonBookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LessonBookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonBooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonBooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LessonBooks
    **/
    _count?: true | LessonBookCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LessonBookAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LessonBookSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LessonBookMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LessonBookMaxAggregateInputType
  }

  export type GetLessonBookAggregateType<T extends LessonBookAggregateArgs> = {
        [P in keyof T & keyof AggregateLessonBook]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLessonBook[P]>
      : GetScalarType<T[P], AggregateLessonBook[P]>
  }




  export type LessonBookGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonBookWhereInput
    orderBy?: LessonBookOrderByWithAggregationInput | LessonBookOrderByWithAggregationInput[]
    by: LessonBookScalarFieldEnum[] | LessonBookScalarFieldEnum
    having?: LessonBookScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LessonBookCountAggregateInputType | true
    _avg?: LessonBookAvgAggregateInputType
    _sum?: LessonBookSumAggregateInputType
    _min?: LessonBookMinAggregateInputType
    _max?: LessonBookMaxAggregateInputType
  }

  export type LessonBookGroupByOutputType = {
    id: string
    title: string
    author: string | null
    price: number
    courseId: string
    createdAt: Date
    updatedAt: Date
    _count: LessonBookCountAggregateOutputType | null
    _avg: LessonBookAvgAggregateOutputType | null
    _sum: LessonBookSumAggregateOutputType | null
    _min: LessonBookMinAggregateOutputType | null
    _max: LessonBookMaxAggregateOutputType | null
  }

  type GetLessonBookGroupByPayload<T extends LessonBookGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LessonBookGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LessonBookGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LessonBookGroupByOutputType[P]>
            : GetScalarType<T[P], LessonBookGroupByOutputType[P]>
        }
      >
    >


  export type LessonBookSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    price?: boolean
    courseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    progress?: boolean | LessonBook$progressArgs<ExtArgs>
    _count?: boolean | LessonBookCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lessonBook"]>

  export type LessonBookSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    price?: boolean
    courseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lessonBook"]>

  export type LessonBookSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    price?: boolean
    courseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lessonBook"]>

  export type LessonBookSelectScalar = {
    id?: boolean
    title?: boolean
    author?: boolean
    price?: boolean
    courseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LessonBookOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "author" | "price" | "courseId" | "createdAt" | "updatedAt", ExtArgs["result"]["lessonBook"]>
  export type LessonBookInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    progress?: boolean | LessonBook$progressArgs<ExtArgs>
    _count?: boolean | LessonBookCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LessonBookIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type LessonBookIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $LessonBookPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LessonBook"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>
      progress: Prisma.$LessonProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      author: string | null
      price: number
      courseId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lessonBook"]>
    composites: {}
  }

  type LessonBookGetPayload<S extends boolean | null | undefined | LessonBookDefaultArgs> = $Result.GetResult<Prisma.$LessonBookPayload, S>

  type LessonBookCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LessonBookFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LessonBookCountAggregateInputType | true
    }

  export interface LessonBookDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LessonBook'], meta: { name: 'LessonBook' } }
    /**
     * Find zero or one LessonBook that matches the filter.
     * @param {LessonBookFindUniqueArgs} args - Arguments to find a LessonBook
     * @example
     * // Get one LessonBook
     * const lessonBook = await prisma.lessonBook.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LessonBookFindUniqueArgs>(args: SelectSubset<T, LessonBookFindUniqueArgs<ExtArgs>>): Prisma__LessonBookClient<$Result.GetResult<Prisma.$LessonBookPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LessonBook that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LessonBookFindUniqueOrThrowArgs} args - Arguments to find a LessonBook
     * @example
     * // Get one LessonBook
     * const lessonBook = await prisma.lessonBook.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LessonBookFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonBookFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonBookClient<$Result.GetResult<Prisma.$LessonBookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LessonBook that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonBookFindFirstArgs} args - Arguments to find a LessonBook
     * @example
     * // Get one LessonBook
     * const lessonBook = await prisma.lessonBook.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LessonBookFindFirstArgs>(args?: SelectSubset<T, LessonBookFindFirstArgs<ExtArgs>>): Prisma__LessonBookClient<$Result.GetResult<Prisma.$LessonBookPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LessonBook that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonBookFindFirstOrThrowArgs} args - Arguments to find a LessonBook
     * @example
     * // Get one LessonBook
     * const lessonBook = await prisma.lessonBook.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LessonBookFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonBookFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonBookClient<$Result.GetResult<Prisma.$LessonBookPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LessonBooks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonBookFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LessonBooks
     * const lessonBooks = await prisma.lessonBook.findMany()
     * 
     * // Get first 10 LessonBooks
     * const lessonBooks = await prisma.lessonBook.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lessonBookWithIdOnly = await prisma.lessonBook.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LessonBookFindManyArgs>(args?: SelectSubset<T, LessonBookFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonBookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LessonBook.
     * @param {LessonBookCreateArgs} args - Arguments to create a LessonBook.
     * @example
     * // Create one LessonBook
     * const LessonBook = await prisma.lessonBook.create({
     *   data: {
     *     // ... data to create a LessonBook
     *   }
     * })
     * 
     */
    create<T extends LessonBookCreateArgs>(args: SelectSubset<T, LessonBookCreateArgs<ExtArgs>>): Prisma__LessonBookClient<$Result.GetResult<Prisma.$LessonBookPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LessonBooks.
     * @param {LessonBookCreateManyArgs} args - Arguments to create many LessonBooks.
     * @example
     * // Create many LessonBooks
     * const lessonBook = await prisma.lessonBook.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LessonBookCreateManyArgs>(args?: SelectSubset<T, LessonBookCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LessonBooks and returns the data saved in the database.
     * @param {LessonBookCreateManyAndReturnArgs} args - Arguments to create many LessonBooks.
     * @example
     * // Create many LessonBooks
     * const lessonBook = await prisma.lessonBook.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LessonBooks and only return the `id`
     * const lessonBookWithIdOnly = await prisma.lessonBook.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LessonBookCreateManyAndReturnArgs>(args?: SelectSubset<T, LessonBookCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonBookPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LessonBook.
     * @param {LessonBookDeleteArgs} args - Arguments to delete one LessonBook.
     * @example
     * // Delete one LessonBook
     * const LessonBook = await prisma.lessonBook.delete({
     *   where: {
     *     // ... filter to delete one LessonBook
     *   }
     * })
     * 
     */
    delete<T extends LessonBookDeleteArgs>(args: SelectSubset<T, LessonBookDeleteArgs<ExtArgs>>): Prisma__LessonBookClient<$Result.GetResult<Prisma.$LessonBookPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LessonBook.
     * @param {LessonBookUpdateArgs} args - Arguments to update one LessonBook.
     * @example
     * // Update one LessonBook
     * const lessonBook = await prisma.lessonBook.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LessonBookUpdateArgs>(args: SelectSubset<T, LessonBookUpdateArgs<ExtArgs>>): Prisma__LessonBookClient<$Result.GetResult<Prisma.$LessonBookPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LessonBooks.
     * @param {LessonBookDeleteManyArgs} args - Arguments to filter LessonBooks to delete.
     * @example
     * // Delete a few LessonBooks
     * const { count } = await prisma.lessonBook.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LessonBookDeleteManyArgs>(args?: SelectSubset<T, LessonBookDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LessonBooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonBookUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LessonBooks
     * const lessonBook = await prisma.lessonBook.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LessonBookUpdateManyArgs>(args: SelectSubset<T, LessonBookUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LessonBooks and returns the data updated in the database.
     * @param {LessonBookUpdateManyAndReturnArgs} args - Arguments to update many LessonBooks.
     * @example
     * // Update many LessonBooks
     * const lessonBook = await prisma.lessonBook.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LessonBooks and only return the `id`
     * const lessonBookWithIdOnly = await prisma.lessonBook.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LessonBookUpdateManyAndReturnArgs>(args: SelectSubset<T, LessonBookUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonBookPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LessonBook.
     * @param {LessonBookUpsertArgs} args - Arguments to update or create a LessonBook.
     * @example
     * // Update or create a LessonBook
     * const lessonBook = await prisma.lessonBook.upsert({
     *   create: {
     *     // ... data to create a LessonBook
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LessonBook we want to update
     *   }
     * })
     */
    upsert<T extends LessonBookUpsertArgs>(args: SelectSubset<T, LessonBookUpsertArgs<ExtArgs>>): Prisma__LessonBookClient<$Result.GetResult<Prisma.$LessonBookPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LessonBooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonBookCountArgs} args - Arguments to filter LessonBooks to count.
     * @example
     * // Count the number of LessonBooks
     * const count = await prisma.lessonBook.count({
     *   where: {
     *     // ... the filter for the LessonBooks we want to count
     *   }
     * })
    **/
    count<T extends LessonBookCountArgs>(
      args?: Subset<T, LessonBookCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LessonBookCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LessonBook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonBookAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LessonBookAggregateArgs>(args: Subset<T, LessonBookAggregateArgs>): Prisma.PrismaPromise<GetLessonBookAggregateType<T>>

    /**
     * Group by LessonBook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonBookGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LessonBookGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LessonBookGroupByArgs['orderBy'] }
        : { orderBy?: LessonBookGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LessonBookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonBookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LessonBook model
   */
  readonly fields: LessonBookFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LessonBook.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LessonBookClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    progress<T extends LessonBook$progressArgs<ExtArgs> = {}>(args?: Subset<T, LessonBook$progressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LessonBook model
   */
  interface LessonBookFieldRefs {
    readonly id: FieldRef<"LessonBook", 'String'>
    readonly title: FieldRef<"LessonBook", 'String'>
    readonly author: FieldRef<"LessonBook", 'String'>
    readonly price: FieldRef<"LessonBook", 'Float'>
    readonly courseId: FieldRef<"LessonBook", 'String'>
    readonly createdAt: FieldRef<"LessonBook", 'DateTime'>
    readonly updatedAt: FieldRef<"LessonBook", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LessonBook findUnique
   */
  export type LessonBookFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonBook
     */
    select?: LessonBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonBook
     */
    omit?: LessonBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonBookInclude<ExtArgs> | null
    /**
     * Filter, which LessonBook to fetch.
     */
    where: LessonBookWhereUniqueInput
  }

  /**
   * LessonBook findUniqueOrThrow
   */
  export type LessonBookFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonBook
     */
    select?: LessonBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonBook
     */
    omit?: LessonBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonBookInclude<ExtArgs> | null
    /**
     * Filter, which LessonBook to fetch.
     */
    where: LessonBookWhereUniqueInput
  }

  /**
   * LessonBook findFirst
   */
  export type LessonBookFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonBook
     */
    select?: LessonBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonBook
     */
    omit?: LessonBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonBookInclude<ExtArgs> | null
    /**
     * Filter, which LessonBook to fetch.
     */
    where?: LessonBookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonBooks to fetch.
     */
    orderBy?: LessonBookOrderByWithRelationInput | LessonBookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LessonBooks.
     */
    cursor?: LessonBookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonBooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonBooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LessonBooks.
     */
    distinct?: LessonBookScalarFieldEnum | LessonBookScalarFieldEnum[]
  }

  /**
   * LessonBook findFirstOrThrow
   */
  export type LessonBookFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonBook
     */
    select?: LessonBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonBook
     */
    omit?: LessonBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonBookInclude<ExtArgs> | null
    /**
     * Filter, which LessonBook to fetch.
     */
    where?: LessonBookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonBooks to fetch.
     */
    orderBy?: LessonBookOrderByWithRelationInput | LessonBookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LessonBooks.
     */
    cursor?: LessonBookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonBooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonBooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LessonBooks.
     */
    distinct?: LessonBookScalarFieldEnum | LessonBookScalarFieldEnum[]
  }

  /**
   * LessonBook findMany
   */
  export type LessonBookFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonBook
     */
    select?: LessonBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonBook
     */
    omit?: LessonBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonBookInclude<ExtArgs> | null
    /**
     * Filter, which LessonBooks to fetch.
     */
    where?: LessonBookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonBooks to fetch.
     */
    orderBy?: LessonBookOrderByWithRelationInput | LessonBookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LessonBooks.
     */
    cursor?: LessonBookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonBooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonBooks.
     */
    skip?: number
    distinct?: LessonBookScalarFieldEnum | LessonBookScalarFieldEnum[]
  }

  /**
   * LessonBook create
   */
  export type LessonBookCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonBook
     */
    select?: LessonBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonBook
     */
    omit?: LessonBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonBookInclude<ExtArgs> | null
    /**
     * The data needed to create a LessonBook.
     */
    data: XOR<LessonBookCreateInput, LessonBookUncheckedCreateInput>
  }

  /**
   * LessonBook createMany
   */
  export type LessonBookCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LessonBooks.
     */
    data: LessonBookCreateManyInput | LessonBookCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LessonBook createManyAndReturn
   */
  export type LessonBookCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonBook
     */
    select?: LessonBookSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LessonBook
     */
    omit?: LessonBookOmit<ExtArgs> | null
    /**
     * The data used to create many LessonBooks.
     */
    data: LessonBookCreateManyInput | LessonBookCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonBookIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LessonBook update
   */
  export type LessonBookUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonBook
     */
    select?: LessonBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonBook
     */
    omit?: LessonBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonBookInclude<ExtArgs> | null
    /**
     * The data needed to update a LessonBook.
     */
    data: XOR<LessonBookUpdateInput, LessonBookUncheckedUpdateInput>
    /**
     * Choose, which LessonBook to update.
     */
    where: LessonBookWhereUniqueInput
  }

  /**
   * LessonBook updateMany
   */
  export type LessonBookUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LessonBooks.
     */
    data: XOR<LessonBookUpdateManyMutationInput, LessonBookUncheckedUpdateManyInput>
    /**
     * Filter which LessonBooks to update
     */
    where?: LessonBookWhereInput
    /**
     * Limit how many LessonBooks to update.
     */
    limit?: number
  }

  /**
   * LessonBook updateManyAndReturn
   */
  export type LessonBookUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonBook
     */
    select?: LessonBookSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LessonBook
     */
    omit?: LessonBookOmit<ExtArgs> | null
    /**
     * The data used to update LessonBooks.
     */
    data: XOR<LessonBookUpdateManyMutationInput, LessonBookUncheckedUpdateManyInput>
    /**
     * Filter which LessonBooks to update
     */
    where?: LessonBookWhereInput
    /**
     * Limit how many LessonBooks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonBookIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LessonBook upsert
   */
  export type LessonBookUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonBook
     */
    select?: LessonBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonBook
     */
    omit?: LessonBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonBookInclude<ExtArgs> | null
    /**
     * The filter to search for the LessonBook to update in case it exists.
     */
    where: LessonBookWhereUniqueInput
    /**
     * In case the LessonBook found by the `where` argument doesn't exist, create a new LessonBook with this data.
     */
    create: XOR<LessonBookCreateInput, LessonBookUncheckedCreateInput>
    /**
     * In case the LessonBook was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LessonBookUpdateInput, LessonBookUncheckedUpdateInput>
  }

  /**
   * LessonBook delete
   */
  export type LessonBookDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonBook
     */
    select?: LessonBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonBook
     */
    omit?: LessonBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonBookInclude<ExtArgs> | null
    /**
     * Filter which LessonBook to delete.
     */
    where: LessonBookWhereUniqueInput
  }

  /**
   * LessonBook deleteMany
   */
  export type LessonBookDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LessonBooks to delete
     */
    where?: LessonBookWhereInput
    /**
     * Limit how many LessonBooks to delete.
     */
    limit?: number
  }

  /**
   * LessonBook.progress
   */
  export type LessonBook$progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    where?: LessonProgressWhereInput
    orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[]
    cursor?: LessonProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[]
  }

  /**
   * LessonBook without action
   */
  export type LessonBookDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonBook
     */
    select?: LessonBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonBook
     */
    omit?: LessonBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonBookInclude<ExtArgs> | null
  }


  /**
   * Model StudentCourse
   */

  export type AggregateStudentCourse = {
    _count: StudentCourseCountAggregateOutputType | null
    _min: StudentCourseMinAggregateOutputType | null
    _max: StudentCourseMaxAggregateOutputType | null
  }

  export type StudentCourseMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    courseId: string | null
    enrolledAt: Date | null
    status: $Enums.CourseStatus | null
  }

  export type StudentCourseMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    courseId: string | null
    enrolledAt: Date | null
    status: $Enums.CourseStatus | null
  }

  export type StudentCourseCountAggregateOutputType = {
    id: number
    studentId: number
    courseId: number
    enrolledAt: number
    status: number
    _all: number
  }


  export type StudentCourseMinAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    enrolledAt?: true
    status?: true
  }

  export type StudentCourseMaxAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    enrolledAt?: true
    status?: true
  }

  export type StudentCourseCountAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    enrolledAt?: true
    status?: true
    _all?: true
  }

  export type StudentCourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentCourse to aggregate.
     */
    where?: StudentCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentCourses to fetch.
     */
    orderBy?: StudentCourseOrderByWithRelationInput | StudentCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentCourses
    **/
    _count?: true | StudentCourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentCourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentCourseMaxAggregateInputType
  }

  export type GetStudentCourseAggregateType<T extends StudentCourseAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentCourse[P]>
      : GetScalarType<T[P], AggregateStudentCourse[P]>
  }




  export type StudentCourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentCourseWhereInput
    orderBy?: StudentCourseOrderByWithAggregationInput | StudentCourseOrderByWithAggregationInput[]
    by: StudentCourseScalarFieldEnum[] | StudentCourseScalarFieldEnum
    having?: StudentCourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCourseCountAggregateInputType | true
    _min?: StudentCourseMinAggregateInputType
    _max?: StudentCourseMaxAggregateInputType
  }

  export type StudentCourseGroupByOutputType = {
    id: string
    studentId: string
    courseId: string
    enrolledAt: Date
    status: $Enums.CourseStatus
    _count: StudentCourseCountAggregateOutputType | null
    _min: StudentCourseMinAggregateOutputType | null
    _max: StudentCourseMaxAggregateOutputType | null
  }

  type GetStudentCourseGroupByPayload<T extends StudentCourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentCourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentCourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentCourseGroupByOutputType[P]>
            : GetScalarType<T[P], StudentCourseGroupByOutputType[P]>
        }
      >
    >


  export type StudentCourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    enrolledAt?: boolean
    status?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    statusLogs?: boolean | StudentCourse$statusLogsArgs<ExtArgs>
    _count?: boolean | StudentCourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentCourse"]>

  export type StudentCourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    enrolledAt?: boolean
    status?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentCourse"]>

  export type StudentCourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    enrolledAt?: boolean
    status?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentCourse"]>

  export type StudentCourseSelectScalar = {
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    enrolledAt?: boolean
    status?: boolean
  }

  export type StudentCourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "courseId" | "enrolledAt" | "status", ExtArgs["result"]["studentCourse"]>
  export type StudentCourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    statusLogs?: boolean | StudentCourse$statusLogsArgs<ExtArgs>
    _count?: boolean | StudentCourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentCourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type StudentCourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $StudentCoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentCourse"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      course: Prisma.$CoursePayload<ExtArgs>
      statusLogs: Prisma.$CourseStatusLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      courseId: string
      enrolledAt: Date
      status: $Enums.CourseStatus
    }, ExtArgs["result"]["studentCourse"]>
    composites: {}
  }

  type StudentCourseGetPayload<S extends boolean | null | undefined | StudentCourseDefaultArgs> = $Result.GetResult<Prisma.$StudentCoursePayload, S>

  type StudentCourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentCourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCourseCountAggregateInputType | true
    }

  export interface StudentCourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentCourse'], meta: { name: 'StudentCourse' } }
    /**
     * Find zero or one StudentCourse that matches the filter.
     * @param {StudentCourseFindUniqueArgs} args - Arguments to find a StudentCourse
     * @example
     * // Get one StudentCourse
     * const studentCourse = await prisma.studentCourse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentCourseFindUniqueArgs>(args: SelectSubset<T, StudentCourseFindUniqueArgs<ExtArgs>>): Prisma__StudentCourseClient<$Result.GetResult<Prisma.$StudentCoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StudentCourse that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentCourseFindUniqueOrThrowArgs} args - Arguments to find a StudentCourse
     * @example
     * // Get one StudentCourse
     * const studentCourse = await prisma.studentCourse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentCourseFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentCourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentCourseClient<$Result.GetResult<Prisma.$StudentCoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentCourse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCourseFindFirstArgs} args - Arguments to find a StudentCourse
     * @example
     * // Get one StudentCourse
     * const studentCourse = await prisma.studentCourse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentCourseFindFirstArgs>(args?: SelectSubset<T, StudentCourseFindFirstArgs<ExtArgs>>): Prisma__StudentCourseClient<$Result.GetResult<Prisma.$StudentCoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentCourse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCourseFindFirstOrThrowArgs} args - Arguments to find a StudentCourse
     * @example
     * // Get one StudentCourse
     * const studentCourse = await prisma.studentCourse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentCourseFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentCourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentCourseClient<$Result.GetResult<Prisma.$StudentCoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StudentCourses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentCourses
     * const studentCourses = await prisma.studentCourse.findMany()
     * 
     * // Get first 10 StudentCourses
     * const studentCourses = await prisma.studentCourse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentCourseWithIdOnly = await prisma.studentCourse.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentCourseFindManyArgs>(args?: SelectSubset<T, StudentCourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentCoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StudentCourse.
     * @param {StudentCourseCreateArgs} args - Arguments to create a StudentCourse.
     * @example
     * // Create one StudentCourse
     * const StudentCourse = await prisma.studentCourse.create({
     *   data: {
     *     // ... data to create a StudentCourse
     *   }
     * })
     * 
     */
    create<T extends StudentCourseCreateArgs>(args: SelectSubset<T, StudentCourseCreateArgs<ExtArgs>>): Prisma__StudentCourseClient<$Result.GetResult<Prisma.$StudentCoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StudentCourses.
     * @param {StudentCourseCreateManyArgs} args - Arguments to create many StudentCourses.
     * @example
     * // Create many StudentCourses
     * const studentCourse = await prisma.studentCourse.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCourseCreateManyArgs>(args?: SelectSubset<T, StudentCourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudentCourses and returns the data saved in the database.
     * @param {StudentCourseCreateManyAndReturnArgs} args - Arguments to create many StudentCourses.
     * @example
     * // Create many StudentCourses
     * const studentCourse = await prisma.studentCourse.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudentCourses and only return the `id`
     * const studentCourseWithIdOnly = await prisma.studentCourse.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCourseCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentCoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StudentCourse.
     * @param {StudentCourseDeleteArgs} args - Arguments to delete one StudentCourse.
     * @example
     * // Delete one StudentCourse
     * const StudentCourse = await prisma.studentCourse.delete({
     *   where: {
     *     // ... filter to delete one StudentCourse
     *   }
     * })
     * 
     */
    delete<T extends StudentCourseDeleteArgs>(args: SelectSubset<T, StudentCourseDeleteArgs<ExtArgs>>): Prisma__StudentCourseClient<$Result.GetResult<Prisma.$StudentCoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StudentCourse.
     * @param {StudentCourseUpdateArgs} args - Arguments to update one StudentCourse.
     * @example
     * // Update one StudentCourse
     * const studentCourse = await prisma.studentCourse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentCourseUpdateArgs>(args: SelectSubset<T, StudentCourseUpdateArgs<ExtArgs>>): Prisma__StudentCourseClient<$Result.GetResult<Prisma.$StudentCoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StudentCourses.
     * @param {StudentCourseDeleteManyArgs} args - Arguments to filter StudentCourses to delete.
     * @example
     * // Delete a few StudentCourses
     * const { count } = await prisma.studentCourse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentCourseDeleteManyArgs>(args?: SelectSubset<T, StudentCourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentCourses
     * const studentCourse = await prisma.studentCourse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentCourseUpdateManyArgs>(args: SelectSubset<T, StudentCourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentCourses and returns the data updated in the database.
     * @param {StudentCourseUpdateManyAndReturnArgs} args - Arguments to update many StudentCourses.
     * @example
     * // Update many StudentCourses
     * const studentCourse = await prisma.studentCourse.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StudentCourses and only return the `id`
     * const studentCourseWithIdOnly = await prisma.studentCourse.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentCourseUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentCourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentCoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StudentCourse.
     * @param {StudentCourseUpsertArgs} args - Arguments to update or create a StudentCourse.
     * @example
     * // Update or create a StudentCourse
     * const studentCourse = await prisma.studentCourse.upsert({
     *   create: {
     *     // ... data to create a StudentCourse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentCourse we want to update
     *   }
     * })
     */
    upsert<T extends StudentCourseUpsertArgs>(args: SelectSubset<T, StudentCourseUpsertArgs<ExtArgs>>): Prisma__StudentCourseClient<$Result.GetResult<Prisma.$StudentCoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StudentCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCourseCountArgs} args - Arguments to filter StudentCourses to count.
     * @example
     * // Count the number of StudentCourses
     * const count = await prisma.studentCourse.count({
     *   where: {
     *     // ... the filter for the StudentCourses we want to count
     *   }
     * })
    **/
    count<T extends StudentCourseCountArgs>(
      args?: Subset<T, StudentCourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentCourse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentCourseAggregateArgs>(args: Subset<T, StudentCourseAggregateArgs>): Prisma.PrismaPromise<GetStudentCourseAggregateType<T>>

    /**
     * Group by StudentCourse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentCourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentCourseGroupByArgs['orderBy'] }
        : { orderBy?: StudentCourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentCourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentCourse model
   */
  readonly fields: StudentCourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentCourse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentCourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    statusLogs<T extends StudentCourse$statusLogsArgs<ExtArgs> = {}>(args?: Subset<T, StudentCourse$statusLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseStatusLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StudentCourse model
   */
  interface StudentCourseFieldRefs {
    readonly id: FieldRef<"StudentCourse", 'String'>
    readonly studentId: FieldRef<"StudentCourse", 'String'>
    readonly courseId: FieldRef<"StudentCourse", 'String'>
    readonly enrolledAt: FieldRef<"StudentCourse", 'DateTime'>
    readonly status: FieldRef<"StudentCourse", 'CourseStatus'>
  }
    

  // Custom InputTypes
  /**
   * StudentCourse findUnique
   */
  export type StudentCourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourse
     */
    select?: StudentCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentCourse
     */
    omit?: StudentCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentCourseInclude<ExtArgs> | null
    /**
     * Filter, which StudentCourse to fetch.
     */
    where: StudentCourseWhereUniqueInput
  }

  /**
   * StudentCourse findUniqueOrThrow
   */
  export type StudentCourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourse
     */
    select?: StudentCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentCourse
     */
    omit?: StudentCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentCourseInclude<ExtArgs> | null
    /**
     * Filter, which StudentCourse to fetch.
     */
    where: StudentCourseWhereUniqueInput
  }

  /**
   * StudentCourse findFirst
   */
  export type StudentCourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourse
     */
    select?: StudentCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentCourse
     */
    omit?: StudentCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentCourseInclude<ExtArgs> | null
    /**
     * Filter, which StudentCourse to fetch.
     */
    where?: StudentCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentCourses to fetch.
     */
    orderBy?: StudentCourseOrderByWithRelationInput | StudentCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentCourses.
     */
    cursor?: StudentCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentCourses.
     */
    distinct?: StudentCourseScalarFieldEnum | StudentCourseScalarFieldEnum[]
  }

  /**
   * StudentCourse findFirstOrThrow
   */
  export type StudentCourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourse
     */
    select?: StudentCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentCourse
     */
    omit?: StudentCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentCourseInclude<ExtArgs> | null
    /**
     * Filter, which StudentCourse to fetch.
     */
    where?: StudentCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentCourses to fetch.
     */
    orderBy?: StudentCourseOrderByWithRelationInput | StudentCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentCourses.
     */
    cursor?: StudentCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentCourses.
     */
    distinct?: StudentCourseScalarFieldEnum | StudentCourseScalarFieldEnum[]
  }

  /**
   * StudentCourse findMany
   */
  export type StudentCourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourse
     */
    select?: StudentCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentCourse
     */
    omit?: StudentCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentCourseInclude<ExtArgs> | null
    /**
     * Filter, which StudentCourses to fetch.
     */
    where?: StudentCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentCourses to fetch.
     */
    orderBy?: StudentCourseOrderByWithRelationInput | StudentCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentCourses.
     */
    cursor?: StudentCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentCourses.
     */
    skip?: number
    distinct?: StudentCourseScalarFieldEnum | StudentCourseScalarFieldEnum[]
  }

  /**
   * StudentCourse create
   */
  export type StudentCourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourse
     */
    select?: StudentCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentCourse
     */
    omit?: StudentCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentCourseInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentCourse.
     */
    data: XOR<StudentCourseCreateInput, StudentCourseUncheckedCreateInput>
  }

  /**
   * StudentCourse createMany
   */
  export type StudentCourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentCourses.
     */
    data: StudentCourseCreateManyInput | StudentCourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StudentCourse createManyAndReturn
   */
  export type StudentCourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourse
     */
    select?: StudentCourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentCourse
     */
    omit?: StudentCourseOmit<ExtArgs> | null
    /**
     * The data used to create many StudentCourses.
     */
    data: StudentCourseCreateManyInput | StudentCourseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentCourseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentCourse update
   */
  export type StudentCourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourse
     */
    select?: StudentCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentCourse
     */
    omit?: StudentCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentCourseInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentCourse.
     */
    data: XOR<StudentCourseUpdateInput, StudentCourseUncheckedUpdateInput>
    /**
     * Choose, which StudentCourse to update.
     */
    where: StudentCourseWhereUniqueInput
  }

  /**
   * StudentCourse updateMany
   */
  export type StudentCourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentCourses.
     */
    data: XOR<StudentCourseUpdateManyMutationInput, StudentCourseUncheckedUpdateManyInput>
    /**
     * Filter which StudentCourses to update
     */
    where?: StudentCourseWhereInput
    /**
     * Limit how many StudentCourses to update.
     */
    limit?: number
  }

  /**
   * StudentCourse updateManyAndReturn
   */
  export type StudentCourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourse
     */
    select?: StudentCourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentCourse
     */
    omit?: StudentCourseOmit<ExtArgs> | null
    /**
     * The data used to update StudentCourses.
     */
    data: XOR<StudentCourseUpdateManyMutationInput, StudentCourseUncheckedUpdateManyInput>
    /**
     * Filter which StudentCourses to update
     */
    where?: StudentCourseWhereInput
    /**
     * Limit how many StudentCourses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentCourseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentCourse upsert
   */
  export type StudentCourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourse
     */
    select?: StudentCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentCourse
     */
    omit?: StudentCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentCourseInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentCourse to update in case it exists.
     */
    where: StudentCourseWhereUniqueInput
    /**
     * In case the StudentCourse found by the `where` argument doesn't exist, create a new StudentCourse with this data.
     */
    create: XOR<StudentCourseCreateInput, StudentCourseUncheckedCreateInput>
    /**
     * In case the StudentCourse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentCourseUpdateInput, StudentCourseUncheckedUpdateInput>
  }

  /**
   * StudentCourse delete
   */
  export type StudentCourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourse
     */
    select?: StudentCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentCourse
     */
    omit?: StudentCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentCourseInclude<ExtArgs> | null
    /**
     * Filter which StudentCourse to delete.
     */
    where: StudentCourseWhereUniqueInput
  }

  /**
   * StudentCourse deleteMany
   */
  export type StudentCourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentCourses to delete
     */
    where?: StudentCourseWhereInput
    /**
     * Limit how many StudentCourses to delete.
     */
    limit?: number
  }

  /**
   * StudentCourse.statusLogs
   */
  export type StudentCourse$statusLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseStatusLog
     */
    select?: CourseStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseStatusLog
     */
    omit?: CourseStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseStatusLogInclude<ExtArgs> | null
    where?: CourseStatusLogWhereInput
    orderBy?: CourseStatusLogOrderByWithRelationInput | CourseStatusLogOrderByWithRelationInput[]
    cursor?: CourseStatusLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseStatusLogScalarFieldEnum | CourseStatusLogScalarFieldEnum[]
  }

  /**
   * StudentCourse without action
   */
  export type StudentCourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCourse
     */
    select?: StudentCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentCourse
     */
    omit?: StudentCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentCourseInclude<ExtArgs> | null
  }


  /**
   * Model CourseStatusLog
   */

  export type AggregateCourseStatusLog = {
    _count: CourseStatusLogCountAggregateOutputType | null
    _min: CourseStatusLogMinAggregateOutputType | null
    _max: CourseStatusLogMaxAggregateOutputType | null
  }

  export type CourseStatusLogMinAggregateOutputType = {
    id: string | null
    studentCourseId: string | null
    status: $Enums.CourseStatus | null
    changedAt: Date | null
    note: string | null
  }

  export type CourseStatusLogMaxAggregateOutputType = {
    id: string | null
    studentCourseId: string | null
    status: $Enums.CourseStatus | null
    changedAt: Date | null
    note: string | null
  }

  export type CourseStatusLogCountAggregateOutputType = {
    id: number
    studentCourseId: number
    status: number
    changedAt: number
    note: number
    _all: number
  }


  export type CourseStatusLogMinAggregateInputType = {
    id?: true
    studentCourseId?: true
    status?: true
    changedAt?: true
    note?: true
  }

  export type CourseStatusLogMaxAggregateInputType = {
    id?: true
    studentCourseId?: true
    status?: true
    changedAt?: true
    note?: true
  }

  export type CourseStatusLogCountAggregateInputType = {
    id?: true
    studentCourseId?: true
    status?: true
    changedAt?: true
    note?: true
    _all?: true
  }

  export type CourseStatusLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseStatusLog to aggregate.
     */
    where?: CourseStatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseStatusLogs to fetch.
     */
    orderBy?: CourseStatusLogOrderByWithRelationInput | CourseStatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseStatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseStatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseStatusLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CourseStatusLogs
    **/
    _count?: true | CourseStatusLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseStatusLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseStatusLogMaxAggregateInputType
  }

  export type GetCourseStatusLogAggregateType<T extends CourseStatusLogAggregateArgs> = {
        [P in keyof T & keyof AggregateCourseStatusLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourseStatusLog[P]>
      : GetScalarType<T[P], AggregateCourseStatusLog[P]>
  }




  export type CourseStatusLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseStatusLogWhereInput
    orderBy?: CourseStatusLogOrderByWithAggregationInput | CourseStatusLogOrderByWithAggregationInput[]
    by: CourseStatusLogScalarFieldEnum[] | CourseStatusLogScalarFieldEnum
    having?: CourseStatusLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseStatusLogCountAggregateInputType | true
    _min?: CourseStatusLogMinAggregateInputType
    _max?: CourseStatusLogMaxAggregateInputType
  }

  export type CourseStatusLogGroupByOutputType = {
    id: string
    studentCourseId: string
    status: $Enums.CourseStatus
    changedAt: Date
    note: string | null
    _count: CourseStatusLogCountAggregateOutputType | null
    _min: CourseStatusLogMinAggregateOutputType | null
    _max: CourseStatusLogMaxAggregateOutputType | null
  }

  type GetCourseStatusLogGroupByPayload<T extends CourseStatusLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseStatusLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseStatusLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseStatusLogGroupByOutputType[P]>
            : GetScalarType<T[P], CourseStatusLogGroupByOutputType[P]>
        }
      >
    >


  export type CourseStatusLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentCourseId?: boolean
    status?: boolean
    changedAt?: boolean
    note?: boolean
    studentCourse?: boolean | StudentCourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseStatusLog"]>

  export type CourseStatusLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentCourseId?: boolean
    status?: boolean
    changedAt?: boolean
    note?: boolean
    studentCourse?: boolean | StudentCourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseStatusLog"]>

  export type CourseStatusLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentCourseId?: boolean
    status?: boolean
    changedAt?: boolean
    note?: boolean
    studentCourse?: boolean | StudentCourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseStatusLog"]>

  export type CourseStatusLogSelectScalar = {
    id?: boolean
    studentCourseId?: boolean
    status?: boolean
    changedAt?: boolean
    note?: boolean
  }

  export type CourseStatusLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentCourseId" | "status" | "changedAt" | "note", ExtArgs["result"]["courseStatusLog"]>
  export type CourseStatusLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentCourse?: boolean | StudentCourseDefaultArgs<ExtArgs>
  }
  export type CourseStatusLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentCourse?: boolean | StudentCourseDefaultArgs<ExtArgs>
  }
  export type CourseStatusLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studentCourse?: boolean | StudentCourseDefaultArgs<ExtArgs>
  }

  export type $CourseStatusLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CourseStatusLog"
    objects: {
      studentCourse: Prisma.$StudentCoursePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentCourseId: string
      status: $Enums.CourseStatus
      changedAt: Date
      note: string | null
    }, ExtArgs["result"]["courseStatusLog"]>
    composites: {}
  }

  type CourseStatusLogGetPayload<S extends boolean | null | undefined | CourseStatusLogDefaultArgs> = $Result.GetResult<Prisma.$CourseStatusLogPayload, S>

  type CourseStatusLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseStatusLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseStatusLogCountAggregateInputType | true
    }

  export interface CourseStatusLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CourseStatusLog'], meta: { name: 'CourseStatusLog' } }
    /**
     * Find zero or one CourseStatusLog that matches the filter.
     * @param {CourseStatusLogFindUniqueArgs} args - Arguments to find a CourseStatusLog
     * @example
     * // Get one CourseStatusLog
     * const courseStatusLog = await prisma.courseStatusLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseStatusLogFindUniqueArgs>(args: SelectSubset<T, CourseStatusLogFindUniqueArgs<ExtArgs>>): Prisma__CourseStatusLogClient<$Result.GetResult<Prisma.$CourseStatusLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CourseStatusLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseStatusLogFindUniqueOrThrowArgs} args - Arguments to find a CourseStatusLog
     * @example
     * // Get one CourseStatusLog
     * const courseStatusLog = await prisma.courseStatusLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseStatusLogFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseStatusLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseStatusLogClient<$Result.GetResult<Prisma.$CourseStatusLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseStatusLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseStatusLogFindFirstArgs} args - Arguments to find a CourseStatusLog
     * @example
     * // Get one CourseStatusLog
     * const courseStatusLog = await prisma.courseStatusLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseStatusLogFindFirstArgs>(args?: SelectSubset<T, CourseStatusLogFindFirstArgs<ExtArgs>>): Prisma__CourseStatusLogClient<$Result.GetResult<Prisma.$CourseStatusLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseStatusLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseStatusLogFindFirstOrThrowArgs} args - Arguments to find a CourseStatusLog
     * @example
     * // Get one CourseStatusLog
     * const courseStatusLog = await prisma.courseStatusLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseStatusLogFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseStatusLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseStatusLogClient<$Result.GetResult<Prisma.$CourseStatusLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CourseStatusLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseStatusLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CourseStatusLogs
     * const courseStatusLogs = await prisma.courseStatusLog.findMany()
     * 
     * // Get first 10 CourseStatusLogs
     * const courseStatusLogs = await prisma.courseStatusLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseStatusLogWithIdOnly = await prisma.courseStatusLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseStatusLogFindManyArgs>(args?: SelectSubset<T, CourseStatusLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseStatusLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CourseStatusLog.
     * @param {CourseStatusLogCreateArgs} args - Arguments to create a CourseStatusLog.
     * @example
     * // Create one CourseStatusLog
     * const CourseStatusLog = await prisma.courseStatusLog.create({
     *   data: {
     *     // ... data to create a CourseStatusLog
     *   }
     * })
     * 
     */
    create<T extends CourseStatusLogCreateArgs>(args: SelectSubset<T, CourseStatusLogCreateArgs<ExtArgs>>): Prisma__CourseStatusLogClient<$Result.GetResult<Prisma.$CourseStatusLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CourseStatusLogs.
     * @param {CourseStatusLogCreateManyArgs} args - Arguments to create many CourseStatusLogs.
     * @example
     * // Create many CourseStatusLogs
     * const courseStatusLog = await prisma.courseStatusLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseStatusLogCreateManyArgs>(args?: SelectSubset<T, CourseStatusLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CourseStatusLogs and returns the data saved in the database.
     * @param {CourseStatusLogCreateManyAndReturnArgs} args - Arguments to create many CourseStatusLogs.
     * @example
     * // Create many CourseStatusLogs
     * const courseStatusLog = await prisma.courseStatusLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CourseStatusLogs and only return the `id`
     * const courseStatusLogWithIdOnly = await prisma.courseStatusLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseStatusLogCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseStatusLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseStatusLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CourseStatusLog.
     * @param {CourseStatusLogDeleteArgs} args - Arguments to delete one CourseStatusLog.
     * @example
     * // Delete one CourseStatusLog
     * const CourseStatusLog = await prisma.courseStatusLog.delete({
     *   where: {
     *     // ... filter to delete one CourseStatusLog
     *   }
     * })
     * 
     */
    delete<T extends CourseStatusLogDeleteArgs>(args: SelectSubset<T, CourseStatusLogDeleteArgs<ExtArgs>>): Prisma__CourseStatusLogClient<$Result.GetResult<Prisma.$CourseStatusLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CourseStatusLog.
     * @param {CourseStatusLogUpdateArgs} args - Arguments to update one CourseStatusLog.
     * @example
     * // Update one CourseStatusLog
     * const courseStatusLog = await prisma.courseStatusLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseStatusLogUpdateArgs>(args: SelectSubset<T, CourseStatusLogUpdateArgs<ExtArgs>>): Prisma__CourseStatusLogClient<$Result.GetResult<Prisma.$CourseStatusLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CourseStatusLogs.
     * @param {CourseStatusLogDeleteManyArgs} args - Arguments to filter CourseStatusLogs to delete.
     * @example
     * // Delete a few CourseStatusLogs
     * const { count } = await prisma.courseStatusLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseStatusLogDeleteManyArgs>(args?: SelectSubset<T, CourseStatusLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseStatusLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseStatusLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CourseStatusLogs
     * const courseStatusLog = await prisma.courseStatusLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseStatusLogUpdateManyArgs>(args: SelectSubset<T, CourseStatusLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseStatusLogs and returns the data updated in the database.
     * @param {CourseStatusLogUpdateManyAndReturnArgs} args - Arguments to update many CourseStatusLogs.
     * @example
     * // Update many CourseStatusLogs
     * const courseStatusLog = await prisma.courseStatusLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CourseStatusLogs and only return the `id`
     * const courseStatusLogWithIdOnly = await prisma.courseStatusLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CourseStatusLogUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseStatusLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseStatusLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CourseStatusLog.
     * @param {CourseStatusLogUpsertArgs} args - Arguments to update or create a CourseStatusLog.
     * @example
     * // Update or create a CourseStatusLog
     * const courseStatusLog = await prisma.courseStatusLog.upsert({
     *   create: {
     *     // ... data to create a CourseStatusLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CourseStatusLog we want to update
     *   }
     * })
     */
    upsert<T extends CourseStatusLogUpsertArgs>(args: SelectSubset<T, CourseStatusLogUpsertArgs<ExtArgs>>): Prisma__CourseStatusLogClient<$Result.GetResult<Prisma.$CourseStatusLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CourseStatusLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseStatusLogCountArgs} args - Arguments to filter CourseStatusLogs to count.
     * @example
     * // Count the number of CourseStatusLogs
     * const count = await prisma.courseStatusLog.count({
     *   where: {
     *     // ... the filter for the CourseStatusLogs we want to count
     *   }
     * })
    **/
    count<T extends CourseStatusLogCountArgs>(
      args?: Subset<T, CourseStatusLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseStatusLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CourseStatusLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseStatusLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseStatusLogAggregateArgs>(args: Subset<T, CourseStatusLogAggregateArgs>): Prisma.PrismaPromise<GetCourseStatusLogAggregateType<T>>

    /**
     * Group by CourseStatusLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseStatusLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseStatusLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseStatusLogGroupByArgs['orderBy'] }
        : { orderBy?: CourseStatusLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseStatusLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseStatusLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CourseStatusLog model
   */
  readonly fields: CourseStatusLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CourseStatusLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseStatusLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    studentCourse<T extends StudentCourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentCourseDefaultArgs<ExtArgs>>): Prisma__StudentCourseClient<$Result.GetResult<Prisma.$StudentCoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CourseStatusLog model
   */
  interface CourseStatusLogFieldRefs {
    readonly id: FieldRef<"CourseStatusLog", 'String'>
    readonly studentCourseId: FieldRef<"CourseStatusLog", 'String'>
    readonly status: FieldRef<"CourseStatusLog", 'CourseStatus'>
    readonly changedAt: FieldRef<"CourseStatusLog", 'DateTime'>
    readonly note: FieldRef<"CourseStatusLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CourseStatusLog findUnique
   */
  export type CourseStatusLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseStatusLog
     */
    select?: CourseStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseStatusLog
     */
    omit?: CourseStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which CourseStatusLog to fetch.
     */
    where: CourseStatusLogWhereUniqueInput
  }

  /**
   * CourseStatusLog findUniqueOrThrow
   */
  export type CourseStatusLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseStatusLog
     */
    select?: CourseStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseStatusLog
     */
    omit?: CourseStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which CourseStatusLog to fetch.
     */
    where: CourseStatusLogWhereUniqueInput
  }

  /**
   * CourseStatusLog findFirst
   */
  export type CourseStatusLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseStatusLog
     */
    select?: CourseStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseStatusLog
     */
    omit?: CourseStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which CourseStatusLog to fetch.
     */
    where?: CourseStatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseStatusLogs to fetch.
     */
    orderBy?: CourseStatusLogOrderByWithRelationInput | CourseStatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseStatusLogs.
     */
    cursor?: CourseStatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseStatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseStatusLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseStatusLogs.
     */
    distinct?: CourseStatusLogScalarFieldEnum | CourseStatusLogScalarFieldEnum[]
  }

  /**
   * CourseStatusLog findFirstOrThrow
   */
  export type CourseStatusLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseStatusLog
     */
    select?: CourseStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseStatusLog
     */
    omit?: CourseStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which CourseStatusLog to fetch.
     */
    where?: CourseStatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseStatusLogs to fetch.
     */
    orderBy?: CourseStatusLogOrderByWithRelationInput | CourseStatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseStatusLogs.
     */
    cursor?: CourseStatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseStatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseStatusLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseStatusLogs.
     */
    distinct?: CourseStatusLogScalarFieldEnum | CourseStatusLogScalarFieldEnum[]
  }

  /**
   * CourseStatusLog findMany
   */
  export type CourseStatusLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseStatusLog
     */
    select?: CourseStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseStatusLog
     */
    omit?: CourseStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which CourseStatusLogs to fetch.
     */
    where?: CourseStatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseStatusLogs to fetch.
     */
    orderBy?: CourseStatusLogOrderByWithRelationInput | CourseStatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CourseStatusLogs.
     */
    cursor?: CourseStatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseStatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseStatusLogs.
     */
    skip?: number
    distinct?: CourseStatusLogScalarFieldEnum | CourseStatusLogScalarFieldEnum[]
  }

  /**
   * CourseStatusLog create
   */
  export type CourseStatusLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseStatusLog
     */
    select?: CourseStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseStatusLog
     */
    omit?: CourseStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseStatusLogInclude<ExtArgs> | null
    /**
     * The data needed to create a CourseStatusLog.
     */
    data: XOR<CourseStatusLogCreateInput, CourseStatusLogUncheckedCreateInput>
  }

  /**
   * CourseStatusLog createMany
   */
  export type CourseStatusLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CourseStatusLogs.
     */
    data: CourseStatusLogCreateManyInput | CourseStatusLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CourseStatusLog createManyAndReturn
   */
  export type CourseStatusLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseStatusLog
     */
    select?: CourseStatusLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CourseStatusLog
     */
    omit?: CourseStatusLogOmit<ExtArgs> | null
    /**
     * The data used to create many CourseStatusLogs.
     */
    data: CourseStatusLogCreateManyInput | CourseStatusLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseStatusLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CourseStatusLog update
   */
  export type CourseStatusLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseStatusLog
     */
    select?: CourseStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseStatusLog
     */
    omit?: CourseStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseStatusLogInclude<ExtArgs> | null
    /**
     * The data needed to update a CourseStatusLog.
     */
    data: XOR<CourseStatusLogUpdateInput, CourseStatusLogUncheckedUpdateInput>
    /**
     * Choose, which CourseStatusLog to update.
     */
    where: CourseStatusLogWhereUniqueInput
  }

  /**
   * CourseStatusLog updateMany
   */
  export type CourseStatusLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CourseStatusLogs.
     */
    data: XOR<CourseStatusLogUpdateManyMutationInput, CourseStatusLogUncheckedUpdateManyInput>
    /**
     * Filter which CourseStatusLogs to update
     */
    where?: CourseStatusLogWhereInput
    /**
     * Limit how many CourseStatusLogs to update.
     */
    limit?: number
  }

  /**
   * CourseStatusLog updateManyAndReturn
   */
  export type CourseStatusLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseStatusLog
     */
    select?: CourseStatusLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CourseStatusLog
     */
    omit?: CourseStatusLogOmit<ExtArgs> | null
    /**
     * The data used to update CourseStatusLogs.
     */
    data: XOR<CourseStatusLogUpdateManyMutationInput, CourseStatusLogUncheckedUpdateManyInput>
    /**
     * Filter which CourseStatusLogs to update
     */
    where?: CourseStatusLogWhereInput
    /**
     * Limit how many CourseStatusLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseStatusLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CourseStatusLog upsert
   */
  export type CourseStatusLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseStatusLog
     */
    select?: CourseStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseStatusLog
     */
    omit?: CourseStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseStatusLogInclude<ExtArgs> | null
    /**
     * The filter to search for the CourseStatusLog to update in case it exists.
     */
    where: CourseStatusLogWhereUniqueInput
    /**
     * In case the CourseStatusLog found by the `where` argument doesn't exist, create a new CourseStatusLog with this data.
     */
    create: XOR<CourseStatusLogCreateInput, CourseStatusLogUncheckedCreateInput>
    /**
     * In case the CourseStatusLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseStatusLogUpdateInput, CourseStatusLogUncheckedUpdateInput>
  }

  /**
   * CourseStatusLog delete
   */
  export type CourseStatusLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseStatusLog
     */
    select?: CourseStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseStatusLog
     */
    omit?: CourseStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseStatusLogInclude<ExtArgs> | null
    /**
     * Filter which CourseStatusLog to delete.
     */
    where: CourseStatusLogWhereUniqueInput
  }

  /**
   * CourseStatusLog deleteMany
   */
  export type CourseStatusLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseStatusLogs to delete
     */
    where?: CourseStatusLogWhereInput
    /**
     * Limit how many CourseStatusLogs to delete.
     */
    limit?: number
  }

  /**
   * CourseStatusLog without action
   */
  export type CourseStatusLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseStatusLog
     */
    select?: CourseStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseStatusLog
     */
    omit?: CourseStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseStatusLogInclude<ExtArgs> | null
  }


  /**
   * Model LessonProgress
   */

  export type AggregateLessonProgress = {
    _count: LessonProgressCountAggregateOutputType | null
    _min: LessonProgressMinAggregateOutputType | null
    _max: LessonProgressMaxAggregateOutputType | null
  }

  export type LessonProgressMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    lessonBookId: string | null
    completed: boolean | null
    completedAt: Date | null
    notes: string | null
  }

  export type LessonProgressMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    lessonBookId: string | null
    completed: boolean | null
    completedAt: Date | null
    notes: string | null
  }

  export type LessonProgressCountAggregateOutputType = {
    id: number
    studentId: number
    lessonBookId: number
    completed: number
    completedAt: number
    notes: number
    _all: number
  }


  export type LessonProgressMinAggregateInputType = {
    id?: true
    studentId?: true
    lessonBookId?: true
    completed?: true
    completedAt?: true
    notes?: true
  }

  export type LessonProgressMaxAggregateInputType = {
    id?: true
    studentId?: true
    lessonBookId?: true
    completed?: true
    completedAt?: true
    notes?: true
  }

  export type LessonProgressCountAggregateInputType = {
    id?: true
    studentId?: true
    lessonBookId?: true
    completed?: true
    completedAt?: true
    notes?: true
    _all?: true
  }

  export type LessonProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LessonProgress to aggregate.
     */
    where?: LessonProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonProgresses to fetch.
     */
    orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LessonProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LessonProgresses
    **/
    _count?: true | LessonProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LessonProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LessonProgressMaxAggregateInputType
  }

  export type GetLessonProgressAggregateType<T extends LessonProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateLessonProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLessonProgress[P]>
      : GetScalarType<T[P], AggregateLessonProgress[P]>
  }




  export type LessonProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonProgressWhereInput
    orderBy?: LessonProgressOrderByWithAggregationInput | LessonProgressOrderByWithAggregationInput[]
    by: LessonProgressScalarFieldEnum[] | LessonProgressScalarFieldEnum
    having?: LessonProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LessonProgressCountAggregateInputType | true
    _min?: LessonProgressMinAggregateInputType
    _max?: LessonProgressMaxAggregateInputType
  }

  export type LessonProgressGroupByOutputType = {
    id: string
    studentId: string
    lessonBookId: string
    completed: boolean
    completedAt: Date | null
    notes: string | null
    _count: LessonProgressCountAggregateOutputType | null
    _min: LessonProgressMinAggregateOutputType | null
    _max: LessonProgressMaxAggregateOutputType | null
  }

  type GetLessonProgressGroupByPayload<T extends LessonProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LessonProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LessonProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LessonProgressGroupByOutputType[P]>
            : GetScalarType<T[P], LessonProgressGroupByOutputType[P]>
        }
      >
    >


  export type LessonProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    lessonBookId?: boolean
    completed?: boolean
    completedAt?: boolean
    notes?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    lessonBook?: boolean | LessonBookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lessonProgress"]>

  export type LessonProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    lessonBookId?: boolean
    completed?: boolean
    completedAt?: boolean
    notes?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    lessonBook?: boolean | LessonBookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lessonProgress"]>

  export type LessonProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    lessonBookId?: boolean
    completed?: boolean
    completedAt?: boolean
    notes?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    lessonBook?: boolean | LessonBookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lessonProgress"]>

  export type LessonProgressSelectScalar = {
    id?: boolean
    studentId?: boolean
    lessonBookId?: boolean
    completed?: boolean
    completedAt?: boolean
    notes?: boolean
  }

  export type LessonProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "lessonBookId" | "completed" | "completedAt" | "notes", ExtArgs["result"]["lessonProgress"]>
  export type LessonProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    lessonBook?: boolean | LessonBookDefaultArgs<ExtArgs>
  }
  export type LessonProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    lessonBook?: boolean | LessonBookDefaultArgs<ExtArgs>
  }
  export type LessonProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    lessonBook?: boolean | LessonBookDefaultArgs<ExtArgs>
  }

  export type $LessonProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LessonProgress"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      lessonBook: Prisma.$LessonBookPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      lessonBookId: string
      completed: boolean
      completedAt: Date | null
      notes: string | null
    }, ExtArgs["result"]["lessonProgress"]>
    composites: {}
  }

  type LessonProgressGetPayload<S extends boolean | null | undefined | LessonProgressDefaultArgs> = $Result.GetResult<Prisma.$LessonProgressPayload, S>

  type LessonProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LessonProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LessonProgressCountAggregateInputType | true
    }

  export interface LessonProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LessonProgress'], meta: { name: 'LessonProgress' } }
    /**
     * Find zero or one LessonProgress that matches the filter.
     * @param {LessonProgressFindUniqueArgs} args - Arguments to find a LessonProgress
     * @example
     * // Get one LessonProgress
     * const lessonProgress = await prisma.lessonProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LessonProgressFindUniqueArgs>(args: SelectSubset<T, LessonProgressFindUniqueArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LessonProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LessonProgressFindUniqueOrThrowArgs} args - Arguments to find a LessonProgress
     * @example
     * // Get one LessonProgress
     * const lessonProgress = await prisma.lessonProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LessonProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LessonProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonProgressFindFirstArgs} args - Arguments to find a LessonProgress
     * @example
     * // Get one LessonProgress
     * const lessonProgress = await prisma.lessonProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LessonProgressFindFirstArgs>(args?: SelectSubset<T, LessonProgressFindFirstArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LessonProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonProgressFindFirstOrThrowArgs} args - Arguments to find a LessonProgress
     * @example
     * // Get one LessonProgress
     * const lessonProgress = await prisma.lessonProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LessonProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LessonProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LessonProgresses
     * const lessonProgresses = await prisma.lessonProgress.findMany()
     * 
     * // Get first 10 LessonProgresses
     * const lessonProgresses = await prisma.lessonProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lessonProgressWithIdOnly = await prisma.lessonProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LessonProgressFindManyArgs>(args?: SelectSubset<T, LessonProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LessonProgress.
     * @param {LessonProgressCreateArgs} args - Arguments to create a LessonProgress.
     * @example
     * // Create one LessonProgress
     * const LessonProgress = await prisma.lessonProgress.create({
     *   data: {
     *     // ... data to create a LessonProgress
     *   }
     * })
     * 
     */
    create<T extends LessonProgressCreateArgs>(args: SelectSubset<T, LessonProgressCreateArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LessonProgresses.
     * @param {LessonProgressCreateManyArgs} args - Arguments to create many LessonProgresses.
     * @example
     * // Create many LessonProgresses
     * const lessonProgress = await prisma.lessonProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LessonProgressCreateManyArgs>(args?: SelectSubset<T, LessonProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LessonProgresses and returns the data saved in the database.
     * @param {LessonProgressCreateManyAndReturnArgs} args - Arguments to create many LessonProgresses.
     * @example
     * // Create many LessonProgresses
     * const lessonProgress = await prisma.lessonProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LessonProgresses and only return the `id`
     * const lessonProgressWithIdOnly = await prisma.lessonProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LessonProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, LessonProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LessonProgress.
     * @param {LessonProgressDeleteArgs} args - Arguments to delete one LessonProgress.
     * @example
     * // Delete one LessonProgress
     * const LessonProgress = await prisma.lessonProgress.delete({
     *   where: {
     *     // ... filter to delete one LessonProgress
     *   }
     * })
     * 
     */
    delete<T extends LessonProgressDeleteArgs>(args: SelectSubset<T, LessonProgressDeleteArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LessonProgress.
     * @param {LessonProgressUpdateArgs} args - Arguments to update one LessonProgress.
     * @example
     * // Update one LessonProgress
     * const lessonProgress = await prisma.lessonProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LessonProgressUpdateArgs>(args: SelectSubset<T, LessonProgressUpdateArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LessonProgresses.
     * @param {LessonProgressDeleteManyArgs} args - Arguments to filter LessonProgresses to delete.
     * @example
     * // Delete a few LessonProgresses
     * const { count } = await prisma.lessonProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LessonProgressDeleteManyArgs>(args?: SelectSubset<T, LessonProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LessonProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LessonProgresses
     * const lessonProgress = await prisma.lessonProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LessonProgressUpdateManyArgs>(args: SelectSubset<T, LessonProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LessonProgresses and returns the data updated in the database.
     * @param {LessonProgressUpdateManyAndReturnArgs} args - Arguments to update many LessonProgresses.
     * @example
     * // Update many LessonProgresses
     * const lessonProgress = await prisma.lessonProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LessonProgresses and only return the `id`
     * const lessonProgressWithIdOnly = await prisma.lessonProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LessonProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, LessonProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LessonProgress.
     * @param {LessonProgressUpsertArgs} args - Arguments to update or create a LessonProgress.
     * @example
     * // Update or create a LessonProgress
     * const lessonProgress = await prisma.lessonProgress.upsert({
     *   create: {
     *     // ... data to create a LessonProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LessonProgress we want to update
     *   }
     * })
     */
    upsert<T extends LessonProgressUpsertArgs>(args: SelectSubset<T, LessonProgressUpsertArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LessonProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonProgressCountArgs} args - Arguments to filter LessonProgresses to count.
     * @example
     * // Count the number of LessonProgresses
     * const count = await prisma.lessonProgress.count({
     *   where: {
     *     // ... the filter for the LessonProgresses we want to count
     *   }
     * })
    **/
    count<T extends LessonProgressCountArgs>(
      args?: Subset<T, LessonProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LessonProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LessonProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LessonProgressAggregateArgs>(args: Subset<T, LessonProgressAggregateArgs>): Prisma.PrismaPromise<GetLessonProgressAggregateType<T>>

    /**
     * Group by LessonProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LessonProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LessonProgressGroupByArgs['orderBy'] }
        : { orderBy?: LessonProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LessonProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LessonProgress model
   */
  readonly fields: LessonProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LessonProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LessonProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    lessonBook<T extends LessonBookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LessonBookDefaultArgs<ExtArgs>>): Prisma__LessonBookClient<$Result.GetResult<Prisma.$LessonBookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LessonProgress model
   */
  interface LessonProgressFieldRefs {
    readonly id: FieldRef<"LessonProgress", 'String'>
    readonly studentId: FieldRef<"LessonProgress", 'String'>
    readonly lessonBookId: FieldRef<"LessonProgress", 'String'>
    readonly completed: FieldRef<"LessonProgress", 'Boolean'>
    readonly completedAt: FieldRef<"LessonProgress", 'DateTime'>
    readonly notes: FieldRef<"LessonProgress", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LessonProgress findUnique
   */
  export type LessonProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * Filter, which LessonProgress to fetch.
     */
    where: LessonProgressWhereUniqueInput
  }

  /**
   * LessonProgress findUniqueOrThrow
   */
  export type LessonProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * Filter, which LessonProgress to fetch.
     */
    where: LessonProgressWhereUniqueInput
  }

  /**
   * LessonProgress findFirst
   */
  export type LessonProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * Filter, which LessonProgress to fetch.
     */
    where?: LessonProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonProgresses to fetch.
     */
    orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LessonProgresses.
     */
    cursor?: LessonProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LessonProgresses.
     */
    distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[]
  }

  /**
   * LessonProgress findFirstOrThrow
   */
  export type LessonProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * Filter, which LessonProgress to fetch.
     */
    where?: LessonProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonProgresses to fetch.
     */
    orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LessonProgresses.
     */
    cursor?: LessonProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LessonProgresses.
     */
    distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[]
  }

  /**
   * LessonProgress findMany
   */
  export type LessonProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * Filter, which LessonProgresses to fetch.
     */
    where?: LessonProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonProgresses to fetch.
     */
    orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LessonProgresses.
     */
    cursor?: LessonProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonProgresses.
     */
    skip?: number
    distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[]
  }

  /**
   * LessonProgress create
   */
  export type LessonProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a LessonProgress.
     */
    data: XOR<LessonProgressCreateInput, LessonProgressUncheckedCreateInput>
  }

  /**
   * LessonProgress createMany
   */
  export type LessonProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LessonProgresses.
     */
    data: LessonProgressCreateManyInput | LessonProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LessonProgress createManyAndReturn
   */
  export type LessonProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * The data used to create many LessonProgresses.
     */
    data: LessonProgressCreateManyInput | LessonProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LessonProgress update
   */
  export type LessonProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a LessonProgress.
     */
    data: XOR<LessonProgressUpdateInput, LessonProgressUncheckedUpdateInput>
    /**
     * Choose, which LessonProgress to update.
     */
    where: LessonProgressWhereUniqueInput
  }

  /**
   * LessonProgress updateMany
   */
  export type LessonProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LessonProgresses.
     */
    data: XOR<LessonProgressUpdateManyMutationInput, LessonProgressUncheckedUpdateManyInput>
    /**
     * Filter which LessonProgresses to update
     */
    where?: LessonProgressWhereInput
    /**
     * Limit how many LessonProgresses to update.
     */
    limit?: number
  }

  /**
   * LessonProgress updateManyAndReturn
   */
  export type LessonProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * The data used to update LessonProgresses.
     */
    data: XOR<LessonProgressUpdateManyMutationInput, LessonProgressUncheckedUpdateManyInput>
    /**
     * Filter which LessonProgresses to update
     */
    where?: LessonProgressWhereInput
    /**
     * Limit how many LessonProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LessonProgress upsert
   */
  export type LessonProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the LessonProgress to update in case it exists.
     */
    where: LessonProgressWhereUniqueInput
    /**
     * In case the LessonProgress found by the `where` argument doesn't exist, create a new LessonProgress with this data.
     */
    create: XOR<LessonProgressCreateInput, LessonProgressUncheckedCreateInput>
    /**
     * In case the LessonProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LessonProgressUpdateInput, LessonProgressUncheckedUpdateInput>
  }

  /**
   * LessonProgress delete
   */
  export type LessonProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
    /**
     * Filter which LessonProgress to delete.
     */
    where: LessonProgressWhereUniqueInput
  }

  /**
   * LessonProgress deleteMany
   */
  export type LessonProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LessonProgresses to delete
     */
    where?: LessonProgressWhereInput
    /**
     * Limit how many LessonProgresses to delete.
     */
    limit?: number
  }

  /**
   * LessonProgress without action
   */
  export type LessonProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonProgress
     */
    select?: LessonProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonProgress
     */
    omit?: LessonProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonProgressInclude<ExtArgs> | null
  }


  /**
   * Model Purchase
   */

  export type AggregatePurchase = {
    _count: PurchaseCountAggregateOutputType | null
    _avg: PurchaseAvgAggregateOutputType | null
    _sum: PurchaseSumAggregateOutputType | null
    _min: PurchaseMinAggregateOutputType | null
    _max: PurchaseMaxAggregateOutputType | null
  }

  export type PurchaseAvgAggregateOutputType = {
    amount: number | null
  }

  export type PurchaseSumAggregateOutputType = {
    amount: number | null
  }

  export type PurchaseMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    courseId: string | null
    type: $Enums.PurchaseType | null
    amount: number | null
    description: string | null
    paidAt: Date | null
    forMonth: Date | null
    method: $Enums.PaymentMethod | null
    invoiceId: string | null
    orgId: string | null
  }

  export type PurchaseMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    courseId: string | null
    type: $Enums.PurchaseType | null
    amount: number | null
    description: string | null
    paidAt: Date | null
    forMonth: Date | null
    method: $Enums.PaymentMethod | null
    invoiceId: string | null
    orgId: string | null
  }

  export type PurchaseCountAggregateOutputType = {
    id: number
    studentId: number
    courseId: number
    type: number
    amount: number
    description: number
    paidAt: number
    forMonth: number
    method: number
    invoiceId: number
    orgId: number
    _all: number
  }


  export type PurchaseAvgAggregateInputType = {
    amount?: true
  }

  export type PurchaseSumAggregateInputType = {
    amount?: true
  }

  export type PurchaseMinAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    type?: true
    amount?: true
    description?: true
    paidAt?: true
    forMonth?: true
    method?: true
    invoiceId?: true
    orgId?: true
  }

  export type PurchaseMaxAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    type?: true
    amount?: true
    description?: true
    paidAt?: true
    forMonth?: true
    method?: true
    invoiceId?: true
    orgId?: true
  }

  export type PurchaseCountAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    type?: true
    amount?: true
    description?: true
    paidAt?: true
    forMonth?: true
    method?: true
    invoiceId?: true
    orgId?: true
    _all?: true
  }

  export type PurchaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Purchase to aggregate.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Purchases
    **/
    _count?: true | PurchaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PurchaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PurchaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurchaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurchaseMaxAggregateInputType
  }

  export type GetPurchaseAggregateType<T extends PurchaseAggregateArgs> = {
        [P in keyof T & keyof AggregatePurchase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurchase[P]>
      : GetScalarType<T[P], AggregatePurchase[P]>
  }




  export type PurchaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseWhereInput
    orderBy?: PurchaseOrderByWithAggregationInput | PurchaseOrderByWithAggregationInput[]
    by: PurchaseScalarFieldEnum[] | PurchaseScalarFieldEnum
    having?: PurchaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurchaseCountAggregateInputType | true
    _avg?: PurchaseAvgAggregateInputType
    _sum?: PurchaseSumAggregateInputType
    _min?: PurchaseMinAggregateInputType
    _max?: PurchaseMaxAggregateInputType
  }

  export type PurchaseGroupByOutputType = {
    id: string
    studentId: string
    courseId: string | null
    type: $Enums.PurchaseType
    amount: number
    description: string | null
    paidAt: Date
    forMonth: Date | null
    method: $Enums.PaymentMethod
    invoiceId: string | null
    orgId: string
    _count: PurchaseCountAggregateOutputType | null
    _avg: PurchaseAvgAggregateOutputType | null
    _sum: PurchaseSumAggregateOutputType | null
    _min: PurchaseMinAggregateOutputType | null
    _max: PurchaseMaxAggregateOutputType | null
  }

  type GetPurchaseGroupByPayload<T extends PurchaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PurchaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PurchaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PurchaseGroupByOutputType[P]>
            : GetScalarType<T[P], PurchaseGroupByOutputType[P]>
        }
      >
    >


  export type PurchaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    paidAt?: boolean
    forMonth?: boolean
    method?: boolean
    invoiceId?: boolean
    orgId?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | Purchase$courseArgs<ExtArgs>
  }, ExtArgs["result"]["purchase"]>

  export type PurchaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    paidAt?: boolean
    forMonth?: boolean
    method?: boolean
    invoiceId?: boolean
    orgId?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | Purchase$courseArgs<ExtArgs>
  }, ExtArgs["result"]["purchase"]>

  export type PurchaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    paidAt?: boolean
    forMonth?: boolean
    method?: boolean
    invoiceId?: boolean
    orgId?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | Purchase$courseArgs<ExtArgs>
  }, ExtArgs["result"]["purchase"]>

  export type PurchaseSelectScalar = {
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    paidAt?: boolean
    forMonth?: boolean
    method?: boolean
    invoiceId?: boolean
    orgId?: boolean
  }

  export type PurchaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "courseId" | "type" | "amount" | "description" | "paidAt" | "forMonth" | "method" | "invoiceId" | "orgId", ExtArgs["result"]["purchase"]>
  export type PurchaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | Purchase$courseArgs<ExtArgs>
  }
  export type PurchaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | Purchase$courseArgs<ExtArgs>
  }
  export type PurchaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | Purchase$courseArgs<ExtArgs>
  }

  export type $PurchasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Purchase"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      course: Prisma.$CoursePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      courseId: string | null
      type: $Enums.PurchaseType
      amount: number
      description: string | null
      paidAt: Date
      forMonth: Date | null
      method: $Enums.PaymentMethod
      invoiceId: string | null
      orgId: string
    }, ExtArgs["result"]["purchase"]>
    composites: {}
  }

  type PurchaseGetPayload<S extends boolean | null | undefined | PurchaseDefaultArgs> = $Result.GetResult<Prisma.$PurchasePayload, S>

  type PurchaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PurchaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PurchaseCountAggregateInputType | true
    }

  export interface PurchaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Purchase'], meta: { name: 'Purchase' } }
    /**
     * Find zero or one Purchase that matches the filter.
     * @param {PurchaseFindUniqueArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PurchaseFindUniqueArgs>(args: SelectSubset<T, PurchaseFindUniqueArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Purchase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PurchaseFindUniqueOrThrowArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PurchaseFindUniqueOrThrowArgs>(args: SelectSubset<T, PurchaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Purchase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseFindFirstArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PurchaseFindFirstArgs>(args?: SelectSubset<T, PurchaseFindFirstArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Purchase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseFindFirstOrThrowArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PurchaseFindFirstOrThrowArgs>(args?: SelectSubset<T, PurchaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Purchases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Purchases
     * const purchases = await prisma.purchase.findMany()
     * 
     * // Get first 10 Purchases
     * const purchases = await prisma.purchase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purchaseWithIdOnly = await prisma.purchase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PurchaseFindManyArgs>(args?: SelectSubset<T, PurchaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Purchase.
     * @param {PurchaseCreateArgs} args - Arguments to create a Purchase.
     * @example
     * // Create one Purchase
     * const Purchase = await prisma.purchase.create({
     *   data: {
     *     // ... data to create a Purchase
     *   }
     * })
     * 
     */
    create<T extends PurchaseCreateArgs>(args: SelectSubset<T, PurchaseCreateArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Purchases.
     * @param {PurchaseCreateManyArgs} args - Arguments to create many Purchases.
     * @example
     * // Create many Purchases
     * const purchase = await prisma.purchase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PurchaseCreateManyArgs>(args?: SelectSubset<T, PurchaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Purchases and returns the data saved in the database.
     * @param {PurchaseCreateManyAndReturnArgs} args - Arguments to create many Purchases.
     * @example
     * // Create many Purchases
     * const purchase = await prisma.purchase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Purchases and only return the `id`
     * const purchaseWithIdOnly = await prisma.purchase.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PurchaseCreateManyAndReturnArgs>(args?: SelectSubset<T, PurchaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Purchase.
     * @param {PurchaseDeleteArgs} args - Arguments to delete one Purchase.
     * @example
     * // Delete one Purchase
     * const Purchase = await prisma.purchase.delete({
     *   where: {
     *     // ... filter to delete one Purchase
     *   }
     * })
     * 
     */
    delete<T extends PurchaseDeleteArgs>(args: SelectSubset<T, PurchaseDeleteArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Purchase.
     * @param {PurchaseUpdateArgs} args - Arguments to update one Purchase.
     * @example
     * // Update one Purchase
     * const purchase = await prisma.purchase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PurchaseUpdateArgs>(args: SelectSubset<T, PurchaseUpdateArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Purchases.
     * @param {PurchaseDeleteManyArgs} args - Arguments to filter Purchases to delete.
     * @example
     * // Delete a few Purchases
     * const { count } = await prisma.purchase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PurchaseDeleteManyArgs>(args?: SelectSubset<T, PurchaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Purchases
     * const purchase = await prisma.purchase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PurchaseUpdateManyArgs>(args: SelectSubset<T, PurchaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Purchases and returns the data updated in the database.
     * @param {PurchaseUpdateManyAndReturnArgs} args - Arguments to update many Purchases.
     * @example
     * // Update many Purchases
     * const purchase = await prisma.purchase.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Purchases and only return the `id`
     * const purchaseWithIdOnly = await prisma.purchase.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PurchaseUpdateManyAndReturnArgs>(args: SelectSubset<T, PurchaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Purchase.
     * @param {PurchaseUpsertArgs} args - Arguments to update or create a Purchase.
     * @example
     * // Update or create a Purchase
     * const purchase = await prisma.purchase.upsert({
     *   create: {
     *     // ... data to create a Purchase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Purchase we want to update
     *   }
     * })
     */
    upsert<T extends PurchaseUpsertArgs>(args: SelectSubset<T, PurchaseUpsertArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseCountArgs} args - Arguments to filter Purchases to count.
     * @example
     * // Count the number of Purchases
     * const count = await prisma.purchase.count({
     *   where: {
     *     // ... the filter for the Purchases we want to count
     *   }
     * })
    **/
    count<T extends PurchaseCountArgs>(
      args?: Subset<T, PurchaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurchaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Purchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PurchaseAggregateArgs>(args: Subset<T, PurchaseAggregateArgs>): Prisma.PrismaPromise<GetPurchaseAggregateType<T>>

    /**
     * Group by Purchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PurchaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PurchaseGroupByArgs['orderBy'] }
        : { orderBy?: PurchaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PurchaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Purchase model
   */
  readonly fields: PurchaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Purchase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PurchaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    course<T extends Purchase$courseArgs<ExtArgs> = {}>(args?: Subset<T, Purchase$courseArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Purchase model
   */
  interface PurchaseFieldRefs {
    readonly id: FieldRef<"Purchase", 'String'>
    readonly studentId: FieldRef<"Purchase", 'String'>
    readonly courseId: FieldRef<"Purchase", 'String'>
    readonly type: FieldRef<"Purchase", 'PurchaseType'>
    readonly amount: FieldRef<"Purchase", 'Float'>
    readonly description: FieldRef<"Purchase", 'String'>
    readonly paidAt: FieldRef<"Purchase", 'DateTime'>
    readonly forMonth: FieldRef<"Purchase", 'DateTime'>
    readonly method: FieldRef<"Purchase", 'PaymentMethod'>
    readonly invoiceId: FieldRef<"Purchase", 'String'>
    readonly orgId: FieldRef<"Purchase", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Purchase findUnique
   */
  export type PurchaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase findUniqueOrThrow
   */
  export type PurchaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase findFirst
   */
  export type PurchaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Purchases.
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Purchases.
     */
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Purchase findFirstOrThrow
   */
  export type PurchaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Purchases.
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Purchases.
     */
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Purchase findMany
   */
  export type PurchaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchases to fetch.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Purchases.
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Purchase create
   */
  export type PurchaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * The data needed to create a Purchase.
     */
    data: XOR<PurchaseCreateInput, PurchaseUncheckedCreateInput>
  }

  /**
   * Purchase createMany
   */
  export type PurchaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Purchases.
     */
    data: PurchaseCreateManyInput | PurchaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Purchase createManyAndReturn
   */
  export type PurchaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * The data used to create many Purchases.
     */
    data: PurchaseCreateManyInput | PurchaseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Purchase update
   */
  export type PurchaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * The data needed to update a Purchase.
     */
    data: XOR<PurchaseUpdateInput, PurchaseUncheckedUpdateInput>
    /**
     * Choose, which Purchase to update.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase updateMany
   */
  export type PurchaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Purchases.
     */
    data: XOR<PurchaseUpdateManyMutationInput, PurchaseUncheckedUpdateManyInput>
    /**
     * Filter which Purchases to update
     */
    where?: PurchaseWhereInput
    /**
     * Limit how many Purchases to update.
     */
    limit?: number
  }

  /**
   * Purchase updateManyAndReturn
   */
  export type PurchaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * The data used to update Purchases.
     */
    data: XOR<PurchaseUpdateManyMutationInput, PurchaseUncheckedUpdateManyInput>
    /**
     * Filter which Purchases to update
     */
    where?: PurchaseWhereInput
    /**
     * Limit how many Purchases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Purchase upsert
   */
  export type PurchaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * The filter to search for the Purchase to update in case it exists.
     */
    where: PurchaseWhereUniqueInput
    /**
     * In case the Purchase found by the `where` argument doesn't exist, create a new Purchase with this data.
     */
    create: XOR<PurchaseCreateInput, PurchaseUncheckedCreateInput>
    /**
     * In case the Purchase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PurchaseUpdateInput, PurchaseUncheckedUpdateInput>
  }

  /**
   * Purchase delete
   */
  export type PurchaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter which Purchase to delete.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase deleteMany
   */
  export type PurchaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Purchases to delete
     */
    where?: PurchaseWhereInput
    /**
     * Limit how many Purchases to delete.
     */
    limit?: number
  }

  /**
   * Purchase.course
   */
  export type Purchase$courseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
  }

  /**
   * Purchase without action
   */
  export type PurchaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Purchase
     */
    omit?: PurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StudentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    birthDate: 'birthDate',
    gender: 'gender',
    phone: 'phone',
    address: 'address',
    email: 'email',
    guardian: 'guardian',
    joinedAt: 'joinedAt',
    orgId: 'orgId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    level: 'level',
    orgId: 'orgId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const LessonBookScalarFieldEnum: {
    id: 'id',
    title: 'title',
    author: 'author',
    price: 'price',
    courseId: 'courseId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LessonBookScalarFieldEnum = (typeof LessonBookScalarFieldEnum)[keyof typeof LessonBookScalarFieldEnum]


  export const StudentCourseScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    courseId: 'courseId',
    enrolledAt: 'enrolledAt',
    status: 'status'
  };

  export type StudentCourseScalarFieldEnum = (typeof StudentCourseScalarFieldEnum)[keyof typeof StudentCourseScalarFieldEnum]


  export const CourseStatusLogScalarFieldEnum: {
    id: 'id',
    studentCourseId: 'studentCourseId',
    status: 'status',
    changedAt: 'changedAt',
    note: 'note'
  };

  export type CourseStatusLogScalarFieldEnum = (typeof CourseStatusLogScalarFieldEnum)[keyof typeof CourseStatusLogScalarFieldEnum]


  export const LessonProgressScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    lessonBookId: 'lessonBookId',
    completed: 'completed',
    completedAt: 'completedAt',
    notes: 'notes'
  };

  export type LessonProgressScalarFieldEnum = (typeof LessonProgressScalarFieldEnum)[keyof typeof LessonProgressScalarFieldEnum]


  export const PurchaseScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    courseId: 'courseId',
    type: 'type',
    amount: 'amount',
    description: 'description',
    paidAt: 'paidAt',
    forMonth: 'forMonth',
    method: 'method',
    invoiceId: 'invoiceId',
    orgId: 'orgId'
  };

  export type PurchaseScalarFieldEnum = (typeof PurchaseScalarFieldEnum)[keyof typeof PurchaseScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'CourseStatus'
   */
  export type EnumCourseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CourseStatus'>
    


  /**
   * Reference to a field of type 'CourseStatus[]'
   */
  export type ListEnumCourseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CourseStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'PurchaseType'
   */
  export type EnumPurchaseTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PurchaseType'>
    


  /**
   * Reference to a field of type 'PurchaseType[]'
   */
  export type ListEnumPurchaseTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PurchaseType[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: StringFilter<"Student"> | string
    name?: StringFilter<"Student"> | string
    birthDate?: DateTimeNullableFilter<"Student"> | Date | string | null
    gender?: EnumGenderNullableFilter<"Student"> | $Enums.Gender | null
    phone?: StringNullableFilter<"Student"> | string | null
    address?: StringNullableFilter<"Student"> | string | null
    email?: StringNullableFilter<"Student"> | string | null
    guardian?: StringNullableFilter<"Student"> | string | null
    joinedAt?: DateTimeFilter<"Student"> | Date | string
    orgId?: StringFilter<"Student"> | string
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    courses?: StudentCourseListRelationFilter
    payments?: PurchaseListRelationFilter
    progress?: LessonProgressListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    guardian?: SortOrderInput | SortOrder
    joinedAt?: SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    courses?: StudentCourseOrderByRelationAggregateInput
    payments?: PurchaseOrderByRelationAggregateInput
    progress?: LessonProgressOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    name?: StringFilter<"Student"> | string
    birthDate?: DateTimeNullableFilter<"Student"> | Date | string | null
    gender?: EnumGenderNullableFilter<"Student"> | $Enums.Gender | null
    phone?: StringNullableFilter<"Student"> | string | null
    address?: StringNullableFilter<"Student"> | string | null
    email?: StringNullableFilter<"Student"> | string | null
    guardian?: StringNullableFilter<"Student"> | string | null
    joinedAt?: DateTimeFilter<"Student"> | Date | string
    orgId?: StringFilter<"Student"> | string
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    courses?: StudentCourseListRelationFilter
    payments?: PurchaseListRelationFilter
    progress?: LessonProgressListRelationFilter
  }, "id">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    guardian?: SortOrderInput | SortOrder
    joinedAt?: SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Student"> | string
    name?: StringWithAggregatesFilter<"Student"> | string
    birthDate?: DateTimeNullableWithAggregatesFilter<"Student"> | Date | string | null
    gender?: EnumGenderNullableWithAggregatesFilter<"Student"> | $Enums.Gender | null
    phone?: StringNullableWithAggregatesFilter<"Student"> | string | null
    address?: StringNullableWithAggregatesFilter<"Student"> | string | null
    email?: StringNullableWithAggregatesFilter<"Student"> | string | null
    guardian?: StringNullableWithAggregatesFilter<"Student"> | string | null
    joinedAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    orgId?: StringWithAggregatesFilter<"Student"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: StringFilter<"Course"> | string
    name?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    level?: StringNullableFilter<"Course"> | string | null
    orgId?: StringFilter<"Course"> | string
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    lessonBooks?: LessonBookListRelationFilter
    students?: StudentCourseListRelationFilter
    payments?: PurchaseListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    level?: SortOrderInput | SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lessonBooks?: LessonBookOrderByRelationAggregateInput
    students?: StudentCourseOrderByRelationAggregateInput
    payments?: PurchaseOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    name?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    level?: StringNullableFilter<"Course"> | string | null
    orgId?: StringFilter<"Course"> | string
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    lessonBooks?: LessonBookListRelationFilter
    students?: StudentCourseListRelationFilter
    payments?: PurchaseListRelationFilter
  }, "id">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    level?: SortOrderInput | SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Course"> | string
    name?: StringWithAggregatesFilter<"Course"> | string
    description?: StringNullableWithAggregatesFilter<"Course"> | string | null
    level?: StringNullableWithAggregatesFilter<"Course"> | string | null
    orgId?: StringWithAggregatesFilter<"Course"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
  }

  export type LessonBookWhereInput = {
    AND?: LessonBookWhereInput | LessonBookWhereInput[]
    OR?: LessonBookWhereInput[]
    NOT?: LessonBookWhereInput | LessonBookWhereInput[]
    id?: StringFilter<"LessonBook"> | string
    title?: StringFilter<"LessonBook"> | string
    author?: StringNullableFilter<"LessonBook"> | string | null
    price?: FloatFilter<"LessonBook"> | number
    courseId?: StringFilter<"LessonBook"> | string
    createdAt?: DateTimeFilter<"LessonBook"> | Date | string
    updatedAt?: DateTimeFilter<"LessonBook"> | Date | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    progress?: LessonProgressListRelationFilter
  }

  export type LessonBookOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrderInput | SortOrder
    price?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    course?: CourseOrderByWithRelationInput
    progress?: LessonProgressOrderByRelationAggregateInput
  }

  export type LessonBookWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LessonBookWhereInput | LessonBookWhereInput[]
    OR?: LessonBookWhereInput[]
    NOT?: LessonBookWhereInput | LessonBookWhereInput[]
    title?: StringFilter<"LessonBook"> | string
    author?: StringNullableFilter<"LessonBook"> | string | null
    price?: FloatFilter<"LessonBook"> | number
    courseId?: StringFilter<"LessonBook"> | string
    createdAt?: DateTimeFilter<"LessonBook"> | Date | string
    updatedAt?: DateTimeFilter<"LessonBook"> | Date | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    progress?: LessonProgressListRelationFilter
  }, "id">

  export type LessonBookOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrderInput | SortOrder
    price?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LessonBookCountOrderByAggregateInput
    _avg?: LessonBookAvgOrderByAggregateInput
    _max?: LessonBookMaxOrderByAggregateInput
    _min?: LessonBookMinOrderByAggregateInput
    _sum?: LessonBookSumOrderByAggregateInput
  }

  export type LessonBookScalarWhereWithAggregatesInput = {
    AND?: LessonBookScalarWhereWithAggregatesInput | LessonBookScalarWhereWithAggregatesInput[]
    OR?: LessonBookScalarWhereWithAggregatesInput[]
    NOT?: LessonBookScalarWhereWithAggregatesInput | LessonBookScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LessonBook"> | string
    title?: StringWithAggregatesFilter<"LessonBook"> | string
    author?: StringNullableWithAggregatesFilter<"LessonBook"> | string | null
    price?: FloatWithAggregatesFilter<"LessonBook"> | number
    courseId?: StringWithAggregatesFilter<"LessonBook"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LessonBook"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LessonBook"> | Date | string
  }

  export type StudentCourseWhereInput = {
    AND?: StudentCourseWhereInput | StudentCourseWhereInput[]
    OR?: StudentCourseWhereInput[]
    NOT?: StudentCourseWhereInput | StudentCourseWhereInput[]
    id?: StringFilter<"StudentCourse"> | string
    studentId?: StringFilter<"StudentCourse"> | string
    courseId?: StringFilter<"StudentCourse"> | string
    enrolledAt?: DateTimeFilter<"StudentCourse"> | Date | string
    status?: EnumCourseStatusFilter<"StudentCourse"> | $Enums.CourseStatus
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    statusLogs?: CourseStatusLogListRelationFilter
  }

  export type StudentCourseOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    enrolledAt?: SortOrder
    status?: SortOrder
    student?: StudentOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
    statusLogs?: CourseStatusLogOrderByRelationAggregateInput
  }

  export type StudentCourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_courseId?: StudentCourseStudentIdCourseIdCompoundUniqueInput
    AND?: StudentCourseWhereInput | StudentCourseWhereInput[]
    OR?: StudentCourseWhereInput[]
    NOT?: StudentCourseWhereInput | StudentCourseWhereInput[]
    studentId?: StringFilter<"StudentCourse"> | string
    courseId?: StringFilter<"StudentCourse"> | string
    enrolledAt?: DateTimeFilter<"StudentCourse"> | Date | string
    status?: EnumCourseStatusFilter<"StudentCourse"> | $Enums.CourseStatus
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    statusLogs?: CourseStatusLogListRelationFilter
  }, "id" | "studentId_courseId">

  export type StudentCourseOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    enrolledAt?: SortOrder
    status?: SortOrder
    _count?: StudentCourseCountOrderByAggregateInput
    _max?: StudentCourseMaxOrderByAggregateInput
    _min?: StudentCourseMinOrderByAggregateInput
  }

  export type StudentCourseScalarWhereWithAggregatesInput = {
    AND?: StudentCourseScalarWhereWithAggregatesInput | StudentCourseScalarWhereWithAggregatesInput[]
    OR?: StudentCourseScalarWhereWithAggregatesInput[]
    NOT?: StudentCourseScalarWhereWithAggregatesInput | StudentCourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StudentCourse"> | string
    studentId?: StringWithAggregatesFilter<"StudentCourse"> | string
    courseId?: StringWithAggregatesFilter<"StudentCourse"> | string
    enrolledAt?: DateTimeWithAggregatesFilter<"StudentCourse"> | Date | string
    status?: EnumCourseStatusWithAggregatesFilter<"StudentCourse"> | $Enums.CourseStatus
  }

  export type CourseStatusLogWhereInput = {
    AND?: CourseStatusLogWhereInput | CourseStatusLogWhereInput[]
    OR?: CourseStatusLogWhereInput[]
    NOT?: CourseStatusLogWhereInput | CourseStatusLogWhereInput[]
    id?: StringFilter<"CourseStatusLog"> | string
    studentCourseId?: StringFilter<"CourseStatusLog"> | string
    status?: EnumCourseStatusFilter<"CourseStatusLog"> | $Enums.CourseStatus
    changedAt?: DateTimeFilter<"CourseStatusLog"> | Date | string
    note?: StringNullableFilter<"CourseStatusLog"> | string | null
    studentCourse?: XOR<StudentCourseScalarRelationFilter, StudentCourseWhereInput>
  }

  export type CourseStatusLogOrderByWithRelationInput = {
    id?: SortOrder
    studentCourseId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    note?: SortOrderInput | SortOrder
    studentCourse?: StudentCourseOrderByWithRelationInput
  }

  export type CourseStatusLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CourseStatusLogWhereInput | CourseStatusLogWhereInput[]
    OR?: CourseStatusLogWhereInput[]
    NOT?: CourseStatusLogWhereInput | CourseStatusLogWhereInput[]
    studentCourseId?: StringFilter<"CourseStatusLog"> | string
    status?: EnumCourseStatusFilter<"CourseStatusLog"> | $Enums.CourseStatus
    changedAt?: DateTimeFilter<"CourseStatusLog"> | Date | string
    note?: StringNullableFilter<"CourseStatusLog"> | string | null
    studentCourse?: XOR<StudentCourseScalarRelationFilter, StudentCourseWhereInput>
  }, "id">

  export type CourseStatusLogOrderByWithAggregationInput = {
    id?: SortOrder
    studentCourseId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    note?: SortOrderInput | SortOrder
    _count?: CourseStatusLogCountOrderByAggregateInput
    _max?: CourseStatusLogMaxOrderByAggregateInput
    _min?: CourseStatusLogMinOrderByAggregateInput
  }

  export type CourseStatusLogScalarWhereWithAggregatesInput = {
    AND?: CourseStatusLogScalarWhereWithAggregatesInput | CourseStatusLogScalarWhereWithAggregatesInput[]
    OR?: CourseStatusLogScalarWhereWithAggregatesInput[]
    NOT?: CourseStatusLogScalarWhereWithAggregatesInput | CourseStatusLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CourseStatusLog"> | string
    studentCourseId?: StringWithAggregatesFilter<"CourseStatusLog"> | string
    status?: EnumCourseStatusWithAggregatesFilter<"CourseStatusLog"> | $Enums.CourseStatus
    changedAt?: DateTimeWithAggregatesFilter<"CourseStatusLog"> | Date | string
    note?: StringNullableWithAggregatesFilter<"CourseStatusLog"> | string | null
  }

  export type LessonProgressWhereInput = {
    AND?: LessonProgressWhereInput | LessonProgressWhereInput[]
    OR?: LessonProgressWhereInput[]
    NOT?: LessonProgressWhereInput | LessonProgressWhereInput[]
    id?: StringFilter<"LessonProgress"> | string
    studentId?: StringFilter<"LessonProgress"> | string
    lessonBookId?: StringFilter<"LessonProgress"> | string
    completed?: BoolFilter<"LessonProgress"> | boolean
    completedAt?: DateTimeNullableFilter<"LessonProgress"> | Date | string | null
    notes?: StringNullableFilter<"LessonProgress"> | string | null
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    lessonBook?: XOR<LessonBookScalarRelationFilter, LessonBookWhereInput>
  }

  export type LessonProgressOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    lessonBookId?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    student?: StudentOrderByWithRelationInput
    lessonBook?: LessonBookOrderByWithRelationInput
  }

  export type LessonProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_lessonBookId?: LessonProgressStudentIdLessonBookIdCompoundUniqueInput
    AND?: LessonProgressWhereInput | LessonProgressWhereInput[]
    OR?: LessonProgressWhereInput[]
    NOT?: LessonProgressWhereInput | LessonProgressWhereInput[]
    studentId?: StringFilter<"LessonProgress"> | string
    lessonBookId?: StringFilter<"LessonProgress"> | string
    completed?: BoolFilter<"LessonProgress"> | boolean
    completedAt?: DateTimeNullableFilter<"LessonProgress"> | Date | string | null
    notes?: StringNullableFilter<"LessonProgress"> | string | null
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    lessonBook?: XOR<LessonBookScalarRelationFilter, LessonBookWhereInput>
  }, "id" | "studentId_lessonBookId">

  export type LessonProgressOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    lessonBookId?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: LessonProgressCountOrderByAggregateInput
    _max?: LessonProgressMaxOrderByAggregateInput
    _min?: LessonProgressMinOrderByAggregateInput
  }

  export type LessonProgressScalarWhereWithAggregatesInput = {
    AND?: LessonProgressScalarWhereWithAggregatesInput | LessonProgressScalarWhereWithAggregatesInput[]
    OR?: LessonProgressScalarWhereWithAggregatesInput[]
    NOT?: LessonProgressScalarWhereWithAggregatesInput | LessonProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LessonProgress"> | string
    studentId?: StringWithAggregatesFilter<"LessonProgress"> | string
    lessonBookId?: StringWithAggregatesFilter<"LessonProgress"> | string
    completed?: BoolWithAggregatesFilter<"LessonProgress"> | boolean
    completedAt?: DateTimeNullableWithAggregatesFilter<"LessonProgress"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"LessonProgress"> | string | null
  }

  export type PurchaseWhereInput = {
    AND?: PurchaseWhereInput | PurchaseWhereInput[]
    OR?: PurchaseWhereInput[]
    NOT?: PurchaseWhereInput | PurchaseWhereInput[]
    id?: StringFilter<"Purchase"> | string
    studentId?: StringFilter<"Purchase"> | string
    courseId?: StringNullableFilter<"Purchase"> | string | null
    type?: EnumPurchaseTypeFilter<"Purchase"> | $Enums.PurchaseType
    amount?: FloatFilter<"Purchase"> | number
    description?: StringNullableFilter<"Purchase"> | string | null
    paidAt?: DateTimeFilter<"Purchase"> | Date | string
    forMonth?: DateTimeNullableFilter<"Purchase"> | Date | string | null
    method?: EnumPaymentMethodFilter<"Purchase"> | $Enums.PaymentMethod
    invoiceId?: StringNullableFilter<"Purchase"> | string | null
    orgId?: StringFilter<"Purchase"> | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    course?: XOR<CourseNullableScalarRelationFilter, CourseWhereInput> | null
  }

  export type PurchaseOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrderInput | SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    paidAt?: SortOrder
    forMonth?: SortOrderInput | SortOrder
    method?: SortOrder
    invoiceId?: SortOrderInput | SortOrder
    orgId?: SortOrder
    student?: StudentOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
  }

  export type PurchaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PurchaseWhereInput | PurchaseWhereInput[]
    OR?: PurchaseWhereInput[]
    NOT?: PurchaseWhereInput | PurchaseWhereInput[]
    studentId?: StringFilter<"Purchase"> | string
    courseId?: StringNullableFilter<"Purchase"> | string | null
    type?: EnumPurchaseTypeFilter<"Purchase"> | $Enums.PurchaseType
    amount?: FloatFilter<"Purchase"> | number
    description?: StringNullableFilter<"Purchase"> | string | null
    paidAt?: DateTimeFilter<"Purchase"> | Date | string
    forMonth?: DateTimeNullableFilter<"Purchase"> | Date | string | null
    method?: EnumPaymentMethodFilter<"Purchase"> | $Enums.PaymentMethod
    invoiceId?: StringNullableFilter<"Purchase"> | string | null
    orgId?: StringFilter<"Purchase"> | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    course?: XOR<CourseNullableScalarRelationFilter, CourseWhereInput> | null
  }, "id">

  export type PurchaseOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrderInput | SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    paidAt?: SortOrder
    forMonth?: SortOrderInput | SortOrder
    method?: SortOrder
    invoiceId?: SortOrderInput | SortOrder
    orgId?: SortOrder
    _count?: PurchaseCountOrderByAggregateInput
    _avg?: PurchaseAvgOrderByAggregateInput
    _max?: PurchaseMaxOrderByAggregateInput
    _min?: PurchaseMinOrderByAggregateInput
    _sum?: PurchaseSumOrderByAggregateInput
  }

  export type PurchaseScalarWhereWithAggregatesInput = {
    AND?: PurchaseScalarWhereWithAggregatesInput | PurchaseScalarWhereWithAggregatesInput[]
    OR?: PurchaseScalarWhereWithAggregatesInput[]
    NOT?: PurchaseScalarWhereWithAggregatesInput | PurchaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Purchase"> | string
    studentId?: StringWithAggregatesFilter<"Purchase"> | string
    courseId?: StringNullableWithAggregatesFilter<"Purchase"> | string | null
    type?: EnumPurchaseTypeWithAggregatesFilter<"Purchase"> | $Enums.PurchaseType
    amount?: FloatWithAggregatesFilter<"Purchase"> | number
    description?: StringNullableWithAggregatesFilter<"Purchase"> | string | null
    paidAt?: DateTimeWithAggregatesFilter<"Purchase"> | Date | string
    forMonth?: DateTimeNullableWithAggregatesFilter<"Purchase"> | Date | string | null
    method?: EnumPaymentMethodWithAggregatesFilter<"Purchase"> | $Enums.PaymentMethod
    invoiceId?: StringNullableWithAggregatesFilter<"Purchase"> | string | null
    orgId?: StringWithAggregatesFilter<"Purchase"> | string
  }

  export type StudentCreateInput = {
    id?: string
    name: string
    birthDate?: Date | string | null
    gender?: $Enums.Gender | null
    phone?: string | null
    address?: string | null
    email?: string | null
    guardian?: string | null
    joinedAt?: Date | string
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: StudentCourseCreateNestedManyWithoutStudentInput
    payments?: PurchaseCreateNestedManyWithoutStudentInput
    progress?: LessonProgressCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: string
    name: string
    birthDate?: Date | string | null
    gender?: $Enums.Gender | null
    phone?: string | null
    address?: string | null
    email?: string | null
    guardian?: string | null
    joinedAt?: Date | string
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: StudentCourseUncheckedCreateNestedManyWithoutStudentInput
    payments?: PurchaseUncheckedCreateNestedManyWithoutStudentInput
    progress?: LessonProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    guardian?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: StudentCourseUpdateManyWithoutStudentNestedInput
    payments?: PurchaseUpdateManyWithoutStudentNestedInput
    progress?: LessonProgressUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    guardian?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: StudentCourseUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PurchaseUncheckedUpdateManyWithoutStudentNestedInput
    progress?: LessonProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: string
    name: string
    birthDate?: Date | string | null
    gender?: $Enums.Gender | null
    phone?: string | null
    address?: string | null
    email?: string | null
    guardian?: string | null
    joinedAt?: Date | string
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    guardian?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    guardian?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseCreateInput = {
    id?: string
    name: string
    description?: string | null
    level?: string | null
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lessonBooks?: LessonBookCreateNestedManyWithoutCourseInput
    students?: StudentCourseCreateNestedManyWithoutCourseInput
    payments?: PurchaseCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    level?: string | null
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lessonBooks?: LessonBookUncheckedCreateNestedManyWithoutCourseInput
    students?: StudentCourseUncheckedCreateNestedManyWithoutCourseInput
    payments?: PurchaseUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessonBooks?: LessonBookUpdateManyWithoutCourseNestedInput
    students?: StudentCourseUpdateManyWithoutCourseNestedInput
    payments?: PurchaseUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessonBooks?: LessonBookUncheckedUpdateManyWithoutCourseNestedInput
    students?: StudentCourseUncheckedUpdateManyWithoutCourseNestedInput
    payments?: PurchaseUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    level?: string | null
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonBookCreateInput = {
    id?: string
    title: string
    author?: string | null
    price?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    course: CourseCreateNestedOneWithoutLessonBooksInput
    progress?: LessonProgressCreateNestedManyWithoutLessonBookInput
  }

  export type LessonBookUncheckedCreateInput = {
    id?: string
    title: string
    author?: string | null
    price?: number
    courseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    progress?: LessonProgressUncheckedCreateNestedManyWithoutLessonBookInput
  }

  export type LessonBookUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutLessonBooksNestedInput
    progress?: LessonProgressUpdateManyWithoutLessonBookNestedInput
  }

  export type LessonBookUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    courseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: LessonProgressUncheckedUpdateManyWithoutLessonBookNestedInput
  }

  export type LessonBookCreateManyInput = {
    id?: string
    title: string
    author?: string | null
    price?: number
    courseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LessonBookUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonBookUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    courseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCourseCreateInput = {
    id?: string
    enrolledAt?: Date | string
    status?: $Enums.CourseStatus
    student: StudentCreateNestedOneWithoutCoursesInput
    course: CourseCreateNestedOneWithoutStudentsInput
    statusLogs?: CourseStatusLogCreateNestedManyWithoutStudentCourseInput
  }

  export type StudentCourseUncheckedCreateInput = {
    id?: string
    studentId: string
    courseId: string
    enrolledAt?: Date | string
    status?: $Enums.CourseStatus
    statusLogs?: CourseStatusLogUncheckedCreateNestedManyWithoutStudentCourseInput
  }

  export type StudentCourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
    student?: StudentUpdateOneRequiredWithoutCoursesNestedInput
    course?: CourseUpdateOneRequiredWithoutStudentsNestedInput
    statusLogs?: CourseStatusLogUpdateManyWithoutStudentCourseNestedInput
  }

  export type StudentCourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
    statusLogs?: CourseStatusLogUncheckedUpdateManyWithoutStudentCourseNestedInput
  }

  export type StudentCourseCreateManyInput = {
    id?: string
    studentId: string
    courseId: string
    enrolledAt?: Date | string
    status?: $Enums.CourseStatus
  }

  export type StudentCourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
  }

  export type StudentCourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
  }

  export type CourseStatusLogCreateInput = {
    id?: string
    status: $Enums.CourseStatus
    changedAt?: Date | string
    note?: string | null
    studentCourse: StudentCourseCreateNestedOneWithoutStatusLogsInput
  }

  export type CourseStatusLogUncheckedCreateInput = {
    id?: string
    studentCourseId: string
    status: $Enums.CourseStatus
    changedAt?: Date | string
    note?: string | null
  }

  export type CourseStatusLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    studentCourse?: StudentCourseUpdateOneRequiredWithoutStatusLogsNestedInput
  }

  export type CourseStatusLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentCourseId?: StringFieldUpdateOperationsInput | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CourseStatusLogCreateManyInput = {
    id?: string
    studentCourseId: string
    status: $Enums.CourseStatus
    changedAt?: Date | string
    note?: string | null
  }

  export type CourseStatusLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CourseStatusLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentCourseId?: StringFieldUpdateOperationsInput | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonProgressCreateInput = {
    id?: string
    completed?: boolean
    completedAt?: Date | string | null
    notes?: string | null
    student: StudentCreateNestedOneWithoutProgressInput
    lessonBook: LessonBookCreateNestedOneWithoutProgressInput
  }

  export type LessonProgressUncheckedCreateInput = {
    id?: string
    studentId: string
    lessonBookId: string
    completed?: boolean
    completedAt?: Date | string | null
    notes?: string | null
  }

  export type LessonProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    student?: StudentUpdateOneRequiredWithoutProgressNestedInput
    lessonBook?: LessonBookUpdateOneRequiredWithoutProgressNestedInput
  }

  export type LessonProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    lessonBookId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonProgressCreateManyInput = {
    id?: string
    studentId: string
    lessonBookId: string
    completed?: boolean
    completedAt?: Date | string | null
    notes?: string | null
  }

  export type LessonProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    lessonBookId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PurchaseCreateInput = {
    id?: string
    type: $Enums.PurchaseType
    amount: number
    description?: string | null
    paidAt?: Date | string
    forMonth?: Date | string | null
    method?: $Enums.PaymentMethod
    invoiceId?: string | null
    orgId: string
    student: StudentCreateNestedOneWithoutPaymentsInput
    course?: CourseCreateNestedOneWithoutPaymentsInput
  }

  export type PurchaseUncheckedCreateInput = {
    id?: string
    studentId: string
    courseId?: string | null
    type: $Enums.PurchaseType
    amount: number
    description?: string | null
    paidAt?: Date | string
    forMonth?: Date | string | null
    method?: $Enums.PaymentMethod
    invoiceId?: string | null
    orgId: string
  }

  export type PurchaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPurchaseTypeFieldUpdateOperationsInput | $Enums.PurchaseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    forMonth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
    student?: StudentUpdateOneRequiredWithoutPaymentsNestedInput
    course?: CourseUpdateOneWithoutPaymentsNestedInput
  }

  export type PurchaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumPurchaseTypeFieldUpdateOperationsInput | $Enums.PurchaseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    forMonth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
  }

  export type PurchaseCreateManyInput = {
    id?: string
    studentId: string
    courseId?: string | null
    type: $Enums.PurchaseType
    amount: number
    description?: string | null
    paidAt?: Date | string
    forMonth?: Date | string | null
    method?: $Enums.PaymentMethod
    invoiceId?: string | null
    orgId: string
  }

  export type PurchaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPurchaseTypeFieldUpdateOperationsInput | $Enums.PurchaseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    forMonth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
  }

  export type PurchaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumPurchaseTypeFieldUpdateOperationsInput | $Enums.PurchaseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    forMonth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StudentCourseListRelationFilter = {
    every?: StudentCourseWhereInput
    some?: StudentCourseWhereInput
    none?: StudentCourseWhereInput
  }

  export type PurchaseListRelationFilter = {
    every?: PurchaseWhereInput
    some?: PurchaseWhereInput
    none?: PurchaseWhereInput
  }

  export type LessonProgressListRelationFilter = {
    every?: LessonProgressWhereInput
    some?: LessonProgressWhereInput
    none?: LessonProgressWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StudentCourseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PurchaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LessonProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    gender?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    email?: SortOrder
    guardian?: SortOrder
    joinedAt?: SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    gender?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    email?: SortOrder
    guardian?: SortOrder
    joinedAt?: SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    gender?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    email?: SortOrder
    guardian?: SortOrder
    joinedAt?: SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type LessonBookListRelationFilter = {
    every?: LessonBookWhereInput
    some?: LessonBookWhereInput
    none?: LessonBookWhereInput
  }

  export type LessonBookOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    level?: SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    level?: SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    level?: SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type LessonBookCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    price?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LessonBookAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type LessonBookMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    price?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LessonBookMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    price?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LessonBookSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumCourseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CourseStatus | EnumCourseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CourseStatus[] | ListEnumCourseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CourseStatus[] | ListEnumCourseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCourseStatusFilter<$PrismaModel> | $Enums.CourseStatus
  }

  export type StudentScalarRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type CourseStatusLogListRelationFilter = {
    every?: CourseStatusLogWhereInput
    some?: CourseStatusLogWhereInput
    none?: CourseStatusLogWhereInput
  }

  export type CourseStatusLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCourseStudentIdCourseIdCompoundUniqueInput = {
    studentId: string
    courseId: string
  }

  export type StudentCourseCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    enrolledAt?: SortOrder
    status?: SortOrder
  }

  export type StudentCourseMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    enrolledAt?: SortOrder
    status?: SortOrder
  }

  export type StudentCourseMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    enrolledAt?: SortOrder
    status?: SortOrder
  }

  export type EnumCourseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CourseStatus | EnumCourseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CourseStatus[] | ListEnumCourseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CourseStatus[] | ListEnumCourseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCourseStatusWithAggregatesFilter<$PrismaModel> | $Enums.CourseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCourseStatusFilter<$PrismaModel>
    _max?: NestedEnumCourseStatusFilter<$PrismaModel>
  }

  export type StudentCourseScalarRelationFilter = {
    is?: StudentCourseWhereInput
    isNot?: StudentCourseWhereInput
  }

  export type CourseStatusLogCountOrderByAggregateInput = {
    id?: SortOrder
    studentCourseId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    note?: SortOrder
  }

  export type CourseStatusLogMaxOrderByAggregateInput = {
    id?: SortOrder
    studentCourseId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    note?: SortOrder
  }

  export type CourseStatusLogMinOrderByAggregateInput = {
    id?: SortOrder
    studentCourseId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    note?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type LessonBookScalarRelationFilter = {
    is?: LessonBookWhereInput
    isNot?: LessonBookWhereInput
  }

  export type LessonProgressStudentIdLessonBookIdCompoundUniqueInput = {
    studentId: string
    lessonBookId: string
  }

  export type LessonProgressCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    lessonBookId?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    notes?: SortOrder
  }

  export type LessonProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    lessonBookId?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    notes?: SortOrder
  }

  export type LessonProgressMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    lessonBookId?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    notes?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumPurchaseTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PurchaseType | EnumPurchaseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PurchaseType[] | ListEnumPurchaseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PurchaseType[] | ListEnumPurchaseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPurchaseTypeFilter<$PrismaModel> | $Enums.PurchaseType
  }

  export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type CourseNullableScalarRelationFilter = {
    is?: CourseWhereInput | null
    isNot?: CourseWhereInput | null
  }

  export type PurchaseCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    paidAt?: SortOrder
    forMonth?: SortOrder
    method?: SortOrder
    invoiceId?: SortOrder
    orgId?: SortOrder
  }

  export type PurchaseAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PurchaseMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    paidAt?: SortOrder
    forMonth?: SortOrder
    method?: SortOrder
    invoiceId?: SortOrder
    orgId?: SortOrder
  }

  export type PurchaseMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    paidAt?: SortOrder
    forMonth?: SortOrder
    method?: SortOrder
    invoiceId?: SortOrder
    orgId?: SortOrder
  }

  export type PurchaseSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPurchaseTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PurchaseType | EnumPurchaseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PurchaseType[] | ListEnumPurchaseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PurchaseType[] | ListEnumPurchaseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPurchaseTypeWithAggregatesFilter<$PrismaModel> | $Enums.PurchaseType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPurchaseTypeFilter<$PrismaModel>
    _max?: NestedEnumPurchaseTypeFilter<$PrismaModel>
  }

  export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type StudentCourseCreateNestedManyWithoutStudentInput = {
    create?: XOR<StudentCourseCreateWithoutStudentInput, StudentCourseUncheckedCreateWithoutStudentInput> | StudentCourseCreateWithoutStudentInput[] | StudentCourseUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentCourseCreateOrConnectWithoutStudentInput | StudentCourseCreateOrConnectWithoutStudentInput[]
    createMany?: StudentCourseCreateManyStudentInputEnvelope
    connect?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
  }

  export type PurchaseCreateNestedManyWithoutStudentInput = {
    create?: XOR<PurchaseCreateWithoutStudentInput, PurchaseUncheckedCreateWithoutStudentInput> | PurchaseCreateWithoutStudentInput[] | PurchaseUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PurchaseCreateOrConnectWithoutStudentInput | PurchaseCreateOrConnectWithoutStudentInput[]
    createMany?: PurchaseCreateManyStudentInputEnvelope
    connect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
  }

  export type LessonProgressCreateNestedManyWithoutStudentInput = {
    create?: XOR<LessonProgressCreateWithoutStudentInput, LessonProgressUncheckedCreateWithoutStudentInput> | LessonProgressCreateWithoutStudentInput[] | LessonProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutStudentInput | LessonProgressCreateOrConnectWithoutStudentInput[]
    createMany?: LessonProgressCreateManyStudentInputEnvelope
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
  }

  export type StudentCourseUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<StudentCourseCreateWithoutStudentInput, StudentCourseUncheckedCreateWithoutStudentInput> | StudentCourseCreateWithoutStudentInput[] | StudentCourseUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentCourseCreateOrConnectWithoutStudentInput | StudentCourseCreateOrConnectWithoutStudentInput[]
    createMany?: StudentCourseCreateManyStudentInputEnvelope
    connect?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
  }

  export type PurchaseUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<PurchaseCreateWithoutStudentInput, PurchaseUncheckedCreateWithoutStudentInput> | PurchaseCreateWithoutStudentInput[] | PurchaseUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PurchaseCreateOrConnectWithoutStudentInput | PurchaseCreateOrConnectWithoutStudentInput[]
    createMany?: PurchaseCreateManyStudentInputEnvelope
    connect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
  }

  export type LessonProgressUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<LessonProgressCreateWithoutStudentInput, LessonProgressUncheckedCreateWithoutStudentInput> | LessonProgressCreateWithoutStudentInput[] | LessonProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutStudentInput | LessonProgressCreateOrConnectWithoutStudentInput[]
    createMany?: LessonProgressCreateManyStudentInputEnvelope
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableEnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StudentCourseUpdateManyWithoutStudentNestedInput = {
    create?: XOR<StudentCourseCreateWithoutStudentInput, StudentCourseUncheckedCreateWithoutStudentInput> | StudentCourseCreateWithoutStudentInput[] | StudentCourseUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentCourseCreateOrConnectWithoutStudentInput | StudentCourseCreateOrConnectWithoutStudentInput[]
    upsert?: StudentCourseUpsertWithWhereUniqueWithoutStudentInput | StudentCourseUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: StudentCourseCreateManyStudentInputEnvelope
    set?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    disconnect?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    delete?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    connect?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    update?: StudentCourseUpdateWithWhereUniqueWithoutStudentInput | StudentCourseUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: StudentCourseUpdateManyWithWhereWithoutStudentInput | StudentCourseUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: StudentCourseScalarWhereInput | StudentCourseScalarWhereInput[]
  }

  export type PurchaseUpdateManyWithoutStudentNestedInput = {
    create?: XOR<PurchaseCreateWithoutStudentInput, PurchaseUncheckedCreateWithoutStudentInput> | PurchaseCreateWithoutStudentInput[] | PurchaseUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PurchaseCreateOrConnectWithoutStudentInput | PurchaseCreateOrConnectWithoutStudentInput[]
    upsert?: PurchaseUpsertWithWhereUniqueWithoutStudentInput | PurchaseUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: PurchaseCreateManyStudentInputEnvelope
    set?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    disconnect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    delete?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    connect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    update?: PurchaseUpdateWithWhereUniqueWithoutStudentInput | PurchaseUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: PurchaseUpdateManyWithWhereWithoutStudentInput | PurchaseUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: PurchaseScalarWhereInput | PurchaseScalarWhereInput[]
  }

  export type LessonProgressUpdateManyWithoutStudentNestedInput = {
    create?: XOR<LessonProgressCreateWithoutStudentInput, LessonProgressUncheckedCreateWithoutStudentInput> | LessonProgressCreateWithoutStudentInput[] | LessonProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutStudentInput | LessonProgressCreateOrConnectWithoutStudentInput[]
    upsert?: LessonProgressUpsertWithWhereUniqueWithoutStudentInput | LessonProgressUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: LessonProgressCreateManyStudentInputEnvelope
    set?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    disconnect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    delete?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    update?: LessonProgressUpdateWithWhereUniqueWithoutStudentInput | LessonProgressUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: LessonProgressUpdateManyWithWhereWithoutStudentInput | LessonProgressUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[]
  }

  export type StudentCourseUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<StudentCourseCreateWithoutStudentInput, StudentCourseUncheckedCreateWithoutStudentInput> | StudentCourseCreateWithoutStudentInput[] | StudentCourseUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentCourseCreateOrConnectWithoutStudentInput | StudentCourseCreateOrConnectWithoutStudentInput[]
    upsert?: StudentCourseUpsertWithWhereUniqueWithoutStudentInput | StudentCourseUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: StudentCourseCreateManyStudentInputEnvelope
    set?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    disconnect?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    delete?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    connect?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    update?: StudentCourseUpdateWithWhereUniqueWithoutStudentInput | StudentCourseUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: StudentCourseUpdateManyWithWhereWithoutStudentInput | StudentCourseUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: StudentCourseScalarWhereInput | StudentCourseScalarWhereInput[]
  }

  export type PurchaseUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<PurchaseCreateWithoutStudentInput, PurchaseUncheckedCreateWithoutStudentInput> | PurchaseCreateWithoutStudentInput[] | PurchaseUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PurchaseCreateOrConnectWithoutStudentInput | PurchaseCreateOrConnectWithoutStudentInput[]
    upsert?: PurchaseUpsertWithWhereUniqueWithoutStudentInput | PurchaseUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: PurchaseCreateManyStudentInputEnvelope
    set?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    disconnect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    delete?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    connect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    update?: PurchaseUpdateWithWhereUniqueWithoutStudentInput | PurchaseUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: PurchaseUpdateManyWithWhereWithoutStudentInput | PurchaseUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: PurchaseScalarWhereInput | PurchaseScalarWhereInput[]
  }

  export type LessonProgressUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<LessonProgressCreateWithoutStudentInput, LessonProgressUncheckedCreateWithoutStudentInput> | LessonProgressCreateWithoutStudentInput[] | LessonProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutStudentInput | LessonProgressCreateOrConnectWithoutStudentInput[]
    upsert?: LessonProgressUpsertWithWhereUniqueWithoutStudentInput | LessonProgressUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: LessonProgressCreateManyStudentInputEnvelope
    set?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    disconnect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    delete?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    update?: LessonProgressUpdateWithWhereUniqueWithoutStudentInput | LessonProgressUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: LessonProgressUpdateManyWithWhereWithoutStudentInput | LessonProgressUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[]
  }

  export type LessonBookCreateNestedManyWithoutCourseInput = {
    create?: XOR<LessonBookCreateWithoutCourseInput, LessonBookUncheckedCreateWithoutCourseInput> | LessonBookCreateWithoutCourseInput[] | LessonBookUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: LessonBookCreateOrConnectWithoutCourseInput | LessonBookCreateOrConnectWithoutCourseInput[]
    createMany?: LessonBookCreateManyCourseInputEnvelope
    connect?: LessonBookWhereUniqueInput | LessonBookWhereUniqueInput[]
  }

  export type StudentCourseCreateNestedManyWithoutCourseInput = {
    create?: XOR<StudentCourseCreateWithoutCourseInput, StudentCourseUncheckedCreateWithoutCourseInput> | StudentCourseCreateWithoutCourseInput[] | StudentCourseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: StudentCourseCreateOrConnectWithoutCourseInput | StudentCourseCreateOrConnectWithoutCourseInput[]
    createMany?: StudentCourseCreateManyCourseInputEnvelope
    connect?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
  }

  export type PurchaseCreateNestedManyWithoutCourseInput = {
    create?: XOR<PurchaseCreateWithoutCourseInput, PurchaseUncheckedCreateWithoutCourseInput> | PurchaseCreateWithoutCourseInput[] | PurchaseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: PurchaseCreateOrConnectWithoutCourseInput | PurchaseCreateOrConnectWithoutCourseInput[]
    createMany?: PurchaseCreateManyCourseInputEnvelope
    connect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
  }

  export type LessonBookUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<LessonBookCreateWithoutCourseInput, LessonBookUncheckedCreateWithoutCourseInput> | LessonBookCreateWithoutCourseInput[] | LessonBookUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: LessonBookCreateOrConnectWithoutCourseInput | LessonBookCreateOrConnectWithoutCourseInput[]
    createMany?: LessonBookCreateManyCourseInputEnvelope
    connect?: LessonBookWhereUniqueInput | LessonBookWhereUniqueInput[]
  }

  export type StudentCourseUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<StudentCourseCreateWithoutCourseInput, StudentCourseUncheckedCreateWithoutCourseInput> | StudentCourseCreateWithoutCourseInput[] | StudentCourseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: StudentCourseCreateOrConnectWithoutCourseInput | StudentCourseCreateOrConnectWithoutCourseInput[]
    createMany?: StudentCourseCreateManyCourseInputEnvelope
    connect?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
  }

  export type PurchaseUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<PurchaseCreateWithoutCourseInput, PurchaseUncheckedCreateWithoutCourseInput> | PurchaseCreateWithoutCourseInput[] | PurchaseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: PurchaseCreateOrConnectWithoutCourseInput | PurchaseCreateOrConnectWithoutCourseInput[]
    createMany?: PurchaseCreateManyCourseInputEnvelope
    connect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
  }

  export type LessonBookUpdateManyWithoutCourseNestedInput = {
    create?: XOR<LessonBookCreateWithoutCourseInput, LessonBookUncheckedCreateWithoutCourseInput> | LessonBookCreateWithoutCourseInput[] | LessonBookUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: LessonBookCreateOrConnectWithoutCourseInput | LessonBookCreateOrConnectWithoutCourseInput[]
    upsert?: LessonBookUpsertWithWhereUniqueWithoutCourseInput | LessonBookUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: LessonBookCreateManyCourseInputEnvelope
    set?: LessonBookWhereUniqueInput | LessonBookWhereUniqueInput[]
    disconnect?: LessonBookWhereUniqueInput | LessonBookWhereUniqueInput[]
    delete?: LessonBookWhereUniqueInput | LessonBookWhereUniqueInput[]
    connect?: LessonBookWhereUniqueInput | LessonBookWhereUniqueInput[]
    update?: LessonBookUpdateWithWhereUniqueWithoutCourseInput | LessonBookUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: LessonBookUpdateManyWithWhereWithoutCourseInput | LessonBookUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: LessonBookScalarWhereInput | LessonBookScalarWhereInput[]
  }

  export type StudentCourseUpdateManyWithoutCourseNestedInput = {
    create?: XOR<StudentCourseCreateWithoutCourseInput, StudentCourseUncheckedCreateWithoutCourseInput> | StudentCourseCreateWithoutCourseInput[] | StudentCourseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: StudentCourseCreateOrConnectWithoutCourseInput | StudentCourseCreateOrConnectWithoutCourseInput[]
    upsert?: StudentCourseUpsertWithWhereUniqueWithoutCourseInput | StudentCourseUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: StudentCourseCreateManyCourseInputEnvelope
    set?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    disconnect?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    delete?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    connect?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    update?: StudentCourseUpdateWithWhereUniqueWithoutCourseInput | StudentCourseUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: StudentCourseUpdateManyWithWhereWithoutCourseInput | StudentCourseUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: StudentCourseScalarWhereInput | StudentCourseScalarWhereInput[]
  }

  export type PurchaseUpdateManyWithoutCourseNestedInput = {
    create?: XOR<PurchaseCreateWithoutCourseInput, PurchaseUncheckedCreateWithoutCourseInput> | PurchaseCreateWithoutCourseInput[] | PurchaseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: PurchaseCreateOrConnectWithoutCourseInput | PurchaseCreateOrConnectWithoutCourseInput[]
    upsert?: PurchaseUpsertWithWhereUniqueWithoutCourseInput | PurchaseUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: PurchaseCreateManyCourseInputEnvelope
    set?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    disconnect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    delete?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    connect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    update?: PurchaseUpdateWithWhereUniqueWithoutCourseInput | PurchaseUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: PurchaseUpdateManyWithWhereWithoutCourseInput | PurchaseUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: PurchaseScalarWhereInput | PurchaseScalarWhereInput[]
  }

  export type LessonBookUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<LessonBookCreateWithoutCourseInput, LessonBookUncheckedCreateWithoutCourseInput> | LessonBookCreateWithoutCourseInput[] | LessonBookUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: LessonBookCreateOrConnectWithoutCourseInput | LessonBookCreateOrConnectWithoutCourseInput[]
    upsert?: LessonBookUpsertWithWhereUniqueWithoutCourseInput | LessonBookUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: LessonBookCreateManyCourseInputEnvelope
    set?: LessonBookWhereUniqueInput | LessonBookWhereUniqueInput[]
    disconnect?: LessonBookWhereUniqueInput | LessonBookWhereUniqueInput[]
    delete?: LessonBookWhereUniqueInput | LessonBookWhereUniqueInput[]
    connect?: LessonBookWhereUniqueInput | LessonBookWhereUniqueInput[]
    update?: LessonBookUpdateWithWhereUniqueWithoutCourseInput | LessonBookUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: LessonBookUpdateManyWithWhereWithoutCourseInput | LessonBookUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: LessonBookScalarWhereInput | LessonBookScalarWhereInput[]
  }

  export type StudentCourseUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<StudentCourseCreateWithoutCourseInput, StudentCourseUncheckedCreateWithoutCourseInput> | StudentCourseCreateWithoutCourseInput[] | StudentCourseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: StudentCourseCreateOrConnectWithoutCourseInput | StudentCourseCreateOrConnectWithoutCourseInput[]
    upsert?: StudentCourseUpsertWithWhereUniqueWithoutCourseInput | StudentCourseUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: StudentCourseCreateManyCourseInputEnvelope
    set?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    disconnect?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    delete?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    connect?: StudentCourseWhereUniqueInput | StudentCourseWhereUniqueInput[]
    update?: StudentCourseUpdateWithWhereUniqueWithoutCourseInput | StudentCourseUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: StudentCourseUpdateManyWithWhereWithoutCourseInput | StudentCourseUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: StudentCourseScalarWhereInput | StudentCourseScalarWhereInput[]
  }

  export type PurchaseUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<PurchaseCreateWithoutCourseInput, PurchaseUncheckedCreateWithoutCourseInput> | PurchaseCreateWithoutCourseInput[] | PurchaseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: PurchaseCreateOrConnectWithoutCourseInput | PurchaseCreateOrConnectWithoutCourseInput[]
    upsert?: PurchaseUpsertWithWhereUniqueWithoutCourseInput | PurchaseUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: PurchaseCreateManyCourseInputEnvelope
    set?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    disconnect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    delete?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    connect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    update?: PurchaseUpdateWithWhereUniqueWithoutCourseInput | PurchaseUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: PurchaseUpdateManyWithWhereWithoutCourseInput | PurchaseUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: PurchaseScalarWhereInput | PurchaseScalarWhereInput[]
  }

  export type CourseCreateNestedOneWithoutLessonBooksInput = {
    create?: XOR<CourseCreateWithoutLessonBooksInput, CourseUncheckedCreateWithoutLessonBooksInput>
    connectOrCreate?: CourseCreateOrConnectWithoutLessonBooksInput
    connect?: CourseWhereUniqueInput
  }

  export type LessonProgressCreateNestedManyWithoutLessonBookInput = {
    create?: XOR<LessonProgressCreateWithoutLessonBookInput, LessonProgressUncheckedCreateWithoutLessonBookInput> | LessonProgressCreateWithoutLessonBookInput[] | LessonProgressUncheckedCreateWithoutLessonBookInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutLessonBookInput | LessonProgressCreateOrConnectWithoutLessonBookInput[]
    createMany?: LessonProgressCreateManyLessonBookInputEnvelope
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
  }

  export type LessonProgressUncheckedCreateNestedManyWithoutLessonBookInput = {
    create?: XOR<LessonProgressCreateWithoutLessonBookInput, LessonProgressUncheckedCreateWithoutLessonBookInput> | LessonProgressCreateWithoutLessonBookInput[] | LessonProgressUncheckedCreateWithoutLessonBookInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutLessonBookInput | LessonProgressCreateOrConnectWithoutLessonBookInput[]
    createMany?: LessonProgressCreateManyLessonBookInputEnvelope
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CourseUpdateOneRequiredWithoutLessonBooksNestedInput = {
    create?: XOR<CourseCreateWithoutLessonBooksInput, CourseUncheckedCreateWithoutLessonBooksInput>
    connectOrCreate?: CourseCreateOrConnectWithoutLessonBooksInput
    upsert?: CourseUpsertWithoutLessonBooksInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutLessonBooksInput, CourseUpdateWithoutLessonBooksInput>, CourseUncheckedUpdateWithoutLessonBooksInput>
  }

  export type LessonProgressUpdateManyWithoutLessonBookNestedInput = {
    create?: XOR<LessonProgressCreateWithoutLessonBookInput, LessonProgressUncheckedCreateWithoutLessonBookInput> | LessonProgressCreateWithoutLessonBookInput[] | LessonProgressUncheckedCreateWithoutLessonBookInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutLessonBookInput | LessonProgressCreateOrConnectWithoutLessonBookInput[]
    upsert?: LessonProgressUpsertWithWhereUniqueWithoutLessonBookInput | LessonProgressUpsertWithWhereUniqueWithoutLessonBookInput[]
    createMany?: LessonProgressCreateManyLessonBookInputEnvelope
    set?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    disconnect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    delete?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    update?: LessonProgressUpdateWithWhereUniqueWithoutLessonBookInput | LessonProgressUpdateWithWhereUniqueWithoutLessonBookInput[]
    updateMany?: LessonProgressUpdateManyWithWhereWithoutLessonBookInput | LessonProgressUpdateManyWithWhereWithoutLessonBookInput[]
    deleteMany?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[]
  }

  export type LessonProgressUncheckedUpdateManyWithoutLessonBookNestedInput = {
    create?: XOR<LessonProgressCreateWithoutLessonBookInput, LessonProgressUncheckedCreateWithoutLessonBookInput> | LessonProgressCreateWithoutLessonBookInput[] | LessonProgressUncheckedCreateWithoutLessonBookInput[]
    connectOrCreate?: LessonProgressCreateOrConnectWithoutLessonBookInput | LessonProgressCreateOrConnectWithoutLessonBookInput[]
    upsert?: LessonProgressUpsertWithWhereUniqueWithoutLessonBookInput | LessonProgressUpsertWithWhereUniqueWithoutLessonBookInput[]
    createMany?: LessonProgressCreateManyLessonBookInputEnvelope
    set?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    disconnect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    delete?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[]
    update?: LessonProgressUpdateWithWhereUniqueWithoutLessonBookInput | LessonProgressUpdateWithWhereUniqueWithoutLessonBookInput[]
    updateMany?: LessonProgressUpdateManyWithWhereWithoutLessonBookInput | LessonProgressUpdateManyWithWhereWithoutLessonBookInput[]
    deleteMany?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutCoursesInput = {
    create?: XOR<StudentCreateWithoutCoursesInput, StudentUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutCoursesInput
    connect?: StudentWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutStudentsInput = {
    create?: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutStudentsInput
    connect?: CourseWhereUniqueInput
  }

  export type CourseStatusLogCreateNestedManyWithoutStudentCourseInput = {
    create?: XOR<CourseStatusLogCreateWithoutStudentCourseInput, CourseStatusLogUncheckedCreateWithoutStudentCourseInput> | CourseStatusLogCreateWithoutStudentCourseInput[] | CourseStatusLogUncheckedCreateWithoutStudentCourseInput[]
    connectOrCreate?: CourseStatusLogCreateOrConnectWithoutStudentCourseInput | CourseStatusLogCreateOrConnectWithoutStudentCourseInput[]
    createMany?: CourseStatusLogCreateManyStudentCourseInputEnvelope
    connect?: CourseStatusLogWhereUniqueInput | CourseStatusLogWhereUniqueInput[]
  }

  export type CourseStatusLogUncheckedCreateNestedManyWithoutStudentCourseInput = {
    create?: XOR<CourseStatusLogCreateWithoutStudentCourseInput, CourseStatusLogUncheckedCreateWithoutStudentCourseInput> | CourseStatusLogCreateWithoutStudentCourseInput[] | CourseStatusLogUncheckedCreateWithoutStudentCourseInput[]
    connectOrCreate?: CourseStatusLogCreateOrConnectWithoutStudentCourseInput | CourseStatusLogCreateOrConnectWithoutStudentCourseInput[]
    createMany?: CourseStatusLogCreateManyStudentCourseInputEnvelope
    connect?: CourseStatusLogWhereUniqueInput | CourseStatusLogWhereUniqueInput[]
  }

  export type EnumCourseStatusFieldUpdateOperationsInput = {
    set?: $Enums.CourseStatus
  }

  export type StudentUpdateOneRequiredWithoutCoursesNestedInput = {
    create?: XOR<StudentCreateWithoutCoursesInput, StudentUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutCoursesInput
    upsert?: StudentUpsertWithoutCoursesInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutCoursesInput, StudentUpdateWithoutCoursesInput>, StudentUncheckedUpdateWithoutCoursesInput>
  }

  export type CourseUpdateOneRequiredWithoutStudentsNestedInput = {
    create?: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutStudentsInput
    upsert?: CourseUpsertWithoutStudentsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutStudentsInput, CourseUpdateWithoutStudentsInput>, CourseUncheckedUpdateWithoutStudentsInput>
  }

  export type CourseStatusLogUpdateManyWithoutStudentCourseNestedInput = {
    create?: XOR<CourseStatusLogCreateWithoutStudentCourseInput, CourseStatusLogUncheckedCreateWithoutStudentCourseInput> | CourseStatusLogCreateWithoutStudentCourseInput[] | CourseStatusLogUncheckedCreateWithoutStudentCourseInput[]
    connectOrCreate?: CourseStatusLogCreateOrConnectWithoutStudentCourseInput | CourseStatusLogCreateOrConnectWithoutStudentCourseInput[]
    upsert?: CourseStatusLogUpsertWithWhereUniqueWithoutStudentCourseInput | CourseStatusLogUpsertWithWhereUniqueWithoutStudentCourseInput[]
    createMany?: CourseStatusLogCreateManyStudentCourseInputEnvelope
    set?: CourseStatusLogWhereUniqueInput | CourseStatusLogWhereUniqueInput[]
    disconnect?: CourseStatusLogWhereUniqueInput | CourseStatusLogWhereUniqueInput[]
    delete?: CourseStatusLogWhereUniqueInput | CourseStatusLogWhereUniqueInput[]
    connect?: CourseStatusLogWhereUniqueInput | CourseStatusLogWhereUniqueInput[]
    update?: CourseStatusLogUpdateWithWhereUniqueWithoutStudentCourseInput | CourseStatusLogUpdateWithWhereUniqueWithoutStudentCourseInput[]
    updateMany?: CourseStatusLogUpdateManyWithWhereWithoutStudentCourseInput | CourseStatusLogUpdateManyWithWhereWithoutStudentCourseInput[]
    deleteMany?: CourseStatusLogScalarWhereInput | CourseStatusLogScalarWhereInput[]
  }

  export type CourseStatusLogUncheckedUpdateManyWithoutStudentCourseNestedInput = {
    create?: XOR<CourseStatusLogCreateWithoutStudentCourseInput, CourseStatusLogUncheckedCreateWithoutStudentCourseInput> | CourseStatusLogCreateWithoutStudentCourseInput[] | CourseStatusLogUncheckedCreateWithoutStudentCourseInput[]
    connectOrCreate?: CourseStatusLogCreateOrConnectWithoutStudentCourseInput | CourseStatusLogCreateOrConnectWithoutStudentCourseInput[]
    upsert?: CourseStatusLogUpsertWithWhereUniqueWithoutStudentCourseInput | CourseStatusLogUpsertWithWhereUniqueWithoutStudentCourseInput[]
    createMany?: CourseStatusLogCreateManyStudentCourseInputEnvelope
    set?: CourseStatusLogWhereUniqueInput | CourseStatusLogWhereUniqueInput[]
    disconnect?: CourseStatusLogWhereUniqueInput | CourseStatusLogWhereUniqueInput[]
    delete?: CourseStatusLogWhereUniqueInput | CourseStatusLogWhereUniqueInput[]
    connect?: CourseStatusLogWhereUniqueInput | CourseStatusLogWhereUniqueInput[]
    update?: CourseStatusLogUpdateWithWhereUniqueWithoutStudentCourseInput | CourseStatusLogUpdateWithWhereUniqueWithoutStudentCourseInput[]
    updateMany?: CourseStatusLogUpdateManyWithWhereWithoutStudentCourseInput | CourseStatusLogUpdateManyWithWhereWithoutStudentCourseInput[]
    deleteMany?: CourseStatusLogScalarWhereInput | CourseStatusLogScalarWhereInput[]
  }

  export type StudentCourseCreateNestedOneWithoutStatusLogsInput = {
    create?: XOR<StudentCourseCreateWithoutStatusLogsInput, StudentCourseUncheckedCreateWithoutStatusLogsInput>
    connectOrCreate?: StudentCourseCreateOrConnectWithoutStatusLogsInput
    connect?: StudentCourseWhereUniqueInput
  }

  export type StudentCourseUpdateOneRequiredWithoutStatusLogsNestedInput = {
    create?: XOR<StudentCourseCreateWithoutStatusLogsInput, StudentCourseUncheckedCreateWithoutStatusLogsInput>
    connectOrCreate?: StudentCourseCreateOrConnectWithoutStatusLogsInput
    upsert?: StudentCourseUpsertWithoutStatusLogsInput
    connect?: StudentCourseWhereUniqueInput
    update?: XOR<XOR<StudentCourseUpdateToOneWithWhereWithoutStatusLogsInput, StudentCourseUpdateWithoutStatusLogsInput>, StudentCourseUncheckedUpdateWithoutStatusLogsInput>
  }

  export type StudentCreateNestedOneWithoutProgressInput = {
    create?: XOR<StudentCreateWithoutProgressInput, StudentUncheckedCreateWithoutProgressInput>
    connectOrCreate?: StudentCreateOrConnectWithoutProgressInput
    connect?: StudentWhereUniqueInput
  }

  export type LessonBookCreateNestedOneWithoutProgressInput = {
    create?: XOR<LessonBookCreateWithoutProgressInput, LessonBookUncheckedCreateWithoutProgressInput>
    connectOrCreate?: LessonBookCreateOrConnectWithoutProgressInput
    connect?: LessonBookWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type StudentUpdateOneRequiredWithoutProgressNestedInput = {
    create?: XOR<StudentCreateWithoutProgressInput, StudentUncheckedCreateWithoutProgressInput>
    connectOrCreate?: StudentCreateOrConnectWithoutProgressInput
    upsert?: StudentUpsertWithoutProgressInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutProgressInput, StudentUpdateWithoutProgressInput>, StudentUncheckedUpdateWithoutProgressInput>
  }

  export type LessonBookUpdateOneRequiredWithoutProgressNestedInput = {
    create?: XOR<LessonBookCreateWithoutProgressInput, LessonBookUncheckedCreateWithoutProgressInput>
    connectOrCreate?: LessonBookCreateOrConnectWithoutProgressInput
    upsert?: LessonBookUpsertWithoutProgressInput
    connect?: LessonBookWhereUniqueInput
    update?: XOR<XOR<LessonBookUpdateToOneWithWhereWithoutProgressInput, LessonBookUpdateWithoutProgressInput>, LessonBookUncheckedUpdateWithoutProgressInput>
  }

  export type StudentCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<StudentCreateWithoutPaymentsInput, StudentUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPaymentsInput
    connect?: StudentWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<CourseCreateWithoutPaymentsInput, CourseUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutPaymentsInput
    connect?: CourseWhereUniqueInput
  }

  export type EnumPurchaseTypeFieldUpdateOperationsInput = {
    set?: $Enums.PurchaseType
  }

  export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod
  }

  export type StudentUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<StudentCreateWithoutPaymentsInput, StudentUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPaymentsInput
    upsert?: StudentUpsertWithoutPaymentsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutPaymentsInput, StudentUpdateWithoutPaymentsInput>, StudentUncheckedUpdateWithoutPaymentsInput>
  }

  export type CourseUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<CourseCreateWithoutPaymentsInput, CourseUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutPaymentsInput
    upsert?: CourseUpsertWithoutPaymentsInput
    disconnect?: CourseWhereInput | boolean
    delete?: CourseWhereInput | boolean
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutPaymentsInput, CourseUpdateWithoutPaymentsInput>, CourseUncheckedUpdateWithoutPaymentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumCourseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CourseStatus | EnumCourseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CourseStatus[] | ListEnumCourseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CourseStatus[] | ListEnumCourseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCourseStatusFilter<$PrismaModel> | $Enums.CourseStatus
  }

  export type NestedEnumCourseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CourseStatus | EnumCourseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CourseStatus[] | ListEnumCourseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CourseStatus[] | ListEnumCourseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCourseStatusWithAggregatesFilter<$PrismaModel> | $Enums.CourseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCourseStatusFilter<$PrismaModel>
    _max?: NestedEnumCourseStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumPurchaseTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PurchaseType | EnumPurchaseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PurchaseType[] | ListEnumPurchaseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PurchaseType[] | ListEnumPurchaseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPurchaseTypeFilter<$PrismaModel> | $Enums.PurchaseType
  }

  export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type NestedEnumPurchaseTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PurchaseType | EnumPurchaseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PurchaseType[] | ListEnumPurchaseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PurchaseType[] | ListEnumPurchaseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPurchaseTypeWithAggregatesFilter<$PrismaModel> | $Enums.PurchaseType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPurchaseTypeFilter<$PrismaModel>
    _max?: NestedEnumPurchaseTypeFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type StudentCourseCreateWithoutStudentInput = {
    id?: string
    enrolledAt?: Date | string
    status?: $Enums.CourseStatus
    course: CourseCreateNestedOneWithoutStudentsInput
    statusLogs?: CourseStatusLogCreateNestedManyWithoutStudentCourseInput
  }

  export type StudentCourseUncheckedCreateWithoutStudentInput = {
    id?: string
    courseId: string
    enrolledAt?: Date | string
    status?: $Enums.CourseStatus
    statusLogs?: CourseStatusLogUncheckedCreateNestedManyWithoutStudentCourseInput
  }

  export type StudentCourseCreateOrConnectWithoutStudentInput = {
    where: StudentCourseWhereUniqueInput
    create: XOR<StudentCourseCreateWithoutStudentInput, StudentCourseUncheckedCreateWithoutStudentInput>
  }

  export type StudentCourseCreateManyStudentInputEnvelope = {
    data: StudentCourseCreateManyStudentInput | StudentCourseCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type PurchaseCreateWithoutStudentInput = {
    id?: string
    type: $Enums.PurchaseType
    amount: number
    description?: string | null
    paidAt?: Date | string
    forMonth?: Date | string | null
    method?: $Enums.PaymentMethod
    invoiceId?: string | null
    orgId: string
    course?: CourseCreateNestedOneWithoutPaymentsInput
  }

  export type PurchaseUncheckedCreateWithoutStudentInput = {
    id?: string
    courseId?: string | null
    type: $Enums.PurchaseType
    amount: number
    description?: string | null
    paidAt?: Date | string
    forMonth?: Date | string | null
    method?: $Enums.PaymentMethod
    invoiceId?: string | null
    orgId: string
  }

  export type PurchaseCreateOrConnectWithoutStudentInput = {
    where: PurchaseWhereUniqueInput
    create: XOR<PurchaseCreateWithoutStudentInput, PurchaseUncheckedCreateWithoutStudentInput>
  }

  export type PurchaseCreateManyStudentInputEnvelope = {
    data: PurchaseCreateManyStudentInput | PurchaseCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type LessonProgressCreateWithoutStudentInput = {
    id?: string
    completed?: boolean
    completedAt?: Date | string | null
    notes?: string | null
    lessonBook: LessonBookCreateNestedOneWithoutProgressInput
  }

  export type LessonProgressUncheckedCreateWithoutStudentInput = {
    id?: string
    lessonBookId: string
    completed?: boolean
    completedAt?: Date | string | null
    notes?: string | null
  }

  export type LessonProgressCreateOrConnectWithoutStudentInput = {
    where: LessonProgressWhereUniqueInput
    create: XOR<LessonProgressCreateWithoutStudentInput, LessonProgressUncheckedCreateWithoutStudentInput>
  }

  export type LessonProgressCreateManyStudentInputEnvelope = {
    data: LessonProgressCreateManyStudentInput | LessonProgressCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type StudentCourseUpsertWithWhereUniqueWithoutStudentInput = {
    where: StudentCourseWhereUniqueInput
    update: XOR<StudentCourseUpdateWithoutStudentInput, StudentCourseUncheckedUpdateWithoutStudentInput>
    create: XOR<StudentCourseCreateWithoutStudentInput, StudentCourseUncheckedCreateWithoutStudentInput>
  }

  export type StudentCourseUpdateWithWhereUniqueWithoutStudentInput = {
    where: StudentCourseWhereUniqueInput
    data: XOR<StudentCourseUpdateWithoutStudentInput, StudentCourseUncheckedUpdateWithoutStudentInput>
  }

  export type StudentCourseUpdateManyWithWhereWithoutStudentInput = {
    where: StudentCourseScalarWhereInput
    data: XOR<StudentCourseUpdateManyMutationInput, StudentCourseUncheckedUpdateManyWithoutStudentInput>
  }

  export type StudentCourseScalarWhereInput = {
    AND?: StudentCourseScalarWhereInput | StudentCourseScalarWhereInput[]
    OR?: StudentCourseScalarWhereInput[]
    NOT?: StudentCourseScalarWhereInput | StudentCourseScalarWhereInput[]
    id?: StringFilter<"StudentCourse"> | string
    studentId?: StringFilter<"StudentCourse"> | string
    courseId?: StringFilter<"StudentCourse"> | string
    enrolledAt?: DateTimeFilter<"StudentCourse"> | Date | string
    status?: EnumCourseStatusFilter<"StudentCourse"> | $Enums.CourseStatus
  }

  export type PurchaseUpsertWithWhereUniqueWithoutStudentInput = {
    where: PurchaseWhereUniqueInput
    update: XOR<PurchaseUpdateWithoutStudentInput, PurchaseUncheckedUpdateWithoutStudentInput>
    create: XOR<PurchaseCreateWithoutStudentInput, PurchaseUncheckedCreateWithoutStudentInput>
  }

  export type PurchaseUpdateWithWhereUniqueWithoutStudentInput = {
    where: PurchaseWhereUniqueInput
    data: XOR<PurchaseUpdateWithoutStudentInput, PurchaseUncheckedUpdateWithoutStudentInput>
  }

  export type PurchaseUpdateManyWithWhereWithoutStudentInput = {
    where: PurchaseScalarWhereInput
    data: XOR<PurchaseUpdateManyMutationInput, PurchaseUncheckedUpdateManyWithoutStudentInput>
  }

  export type PurchaseScalarWhereInput = {
    AND?: PurchaseScalarWhereInput | PurchaseScalarWhereInput[]
    OR?: PurchaseScalarWhereInput[]
    NOT?: PurchaseScalarWhereInput | PurchaseScalarWhereInput[]
    id?: StringFilter<"Purchase"> | string
    studentId?: StringFilter<"Purchase"> | string
    courseId?: StringNullableFilter<"Purchase"> | string | null
    type?: EnumPurchaseTypeFilter<"Purchase"> | $Enums.PurchaseType
    amount?: FloatFilter<"Purchase"> | number
    description?: StringNullableFilter<"Purchase"> | string | null
    paidAt?: DateTimeFilter<"Purchase"> | Date | string
    forMonth?: DateTimeNullableFilter<"Purchase"> | Date | string | null
    method?: EnumPaymentMethodFilter<"Purchase"> | $Enums.PaymentMethod
    invoiceId?: StringNullableFilter<"Purchase"> | string | null
    orgId?: StringFilter<"Purchase"> | string
  }

  export type LessonProgressUpsertWithWhereUniqueWithoutStudentInput = {
    where: LessonProgressWhereUniqueInput
    update: XOR<LessonProgressUpdateWithoutStudentInput, LessonProgressUncheckedUpdateWithoutStudentInput>
    create: XOR<LessonProgressCreateWithoutStudentInput, LessonProgressUncheckedCreateWithoutStudentInput>
  }

  export type LessonProgressUpdateWithWhereUniqueWithoutStudentInput = {
    where: LessonProgressWhereUniqueInput
    data: XOR<LessonProgressUpdateWithoutStudentInput, LessonProgressUncheckedUpdateWithoutStudentInput>
  }

  export type LessonProgressUpdateManyWithWhereWithoutStudentInput = {
    where: LessonProgressScalarWhereInput
    data: XOR<LessonProgressUpdateManyMutationInput, LessonProgressUncheckedUpdateManyWithoutStudentInput>
  }

  export type LessonProgressScalarWhereInput = {
    AND?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[]
    OR?: LessonProgressScalarWhereInput[]
    NOT?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[]
    id?: StringFilter<"LessonProgress"> | string
    studentId?: StringFilter<"LessonProgress"> | string
    lessonBookId?: StringFilter<"LessonProgress"> | string
    completed?: BoolFilter<"LessonProgress"> | boolean
    completedAt?: DateTimeNullableFilter<"LessonProgress"> | Date | string | null
    notes?: StringNullableFilter<"LessonProgress"> | string | null
  }

  export type LessonBookCreateWithoutCourseInput = {
    id?: string
    title: string
    author?: string | null
    price?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    progress?: LessonProgressCreateNestedManyWithoutLessonBookInput
  }

  export type LessonBookUncheckedCreateWithoutCourseInput = {
    id?: string
    title: string
    author?: string | null
    price?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    progress?: LessonProgressUncheckedCreateNestedManyWithoutLessonBookInput
  }

  export type LessonBookCreateOrConnectWithoutCourseInput = {
    where: LessonBookWhereUniqueInput
    create: XOR<LessonBookCreateWithoutCourseInput, LessonBookUncheckedCreateWithoutCourseInput>
  }

  export type LessonBookCreateManyCourseInputEnvelope = {
    data: LessonBookCreateManyCourseInput | LessonBookCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type StudentCourseCreateWithoutCourseInput = {
    id?: string
    enrolledAt?: Date | string
    status?: $Enums.CourseStatus
    student: StudentCreateNestedOneWithoutCoursesInput
    statusLogs?: CourseStatusLogCreateNestedManyWithoutStudentCourseInput
  }

  export type StudentCourseUncheckedCreateWithoutCourseInput = {
    id?: string
    studentId: string
    enrolledAt?: Date | string
    status?: $Enums.CourseStatus
    statusLogs?: CourseStatusLogUncheckedCreateNestedManyWithoutStudentCourseInput
  }

  export type StudentCourseCreateOrConnectWithoutCourseInput = {
    where: StudentCourseWhereUniqueInput
    create: XOR<StudentCourseCreateWithoutCourseInput, StudentCourseUncheckedCreateWithoutCourseInput>
  }

  export type StudentCourseCreateManyCourseInputEnvelope = {
    data: StudentCourseCreateManyCourseInput | StudentCourseCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type PurchaseCreateWithoutCourseInput = {
    id?: string
    type: $Enums.PurchaseType
    amount: number
    description?: string | null
    paidAt?: Date | string
    forMonth?: Date | string | null
    method?: $Enums.PaymentMethod
    invoiceId?: string | null
    orgId: string
    student: StudentCreateNestedOneWithoutPaymentsInput
  }

  export type PurchaseUncheckedCreateWithoutCourseInput = {
    id?: string
    studentId: string
    type: $Enums.PurchaseType
    amount: number
    description?: string | null
    paidAt?: Date | string
    forMonth?: Date | string | null
    method?: $Enums.PaymentMethod
    invoiceId?: string | null
    orgId: string
  }

  export type PurchaseCreateOrConnectWithoutCourseInput = {
    where: PurchaseWhereUniqueInput
    create: XOR<PurchaseCreateWithoutCourseInput, PurchaseUncheckedCreateWithoutCourseInput>
  }

  export type PurchaseCreateManyCourseInputEnvelope = {
    data: PurchaseCreateManyCourseInput | PurchaseCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type LessonBookUpsertWithWhereUniqueWithoutCourseInput = {
    where: LessonBookWhereUniqueInput
    update: XOR<LessonBookUpdateWithoutCourseInput, LessonBookUncheckedUpdateWithoutCourseInput>
    create: XOR<LessonBookCreateWithoutCourseInput, LessonBookUncheckedCreateWithoutCourseInput>
  }

  export type LessonBookUpdateWithWhereUniqueWithoutCourseInput = {
    where: LessonBookWhereUniqueInput
    data: XOR<LessonBookUpdateWithoutCourseInput, LessonBookUncheckedUpdateWithoutCourseInput>
  }

  export type LessonBookUpdateManyWithWhereWithoutCourseInput = {
    where: LessonBookScalarWhereInput
    data: XOR<LessonBookUpdateManyMutationInput, LessonBookUncheckedUpdateManyWithoutCourseInput>
  }

  export type LessonBookScalarWhereInput = {
    AND?: LessonBookScalarWhereInput | LessonBookScalarWhereInput[]
    OR?: LessonBookScalarWhereInput[]
    NOT?: LessonBookScalarWhereInput | LessonBookScalarWhereInput[]
    id?: StringFilter<"LessonBook"> | string
    title?: StringFilter<"LessonBook"> | string
    author?: StringNullableFilter<"LessonBook"> | string | null
    price?: FloatFilter<"LessonBook"> | number
    courseId?: StringFilter<"LessonBook"> | string
    createdAt?: DateTimeFilter<"LessonBook"> | Date | string
    updatedAt?: DateTimeFilter<"LessonBook"> | Date | string
  }

  export type StudentCourseUpsertWithWhereUniqueWithoutCourseInput = {
    where: StudentCourseWhereUniqueInput
    update: XOR<StudentCourseUpdateWithoutCourseInput, StudentCourseUncheckedUpdateWithoutCourseInput>
    create: XOR<StudentCourseCreateWithoutCourseInput, StudentCourseUncheckedCreateWithoutCourseInput>
  }

  export type StudentCourseUpdateWithWhereUniqueWithoutCourseInput = {
    where: StudentCourseWhereUniqueInput
    data: XOR<StudentCourseUpdateWithoutCourseInput, StudentCourseUncheckedUpdateWithoutCourseInput>
  }

  export type StudentCourseUpdateManyWithWhereWithoutCourseInput = {
    where: StudentCourseScalarWhereInput
    data: XOR<StudentCourseUpdateManyMutationInput, StudentCourseUncheckedUpdateManyWithoutCourseInput>
  }

  export type PurchaseUpsertWithWhereUniqueWithoutCourseInput = {
    where: PurchaseWhereUniqueInput
    update: XOR<PurchaseUpdateWithoutCourseInput, PurchaseUncheckedUpdateWithoutCourseInput>
    create: XOR<PurchaseCreateWithoutCourseInput, PurchaseUncheckedCreateWithoutCourseInput>
  }

  export type PurchaseUpdateWithWhereUniqueWithoutCourseInput = {
    where: PurchaseWhereUniqueInput
    data: XOR<PurchaseUpdateWithoutCourseInput, PurchaseUncheckedUpdateWithoutCourseInput>
  }

  export type PurchaseUpdateManyWithWhereWithoutCourseInput = {
    where: PurchaseScalarWhereInput
    data: XOR<PurchaseUpdateManyMutationInput, PurchaseUncheckedUpdateManyWithoutCourseInput>
  }

  export type CourseCreateWithoutLessonBooksInput = {
    id?: string
    name: string
    description?: string | null
    level?: string | null
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentCourseCreateNestedManyWithoutCourseInput
    payments?: PurchaseCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutLessonBooksInput = {
    id?: string
    name: string
    description?: string | null
    level?: string | null
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentCourseUncheckedCreateNestedManyWithoutCourseInput
    payments?: PurchaseUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutLessonBooksInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutLessonBooksInput, CourseUncheckedCreateWithoutLessonBooksInput>
  }

  export type LessonProgressCreateWithoutLessonBookInput = {
    id?: string
    completed?: boolean
    completedAt?: Date | string | null
    notes?: string | null
    student: StudentCreateNestedOneWithoutProgressInput
  }

  export type LessonProgressUncheckedCreateWithoutLessonBookInput = {
    id?: string
    studentId: string
    completed?: boolean
    completedAt?: Date | string | null
    notes?: string | null
  }

  export type LessonProgressCreateOrConnectWithoutLessonBookInput = {
    where: LessonProgressWhereUniqueInput
    create: XOR<LessonProgressCreateWithoutLessonBookInput, LessonProgressUncheckedCreateWithoutLessonBookInput>
  }

  export type LessonProgressCreateManyLessonBookInputEnvelope = {
    data: LessonProgressCreateManyLessonBookInput | LessonProgressCreateManyLessonBookInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithoutLessonBooksInput = {
    update: XOR<CourseUpdateWithoutLessonBooksInput, CourseUncheckedUpdateWithoutLessonBooksInput>
    create: XOR<CourseCreateWithoutLessonBooksInput, CourseUncheckedCreateWithoutLessonBooksInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutLessonBooksInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutLessonBooksInput, CourseUncheckedUpdateWithoutLessonBooksInput>
  }

  export type CourseUpdateWithoutLessonBooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentCourseUpdateManyWithoutCourseNestedInput
    payments?: PurchaseUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutLessonBooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentCourseUncheckedUpdateManyWithoutCourseNestedInput
    payments?: PurchaseUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type LessonProgressUpsertWithWhereUniqueWithoutLessonBookInput = {
    where: LessonProgressWhereUniqueInput
    update: XOR<LessonProgressUpdateWithoutLessonBookInput, LessonProgressUncheckedUpdateWithoutLessonBookInput>
    create: XOR<LessonProgressCreateWithoutLessonBookInput, LessonProgressUncheckedCreateWithoutLessonBookInput>
  }

  export type LessonProgressUpdateWithWhereUniqueWithoutLessonBookInput = {
    where: LessonProgressWhereUniqueInput
    data: XOR<LessonProgressUpdateWithoutLessonBookInput, LessonProgressUncheckedUpdateWithoutLessonBookInput>
  }

  export type LessonProgressUpdateManyWithWhereWithoutLessonBookInput = {
    where: LessonProgressScalarWhereInput
    data: XOR<LessonProgressUpdateManyMutationInput, LessonProgressUncheckedUpdateManyWithoutLessonBookInput>
  }

  export type StudentCreateWithoutCoursesInput = {
    id?: string
    name: string
    birthDate?: Date | string | null
    gender?: $Enums.Gender | null
    phone?: string | null
    address?: string | null
    email?: string | null
    guardian?: string | null
    joinedAt?: Date | string
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PurchaseCreateNestedManyWithoutStudentInput
    progress?: LessonProgressCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutCoursesInput = {
    id?: string
    name: string
    birthDate?: Date | string | null
    gender?: $Enums.Gender | null
    phone?: string | null
    address?: string | null
    email?: string | null
    guardian?: string | null
    joinedAt?: Date | string
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PurchaseUncheckedCreateNestedManyWithoutStudentInput
    progress?: LessonProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutCoursesInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutCoursesInput, StudentUncheckedCreateWithoutCoursesInput>
  }

  export type CourseCreateWithoutStudentsInput = {
    id?: string
    name: string
    description?: string | null
    level?: string | null
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lessonBooks?: LessonBookCreateNestedManyWithoutCourseInput
    payments?: PurchaseCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutStudentsInput = {
    id?: string
    name: string
    description?: string | null
    level?: string | null
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lessonBooks?: LessonBookUncheckedCreateNestedManyWithoutCourseInput
    payments?: PurchaseUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutStudentsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput>
  }

  export type CourseStatusLogCreateWithoutStudentCourseInput = {
    id?: string
    status: $Enums.CourseStatus
    changedAt?: Date | string
    note?: string | null
  }

  export type CourseStatusLogUncheckedCreateWithoutStudentCourseInput = {
    id?: string
    status: $Enums.CourseStatus
    changedAt?: Date | string
    note?: string | null
  }

  export type CourseStatusLogCreateOrConnectWithoutStudentCourseInput = {
    where: CourseStatusLogWhereUniqueInput
    create: XOR<CourseStatusLogCreateWithoutStudentCourseInput, CourseStatusLogUncheckedCreateWithoutStudentCourseInput>
  }

  export type CourseStatusLogCreateManyStudentCourseInputEnvelope = {
    data: CourseStatusLogCreateManyStudentCourseInput | CourseStatusLogCreateManyStudentCourseInput[]
    skipDuplicates?: boolean
  }

  export type StudentUpsertWithoutCoursesInput = {
    update: XOR<StudentUpdateWithoutCoursesInput, StudentUncheckedUpdateWithoutCoursesInput>
    create: XOR<StudentCreateWithoutCoursesInput, StudentUncheckedCreateWithoutCoursesInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutCoursesInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutCoursesInput, StudentUncheckedUpdateWithoutCoursesInput>
  }

  export type StudentUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    guardian?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PurchaseUpdateManyWithoutStudentNestedInput
    progress?: LessonProgressUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    guardian?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PurchaseUncheckedUpdateManyWithoutStudentNestedInput
    progress?: LessonProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type CourseUpsertWithoutStudentsInput = {
    update: XOR<CourseUpdateWithoutStudentsInput, CourseUncheckedUpdateWithoutStudentsInput>
    create: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutStudentsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutStudentsInput, CourseUncheckedUpdateWithoutStudentsInput>
  }

  export type CourseUpdateWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessonBooks?: LessonBookUpdateManyWithoutCourseNestedInput
    payments?: PurchaseUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessonBooks?: LessonBookUncheckedUpdateManyWithoutCourseNestedInput
    payments?: PurchaseUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseStatusLogUpsertWithWhereUniqueWithoutStudentCourseInput = {
    where: CourseStatusLogWhereUniqueInput
    update: XOR<CourseStatusLogUpdateWithoutStudentCourseInput, CourseStatusLogUncheckedUpdateWithoutStudentCourseInput>
    create: XOR<CourseStatusLogCreateWithoutStudentCourseInput, CourseStatusLogUncheckedCreateWithoutStudentCourseInput>
  }

  export type CourseStatusLogUpdateWithWhereUniqueWithoutStudentCourseInput = {
    where: CourseStatusLogWhereUniqueInput
    data: XOR<CourseStatusLogUpdateWithoutStudentCourseInput, CourseStatusLogUncheckedUpdateWithoutStudentCourseInput>
  }

  export type CourseStatusLogUpdateManyWithWhereWithoutStudentCourseInput = {
    where: CourseStatusLogScalarWhereInput
    data: XOR<CourseStatusLogUpdateManyMutationInput, CourseStatusLogUncheckedUpdateManyWithoutStudentCourseInput>
  }

  export type CourseStatusLogScalarWhereInput = {
    AND?: CourseStatusLogScalarWhereInput | CourseStatusLogScalarWhereInput[]
    OR?: CourseStatusLogScalarWhereInput[]
    NOT?: CourseStatusLogScalarWhereInput | CourseStatusLogScalarWhereInput[]
    id?: StringFilter<"CourseStatusLog"> | string
    studentCourseId?: StringFilter<"CourseStatusLog"> | string
    status?: EnumCourseStatusFilter<"CourseStatusLog"> | $Enums.CourseStatus
    changedAt?: DateTimeFilter<"CourseStatusLog"> | Date | string
    note?: StringNullableFilter<"CourseStatusLog"> | string | null
  }

  export type StudentCourseCreateWithoutStatusLogsInput = {
    id?: string
    enrolledAt?: Date | string
    status?: $Enums.CourseStatus
    student: StudentCreateNestedOneWithoutCoursesInput
    course: CourseCreateNestedOneWithoutStudentsInput
  }

  export type StudentCourseUncheckedCreateWithoutStatusLogsInput = {
    id?: string
    studentId: string
    courseId: string
    enrolledAt?: Date | string
    status?: $Enums.CourseStatus
  }

  export type StudentCourseCreateOrConnectWithoutStatusLogsInput = {
    where: StudentCourseWhereUniqueInput
    create: XOR<StudentCourseCreateWithoutStatusLogsInput, StudentCourseUncheckedCreateWithoutStatusLogsInput>
  }

  export type StudentCourseUpsertWithoutStatusLogsInput = {
    update: XOR<StudentCourseUpdateWithoutStatusLogsInput, StudentCourseUncheckedUpdateWithoutStatusLogsInput>
    create: XOR<StudentCourseCreateWithoutStatusLogsInput, StudentCourseUncheckedCreateWithoutStatusLogsInput>
    where?: StudentCourseWhereInput
  }

  export type StudentCourseUpdateToOneWithWhereWithoutStatusLogsInput = {
    where?: StudentCourseWhereInput
    data: XOR<StudentCourseUpdateWithoutStatusLogsInput, StudentCourseUncheckedUpdateWithoutStatusLogsInput>
  }

  export type StudentCourseUpdateWithoutStatusLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
    student?: StudentUpdateOneRequiredWithoutCoursesNestedInput
    course?: CourseUpdateOneRequiredWithoutStudentsNestedInput
  }

  export type StudentCourseUncheckedUpdateWithoutStatusLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
  }

  export type StudentCreateWithoutProgressInput = {
    id?: string
    name: string
    birthDate?: Date | string | null
    gender?: $Enums.Gender | null
    phone?: string | null
    address?: string | null
    email?: string | null
    guardian?: string | null
    joinedAt?: Date | string
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: StudentCourseCreateNestedManyWithoutStudentInput
    payments?: PurchaseCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutProgressInput = {
    id?: string
    name: string
    birthDate?: Date | string | null
    gender?: $Enums.Gender | null
    phone?: string | null
    address?: string | null
    email?: string | null
    guardian?: string | null
    joinedAt?: Date | string
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: StudentCourseUncheckedCreateNestedManyWithoutStudentInput
    payments?: PurchaseUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutProgressInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutProgressInput, StudentUncheckedCreateWithoutProgressInput>
  }

  export type LessonBookCreateWithoutProgressInput = {
    id?: string
    title: string
    author?: string | null
    price?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    course: CourseCreateNestedOneWithoutLessonBooksInput
  }

  export type LessonBookUncheckedCreateWithoutProgressInput = {
    id?: string
    title: string
    author?: string | null
    price?: number
    courseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LessonBookCreateOrConnectWithoutProgressInput = {
    where: LessonBookWhereUniqueInput
    create: XOR<LessonBookCreateWithoutProgressInput, LessonBookUncheckedCreateWithoutProgressInput>
  }

  export type StudentUpsertWithoutProgressInput = {
    update: XOR<StudentUpdateWithoutProgressInput, StudentUncheckedUpdateWithoutProgressInput>
    create: XOR<StudentCreateWithoutProgressInput, StudentUncheckedCreateWithoutProgressInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutProgressInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutProgressInput, StudentUncheckedUpdateWithoutProgressInput>
  }

  export type StudentUpdateWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    guardian?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: StudentCourseUpdateManyWithoutStudentNestedInput
    payments?: PurchaseUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    guardian?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: StudentCourseUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PurchaseUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type LessonBookUpsertWithoutProgressInput = {
    update: XOR<LessonBookUpdateWithoutProgressInput, LessonBookUncheckedUpdateWithoutProgressInput>
    create: XOR<LessonBookCreateWithoutProgressInput, LessonBookUncheckedCreateWithoutProgressInput>
    where?: LessonBookWhereInput
  }

  export type LessonBookUpdateToOneWithWhereWithoutProgressInput = {
    where?: LessonBookWhereInput
    data: XOR<LessonBookUpdateWithoutProgressInput, LessonBookUncheckedUpdateWithoutProgressInput>
  }

  export type LessonBookUpdateWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutLessonBooksNestedInput
  }

  export type LessonBookUncheckedUpdateWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    courseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateWithoutPaymentsInput = {
    id?: string
    name: string
    birthDate?: Date | string | null
    gender?: $Enums.Gender | null
    phone?: string | null
    address?: string | null
    email?: string | null
    guardian?: string | null
    joinedAt?: Date | string
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: StudentCourseCreateNestedManyWithoutStudentInput
    progress?: LessonProgressCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutPaymentsInput = {
    id?: string
    name: string
    birthDate?: Date | string | null
    gender?: $Enums.Gender | null
    phone?: string | null
    address?: string | null
    email?: string | null
    guardian?: string | null
    joinedAt?: Date | string
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: StudentCourseUncheckedCreateNestedManyWithoutStudentInput
    progress?: LessonProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutPaymentsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutPaymentsInput, StudentUncheckedCreateWithoutPaymentsInput>
  }

  export type CourseCreateWithoutPaymentsInput = {
    id?: string
    name: string
    description?: string | null
    level?: string | null
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lessonBooks?: LessonBookCreateNestedManyWithoutCourseInput
    students?: StudentCourseCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutPaymentsInput = {
    id?: string
    name: string
    description?: string | null
    level?: string | null
    orgId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lessonBooks?: LessonBookUncheckedCreateNestedManyWithoutCourseInput
    students?: StudentCourseUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutPaymentsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutPaymentsInput, CourseUncheckedCreateWithoutPaymentsInput>
  }

  export type StudentUpsertWithoutPaymentsInput = {
    update: XOR<StudentUpdateWithoutPaymentsInput, StudentUncheckedUpdateWithoutPaymentsInput>
    create: XOR<StudentCreateWithoutPaymentsInput, StudentUncheckedCreateWithoutPaymentsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutPaymentsInput, StudentUncheckedUpdateWithoutPaymentsInput>
  }

  export type StudentUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    guardian?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: StudentCourseUpdateManyWithoutStudentNestedInput
    progress?: LessonProgressUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    guardian?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: StudentCourseUncheckedUpdateManyWithoutStudentNestedInput
    progress?: LessonProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type CourseUpsertWithoutPaymentsInput = {
    update: XOR<CourseUpdateWithoutPaymentsInput, CourseUncheckedUpdateWithoutPaymentsInput>
    create: XOR<CourseCreateWithoutPaymentsInput, CourseUncheckedCreateWithoutPaymentsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutPaymentsInput, CourseUncheckedUpdateWithoutPaymentsInput>
  }

  export type CourseUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessonBooks?: LessonBookUpdateManyWithoutCourseNestedInput
    students?: StudentCourseUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessonBooks?: LessonBookUncheckedUpdateManyWithoutCourseNestedInput
    students?: StudentCourseUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type StudentCourseCreateManyStudentInput = {
    id?: string
    courseId: string
    enrolledAt?: Date | string
    status?: $Enums.CourseStatus
  }

  export type PurchaseCreateManyStudentInput = {
    id?: string
    courseId?: string | null
    type: $Enums.PurchaseType
    amount: number
    description?: string | null
    paidAt?: Date | string
    forMonth?: Date | string | null
    method?: $Enums.PaymentMethod
    invoiceId?: string | null
    orgId: string
  }

  export type LessonProgressCreateManyStudentInput = {
    id?: string
    lessonBookId: string
    completed?: boolean
    completedAt?: Date | string | null
    notes?: string | null
  }

  export type StudentCourseUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
    course?: CourseUpdateOneRequiredWithoutStudentsNestedInput
    statusLogs?: CourseStatusLogUpdateManyWithoutStudentCourseNestedInput
  }

  export type StudentCourseUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
    statusLogs?: CourseStatusLogUncheckedUpdateManyWithoutStudentCourseNestedInput
  }

  export type StudentCourseUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
  }

  export type PurchaseUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPurchaseTypeFieldUpdateOperationsInput | $Enums.PurchaseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    forMonth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
    course?: CourseUpdateOneWithoutPaymentsNestedInput
  }

  export type PurchaseUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumPurchaseTypeFieldUpdateOperationsInput | $Enums.PurchaseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    forMonth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
  }

  export type PurchaseUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumPurchaseTypeFieldUpdateOperationsInput | $Enums.PurchaseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    forMonth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
  }

  export type LessonProgressUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lessonBook?: LessonBookUpdateOneRequiredWithoutProgressNestedInput
  }

  export type LessonProgressUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    lessonBookId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonProgressUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    lessonBookId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonBookCreateManyCourseInput = {
    id?: string
    title: string
    author?: string | null
    price?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentCourseCreateManyCourseInput = {
    id?: string
    studentId: string
    enrolledAt?: Date | string
    status?: $Enums.CourseStatus
  }

  export type PurchaseCreateManyCourseInput = {
    id?: string
    studentId: string
    type: $Enums.PurchaseType
    amount: number
    description?: string | null
    paidAt?: Date | string
    forMonth?: Date | string | null
    method?: $Enums.PaymentMethod
    invoiceId?: string | null
    orgId: string
  }

  export type LessonBookUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: LessonProgressUpdateManyWithoutLessonBookNestedInput
  }

  export type LessonBookUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: LessonProgressUncheckedUpdateManyWithoutLessonBookNestedInput
  }

  export type LessonBookUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCourseUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
    student?: StudentUpdateOneRequiredWithoutCoursesNestedInput
    statusLogs?: CourseStatusLogUpdateManyWithoutStudentCourseNestedInput
  }

  export type StudentCourseUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
    statusLogs?: CourseStatusLogUncheckedUpdateManyWithoutStudentCourseNestedInput
  }

  export type StudentCourseUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
  }

  export type PurchaseUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPurchaseTypeFieldUpdateOperationsInput | $Enums.PurchaseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    forMonth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
    student?: StudentUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PurchaseUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    type?: EnumPurchaseTypeFieldUpdateOperationsInput | $Enums.PurchaseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    forMonth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
  }

  export type PurchaseUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    type?: EnumPurchaseTypeFieldUpdateOperationsInput | $Enums.PurchaseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    forMonth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: StringFieldUpdateOperationsInput | string
  }

  export type LessonProgressCreateManyLessonBookInput = {
    id?: string
    studentId: string
    completed?: boolean
    completedAt?: Date | string | null
    notes?: string | null
  }

  export type LessonProgressUpdateWithoutLessonBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    student?: StudentUpdateOneRequiredWithoutProgressNestedInput
  }

  export type LessonProgressUncheckedUpdateWithoutLessonBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonProgressUncheckedUpdateManyWithoutLessonBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CourseStatusLogCreateManyStudentCourseInput = {
    id?: string
    status: $Enums.CourseStatus
    changedAt?: Date | string
    note?: string | null
  }

  export type CourseStatusLogUpdateWithoutStudentCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CourseStatusLogUncheckedUpdateWithoutStudentCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CourseStatusLogUncheckedUpdateManyWithoutStudentCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}