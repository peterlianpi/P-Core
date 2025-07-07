
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
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model PasswordResetToken
 * 
 */
export type PasswordResetToken = $Result.DefaultSelection<Prisma.$PasswordResetTokenPayload>
/**
 * Model TwoFactorToken
 * 
 */
export type TwoFactorToken = $Result.DefaultSelection<Prisma.$TwoFactorTokenPayload>
/**
 * Model TwoFactorConfirmation
 * 
 */
export type TwoFactorConfirmation = $Result.DefaultSelection<Prisma.$TwoFactorConfirmationPayload>
/**
 * Model VersionInfo
 * 
 */
export type VersionInfo = $Result.DefaultSelection<Prisma.$VersionInfoPayload>
/**
 * Model Feedback
 * 
 */
export type Feedback = $Result.DefaultSelection<Prisma.$FeedbackPayload>
/**
 * Model UpdateLog
 * 
 */
export type UpdateLog = $Result.DefaultSelection<Prisma.$UpdateLogPayload>
/**
 * Model TelegramSetting
 * 
 */
export type TelegramSetting = $Result.DefaultSelection<Prisma.$TelegramSettingPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model UserOrganization
 * 
 */
export type UserOrganization = $Result.DefaultSelection<Prisma.$UserOrganizationPayload>
/**
 * Model OrganizationInvite
 * 
 */
export type OrganizationInvite = $Result.DefaultSelection<Prisma.$OrganizationInvitePayload>
/**
 * Model Feature
 * 
 */
export type Feature = $Result.DefaultSelection<Prisma.$FeaturePayload>
/**
 * Model OrganizationFeatureAccess
 * 
 */
export type OrganizationFeatureAccess = $Result.DefaultSelection<Prisma.$OrganizationFeatureAccessPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  SUPERADMIN: 'SUPERADMIN',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const OrganizationUserRole: {
  ACCOUNTANT: 'ACCOUNTANT',
  OFFICE_STAFF: 'OFFICE_STAFF',
  OWNER: 'OWNER',
  MEMBER: 'MEMBER'
};

export type OrganizationUserRole = (typeof OrganizationUserRole)[keyof typeof OrganizationUserRole]


export const LogType: {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  CRITICAL: 'CRITICAL'
};

export type LogType = (typeof LogType)[keyof typeof LogType]


export const Scope: {
  USER: 'USER',
  ORG: 'ORG',
  SUPERADMIN: 'SUPERADMIN'
};

export type Scope = (typeof Scope)[keyof typeof Scope]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type OrganizationUserRole = $Enums.OrganizationUserRole

export const OrganizationUserRole: typeof $Enums.OrganizationUserRole

export type LogType = $Enums.LogType

export const LogType: typeof $Enums.LogType

export type Scope = $Enums.Scope

export const Scope: typeof $Enums.Scope

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
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
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
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
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetToken.findMany()
    * ```
    */
  get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.twoFactorToken`: Exposes CRUD operations for the **TwoFactorToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TwoFactorTokens
    * const twoFactorTokens = await prisma.twoFactorToken.findMany()
    * ```
    */
  get twoFactorToken(): Prisma.TwoFactorTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.twoFactorConfirmation`: Exposes CRUD operations for the **TwoFactorConfirmation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TwoFactorConfirmations
    * const twoFactorConfirmations = await prisma.twoFactorConfirmation.findMany()
    * ```
    */
  get twoFactorConfirmation(): Prisma.TwoFactorConfirmationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.versionInfo`: Exposes CRUD operations for the **VersionInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VersionInfos
    * const versionInfos = await prisma.versionInfo.findMany()
    * ```
    */
  get versionInfo(): Prisma.VersionInfoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedback`: Exposes CRUD operations for the **Feedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Feedbacks
    * const feedbacks = await prisma.feedback.findMany()
    * ```
    */
  get feedback(): Prisma.FeedbackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.updateLog`: Exposes CRUD operations for the **UpdateLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UpdateLogs
    * const updateLogs = await prisma.updateLog.findMany()
    * ```
    */
  get updateLog(): Prisma.UpdateLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.telegramSetting`: Exposes CRUD operations for the **TelegramSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TelegramSettings
    * const telegramSettings = await prisma.telegramSetting.findMany()
    * ```
    */
  get telegramSetting(): Prisma.TelegramSettingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userOrganization`: Exposes CRUD operations for the **UserOrganization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserOrganizations
    * const userOrganizations = await prisma.userOrganization.findMany()
    * ```
    */
  get userOrganization(): Prisma.UserOrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organizationInvite`: Exposes CRUD operations for the **OrganizationInvite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrganizationInvites
    * const organizationInvites = await prisma.organizationInvite.findMany()
    * ```
    */
  get organizationInvite(): Prisma.OrganizationInviteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feature`: Exposes CRUD operations for the **Feature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Features
    * const features = await prisma.feature.findMany()
    * ```
    */
  get feature(): Prisma.FeatureDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organizationFeatureAccess`: Exposes CRUD operations for the **OrganizationFeatureAccess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrganizationFeatureAccesses
    * const organizationFeatureAccesses = await prisma.organizationFeatureAccess.findMany()
    * ```
    */
  get organizationFeatureAccess(): Prisma.OrganizationFeatureAccessDelegate<ExtArgs, ClientOptions>;
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
    Account: 'Account',
    VerificationToken: 'VerificationToken',
    PasswordResetToken: 'PasswordResetToken',
    TwoFactorToken: 'TwoFactorToken',
    TwoFactorConfirmation: 'TwoFactorConfirmation',
    VersionInfo: 'VersionInfo',
    Feedback: 'Feedback',
    UpdateLog: 'UpdateLog',
    TelegramSetting: 'TelegramSetting',
    User: 'User',
    Organization: 'Organization',
    UserOrganization: 'UserOrganization',
    OrganizationInvite: 'OrganizationInvite',
    Feature: 'Feature',
    OrganizationFeatureAccess: 'OrganizationFeatureAccess'
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
      modelProps: "account" | "verificationToken" | "passwordResetToken" | "twoFactorToken" | "twoFactorConfirmation" | "versionInfo" | "feedback" | "updateLog" | "telegramSetting" | "user" | "organization" | "userOrganization" | "organizationInvite" | "feature" | "organizationFeatureAccess"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetToken: {
        payload: Prisma.$PasswordResetTokenPayload<ExtArgs>
        fields: Prisma.PasswordResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          update: {
            args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetToken>
          }
          groupBy: {
            args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenCountAggregateOutputType> | number
          }
        }
      }
      TwoFactorToken: {
        payload: Prisma.$TwoFactorTokenPayload<ExtArgs>
        fields: Prisma.TwoFactorTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TwoFactorTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TwoFactorTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorTokenPayload>
          }
          findFirst: {
            args: Prisma.TwoFactorTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TwoFactorTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorTokenPayload>
          }
          findMany: {
            args: Prisma.TwoFactorTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorTokenPayload>[]
          }
          create: {
            args: Prisma.TwoFactorTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorTokenPayload>
          }
          createMany: {
            args: Prisma.TwoFactorTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TwoFactorTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorTokenPayload>[]
          }
          delete: {
            args: Prisma.TwoFactorTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorTokenPayload>
          }
          update: {
            args: Prisma.TwoFactorTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorTokenPayload>
          }
          deleteMany: {
            args: Prisma.TwoFactorTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TwoFactorTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TwoFactorTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorTokenPayload>[]
          }
          upsert: {
            args: Prisma.TwoFactorTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorTokenPayload>
          }
          aggregate: {
            args: Prisma.TwoFactorTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTwoFactorToken>
          }
          groupBy: {
            args: Prisma.TwoFactorTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<TwoFactorTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.TwoFactorTokenCountArgs<ExtArgs>
            result: $Utils.Optional<TwoFactorTokenCountAggregateOutputType> | number
          }
        }
      }
      TwoFactorConfirmation: {
        payload: Prisma.$TwoFactorConfirmationPayload<ExtArgs>
        fields: Prisma.TwoFactorConfirmationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TwoFactorConfirmationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TwoFactorConfirmationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>
          }
          findFirst: {
            args: Prisma.TwoFactorConfirmationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TwoFactorConfirmationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>
          }
          findMany: {
            args: Prisma.TwoFactorConfirmationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>[]
          }
          create: {
            args: Prisma.TwoFactorConfirmationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>
          }
          createMany: {
            args: Prisma.TwoFactorConfirmationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TwoFactorConfirmationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>[]
          }
          delete: {
            args: Prisma.TwoFactorConfirmationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>
          }
          update: {
            args: Prisma.TwoFactorConfirmationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>
          }
          deleteMany: {
            args: Prisma.TwoFactorConfirmationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TwoFactorConfirmationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TwoFactorConfirmationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>[]
          }
          upsert: {
            args: Prisma.TwoFactorConfirmationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>
          }
          aggregate: {
            args: Prisma.TwoFactorConfirmationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTwoFactorConfirmation>
          }
          groupBy: {
            args: Prisma.TwoFactorConfirmationGroupByArgs<ExtArgs>
            result: $Utils.Optional<TwoFactorConfirmationGroupByOutputType>[]
          }
          count: {
            args: Prisma.TwoFactorConfirmationCountArgs<ExtArgs>
            result: $Utils.Optional<TwoFactorConfirmationCountAggregateOutputType> | number
          }
        }
      }
      VersionInfo: {
        payload: Prisma.$VersionInfoPayload<ExtArgs>
        fields: Prisma.VersionInfoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VersionInfoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionInfoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VersionInfoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionInfoPayload>
          }
          findFirst: {
            args: Prisma.VersionInfoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionInfoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VersionInfoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionInfoPayload>
          }
          findMany: {
            args: Prisma.VersionInfoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionInfoPayload>[]
          }
          create: {
            args: Prisma.VersionInfoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionInfoPayload>
          }
          createMany: {
            args: Prisma.VersionInfoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VersionInfoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionInfoPayload>[]
          }
          delete: {
            args: Prisma.VersionInfoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionInfoPayload>
          }
          update: {
            args: Prisma.VersionInfoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionInfoPayload>
          }
          deleteMany: {
            args: Prisma.VersionInfoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VersionInfoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VersionInfoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionInfoPayload>[]
          }
          upsert: {
            args: Prisma.VersionInfoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionInfoPayload>
          }
          aggregate: {
            args: Prisma.VersionInfoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVersionInfo>
          }
          groupBy: {
            args: Prisma.VersionInfoGroupByArgs<ExtArgs>
            result: $Utils.Optional<VersionInfoGroupByOutputType>[]
          }
          count: {
            args: Prisma.VersionInfoCountArgs<ExtArgs>
            result: $Utils.Optional<VersionInfoCountAggregateOutputType> | number
          }
        }
      }
      Feedback: {
        payload: Prisma.$FeedbackPayload<ExtArgs>
        fields: Prisma.FeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findFirst: {
            args: Prisma.FeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findMany: {
            args: Prisma.FeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          create: {
            args: Prisma.FeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          createMany: {
            args: Prisma.FeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          delete: {
            args: Prisma.FeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          update: {
            args: Prisma.FeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedbackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          upsert: {
            args: Prisma.FeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          aggregate: {
            args: Prisma.FeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedback>
          }
          groupBy: {
            args: Prisma.FeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackCountAggregateOutputType> | number
          }
        }
      }
      UpdateLog: {
        payload: Prisma.$UpdateLogPayload<ExtArgs>
        fields: Prisma.UpdateLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UpdateLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdateLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UpdateLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdateLogPayload>
          }
          findFirst: {
            args: Prisma.UpdateLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdateLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UpdateLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdateLogPayload>
          }
          findMany: {
            args: Prisma.UpdateLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdateLogPayload>[]
          }
          create: {
            args: Prisma.UpdateLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdateLogPayload>
          }
          createMany: {
            args: Prisma.UpdateLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UpdateLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdateLogPayload>[]
          }
          delete: {
            args: Prisma.UpdateLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdateLogPayload>
          }
          update: {
            args: Prisma.UpdateLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdateLogPayload>
          }
          deleteMany: {
            args: Prisma.UpdateLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UpdateLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UpdateLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdateLogPayload>[]
          }
          upsert: {
            args: Prisma.UpdateLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpdateLogPayload>
          }
          aggregate: {
            args: Prisma.UpdateLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUpdateLog>
          }
          groupBy: {
            args: Prisma.UpdateLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<UpdateLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.UpdateLogCountArgs<ExtArgs>
            result: $Utils.Optional<UpdateLogCountAggregateOutputType> | number
          }
        }
      }
      TelegramSetting: {
        payload: Prisma.$TelegramSettingPayload<ExtArgs>
        fields: Prisma.TelegramSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TelegramSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TelegramSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSettingPayload>
          }
          findFirst: {
            args: Prisma.TelegramSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TelegramSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSettingPayload>
          }
          findMany: {
            args: Prisma.TelegramSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSettingPayload>[]
          }
          create: {
            args: Prisma.TelegramSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSettingPayload>
          }
          createMany: {
            args: Prisma.TelegramSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TelegramSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSettingPayload>[]
          }
          delete: {
            args: Prisma.TelegramSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSettingPayload>
          }
          update: {
            args: Prisma.TelegramSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSettingPayload>
          }
          deleteMany: {
            args: Prisma.TelegramSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TelegramSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TelegramSettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSettingPayload>[]
          }
          upsert: {
            args: Prisma.TelegramSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TelegramSettingPayload>
          }
          aggregate: {
            args: Prisma.TelegramSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTelegramSetting>
          }
          groupBy: {
            args: Prisma.TelegramSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<TelegramSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.TelegramSettingCountArgs<ExtArgs>
            result: $Utils.Optional<TelegramSettingCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      UserOrganization: {
        payload: Prisma.$UserOrganizationPayload<ExtArgs>
        fields: Prisma.UserOrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserOrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserOrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationPayload>
          }
          findFirst: {
            args: Prisma.UserOrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserOrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationPayload>
          }
          findMany: {
            args: Prisma.UserOrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationPayload>[]
          }
          create: {
            args: Prisma.UserOrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationPayload>
          }
          createMany: {
            args: Prisma.UserOrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserOrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationPayload>[]
          }
          delete: {
            args: Prisma.UserOrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationPayload>
          }
          update: {
            args: Prisma.UserOrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationPayload>
          }
          deleteMany: {
            args: Prisma.UserOrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserOrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserOrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationPayload>[]
          }
          upsert: {
            args: Prisma.UserOrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationPayload>
          }
          aggregate: {
            args: Prisma.UserOrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserOrganization>
          }
          groupBy: {
            args: Prisma.UserOrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserOrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserOrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<UserOrganizationCountAggregateOutputType> | number
          }
        }
      }
      OrganizationInvite: {
        payload: Prisma.$OrganizationInvitePayload<ExtArgs>
        fields: Prisma.OrganizationInviteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationInviteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationInvitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationInviteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationInvitePayload>
          }
          findFirst: {
            args: Prisma.OrganizationInviteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationInvitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationInviteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationInvitePayload>
          }
          findMany: {
            args: Prisma.OrganizationInviteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationInvitePayload>[]
          }
          create: {
            args: Prisma.OrganizationInviteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationInvitePayload>
          }
          createMany: {
            args: Prisma.OrganizationInviteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationInviteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationInvitePayload>[]
          }
          delete: {
            args: Prisma.OrganizationInviteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationInvitePayload>
          }
          update: {
            args: Prisma.OrganizationInviteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationInvitePayload>
          }
          deleteMany: {
            args: Prisma.OrganizationInviteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationInviteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationInviteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationInvitePayload>[]
          }
          upsert: {
            args: Prisma.OrganizationInviteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationInvitePayload>
          }
          aggregate: {
            args: Prisma.OrganizationInviteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizationInvite>
          }
          groupBy: {
            args: Prisma.OrganizationInviteGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationInviteGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationInviteCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationInviteCountAggregateOutputType> | number
          }
        }
      }
      Feature: {
        payload: Prisma.$FeaturePayload<ExtArgs>
        fields: Prisma.FeatureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeatureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeatureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>
          }
          findFirst: {
            args: Prisma.FeatureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeatureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>
          }
          findMany: {
            args: Prisma.FeatureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>[]
          }
          create: {
            args: Prisma.FeatureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>
          }
          createMany: {
            args: Prisma.FeatureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeatureCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>[]
          }
          delete: {
            args: Prisma.FeatureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>
          }
          update: {
            args: Prisma.FeatureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>
          }
          deleteMany: {
            args: Prisma.FeatureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeatureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeatureUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>[]
          }
          upsert: {
            args: Prisma.FeatureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>
          }
          aggregate: {
            args: Prisma.FeatureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeature>
          }
          groupBy: {
            args: Prisma.FeatureGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeatureGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeatureCountArgs<ExtArgs>
            result: $Utils.Optional<FeatureCountAggregateOutputType> | number
          }
        }
      }
      OrganizationFeatureAccess: {
        payload: Prisma.$OrganizationFeatureAccessPayload<ExtArgs>
        fields: Prisma.OrganizationFeatureAccessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFeatureAccessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFeatureAccessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFeatureAccessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFeatureAccessPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFeatureAccessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFeatureAccessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFeatureAccessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFeatureAccessPayload>
          }
          findMany: {
            args: Prisma.OrganizationFeatureAccessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFeatureAccessPayload>[]
          }
          create: {
            args: Prisma.OrganizationFeatureAccessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFeatureAccessPayload>
          }
          createMany: {
            args: Prisma.OrganizationFeatureAccessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationFeatureAccessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFeatureAccessPayload>[]
          }
          delete: {
            args: Prisma.OrganizationFeatureAccessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFeatureAccessPayload>
          }
          update: {
            args: Prisma.OrganizationFeatureAccessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFeatureAccessPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationFeatureAccessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationFeatureAccessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationFeatureAccessUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFeatureAccessPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationFeatureAccessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFeatureAccessPayload>
          }
          aggregate: {
            args: Prisma.OrganizationFeatureAccessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizationFeatureAccess>
          }
          groupBy: {
            args: Prisma.OrganizationFeatureAccessGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationFeatureAccessGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationFeatureAccessCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationFeatureAccessCountAggregateOutputType> | number
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
    account?: AccountOmit
    verificationToken?: VerificationTokenOmit
    passwordResetToken?: PasswordResetTokenOmit
    twoFactorToken?: TwoFactorTokenOmit
    twoFactorConfirmation?: TwoFactorConfirmationOmit
    versionInfo?: VersionInfoOmit
    feedback?: FeedbackOmit
    updateLog?: UpdateLogOmit
    telegramSetting?: TelegramSettingOmit
    user?: UserOmit
    organization?: OrganizationOmit
    userOrganization?: UserOrganizationOmit
    organizationInvite?: OrganizationInviteOmit
    feature?: FeatureOmit
    organizationFeatureAccess?: OrganizationFeatureAccessOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    UserOrganization: number
    organizationCreated: number
    telegramBot: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    UserOrganization?: boolean | UserCountOutputTypeCountUserOrganizationArgs
    organizationCreated?: boolean | UserCountOutputTypeCountOrganizationCreatedArgs
    telegramBot?: boolean | UserCountOutputTypeCountTelegramBotArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserOrganizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserOrganizationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrganizationCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTelegramBotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TelegramSettingWhereInput
  }


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    UserOrganization: number
    featureAccess: number
    telegramBot: number
    OrganizationInvite: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    UserOrganization?: boolean | OrganizationCountOutputTypeCountUserOrganizationArgs
    featureAccess?: boolean | OrganizationCountOutputTypeCountFeatureAccessArgs
    telegramBot?: boolean | OrganizationCountOutputTypeCountTelegramBotArgs
    OrganizationInvite?: boolean | OrganizationCountOutputTypeCountOrganizationInviteArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountUserOrganizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserOrganizationWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountFeatureAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationFeatureAccessWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountTelegramBotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TelegramSettingWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountOrganizationInviteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationInviteWhereInput
  }


  /**
   * Count Type FeatureCountOutputType
   */

  export type FeatureCountOutputType = {
    orgAccesses: number
  }

  export type FeatureCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orgAccesses?: boolean | FeatureCountOutputTypeCountOrgAccessesArgs
  }

  // Custom InputTypes
  /**
   * FeatureCountOutputType without action
   */
  export type FeatureCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureCountOutputType
     */
    select?: FeatureCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FeatureCountOutputType without action
   */
  export type FeatureCountOutputTypeCountOrgAccessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationFeatureAccessWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
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
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    id: number
    email: number
    token: number
    expires: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    id: string
    email: string
    token: string
    expires: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "token" | "expires" | "createdAt" | "updatedAt", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
      expires: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationTokenWithIdOnly = await prisma.verificationToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `id`
     * const verificationTokenWithIdOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `id`
     * const verificationTokenWithIdOnly = await prisma.verificationToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
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
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly id: FieldRef<"VerificationToken", 'String'>
    readonly email: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
    readonly createdAt: FieldRef<"VerificationToken", 'DateTime'>
    readonly updatedAt: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model PasswordResetToken
   */

  export type AggregatePasswordResetToken = {
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  export type PasswordResetTokenMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PasswordResetTokenMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PasswordResetTokenCountAggregateOutputType = {
    id: number
    email: number
    token: number
    expires: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PasswordResetTokenMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PasswordResetTokenMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PasswordResetTokenCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PasswordResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetToken to aggregate.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type GetPasswordResetTokenAggregateType<T extends PasswordResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetToken[P]>
      : GetScalarType<T[P], AggregatePasswordResetToken[P]>
  }




  export type PasswordResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithAggregationInput | PasswordResetTokenOrderByWithAggregationInput[]
    by: PasswordResetTokenScalarFieldEnum[] | PasswordResetTokenScalarFieldEnum
    having?: PasswordResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokenCountAggregateInputType | true
    _min?: PasswordResetTokenMinAggregateInputType
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type PasswordResetTokenGroupByOutputType = {
    id: string
    email: string
    token: string
    expires: Date
    createdAt: Date
    updatedAt: Date
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  type GetPasswordResetTokenGroupByPayload<T extends PasswordResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PasswordResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "token" | "expires" | "createdAt" | "updatedAt", ExtArgs["result"]["passwordResetToken"]>

  export type $PasswordResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
      expires: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["passwordResetToken"]>
    composites: {}
  }

  type PasswordResetTokenGetPayload<S extends boolean | null | undefined | PasswordResetTokenDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokenPayload, S>

  type PasswordResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetTokenCountAggregateInputType | true
    }

  export interface PasswordResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetToken'], meta: { name: 'PasswordResetToken' } }
    /**
     * Find zero or one PasswordResetToken that matches the filter.
     * @param {PasswordResetTokenFindUniqueArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokenFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetTokenFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokenFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetTokenFindManyArgs>(args?: SelectSubset<T, PasswordResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetToken.
     * @param {PasswordResetTokenCreateArgs} args - Arguments to create a PasswordResetToken.
     * @example
     * // Create one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.create({
     *   data: {
     *     // ... data to create a PasswordResetToken
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokenCreateArgs>(args: SelectSubset<T, PasswordResetTokenCreateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokenCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokenCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResetTokens and returns the data saved in the database.
     * @param {PasswordResetTokenCreateManyAndReturnArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordResetToken.
     * @param {PasswordResetTokenDeleteArgs} args - Arguments to delete one PasswordResetToken.
     * @example
     * // Delete one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetToken
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokenDeleteArgs>(args: SelectSubset<T, PasswordResetTokenDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetToken.
     * @param {PasswordResetTokenUpdateArgs} args - Arguments to update one PasswordResetToken.
     * @example
     * // Update one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokenUpdateArgs>(args: SelectSubset<T, PasswordResetTokenUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokenDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokenDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokenUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens and returns the data updated in the database.
     * @param {PasswordResetTokenUpdateManyAndReturnArgs} args - Arguments to update many PasswordResetTokens.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends PasswordResetTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordResetToken.
     * @param {PasswordResetTokenUpsertArgs} args - Arguments to update or create a PasswordResetToken.
     * @example
     * // Update or create a PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.upsert({
     *   create: {
     *     // ... data to create a PasswordResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetToken we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokenUpsertArgs>(args: SelectSubset<T, PasswordResetTokenUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetToken.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokenCountArgs>(
      args?: Subset<T, PasswordResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PasswordResetTokenAggregateArgs>(args: Subset<T, PasswordResetTokenAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokenAggregateType<T>>

    /**
     * Group by PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenGroupByArgs} args - Group by arguments.
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
      T extends PasswordResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PasswordResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetToken model
   */
  readonly fields: PasswordResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the PasswordResetToken model
   */
  interface PasswordResetTokenFieldRefs {
    readonly id: FieldRef<"PasswordResetToken", 'String'>
    readonly email: FieldRef<"PasswordResetToken", 'String'>
    readonly token: FieldRef<"PasswordResetToken", 'String'>
    readonly expires: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly createdAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly updatedAt: FieldRef<"PasswordResetToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetToken findUnique
   */
  export type PasswordResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findUniqueOrThrow
   */
  export type PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findFirst
   */
  export type PasswordResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findFirstOrThrow
   */
  export type PasswordResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findMany
   */
  export type PasswordResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken create
   */
  export type PasswordResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
  }

  /**
   * PasswordResetToken createMany
   */
  export type PasswordResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken createManyAndReturn
   */
  export type PasswordResetTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken update
   */
  export type PasswordResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetToken to update.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken updateMany
   */
  export type PasswordResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken updateManyAndReturn
   */
  export type PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken upsert
   */
  export type PasswordResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetToken to update in case it exists.
     */
    where: PasswordResetTokenWhereUniqueInput
    /**
     * In case the PasswordResetToken found by the `where` argument doesn't exist, create a new PasswordResetToken with this data.
     */
    create: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
    /**
     * In case the PasswordResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
  }

  /**
   * PasswordResetToken delete
   */
  export type PasswordResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter which PasswordResetToken to delete.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken deleteMany
   */
  export type PasswordResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetToken without action
   */
  export type PasswordResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
  }


  /**
   * Model TwoFactorToken
   */

  export type AggregateTwoFactorToken = {
    _count: TwoFactorTokenCountAggregateOutputType | null
    _min: TwoFactorTokenMinAggregateOutputType | null
    _max: TwoFactorTokenMaxAggregateOutputType | null
  }

  export type TwoFactorTokenMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TwoFactorTokenMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TwoFactorTokenCountAggregateOutputType = {
    id: number
    email: number
    token: number
    expires: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TwoFactorTokenMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TwoFactorTokenMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TwoFactorTokenCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TwoFactorTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TwoFactorToken to aggregate.
     */
    where?: TwoFactorTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwoFactorTokens to fetch.
     */
    orderBy?: TwoFactorTokenOrderByWithRelationInput | TwoFactorTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TwoFactorTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwoFactorTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwoFactorTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TwoFactorTokens
    **/
    _count?: true | TwoFactorTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TwoFactorTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TwoFactorTokenMaxAggregateInputType
  }

  export type GetTwoFactorTokenAggregateType<T extends TwoFactorTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateTwoFactorToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTwoFactorToken[P]>
      : GetScalarType<T[P], AggregateTwoFactorToken[P]>
  }




  export type TwoFactorTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TwoFactorTokenWhereInput
    orderBy?: TwoFactorTokenOrderByWithAggregationInput | TwoFactorTokenOrderByWithAggregationInput[]
    by: TwoFactorTokenScalarFieldEnum[] | TwoFactorTokenScalarFieldEnum
    having?: TwoFactorTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TwoFactorTokenCountAggregateInputType | true
    _min?: TwoFactorTokenMinAggregateInputType
    _max?: TwoFactorTokenMaxAggregateInputType
  }

  export type TwoFactorTokenGroupByOutputType = {
    id: string
    email: string
    token: string
    expires: Date
    createdAt: Date
    updatedAt: Date
    _count: TwoFactorTokenCountAggregateOutputType | null
    _min: TwoFactorTokenMinAggregateOutputType | null
    _max: TwoFactorTokenMaxAggregateOutputType | null
  }

  type GetTwoFactorTokenGroupByPayload<T extends TwoFactorTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TwoFactorTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TwoFactorTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TwoFactorTokenGroupByOutputType[P]>
            : GetScalarType<T[P], TwoFactorTokenGroupByOutputType[P]>
        }
      >
    >


  export type TwoFactorTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["twoFactorToken"]>

  export type TwoFactorTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["twoFactorToken"]>

  export type TwoFactorTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["twoFactorToken"]>

  export type TwoFactorTokenSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TwoFactorTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "token" | "expires" | "createdAt" | "updatedAt", ExtArgs["result"]["twoFactorToken"]>

  export type $TwoFactorTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TwoFactorToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
      expires: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["twoFactorToken"]>
    composites: {}
  }

  type TwoFactorTokenGetPayload<S extends boolean | null | undefined | TwoFactorTokenDefaultArgs> = $Result.GetResult<Prisma.$TwoFactorTokenPayload, S>

  type TwoFactorTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TwoFactorTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TwoFactorTokenCountAggregateInputType | true
    }

  export interface TwoFactorTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TwoFactorToken'], meta: { name: 'TwoFactorToken' } }
    /**
     * Find zero or one TwoFactorToken that matches the filter.
     * @param {TwoFactorTokenFindUniqueArgs} args - Arguments to find a TwoFactorToken
     * @example
     * // Get one TwoFactorToken
     * const twoFactorToken = await prisma.twoFactorToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TwoFactorTokenFindUniqueArgs>(args: SelectSubset<T, TwoFactorTokenFindUniqueArgs<ExtArgs>>): Prisma__TwoFactorTokenClient<$Result.GetResult<Prisma.$TwoFactorTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TwoFactorToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TwoFactorTokenFindUniqueOrThrowArgs} args - Arguments to find a TwoFactorToken
     * @example
     * // Get one TwoFactorToken
     * const twoFactorToken = await prisma.twoFactorToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TwoFactorTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, TwoFactorTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TwoFactorTokenClient<$Result.GetResult<Prisma.$TwoFactorTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TwoFactorToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorTokenFindFirstArgs} args - Arguments to find a TwoFactorToken
     * @example
     * // Get one TwoFactorToken
     * const twoFactorToken = await prisma.twoFactorToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TwoFactorTokenFindFirstArgs>(args?: SelectSubset<T, TwoFactorTokenFindFirstArgs<ExtArgs>>): Prisma__TwoFactorTokenClient<$Result.GetResult<Prisma.$TwoFactorTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TwoFactorToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorTokenFindFirstOrThrowArgs} args - Arguments to find a TwoFactorToken
     * @example
     * // Get one TwoFactorToken
     * const twoFactorToken = await prisma.twoFactorToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TwoFactorTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, TwoFactorTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__TwoFactorTokenClient<$Result.GetResult<Prisma.$TwoFactorTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TwoFactorTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TwoFactorTokens
     * const twoFactorTokens = await prisma.twoFactorToken.findMany()
     * 
     * // Get first 10 TwoFactorTokens
     * const twoFactorTokens = await prisma.twoFactorToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const twoFactorTokenWithIdOnly = await prisma.twoFactorToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TwoFactorTokenFindManyArgs>(args?: SelectSubset<T, TwoFactorTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TwoFactorTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TwoFactorToken.
     * @param {TwoFactorTokenCreateArgs} args - Arguments to create a TwoFactorToken.
     * @example
     * // Create one TwoFactorToken
     * const TwoFactorToken = await prisma.twoFactorToken.create({
     *   data: {
     *     // ... data to create a TwoFactorToken
     *   }
     * })
     * 
     */
    create<T extends TwoFactorTokenCreateArgs>(args: SelectSubset<T, TwoFactorTokenCreateArgs<ExtArgs>>): Prisma__TwoFactorTokenClient<$Result.GetResult<Prisma.$TwoFactorTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TwoFactorTokens.
     * @param {TwoFactorTokenCreateManyArgs} args - Arguments to create many TwoFactorTokens.
     * @example
     * // Create many TwoFactorTokens
     * const twoFactorToken = await prisma.twoFactorToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TwoFactorTokenCreateManyArgs>(args?: SelectSubset<T, TwoFactorTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TwoFactorTokens and returns the data saved in the database.
     * @param {TwoFactorTokenCreateManyAndReturnArgs} args - Arguments to create many TwoFactorTokens.
     * @example
     * // Create many TwoFactorTokens
     * const twoFactorToken = await prisma.twoFactorToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TwoFactorTokens and only return the `id`
     * const twoFactorTokenWithIdOnly = await prisma.twoFactorToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TwoFactorTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, TwoFactorTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TwoFactorTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TwoFactorToken.
     * @param {TwoFactorTokenDeleteArgs} args - Arguments to delete one TwoFactorToken.
     * @example
     * // Delete one TwoFactorToken
     * const TwoFactorToken = await prisma.twoFactorToken.delete({
     *   where: {
     *     // ... filter to delete one TwoFactorToken
     *   }
     * })
     * 
     */
    delete<T extends TwoFactorTokenDeleteArgs>(args: SelectSubset<T, TwoFactorTokenDeleteArgs<ExtArgs>>): Prisma__TwoFactorTokenClient<$Result.GetResult<Prisma.$TwoFactorTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TwoFactorToken.
     * @param {TwoFactorTokenUpdateArgs} args - Arguments to update one TwoFactorToken.
     * @example
     * // Update one TwoFactorToken
     * const twoFactorToken = await prisma.twoFactorToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TwoFactorTokenUpdateArgs>(args: SelectSubset<T, TwoFactorTokenUpdateArgs<ExtArgs>>): Prisma__TwoFactorTokenClient<$Result.GetResult<Prisma.$TwoFactorTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TwoFactorTokens.
     * @param {TwoFactorTokenDeleteManyArgs} args - Arguments to filter TwoFactorTokens to delete.
     * @example
     * // Delete a few TwoFactorTokens
     * const { count } = await prisma.twoFactorToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TwoFactorTokenDeleteManyArgs>(args?: SelectSubset<T, TwoFactorTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TwoFactorTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TwoFactorTokens
     * const twoFactorToken = await prisma.twoFactorToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TwoFactorTokenUpdateManyArgs>(args: SelectSubset<T, TwoFactorTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TwoFactorTokens and returns the data updated in the database.
     * @param {TwoFactorTokenUpdateManyAndReturnArgs} args - Arguments to update many TwoFactorTokens.
     * @example
     * // Update many TwoFactorTokens
     * const twoFactorToken = await prisma.twoFactorToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TwoFactorTokens and only return the `id`
     * const twoFactorTokenWithIdOnly = await prisma.twoFactorToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends TwoFactorTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, TwoFactorTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TwoFactorTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TwoFactorToken.
     * @param {TwoFactorTokenUpsertArgs} args - Arguments to update or create a TwoFactorToken.
     * @example
     * // Update or create a TwoFactorToken
     * const twoFactorToken = await prisma.twoFactorToken.upsert({
     *   create: {
     *     // ... data to create a TwoFactorToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TwoFactorToken we want to update
     *   }
     * })
     */
    upsert<T extends TwoFactorTokenUpsertArgs>(args: SelectSubset<T, TwoFactorTokenUpsertArgs<ExtArgs>>): Prisma__TwoFactorTokenClient<$Result.GetResult<Prisma.$TwoFactorTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TwoFactorTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorTokenCountArgs} args - Arguments to filter TwoFactorTokens to count.
     * @example
     * // Count the number of TwoFactorTokens
     * const count = await prisma.twoFactorToken.count({
     *   where: {
     *     // ... the filter for the TwoFactorTokens we want to count
     *   }
     * })
    **/
    count<T extends TwoFactorTokenCountArgs>(
      args?: Subset<T, TwoFactorTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TwoFactorTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TwoFactorToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TwoFactorTokenAggregateArgs>(args: Subset<T, TwoFactorTokenAggregateArgs>): Prisma.PrismaPromise<GetTwoFactorTokenAggregateType<T>>

    /**
     * Group by TwoFactorToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorTokenGroupByArgs} args - Group by arguments.
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
      T extends TwoFactorTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TwoFactorTokenGroupByArgs['orderBy'] }
        : { orderBy?: TwoFactorTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TwoFactorTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTwoFactorTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TwoFactorToken model
   */
  readonly fields: TwoFactorTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TwoFactorToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TwoFactorTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the TwoFactorToken model
   */
  interface TwoFactorTokenFieldRefs {
    readonly id: FieldRef<"TwoFactorToken", 'String'>
    readonly email: FieldRef<"TwoFactorToken", 'String'>
    readonly token: FieldRef<"TwoFactorToken", 'String'>
    readonly expires: FieldRef<"TwoFactorToken", 'DateTime'>
    readonly createdAt: FieldRef<"TwoFactorToken", 'DateTime'>
    readonly updatedAt: FieldRef<"TwoFactorToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TwoFactorToken findUnique
   */
  export type TwoFactorTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorToken
     */
    select?: TwoFactorTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorToken
     */
    omit?: TwoFactorTokenOmit<ExtArgs> | null
    /**
     * Filter, which TwoFactorToken to fetch.
     */
    where: TwoFactorTokenWhereUniqueInput
  }

  /**
   * TwoFactorToken findUniqueOrThrow
   */
  export type TwoFactorTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorToken
     */
    select?: TwoFactorTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorToken
     */
    omit?: TwoFactorTokenOmit<ExtArgs> | null
    /**
     * Filter, which TwoFactorToken to fetch.
     */
    where: TwoFactorTokenWhereUniqueInput
  }

  /**
   * TwoFactorToken findFirst
   */
  export type TwoFactorTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorToken
     */
    select?: TwoFactorTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorToken
     */
    omit?: TwoFactorTokenOmit<ExtArgs> | null
    /**
     * Filter, which TwoFactorToken to fetch.
     */
    where?: TwoFactorTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwoFactorTokens to fetch.
     */
    orderBy?: TwoFactorTokenOrderByWithRelationInput | TwoFactorTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TwoFactorTokens.
     */
    cursor?: TwoFactorTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwoFactorTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwoFactorTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TwoFactorTokens.
     */
    distinct?: TwoFactorTokenScalarFieldEnum | TwoFactorTokenScalarFieldEnum[]
  }

  /**
   * TwoFactorToken findFirstOrThrow
   */
  export type TwoFactorTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorToken
     */
    select?: TwoFactorTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorToken
     */
    omit?: TwoFactorTokenOmit<ExtArgs> | null
    /**
     * Filter, which TwoFactorToken to fetch.
     */
    where?: TwoFactorTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwoFactorTokens to fetch.
     */
    orderBy?: TwoFactorTokenOrderByWithRelationInput | TwoFactorTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TwoFactorTokens.
     */
    cursor?: TwoFactorTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwoFactorTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwoFactorTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TwoFactorTokens.
     */
    distinct?: TwoFactorTokenScalarFieldEnum | TwoFactorTokenScalarFieldEnum[]
  }

  /**
   * TwoFactorToken findMany
   */
  export type TwoFactorTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorToken
     */
    select?: TwoFactorTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorToken
     */
    omit?: TwoFactorTokenOmit<ExtArgs> | null
    /**
     * Filter, which TwoFactorTokens to fetch.
     */
    where?: TwoFactorTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwoFactorTokens to fetch.
     */
    orderBy?: TwoFactorTokenOrderByWithRelationInput | TwoFactorTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TwoFactorTokens.
     */
    cursor?: TwoFactorTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwoFactorTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwoFactorTokens.
     */
    skip?: number
    distinct?: TwoFactorTokenScalarFieldEnum | TwoFactorTokenScalarFieldEnum[]
  }

  /**
   * TwoFactorToken create
   */
  export type TwoFactorTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorToken
     */
    select?: TwoFactorTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorToken
     */
    omit?: TwoFactorTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a TwoFactorToken.
     */
    data: XOR<TwoFactorTokenCreateInput, TwoFactorTokenUncheckedCreateInput>
  }

  /**
   * TwoFactorToken createMany
   */
  export type TwoFactorTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TwoFactorTokens.
     */
    data: TwoFactorTokenCreateManyInput | TwoFactorTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TwoFactorToken createManyAndReturn
   */
  export type TwoFactorTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorToken
     */
    select?: TwoFactorTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorToken
     */
    omit?: TwoFactorTokenOmit<ExtArgs> | null
    /**
     * The data used to create many TwoFactorTokens.
     */
    data: TwoFactorTokenCreateManyInput | TwoFactorTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TwoFactorToken update
   */
  export type TwoFactorTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorToken
     */
    select?: TwoFactorTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorToken
     */
    omit?: TwoFactorTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a TwoFactorToken.
     */
    data: XOR<TwoFactorTokenUpdateInput, TwoFactorTokenUncheckedUpdateInput>
    /**
     * Choose, which TwoFactorToken to update.
     */
    where: TwoFactorTokenWhereUniqueInput
  }

  /**
   * TwoFactorToken updateMany
   */
  export type TwoFactorTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TwoFactorTokens.
     */
    data: XOR<TwoFactorTokenUpdateManyMutationInput, TwoFactorTokenUncheckedUpdateManyInput>
    /**
     * Filter which TwoFactorTokens to update
     */
    where?: TwoFactorTokenWhereInput
    /**
     * Limit how many TwoFactorTokens to update.
     */
    limit?: number
  }

  /**
   * TwoFactorToken updateManyAndReturn
   */
  export type TwoFactorTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorToken
     */
    select?: TwoFactorTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorToken
     */
    omit?: TwoFactorTokenOmit<ExtArgs> | null
    /**
     * The data used to update TwoFactorTokens.
     */
    data: XOR<TwoFactorTokenUpdateManyMutationInput, TwoFactorTokenUncheckedUpdateManyInput>
    /**
     * Filter which TwoFactorTokens to update
     */
    where?: TwoFactorTokenWhereInput
    /**
     * Limit how many TwoFactorTokens to update.
     */
    limit?: number
  }

  /**
   * TwoFactorToken upsert
   */
  export type TwoFactorTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorToken
     */
    select?: TwoFactorTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorToken
     */
    omit?: TwoFactorTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the TwoFactorToken to update in case it exists.
     */
    where: TwoFactorTokenWhereUniqueInput
    /**
     * In case the TwoFactorToken found by the `where` argument doesn't exist, create a new TwoFactorToken with this data.
     */
    create: XOR<TwoFactorTokenCreateInput, TwoFactorTokenUncheckedCreateInput>
    /**
     * In case the TwoFactorToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TwoFactorTokenUpdateInput, TwoFactorTokenUncheckedUpdateInput>
  }

  /**
   * TwoFactorToken delete
   */
  export type TwoFactorTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorToken
     */
    select?: TwoFactorTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorToken
     */
    omit?: TwoFactorTokenOmit<ExtArgs> | null
    /**
     * Filter which TwoFactorToken to delete.
     */
    where: TwoFactorTokenWhereUniqueInput
  }

  /**
   * TwoFactorToken deleteMany
   */
  export type TwoFactorTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TwoFactorTokens to delete
     */
    where?: TwoFactorTokenWhereInput
    /**
     * Limit how many TwoFactorTokens to delete.
     */
    limit?: number
  }

  /**
   * TwoFactorToken without action
   */
  export type TwoFactorTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorToken
     */
    select?: TwoFactorTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorToken
     */
    omit?: TwoFactorTokenOmit<ExtArgs> | null
  }


  /**
   * Model TwoFactorConfirmation
   */

  export type AggregateTwoFactorConfirmation = {
    _count: TwoFactorConfirmationCountAggregateOutputType | null
    _min: TwoFactorConfirmationMinAggregateOutputType | null
    _max: TwoFactorConfirmationMaxAggregateOutputType | null
  }

  export type TwoFactorConfirmationMinAggregateOutputType = {
    id: string | null
    userId: string | null
  }

  export type TwoFactorConfirmationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
  }

  export type TwoFactorConfirmationCountAggregateOutputType = {
    id: number
    userId: number
    _all: number
  }


  export type TwoFactorConfirmationMinAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TwoFactorConfirmationMaxAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TwoFactorConfirmationCountAggregateInputType = {
    id?: true
    userId?: true
    _all?: true
  }

  export type TwoFactorConfirmationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TwoFactorConfirmation to aggregate.
     */
    where?: TwoFactorConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwoFactorConfirmations to fetch.
     */
    orderBy?: TwoFactorConfirmationOrderByWithRelationInput | TwoFactorConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TwoFactorConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwoFactorConfirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwoFactorConfirmations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TwoFactorConfirmations
    **/
    _count?: true | TwoFactorConfirmationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TwoFactorConfirmationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TwoFactorConfirmationMaxAggregateInputType
  }

  export type GetTwoFactorConfirmationAggregateType<T extends TwoFactorConfirmationAggregateArgs> = {
        [P in keyof T & keyof AggregateTwoFactorConfirmation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTwoFactorConfirmation[P]>
      : GetScalarType<T[P], AggregateTwoFactorConfirmation[P]>
  }




  export type TwoFactorConfirmationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TwoFactorConfirmationWhereInput
    orderBy?: TwoFactorConfirmationOrderByWithAggregationInput | TwoFactorConfirmationOrderByWithAggregationInput[]
    by: TwoFactorConfirmationScalarFieldEnum[] | TwoFactorConfirmationScalarFieldEnum
    having?: TwoFactorConfirmationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TwoFactorConfirmationCountAggregateInputType | true
    _min?: TwoFactorConfirmationMinAggregateInputType
    _max?: TwoFactorConfirmationMaxAggregateInputType
  }

  export type TwoFactorConfirmationGroupByOutputType = {
    id: string
    userId: string
    _count: TwoFactorConfirmationCountAggregateOutputType | null
    _min: TwoFactorConfirmationMinAggregateOutputType | null
    _max: TwoFactorConfirmationMaxAggregateOutputType | null
  }

  type GetTwoFactorConfirmationGroupByPayload<T extends TwoFactorConfirmationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TwoFactorConfirmationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TwoFactorConfirmationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TwoFactorConfirmationGroupByOutputType[P]>
            : GetScalarType<T[P], TwoFactorConfirmationGroupByOutputType[P]>
        }
      >
    >


  export type TwoFactorConfirmationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["twoFactorConfirmation"]>

  export type TwoFactorConfirmationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["twoFactorConfirmation"]>

  export type TwoFactorConfirmationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["twoFactorConfirmation"]>

  export type TwoFactorConfirmationSelectScalar = {
    id?: boolean
    userId?: boolean
  }

  export type TwoFactorConfirmationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId", ExtArgs["result"]["twoFactorConfirmation"]>
  export type TwoFactorConfirmationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TwoFactorConfirmationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TwoFactorConfirmationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TwoFactorConfirmationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TwoFactorConfirmation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
    }, ExtArgs["result"]["twoFactorConfirmation"]>
    composites: {}
  }

  type TwoFactorConfirmationGetPayload<S extends boolean | null | undefined | TwoFactorConfirmationDefaultArgs> = $Result.GetResult<Prisma.$TwoFactorConfirmationPayload, S>

  type TwoFactorConfirmationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TwoFactorConfirmationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TwoFactorConfirmationCountAggregateInputType | true
    }

  export interface TwoFactorConfirmationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TwoFactorConfirmation'], meta: { name: 'TwoFactorConfirmation' } }
    /**
     * Find zero or one TwoFactorConfirmation that matches the filter.
     * @param {TwoFactorConfirmationFindUniqueArgs} args - Arguments to find a TwoFactorConfirmation
     * @example
     * // Get one TwoFactorConfirmation
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TwoFactorConfirmationFindUniqueArgs>(args: SelectSubset<T, TwoFactorConfirmationFindUniqueArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TwoFactorConfirmation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TwoFactorConfirmationFindUniqueOrThrowArgs} args - Arguments to find a TwoFactorConfirmation
     * @example
     * // Get one TwoFactorConfirmation
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TwoFactorConfirmationFindUniqueOrThrowArgs>(args: SelectSubset<T, TwoFactorConfirmationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TwoFactorConfirmation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorConfirmationFindFirstArgs} args - Arguments to find a TwoFactorConfirmation
     * @example
     * // Get one TwoFactorConfirmation
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TwoFactorConfirmationFindFirstArgs>(args?: SelectSubset<T, TwoFactorConfirmationFindFirstArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TwoFactorConfirmation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorConfirmationFindFirstOrThrowArgs} args - Arguments to find a TwoFactorConfirmation
     * @example
     * // Get one TwoFactorConfirmation
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TwoFactorConfirmationFindFirstOrThrowArgs>(args?: SelectSubset<T, TwoFactorConfirmationFindFirstOrThrowArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TwoFactorConfirmations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorConfirmationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TwoFactorConfirmations
     * const twoFactorConfirmations = await prisma.twoFactorConfirmation.findMany()
     * 
     * // Get first 10 TwoFactorConfirmations
     * const twoFactorConfirmations = await prisma.twoFactorConfirmation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const twoFactorConfirmationWithIdOnly = await prisma.twoFactorConfirmation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TwoFactorConfirmationFindManyArgs>(args?: SelectSubset<T, TwoFactorConfirmationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TwoFactorConfirmation.
     * @param {TwoFactorConfirmationCreateArgs} args - Arguments to create a TwoFactorConfirmation.
     * @example
     * // Create one TwoFactorConfirmation
     * const TwoFactorConfirmation = await prisma.twoFactorConfirmation.create({
     *   data: {
     *     // ... data to create a TwoFactorConfirmation
     *   }
     * })
     * 
     */
    create<T extends TwoFactorConfirmationCreateArgs>(args: SelectSubset<T, TwoFactorConfirmationCreateArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TwoFactorConfirmations.
     * @param {TwoFactorConfirmationCreateManyArgs} args - Arguments to create many TwoFactorConfirmations.
     * @example
     * // Create many TwoFactorConfirmations
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TwoFactorConfirmationCreateManyArgs>(args?: SelectSubset<T, TwoFactorConfirmationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TwoFactorConfirmations and returns the data saved in the database.
     * @param {TwoFactorConfirmationCreateManyAndReturnArgs} args - Arguments to create many TwoFactorConfirmations.
     * @example
     * // Create many TwoFactorConfirmations
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TwoFactorConfirmations and only return the `id`
     * const twoFactorConfirmationWithIdOnly = await prisma.twoFactorConfirmation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TwoFactorConfirmationCreateManyAndReturnArgs>(args?: SelectSubset<T, TwoFactorConfirmationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TwoFactorConfirmation.
     * @param {TwoFactorConfirmationDeleteArgs} args - Arguments to delete one TwoFactorConfirmation.
     * @example
     * // Delete one TwoFactorConfirmation
     * const TwoFactorConfirmation = await prisma.twoFactorConfirmation.delete({
     *   where: {
     *     // ... filter to delete one TwoFactorConfirmation
     *   }
     * })
     * 
     */
    delete<T extends TwoFactorConfirmationDeleteArgs>(args: SelectSubset<T, TwoFactorConfirmationDeleteArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TwoFactorConfirmation.
     * @param {TwoFactorConfirmationUpdateArgs} args - Arguments to update one TwoFactorConfirmation.
     * @example
     * // Update one TwoFactorConfirmation
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TwoFactorConfirmationUpdateArgs>(args: SelectSubset<T, TwoFactorConfirmationUpdateArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TwoFactorConfirmations.
     * @param {TwoFactorConfirmationDeleteManyArgs} args - Arguments to filter TwoFactorConfirmations to delete.
     * @example
     * // Delete a few TwoFactorConfirmations
     * const { count } = await prisma.twoFactorConfirmation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TwoFactorConfirmationDeleteManyArgs>(args?: SelectSubset<T, TwoFactorConfirmationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TwoFactorConfirmations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorConfirmationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TwoFactorConfirmations
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TwoFactorConfirmationUpdateManyArgs>(args: SelectSubset<T, TwoFactorConfirmationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TwoFactorConfirmations and returns the data updated in the database.
     * @param {TwoFactorConfirmationUpdateManyAndReturnArgs} args - Arguments to update many TwoFactorConfirmations.
     * @example
     * // Update many TwoFactorConfirmations
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TwoFactorConfirmations and only return the `id`
     * const twoFactorConfirmationWithIdOnly = await prisma.twoFactorConfirmation.updateManyAndReturn({
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
    updateManyAndReturn<T extends TwoFactorConfirmationUpdateManyAndReturnArgs>(args: SelectSubset<T, TwoFactorConfirmationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TwoFactorConfirmation.
     * @param {TwoFactorConfirmationUpsertArgs} args - Arguments to update or create a TwoFactorConfirmation.
     * @example
     * // Update or create a TwoFactorConfirmation
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.upsert({
     *   create: {
     *     // ... data to create a TwoFactorConfirmation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TwoFactorConfirmation we want to update
     *   }
     * })
     */
    upsert<T extends TwoFactorConfirmationUpsertArgs>(args: SelectSubset<T, TwoFactorConfirmationUpsertArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TwoFactorConfirmations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorConfirmationCountArgs} args - Arguments to filter TwoFactorConfirmations to count.
     * @example
     * // Count the number of TwoFactorConfirmations
     * const count = await prisma.twoFactorConfirmation.count({
     *   where: {
     *     // ... the filter for the TwoFactorConfirmations we want to count
     *   }
     * })
    **/
    count<T extends TwoFactorConfirmationCountArgs>(
      args?: Subset<T, TwoFactorConfirmationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TwoFactorConfirmationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TwoFactorConfirmation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorConfirmationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TwoFactorConfirmationAggregateArgs>(args: Subset<T, TwoFactorConfirmationAggregateArgs>): Prisma.PrismaPromise<GetTwoFactorConfirmationAggregateType<T>>

    /**
     * Group by TwoFactorConfirmation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorConfirmationGroupByArgs} args - Group by arguments.
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
      T extends TwoFactorConfirmationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TwoFactorConfirmationGroupByArgs['orderBy'] }
        : { orderBy?: TwoFactorConfirmationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TwoFactorConfirmationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTwoFactorConfirmationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TwoFactorConfirmation model
   */
  readonly fields: TwoFactorConfirmationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TwoFactorConfirmation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TwoFactorConfirmationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TwoFactorConfirmation model
   */
  interface TwoFactorConfirmationFieldRefs {
    readonly id: FieldRef<"TwoFactorConfirmation", 'String'>
    readonly userId: FieldRef<"TwoFactorConfirmation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TwoFactorConfirmation findUnique
   */
  export type TwoFactorConfirmationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which TwoFactorConfirmation to fetch.
     */
    where: TwoFactorConfirmationWhereUniqueInput
  }

  /**
   * TwoFactorConfirmation findUniqueOrThrow
   */
  export type TwoFactorConfirmationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which TwoFactorConfirmation to fetch.
     */
    where: TwoFactorConfirmationWhereUniqueInput
  }

  /**
   * TwoFactorConfirmation findFirst
   */
  export type TwoFactorConfirmationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which TwoFactorConfirmation to fetch.
     */
    where?: TwoFactorConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwoFactorConfirmations to fetch.
     */
    orderBy?: TwoFactorConfirmationOrderByWithRelationInput | TwoFactorConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TwoFactorConfirmations.
     */
    cursor?: TwoFactorConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwoFactorConfirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwoFactorConfirmations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TwoFactorConfirmations.
     */
    distinct?: TwoFactorConfirmationScalarFieldEnum | TwoFactorConfirmationScalarFieldEnum[]
  }

  /**
   * TwoFactorConfirmation findFirstOrThrow
   */
  export type TwoFactorConfirmationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which TwoFactorConfirmation to fetch.
     */
    where?: TwoFactorConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwoFactorConfirmations to fetch.
     */
    orderBy?: TwoFactorConfirmationOrderByWithRelationInput | TwoFactorConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TwoFactorConfirmations.
     */
    cursor?: TwoFactorConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwoFactorConfirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwoFactorConfirmations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TwoFactorConfirmations.
     */
    distinct?: TwoFactorConfirmationScalarFieldEnum | TwoFactorConfirmationScalarFieldEnum[]
  }

  /**
   * TwoFactorConfirmation findMany
   */
  export type TwoFactorConfirmationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which TwoFactorConfirmations to fetch.
     */
    where?: TwoFactorConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwoFactorConfirmations to fetch.
     */
    orderBy?: TwoFactorConfirmationOrderByWithRelationInput | TwoFactorConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TwoFactorConfirmations.
     */
    cursor?: TwoFactorConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwoFactorConfirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwoFactorConfirmations.
     */
    skip?: number
    distinct?: TwoFactorConfirmationScalarFieldEnum | TwoFactorConfirmationScalarFieldEnum[]
  }

  /**
   * TwoFactorConfirmation create
   */
  export type TwoFactorConfirmationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * The data needed to create a TwoFactorConfirmation.
     */
    data: XOR<TwoFactorConfirmationCreateInput, TwoFactorConfirmationUncheckedCreateInput>
  }

  /**
   * TwoFactorConfirmation createMany
   */
  export type TwoFactorConfirmationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TwoFactorConfirmations.
     */
    data: TwoFactorConfirmationCreateManyInput | TwoFactorConfirmationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TwoFactorConfirmation createManyAndReturn
   */
  export type TwoFactorConfirmationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * The data used to create many TwoFactorConfirmations.
     */
    data: TwoFactorConfirmationCreateManyInput | TwoFactorConfirmationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TwoFactorConfirmation update
   */
  export type TwoFactorConfirmationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * The data needed to update a TwoFactorConfirmation.
     */
    data: XOR<TwoFactorConfirmationUpdateInput, TwoFactorConfirmationUncheckedUpdateInput>
    /**
     * Choose, which TwoFactorConfirmation to update.
     */
    where: TwoFactorConfirmationWhereUniqueInput
  }

  /**
   * TwoFactorConfirmation updateMany
   */
  export type TwoFactorConfirmationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TwoFactorConfirmations.
     */
    data: XOR<TwoFactorConfirmationUpdateManyMutationInput, TwoFactorConfirmationUncheckedUpdateManyInput>
    /**
     * Filter which TwoFactorConfirmations to update
     */
    where?: TwoFactorConfirmationWhereInput
    /**
     * Limit how many TwoFactorConfirmations to update.
     */
    limit?: number
  }

  /**
   * TwoFactorConfirmation updateManyAndReturn
   */
  export type TwoFactorConfirmationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * The data used to update TwoFactorConfirmations.
     */
    data: XOR<TwoFactorConfirmationUpdateManyMutationInput, TwoFactorConfirmationUncheckedUpdateManyInput>
    /**
     * Filter which TwoFactorConfirmations to update
     */
    where?: TwoFactorConfirmationWhereInput
    /**
     * Limit how many TwoFactorConfirmations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TwoFactorConfirmation upsert
   */
  export type TwoFactorConfirmationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * The filter to search for the TwoFactorConfirmation to update in case it exists.
     */
    where: TwoFactorConfirmationWhereUniqueInput
    /**
     * In case the TwoFactorConfirmation found by the `where` argument doesn't exist, create a new TwoFactorConfirmation with this data.
     */
    create: XOR<TwoFactorConfirmationCreateInput, TwoFactorConfirmationUncheckedCreateInput>
    /**
     * In case the TwoFactorConfirmation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TwoFactorConfirmationUpdateInput, TwoFactorConfirmationUncheckedUpdateInput>
  }

  /**
   * TwoFactorConfirmation delete
   */
  export type TwoFactorConfirmationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * Filter which TwoFactorConfirmation to delete.
     */
    where: TwoFactorConfirmationWhereUniqueInput
  }

  /**
   * TwoFactorConfirmation deleteMany
   */
  export type TwoFactorConfirmationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TwoFactorConfirmations to delete
     */
    where?: TwoFactorConfirmationWhereInput
    /**
     * Limit how many TwoFactorConfirmations to delete.
     */
    limit?: number
  }

  /**
   * TwoFactorConfirmation without action
   */
  export type TwoFactorConfirmationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
  }


  /**
   * Model VersionInfo
   */

  export type AggregateVersionInfo = {
    _count: VersionInfoCountAggregateOutputType | null
    _min: VersionInfoMinAggregateOutputType | null
    _max: VersionInfoMaxAggregateOutputType | null
  }

  export type VersionInfoMinAggregateOutputType = {
    id: string | null
    version: string | null
    status: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type VersionInfoMaxAggregateOutputType = {
    id: string | null
    version: string | null
    status: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type VersionInfoCountAggregateOutputType = {
    id: number
    version: number
    status: number
    description: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type VersionInfoMinAggregateInputType = {
    id?: true
    version?: true
    status?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type VersionInfoMaxAggregateInputType = {
    id?: true
    version?: true
    status?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type VersionInfoCountAggregateInputType = {
    id?: true
    version?: true
    status?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type VersionInfoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VersionInfo to aggregate.
     */
    where?: VersionInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VersionInfos to fetch.
     */
    orderBy?: VersionInfoOrderByWithRelationInput | VersionInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VersionInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VersionInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VersionInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VersionInfos
    **/
    _count?: true | VersionInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VersionInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VersionInfoMaxAggregateInputType
  }

  export type GetVersionInfoAggregateType<T extends VersionInfoAggregateArgs> = {
        [P in keyof T & keyof AggregateVersionInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVersionInfo[P]>
      : GetScalarType<T[P], AggregateVersionInfo[P]>
  }




  export type VersionInfoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VersionInfoWhereInput
    orderBy?: VersionInfoOrderByWithAggregationInput | VersionInfoOrderByWithAggregationInput[]
    by: VersionInfoScalarFieldEnum[] | VersionInfoScalarFieldEnum
    having?: VersionInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VersionInfoCountAggregateInputType | true
    _min?: VersionInfoMinAggregateInputType
    _max?: VersionInfoMaxAggregateInputType
  }

  export type VersionInfoGroupByOutputType = {
    id: string
    version: string
    status: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: VersionInfoCountAggregateOutputType | null
    _min: VersionInfoMinAggregateOutputType | null
    _max: VersionInfoMaxAggregateOutputType | null
  }

  type GetVersionInfoGroupByPayload<T extends VersionInfoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VersionInfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VersionInfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VersionInfoGroupByOutputType[P]>
            : GetScalarType<T[P], VersionInfoGroupByOutputType[P]>
        }
      >
    >


  export type VersionInfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    version?: boolean
    status?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["versionInfo"]>

  export type VersionInfoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    version?: boolean
    status?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["versionInfo"]>

  export type VersionInfoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    version?: boolean
    status?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["versionInfo"]>

  export type VersionInfoSelectScalar = {
    id?: boolean
    version?: boolean
    status?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type VersionInfoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "version" | "status" | "description" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["versionInfo"]>

  export type $VersionInfoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VersionInfo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      version: string
      status: string
      description: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["versionInfo"]>
    composites: {}
  }

  type VersionInfoGetPayload<S extends boolean | null | undefined | VersionInfoDefaultArgs> = $Result.GetResult<Prisma.$VersionInfoPayload, S>

  type VersionInfoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VersionInfoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VersionInfoCountAggregateInputType | true
    }

  export interface VersionInfoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VersionInfo'], meta: { name: 'VersionInfo' } }
    /**
     * Find zero or one VersionInfo that matches the filter.
     * @param {VersionInfoFindUniqueArgs} args - Arguments to find a VersionInfo
     * @example
     * // Get one VersionInfo
     * const versionInfo = await prisma.versionInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VersionInfoFindUniqueArgs>(args: SelectSubset<T, VersionInfoFindUniqueArgs<ExtArgs>>): Prisma__VersionInfoClient<$Result.GetResult<Prisma.$VersionInfoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VersionInfo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VersionInfoFindUniqueOrThrowArgs} args - Arguments to find a VersionInfo
     * @example
     * // Get one VersionInfo
     * const versionInfo = await prisma.versionInfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VersionInfoFindUniqueOrThrowArgs>(args: SelectSubset<T, VersionInfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VersionInfoClient<$Result.GetResult<Prisma.$VersionInfoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VersionInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionInfoFindFirstArgs} args - Arguments to find a VersionInfo
     * @example
     * // Get one VersionInfo
     * const versionInfo = await prisma.versionInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VersionInfoFindFirstArgs>(args?: SelectSubset<T, VersionInfoFindFirstArgs<ExtArgs>>): Prisma__VersionInfoClient<$Result.GetResult<Prisma.$VersionInfoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VersionInfo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionInfoFindFirstOrThrowArgs} args - Arguments to find a VersionInfo
     * @example
     * // Get one VersionInfo
     * const versionInfo = await prisma.versionInfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VersionInfoFindFirstOrThrowArgs>(args?: SelectSubset<T, VersionInfoFindFirstOrThrowArgs<ExtArgs>>): Prisma__VersionInfoClient<$Result.GetResult<Prisma.$VersionInfoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VersionInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionInfoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VersionInfos
     * const versionInfos = await prisma.versionInfo.findMany()
     * 
     * // Get first 10 VersionInfos
     * const versionInfos = await prisma.versionInfo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const versionInfoWithIdOnly = await prisma.versionInfo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VersionInfoFindManyArgs>(args?: SelectSubset<T, VersionInfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VersionInfoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VersionInfo.
     * @param {VersionInfoCreateArgs} args - Arguments to create a VersionInfo.
     * @example
     * // Create one VersionInfo
     * const VersionInfo = await prisma.versionInfo.create({
     *   data: {
     *     // ... data to create a VersionInfo
     *   }
     * })
     * 
     */
    create<T extends VersionInfoCreateArgs>(args: SelectSubset<T, VersionInfoCreateArgs<ExtArgs>>): Prisma__VersionInfoClient<$Result.GetResult<Prisma.$VersionInfoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VersionInfos.
     * @param {VersionInfoCreateManyArgs} args - Arguments to create many VersionInfos.
     * @example
     * // Create many VersionInfos
     * const versionInfo = await prisma.versionInfo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VersionInfoCreateManyArgs>(args?: SelectSubset<T, VersionInfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VersionInfos and returns the data saved in the database.
     * @param {VersionInfoCreateManyAndReturnArgs} args - Arguments to create many VersionInfos.
     * @example
     * // Create many VersionInfos
     * const versionInfo = await prisma.versionInfo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VersionInfos and only return the `id`
     * const versionInfoWithIdOnly = await prisma.versionInfo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VersionInfoCreateManyAndReturnArgs>(args?: SelectSubset<T, VersionInfoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VersionInfoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VersionInfo.
     * @param {VersionInfoDeleteArgs} args - Arguments to delete one VersionInfo.
     * @example
     * // Delete one VersionInfo
     * const VersionInfo = await prisma.versionInfo.delete({
     *   where: {
     *     // ... filter to delete one VersionInfo
     *   }
     * })
     * 
     */
    delete<T extends VersionInfoDeleteArgs>(args: SelectSubset<T, VersionInfoDeleteArgs<ExtArgs>>): Prisma__VersionInfoClient<$Result.GetResult<Prisma.$VersionInfoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VersionInfo.
     * @param {VersionInfoUpdateArgs} args - Arguments to update one VersionInfo.
     * @example
     * // Update one VersionInfo
     * const versionInfo = await prisma.versionInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VersionInfoUpdateArgs>(args: SelectSubset<T, VersionInfoUpdateArgs<ExtArgs>>): Prisma__VersionInfoClient<$Result.GetResult<Prisma.$VersionInfoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VersionInfos.
     * @param {VersionInfoDeleteManyArgs} args - Arguments to filter VersionInfos to delete.
     * @example
     * // Delete a few VersionInfos
     * const { count } = await prisma.versionInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VersionInfoDeleteManyArgs>(args?: SelectSubset<T, VersionInfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VersionInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VersionInfos
     * const versionInfo = await prisma.versionInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VersionInfoUpdateManyArgs>(args: SelectSubset<T, VersionInfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VersionInfos and returns the data updated in the database.
     * @param {VersionInfoUpdateManyAndReturnArgs} args - Arguments to update many VersionInfos.
     * @example
     * // Update many VersionInfos
     * const versionInfo = await prisma.versionInfo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VersionInfos and only return the `id`
     * const versionInfoWithIdOnly = await prisma.versionInfo.updateManyAndReturn({
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
    updateManyAndReturn<T extends VersionInfoUpdateManyAndReturnArgs>(args: SelectSubset<T, VersionInfoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VersionInfoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VersionInfo.
     * @param {VersionInfoUpsertArgs} args - Arguments to update or create a VersionInfo.
     * @example
     * // Update or create a VersionInfo
     * const versionInfo = await prisma.versionInfo.upsert({
     *   create: {
     *     // ... data to create a VersionInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VersionInfo we want to update
     *   }
     * })
     */
    upsert<T extends VersionInfoUpsertArgs>(args: SelectSubset<T, VersionInfoUpsertArgs<ExtArgs>>): Prisma__VersionInfoClient<$Result.GetResult<Prisma.$VersionInfoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VersionInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionInfoCountArgs} args - Arguments to filter VersionInfos to count.
     * @example
     * // Count the number of VersionInfos
     * const count = await prisma.versionInfo.count({
     *   where: {
     *     // ... the filter for the VersionInfos we want to count
     *   }
     * })
    **/
    count<T extends VersionInfoCountArgs>(
      args?: Subset<T, VersionInfoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VersionInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VersionInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VersionInfoAggregateArgs>(args: Subset<T, VersionInfoAggregateArgs>): Prisma.PrismaPromise<GetVersionInfoAggregateType<T>>

    /**
     * Group by VersionInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionInfoGroupByArgs} args - Group by arguments.
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
      T extends VersionInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VersionInfoGroupByArgs['orderBy'] }
        : { orderBy?: VersionInfoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VersionInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVersionInfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VersionInfo model
   */
  readonly fields: VersionInfoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VersionInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VersionInfoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the VersionInfo model
   */
  interface VersionInfoFieldRefs {
    readonly id: FieldRef<"VersionInfo", 'String'>
    readonly version: FieldRef<"VersionInfo", 'String'>
    readonly status: FieldRef<"VersionInfo", 'String'>
    readonly description: FieldRef<"VersionInfo", 'String'>
    readonly createdAt: FieldRef<"VersionInfo", 'DateTime'>
    readonly updatedAt: FieldRef<"VersionInfo", 'DateTime'>
    readonly deletedAt: FieldRef<"VersionInfo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VersionInfo findUnique
   */
  export type VersionInfoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionInfo
     */
    select?: VersionInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionInfo
     */
    omit?: VersionInfoOmit<ExtArgs> | null
    /**
     * Filter, which VersionInfo to fetch.
     */
    where: VersionInfoWhereUniqueInput
  }

  /**
   * VersionInfo findUniqueOrThrow
   */
  export type VersionInfoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionInfo
     */
    select?: VersionInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionInfo
     */
    omit?: VersionInfoOmit<ExtArgs> | null
    /**
     * Filter, which VersionInfo to fetch.
     */
    where: VersionInfoWhereUniqueInput
  }

  /**
   * VersionInfo findFirst
   */
  export type VersionInfoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionInfo
     */
    select?: VersionInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionInfo
     */
    omit?: VersionInfoOmit<ExtArgs> | null
    /**
     * Filter, which VersionInfo to fetch.
     */
    where?: VersionInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VersionInfos to fetch.
     */
    orderBy?: VersionInfoOrderByWithRelationInput | VersionInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VersionInfos.
     */
    cursor?: VersionInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VersionInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VersionInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VersionInfos.
     */
    distinct?: VersionInfoScalarFieldEnum | VersionInfoScalarFieldEnum[]
  }

  /**
   * VersionInfo findFirstOrThrow
   */
  export type VersionInfoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionInfo
     */
    select?: VersionInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionInfo
     */
    omit?: VersionInfoOmit<ExtArgs> | null
    /**
     * Filter, which VersionInfo to fetch.
     */
    where?: VersionInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VersionInfos to fetch.
     */
    orderBy?: VersionInfoOrderByWithRelationInput | VersionInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VersionInfos.
     */
    cursor?: VersionInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VersionInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VersionInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VersionInfos.
     */
    distinct?: VersionInfoScalarFieldEnum | VersionInfoScalarFieldEnum[]
  }

  /**
   * VersionInfo findMany
   */
  export type VersionInfoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionInfo
     */
    select?: VersionInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionInfo
     */
    omit?: VersionInfoOmit<ExtArgs> | null
    /**
     * Filter, which VersionInfos to fetch.
     */
    where?: VersionInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VersionInfos to fetch.
     */
    orderBy?: VersionInfoOrderByWithRelationInput | VersionInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VersionInfos.
     */
    cursor?: VersionInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VersionInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VersionInfos.
     */
    skip?: number
    distinct?: VersionInfoScalarFieldEnum | VersionInfoScalarFieldEnum[]
  }

  /**
   * VersionInfo create
   */
  export type VersionInfoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionInfo
     */
    select?: VersionInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionInfo
     */
    omit?: VersionInfoOmit<ExtArgs> | null
    /**
     * The data needed to create a VersionInfo.
     */
    data: XOR<VersionInfoCreateInput, VersionInfoUncheckedCreateInput>
  }

  /**
   * VersionInfo createMany
   */
  export type VersionInfoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VersionInfos.
     */
    data: VersionInfoCreateManyInput | VersionInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VersionInfo createManyAndReturn
   */
  export type VersionInfoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionInfo
     */
    select?: VersionInfoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VersionInfo
     */
    omit?: VersionInfoOmit<ExtArgs> | null
    /**
     * The data used to create many VersionInfos.
     */
    data: VersionInfoCreateManyInput | VersionInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VersionInfo update
   */
  export type VersionInfoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionInfo
     */
    select?: VersionInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionInfo
     */
    omit?: VersionInfoOmit<ExtArgs> | null
    /**
     * The data needed to update a VersionInfo.
     */
    data: XOR<VersionInfoUpdateInput, VersionInfoUncheckedUpdateInput>
    /**
     * Choose, which VersionInfo to update.
     */
    where: VersionInfoWhereUniqueInput
  }

  /**
   * VersionInfo updateMany
   */
  export type VersionInfoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VersionInfos.
     */
    data: XOR<VersionInfoUpdateManyMutationInput, VersionInfoUncheckedUpdateManyInput>
    /**
     * Filter which VersionInfos to update
     */
    where?: VersionInfoWhereInput
    /**
     * Limit how many VersionInfos to update.
     */
    limit?: number
  }

  /**
   * VersionInfo updateManyAndReturn
   */
  export type VersionInfoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionInfo
     */
    select?: VersionInfoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VersionInfo
     */
    omit?: VersionInfoOmit<ExtArgs> | null
    /**
     * The data used to update VersionInfos.
     */
    data: XOR<VersionInfoUpdateManyMutationInput, VersionInfoUncheckedUpdateManyInput>
    /**
     * Filter which VersionInfos to update
     */
    where?: VersionInfoWhereInput
    /**
     * Limit how many VersionInfos to update.
     */
    limit?: number
  }

  /**
   * VersionInfo upsert
   */
  export type VersionInfoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionInfo
     */
    select?: VersionInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionInfo
     */
    omit?: VersionInfoOmit<ExtArgs> | null
    /**
     * The filter to search for the VersionInfo to update in case it exists.
     */
    where: VersionInfoWhereUniqueInput
    /**
     * In case the VersionInfo found by the `where` argument doesn't exist, create a new VersionInfo with this data.
     */
    create: XOR<VersionInfoCreateInput, VersionInfoUncheckedCreateInput>
    /**
     * In case the VersionInfo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VersionInfoUpdateInput, VersionInfoUncheckedUpdateInput>
  }

  /**
   * VersionInfo delete
   */
  export type VersionInfoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionInfo
     */
    select?: VersionInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionInfo
     */
    omit?: VersionInfoOmit<ExtArgs> | null
    /**
     * Filter which VersionInfo to delete.
     */
    where: VersionInfoWhereUniqueInput
  }

  /**
   * VersionInfo deleteMany
   */
  export type VersionInfoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VersionInfos to delete
     */
    where?: VersionInfoWhereInput
    /**
     * Limit how many VersionInfos to delete.
     */
    limit?: number
  }

  /**
   * VersionInfo without action
   */
  export type VersionInfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionInfo
     */
    select?: VersionInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionInfo
     */
    omit?: VersionInfoOmit<ExtArgs> | null
  }


  /**
   * Model Feedback
   */

  export type AggregateFeedback = {
    _count: FeedbackCountAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  export type FeedbackMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    message: string | null
    anonymous: boolean | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type FeedbackMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    message: string | null
    anonymous: boolean | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type FeedbackCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    message: number
    anonymous: number
    status: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type FeedbackMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    message?: true
    anonymous?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type FeedbackMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    message?: true
    anonymous?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type FeedbackCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    message?: true
    anonymous?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type FeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedback to aggregate.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Feedbacks
    **/
    _count?: true | FeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackMaxAggregateInputType
  }

  export type GetFeedbackAggregateType<T extends FeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedback[P]>
      : GetScalarType<T[P], AggregateFeedback[P]>
  }




  export type FeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithAggregationInput | FeedbackOrderByWithAggregationInput[]
    by: FeedbackScalarFieldEnum[] | FeedbackScalarFieldEnum
    having?: FeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackCountAggregateInputType | true
    _min?: FeedbackMinAggregateInputType
    _max?: FeedbackMaxAggregateInputType
  }

  export type FeedbackGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    phone: string | null
    message: string
    anonymous: boolean
    status: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: FeedbackCountAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  type GetFeedbackGroupByPayload<T extends FeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    message?: boolean
    anonymous?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    message?: boolean
    anonymous?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    message?: boolean
    anonymous?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    message?: boolean
    anonymous?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type FeedbackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "message" | "anonymous" | "status" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["feedback"]>

  export type $FeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feedback"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      phone: string | null
      message: string
      anonymous: boolean
      status: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["feedback"]>
    composites: {}
  }

  type FeedbackGetPayload<S extends boolean | null | undefined | FeedbackDefaultArgs> = $Result.GetResult<Prisma.$FeedbackPayload, S>

  type FeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedbackCountAggregateInputType | true
    }

  export interface FeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feedback'], meta: { name: 'Feedback' } }
    /**
     * Find zero or one Feedback that matches the filter.
     * @param {FeedbackFindUniqueArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackFindUniqueArgs>(args: SelectSubset<T, FeedbackFindUniqueArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Feedback that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedbackFindUniqueOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackFindFirstArgs>(args?: SelectSubset<T, FeedbackFindFirstArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Feedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Feedbacks
     * const feedbacks = await prisma.feedback.findMany()
     * 
     * // Get first 10 Feedbacks
     * const feedbacks = await prisma.feedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackWithIdOnly = await prisma.feedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackFindManyArgs>(args?: SelectSubset<T, FeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Feedback.
     * @param {FeedbackCreateArgs} args - Arguments to create a Feedback.
     * @example
     * // Create one Feedback
     * const Feedback = await prisma.feedback.create({
     *   data: {
     *     // ... data to create a Feedback
     *   }
     * })
     * 
     */
    create<T extends FeedbackCreateArgs>(args: SelectSubset<T, FeedbackCreateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Feedbacks.
     * @param {FeedbackCreateManyArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackCreateManyArgs>(args?: SelectSubset<T, FeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Feedbacks and returns the data saved in the database.
     * @param {FeedbackCreateManyAndReturnArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Feedback.
     * @param {FeedbackDeleteArgs} args - Arguments to delete one Feedback.
     * @example
     * // Delete one Feedback
     * const Feedback = await prisma.feedback.delete({
     *   where: {
     *     // ... filter to delete one Feedback
     *   }
     * })
     * 
     */
    delete<T extends FeedbackDeleteArgs>(args: SelectSubset<T, FeedbackDeleteArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Feedback.
     * @param {FeedbackUpdateArgs} args - Arguments to update one Feedback.
     * @example
     * // Update one Feedback
     * const feedback = await prisma.feedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackUpdateArgs>(args: SelectSubset<T, FeedbackUpdateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Feedbacks.
     * @param {FeedbackDeleteManyArgs} args - Arguments to filter Feedbacks to delete.
     * @example
     * // Delete a few Feedbacks
     * const { count } = await prisma.feedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackDeleteManyArgs>(args?: SelectSubset<T, FeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackUpdateManyArgs>(args: SelectSubset<T, FeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks and returns the data updated in the database.
     * @param {FeedbackUpdateManyAndReturnArgs} args - Arguments to update many Feedbacks.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.updateManyAndReturn({
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
    updateManyAndReturn<T extends FeedbackUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Feedback.
     * @param {FeedbackUpsertArgs} args - Arguments to update or create a Feedback.
     * @example
     * // Update or create a Feedback
     * const feedback = await prisma.feedback.upsert({
     *   create: {
     *     // ... data to create a Feedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feedback we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackUpsertArgs>(args: SelectSubset<T, FeedbackUpsertArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackCountArgs} args - Arguments to filter Feedbacks to count.
     * @example
     * // Count the number of Feedbacks
     * const count = await prisma.feedback.count({
     *   where: {
     *     // ... the filter for the Feedbacks we want to count
     *   }
     * })
    **/
    count<T extends FeedbackCountArgs>(
      args?: Subset<T, FeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FeedbackAggregateArgs>(args: Subset<T, FeedbackAggregateArgs>): Prisma.PrismaPromise<GetFeedbackAggregateType<T>>

    /**
     * Group by Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackGroupByArgs} args - Group by arguments.
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
      T extends FeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feedback model
   */
  readonly fields: FeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Feedback model
   */
  interface FeedbackFieldRefs {
    readonly id: FieldRef<"Feedback", 'String'>
    readonly name: FieldRef<"Feedback", 'String'>
    readonly email: FieldRef<"Feedback", 'String'>
    readonly phone: FieldRef<"Feedback", 'String'>
    readonly message: FieldRef<"Feedback", 'String'>
    readonly anonymous: FieldRef<"Feedback", 'Boolean'>
    readonly status: FieldRef<"Feedback", 'String'>
    readonly createdAt: FieldRef<"Feedback", 'DateTime'>
    readonly updatedAt: FieldRef<"Feedback", 'DateTime'>
    readonly deletedAt: FieldRef<"Feedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Feedback findUnique
   */
  export type FeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findUniqueOrThrow
   */
  export type FeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findFirst
   */
  export type FeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findFirstOrThrow
   */
  export type FeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findMany
   */
  export type FeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedbacks to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback create
   */
  export type FeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data needed to create a Feedback.
     */
    data: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
  }

  /**
   * Feedback createMany
   */
  export type FeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feedback createManyAndReturn
   */
  export type FeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feedback update
   */
  export type FeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data needed to update a Feedback.
     */
    data: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
    /**
     * Choose, which Feedback to update.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback updateMany
   */
  export type FeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
  }

  /**
   * Feedback updateManyAndReturn
   */
  export type FeedbackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
  }

  /**
   * Feedback upsert
   */
  export type FeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The filter to search for the Feedback to update in case it exists.
     */
    where: FeedbackWhereUniqueInput
    /**
     * In case the Feedback found by the `where` argument doesn't exist, create a new Feedback with this data.
     */
    create: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
    /**
     * In case the Feedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
  }

  /**
   * Feedback delete
   */
  export type FeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter which Feedback to delete.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback deleteMany
   */
  export type FeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedbacks to delete
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to delete.
     */
    limit?: number
  }

  /**
   * Feedback without action
   */
  export type FeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
  }


  /**
   * Model UpdateLog
   */

  export type AggregateUpdateLog = {
    _count: UpdateLogCountAggregateOutputType | null
    _min: UpdateLogMinAggregateOutputType | null
    _max: UpdateLogMaxAggregateOutputType | null
  }

  export type UpdateLogMinAggregateOutputType = {
    id: string | null
    name: string | null
    message: string | null
    updatedBy: string | null
    orgId: string | null
    type: $Enums.LogType | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UpdateLogMaxAggregateOutputType = {
    id: string | null
    name: string | null
    message: string | null
    updatedBy: string | null
    orgId: string | null
    type: $Enums.LogType | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UpdateLogCountAggregateOutputType = {
    id: number
    name: number
    message: number
    updatedBy: number
    orgId: number
    type: number
    date: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UpdateLogMinAggregateInputType = {
    id?: true
    name?: true
    message?: true
    updatedBy?: true
    orgId?: true
    type?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UpdateLogMaxAggregateInputType = {
    id?: true
    name?: true
    message?: true
    updatedBy?: true
    orgId?: true
    type?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UpdateLogCountAggregateInputType = {
    id?: true
    name?: true
    message?: true
    updatedBy?: true
    orgId?: true
    type?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UpdateLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UpdateLog to aggregate.
     */
    where?: UpdateLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UpdateLogs to fetch.
     */
    orderBy?: UpdateLogOrderByWithRelationInput | UpdateLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UpdateLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UpdateLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UpdateLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UpdateLogs
    **/
    _count?: true | UpdateLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UpdateLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UpdateLogMaxAggregateInputType
  }

  export type GetUpdateLogAggregateType<T extends UpdateLogAggregateArgs> = {
        [P in keyof T & keyof AggregateUpdateLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUpdateLog[P]>
      : GetScalarType<T[P], AggregateUpdateLog[P]>
  }




  export type UpdateLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UpdateLogWhereInput
    orderBy?: UpdateLogOrderByWithAggregationInput | UpdateLogOrderByWithAggregationInput[]
    by: UpdateLogScalarFieldEnum[] | UpdateLogScalarFieldEnum
    having?: UpdateLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UpdateLogCountAggregateInputType | true
    _min?: UpdateLogMinAggregateInputType
    _max?: UpdateLogMaxAggregateInputType
  }

  export type UpdateLogGroupByOutputType = {
    id: string
    name: string
    message: string
    updatedBy: string
    orgId: string | null
    type: $Enums.LogType
    date: Date
    createdAt: Date
    updatedAt: Date
    _count: UpdateLogCountAggregateOutputType | null
    _min: UpdateLogMinAggregateOutputType | null
    _max: UpdateLogMaxAggregateOutputType | null
  }

  type GetUpdateLogGroupByPayload<T extends UpdateLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UpdateLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UpdateLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UpdateLogGroupByOutputType[P]>
            : GetScalarType<T[P], UpdateLogGroupByOutputType[P]>
        }
      >
    >


  export type UpdateLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    message?: boolean
    updatedBy?: boolean
    orgId?: boolean
    type?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["updateLog"]>

  export type UpdateLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    message?: boolean
    updatedBy?: boolean
    orgId?: boolean
    type?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["updateLog"]>

  export type UpdateLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    message?: boolean
    updatedBy?: boolean
    orgId?: boolean
    type?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["updateLog"]>

  export type UpdateLogSelectScalar = {
    id?: boolean
    name?: boolean
    message?: boolean
    updatedBy?: boolean
    orgId?: boolean
    type?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UpdateLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "message" | "updatedBy" | "orgId" | "type" | "date" | "createdAt" | "updatedAt", ExtArgs["result"]["updateLog"]>

  export type $UpdateLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UpdateLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      message: string
      updatedBy: string
      orgId: string | null
      type: $Enums.LogType
      date: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["updateLog"]>
    composites: {}
  }

  type UpdateLogGetPayload<S extends boolean | null | undefined | UpdateLogDefaultArgs> = $Result.GetResult<Prisma.$UpdateLogPayload, S>

  type UpdateLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UpdateLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UpdateLogCountAggregateInputType | true
    }

  export interface UpdateLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UpdateLog'], meta: { name: 'UpdateLog' } }
    /**
     * Find zero or one UpdateLog that matches the filter.
     * @param {UpdateLogFindUniqueArgs} args - Arguments to find a UpdateLog
     * @example
     * // Get one UpdateLog
     * const updateLog = await prisma.updateLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UpdateLogFindUniqueArgs>(args: SelectSubset<T, UpdateLogFindUniqueArgs<ExtArgs>>): Prisma__UpdateLogClient<$Result.GetResult<Prisma.$UpdateLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UpdateLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UpdateLogFindUniqueOrThrowArgs} args - Arguments to find a UpdateLog
     * @example
     * // Get one UpdateLog
     * const updateLog = await prisma.updateLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UpdateLogFindUniqueOrThrowArgs>(args: SelectSubset<T, UpdateLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UpdateLogClient<$Result.GetResult<Prisma.$UpdateLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UpdateLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateLogFindFirstArgs} args - Arguments to find a UpdateLog
     * @example
     * // Get one UpdateLog
     * const updateLog = await prisma.updateLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UpdateLogFindFirstArgs>(args?: SelectSubset<T, UpdateLogFindFirstArgs<ExtArgs>>): Prisma__UpdateLogClient<$Result.GetResult<Prisma.$UpdateLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UpdateLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateLogFindFirstOrThrowArgs} args - Arguments to find a UpdateLog
     * @example
     * // Get one UpdateLog
     * const updateLog = await prisma.updateLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UpdateLogFindFirstOrThrowArgs>(args?: SelectSubset<T, UpdateLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__UpdateLogClient<$Result.GetResult<Prisma.$UpdateLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UpdateLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UpdateLogs
     * const updateLogs = await prisma.updateLog.findMany()
     * 
     * // Get first 10 UpdateLogs
     * const updateLogs = await prisma.updateLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const updateLogWithIdOnly = await prisma.updateLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UpdateLogFindManyArgs>(args?: SelectSubset<T, UpdateLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpdateLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UpdateLog.
     * @param {UpdateLogCreateArgs} args - Arguments to create a UpdateLog.
     * @example
     * // Create one UpdateLog
     * const UpdateLog = await prisma.updateLog.create({
     *   data: {
     *     // ... data to create a UpdateLog
     *   }
     * })
     * 
     */
    create<T extends UpdateLogCreateArgs>(args: SelectSubset<T, UpdateLogCreateArgs<ExtArgs>>): Prisma__UpdateLogClient<$Result.GetResult<Prisma.$UpdateLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UpdateLogs.
     * @param {UpdateLogCreateManyArgs} args - Arguments to create many UpdateLogs.
     * @example
     * // Create many UpdateLogs
     * const updateLog = await prisma.updateLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UpdateLogCreateManyArgs>(args?: SelectSubset<T, UpdateLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UpdateLogs and returns the data saved in the database.
     * @param {UpdateLogCreateManyAndReturnArgs} args - Arguments to create many UpdateLogs.
     * @example
     * // Create many UpdateLogs
     * const updateLog = await prisma.updateLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UpdateLogs and only return the `id`
     * const updateLogWithIdOnly = await prisma.updateLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UpdateLogCreateManyAndReturnArgs>(args?: SelectSubset<T, UpdateLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpdateLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UpdateLog.
     * @param {UpdateLogDeleteArgs} args - Arguments to delete one UpdateLog.
     * @example
     * // Delete one UpdateLog
     * const UpdateLog = await prisma.updateLog.delete({
     *   where: {
     *     // ... filter to delete one UpdateLog
     *   }
     * })
     * 
     */
    delete<T extends UpdateLogDeleteArgs>(args: SelectSubset<T, UpdateLogDeleteArgs<ExtArgs>>): Prisma__UpdateLogClient<$Result.GetResult<Prisma.$UpdateLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UpdateLog.
     * @param {UpdateLogUpdateArgs} args - Arguments to update one UpdateLog.
     * @example
     * // Update one UpdateLog
     * const updateLog = await prisma.updateLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UpdateLogUpdateArgs>(args: SelectSubset<T, UpdateLogUpdateArgs<ExtArgs>>): Prisma__UpdateLogClient<$Result.GetResult<Prisma.$UpdateLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UpdateLogs.
     * @param {UpdateLogDeleteManyArgs} args - Arguments to filter UpdateLogs to delete.
     * @example
     * // Delete a few UpdateLogs
     * const { count } = await prisma.updateLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UpdateLogDeleteManyArgs>(args?: SelectSubset<T, UpdateLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UpdateLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UpdateLogs
     * const updateLog = await prisma.updateLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UpdateLogUpdateManyArgs>(args: SelectSubset<T, UpdateLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UpdateLogs and returns the data updated in the database.
     * @param {UpdateLogUpdateManyAndReturnArgs} args - Arguments to update many UpdateLogs.
     * @example
     * // Update many UpdateLogs
     * const updateLog = await prisma.updateLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UpdateLogs and only return the `id`
     * const updateLogWithIdOnly = await prisma.updateLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends UpdateLogUpdateManyAndReturnArgs>(args: SelectSubset<T, UpdateLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpdateLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UpdateLog.
     * @param {UpdateLogUpsertArgs} args - Arguments to update or create a UpdateLog.
     * @example
     * // Update or create a UpdateLog
     * const updateLog = await prisma.updateLog.upsert({
     *   create: {
     *     // ... data to create a UpdateLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UpdateLog we want to update
     *   }
     * })
     */
    upsert<T extends UpdateLogUpsertArgs>(args: SelectSubset<T, UpdateLogUpsertArgs<ExtArgs>>): Prisma__UpdateLogClient<$Result.GetResult<Prisma.$UpdateLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UpdateLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateLogCountArgs} args - Arguments to filter UpdateLogs to count.
     * @example
     * // Count the number of UpdateLogs
     * const count = await prisma.updateLog.count({
     *   where: {
     *     // ... the filter for the UpdateLogs we want to count
     *   }
     * })
    **/
    count<T extends UpdateLogCountArgs>(
      args?: Subset<T, UpdateLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UpdateLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UpdateLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UpdateLogAggregateArgs>(args: Subset<T, UpdateLogAggregateArgs>): Prisma.PrismaPromise<GetUpdateLogAggregateType<T>>

    /**
     * Group by UpdateLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateLogGroupByArgs} args - Group by arguments.
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
      T extends UpdateLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UpdateLogGroupByArgs['orderBy'] }
        : { orderBy?: UpdateLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UpdateLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUpdateLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UpdateLog model
   */
  readonly fields: UpdateLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UpdateLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UpdateLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the UpdateLog model
   */
  interface UpdateLogFieldRefs {
    readonly id: FieldRef<"UpdateLog", 'String'>
    readonly name: FieldRef<"UpdateLog", 'String'>
    readonly message: FieldRef<"UpdateLog", 'String'>
    readonly updatedBy: FieldRef<"UpdateLog", 'String'>
    readonly orgId: FieldRef<"UpdateLog", 'String'>
    readonly type: FieldRef<"UpdateLog", 'LogType'>
    readonly date: FieldRef<"UpdateLog", 'DateTime'>
    readonly createdAt: FieldRef<"UpdateLog", 'DateTime'>
    readonly updatedAt: FieldRef<"UpdateLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UpdateLog findUnique
   */
  export type UpdateLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpdateLog
     */
    select?: UpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpdateLog
     */
    omit?: UpdateLogOmit<ExtArgs> | null
    /**
     * Filter, which UpdateLog to fetch.
     */
    where: UpdateLogWhereUniqueInput
  }

  /**
   * UpdateLog findUniqueOrThrow
   */
  export type UpdateLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpdateLog
     */
    select?: UpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpdateLog
     */
    omit?: UpdateLogOmit<ExtArgs> | null
    /**
     * Filter, which UpdateLog to fetch.
     */
    where: UpdateLogWhereUniqueInput
  }

  /**
   * UpdateLog findFirst
   */
  export type UpdateLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpdateLog
     */
    select?: UpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpdateLog
     */
    omit?: UpdateLogOmit<ExtArgs> | null
    /**
     * Filter, which UpdateLog to fetch.
     */
    where?: UpdateLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UpdateLogs to fetch.
     */
    orderBy?: UpdateLogOrderByWithRelationInput | UpdateLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UpdateLogs.
     */
    cursor?: UpdateLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UpdateLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UpdateLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UpdateLogs.
     */
    distinct?: UpdateLogScalarFieldEnum | UpdateLogScalarFieldEnum[]
  }

  /**
   * UpdateLog findFirstOrThrow
   */
  export type UpdateLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpdateLog
     */
    select?: UpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpdateLog
     */
    omit?: UpdateLogOmit<ExtArgs> | null
    /**
     * Filter, which UpdateLog to fetch.
     */
    where?: UpdateLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UpdateLogs to fetch.
     */
    orderBy?: UpdateLogOrderByWithRelationInput | UpdateLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UpdateLogs.
     */
    cursor?: UpdateLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UpdateLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UpdateLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UpdateLogs.
     */
    distinct?: UpdateLogScalarFieldEnum | UpdateLogScalarFieldEnum[]
  }

  /**
   * UpdateLog findMany
   */
  export type UpdateLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpdateLog
     */
    select?: UpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpdateLog
     */
    omit?: UpdateLogOmit<ExtArgs> | null
    /**
     * Filter, which UpdateLogs to fetch.
     */
    where?: UpdateLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UpdateLogs to fetch.
     */
    orderBy?: UpdateLogOrderByWithRelationInput | UpdateLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UpdateLogs.
     */
    cursor?: UpdateLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UpdateLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UpdateLogs.
     */
    skip?: number
    distinct?: UpdateLogScalarFieldEnum | UpdateLogScalarFieldEnum[]
  }

  /**
   * UpdateLog create
   */
  export type UpdateLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpdateLog
     */
    select?: UpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpdateLog
     */
    omit?: UpdateLogOmit<ExtArgs> | null
    /**
     * The data needed to create a UpdateLog.
     */
    data: XOR<UpdateLogCreateInput, UpdateLogUncheckedCreateInput>
  }

  /**
   * UpdateLog createMany
   */
  export type UpdateLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UpdateLogs.
     */
    data: UpdateLogCreateManyInput | UpdateLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UpdateLog createManyAndReturn
   */
  export type UpdateLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpdateLog
     */
    select?: UpdateLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UpdateLog
     */
    omit?: UpdateLogOmit<ExtArgs> | null
    /**
     * The data used to create many UpdateLogs.
     */
    data: UpdateLogCreateManyInput | UpdateLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UpdateLog update
   */
  export type UpdateLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpdateLog
     */
    select?: UpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpdateLog
     */
    omit?: UpdateLogOmit<ExtArgs> | null
    /**
     * The data needed to update a UpdateLog.
     */
    data: XOR<UpdateLogUpdateInput, UpdateLogUncheckedUpdateInput>
    /**
     * Choose, which UpdateLog to update.
     */
    where: UpdateLogWhereUniqueInput
  }

  /**
   * UpdateLog updateMany
   */
  export type UpdateLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UpdateLogs.
     */
    data: XOR<UpdateLogUpdateManyMutationInput, UpdateLogUncheckedUpdateManyInput>
    /**
     * Filter which UpdateLogs to update
     */
    where?: UpdateLogWhereInput
    /**
     * Limit how many UpdateLogs to update.
     */
    limit?: number
  }

  /**
   * UpdateLog updateManyAndReturn
   */
  export type UpdateLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpdateLog
     */
    select?: UpdateLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UpdateLog
     */
    omit?: UpdateLogOmit<ExtArgs> | null
    /**
     * The data used to update UpdateLogs.
     */
    data: XOR<UpdateLogUpdateManyMutationInput, UpdateLogUncheckedUpdateManyInput>
    /**
     * Filter which UpdateLogs to update
     */
    where?: UpdateLogWhereInput
    /**
     * Limit how many UpdateLogs to update.
     */
    limit?: number
  }

  /**
   * UpdateLog upsert
   */
  export type UpdateLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpdateLog
     */
    select?: UpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpdateLog
     */
    omit?: UpdateLogOmit<ExtArgs> | null
    /**
     * The filter to search for the UpdateLog to update in case it exists.
     */
    where: UpdateLogWhereUniqueInput
    /**
     * In case the UpdateLog found by the `where` argument doesn't exist, create a new UpdateLog with this data.
     */
    create: XOR<UpdateLogCreateInput, UpdateLogUncheckedCreateInput>
    /**
     * In case the UpdateLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UpdateLogUpdateInput, UpdateLogUncheckedUpdateInput>
  }

  /**
   * UpdateLog delete
   */
  export type UpdateLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpdateLog
     */
    select?: UpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpdateLog
     */
    omit?: UpdateLogOmit<ExtArgs> | null
    /**
     * Filter which UpdateLog to delete.
     */
    where: UpdateLogWhereUniqueInput
  }

  /**
   * UpdateLog deleteMany
   */
  export type UpdateLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UpdateLogs to delete
     */
    where?: UpdateLogWhereInput
    /**
     * Limit how many UpdateLogs to delete.
     */
    limit?: number
  }

  /**
   * UpdateLog without action
   */
  export type UpdateLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UpdateLog
     */
    select?: UpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UpdateLog
     */
    omit?: UpdateLogOmit<ExtArgs> | null
  }


  /**
   * Model TelegramSetting
   */

  export type AggregateTelegramSetting = {
    _count: TelegramSettingCountAggregateOutputType | null
    _min: TelegramSettingMinAggregateOutputType | null
    _max: TelegramSettingMaxAggregateOutputType | null
  }

  export type TelegramSettingMinAggregateOutputType = {
    id: string | null
    botToken: string | null
    chatId: string | null
    scope: $Enums.Scope | null
    userId: string | null
    orgId: string | null
    role: $Enums.UserRole | null
    isEnabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TelegramSettingMaxAggregateOutputType = {
    id: string | null
    botToken: string | null
    chatId: string | null
    scope: $Enums.Scope | null
    userId: string | null
    orgId: string | null
    role: $Enums.UserRole | null
    isEnabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TelegramSettingCountAggregateOutputType = {
    id: number
    botToken: number
    chatId: number
    scope: number
    userId: number
    orgId: number
    role: number
    isEnabled: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TelegramSettingMinAggregateInputType = {
    id?: true
    botToken?: true
    chatId?: true
    scope?: true
    userId?: true
    orgId?: true
    role?: true
    isEnabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TelegramSettingMaxAggregateInputType = {
    id?: true
    botToken?: true
    chatId?: true
    scope?: true
    userId?: true
    orgId?: true
    role?: true
    isEnabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TelegramSettingCountAggregateInputType = {
    id?: true
    botToken?: true
    chatId?: true
    scope?: true
    userId?: true
    orgId?: true
    role?: true
    isEnabled?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TelegramSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TelegramSetting to aggregate.
     */
    where?: TelegramSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TelegramSettings to fetch.
     */
    orderBy?: TelegramSettingOrderByWithRelationInput | TelegramSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TelegramSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TelegramSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TelegramSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TelegramSettings
    **/
    _count?: true | TelegramSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TelegramSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TelegramSettingMaxAggregateInputType
  }

  export type GetTelegramSettingAggregateType<T extends TelegramSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateTelegramSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTelegramSetting[P]>
      : GetScalarType<T[P], AggregateTelegramSetting[P]>
  }




  export type TelegramSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TelegramSettingWhereInput
    orderBy?: TelegramSettingOrderByWithAggregationInput | TelegramSettingOrderByWithAggregationInput[]
    by: TelegramSettingScalarFieldEnum[] | TelegramSettingScalarFieldEnum
    having?: TelegramSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TelegramSettingCountAggregateInputType | true
    _min?: TelegramSettingMinAggregateInputType
    _max?: TelegramSettingMaxAggregateInputType
  }

  export type TelegramSettingGroupByOutputType = {
    id: string
    botToken: string
    chatId: string
    scope: $Enums.Scope
    userId: string | null
    orgId: string | null
    role: $Enums.UserRole
    isEnabled: boolean
    createdAt: Date
    updatedAt: Date
    _count: TelegramSettingCountAggregateOutputType | null
    _min: TelegramSettingMinAggregateOutputType | null
    _max: TelegramSettingMaxAggregateOutputType | null
  }

  type GetTelegramSettingGroupByPayload<T extends TelegramSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TelegramSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TelegramSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TelegramSettingGroupByOutputType[P]>
            : GetScalarType<T[P], TelegramSettingGroupByOutputType[P]>
        }
      >
    >


  export type TelegramSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    botToken?: boolean
    chatId?: boolean
    scope?: boolean
    userId?: boolean
    orgId?: boolean
    role?: boolean
    isEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | TelegramSetting$userArgs<ExtArgs>
    org?: boolean | TelegramSetting$orgArgs<ExtArgs>
  }, ExtArgs["result"]["telegramSetting"]>

  export type TelegramSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    botToken?: boolean
    chatId?: boolean
    scope?: boolean
    userId?: boolean
    orgId?: boolean
    role?: boolean
    isEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | TelegramSetting$userArgs<ExtArgs>
    org?: boolean | TelegramSetting$orgArgs<ExtArgs>
  }, ExtArgs["result"]["telegramSetting"]>

  export type TelegramSettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    botToken?: boolean
    chatId?: boolean
    scope?: boolean
    userId?: boolean
    orgId?: boolean
    role?: boolean
    isEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | TelegramSetting$userArgs<ExtArgs>
    org?: boolean | TelegramSetting$orgArgs<ExtArgs>
  }, ExtArgs["result"]["telegramSetting"]>

  export type TelegramSettingSelectScalar = {
    id?: boolean
    botToken?: boolean
    chatId?: boolean
    scope?: boolean
    userId?: boolean
    orgId?: boolean
    role?: boolean
    isEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TelegramSettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "botToken" | "chatId" | "scope" | "userId" | "orgId" | "role" | "isEnabled" | "createdAt" | "updatedAt", ExtArgs["result"]["telegramSetting"]>
  export type TelegramSettingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | TelegramSetting$userArgs<ExtArgs>
    org?: boolean | TelegramSetting$orgArgs<ExtArgs>
  }
  export type TelegramSettingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | TelegramSetting$userArgs<ExtArgs>
    org?: boolean | TelegramSetting$orgArgs<ExtArgs>
  }
  export type TelegramSettingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | TelegramSetting$userArgs<ExtArgs>
    org?: boolean | TelegramSetting$orgArgs<ExtArgs>
  }

  export type $TelegramSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TelegramSetting"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      org: Prisma.$OrganizationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      botToken: string
      chatId: string
      scope: $Enums.Scope
      userId: string | null
      orgId: string | null
      role: $Enums.UserRole
      isEnabled: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["telegramSetting"]>
    composites: {}
  }

  type TelegramSettingGetPayload<S extends boolean | null | undefined | TelegramSettingDefaultArgs> = $Result.GetResult<Prisma.$TelegramSettingPayload, S>

  type TelegramSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TelegramSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TelegramSettingCountAggregateInputType | true
    }

  export interface TelegramSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TelegramSetting'], meta: { name: 'TelegramSetting' } }
    /**
     * Find zero or one TelegramSetting that matches the filter.
     * @param {TelegramSettingFindUniqueArgs} args - Arguments to find a TelegramSetting
     * @example
     * // Get one TelegramSetting
     * const telegramSetting = await prisma.telegramSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TelegramSettingFindUniqueArgs>(args: SelectSubset<T, TelegramSettingFindUniqueArgs<ExtArgs>>): Prisma__TelegramSettingClient<$Result.GetResult<Prisma.$TelegramSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TelegramSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TelegramSettingFindUniqueOrThrowArgs} args - Arguments to find a TelegramSetting
     * @example
     * // Get one TelegramSetting
     * const telegramSetting = await prisma.telegramSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TelegramSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, TelegramSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TelegramSettingClient<$Result.GetResult<Prisma.$TelegramSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TelegramSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelegramSettingFindFirstArgs} args - Arguments to find a TelegramSetting
     * @example
     * // Get one TelegramSetting
     * const telegramSetting = await prisma.telegramSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TelegramSettingFindFirstArgs>(args?: SelectSubset<T, TelegramSettingFindFirstArgs<ExtArgs>>): Prisma__TelegramSettingClient<$Result.GetResult<Prisma.$TelegramSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TelegramSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelegramSettingFindFirstOrThrowArgs} args - Arguments to find a TelegramSetting
     * @example
     * // Get one TelegramSetting
     * const telegramSetting = await prisma.telegramSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TelegramSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, TelegramSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__TelegramSettingClient<$Result.GetResult<Prisma.$TelegramSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TelegramSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelegramSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TelegramSettings
     * const telegramSettings = await prisma.telegramSetting.findMany()
     * 
     * // Get first 10 TelegramSettings
     * const telegramSettings = await prisma.telegramSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const telegramSettingWithIdOnly = await prisma.telegramSetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TelegramSettingFindManyArgs>(args?: SelectSubset<T, TelegramSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TelegramSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TelegramSetting.
     * @param {TelegramSettingCreateArgs} args - Arguments to create a TelegramSetting.
     * @example
     * // Create one TelegramSetting
     * const TelegramSetting = await prisma.telegramSetting.create({
     *   data: {
     *     // ... data to create a TelegramSetting
     *   }
     * })
     * 
     */
    create<T extends TelegramSettingCreateArgs>(args: SelectSubset<T, TelegramSettingCreateArgs<ExtArgs>>): Prisma__TelegramSettingClient<$Result.GetResult<Prisma.$TelegramSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TelegramSettings.
     * @param {TelegramSettingCreateManyArgs} args - Arguments to create many TelegramSettings.
     * @example
     * // Create many TelegramSettings
     * const telegramSetting = await prisma.telegramSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TelegramSettingCreateManyArgs>(args?: SelectSubset<T, TelegramSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TelegramSettings and returns the data saved in the database.
     * @param {TelegramSettingCreateManyAndReturnArgs} args - Arguments to create many TelegramSettings.
     * @example
     * // Create many TelegramSettings
     * const telegramSetting = await prisma.telegramSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TelegramSettings and only return the `id`
     * const telegramSettingWithIdOnly = await prisma.telegramSetting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TelegramSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, TelegramSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TelegramSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TelegramSetting.
     * @param {TelegramSettingDeleteArgs} args - Arguments to delete one TelegramSetting.
     * @example
     * // Delete one TelegramSetting
     * const TelegramSetting = await prisma.telegramSetting.delete({
     *   where: {
     *     // ... filter to delete one TelegramSetting
     *   }
     * })
     * 
     */
    delete<T extends TelegramSettingDeleteArgs>(args: SelectSubset<T, TelegramSettingDeleteArgs<ExtArgs>>): Prisma__TelegramSettingClient<$Result.GetResult<Prisma.$TelegramSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TelegramSetting.
     * @param {TelegramSettingUpdateArgs} args - Arguments to update one TelegramSetting.
     * @example
     * // Update one TelegramSetting
     * const telegramSetting = await prisma.telegramSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TelegramSettingUpdateArgs>(args: SelectSubset<T, TelegramSettingUpdateArgs<ExtArgs>>): Prisma__TelegramSettingClient<$Result.GetResult<Prisma.$TelegramSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TelegramSettings.
     * @param {TelegramSettingDeleteManyArgs} args - Arguments to filter TelegramSettings to delete.
     * @example
     * // Delete a few TelegramSettings
     * const { count } = await prisma.telegramSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TelegramSettingDeleteManyArgs>(args?: SelectSubset<T, TelegramSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TelegramSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelegramSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TelegramSettings
     * const telegramSetting = await prisma.telegramSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TelegramSettingUpdateManyArgs>(args: SelectSubset<T, TelegramSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TelegramSettings and returns the data updated in the database.
     * @param {TelegramSettingUpdateManyAndReturnArgs} args - Arguments to update many TelegramSettings.
     * @example
     * // Update many TelegramSettings
     * const telegramSetting = await prisma.telegramSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TelegramSettings and only return the `id`
     * const telegramSettingWithIdOnly = await prisma.telegramSetting.updateManyAndReturn({
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
    updateManyAndReturn<T extends TelegramSettingUpdateManyAndReturnArgs>(args: SelectSubset<T, TelegramSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TelegramSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TelegramSetting.
     * @param {TelegramSettingUpsertArgs} args - Arguments to update or create a TelegramSetting.
     * @example
     * // Update or create a TelegramSetting
     * const telegramSetting = await prisma.telegramSetting.upsert({
     *   create: {
     *     // ... data to create a TelegramSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TelegramSetting we want to update
     *   }
     * })
     */
    upsert<T extends TelegramSettingUpsertArgs>(args: SelectSubset<T, TelegramSettingUpsertArgs<ExtArgs>>): Prisma__TelegramSettingClient<$Result.GetResult<Prisma.$TelegramSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TelegramSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelegramSettingCountArgs} args - Arguments to filter TelegramSettings to count.
     * @example
     * // Count the number of TelegramSettings
     * const count = await prisma.telegramSetting.count({
     *   where: {
     *     // ... the filter for the TelegramSettings we want to count
     *   }
     * })
    **/
    count<T extends TelegramSettingCountArgs>(
      args?: Subset<T, TelegramSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TelegramSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TelegramSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelegramSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TelegramSettingAggregateArgs>(args: Subset<T, TelegramSettingAggregateArgs>): Prisma.PrismaPromise<GetTelegramSettingAggregateType<T>>

    /**
     * Group by TelegramSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TelegramSettingGroupByArgs} args - Group by arguments.
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
      T extends TelegramSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TelegramSettingGroupByArgs['orderBy'] }
        : { orderBy?: TelegramSettingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TelegramSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTelegramSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TelegramSetting model
   */
  readonly fields: TelegramSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TelegramSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TelegramSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends TelegramSetting$userArgs<ExtArgs> = {}>(args?: Subset<T, TelegramSetting$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    org<T extends TelegramSetting$orgArgs<ExtArgs> = {}>(args?: Subset<T, TelegramSetting$orgArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TelegramSetting model
   */
  interface TelegramSettingFieldRefs {
    readonly id: FieldRef<"TelegramSetting", 'String'>
    readonly botToken: FieldRef<"TelegramSetting", 'String'>
    readonly chatId: FieldRef<"TelegramSetting", 'String'>
    readonly scope: FieldRef<"TelegramSetting", 'Scope'>
    readonly userId: FieldRef<"TelegramSetting", 'String'>
    readonly orgId: FieldRef<"TelegramSetting", 'String'>
    readonly role: FieldRef<"TelegramSetting", 'UserRole'>
    readonly isEnabled: FieldRef<"TelegramSetting", 'Boolean'>
    readonly createdAt: FieldRef<"TelegramSetting", 'DateTime'>
    readonly updatedAt: FieldRef<"TelegramSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TelegramSetting findUnique
   */
  export type TelegramSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSetting
     */
    select?: TelegramSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSetting
     */
    omit?: TelegramSettingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelegramSettingInclude<ExtArgs> | null
    /**
     * Filter, which TelegramSetting to fetch.
     */
    where: TelegramSettingWhereUniqueInput
  }

  /**
   * TelegramSetting findUniqueOrThrow
   */
  export type TelegramSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSetting
     */
    select?: TelegramSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSetting
     */
    omit?: TelegramSettingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelegramSettingInclude<ExtArgs> | null
    /**
     * Filter, which TelegramSetting to fetch.
     */
    where: TelegramSettingWhereUniqueInput
  }

  /**
   * TelegramSetting findFirst
   */
  export type TelegramSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSetting
     */
    select?: TelegramSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSetting
     */
    omit?: TelegramSettingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelegramSettingInclude<ExtArgs> | null
    /**
     * Filter, which TelegramSetting to fetch.
     */
    where?: TelegramSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TelegramSettings to fetch.
     */
    orderBy?: TelegramSettingOrderByWithRelationInput | TelegramSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TelegramSettings.
     */
    cursor?: TelegramSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TelegramSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TelegramSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TelegramSettings.
     */
    distinct?: TelegramSettingScalarFieldEnum | TelegramSettingScalarFieldEnum[]
  }

  /**
   * TelegramSetting findFirstOrThrow
   */
  export type TelegramSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSetting
     */
    select?: TelegramSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSetting
     */
    omit?: TelegramSettingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelegramSettingInclude<ExtArgs> | null
    /**
     * Filter, which TelegramSetting to fetch.
     */
    where?: TelegramSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TelegramSettings to fetch.
     */
    orderBy?: TelegramSettingOrderByWithRelationInput | TelegramSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TelegramSettings.
     */
    cursor?: TelegramSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TelegramSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TelegramSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TelegramSettings.
     */
    distinct?: TelegramSettingScalarFieldEnum | TelegramSettingScalarFieldEnum[]
  }

  /**
   * TelegramSetting findMany
   */
  export type TelegramSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSetting
     */
    select?: TelegramSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSetting
     */
    omit?: TelegramSettingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelegramSettingInclude<ExtArgs> | null
    /**
     * Filter, which TelegramSettings to fetch.
     */
    where?: TelegramSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TelegramSettings to fetch.
     */
    orderBy?: TelegramSettingOrderByWithRelationInput | TelegramSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TelegramSettings.
     */
    cursor?: TelegramSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TelegramSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TelegramSettings.
     */
    skip?: number
    distinct?: TelegramSettingScalarFieldEnum | TelegramSettingScalarFieldEnum[]
  }

  /**
   * TelegramSetting create
   */
  export type TelegramSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSetting
     */
    select?: TelegramSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSetting
     */
    omit?: TelegramSettingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelegramSettingInclude<ExtArgs> | null
    /**
     * The data needed to create a TelegramSetting.
     */
    data: XOR<TelegramSettingCreateInput, TelegramSettingUncheckedCreateInput>
  }

  /**
   * TelegramSetting createMany
   */
  export type TelegramSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TelegramSettings.
     */
    data: TelegramSettingCreateManyInput | TelegramSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TelegramSetting createManyAndReturn
   */
  export type TelegramSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSetting
     */
    select?: TelegramSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSetting
     */
    omit?: TelegramSettingOmit<ExtArgs> | null
    /**
     * The data used to create many TelegramSettings.
     */
    data: TelegramSettingCreateManyInput | TelegramSettingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelegramSettingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TelegramSetting update
   */
  export type TelegramSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSetting
     */
    select?: TelegramSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSetting
     */
    omit?: TelegramSettingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelegramSettingInclude<ExtArgs> | null
    /**
     * The data needed to update a TelegramSetting.
     */
    data: XOR<TelegramSettingUpdateInput, TelegramSettingUncheckedUpdateInput>
    /**
     * Choose, which TelegramSetting to update.
     */
    where: TelegramSettingWhereUniqueInput
  }

  /**
   * TelegramSetting updateMany
   */
  export type TelegramSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TelegramSettings.
     */
    data: XOR<TelegramSettingUpdateManyMutationInput, TelegramSettingUncheckedUpdateManyInput>
    /**
     * Filter which TelegramSettings to update
     */
    where?: TelegramSettingWhereInput
    /**
     * Limit how many TelegramSettings to update.
     */
    limit?: number
  }

  /**
   * TelegramSetting updateManyAndReturn
   */
  export type TelegramSettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSetting
     */
    select?: TelegramSettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSetting
     */
    omit?: TelegramSettingOmit<ExtArgs> | null
    /**
     * The data used to update TelegramSettings.
     */
    data: XOR<TelegramSettingUpdateManyMutationInput, TelegramSettingUncheckedUpdateManyInput>
    /**
     * Filter which TelegramSettings to update
     */
    where?: TelegramSettingWhereInput
    /**
     * Limit how many TelegramSettings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelegramSettingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TelegramSetting upsert
   */
  export type TelegramSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSetting
     */
    select?: TelegramSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSetting
     */
    omit?: TelegramSettingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelegramSettingInclude<ExtArgs> | null
    /**
     * The filter to search for the TelegramSetting to update in case it exists.
     */
    where: TelegramSettingWhereUniqueInput
    /**
     * In case the TelegramSetting found by the `where` argument doesn't exist, create a new TelegramSetting with this data.
     */
    create: XOR<TelegramSettingCreateInput, TelegramSettingUncheckedCreateInput>
    /**
     * In case the TelegramSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TelegramSettingUpdateInput, TelegramSettingUncheckedUpdateInput>
  }

  /**
   * TelegramSetting delete
   */
  export type TelegramSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSetting
     */
    select?: TelegramSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSetting
     */
    omit?: TelegramSettingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelegramSettingInclude<ExtArgs> | null
    /**
     * Filter which TelegramSetting to delete.
     */
    where: TelegramSettingWhereUniqueInput
  }

  /**
   * TelegramSetting deleteMany
   */
  export type TelegramSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TelegramSettings to delete
     */
    where?: TelegramSettingWhereInput
    /**
     * Limit how many TelegramSettings to delete.
     */
    limit?: number
  }

  /**
   * TelegramSetting.user
   */
  export type TelegramSetting$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TelegramSetting.org
   */
  export type TelegramSetting$orgArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * TelegramSetting without action
   */
  export type TelegramSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSetting
     */
    select?: TelegramSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSetting
     */
    omit?: TelegramSettingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelegramSettingInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    role: $Enums.UserRole | null
    isTwoFactorEnabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    defaultOrgId: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    role: $Enums.UserRole | null
    isTwoFactorEnabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    defaultOrgId: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    password: number
    role: number
    isTwoFactorEnabled: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    defaultOrgId: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    role?: true
    isTwoFactorEnabled?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    defaultOrgId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    role?: true
    isTwoFactorEnabled?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    defaultOrgId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    role?: true
    isTwoFactorEnabled?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    defaultOrgId?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string
    emailVerified: Date | null
    image: string | null
    password: string | null
    role: $Enums.UserRole
    isTwoFactorEnabled: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    defaultOrgId: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    role?: boolean
    isTwoFactorEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    defaultOrgId?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    twoFactorConfirmation?: boolean | User$twoFactorConfirmationArgs<ExtArgs>
    UserOrganization?: boolean | User$UserOrganizationArgs<ExtArgs>
    organizationCreated?: boolean | User$organizationCreatedArgs<ExtArgs>
    telegramBot?: boolean | User$telegramBotArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    role?: boolean
    isTwoFactorEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    defaultOrgId?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    role?: boolean
    isTwoFactorEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    defaultOrgId?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    role?: boolean
    isTwoFactorEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    defaultOrgId?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "password" | "role" | "isTwoFactorEnabled" | "createdAt" | "updatedAt" | "deletedAt" | "defaultOrgId", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    twoFactorConfirmation?: boolean | User$twoFactorConfirmationArgs<ExtArgs>
    UserOrganization?: boolean | User$UserOrganizationArgs<ExtArgs>
    organizationCreated?: boolean | User$organizationCreatedArgs<ExtArgs>
    telegramBot?: boolean | User$telegramBotArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      twoFactorConfirmation: Prisma.$TwoFactorConfirmationPayload<ExtArgs> | null
      UserOrganization: Prisma.$UserOrganizationPayload<ExtArgs>[]
      organizationCreated: Prisma.$OrganizationPayload<ExtArgs>[]
      telegramBot: Prisma.$TelegramSettingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string
      emailVerified: Date | null
      image: string | null
      password: string | null
      role: $Enums.UserRole
      isTwoFactorEnabled: boolean
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
      defaultOrgId: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    twoFactorConfirmation<T extends User$twoFactorConfirmationArgs<ExtArgs> = {}>(args?: Subset<T, User$twoFactorConfirmationArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    UserOrganization<T extends User$UserOrganizationArgs<ExtArgs> = {}>(args?: Subset<T, User$UserOrganizationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    organizationCreated<T extends User$organizationCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$organizationCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    telegramBot<T extends User$telegramBotArgs<ExtArgs> = {}>(args?: Subset<T, User$telegramBotArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TelegramSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly isTwoFactorEnabled: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
    readonly defaultOrgId: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.twoFactorConfirmation
   */
  export type User$twoFactorConfirmationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    where?: TwoFactorConfirmationWhereInput
  }

  /**
   * User.UserOrganization
   */
  export type User$UserOrganizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganization
     */
    select?: UserOrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrganization
     */
    omit?: UserOrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationInclude<ExtArgs> | null
    where?: UserOrganizationWhereInput
    orderBy?: UserOrganizationOrderByWithRelationInput | UserOrganizationOrderByWithRelationInput[]
    cursor?: UserOrganizationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserOrganizationScalarFieldEnum | UserOrganizationScalarFieldEnum[]
  }

  /**
   * User.organizationCreated
   */
  export type User$organizationCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    cursor?: OrganizationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * User.telegramBot
   */
  export type User$telegramBotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSetting
     */
    select?: TelegramSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSetting
     */
    omit?: TelegramSettingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelegramSettingInclude<ExtArgs> | null
    where?: TelegramSettingWhereInput
    orderBy?: TelegramSettingOrderByWithRelationInput | TelegramSettingOrderByWithRelationInput[]
    cursor?: TelegramSettingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TelegramSettingScalarFieldEnum | TelegramSettingScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _avg: OrganizationAvgAggregateOutputType | null
    _sum: OrganizationSumAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationAvgAggregateOutputType = {
    number: number | null
  }

  export type OrganizationSumAggregateOutputType = {
    number: number | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    number: number | null
    name: string | null
    description: string | null
    startedAt: Date | null
    logoImage: string | null
    Address: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    number: number | null
    name: string | null
    description: string | null
    startedAt: Date | null
    logoImage: string | null
    Address: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    number: number
    name: number
    description: number
    startedAt: number
    logoImage: number
    Address: number
    createdAt: number
    updatedAt: number
    createdById: number
    _all: number
  }


  export type OrganizationAvgAggregateInputType = {
    number?: true
  }

  export type OrganizationSumAggregateInputType = {
    number?: true
  }

  export type OrganizationMinAggregateInputType = {
    id?: true
    number?: true
    name?: true
    description?: true
    startedAt?: true
    logoImage?: true
    Address?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    number?: true
    name?: true
    description?: true
    startedAt?: true
    logoImage?: true
    Address?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    number?: true
    name?: true
    description?: true
    startedAt?: true
    logoImage?: true
    Address?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrganizationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrganizationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _avg?: OrganizationAvgAggregateInputType
    _sum?: OrganizationSumAggregateInputType
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    number: number | null
    name: string
    description: string | null
    startedAt: Date | null
    logoImage: string | null
    Address: string | null
    createdAt: Date
    updatedAt: Date
    createdById: string
    _count: OrganizationCountAggregateOutputType | null
    _avg: OrganizationAvgAggregateOutputType | null
    _sum: OrganizationSumAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    name?: boolean
    description?: boolean
    startedAt?: boolean
    logoImage?: boolean
    Address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    UserOrganization?: boolean | Organization$UserOrganizationArgs<ExtArgs>
    featureAccess?: boolean | Organization$featureAccessArgs<ExtArgs>
    telegramBot?: boolean | Organization$telegramBotArgs<ExtArgs>
    OrganizationInvite?: boolean | Organization$OrganizationInviteArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    name?: boolean
    description?: boolean
    startedAt?: boolean
    logoImage?: boolean
    Address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    name?: boolean
    description?: boolean
    startedAt?: boolean
    logoImage?: boolean
    Address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    number?: boolean
    name?: boolean
    description?: boolean
    startedAt?: boolean
    logoImage?: boolean
    Address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
  }

  export type OrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "number" | "name" | "description" | "startedAt" | "logoImage" | "Address" | "createdAt" | "updatedAt" | "createdById", ExtArgs["result"]["organization"]>
  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    UserOrganization?: boolean | Organization$UserOrganizationArgs<ExtArgs>
    featureAccess?: boolean | Organization$featureAccessArgs<ExtArgs>
    telegramBot?: boolean | Organization$telegramBotArgs<ExtArgs>
    OrganizationInvite?: boolean | Organization$OrganizationInviteArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      UserOrganization: Prisma.$UserOrganizationPayload<ExtArgs>[]
      featureAccess: Prisma.$OrganizationFeatureAccessPayload<ExtArgs>[]
      telegramBot: Prisma.$TelegramSettingPayload<ExtArgs>[]
      OrganizationInvite: Prisma.$OrganizationInvitePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      number: number | null
      name: string
      description: string | null
      startedAt: Date | null
      logoImage: string | null
      Address: string | null
      createdAt: Date
      updatedAt: Date
      createdById: string
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {OrganizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
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
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    UserOrganization<T extends Organization$UserOrganizationArgs<ExtArgs> = {}>(args?: Subset<T, Organization$UserOrganizationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    featureAccess<T extends Organization$featureAccessArgs<ExtArgs> = {}>(args?: Subset<T, Organization$featureAccessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationFeatureAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    telegramBot<T extends Organization$telegramBotArgs<ExtArgs> = {}>(args?: Subset<T, Organization$telegramBotArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TelegramSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    OrganizationInvite<T extends Organization$OrganizationInviteArgs<ExtArgs> = {}>(args?: Subset<T, Organization$OrganizationInviteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly number: FieldRef<"Organization", 'Int'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly description: FieldRef<"Organization", 'String'>
    readonly startedAt: FieldRef<"Organization", 'DateTime'>
    readonly logoImage: FieldRef<"Organization", 'String'>
    readonly Address: FieldRef<"Organization", 'String'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
    readonly createdById: FieldRef<"Organization", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization updateManyAndReturn
   */
  export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to delete.
     */
    limit?: number
  }

  /**
   * Organization.UserOrganization
   */
  export type Organization$UserOrganizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganization
     */
    select?: UserOrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrganization
     */
    omit?: UserOrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationInclude<ExtArgs> | null
    where?: UserOrganizationWhereInput
    orderBy?: UserOrganizationOrderByWithRelationInput | UserOrganizationOrderByWithRelationInput[]
    cursor?: UserOrganizationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserOrganizationScalarFieldEnum | UserOrganizationScalarFieldEnum[]
  }

  /**
   * Organization.featureAccess
   */
  export type Organization$featureAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFeatureAccess
     */
    select?: OrganizationFeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFeatureAccess
     */
    omit?: OrganizationFeatureAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFeatureAccessInclude<ExtArgs> | null
    where?: OrganizationFeatureAccessWhereInput
    orderBy?: OrganizationFeatureAccessOrderByWithRelationInput | OrganizationFeatureAccessOrderByWithRelationInput[]
    cursor?: OrganizationFeatureAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationFeatureAccessScalarFieldEnum | OrganizationFeatureAccessScalarFieldEnum[]
  }

  /**
   * Organization.telegramBot
   */
  export type Organization$telegramBotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TelegramSetting
     */
    select?: TelegramSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TelegramSetting
     */
    omit?: TelegramSettingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TelegramSettingInclude<ExtArgs> | null
    where?: TelegramSettingWhereInput
    orderBy?: TelegramSettingOrderByWithRelationInput | TelegramSettingOrderByWithRelationInput[]
    cursor?: TelegramSettingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TelegramSettingScalarFieldEnum | TelegramSettingScalarFieldEnum[]
  }

  /**
   * Organization.OrganizationInvite
   */
  export type Organization$OrganizationInviteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationInvite
     */
    select?: OrganizationInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationInvite
     */
    omit?: OrganizationInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInviteInclude<ExtArgs> | null
    where?: OrganizationInviteWhereInput
    orderBy?: OrganizationInviteOrderByWithRelationInput | OrganizationInviteOrderByWithRelationInput[]
    cursor?: OrganizationInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationInviteScalarFieldEnum | OrganizationInviteScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model UserOrganization
   */

  export type AggregateUserOrganization = {
    _count: UserOrganizationCountAggregateOutputType | null
    _min: UserOrganizationMinAggregateOutputType | null
    _max: UserOrganizationMaxAggregateOutputType | null
  }

  export type UserOrganizationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    role: $Enums.OrganizationUserRole | null
    organizationId: string | null
  }

  export type UserOrganizationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    role: $Enums.OrganizationUserRole | null
    organizationId: string | null
  }

  export type UserOrganizationCountAggregateOutputType = {
    id: number
    userId: number
    role: number
    organizationId: number
    _all: number
  }


  export type UserOrganizationMinAggregateInputType = {
    id?: true
    userId?: true
    role?: true
    organizationId?: true
  }

  export type UserOrganizationMaxAggregateInputType = {
    id?: true
    userId?: true
    role?: true
    organizationId?: true
  }

  export type UserOrganizationCountAggregateInputType = {
    id?: true
    userId?: true
    role?: true
    organizationId?: true
    _all?: true
  }

  export type UserOrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOrganization to aggregate.
     */
    where?: UserOrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOrganizations to fetch.
     */
    orderBy?: UserOrganizationOrderByWithRelationInput | UserOrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserOrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOrganizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOrganizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserOrganizations
    **/
    _count?: true | UserOrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserOrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserOrganizationMaxAggregateInputType
  }

  export type GetUserOrganizationAggregateType<T extends UserOrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateUserOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserOrganization[P]>
      : GetScalarType<T[P], AggregateUserOrganization[P]>
  }




  export type UserOrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserOrganizationWhereInput
    orderBy?: UserOrganizationOrderByWithAggregationInput | UserOrganizationOrderByWithAggregationInput[]
    by: UserOrganizationScalarFieldEnum[] | UserOrganizationScalarFieldEnum
    having?: UserOrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserOrganizationCountAggregateInputType | true
    _min?: UserOrganizationMinAggregateInputType
    _max?: UserOrganizationMaxAggregateInputType
  }

  export type UserOrganizationGroupByOutputType = {
    id: string
    userId: string
    role: $Enums.OrganizationUserRole | null
    organizationId: string
    _count: UserOrganizationCountAggregateOutputType | null
    _min: UserOrganizationMinAggregateOutputType | null
    _max: UserOrganizationMaxAggregateOutputType | null
  }

  type GetUserOrganizationGroupByPayload<T extends UserOrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserOrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserOrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserOrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], UserOrganizationGroupByOutputType[P]>
        }
      >
    >


  export type UserOrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    role?: boolean
    organizationId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userOrganization"]>

  export type UserOrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    role?: boolean
    organizationId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userOrganization"]>

  export type UserOrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    role?: boolean
    organizationId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userOrganization"]>

  export type UserOrganizationSelectScalar = {
    id?: boolean
    userId?: boolean
    role?: boolean
    organizationId?: boolean
  }

  export type UserOrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "role" | "organizationId", ExtArgs["result"]["userOrganization"]>
  export type UserOrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type UserOrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type UserOrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $UserOrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserOrganization"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      role: $Enums.OrganizationUserRole | null
      organizationId: string
    }, ExtArgs["result"]["userOrganization"]>
    composites: {}
  }

  type UserOrganizationGetPayload<S extends boolean | null | undefined | UserOrganizationDefaultArgs> = $Result.GetResult<Prisma.$UserOrganizationPayload, S>

  type UserOrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserOrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserOrganizationCountAggregateInputType | true
    }

  export interface UserOrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserOrganization'], meta: { name: 'UserOrganization' } }
    /**
     * Find zero or one UserOrganization that matches the filter.
     * @param {UserOrganizationFindUniqueArgs} args - Arguments to find a UserOrganization
     * @example
     * // Get one UserOrganization
     * const userOrganization = await prisma.userOrganization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserOrganizationFindUniqueArgs>(args: SelectSubset<T, UserOrganizationFindUniqueArgs<ExtArgs>>): Prisma__UserOrganizationClient<$Result.GetResult<Prisma.$UserOrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserOrganization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserOrganizationFindUniqueOrThrowArgs} args - Arguments to find a UserOrganization
     * @example
     * // Get one UserOrganization
     * const userOrganization = await prisma.userOrganization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserOrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, UserOrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserOrganizationClient<$Result.GetResult<Prisma.$UserOrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserOrganization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrganizationFindFirstArgs} args - Arguments to find a UserOrganization
     * @example
     * // Get one UserOrganization
     * const userOrganization = await prisma.userOrganization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserOrganizationFindFirstArgs>(args?: SelectSubset<T, UserOrganizationFindFirstArgs<ExtArgs>>): Prisma__UserOrganizationClient<$Result.GetResult<Prisma.$UserOrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserOrganization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrganizationFindFirstOrThrowArgs} args - Arguments to find a UserOrganization
     * @example
     * // Get one UserOrganization
     * const userOrganization = await prisma.userOrganization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserOrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, UserOrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserOrganizationClient<$Result.GetResult<Prisma.$UserOrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserOrganizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserOrganizations
     * const userOrganizations = await prisma.userOrganization.findMany()
     * 
     * // Get first 10 UserOrganizations
     * const userOrganizations = await prisma.userOrganization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userOrganizationWithIdOnly = await prisma.userOrganization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserOrganizationFindManyArgs>(args?: SelectSubset<T, UserOrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserOrganization.
     * @param {UserOrganizationCreateArgs} args - Arguments to create a UserOrganization.
     * @example
     * // Create one UserOrganization
     * const UserOrganization = await prisma.userOrganization.create({
     *   data: {
     *     // ... data to create a UserOrganization
     *   }
     * })
     * 
     */
    create<T extends UserOrganizationCreateArgs>(args: SelectSubset<T, UserOrganizationCreateArgs<ExtArgs>>): Prisma__UserOrganizationClient<$Result.GetResult<Prisma.$UserOrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserOrganizations.
     * @param {UserOrganizationCreateManyArgs} args - Arguments to create many UserOrganizations.
     * @example
     * // Create many UserOrganizations
     * const userOrganization = await prisma.userOrganization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserOrganizationCreateManyArgs>(args?: SelectSubset<T, UserOrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserOrganizations and returns the data saved in the database.
     * @param {UserOrganizationCreateManyAndReturnArgs} args - Arguments to create many UserOrganizations.
     * @example
     * // Create many UserOrganizations
     * const userOrganization = await prisma.userOrganization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserOrganizations and only return the `id`
     * const userOrganizationWithIdOnly = await prisma.userOrganization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserOrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, UserOrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserOrganization.
     * @param {UserOrganizationDeleteArgs} args - Arguments to delete one UserOrganization.
     * @example
     * // Delete one UserOrganization
     * const UserOrganization = await prisma.userOrganization.delete({
     *   where: {
     *     // ... filter to delete one UserOrganization
     *   }
     * })
     * 
     */
    delete<T extends UserOrganizationDeleteArgs>(args: SelectSubset<T, UserOrganizationDeleteArgs<ExtArgs>>): Prisma__UserOrganizationClient<$Result.GetResult<Prisma.$UserOrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserOrganization.
     * @param {UserOrganizationUpdateArgs} args - Arguments to update one UserOrganization.
     * @example
     * // Update one UserOrganization
     * const userOrganization = await prisma.userOrganization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserOrganizationUpdateArgs>(args: SelectSubset<T, UserOrganizationUpdateArgs<ExtArgs>>): Prisma__UserOrganizationClient<$Result.GetResult<Prisma.$UserOrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserOrganizations.
     * @param {UserOrganizationDeleteManyArgs} args - Arguments to filter UserOrganizations to delete.
     * @example
     * // Delete a few UserOrganizations
     * const { count } = await prisma.userOrganization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserOrganizationDeleteManyArgs>(args?: SelectSubset<T, UserOrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserOrganizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserOrganizations
     * const userOrganization = await prisma.userOrganization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserOrganizationUpdateManyArgs>(args: SelectSubset<T, UserOrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserOrganizations and returns the data updated in the database.
     * @param {UserOrganizationUpdateManyAndReturnArgs} args - Arguments to update many UserOrganizations.
     * @example
     * // Update many UserOrganizations
     * const userOrganization = await prisma.userOrganization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserOrganizations and only return the `id`
     * const userOrganizationWithIdOnly = await prisma.userOrganization.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserOrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, UserOrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserOrganization.
     * @param {UserOrganizationUpsertArgs} args - Arguments to update or create a UserOrganization.
     * @example
     * // Update or create a UserOrganization
     * const userOrganization = await prisma.userOrganization.upsert({
     *   create: {
     *     // ... data to create a UserOrganization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserOrganization we want to update
     *   }
     * })
     */
    upsert<T extends UserOrganizationUpsertArgs>(args: SelectSubset<T, UserOrganizationUpsertArgs<ExtArgs>>): Prisma__UserOrganizationClient<$Result.GetResult<Prisma.$UserOrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserOrganizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrganizationCountArgs} args - Arguments to filter UserOrganizations to count.
     * @example
     * // Count the number of UserOrganizations
     * const count = await prisma.userOrganization.count({
     *   where: {
     *     // ... the filter for the UserOrganizations we want to count
     *   }
     * })
    **/
    count<T extends UserOrganizationCountArgs>(
      args?: Subset<T, UserOrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserOrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserOrganization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserOrganizationAggregateArgs>(args: Subset<T, UserOrganizationAggregateArgs>): Prisma.PrismaPromise<GetUserOrganizationAggregateType<T>>

    /**
     * Group by UserOrganization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrganizationGroupByArgs} args - Group by arguments.
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
      T extends UserOrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserOrganizationGroupByArgs['orderBy'] }
        : { orderBy?: UserOrganizationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserOrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserOrganization model
   */
  readonly fields: UserOrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserOrganization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserOrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserOrganization model
   */
  interface UserOrganizationFieldRefs {
    readonly id: FieldRef<"UserOrganization", 'String'>
    readonly userId: FieldRef<"UserOrganization", 'String'>
    readonly role: FieldRef<"UserOrganization", 'OrganizationUserRole'>
    readonly organizationId: FieldRef<"UserOrganization", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserOrganization findUnique
   */
  export type UserOrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganization
     */
    select?: UserOrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrganization
     */
    omit?: UserOrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationInclude<ExtArgs> | null
    /**
     * Filter, which UserOrganization to fetch.
     */
    where: UserOrganizationWhereUniqueInput
  }

  /**
   * UserOrganization findUniqueOrThrow
   */
  export type UserOrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganization
     */
    select?: UserOrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrganization
     */
    omit?: UserOrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationInclude<ExtArgs> | null
    /**
     * Filter, which UserOrganization to fetch.
     */
    where: UserOrganizationWhereUniqueInput
  }

  /**
   * UserOrganization findFirst
   */
  export type UserOrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganization
     */
    select?: UserOrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrganization
     */
    omit?: UserOrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationInclude<ExtArgs> | null
    /**
     * Filter, which UserOrganization to fetch.
     */
    where?: UserOrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOrganizations to fetch.
     */
    orderBy?: UserOrganizationOrderByWithRelationInput | UserOrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOrganizations.
     */
    cursor?: UserOrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOrganizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOrganizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOrganizations.
     */
    distinct?: UserOrganizationScalarFieldEnum | UserOrganizationScalarFieldEnum[]
  }

  /**
   * UserOrganization findFirstOrThrow
   */
  export type UserOrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganization
     */
    select?: UserOrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrganization
     */
    omit?: UserOrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationInclude<ExtArgs> | null
    /**
     * Filter, which UserOrganization to fetch.
     */
    where?: UserOrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOrganizations to fetch.
     */
    orderBy?: UserOrganizationOrderByWithRelationInput | UserOrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOrganizations.
     */
    cursor?: UserOrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOrganizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOrganizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOrganizations.
     */
    distinct?: UserOrganizationScalarFieldEnum | UserOrganizationScalarFieldEnum[]
  }

  /**
   * UserOrganization findMany
   */
  export type UserOrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganization
     */
    select?: UserOrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrganization
     */
    omit?: UserOrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationInclude<ExtArgs> | null
    /**
     * Filter, which UserOrganizations to fetch.
     */
    where?: UserOrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOrganizations to fetch.
     */
    orderBy?: UserOrganizationOrderByWithRelationInput | UserOrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserOrganizations.
     */
    cursor?: UserOrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOrganizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOrganizations.
     */
    skip?: number
    distinct?: UserOrganizationScalarFieldEnum | UserOrganizationScalarFieldEnum[]
  }

  /**
   * UserOrganization create
   */
  export type UserOrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganization
     */
    select?: UserOrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrganization
     */
    omit?: UserOrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a UserOrganization.
     */
    data: XOR<UserOrganizationCreateInput, UserOrganizationUncheckedCreateInput>
  }

  /**
   * UserOrganization createMany
   */
  export type UserOrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserOrganizations.
     */
    data: UserOrganizationCreateManyInput | UserOrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserOrganization createManyAndReturn
   */
  export type UserOrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganization
     */
    select?: UserOrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrganization
     */
    omit?: UserOrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many UserOrganizations.
     */
    data: UserOrganizationCreateManyInput | UserOrganizationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserOrganization update
   */
  export type UserOrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganization
     */
    select?: UserOrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrganization
     */
    omit?: UserOrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a UserOrganization.
     */
    data: XOR<UserOrganizationUpdateInput, UserOrganizationUncheckedUpdateInput>
    /**
     * Choose, which UserOrganization to update.
     */
    where: UserOrganizationWhereUniqueInput
  }

  /**
   * UserOrganization updateMany
   */
  export type UserOrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserOrganizations.
     */
    data: XOR<UserOrganizationUpdateManyMutationInput, UserOrganizationUncheckedUpdateManyInput>
    /**
     * Filter which UserOrganizations to update
     */
    where?: UserOrganizationWhereInput
    /**
     * Limit how many UserOrganizations to update.
     */
    limit?: number
  }

  /**
   * UserOrganization updateManyAndReturn
   */
  export type UserOrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganization
     */
    select?: UserOrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrganization
     */
    omit?: UserOrganizationOmit<ExtArgs> | null
    /**
     * The data used to update UserOrganizations.
     */
    data: XOR<UserOrganizationUpdateManyMutationInput, UserOrganizationUncheckedUpdateManyInput>
    /**
     * Filter which UserOrganizations to update
     */
    where?: UserOrganizationWhereInput
    /**
     * Limit how many UserOrganizations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserOrganization upsert
   */
  export type UserOrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganization
     */
    select?: UserOrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrganization
     */
    omit?: UserOrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the UserOrganization to update in case it exists.
     */
    where: UserOrganizationWhereUniqueInput
    /**
     * In case the UserOrganization found by the `where` argument doesn't exist, create a new UserOrganization with this data.
     */
    create: XOR<UserOrganizationCreateInput, UserOrganizationUncheckedCreateInput>
    /**
     * In case the UserOrganization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserOrganizationUpdateInput, UserOrganizationUncheckedUpdateInput>
  }

  /**
   * UserOrganization delete
   */
  export type UserOrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganization
     */
    select?: UserOrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrganization
     */
    omit?: UserOrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationInclude<ExtArgs> | null
    /**
     * Filter which UserOrganization to delete.
     */
    where: UserOrganizationWhereUniqueInput
  }

  /**
   * UserOrganization deleteMany
   */
  export type UserOrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOrganizations to delete
     */
    where?: UserOrganizationWhereInput
    /**
     * Limit how many UserOrganizations to delete.
     */
    limit?: number
  }

  /**
   * UserOrganization without action
   */
  export type UserOrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganization
     */
    select?: UserOrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrganization
     */
    omit?: UserOrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationInclude<ExtArgs> | null
  }


  /**
   * Model OrganizationInvite
   */

  export type AggregateOrganizationInvite = {
    _count: OrganizationInviteCountAggregateOutputType | null
    _min: OrganizationInviteMinAggregateOutputType | null
    _max: OrganizationInviteMaxAggregateOutputType | null
  }

  export type OrganizationInviteMinAggregateOutputType = {
    id: string | null
    invitedBy: string | null
    email: string | null
    organizationId: string | null
    role: $Enums.OrganizationUserRole | null
    token: string | null
    accepted: boolean | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type OrganizationInviteMaxAggregateOutputType = {
    id: string | null
    invitedBy: string | null
    email: string | null
    organizationId: string | null
    role: $Enums.OrganizationUserRole | null
    token: string | null
    accepted: boolean | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type OrganizationInviteCountAggregateOutputType = {
    id: number
    invitedBy: number
    email: number
    organizationId: number
    role: number
    token: number
    accepted: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type OrganizationInviteMinAggregateInputType = {
    id?: true
    invitedBy?: true
    email?: true
    organizationId?: true
    role?: true
    token?: true
    accepted?: true
    expiresAt?: true
    createdAt?: true
  }

  export type OrganizationInviteMaxAggregateInputType = {
    id?: true
    invitedBy?: true
    email?: true
    organizationId?: true
    role?: true
    token?: true
    accepted?: true
    expiresAt?: true
    createdAt?: true
  }

  export type OrganizationInviteCountAggregateInputType = {
    id?: true
    invitedBy?: true
    email?: true
    organizationId?: true
    role?: true
    token?: true
    accepted?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type OrganizationInviteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationInvite to aggregate.
     */
    where?: OrganizationInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationInvites to fetch.
     */
    orderBy?: OrganizationInviteOrderByWithRelationInput | OrganizationInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrganizationInvites
    **/
    _count?: true | OrganizationInviteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationInviteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationInviteMaxAggregateInputType
  }

  export type GetOrganizationInviteAggregateType<T extends OrganizationInviteAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizationInvite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizationInvite[P]>
      : GetScalarType<T[P], AggregateOrganizationInvite[P]>
  }




  export type OrganizationInviteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationInviteWhereInput
    orderBy?: OrganizationInviteOrderByWithAggregationInput | OrganizationInviteOrderByWithAggregationInput[]
    by: OrganizationInviteScalarFieldEnum[] | OrganizationInviteScalarFieldEnum
    having?: OrganizationInviteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationInviteCountAggregateInputType | true
    _min?: OrganizationInviteMinAggregateInputType
    _max?: OrganizationInviteMaxAggregateInputType
  }

  export type OrganizationInviteGroupByOutputType = {
    id: string
    invitedBy: string
    email: string
    organizationId: string
    role: $Enums.OrganizationUserRole | null
    token: string
    accepted: boolean
    expiresAt: Date
    createdAt: Date
    _count: OrganizationInviteCountAggregateOutputType | null
    _min: OrganizationInviteMinAggregateOutputType | null
    _max: OrganizationInviteMaxAggregateOutputType | null
  }

  type GetOrganizationInviteGroupByPayload<T extends OrganizationInviteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationInviteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationInviteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationInviteGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationInviteGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationInviteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invitedBy?: boolean
    email?: boolean
    organizationId?: boolean
    role?: boolean
    token?: boolean
    accepted?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationInvite"]>

  export type OrganizationInviteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invitedBy?: boolean
    email?: boolean
    organizationId?: boolean
    role?: boolean
    token?: boolean
    accepted?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationInvite"]>

  export type OrganizationInviteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invitedBy?: boolean
    email?: boolean
    organizationId?: boolean
    role?: boolean
    token?: boolean
    accepted?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationInvite"]>

  export type OrganizationInviteSelectScalar = {
    id?: boolean
    invitedBy?: boolean
    email?: boolean
    organizationId?: boolean
    role?: boolean
    token?: boolean
    accepted?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type OrganizationInviteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invitedBy" | "email" | "organizationId" | "role" | "token" | "accepted" | "expiresAt" | "createdAt", ExtArgs["result"]["organizationInvite"]>
  export type OrganizationInviteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type OrganizationInviteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type OrganizationInviteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $OrganizationInvitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrganizationInvite"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      invitedBy: string
      email: string
      organizationId: string
      role: $Enums.OrganizationUserRole | null
      token: string
      accepted: boolean
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["organizationInvite"]>
    composites: {}
  }

  type OrganizationInviteGetPayload<S extends boolean | null | undefined | OrganizationInviteDefaultArgs> = $Result.GetResult<Prisma.$OrganizationInvitePayload, S>

  type OrganizationInviteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationInviteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationInviteCountAggregateInputType | true
    }

  export interface OrganizationInviteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrganizationInvite'], meta: { name: 'OrganizationInvite' } }
    /**
     * Find zero or one OrganizationInvite that matches the filter.
     * @param {OrganizationInviteFindUniqueArgs} args - Arguments to find a OrganizationInvite
     * @example
     * // Get one OrganizationInvite
     * const organizationInvite = await prisma.organizationInvite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationInviteFindUniqueArgs>(args: SelectSubset<T, OrganizationInviteFindUniqueArgs<ExtArgs>>): Prisma__OrganizationInviteClient<$Result.GetResult<Prisma.$OrganizationInvitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrganizationInvite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationInviteFindUniqueOrThrowArgs} args - Arguments to find a OrganizationInvite
     * @example
     * // Get one OrganizationInvite
     * const organizationInvite = await prisma.organizationInvite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationInviteFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationInviteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationInviteClient<$Result.GetResult<Prisma.$OrganizationInvitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationInvite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationInviteFindFirstArgs} args - Arguments to find a OrganizationInvite
     * @example
     * // Get one OrganizationInvite
     * const organizationInvite = await prisma.organizationInvite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationInviteFindFirstArgs>(args?: SelectSubset<T, OrganizationInviteFindFirstArgs<ExtArgs>>): Prisma__OrganizationInviteClient<$Result.GetResult<Prisma.$OrganizationInvitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationInvite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationInviteFindFirstOrThrowArgs} args - Arguments to find a OrganizationInvite
     * @example
     * // Get one OrganizationInvite
     * const organizationInvite = await prisma.organizationInvite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationInviteFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationInviteFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationInviteClient<$Result.GetResult<Prisma.$OrganizationInvitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrganizationInvites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationInviteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrganizationInvites
     * const organizationInvites = await prisma.organizationInvite.findMany()
     * 
     * // Get first 10 OrganizationInvites
     * const organizationInvites = await prisma.organizationInvite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationInviteWithIdOnly = await prisma.organizationInvite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationInviteFindManyArgs>(args?: SelectSubset<T, OrganizationInviteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrganizationInvite.
     * @param {OrganizationInviteCreateArgs} args - Arguments to create a OrganizationInvite.
     * @example
     * // Create one OrganizationInvite
     * const OrganizationInvite = await prisma.organizationInvite.create({
     *   data: {
     *     // ... data to create a OrganizationInvite
     *   }
     * })
     * 
     */
    create<T extends OrganizationInviteCreateArgs>(args: SelectSubset<T, OrganizationInviteCreateArgs<ExtArgs>>): Prisma__OrganizationInviteClient<$Result.GetResult<Prisma.$OrganizationInvitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrganizationInvites.
     * @param {OrganizationInviteCreateManyArgs} args - Arguments to create many OrganizationInvites.
     * @example
     * // Create many OrganizationInvites
     * const organizationInvite = await prisma.organizationInvite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationInviteCreateManyArgs>(args?: SelectSubset<T, OrganizationInviteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrganizationInvites and returns the data saved in the database.
     * @param {OrganizationInviteCreateManyAndReturnArgs} args - Arguments to create many OrganizationInvites.
     * @example
     * // Create many OrganizationInvites
     * const organizationInvite = await prisma.organizationInvite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrganizationInvites and only return the `id`
     * const organizationInviteWithIdOnly = await prisma.organizationInvite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationInviteCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationInviteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationInvitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrganizationInvite.
     * @param {OrganizationInviteDeleteArgs} args - Arguments to delete one OrganizationInvite.
     * @example
     * // Delete one OrganizationInvite
     * const OrganizationInvite = await prisma.organizationInvite.delete({
     *   where: {
     *     // ... filter to delete one OrganizationInvite
     *   }
     * })
     * 
     */
    delete<T extends OrganizationInviteDeleteArgs>(args: SelectSubset<T, OrganizationInviteDeleteArgs<ExtArgs>>): Prisma__OrganizationInviteClient<$Result.GetResult<Prisma.$OrganizationInvitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrganizationInvite.
     * @param {OrganizationInviteUpdateArgs} args - Arguments to update one OrganizationInvite.
     * @example
     * // Update one OrganizationInvite
     * const organizationInvite = await prisma.organizationInvite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationInviteUpdateArgs>(args: SelectSubset<T, OrganizationInviteUpdateArgs<ExtArgs>>): Prisma__OrganizationInviteClient<$Result.GetResult<Prisma.$OrganizationInvitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrganizationInvites.
     * @param {OrganizationInviteDeleteManyArgs} args - Arguments to filter OrganizationInvites to delete.
     * @example
     * // Delete a few OrganizationInvites
     * const { count } = await prisma.organizationInvite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationInviteDeleteManyArgs>(args?: SelectSubset<T, OrganizationInviteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationInviteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrganizationInvites
     * const organizationInvite = await prisma.organizationInvite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationInviteUpdateManyArgs>(args: SelectSubset<T, OrganizationInviteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationInvites and returns the data updated in the database.
     * @param {OrganizationInviteUpdateManyAndReturnArgs} args - Arguments to update many OrganizationInvites.
     * @example
     * // Update many OrganizationInvites
     * const organizationInvite = await prisma.organizationInvite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrganizationInvites and only return the `id`
     * const organizationInviteWithIdOnly = await prisma.organizationInvite.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrganizationInviteUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationInviteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationInvitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrganizationInvite.
     * @param {OrganizationInviteUpsertArgs} args - Arguments to update or create a OrganizationInvite.
     * @example
     * // Update or create a OrganizationInvite
     * const organizationInvite = await prisma.organizationInvite.upsert({
     *   create: {
     *     // ... data to create a OrganizationInvite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrganizationInvite we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationInviteUpsertArgs>(args: SelectSubset<T, OrganizationInviteUpsertArgs<ExtArgs>>): Prisma__OrganizationInviteClient<$Result.GetResult<Prisma.$OrganizationInvitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrganizationInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationInviteCountArgs} args - Arguments to filter OrganizationInvites to count.
     * @example
     * // Count the number of OrganizationInvites
     * const count = await prisma.organizationInvite.count({
     *   where: {
     *     // ... the filter for the OrganizationInvites we want to count
     *   }
     * })
    **/
    count<T extends OrganizationInviteCountArgs>(
      args?: Subset<T, OrganizationInviteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationInviteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrganizationInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationInviteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrganizationInviteAggregateArgs>(args: Subset<T, OrganizationInviteAggregateArgs>): Prisma.PrismaPromise<GetOrganizationInviteAggregateType<T>>

    /**
     * Group by OrganizationInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationInviteGroupByArgs} args - Group by arguments.
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
      T extends OrganizationInviteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationInviteGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationInviteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrganizationInviteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationInviteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrganizationInvite model
   */
  readonly fields: OrganizationInviteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrganizationInvite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationInviteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrganizationInvite model
   */
  interface OrganizationInviteFieldRefs {
    readonly id: FieldRef<"OrganizationInvite", 'String'>
    readonly invitedBy: FieldRef<"OrganizationInvite", 'String'>
    readonly email: FieldRef<"OrganizationInvite", 'String'>
    readonly organizationId: FieldRef<"OrganizationInvite", 'String'>
    readonly role: FieldRef<"OrganizationInvite", 'OrganizationUserRole'>
    readonly token: FieldRef<"OrganizationInvite", 'String'>
    readonly accepted: FieldRef<"OrganizationInvite", 'Boolean'>
    readonly expiresAt: FieldRef<"OrganizationInvite", 'DateTime'>
    readonly createdAt: FieldRef<"OrganizationInvite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrganizationInvite findUnique
   */
  export type OrganizationInviteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationInvite
     */
    select?: OrganizationInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationInvite
     */
    omit?: OrganizationInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInviteInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationInvite to fetch.
     */
    where: OrganizationInviteWhereUniqueInput
  }

  /**
   * OrganizationInvite findUniqueOrThrow
   */
  export type OrganizationInviteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationInvite
     */
    select?: OrganizationInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationInvite
     */
    omit?: OrganizationInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInviteInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationInvite to fetch.
     */
    where: OrganizationInviteWhereUniqueInput
  }

  /**
   * OrganizationInvite findFirst
   */
  export type OrganizationInviteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationInvite
     */
    select?: OrganizationInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationInvite
     */
    omit?: OrganizationInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInviteInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationInvite to fetch.
     */
    where?: OrganizationInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationInvites to fetch.
     */
    orderBy?: OrganizationInviteOrderByWithRelationInput | OrganizationInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationInvites.
     */
    cursor?: OrganizationInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationInvites.
     */
    distinct?: OrganizationInviteScalarFieldEnum | OrganizationInviteScalarFieldEnum[]
  }

  /**
   * OrganizationInvite findFirstOrThrow
   */
  export type OrganizationInviteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationInvite
     */
    select?: OrganizationInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationInvite
     */
    omit?: OrganizationInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInviteInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationInvite to fetch.
     */
    where?: OrganizationInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationInvites to fetch.
     */
    orderBy?: OrganizationInviteOrderByWithRelationInput | OrganizationInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationInvites.
     */
    cursor?: OrganizationInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationInvites.
     */
    distinct?: OrganizationInviteScalarFieldEnum | OrganizationInviteScalarFieldEnum[]
  }

  /**
   * OrganizationInvite findMany
   */
  export type OrganizationInviteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationInvite
     */
    select?: OrganizationInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationInvite
     */
    omit?: OrganizationInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInviteInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationInvites to fetch.
     */
    where?: OrganizationInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationInvites to fetch.
     */
    orderBy?: OrganizationInviteOrderByWithRelationInput | OrganizationInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrganizationInvites.
     */
    cursor?: OrganizationInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationInvites.
     */
    skip?: number
    distinct?: OrganizationInviteScalarFieldEnum | OrganizationInviteScalarFieldEnum[]
  }

  /**
   * OrganizationInvite create
   */
  export type OrganizationInviteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationInvite
     */
    select?: OrganizationInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationInvite
     */
    omit?: OrganizationInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInviteInclude<ExtArgs> | null
    /**
     * The data needed to create a OrganizationInvite.
     */
    data: XOR<OrganizationInviteCreateInput, OrganizationInviteUncheckedCreateInput>
  }

  /**
   * OrganizationInvite createMany
   */
  export type OrganizationInviteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrganizationInvites.
     */
    data: OrganizationInviteCreateManyInput | OrganizationInviteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizationInvite createManyAndReturn
   */
  export type OrganizationInviteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationInvite
     */
    select?: OrganizationInviteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationInvite
     */
    omit?: OrganizationInviteOmit<ExtArgs> | null
    /**
     * The data used to create many OrganizationInvites.
     */
    data: OrganizationInviteCreateManyInput | OrganizationInviteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInviteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationInvite update
   */
  export type OrganizationInviteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationInvite
     */
    select?: OrganizationInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationInvite
     */
    omit?: OrganizationInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInviteInclude<ExtArgs> | null
    /**
     * The data needed to update a OrganizationInvite.
     */
    data: XOR<OrganizationInviteUpdateInput, OrganizationInviteUncheckedUpdateInput>
    /**
     * Choose, which OrganizationInvite to update.
     */
    where: OrganizationInviteWhereUniqueInput
  }

  /**
   * OrganizationInvite updateMany
   */
  export type OrganizationInviteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrganizationInvites.
     */
    data: XOR<OrganizationInviteUpdateManyMutationInput, OrganizationInviteUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationInvites to update
     */
    where?: OrganizationInviteWhereInput
    /**
     * Limit how many OrganizationInvites to update.
     */
    limit?: number
  }

  /**
   * OrganizationInvite updateManyAndReturn
   */
  export type OrganizationInviteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationInvite
     */
    select?: OrganizationInviteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationInvite
     */
    omit?: OrganizationInviteOmit<ExtArgs> | null
    /**
     * The data used to update OrganizationInvites.
     */
    data: XOR<OrganizationInviteUpdateManyMutationInput, OrganizationInviteUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationInvites to update
     */
    where?: OrganizationInviteWhereInput
    /**
     * Limit how many OrganizationInvites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInviteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationInvite upsert
   */
  export type OrganizationInviteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationInvite
     */
    select?: OrganizationInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationInvite
     */
    omit?: OrganizationInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInviteInclude<ExtArgs> | null
    /**
     * The filter to search for the OrganizationInvite to update in case it exists.
     */
    where: OrganizationInviteWhereUniqueInput
    /**
     * In case the OrganizationInvite found by the `where` argument doesn't exist, create a new OrganizationInvite with this data.
     */
    create: XOR<OrganizationInviteCreateInput, OrganizationInviteUncheckedCreateInput>
    /**
     * In case the OrganizationInvite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationInviteUpdateInput, OrganizationInviteUncheckedUpdateInput>
  }

  /**
   * OrganizationInvite delete
   */
  export type OrganizationInviteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationInvite
     */
    select?: OrganizationInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationInvite
     */
    omit?: OrganizationInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInviteInclude<ExtArgs> | null
    /**
     * Filter which OrganizationInvite to delete.
     */
    where: OrganizationInviteWhereUniqueInput
  }

  /**
   * OrganizationInvite deleteMany
   */
  export type OrganizationInviteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationInvites to delete
     */
    where?: OrganizationInviteWhereInput
    /**
     * Limit how many OrganizationInvites to delete.
     */
    limit?: number
  }

  /**
   * OrganizationInvite without action
   */
  export type OrganizationInviteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationInvite
     */
    select?: OrganizationInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationInvite
     */
    omit?: OrganizationInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInviteInclude<ExtArgs> | null
  }


  /**
   * Model Feature
   */

  export type AggregateFeature = {
    _count: FeatureCountAggregateOutputType | null
    _min: FeatureMinAggregateOutputType | null
    _max: FeatureMaxAggregateOutputType | null
  }

  export type FeatureMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    isEnabled: boolean | null
    createdAt: Date | null
  }

  export type FeatureMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    isEnabled: boolean | null
    createdAt: Date | null
  }

  export type FeatureCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    isEnabled: number
    createdAt: number
    _all: number
  }


  export type FeatureMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    isEnabled?: true
    createdAt?: true
  }

  export type FeatureMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    isEnabled?: true
    createdAt?: true
  }

  export type FeatureCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    isEnabled?: true
    createdAt?: true
    _all?: true
  }

  export type FeatureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feature to aggregate.
     */
    where?: FeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Features to fetch.
     */
    orderBy?: FeatureOrderByWithRelationInput | FeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Features from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Features.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Features
    **/
    _count?: true | FeatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeatureMaxAggregateInputType
  }

  export type GetFeatureAggregateType<T extends FeatureAggregateArgs> = {
        [P in keyof T & keyof AggregateFeature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeature[P]>
      : GetScalarType<T[P], AggregateFeature[P]>
  }




  export type FeatureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeatureWhereInput
    orderBy?: FeatureOrderByWithAggregationInput | FeatureOrderByWithAggregationInput[]
    by: FeatureScalarFieldEnum[] | FeatureScalarFieldEnum
    having?: FeatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeatureCountAggregateInputType | true
    _min?: FeatureMinAggregateInputType
    _max?: FeatureMaxAggregateInputType
  }

  export type FeatureGroupByOutputType = {
    id: string
    name: string
    slug: string
    isEnabled: boolean
    createdAt: Date
    _count: FeatureCountAggregateOutputType | null
    _min: FeatureMinAggregateOutputType | null
    _max: FeatureMaxAggregateOutputType | null
  }

  type GetFeatureGroupByPayload<T extends FeatureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeatureGroupByOutputType[P]>
            : GetScalarType<T[P], FeatureGroupByOutputType[P]>
        }
      >
    >


  export type FeatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    isEnabled?: boolean
    createdAt?: boolean
    orgAccesses?: boolean | Feature$orgAccessesArgs<ExtArgs>
    _count?: boolean | FeatureCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feature"]>

  export type FeatureSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    isEnabled?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["feature"]>

  export type FeatureSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    isEnabled?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["feature"]>

  export type FeatureSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    isEnabled?: boolean
    createdAt?: boolean
  }

  export type FeatureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "isEnabled" | "createdAt", ExtArgs["result"]["feature"]>
  export type FeatureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orgAccesses?: boolean | Feature$orgAccessesArgs<ExtArgs>
    _count?: boolean | FeatureCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FeatureIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FeatureIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FeaturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feature"
    objects: {
      orgAccesses: Prisma.$OrganizationFeatureAccessPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      isEnabled: boolean
      createdAt: Date
    }, ExtArgs["result"]["feature"]>
    composites: {}
  }

  type FeatureGetPayload<S extends boolean | null | undefined | FeatureDefaultArgs> = $Result.GetResult<Prisma.$FeaturePayload, S>

  type FeatureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeatureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeatureCountAggregateInputType | true
    }

  export interface FeatureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feature'], meta: { name: 'Feature' } }
    /**
     * Find zero or one Feature that matches the filter.
     * @param {FeatureFindUniqueArgs} args - Arguments to find a Feature
     * @example
     * // Get one Feature
     * const feature = await prisma.feature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeatureFindUniqueArgs>(args: SelectSubset<T, FeatureFindUniqueArgs<ExtArgs>>): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Feature that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeatureFindUniqueOrThrowArgs} args - Arguments to find a Feature
     * @example
     * // Get one Feature
     * const feature = await prisma.feature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeatureFindUniqueOrThrowArgs>(args: SelectSubset<T, FeatureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFindFirstArgs} args - Arguments to find a Feature
     * @example
     * // Get one Feature
     * const feature = await prisma.feature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeatureFindFirstArgs>(args?: SelectSubset<T, FeatureFindFirstArgs<ExtArgs>>): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feature that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFindFirstOrThrowArgs} args - Arguments to find a Feature
     * @example
     * // Get one Feature
     * const feature = await prisma.feature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeatureFindFirstOrThrowArgs>(args?: SelectSubset<T, FeatureFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Features that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Features
     * const features = await prisma.feature.findMany()
     * 
     * // Get first 10 Features
     * const features = await prisma.feature.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const featureWithIdOnly = await prisma.feature.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeatureFindManyArgs>(args?: SelectSubset<T, FeatureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Feature.
     * @param {FeatureCreateArgs} args - Arguments to create a Feature.
     * @example
     * // Create one Feature
     * const Feature = await prisma.feature.create({
     *   data: {
     *     // ... data to create a Feature
     *   }
     * })
     * 
     */
    create<T extends FeatureCreateArgs>(args: SelectSubset<T, FeatureCreateArgs<ExtArgs>>): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Features.
     * @param {FeatureCreateManyArgs} args - Arguments to create many Features.
     * @example
     * // Create many Features
     * const feature = await prisma.feature.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeatureCreateManyArgs>(args?: SelectSubset<T, FeatureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Features and returns the data saved in the database.
     * @param {FeatureCreateManyAndReturnArgs} args - Arguments to create many Features.
     * @example
     * // Create many Features
     * const feature = await prisma.feature.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Features and only return the `id`
     * const featureWithIdOnly = await prisma.feature.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeatureCreateManyAndReturnArgs>(args?: SelectSubset<T, FeatureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Feature.
     * @param {FeatureDeleteArgs} args - Arguments to delete one Feature.
     * @example
     * // Delete one Feature
     * const Feature = await prisma.feature.delete({
     *   where: {
     *     // ... filter to delete one Feature
     *   }
     * })
     * 
     */
    delete<T extends FeatureDeleteArgs>(args: SelectSubset<T, FeatureDeleteArgs<ExtArgs>>): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Feature.
     * @param {FeatureUpdateArgs} args - Arguments to update one Feature.
     * @example
     * // Update one Feature
     * const feature = await prisma.feature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeatureUpdateArgs>(args: SelectSubset<T, FeatureUpdateArgs<ExtArgs>>): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Features.
     * @param {FeatureDeleteManyArgs} args - Arguments to filter Features to delete.
     * @example
     * // Delete a few Features
     * const { count } = await prisma.feature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeatureDeleteManyArgs>(args?: SelectSubset<T, FeatureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Features.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Features
     * const feature = await prisma.feature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeatureUpdateManyArgs>(args: SelectSubset<T, FeatureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Features and returns the data updated in the database.
     * @param {FeatureUpdateManyAndReturnArgs} args - Arguments to update many Features.
     * @example
     * // Update many Features
     * const feature = await prisma.feature.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Features and only return the `id`
     * const featureWithIdOnly = await prisma.feature.updateManyAndReturn({
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
    updateManyAndReturn<T extends FeatureUpdateManyAndReturnArgs>(args: SelectSubset<T, FeatureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Feature.
     * @param {FeatureUpsertArgs} args - Arguments to update or create a Feature.
     * @example
     * // Update or create a Feature
     * const feature = await prisma.feature.upsert({
     *   create: {
     *     // ... data to create a Feature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feature we want to update
     *   }
     * })
     */
    upsert<T extends FeatureUpsertArgs>(args: SelectSubset<T, FeatureUpsertArgs<ExtArgs>>): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Features.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureCountArgs} args - Arguments to filter Features to count.
     * @example
     * // Count the number of Features
     * const count = await prisma.feature.count({
     *   where: {
     *     // ... the filter for the Features we want to count
     *   }
     * })
    **/
    count<T extends FeatureCountArgs>(
      args?: Subset<T, FeatureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FeatureAggregateArgs>(args: Subset<T, FeatureAggregateArgs>): Prisma.PrismaPromise<GetFeatureAggregateType<T>>

    /**
     * Group by Feature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureGroupByArgs} args - Group by arguments.
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
      T extends FeatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeatureGroupByArgs['orderBy'] }
        : { orderBy?: FeatureGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FeatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeatureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feature model
   */
  readonly fields: FeatureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeatureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orgAccesses<T extends Feature$orgAccessesArgs<ExtArgs> = {}>(args?: Subset<T, Feature$orgAccessesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationFeatureAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Feature model
   */
  interface FeatureFieldRefs {
    readonly id: FieldRef<"Feature", 'String'>
    readonly name: FieldRef<"Feature", 'String'>
    readonly slug: FieldRef<"Feature", 'String'>
    readonly isEnabled: FieldRef<"Feature", 'Boolean'>
    readonly createdAt: FieldRef<"Feature", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Feature findUnique
   */
  export type FeatureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feature
     */
    omit?: FeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * Filter, which Feature to fetch.
     */
    where: FeatureWhereUniqueInput
  }

  /**
   * Feature findUniqueOrThrow
   */
  export type FeatureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feature
     */
    omit?: FeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * Filter, which Feature to fetch.
     */
    where: FeatureWhereUniqueInput
  }

  /**
   * Feature findFirst
   */
  export type FeatureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feature
     */
    omit?: FeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * Filter, which Feature to fetch.
     */
    where?: FeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Features to fetch.
     */
    orderBy?: FeatureOrderByWithRelationInput | FeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Features.
     */
    cursor?: FeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Features from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Features.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Features.
     */
    distinct?: FeatureScalarFieldEnum | FeatureScalarFieldEnum[]
  }

  /**
   * Feature findFirstOrThrow
   */
  export type FeatureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feature
     */
    omit?: FeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * Filter, which Feature to fetch.
     */
    where?: FeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Features to fetch.
     */
    orderBy?: FeatureOrderByWithRelationInput | FeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Features.
     */
    cursor?: FeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Features from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Features.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Features.
     */
    distinct?: FeatureScalarFieldEnum | FeatureScalarFieldEnum[]
  }

  /**
   * Feature findMany
   */
  export type FeatureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feature
     */
    omit?: FeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * Filter, which Features to fetch.
     */
    where?: FeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Features to fetch.
     */
    orderBy?: FeatureOrderByWithRelationInput | FeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Features.
     */
    cursor?: FeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Features from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Features.
     */
    skip?: number
    distinct?: FeatureScalarFieldEnum | FeatureScalarFieldEnum[]
  }

  /**
   * Feature create
   */
  export type FeatureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feature
     */
    omit?: FeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * The data needed to create a Feature.
     */
    data: XOR<FeatureCreateInput, FeatureUncheckedCreateInput>
  }

  /**
   * Feature createMany
   */
  export type FeatureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Features.
     */
    data: FeatureCreateManyInput | FeatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feature createManyAndReturn
   */
  export type FeatureCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feature
     */
    omit?: FeatureOmit<ExtArgs> | null
    /**
     * The data used to create many Features.
     */
    data: FeatureCreateManyInput | FeatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feature update
   */
  export type FeatureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feature
     */
    omit?: FeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * The data needed to update a Feature.
     */
    data: XOR<FeatureUpdateInput, FeatureUncheckedUpdateInput>
    /**
     * Choose, which Feature to update.
     */
    where: FeatureWhereUniqueInput
  }

  /**
   * Feature updateMany
   */
  export type FeatureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Features.
     */
    data: XOR<FeatureUpdateManyMutationInput, FeatureUncheckedUpdateManyInput>
    /**
     * Filter which Features to update
     */
    where?: FeatureWhereInput
    /**
     * Limit how many Features to update.
     */
    limit?: number
  }

  /**
   * Feature updateManyAndReturn
   */
  export type FeatureUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feature
     */
    omit?: FeatureOmit<ExtArgs> | null
    /**
     * The data used to update Features.
     */
    data: XOR<FeatureUpdateManyMutationInput, FeatureUncheckedUpdateManyInput>
    /**
     * Filter which Features to update
     */
    where?: FeatureWhereInput
    /**
     * Limit how many Features to update.
     */
    limit?: number
  }

  /**
   * Feature upsert
   */
  export type FeatureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feature
     */
    omit?: FeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * The filter to search for the Feature to update in case it exists.
     */
    where: FeatureWhereUniqueInput
    /**
     * In case the Feature found by the `where` argument doesn't exist, create a new Feature with this data.
     */
    create: XOR<FeatureCreateInput, FeatureUncheckedCreateInput>
    /**
     * In case the Feature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeatureUpdateInput, FeatureUncheckedUpdateInput>
  }

  /**
   * Feature delete
   */
  export type FeatureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feature
     */
    omit?: FeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * Filter which Feature to delete.
     */
    where: FeatureWhereUniqueInput
  }

  /**
   * Feature deleteMany
   */
  export type FeatureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Features to delete
     */
    where?: FeatureWhereInput
    /**
     * Limit how many Features to delete.
     */
    limit?: number
  }

  /**
   * Feature.orgAccesses
   */
  export type Feature$orgAccessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFeatureAccess
     */
    select?: OrganizationFeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFeatureAccess
     */
    omit?: OrganizationFeatureAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFeatureAccessInclude<ExtArgs> | null
    where?: OrganizationFeatureAccessWhereInput
    orderBy?: OrganizationFeatureAccessOrderByWithRelationInput | OrganizationFeatureAccessOrderByWithRelationInput[]
    cursor?: OrganizationFeatureAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationFeatureAccessScalarFieldEnum | OrganizationFeatureAccessScalarFieldEnum[]
  }

  /**
   * Feature without action
   */
  export type FeatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feature
     */
    omit?: FeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureInclude<ExtArgs> | null
  }


  /**
   * Model OrganizationFeatureAccess
   */

  export type AggregateOrganizationFeatureAccess = {
    _count: OrganizationFeatureAccessCountAggregateOutputType | null
    _min: OrganizationFeatureAccessMinAggregateOutputType | null
    _max: OrganizationFeatureAccessMaxAggregateOutputType | null
  }

  export type OrganizationFeatureAccessMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    featureId: string | null
    isEnabled: boolean | null
  }

  export type OrganizationFeatureAccessMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    featureId: string | null
    isEnabled: boolean | null
  }

  export type OrganizationFeatureAccessCountAggregateOutputType = {
    id: number
    organizationId: number
    featureId: number
    isEnabled: number
    _all: number
  }


  export type OrganizationFeatureAccessMinAggregateInputType = {
    id?: true
    organizationId?: true
    featureId?: true
    isEnabled?: true
  }

  export type OrganizationFeatureAccessMaxAggregateInputType = {
    id?: true
    organizationId?: true
    featureId?: true
    isEnabled?: true
  }

  export type OrganizationFeatureAccessCountAggregateInputType = {
    id?: true
    organizationId?: true
    featureId?: true
    isEnabled?: true
    _all?: true
  }

  export type OrganizationFeatureAccessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationFeatureAccess to aggregate.
     */
    where?: OrganizationFeatureAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationFeatureAccesses to fetch.
     */
    orderBy?: OrganizationFeatureAccessOrderByWithRelationInput | OrganizationFeatureAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationFeatureAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationFeatureAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationFeatureAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrganizationFeatureAccesses
    **/
    _count?: true | OrganizationFeatureAccessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationFeatureAccessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationFeatureAccessMaxAggregateInputType
  }

  export type GetOrganizationFeatureAccessAggregateType<T extends OrganizationFeatureAccessAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizationFeatureAccess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizationFeatureAccess[P]>
      : GetScalarType<T[P], AggregateOrganizationFeatureAccess[P]>
  }




  export type OrganizationFeatureAccessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationFeatureAccessWhereInput
    orderBy?: OrganizationFeatureAccessOrderByWithAggregationInput | OrganizationFeatureAccessOrderByWithAggregationInput[]
    by: OrganizationFeatureAccessScalarFieldEnum[] | OrganizationFeatureAccessScalarFieldEnum
    having?: OrganizationFeatureAccessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationFeatureAccessCountAggregateInputType | true
    _min?: OrganizationFeatureAccessMinAggregateInputType
    _max?: OrganizationFeatureAccessMaxAggregateInputType
  }

  export type OrganizationFeatureAccessGroupByOutputType = {
    id: string
    organizationId: string
    featureId: string
    isEnabled: boolean
    _count: OrganizationFeatureAccessCountAggregateOutputType | null
    _min: OrganizationFeatureAccessMinAggregateOutputType | null
    _max: OrganizationFeatureAccessMaxAggregateOutputType | null
  }

  type GetOrganizationFeatureAccessGroupByPayload<T extends OrganizationFeatureAccessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationFeatureAccessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationFeatureAccessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationFeatureAccessGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationFeatureAccessGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationFeatureAccessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    featureId?: boolean
    isEnabled?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    feature?: boolean | FeatureDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationFeatureAccess"]>

  export type OrganizationFeatureAccessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    featureId?: boolean
    isEnabled?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    feature?: boolean | FeatureDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationFeatureAccess"]>

  export type OrganizationFeatureAccessSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    featureId?: boolean
    isEnabled?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    feature?: boolean | FeatureDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationFeatureAccess"]>

  export type OrganizationFeatureAccessSelectScalar = {
    id?: boolean
    organizationId?: boolean
    featureId?: boolean
    isEnabled?: boolean
  }

  export type OrganizationFeatureAccessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "featureId" | "isEnabled", ExtArgs["result"]["organizationFeatureAccess"]>
  export type OrganizationFeatureAccessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    feature?: boolean | FeatureDefaultArgs<ExtArgs>
  }
  export type OrganizationFeatureAccessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    feature?: boolean | FeatureDefaultArgs<ExtArgs>
  }
  export type OrganizationFeatureAccessIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    feature?: boolean | FeatureDefaultArgs<ExtArgs>
  }

  export type $OrganizationFeatureAccessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrganizationFeatureAccess"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      feature: Prisma.$FeaturePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      featureId: string
      isEnabled: boolean
    }, ExtArgs["result"]["organizationFeatureAccess"]>
    composites: {}
  }

  type OrganizationFeatureAccessGetPayload<S extends boolean | null | undefined | OrganizationFeatureAccessDefaultArgs> = $Result.GetResult<Prisma.$OrganizationFeatureAccessPayload, S>

  type OrganizationFeatureAccessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFeatureAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationFeatureAccessCountAggregateInputType | true
    }

  export interface OrganizationFeatureAccessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrganizationFeatureAccess'], meta: { name: 'OrganizationFeatureAccess' } }
    /**
     * Find zero or one OrganizationFeatureAccess that matches the filter.
     * @param {OrganizationFeatureAccessFindUniqueArgs} args - Arguments to find a OrganizationFeatureAccess
     * @example
     * // Get one OrganizationFeatureAccess
     * const organizationFeatureAccess = await prisma.organizationFeatureAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFeatureAccessFindUniqueArgs>(args: SelectSubset<T, OrganizationFeatureAccessFindUniqueArgs<ExtArgs>>): Prisma__OrganizationFeatureAccessClient<$Result.GetResult<Prisma.$OrganizationFeatureAccessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrganizationFeatureAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFeatureAccessFindUniqueOrThrowArgs} args - Arguments to find a OrganizationFeatureAccess
     * @example
     * // Get one OrganizationFeatureAccess
     * const organizationFeatureAccess = await prisma.organizationFeatureAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFeatureAccessFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFeatureAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationFeatureAccessClient<$Result.GetResult<Prisma.$OrganizationFeatureAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationFeatureAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFeatureAccessFindFirstArgs} args - Arguments to find a OrganizationFeatureAccess
     * @example
     * // Get one OrganizationFeatureAccess
     * const organizationFeatureAccess = await prisma.organizationFeatureAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFeatureAccessFindFirstArgs>(args?: SelectSubset<T, OrganizationFeatureAccessFindFirstArgs<ExtArgs>>): Prisma__OrganizationFeatureAccessClient<$Result.GetResult<Prisma.$OrganizationFeatureAccessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationFeatureAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFeatureAccessFindFirstOrThrowArgs} args - Arguments to find a OrganizationFeatureAccess
     * @example
     * // Get one OrganizationFeatureAccess
     * const organizationFeatureAccess = await prisma.organizationFeatureAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFeatureAccessFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFeatureAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationFeatureAccessClient<$Result.GetResult<Prisma.$OrganizationFeatureAccessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrganizationFeatureAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFeatureAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrganizationFeatureAccesses
     * const organizationFeatureAccesses = await prisma.organizationFeatureAccess.findMany()
     * 
     * // Get first 10 OrganizationFeatureAccesses
     * const organizationFeatureAccesses = await prisma.organizationFeatureAccess.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationFeatureAccessWithIdOnly = await prisma.organizationFeatureAccess.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFeatureAccessFindManyArgs>(args?: SelectSubset<T, OrganizationFeatureAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationFeatureAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrganizationFeatureAccess.
     * @param {OrganizationFeatureAccessCreateArgs} args - Arguments to create a OrganizationFeatureAccess.
     * @example
     * // Create one OrganizationFeatureAccess
     * const OrganizationFeatureAccess = await prisma.organizationFeatureAccess.create({
     *   data: {
     *     // ... data to create a OrganizationFeatureAccess
     *   }
     * })
     * 
     */
    create<T extends OrganizationFeatureAccessCreateArgs>(args: SelectSubset<T, OrganizationFeatureAccessCreateArgs<ExtArgs>>): Prisma__OrganizationFeatureAccessClient<$Result.GetResult<Prisma.$OrganizationFeatureAccessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrganizationFeatureAccesses.
     * @param {OrganizationFeatureAccessCreateManyArgs} args - Arguments to create many OrganizationFeatureAccesses.
     * @example
     * // Create many OrganizationFeatureAccesses
     * const organizationFeatureAccess = await prisma.organizationFeatureAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationFeatureAccessCreateManyArgs>(args?: SelectSubset<T, OrganizationFeatureAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrganizationFeatureAccesses and returns the data saved in the database.
     * @param {OrganizationFeatureAccessCreateManyAndReturnArgs} args - Arguments to create many OrganizationFeatureAccesses.
     * @example
     * // Create many OrganizationFeatureAccesses
     * const organizationFeatureAccess = await prisma.organizationFeatureAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrganizationFeatureAccesses and only return the `id`
     * const organizationFeatureAccessWithIdOnly = await prisma.organizationFeatureAccess.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationFeatureAccessCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationFeatureAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationFeatureAccessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrganizationFeatureAccess.
     * @param {OrganizationFeatureAccessDeleteArgs} args - Arguments to delete one OrganizationFeatureAccess.
     * @example
     * // Delete one OrganizationFeatureAccess
     * const OrganizationFeatureAccess = await prisma.organizationFeatureAccess.delete({
     *   where: {
     *     // ... filter to delete one OrganizationFeatureAccess
     *   }
     * })
     * 
     */
    delete<T extends OrganizationFeatureAccessDeleteArgs>(args: SelectSubset<T, OrganizationFeatureAccessDeleteArgs<ExtArgs>>): Prisma__OrganizationFeatureAccessClient<$Result.GetResult<Prisma.$OrganizationFeatureAccessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrganizationFeatureAccess.
     * @param {OrganizationFeatureAccessUpdateArgs} args - Arguments to update one OrganizationFeatureAccess.
     * @example
     * // Update one OrganizationFeatureAccess
     * const organizationFeatureAccess = await prisma.organizationFeatureAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationFeatureAccessUpdateArgs>(args: SelectSubset<T, OrganizationFeatureAccessUpdateArgs<ExtArgs>>): Prisma__OrganizationFeatureAccessClient<$Result.GetResult<Prisma.$OrganizationFeatureAccessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrganizationFeatureAccesses.
     * @param {OrganizationFeatureAccessDeleteManyArgs} args - Arguments to filter OrganizationFeatureAccesses to delete.
     * @example
     * // Delete a few OrganizationFeatureAccesses
     * const { count } = await prisma.organizationFeatureAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationFeatureAccessDeleteManyArgs>(args?: SelectSubset<T, OrganizationFeatureAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationFeatureAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFeatureAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrganizationFeatureAccesses
     * const organizationFeatureAccess = await prisma.organizationFeatureAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationFeatureAccessUpdateManyArgs>(args: SelectSubset<T, OrganizationFeatureAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationFeatureAccesses and returns the data updated in the database.
     * @param {OrganizationFeatureAccessUpdateManyAndReturnArgs} args - Arguments to update many OrganizationFeatureAccesses.
     * @example
     * // Update many OrganizationFeatureAccesses
     * const organizationFeatureAccess = await prisma.organizationFeatureAccess.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrganizationFeatureAccesses and only return the `id`
     * const organizationFeatureAccessWithIdOnly = await prisma.organizationFeatureAccess.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrganizationFeatureAccessUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationFeatureAccessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationFeatureAccessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrganizationFeatureAccess.
     * @param {OrganizationFeatureAccessUpsertArgs} args - Arguments to update or create a OrganizationFeatureAccess.
     * @example
     * // Update or create a OrganizationFeatureAccess
     * const organizationFeatureAccess = await prisma.organizationFeatureAccess.upsert({
     *   create: {
     *     // ... data to create a OrganizationFeatureAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrganizationFeatureAccess we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationFeatureAccessUpsertArgs>(args: SelectSubset<T, OrganizationFeatureAccessUpsertArgs<ExtArgs>>): Prisma__OrganizationFeatureAccessClient<$Result.GetResult<Prisma.$OrganizationFeatureAccessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrganizationFeatureAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFeatureAccessCountArgs} args - Arguments to filter OrganizationFeatureAccesses to count.
     * @example
     * // Count the number of OrganizationFeatureAccesses
     * const count = await prisma.organizationFeatureAccess.count({
     *   where: {
     *     // ... the filter for the OrganizationFeatureAccesses we want to count
     *   }
     * })
    **/
    count<T extends OrganizationFeatureAccessCountArgs>(
      args?: Subset<T, OrganizationFeatureAccessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationFeatureAccessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrganizationFeatureAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFeatureAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrganizationFeatureAccessAggregateArgs>(args: Subset<T, OrganizationFeatureAccessAggregateArgs>): Prisma.PrismaPromise<GetOrganizationFeatureAccessAggregateType<T>>

    /**
     * Group by OrganizationFeatureAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFeatureAccessGroupByArgs} args - Group by arguments.
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
      T extends OrganizationFeatureAccessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationFeatureAccessGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationFeatureAccessGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrganizationFeatureAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationFeatureAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrganizationFeatureAccess model
   */
  readonly fields: OrganizationFeatureAccessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrganizationFeatureAccess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationFeatureAccessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    feature<T extends FeatureDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FeatureDefaultArgs<ExtArgs>>): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrganizationFeatureAccess model
   */
  interface OrganizationFeatureAccessFieldRefs {
    readonly id: FieldRef<"OrganizationFeatureAccess", 'String'>
    readonly organizationId: FieldRef<"OrganizationFeatureAccess", 'String'>
    readonly featureId: FieldRef<"OrganizationFeatureAccess", 'String'>
    readonly isEnabled: FieldRef<"OrganizationFeatureAccess", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * OrganizationFeatureAccess findUnique
   */
  export type OrganizationFeatureAccessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFeatureAccess
     */
    select?: OrganizationFeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFeatureAccess
     */
    omit?: OrganizationFeatureAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFeatureAccessInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationFeatureAccess to fetch.
     */
    where: OrganizationFeatureAccessWhereUniqueInput
  }

  /**
   * OrganizationFeatureAccess findUniqueOrThrow
   */
  export type OrganizationFeatureAccessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFeatureAccess
     */
    select?: OrganizationFeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFeatureAccess
     */
    omit?: OrganizationFeatureAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFeatureAccessInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationFeatureAccess to fetch.
     */
    where: OrganizationFeatureAccessWhereUniqueInput
  }

  /**
   * OrganizationFeatureAccess findFirst
   */
  export type OrganizationFeatureAccessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFeatureAccess
     */
    select?: OrganizationFeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFeatureAccess
     */
    omit?: OrganizationFeatureAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFeatureAccessInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationFeatureAccess to fetch.
     */
    where?: OrganizationFeatureAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationFeatureAccesses to fetch.
     */
    orderBy?: OrganizationFeatureAccessOrderByWithRelationInput | OrganizationFeatureAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationFeatureAccesses.
     */
    cursor?: OrganizationFeatureAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationFeatureAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationFeatureAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationFeatureAccesses.
     */
    distinct?: OrganizationFeatureAccessScalarFieldEnum | OrganizationFeatureAccessScalarFieldEnum[]
  }

  /**
   * OrganizationFeatureAccess findFirstOrThrow
   */
  export type OrganizationFeatureAccessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFeatureAccess
     */
    select?: OrganizationFeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFeatureAccess
     */
    omit?: OrganizationFeatureAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFeatureAccessInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationFeatureAccess to fetch.
     */
    where?: OrganizationFeatureAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationFeatureAccesses to fetch.
     */
    orderBy?: OrganizationFeatureAccessOrderByWithRelationInput | OrganizationFeatureAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationFeatureAccesses.
     */
    cursor?: OrganizationFeatureAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationFeatureAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationFeatureAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationFeatureAccesses.
     */
    distinct?: OrganizationFeatureAccessScalarFieldEnum | OrganizationFeatureAccessScalarFieldEnum[]
  }

  /**
   * OrganizationFeatureAccess findMany
   */
  export type OrganizationFeatureAccessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFeatureAccess
     */
    select?: OrganizationFeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFeatureAccess
     */
    omit?: OrganizationFeatureAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFeatureAccessInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationFeatureAccesses to fetch.
     */
    where?: OrganizationFeatureAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationFeatureAccesses to fetch.
     */
    orderBy?: OrganizationFeatureAccessOrderByWithRelationInput | OrganizationFeatureAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrganizationFeatureAccesses.
     */
    cursor?: OrganizationFeatureAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationFeatureAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationFeatureAccesses.
     */
    skip?: number
    distinct?: OrganizationFeatureAccessScalarFieldEnum | OrganizationFeatureAccessScalarFieldEnum[]
  }

  /**
   * OrganizationFeatureAccess create
   */
  export type OrganizationFeatureAccessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFeatureAccess
     */
    select?: OrganizationFeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFeatureAccess
     */
    omit?: OrganizationFeatureAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFeatureAccessInclude<ExtArgs> | null
    /**
     * The data needed to create a OrganizationFeatureAccess.
     */
    data: XOR<OrganizationFeatureAccessCreateInput, OrganizationFeatureAccessUncheckedCreateInput>
  }

  /**
   * OrganizationFeatureAccess createMany
   */
  export type OrganizationFeatureAccessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrganizationFeatureAccesses.
     */
    data: OrganizationFeatureAccessCreateManyInput | OrganizationFeatureAccessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizationFeatureAccess createManyAndReturn
   */
  export type OrganizationFeatureAccessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFeatureAccess
     */
    select?: OrganizationFeatureAccessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFeatureAccess
     */
    omit?: OrganizationFeatureAccessOmit<ExtArgs> | null
    /**
     * The data used to create many OrganizationFeatureAccesses.
     */
    data: OrganizationFeatureAccessCreateManyInput | OrganizationFeatureAccessCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFeatureAccessIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationFeatureAccess update
   */
  export type OrganizationFeatureAccessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFeatureAccess
     */
    select?: OrganizationFeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFeatureAccess
     */
    omit?: OrganizationFeatureAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFeatureAccessInclude<ExtArgs> | null
    /**
     * The data needed to update a OrganizationFeatureAccess.
     */
    data: XOR<OrganizationFeatureAccessUpdateInput, OrganizationFeatureAccessUncheckedUpdateInput>
    /**
     * Choose, which OrganizationFeatureAccess to update.
     */
    where: OrganizationFeatureAccessWhereUniqueInput
  }

  /**
   * OrganizationFeatureAccess updateMany
   */
  export type OrganizationFeatureAccessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrganizationFeatureAccesses.
     */
    data: XOR<OrganizationFeatureAccessUpdateManyMutationInput, OrganizationFeatureAccessUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationFeatureAccesses to update
     */
    where?: OrganizationFeatureAccessWhereInput
    /**
     * Limit how many OrganizationFeatureAccesses to update.
     */
    limit?: number
  }

  /**
   * OrganizationFeatureAccess updateManyAndReturn
   */
  export type OrganizationFeatureAccessUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFeatureAccess
     */
    select?: OrganizationFeatureAccessSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFeatureAccess
     */
    omit?: OrganizationFeatureAccessOmit<ExtArgs> | null
    /**
     * The data used to update OrganizationFeatureAccesses.
     */
    data: XOR<OrganizationFeatureAccessUpdateManyMutationInput, OrganizationFeatureAccessUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationFeatureAccesses to update
     */
    where?: OrganizationFeatureAccessWhereInput
    /**
     * Limit how many OrganizationFeatureAccesses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFeatureAccessIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationFeatureAccess upsert
   */
  export type OrganizationFeatureAccessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFeatureAccess
     */
    select?: OrganizationFeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFeatureAccess
     */
    omit?: OrganizationFeatureAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFeatureAccessInclude<ExtArgs> | null
    /**
     * The filter to search for the OrganizationFeatureAccess to update in case it exists.
     */
    where: OrganizationFeatureAccessWhereUniqueInput
    /**
     * In case the OrganizationFeatureAccess found by the `where` argument doesn't exist, create a new OrganizationFeatureAccess with this data.
     */
    create: XOR<OrganizationFeatureAccessCreateInput, OrganizationFeatureAccessUncheckedCreateInput>
    /**
     * In case the OrganizationFeatureAccess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationFeatureAccessUpdateInput, OrganizationFeatureAccessUncheckedUpdateInput>
  }

  /**
   * OrganizationFeatureAccess delete
   */
  export type OrganizationFeatureAccessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFeatureAccess
     */
    select?: OrganizationFeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFeatureAccess
     */
    omit?: OrganizationFeatureAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFeatureAccessInclude<ExtArgs> | null
    /**
     * Filter which OrganizationFeatureAccess to delete.
     */
    where: OrganizationFeatureAccessWhereUniqueInput
  }

  /**
   * OrganizationFeatureAccess deleteMany
   */
  export type OrganizationFeatureAccessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationFeatureAccesses to delete
     */
    where?: OrganizationFeatureAccessWhereInput
    /**
     * Limit how many OrganizationFeatureAccesses to delete.
     */
    limit?: number
  }

  /**
   * OrganizationFeatureAccess without action
   */
  export type OrganizationFeatureAccessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFeatureAccess
     */
    select?: OrganizationFeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFeatureAccess
     */
    omit?: OrganizationFeatureAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFeatureAccessInclude<ExtArgs> | null
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


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    expires: 'expires',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const PasswordResetTokenScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    expires: 'expires',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum]


  export const TwoFactorTokenScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    expires: 'expires',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TwoFactorTokenScalarFieldEnum = (typeof TwoFactorTokenScalarFieldEnum)[keyof typeof TwoFactorTokenScalarFieldEnum]


  export const TwoFactorConfirmationScalarFieldEnum: {
    id: 'id',
    userId: 'userId'
  };

  export type TwoFactorConfirmationScalarFieldEnum = (typeof TwoFactorConfirmationScalarFieldEnum)[keyof typeof TwoFactorConfirmationScalarFieldEnum]


  export const VersionInfoScalarFieldEnum: {
    id: 'id',
    version: 'version',
    status: 'status',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type VersionInfoScalarFieldEnum = (typeof VersionInfoScalarFieldEnum)[keyof typeof VersionInfoScalarFieldEnum]


  export const FeedbackScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    message: 'message',
    anonymous: 'anonymous',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type FeedbackScalarFieldEnum = (typeof FeedbackScalarFieldEnum)[keyof typeof FeedbackScalarFieldEnum]


  export const UpdateLogScalarFieldEnum: {
    id: 'id',
    name: 'name',
    message: 'message',
    updatedBy: 'updatedBy',
    orgId: 'orgId',
    type: 'type',
    date: 'date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UpdateLogScalarFieldEnum = (typeof UpdateLogScalarFieldEnum)[keyof typeof UpdateLogScalarFieldEnum]


  export const TelegramSettingScalarFieldEnum: {
    id: 'id',
    botToken: 'botToken',
    chatId: 'chatId',
    scope: 'scope',
    userId: 'userId',
    orgId: 'orgId',
    role: 'role',
    isEnabled: 'isEnabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TelegramSettingScalarFieldEnum = (typeof TelegramSettingScalarFieldEnum)[keyof typeof TelegramSettingScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    password: 'password',
    role: 'role',
    isTwoFactorEnabled: 'isTwoFactorEnabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    defaultOrgId: 'defaultOrgId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    number: 'number',
    name: 'name',
    description: 'description',
    startedAt: 'startedAt',
    logoImage: 'logoImage',
    Address: 'Address',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const UserOrganizationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    role: 'role',
    organizationId: 'organizationId'
  };

  export type UserOrganizationScalarFieldEnum = (typeof UserOrganizationScalarFieldEnum)[keyof typeof UserOrganizationScalarFieldEnum]


  export const OrganizationInviteScalarFieldEnum: {
    id: 'id',
    invitedBy: 'invitedBy',
    email: 'email',
    organizationId: 'organizationId',
    role: 'role',
    token: 'token',
    accepted: 'accepted',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type OrganizationInviteScalarFieldEnum = (typeof OrganizationInviteScalarFieldEnum)[keyof typeof OrganizationInviteScalarFieldEnum]


  export const FeatureScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    isEnabled: 'isEnabled',
    createdAt: 'createdAt'
  };

  export type FeatureScalarFieldEnum = (typeof FeatureScalarFieldEnum)[keyof typeof FeatureScalarFieldEnum]


  export const OrganizationFeatureAccessScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    featureId: 'featureId',
    isEnabled: 'isEnabled'
  };

  export type OrganizationFeatureAccessScalarFieldEnum = (typeof OrganizationFeatureAccessScalarFieldEnum)[keyof typeof OrganizationFeatureAccessScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'LogType'
   */
  export type EnumLogTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogType'>
    


  /**
   * Reference to a field of type 'LogType[]'
   */
  export type ListEnumLogTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogType[]'>
    


  /**
   * Reference to a field of type 'Scope'
   */
  export type EnumScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Scope'>
    


  /**
   * Reference to a field of type 'Scope[]'
   */
  export type ListEnumScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Scope[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'OrganizationUserRole'
   */
  export type EnumOrganizationUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrganizationUserRole'>
    


  /**
   * Reference to a field of type 'OrganizationUserRole[]'
   */
  export type ListEnumOrganizationUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrganizationUserRole[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    id?: StringFilter<"VerificationToken"> | string
    email?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
    createdAt?: DateTimeFilter<"VerificationToken"> | Date | string
    updatedAt?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    email_token?: VerificationTokenEmailTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    email?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
    createdAt?: DateTimeFilter<"VerificationToken"> | Date | string
    updatedAt?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "id" | "token" | "email_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VerificationToken"> | string
    email?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type PasswordResetTokenWhereInput = {
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    email?: StringFilter<"PasswordResetToken"> | string
    token?: StringFilter<"PasswordResetToken"> | string
    expires?: DateTimeFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    updatedAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }

  export type PasswordResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PasswordResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    email_token?: PasswordResetTokenEmailTokenCompoundUniqueInput
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    email?: StringFilter<"PasswordResetToken"> | string
    expires?: DateTimeFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    updatedAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }, "id" | "token" | "email_token">

  export type PasswordResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PasswordResetTokenCountOrderByAggregateInput
    _max?: PasswordResetTokenMaxOrderByAggregateInput
    _min?: PasswordResetTokenMinOrderByAggregateInput
  }

  export type PasswordResetTokenScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokenScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    email?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    token?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    expires?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
  }

  export type TwoFactorTokenWhereInput = {
    AND?: TwoFactorTokenWhereInput | TwoFactorTokenWhereInput[]
    OR?: TwoFactorTokenWhereInput[]
    NOT?: TwoFactorTokenWhereInput | TwoFactorTokenWhereInput[]
    id?: StringFilter<"TwoFactorToken"> | string
    email?: StringFilter<"TwoFactorToken"> | string
    token?: StringFilter<"TwoFactorToken"> | string
    expires?: DateTimeFilter<"TwoFactorToken"> | Date | string
    createdAt?: DateTimeFilter<"TwoFactorToken"> | Date | string
    updatedAt?: DateTimeFilter<"TwoFactorToken"> | Date | string
  }

  export type TwoFactorTokenOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TwoFactorTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    email_token?: TwoFactorTokenEmailTokenCompoundUniqueInput
    AND?: TwoFactorTokenWhereInput | TwoFactorTokenWhereInput[]
    OR?: TwoFactorTokenWhereInput[]
    NOT?: TwoFactorTokenWhereInput | TwoFactorTokenWhereInput[]
    email?: StringFilter<"TwoFactorToken"> | string
    expires?: DateTimeFilter<"TwoFactorToken"> | Date | string
    createdAt?: DateTimeFilter<"TwoFactorToken"> | Date | string
    updatedAt?: DateTimeFilter<"TwoFactorToken"> | Date | string
  }, "id" | "token" | "email_token">

  export type TwoFactorTokenOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TwoFactorTokenCountOrderByAggregateInput
    _max?: TwoFactorTokenMaxOrderByAggregateInput
    _min?: TwoFactorTokenMinOrderByAggregateInput
  }

  export type TwoFactorTokenScalarWhereWithAggregatesInput = {
    AND?: TwoFactorTokenScalarWhereWithAggregatesInput | TwoFactorTokenScalarWhereWithAggregatesInput[]
    OR?: TwoFactorTokenScalarWhereWithAggregatesInput[]
    NOT?: TwoFactorTokenScalarWhereWithAggregatesInput | TwoFactorTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TwoFactorToken"> | string
    email?: StringWithAggregatesFilter<"TwoFactorToken"> | string
    token?: StringWithAggregatesFilter<"TwoFactorToken"> | string
    expires?: DateTimeWithAggregatesFilter<"TwoFactorToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TwoFactorToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TwoFactorToken"> | Date | string
  }

  export type TwoFactorConfirmationWhereInput = {
    AND?: TwoFactorConfirmationWhereInput | TwoFactorConfirmationWhereInput[]
    OR?: TwoFactorConfirmationWhereInput[]
    NOT?: TwoFactorConfirmationWhereInput | TwoFactorConfirmationWhereInput[]
    id?: StringFilter<"TwoFactorConfirmation"> | string
    userId?: StringFilter<"TwoFactorConfirmation"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TwoFactorConfirmationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TwoFactorConfirmationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: TwoFactorConfirmationWhereInput | TwoFactorConfirmationWhereInput[]
    OR?: TwoFactorConfirmationWhereInput[]
    NOT?: TwoFactorConfirmationWhereInput | TwoFactorConfirmationWhereInput[]
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type TwoFactorConfirmationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    _count?: TwoFactorConfirmationCountOrderByAggregateInput
    _max?: TwoFactorConfirmationMaxOrderByAggregateInput
    _min?: TwoFactorConfirmationMinOrderByAggregateInput
  }

  export type TwoFactorConfirmationScalarWhereWithAggregatesInput = {
    AND?: TwoFactorConfirmationScalarWhereWithAggregatesInput | TwoFactorConfirmationScalarWhereWithAggregatesInput[]
    OR?: TwoFactorConfirmationScalarWhereWithAggregatesInput[]
    NOT?: TwoFactorConfirmationScalarWhereWithAggregatesInput | TwoFactorConfirmationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TwoFactorConfirmation"> | string
    userId?: StringWithAggregatesFilter<"TwoFactorConfirmation"> | string
  }

  export type VersionInfoWhereInput = {
    AND?: VersionInfoWhereInput | VersionInfoWhereInput[]
    OR?: VersionInfoWhereInput[]
    NOT?: VersionInfoWhereInput | VersionInfoWhereInput[]
    id?: StringFilter<"VersionInfo"> | string
    version?: StringFilter<"VersionInfo"> | string
    status?: StringFilter<"VersionInfo"> | string
    description?: StringNullableFilter<"VersionInfo"> | string | null
    createdAt?: DateTimeFilter<"VersionInfo"> | Date | string
    updatedAt?: DateTimeFilter<"VersionInfo"> | Date | string
    deletedAt?: DateTimeNullableFilter<"VersionInfo"> | Date | string | null
  }

  export type VersionInfoOrderByWithRelationInput = {
    id?: SortOrder
    version?: SortOrder
    status?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
  }

  export type VersionInfoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    version?: string
    AND?: VersionInfoWhereInput | VersionInfoWhereInput[]
    OR?: VersionInfoWhereInput[]
    NOT?: VersionInfoWhereInput | VersionInfoWhereInput[]
    status?: StringFilter<"VersionInfo"> | string
    description?: StringNullableFilter<"VersionInfo"> | string | null
    createdAt?: DateTimeFilter<"VersionInfo"> | Date | string
    updatedAt?: DateTimeFilter<"VersionInfo"> | Date | string
    deletedAt?: DateTimeNullableFilter<"VersionInfo"> | Date | string | null
  }, "id" | "version">

  export type VersionInfoOrderByWithAggregationInput = {
    id?: SortOrder
    version?: SortOrder
    status?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: VersionInfoCountOrderByAggregateInput
    _max?: VersionInfoMaxOrderByAggregateInput
    _min?: VersionInfoMinOrderByAggregateInput
  }

  export type VersionInfoScalarWhereWithAggregatesInput = {
    AND?: VersionInfoScalarWhereWithAggregatesInput | VersionInfoScalarWhereWithAggregatesInput[]
    OR?: VersionInfoScalarWhereWithAggregatesInput[]
    NOT?: VersionInfoScalarWhereWithAggregatesInput | VersionInfoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VersionInfo"> | string
    version?: StringWithAggregatesFilter<"VersionInfo"> | string
    status?: StringWithAggregatesFilter<"VersionInfo"> | string
    description?: StringNullableWithAggregatesFilter<"VersionInfo"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"VersionInfo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VersionInfo"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"VersionInfo"> | Date | string | null
  }

  export type FeedbackWhereInput = {
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    id?: StringFilter<"Feedback"> | string
    name?: StringNullableFilter<"Feedback"> | string | null
    email?: StringNullableFilter<"Feedback"> | string | null
    phone?: StringNullableFilter<"Feedback"> | string | null
    message?: StringFilter<"Feedback"> | string
    anonymous?: BoolFilter<"Feedback"> | boolean
    status?: StringFilter<"Feedback"> | string
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    updatedAt?: DateTimeFilter<"Feedback"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Feedback"> | Date | string | null
  }

  export type FeedbackOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    message?: SortOrder
    anonymous?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
  }

  export type FeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    name?: StringNullableFilter<"Feedback"> | string | null
    email?: StringNullableFilter<"Feedback"> | string | null
    phone?: StringNullableFilter<"Feedback"> | string | null
    message?: StringFilter<"Feedback"> | string
    anonymous?: BoolFilter<"Feedback"> | boolean
    status?: StringFilter<"Feedback"> | string
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    updatedAt?: DateTimeFilter<"Feedback"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Feedback"> | Date | string | null
  }, "id">

  export type FeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    message?: SortOrder
    anonymous?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: FeedbackCountOrderByAggregateInput
    _max?: FeedbackMaxOrderByAggregateInput
    _min?: FeedbackMinOrderByAggregateInput
  }

  export type FeedbackScalarWhereWithAggregatesInput = {
    AND?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    OR?: FeedbackScalarWhereWithAggregatesInput[]
    NOT?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Feedback"> | string
    name?: StringNullableWithAggregatesFilter<"Feedback"> | string | null
    email?: StringNullableWithAggregatesFilter<"Feedback"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Feedback"> | string | null
    message?: StringWithAggregatesFilter<"Feedback"> | string
    anonymous?: BoolWithAggregatesFilter<"Feedback"> | boolean
    status?: StringWithAggregatesFilter<"Feedback"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Feedback"> | Date | string | null
  }

  export type UpdateLogWhereInput = {
    AND?: UpdateLogWhereInput | UpdateLogWhereInput[]
    OR?: UpdateLogWhereInput[]
    NOT?: UpdateLogWhereInput | UpdateLogWhereInput[]
    id?: StringFilter<"UpdateLog"> | string
    name?: StringFilter<"UpdateLog"> | string
    message?: StringFilter<"UpdateLog"> | string
    updatedBy?: StringFilter<"UpdateLog"> | string
    orgId?: StringNullableFilter<"UpdateLog"> | string | null
    type?: EnumLogTypeFilter<"UpdateLog"> | $Enums.LogType
    date?: DateTimeFilter<"UpdateLog"> | Date | string
    createdAt?: DateTimeFilter<"UpdateLog"> | Date | string
    updatedAt?: DateTimeFilter<"UpdateLog"> | Date | string
  }

  export type UpdateLogOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    message?: SortOrder
    updatedBy?: SortOrder
    orgId?: SortOrderInput | SortOrder
    type?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UpdateLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UpdateLogWhereInput | UpdateLogWhereInput[]
    OR?: UpdateLogWhereInput[]
    NOT?: UpdateLogWhereInput | UpdateLogWhereInput[]
    name?: StringFilter<"UpdateLog"> | string
    message?: StringFilter<"UpdateLog"> | string
    updatedBy?: StringFilter<"UpdateLog"> | string
    orgId?: StringNullableFilter<"UpdateLog"> | string | null
    type?: EnumLogTypeFilter<"UpdateLog"> | $Enums.LogType
    date?: DateTimeFilter<"UpdateLog"> | Date | string
    createdAt?: DateTimeFilter<"UpdateLog"> | Date | string
    updatedAt?: DateTimeFilter<"UpdateLog"> | Date | string
  }, "id">

  export type UpdateLogOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    message?: SortOrder
    updatedBy?: SortOrder
    orgId?: SortOrderInput | SortOrder
    type?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UpdateLogCountOrderByAggregateInput
    _max?: UpdateLogMaxOrderByAggregateInput
    _min?: UpdateLogMinOrderByAggregateInput
  }

  export type UpdateLogScalarWhereWithAggregatesInput = {
    AND?: UpdateLogScalarWhereWithAggregatesInput | UpdateLogScalarWhereWithAggregatesInput[]
    OR?: UpdateLogScalarWhereWithAggregatesInput[]
    NOT?: UpdateLogScalarWhereWithAggregatesInput | UpdateLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UpdateLog"> | string
    name?: StringWithAggregatesFilter<"UpdateLog"> | string
    message?: StringWithAggregatesFilter<"UpdateLog"> | string
    updatedBy?: StringWithAggregatesFilter<"UpdateLog"> | string
    orgId?: StringNullableWithAggregatesFilter<"UpdateLog"> | string | null
    type?: EnumLogTypeWithAggregatesFilter<"UpdateLog"> | $Enums.LogType
    date?: DateTimeWithAggregatesFilter<"UpdateLog"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"UpdateLog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UpdateLog"> | Date | string
  }

  export type TelegramSettingWhereInput = {
    AND?: TelegramSettingWhereInput | TelegramSettingWhereInput[]
    OR?: TelegramSettingWhereInput[]
    NOT?: TelegramSettingWhereInput | TelegramSettingWhereInput[]
    id?: StringFilter<"TelegramSetting"> | string
    botToken?: StringFilter<"TelegramSetting"> | string
    chatId?: StringFilter<"TelegramSetting"> | string
    scope?: EnumScopeFilter<"TelegramSetting"> | $Enums.Scope
    userId?: StringNullableFilter<"TelegramSetting"> | string | null
    orgId?: StringNullableFilter<"TelegramSetting"> | string | null
    role?: EnumUserRoleFilter<"TelegramSetting"> | $Enums.UserRole
    isEnabled?: BoolFilter<"TelegramSetting"> | boolean
    createdAt?: DateTimeFilter<"TelegramSetting"> | Date | string
    updatedAt?: DateTimeFilter<"TelegramSetting"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    org?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
  }

  export type TelegramSettingOrderByWithRelationInput = {
    id?: SortOrder
    botToken?: SortOrder
    chatId?: SortOrder
    scope?: SortOrder
    userId?: SortOrderInput | SortOrder
    orgId?: SortOrderInput | SortOrder
    role?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    org?: OrganizationOrderByWithRelationInput
  }

  export type TelegramSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_scope?: TelegramSettingUserIdScopeCompoundUniqueInput
    orgId_scope?: TelegramSettingOrgIdScopeCompoundUniqueInput
    userId_role?: TelegramSettingUserIdRoleCompoundUniqueInput
    orgId_role_userId_scope?: TelegramSettingOrgIdRoleUserIdScopeCompoundUniqueInput
    AND?: TelegramSettingWhereInput | TelegramSettingWhereInput[]
    OR?: TelegramSettingWhereInput[]
    NOT?: TelegramSettingWhereInput | TelegramSettingWhereInput[]
    botToken?: StringFilter<"TelegramSetting"> | string
    chatId?: StringFilter<"TelegramSetting"> | string
    scope?: EnumScopeFilter<"TelegramSetting"> | $Enums.Scope
    userId?: StringNullableFilter<"TelegramSetting"> | string | null
    orgId?: StringNullableFilter<"TelegramSetting"> | string | null
    role?: EnumUserRoleFilter<"TelegramSetting"> | $Enums.UserRole
    isEnabled?: BoolFilter<"TelegramSetting"> | boolean
    createdAt?: DateTimeFilter<"TelegramSetting"> | Date | string
    updatedAt?: DateTimeFilter<"TelegramSetting"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    org?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
  }, "id" | "userId_scope" | "orgId_scope" | "userId_role" | "orgId_role_userId_scope">

  export type TelegramSettingOrderByWithAggregationInput = {
    id?: SortOrder
    botToken?: SortOrder
    chatId?: SortOrder
    scope?: SortOrder
    userId?: SortOrderInput | SortOrder
    orgId?: SortOrderInput | SortOrder
    role?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TelegramSettingCountOrderByAggregateInput
    _max?: TelegramSettingMaxOrderByAggregateInput
    _min?: TelegramSettingMinOrderByAggregateInput
  }

  export type TelegramSettingScalarWhereWithAggregatesInput = {
    AND?: TelegramSettingScalarWhereWithAggregatesInput | TelegramSettingScalarWhereWithAggregatesInput[]
    OR?: TelegramSettingScalarWhereWithAggregatesInput[]
    NOT?: TelegramSettingScalarWhereWithAggregatesInput | TelegramSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TelegramSetting"> | string
    botToken?: StringWithAggregatesFilter<"TelegramSetting"> | string
    chatId?: StringWithAggregatesFilter<"TelegramSetting"> | string
    scope?: EnumScopeWithAggregatesFilter<"TelegramSetting"> | $Enums.Scope
    userId?: StringNullableWithAggregatesFilter<"TelegramSetting"> | string | null
    orgId?: StringNullableWithAggregatesFilter<"TelegramSetting"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"TelegramSetting"> | $Enums.UserRole
    isEnabled?: BoolWithAggregatesFilter<"TelegramSetting"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TelegramSetting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TelegramSetting"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isTwoFactorEnabled?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    defaultOrgId?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    twoFactorConfirmation?: XOR<TwoFactorConfirmationNullableScalarRelationFilter, TwoFactorConfirmationWhereInput> | null
    UserOrganization?: UserOrganizationListRelationFilter
    organizationCreated?: OrganizationListRelationFilter
    telegramBot?: TelegramSettingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    role?: SortOrder
    isTwoFactorEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    defaultOrgId?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    twoFactorConfirmation?: TwoFactorConfirmationOrderByWithRelationInput
    UserOrganization?: UserOrganizationOrderByRelationAggregateInput
    organizationCreated?: OrganizationOrderByRelationAggregateInput
    telegramBot?: TelegramSettingOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isTwoFactorEnabled?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    defaultOrgId?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    twoFactorConfirmation?: XOR<TwoFactorConfirmationNullableScalarRelationFilter, TwoFactorConfirmationWhereInput> | null
    UserOrganization?: UserOrganizationListRelationFilter
    organizationCreated?: OrganizationListRelationFilter
    telegramBot?: TelegramSettingListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    role?: SortOrder
    isTwoFactorEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    defaultOrgId?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    isTwoFactorEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    defaultOrgId?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    number?: IntNullableFilter<"Organization"> | number | null
    name?: StringFilter<"Organization"> | string
    description?: StringNullableFilter<"Organization"> | string | null
    startedAt?: DateTimeNullableFilter<"Organization"> | Date | string | null
    logoImage?: StringNullableFilter<"Organization"> | string | null
    Address?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    createdById?: StringFilter<"Organization"> | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    UserOrganization?: UserOrganizationListRelationFilter
    featureAccess?: OrganizationFeatureAccessListRelationFilter
    telegramBot?: TelegramSettingListRelationFilter
    OrganizationInvite?: OrganizationInviteListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    number?: SortOrderInput | SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    logoImage?: SortOrderInput | SortOrder
    Address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    UserOrganization?: UserOrganizationOrderByRelationAggregateInput
    featureAccess?: OrganizationFeatureAccessOrderByRelationAggregateInput
    telegramBot?: TelegramSettingOrderByRelationAggregateInput
    OrganizationInvite?: OrganizationInviteOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    number?: IntNullableFilter<"Organization"> | number | null
    description?: StringNullableFilter<"Organization"> | string | null
    startedAt?: DateTimeNullableFilter<"Organization"> | Date | string | null
    logoImage?: StringNullableFilter<"Organization"> | string | null
    Address?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    createdById?: StringFilter<"Organization"> | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    UserOrganization?: UserOrganizationListRelationFilter
    featureAccess?: OrganizationFeatureAccessListRelationFilter
    telegramBot?: TelegramSettingListRelationFilter
    OrganizationInvite?: OrganizationInviteListRelationFilter
  }, "id" | "name">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    number?: SortOrderInput | SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    logoImage?: SortOrderInput | SortOrder
    Address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _avg?: OrganizationAvgOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
    _sum?: OrganizationSumOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    number?: IntNullableWithAggregatesFilter<"Organization"> | number | null
    name?: StringWithAggregatesFilter<"Organization"> | string
    description?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    startedAt?: DateTimeNullableWithAggregatesFilter<"Organization"> | Date | string | null
    logoImage?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    Address?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    createdById?: StringWithAggregatesFilter<"Organization"> | string
  }

  export type UserOrganizationWhereInput = {
    AND?: UserOrganizationWhereInput | UserOrganizationWhereInput[]
    OR?: UserOrganizationWhereInput[]
    NOT?: UserOrganizationWhereInput | UserOrganizationWhereInput[]
    id?: StringFilter<"UserOrganization"> | string
    userId?: StringFilter<"UserOrganization"> | string
    role?: EnumOrganizationUserRoleNullableFilter<"UserOrganization"> | $Enums.OrganizationUserRole | null
    organizationId?: StringFilter<"UserOrganization"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }

  export type UserOrganizationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrderInput | SortOrder
    organizationId?: SortOrder
    user?: UserOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
  }

  export type UserOrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_organizationId?: UserOrganizationUserIdOrganizationIdCompoundUniqueInput
    AND?: UserOrganizationWhereInput | UserOrganizationWhereInput[]
    OR?: UserOrganizationWhereInput[]
    NOT?: UserOrganizationWhereInput | UserOrganizationWhereInput[]
    userId?: StringFilter<"UserOrganization"> | string
    role?: EnumOrganizationUserRoleNullableFilter<"UserOrganization"> | $Enums.OrganizationUserRole | null
    organizationId?: StringFilter<"UserOrganization"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }, "id" | "userId_organizationId">

  export type UserOrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrderInput | SortOrder
    organizationId?: SortOrder
    _count?: UserOrganizationCountOrderByAggregateInput
    _max?: UserOrganizationMaxOrderByAggregateInput
    _min?: UserOrganizationMinOrderByAggregateInput
  }

  export type UserOrganizationScalarWhereWithAggregatesInput = {
    AND?: UserOrganizationScalarWhereWithAggregatesInput | UserOrganizationScalarWhereWithAggregatesInput[]
    OR?: UserOrganizationScalarWhereWithAggregatesInput[]
    NOT?: UserOrganizationScalarWhereWithAggregatesInput | UserOrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserOrganization"> | string
    userId?: StringWithAggregatesFilter<"UserOrganization"> | string
    role?: EnumOrganizationUserRoleNullableWithAggregatesFilter<"UserOrganization"> | $Enums.OrganizationUserRole | null
    organizationId?: StringWithAggregatesFilter<"UserOrganization"> | string
  }

  export type OrganizationInviteWhereInput = {
    AND?: OrganizationInviteWhereInput | OrganizationInviteWhereInput[]
    OR?: OrganizationInviteWhereInput[]
    NOT?: OrganizationInviteWhereInput | OrganizationInviteWhereInput[]
    id?: StringFilter<"OrganizationInvite"> | string
    invitedBy?: StringFilter<"OrganizationInvite"> | string
    email?: StringFilter<"OrganizationInvite"> | string
    organizationId?: StringFilter<"OrganizationInvite"> | string
    role?: EnumOrganizationUserRoleNullableFilter<"OrganizationInvite"> | $Enums.OrganizationUserRole | null
    token?: StringFilter<"OrganizationInvite"> | string
    accepted?: BoolFilter<"OrganizationInvite"> | boolean
    expiresAt?: DateTimeFilter<"OrganizationInvite"> | Date | string
    createdAt?: DateTimeFilter<"OrganizationInvite"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }

  export type OrganizationInviteOrderByWithRelationInput = {
    id?: SortOrder
    invitedBy?: SortOrder
    email?: SortOrder
    organizationId?: SortOrder
    role?: SortOrderInput | SortOrder
    token?: SortOrder
    accepted?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
  }

  export type OrganizationInviteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    email_organizationId?: OrganizationInviteEmailOrganizationIdCompoundUniqueInput
    AND?: OrganizationInviteWhereInput | OrganizationInviteWhereInput[]
    OR?: OrganizationInviteWhereInput[]
    NOT?: OrganizationInviteWhereInput | OrganizationInviteWhereInput[]
    invitedBy?: StringFilter<"OrganizationInvite"> | string
    email?: StringFilter<"OrganizationInvite"> | string
    organizationId?: StringFilter<"OrganizationInvite"> | string
    role?: EnumOrganizationUserRoleNullableFilter<"OrganizationInvite"> | $Enums.OrganizationUserRole | null
    accepted?: BoolFilter<"OrganizationInvite"> | boolean
    expiresAt?: DateTimeFilter<"OrganizationInvite"> | Date | string
    createdAt?: DateTimeFilter<"OrganizationInvite"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }, "id" | "token" | "email_organizationId">

  export type OrganizationInviteOrderByWithAggregationInput = {
    id?: SortOrder
    invitedBy?: SortOrder
    email?: SortOrder
    organizationId?: SortOrder
    role?: SortOrderInput | SortOrder
    token?: SortOrder
    accepted?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: OrganizationInviteCountOrderByAggregateInput
    _max?: OrganizationInviteMaxOrderByAggregateInput
    _min?: OrganizationInviteMinOrderByAggregateInput
  }

  export type OrganizationInviteScalarWhereWithAggregatesInput = {
    AND?: OrganizationInviteScalarWhereWithAggregatesInput | OrganizationInviteScalarWhereWithAggregatesInput[]
    OR?: OrganizationInviteScalarWhereWithAggregatesInput[]
    NOT?: OrganizationInviteScalarWhereWithAggregatesInput | OrganizationInviteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrganizationInvite"> | string
    invitedBy?: StringWithAggregatesFilter<"OrganizationInvite"> | string
    email?: StringWithAggregatesFilter<"OrganizationInvite"> | string
    organizationId?: StringWithAggregatesFilter<"OrganizationInvite"> | string
    role?: EnumOrganizationUserRoleNullableWithAggregatesFilter<"OrganizationInvite"> | $Enums.OrganizationUserRole | null
    token?: StringWithAggregatesFilter<"OrganizationInvite"> | string
    accepted?: BoolWithAggregatesFilter<"OrganizationInvite"> | boolean
    expiresAt?: DateTimeWithAggregatesFilter<"OrganizationInvite"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"OrganizationInvite"> | Date | string
  }

  export type FeatureWhereInput = {
    AND?: FeatureWhereInput | FeatureWhereInput[]
    OR?: FeatureWhereInput[]
    NOT?: FeatureWhereInput | FeatureWhereInput[]
    id?: StringFilter<"Feature"> | string
    name?: StringFilter<"Feature"> | string
    slug?: StringFilter<"Feature"> | string
    isEnabled?: BoolFilter<"Feature"> | boolean
    createdAt?: DateTimeFilter<"Feature"> | Date | string
    orgAccesses?: OrganizationFeatureAccessListRelationFilter
  }

  export type FeatureOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
    orgAccesses?: OrganizationFeatureAccessOrderByRelationAggregateInput
  }

  export type FeatureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: FeatureWhereInput | FeatureWhereInput[]
    OR?: FeatureWhereInput[]
    NOT?: FeatureWhereInput | FeatureWhereInput[]
    isEnabled?: BoolFilter<"Feature"> | boolean
    createdAt?: DateTimeFilter<"Feature"> | Date | string
    orgAccesses?: OrganizationFeatureAccessListRelationFilter
  }, "id" | "name" | "slug">

  export type FeatureOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
    _count?: FeatureCountOrderByAggregateInput
    _max?: FeatureMaxOrderByAggregateInput
    _min?: FeatureMinOrderByAggregateInput
  }

  export type FeatureScalarWhereWithAggregatesInput = {
    AND?: FeatureScalarWhereWithAggregatesInput | FeatureScalarWhereWithAggregatesInput[]
    OR?: FeatureScalarWhereWithAggregatesInput[]
    NOT?: FeatureScalarWhereWithAggregatesInput | FeatureScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Feature"> | string
    name?: StringWithAggregatesFilter<"Feature"> | string
    slug?: StringWithAggregatesFilter<"Feature"> | string
    isEnabled?: BoolWithAggregatesFilter<"Feature"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Feature"> | Date | string
  }

  export type OrganizationFeatureAccessWhereInput = {
    AND?: OrganizationFeatureAccessWhereInput | OrganizationFeatureAccessWhereInput[]
    OR?: OrganizationFeatureAccessWhereInput[]
    NOT?: OrganizationFeatureAccessWhereInput | OrganizationFeatureAccessWhereInput[]
    id?: StringFilter<"OrganizationFeatureAccess"> | string
    organizationId?: StringFilter<"OrganizationFeatureAccess"> | string
    featureId?: StringFilter<"OrganizationFeatureAccess"> | string
    isEnabled?: BoolFilter<"OrganizationFeatureAccess"> | boolean
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    feature?: XOR<FeatureScalarRelationFilter, FeatureWhereInput>
  }

  export type OrganizationFeatureAccessOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    featureId?: SortOrder
    isEnabled?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    feature?: FeatureOrderByWithRelationInput
  }

  export type OrganizationFeatureAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    organizationId_featureId?: OrganizationFeatureAccessOrganizationIdFeatureIdCompoundUniqueInput
    AND?: OrganizationFeatureAccessWhereInput | OrganizationFeatureAccessWhereInput[]
    OR?: OrganizationFeatureAccessWhereInput[]
    NOT?: OrganizationFeatureAccessWhereInput | OrganizationFeatureAccessWhereInput[]
    organizationId?: StringFilter<"OrganizationFeatureAccess"> | string
    featureId?: StringFilter<"OrganizationFeatureAccess"> | string
    isEnabled?: BoolFilter<"OrganizationFeatureAccess"> | boolean
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    feature?: XOR<FeatureScalarRelationFilter, FeatureWhereInput>
  }, "id" | "organizationId_featureId">

  export type OrganizationFeatureAccessOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    featureId?: SortOrder
    isEnabled?: SortOrder
    _count?: OrganizationFeatureAccessCountOrderByAggregateInput
    _max?: OrganizationFeatureAccessMaxOrderByAggregateInput
    _min?: OrganizationFeatureAccessMinOrderByAggregateInput
  }

  export type OrganizationFeatureAccessScalarWhereWithAggregatesInput = {
    AND?: OrganizationFeatureAccessScalarWhereWithAggregatesInput | OrganizationFeatureAccessScalarWhereWithAggregatesInput[]
    OR?: OrganizationFeatureAccessScalarWhereWithAggregatesInput[]
    NOT?: OrganizationFeatureAccessScalarWhereWithAggregatesInput | OrganizationFeatureAccessScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrganizationFeatureAccess"> | string
    organizationId?: StringWithAggregatesFilter<"OrganizationFeatureAccess"> | string
    featureId?: StringWithAggregatesFilter<"OrganizationFeatureAccess"> | string
    isEnabled?: BoolWithAggregatesFilter<"OrganizationFeatureAccess"> | boolean
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PasswordResetTokenUncheckedCreateInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PasswordResetTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateManyInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PasswordResetTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TwoFactorTokenCreateInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TwoFactorTokenUncheckedCreateInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TwoFactorTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TwoFactorTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TwoFactorTokenCreateManyInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TwoFactorTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TwoFactorTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TwoFactorConfirmationCreateInput = {
    id?: string
    user: UserCreateNestedOneWithoutTwoFactorConfirmationInput
  }

  export type TwoFactorConfirmationUncheckedCreateInput = {
    id?: string
    userId: string
  }

  export type TwoFactorConfirmationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTwoFactorConfirmationNestedInput
  }

  export type TwoFactorConfirmationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TwoFactorConfirmationCreateManyInput = {
    id?: string
    userId: string
  }

  export type TwoFactorConfirmationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type TwoFactorConfirmationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type VersionInfoCreateInput = {
    id?: string
    version: string
    status: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type VersionInfoUncheckedCreateInput = {
    id?: string
    version: string
    status: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type VersionInfoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VersionInfoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VersionInfoCreateManyInput = {
    id?: string
    version: string
    status: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type VersionInfoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VersionInfoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FeedbackCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    message: string
    anonymous?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type FeedbackUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    message: string
    anonymous?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type FeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FeedbackCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    message: string
    anonymous?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type FeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UpdateLogCreateInput = {
    id?: string
    name: string
    message: string
    updatedBy: string
    orgId?: string | null
    type: $Enums.LogType
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UpdateLogUncheckedCreateInput = {
    id?: string
    name: string
    message: string
    updatedBy: string
    orgId?: string | null
    type: $Enums.LogType
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UpdateLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumLogTypeFieldUpdateOperationsInput | $Enums.LogType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UpdateLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumLogTypeFieldUpdateOperationsInput | $Enums.LogType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UpdateLogCreateManyInput = {
    id?: string
    name: string
    message: string
    updatedBy: string
    orgId?: string | null
    type: $Enums.LogType
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UpdateLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumLogTypeFieldUpdateOperationsInput | $Enums.LogType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UpdateLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumLogTypeFieldUpdateOperationsInput | $Enums.LogType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TelegramSettingCreateInput = {
    id?: string
    botToken: string
    chatId: string
    scope?: $Enums.Scope
    role?: $Enums.UserRole
    isEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutTelegramBotInput
    org?: OrganizationCreateNestedOneWithoutTelegramBotInput
  }

  export type TelegramSettingUncheckedCreateInput = {
    id?: string
    botToken: string
    chatId: string
    scope?: $Enums.Scope
    userId?: string | null
    orgId?: string | null
    role?: $Enums.UserRole
    isEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TelegramSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    scope?: EnumScopeFieldUpdateOperationsInput | $Enums.Scope
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutTelegramBotNestedInput
    org?: OrganizationUpdateOneWithoutTelegramBotNestedInput
  }

  export type TelegramSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    scope?: EnumScopeFieldUpdateOperationsInput | $Enums.Scope
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TelegramSettingCreateManyInput = {
    id?: string
    botToken: string
    chatId: string
    scope?: $Enums.Scope
    userId?: string | null
    orgId?: string | null
    role?: $Enums.UserRole
    isEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TelegramSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    scope?: EnumScopeFieldUpdateOperationsInput | $Enums.Scope
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TelegramSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    scope?: EnumScopeFieldUpdateOperationsInput | $Enums.Scope
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    isTwoFactorEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    defaultOrgId?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationCreateNestedOneWithoutUserInput
    UserOrganization?: UserOrganizationCreateNestedManyWithoutUserInput
    organizationCreated?: OrganizationCreateNestedManyWithoutCreatedByInput
    telegramBot?: TelegramSettingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    isTwoFactorEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    defaultOrgId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedCreateNestedOneWithoutUserInput
    UserOrganization?: UserOrganizationUncheckedCreateNestedManyWithoutUserInput
    organizationCreated?: OrganizationUncheckedCreateNestedManyWithoutCreatedByInput
    telegramBot?: TelegramSettingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    defaultOrgId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUpdateOneWithoutUserNestedInput
    UserOrganization?: UserOrganizationUpdateManyWithoutUserNestedInput
    organizationCreated?: OrganizationUpdateManyWithoutCreatedByNestedInput
    telegramBot?: TelegramSettingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    defaultOrgId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedUpdateOneWithoutUserNestedInput
    UserOrganization?: UserOrganizationUncheckedUpdateManyWithoutUserNestedInput
    organizationCreated?: OrganizationUncheckedUpdateManyWithoutCreatedByNestedInput
    telegramBot?: TelegramSettingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    isTwoFactorEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    defaultOrgId?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    defaultOrgId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    defaultOrgId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrganizationCreateInput = {
    id?: string
    number?: number | null
    name: string
    description?: string | null
    startedAt?: Date | string | null
    logoImage?: string | null
    Address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutOrganizationCreatedInput
    UserOrganization?: UserOrganizationCreateNestedManyWithoutOrganizationInput
    featureAccess?: OrganizationFeatureAccessCreateNestedManyWithoutOrganizationInput
    telegramBot?: TelegramSettingCreateNestedManyWithoutOrgInput
    OrganizationInvite?: OrganizationInviteCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    number?: number | null
    name: string
    description?: string | null
    startedAt?: Date | string | null
    logoImage?: string | null
    Address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    UserOrganization?: UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInput
    featureAccess?: OrganizationFeatureAccessUncheckedCreateNestedManyWithoutOrganizationInput
    telegramBot?: TelegramSettingUncheckedCreateNestedManyWithoutOrgInput
    OrganizationInvite?: OrganizationInviteUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutOrganizationCreatedNestedInput
    UserOrganization?: UserOrganizationUpdateManyWithoutOrganizationNestedInput
    featureAccess?: OrganizationFeatureAccessUpdateManyWithoutOrganizationNestedInput
    telegramBot?: TelegramSettingUpdateManyWithoutOrgNestedInput
    OrganizationInvite?: OrganizationInviteUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    UserOrganization?: UserOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput
    featureAccess?: OrganizationFeatureAccessUncheckedUpdateManyWithoutOrganizationNestedInput
    telegramBot?: TelegramSettingUncheckedUpdateManyWithoutOrgNestedInput
    OrganizationInvite?: OrganizationInviteUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    number?: number | null
    name: string
    description?: string | null
    startedAt?: Date | string | null
    logoImage?: string | null
    Address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type UserOrganizationCreateInput = {
    id?: string
    role?: $Enums.OrganizationUserRole | null
    user: UserCreateNestedOneWithoutUserOrganizationInput
    organization: OrganizationCreateNestedOneWithoutUserOrganizationInput
  }

  export type UserOrganizationUncheckedCreateInput = {
    id?: string
    userId: string
    role?: $Enums.OrganizationUserRole | null
    organizationId: string
  }

  export type UserOrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
    user?: UserUpdateOneRequiredWithoutUserOrganizationNestedInput
    organization?: OrganizationUpdateOneRequiredWithoutUserOrganizationNestedInput
  }

  export type UserOrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type UserOrganizationCreateManyInput = {
    id?: string
    userId: string
    role?: $Enums.OrganizationUserRole | null
    organizationId: string
  }

  export type UserOrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
  }

  export type UserOrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type OrganizationInviteCreateInput = {
    id?: string
    invitedBy: string
    email: string
    role?: $Enums.OrganizationUserRole | null
    token: string
    accepted?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutOrganizationInviteInput
  }

  export type OrganizationInviteUncheckedCreateInput = {
    id?: string
    invitedBy: string
    email: string
    organizationId: string
    role?: $Enums.OrganizationUserRole | null
    token: string
    accepted?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type OrganizationInviteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invitedBy?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
    token?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutOrganizationInviteNestedInput
  }

  export type OrganizationInviteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invitedBy?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
    token?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationInviteCreateManyInput = {
    id?: string
    invitedBy: string
    email: string
    organizationId: string
    role?: $Enums.OrganizationUserRole | null
    token: string
    accepted?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type OrganizationInviteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    invitedBy?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
    token?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationInviteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    invitedBy?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
    token?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureCreateInput = {
    id?: string
    name: string
    slug: string
    isEnabled?: boolean
    createdAt?: Date | string
    orgAccesses?: OrganizationFeatureAccessCreateNestedManyWithoutFeatureInput
  }

  export type FeatureUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    isEnabled?: boolean
    createdAt?: Date | string
    orgAccesses?: OrganizationFeatureAccessUncheckedCreateNestedManyWithoutFeatureInput
  }

  export type FeatureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orgAccesses?: OrganizationFeatureAccessUpdateManyWithoutFeatureNestedInput
  }

  export type FeatureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orgAccesses?: OrganizationFeatureAccessUncheckedUpdateManyWithoutFeatureNestedInput
  }

  export type FeatureCreateManyInput = {
    id?: string
    name: string
    slug: string
    isEnabled?: boolean
    createdAt?: Date | string
  }

  export type FeatureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationFeatureAccessCreateInput = {
    id?: string
    isEnabled?: boolean
    organization: OrganizationCreateNestedOneWithoutFeatureAccessInput
    feature: FeatureCreateNestedOneWithoutOrgAccessesInput
  }

  export type OrganizationFeatureAccessUncheckedCreateInput = {
    id?: string
    organizationId: string
    featureId: string
    isEnabled?: boolean
  }

  export type OrganizationFeatureAccessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutFeatureAccessNestedInput
    feature?: FeatureUpdateOneRequiredWithoutOrgAccessesNestedInput
  }

  export type OrganizationFeatureAccessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    featureId?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrganizationFeatureAccessCreateManyInput = {
    id?: string
    organizationId: string
    featureId: string
    isEnabled?: boolean
  }

  export type OrganizationFeatureAccessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrganizationFeatureAccessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    featureId?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type VerificationTokenEmailTokenCompoundUniqueInput = {
    email: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PasswordResetTokenEmailTokenCompoundUniqueInput = {
    email: string
    token: string
  }

  export type PasswordResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PasswordResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PasswordResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TwoFactorTokenEmailTokenCompoundUniqueInput = {
    email: string
    token: string
  }

  export type TwoFactorTokenCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TwoFactorTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TwoFactorTokenMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TwoFactorConfirmationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TwoFactorConfirmationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TwoFactorConfirmationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
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

  export type VersionInfoCountOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
    status?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type VersionInfoMaxOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
    status?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type VersionInfoMinOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
    status?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    message?: SortOrder
    anonymous?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type FeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    message?: SortOrder
    anonymous?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type FeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    message?: SortOrder
    anonymous?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumLogTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LogType | EnumLogTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LogType[] | ListEnumLogTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogType[] | ListEnumLogTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLogTypeFilter<$PrismaModel> | $Enums.LogType
  }

  export type UpdateLogCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    message?: SortOrder
    updatedBy?: SortOrder
    orgId?: SortOrder
    type?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UpdateLogMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    message?: SortOrder
    updatedBy?: SortOrder
    orgId?: SortOrder
    type?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UpdateLogMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    message?: SortOrder
    updatedBy?: SortOrder
    orgId?: SortOrder
    type?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumLogTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogType | EnumLogTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LogType[] | ListEnumLogTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogType[] | ListEnumLogTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLogTypeWithAggregatesFilter<$PrismaModel> | $Enums.LogType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLogTypeFilter<$PrismaModel>
    _max?: NestedEnumLogTypeFilter<$PrismaModel>
  }

  export type EnumScopeFilter<$PrismaModel = never> = {
    equals?: $Enums.Scope | EnumScopeFieldRefInput<$PrismaModel>
    in?: $Enums.Scope[] | ListEnumScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Scope[] | ListEnumScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumScopeFilter<$PrismaModel> | $Enums.Scope
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type OrganizationNullableScalarRelationFilter = {
    is?: OrganizationWhereInput | null
    isNot?: OrganizationWhereInput | null
  }

  export type TelegramSettingUserIdScopeCompoundUniqueInput = {
    userId: string
    scope: $Enums.Scope
  }

  export type TelegramSettingOrgIdScopeCompoundUniqueInput = {
    orgId: string
    scope: $Enums.Scope
  }

  export type TelegramSettingUserIdRoleCompoundUniqueInput = {
    userId: string
    role: $Enums.UserRole
  }

  export type TelegramSettingOrgIdRoleUserIdScopeCompoundUniqueInput = {
    orgId: string
    role: $Enums.UserRole
    userId: string
    scope: $Enums.Scope
  }

  export type TelegramSettingCountOrderByAggregateInput = {
    id?: SortOrder
    botToken?: SortOrder
    chatId?: SortOrder
    scope?: SortOrder
    userId?: SortOrder
    orgId?: SortOrder
    role?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TelegramSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    botToken?: SortOrder
    chatId?: SortOrder
    scope?: SortOrder
    userId?: SortOrder
    orgId?: SortOrder
    role?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TelegramSettingMinOrderByAggregateInput = {
    id?: SortOrder
    botToken?: SortOrder
    chatId?: SortOrder
    scope?: SortOrder
    userId?: SortOrder
    orgId?: SortOrder
    role?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumScopeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Scope | EnumScopeFieldRefInput<$PrismaModel>
    in?: $Enums.Scope[] | ListEnumScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Scope[] | ListEnumScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumScopeWithAggregatesFilter<$PrismaModel> | $Enums.Scope
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScopeFilter<$PrismaModel>
    _max?: NestedEnumScopeFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type TwoFactorConfirmationNullableScalarRelationFilter = {
    is?: TwoFactorConfirmationWhereInput | null
    isNot?: TwoFactorConfirmationWhereInput | null
  }

  export type UserOrganizationListRelationFilter = {
    every?: UserOrganizationWhereInput
    some?: UserOrganizationWhereInput
    none?: UserOrganizationWhereInput
  }

  export type OrganizationListRelationFilter = {
    every?: OrganizationWhereInput
    some?: OrganizationWhereInput
    none?: OrganizationWhereInput
  }

  export type TelegramSettingListRelationFilter = {
    every?: TelegramSettingWhereInput
    some?: TelegramSettingWhereInput
    none?: TelegramSettingWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrganizationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TelegramSettingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isTwoFactorEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    defaultOrgId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isTwoFactorEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    defaultOrgId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isTwoFactorEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    defaultOrgId?: SortOrder
  }

  export type OrganizationFeatureAccessListRelationFilter = {
    every?: OrganizationFeatureAccessWhereInput
    some?: OrganizationFeatureAccessWhereInput
    none?: OrganizationFeatureAccessWhereInput
  }

  export type OrganizationInviteListRelationFilter = {
    every?: OrganizationInviteWhereInput
    some?: OrganizationInviteWhereInput
    none?: OrganizationInviteWhereInput
  }

  export type OrganizationFeatureAccessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationInviteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startedAt?: SortOrder
    logoImage?: SortOrder
    Address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type OrganizationAvgOrderByAggregateInput = {
    number?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startedAt?: SortOrder
    logoImage?: SortOrder
    Address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startedAt?: SortOrder
    logoImage?: SortOrder
    Address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type OrganizationSumOrderByAggregateInput = {
    number?: SortOrder
  }

  export type EnumOrganizationUserRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.OrganizationUserRole | EnumOrganizationUserRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.OrganizationUserRole[] | ListEnumOrganizationUserRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.OrganizationUserRole[] | ListEnumOrganizationUserRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumOrganizationUserRoleNullableFilter<$PrismaModel> | $Enums.OrganizationUserRole | null
  }

  export type OrganizationScalarRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type UserOrganizationUserIdOrganizationIdCompoundUniqueInput = {
    userId: string
    organizationId: string
  }

  export type UserOrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    organizationId?: SortOrder
  }

  export type UserOrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    organizationId?: SortOrder
  }

  export type UserOrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    organizationId?: SortOrder
  }

  export type EnumOrganizationUserRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrganizationUserRole | EnumOrganizationUserRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.OrganizationUserRole[] | ListEnumOrganizationUserRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.OrganizationUserRole[] | ListEnumOrganizationUserRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumOrganizationUserRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.OrganizationUserRole | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumOrganizationUserRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumOrganizationUserRoleNullableFilter<$PrismaModel>
  }

  export type OrganizationInviteEmailOrganizationIdCompoundUniqueInput = {
    email: string
    organizationId: string
  }

  export type OrganizationInviteCountOrderByAggregateInput = {
    id?: SortOrder
    invitedBy?: SortOrder
    email?: SortOrder
    organizationId?: SortOrder
    role?: SortOrder
    token?: SortOrder
    accepted?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OrganizationInviteMaxOrderByAggregateInput = {
    id?: SortOrder
    invitedBy?: SortOrder
    email?: SortOrder
    organizationId?: SortOrder
    role?: SortOrder
    token?: SortOrder
    accepted?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OrganizationInviteMinOrderByAggregateInput = {
    id?: SortOrder
    invitedBy?: SortOrder
    email?: SortOrder
    organizationId?: SortOrder
    role?: SortOrder
    token?: SortOrder
    accepted?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type FeatureCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
  }

  export type FeatureMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
  }

  export type FeatureMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
  }

  export type FeatureScalarRelationFilter = {
    is?: FeatureWhereInput
    isNot?: FeatureWhereInput
  }

  export type OrganizationFeatureAccessOrganizationIdFeatureIdCompoundUniqueInput = {
    organizationId: string
    featureId: string
  }

  export type OrganizationFeatureAccessCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    featureId?: SortOrder
    isEnabled?: SortOrder
  }

  export type OrganizationFeatureAccessMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    featureId?: SortOrder
    isEnabled?: SortOrder
  }

  export type OrganizationFeatureAccessMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    featureId?: SortOrder
    isEnabled?: SortOrder
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutTwoFactorConfirmationInput = {
    create?: XOR<UserCreateWithoutTwoFactorConfirmationInput, UserUncheckedCreateWithoutTwoFactorConfirmationInput>
    connectOrCreate?: UserCreateOrConnectWithoutTwoFactorConfirmationInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTwoFactorConfirmationNestedInput = {
    create?: XOR<UserCreateWithoutTwoFactorConfirmationInput, UserUncheckedCreateWithoutTwoFactorConfirmationInput>
    connectOrCreate?: UserCreateOrConnectWithoutTwoFactorConfirmationInput
    upsert?: UserUpsertWithoutTwoFactorConfirmationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTwoFactorConfirmationInput, UserUpdateWithoutTwoFactorConfirmationInput>, UserUncheckedUpdateWithoutTwoFactorConfirmationInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumLogTypeFieldUpdateOperationsInput = {
    set?: $Enums.LogType
  }

  export type UserCreateNestedOneWithoutTelegramBotInput = {
    create?: XOR<UserCreateWithoutTelegramBotInput, UserUncheckedCreateWithoutTelegramBotInput>
    connectOrCreate?: UserCreateOrConnectWithoutTelegramBotInput
    connect?: UserWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutTelegramBotInput = {
    create?: XOR<OrganizationCreateWithoutTelegramBotInput, OrganizationUncheckedCreateWithoutTelegramBotInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutTelegramBotInput
    connect?: OrganizationWhereUniqueInput
  }

  export type EnumScopeFieldUpdateOperationsInput = {
    set?: $Enums.Scope
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type UserUpdateOneWithoutTelegramBotNestedInput = {
    create?: XOR<UserCreateWithoutTelegramBotInput, UserUncheckedCreateWithoutTelegramBotInput>
    connectOrCreate?: UserCreateOrConnectWithoutTelegramBotInput
    upsert?: UserUpsertWithoutTelegramBotInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTelegramBotInput, UserUpdateWithoutTelegramBotInput>, UserUncheckedUpdateWithoutTelegramBotInput>
  }

  export type OrganizationUpdateOneWithoutTelegramBotNestedInput = {
    create?: XOR<OrganizationCreateWithoutTelegramBotInput, OrganizationUncheckedCreateWithoutTelegramBotInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutTelegramBotInput
    upsert?: OrganizationUpsertWithoutTelegramBotInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutTelegramBotInput, OrganizationUpdateWithoutTelegramBotInput>, OrganizationUncheckedUpdateWithoutTelegramBotInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type TwoFactorConfirmationCreateNestedOneWithoutUserInput = {
    create?: XOR<TwoFactorConfirmationCreateWithoutUserInput, TwoFactorConfirmationUncheckedCreateWithoutUserInput>
    connectOrCreate?: TwoFactorConfirmationCreateOrConnectWithoutUserInput
    connect?: TwoFactorConfirmationWhereUniqueInput
  }

  export type UserOrganizationCreateNestedManyWithoutUserInput = {
    create?: XOR<UserOrganizationCreateWithoutUserInput, UserOrganizationUncheckedCreateWithoutUserInput> | UserOrganizationCreateWithoutUserInput[] | UserOrganizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOrganizationCreateOrConnectWithoutUserInput | UserOrganizationCreateOrConnectWithoutUserInput[]
    createMany?: UserOrganizationCreateManyUserInputEnvelope
    connect?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
  }

  export type OrganizationCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<OrganizationCreateWithoutCreatedByInput, OrganizationUncheckedCreateWithoutCreatedByInput> | OrganizationCreateWithoutCreatedByInput[] | OrganizationUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutCreatedByInput | OrganizationCreateOrConnectWithoutCreatedByInput[]
    createMany?: OrganizationCreateManyCreatedByInputEnvelope
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
  }

  export type TelegramSettingCreateNestedManyWithoutUserInput = {
    create?: XOR<TelegramSettingCreateWithoutUserInput, TelegramSettingUncheckedCreateWithoutUserInput> | TelegramSettingCreateWithoutUserInput[] | TelegramSettingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TelegramSettingCreateOrConnectWithoutUserInput | TelegramSettingCreateOrConnectWithoutUserInput[]
    createMany?: TelegramSettingCreateManyUserInputEnvelope
    connect?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type TwoFactorConfirmationUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<TwoFactorConfirmationCreateWithoutUserInput, TwoFactorConfirmationUncheckedCreateWithoutUserInput>
    connectOrCreate?: TwoFactorConfirmationCreateOrConnectWithoutUserInput
    connect?: TwoFactorConfirmationWhereUniqueInput
  }

  export type UserOrganizationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserOrganizationCreateWithoutUserInput, UserOrganizationUncheckedCreateWithoutUserInput> | UserOrganizationCreateWithoutUserInput[] | UserOrganizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOrganizationCreateOrConnectWithoutUserInput | UserOrganizationCreateOrConnectWithoutUserInput[]
    createMany?: UserOrganizationCreateManyUserInputEnvelope
    connect?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
  }

  export type OrganizationUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<OrganizationCreateWithoutCreatedByInput, OrganizationUncheckedCreateWithoutCreatedByInput> | OrganizationCreateWithoutCreatedByInput[] | OrganizationUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutCreatedByInput | OrganizationCreateOrConnectWithoutCreatedByInput[]
    createMany?: OrganizationCreateManyCreatedByInputEnvelope
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
  }

  export type TelegramSettingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TelegramSettingCreateWithoutUserInput, TelegramSettingUncheckedCreateWithoutUserInput> | TelegramSettingCreateWithoutUserInput[] | TelegramSettingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TelegramSettingCreateOrConnectWithoutUserInput | TelegramSettingCreateOrConnectWithoutUserInput[]
    createMany?: TelegramSettingCreateManyUserInputEnvelope
    connect?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type TwoFactorConfirmationUpdateOneWithoutUserNestedInput = {
    create?: XOR<TwoFactorConfirmationCreateWithoutUserInput, TwoFactorConfirmationUncheckedCreateWithoutUserInput>
    connectOrCreate?: TwoFactorConfirmationCreateOrConnectWithoutUserInput
    upsert?: TwoFactorConfirmationUpsertWithoutUserInput
    disconnect?: TwoFactorConfirmationWhereInput | boolean
    delete?: TwoFactorConfirmationWhereInput | boolean
    connect?: TwoFactorConfirmationWhereUniqueInput
    update?: XOR<XOR<TwoFactorConfirmationUpdateToOneWithWhereWithoutUserInput, TwoFactorConfirmationUpdateWithoutUserInput>, TwoFactorConfirmationUncheckedUpdateWithoutUserInput>
  }

  export type UserOrganizationUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserOrganizationCreateWithoutUserInput, UserOrganizationUncheckedCreateWithoutUserInput> | UserOrganizationCreateWithoutUserInput[] | UserOrganizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOrganizationCreateOrConnectWithoutUserInput | UserOrganizationCreateOrConnectWithoutUserInput[]
    upsert?: UserOrganizationUpsertWithWhereUniqueWithoutUserInput | UserOrganizationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserOrganizationCreateManyUserInputEnvelope
    set?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    disconnect?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    delete?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    connect?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    update?: UserOrganizationUpdateWithWhereUniqueWithoutUserInput | UserOrganizationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserOrganizationUpdateManyWithWhereWithoutUserInput | UserOrganizationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserOrganizationScalarWhereInput | UserOrganizationScalarWhereInput[]
  }

  export type OrganizationUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<OrganizationCreateWithoutCreatedByInput, OrganizationUncheckedCreateWithoutCreatedByInput> | OrganizationCreateWithoutCreatedByInput[] | OrganizationUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutCreatedByInput | OrganizationCreateOrConnectWithoutCreatedByInput[]
    upsert?: OrganizationUpsertWithWhereUniqueWithoutCreatedByInput | OrganizationUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: OrganizationCreateManyCreatedByInputEnvelope
    set?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    disconnect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    delete?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    update?: OrganizationUpdateWithWhereUniqueWithoutCreatedByInput | OrganizationUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: OrganizationUpdateManyWithWhereWithoutCreatedByInput | OrganizationUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
  }

  export type TelegramSettingUpdateManyWithoutUserNestedInput = {
    create?: XOR<TelegramSettingCreateWithoutUserInput, TelegramSettingUncheckedCreateWithoutUserInput> | TelegramSettingCreateWithoutUserInput[] | TelegramSettingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TelegramSettingCreateOrConnectWithoutUserInput | TelegramSettingCreateOrConnectWithoutUserInput[]
    upsert?: TelegramSettingUpsertWithWhereUniqueWithoutUserInput | TelegramSettingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TelegramSettingCreateManyUserInputEnvelope
    set?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    disconnect?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    delete?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    connect?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    update?: TelegramSettingUpdateWithWhereUniqueWithoutUserInput | TelegramSettingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TelegramSettingUpdateManyWithWhereWithoutUserInput | TelegramSettingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TelegramSettingScalarWhereInput | TelegramSettingScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type TwoFactorConfirmationUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<TwoFactorConfirmationCreateWithoutUserInput, TwoFactorConfirmationUncheckedCreateWithoutUserInput>
    connectOrCreate?: TwoFactorConfirmationCreateOrConnectWithoutUserInput
    upsert?: TwoFactorConfirmationUpsertWithoutUserInput
    disconnect?: TwoFactorConfirmationWhereInput | boolean
    delete?: TwoFactorConfirmationWhereInput | boolean
    connect?: TwoFactorConfirmationWhereUniqueInput
    update?: XOR<XOR<TwoFactorConfirmationUpdateToOneWithWhereWithoutUserInput, TwoFactorConfirmationUpdateWithoutUserInput>, TwoFactorConfirmationUncheckedUpdateWithoutUserInput>
  }

  export type UserOrganizationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserOrganizationCreateWithoutUserInput, UserOrganizationUncheckedCreateWithoutUserInput> | UserOrganizationCreateWithoutUserInput[] | UserOrganizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOrganizationCreateOrConnectWithoutUserInput | UserOrganizationCreateOrConnectWithoutUserInput[]
    upsert?: UserOrganizationUpsertWithWhereUniqueWithoutUserInput | UserOrganizationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserOrganizationCreateManyUserInputEnvelope
    set?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    disconnect?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    delete?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    connect?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    update?: UserOrganizationUpdateWithWhereUniqueWithoutUserInput | UserOrganizationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserOrganizationUpdateManyWithWhereWithoutUserInput | UserOrganizationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserOrganizationScalarWhereInput | UserOrganizationScalarWhereInput[]
  }

  export type OrganizationUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<OrganizationCreateWithoutCreatedByInput, OrganizationUncheckedCreateWithoutCreatedByInput> | OrganizationCreateWithoutCreatedByInput[] | OrganizationUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutCreatedByInput | OrganizationCreateOrConnectWithoutCreatedByInput[]
    upsert?: OrganizationUpsertWithWhereUniqueWithoutCreatedByInput | OrganizationUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: OrganizationCreateManyCreatedByInputEnvelope
    set?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    disconnect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    delete?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    update?: OrganizationUpdateWithWhereUniqueWithoutCreatedByInput | OrganizationUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: OrganizationUpdateManyWithWhereWithoutCreatedByInput | OrganizationUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
  }

  export type TelegramSettingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TelegramSettingCreateWithoutUserInput, TelegramSettingUncheckedCreateWithoutUserInput> | TelegramSettingCreateWithoutUserInput[] | TelegramSettingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TelegramSettingCreateOrConnectWithoutUserInput | TelegramSettingCreateOrConnectWithoutUserInput[]
    upsert?: TelegramSettingUpsertWithWhereUniqueWithoutUserInput | TelegramSettingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TelegramSettingCreateManyUserInputEnvelope
    set?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    disconnect?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    delete?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    connect?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    update?: TelegramSettingUpdateWithWhereUniqueWithoutUserInput | TelegramSettingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TelegramSettingUpdateManyWithWhereWithoutUserInput | TelegramSettingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TelegramSettingScalarWhereInput | TelegramSettingScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOrganizationCreatedInput = {
    create?: XOR<UserCreateWithoutOrganizationCreatedInput, UserUncheckedCreateWithoutOrganizationCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type UserOrganizationCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserOrganizationCreateWithoutOrganizationInput, UserOrganizationUncheckedCreateWithoutOrganizationInput> | UserOrganizationCreateWithoutOrganizationInput[] | UserOrganizationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserOrganizationCreateOrConnectWithoutOrganizationInput | UserOrganizationCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserOrganizationCreateManyOrganizationInputEnvelope
    connect?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
  }

  export type OrganizationFeatureAccessCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OrganizationFeatureAccessCreateWithoutOrganizationInput, OrganizationFeatureAccessUncheckedCreateWithoutOrganizationInput> | OrganizationFeatureAccessCreateWithoutOrganizationInput[] | OrganizationFeatureAccessUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationFeatureAccessCreateOrConnectWithoutOrganizationInput | OrganizationFeatureAccessCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationFeatureAccessCreateManyOrganizationInputEnvelope
    connect?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
  }

  export type TelegramSettingCreateNestedManyWithoutOrgInput = {
    create?: XOR<TelegramSettingCreateWithoutOrgInput, TelegramSettingUncheckedCreateWithoutOrgInput> | TelegramSettingCreateWithoutOrgInput[] | TelegramSettingUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: TelegramSettingCreateOrConnectWithoutOrgInput | TelegramSettingCreateOrConnectWithoutOrgInput[]
    createMany?: TelegramSettingCreateManyOrgInputEnvelope
    connect?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
  }

  export type OrganizationInviteCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OrganizationInviteCreateWithoutOrganizationInput, OrganizationInviteUncheckedCreateWithoutOrganizationInput> | OrganizationInviteCreateWithoutOrganizationInput[] | OrganizationInviteUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationInviteCreateOrConnectWithoutOrganizationInput | OrganizationInviteCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationInviteCreateManyOrganizationInputEnvelope
    connect?: OrganizationInviteWhereUniqueInput | OrganizationInviteWhereUniqueInput[]
  }

  export type UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserOrganizationCreateWithoutOrganizationInput, UserOrganizationUncheckedCreateWithoutOrganizationInput> | UserOrganizationCreateWithoutOrganizationInput[] | UserOrganizationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserOrganizationCreateOrConnectWithoutOrganizationInput | UserOrganizationCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserOrganizationCreateManyOrganizationInputEnvelope
    connect?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
  }

  export type OrganizationFeatureAccessUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OrganizationFeatureAccessCreateWithoutOrganizationInput, OrganizationFeatureAccessUncheckedCreateWithoutOrganizationInput> | OrganizationFeatureAccessCreateWithoutOrganizationInput[] | OrganizationFeatureAccessUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationFeatureAccessCreateOrConnectWithoutOrganizationInput | OrganizationFeatureAccessCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationFeatureAccessCreateManyOrganizationInputEnvelope
    connect?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
  }

  export type TelegramSettingUncheckedCreateNestedManyWithoutOrgInput = {
    create?: XOR<TelegramSettingCreateWithoutOrgInput, TelegramSettingUncheckedCreateWithoutOrgInput> | TelegramSettingCreateWithoutOrgInput[] | TelegramSettingUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: TelegramSettingCreateOrConnectWithoutOrgInput | TelegramSettingCreateOrConnectWithoutOrgInput[]
    createMany?: TelegramSettingCreateManyOrgInputEnvelope
    connect?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
  }

  export type OrganizationInviteUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OrganizationInviteCreateWithoutOrganizationInput, OrganizationInviteUncheckedCreateWithoutOrganizationInput> | OrganizationInviteCreateWithoutOrganizationInput[] | OrganizationInviteUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationInviteCreateOrConnectWithoutOrganizationInput | OrganizationInviteCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationInviteCreateManyOrganizationInputEnvelope
    connect?: OrganizationInviteWhereUniqueInput | OrganizationInviteWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutOrganizationCreatedNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationCreatedInput, UserUncheckedCreateWithoutOrganizationCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationCreatedInput
    upsert?: UserUpsertWithoutOrganizationCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrganizationCreatedInput, UserUpdateWithoutOrganizationCreatedInput>, UserUncheckedUpdateWithoutOrganizationCreatedInput>
  }

  export type UserOrganizationUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserOrganizationCreateWithoutOrganizationInput, UserOrganizationUncheckedCreateWithoutOrganizationInput> | UserOrganizationCreateWithoutOrganizationInput[] | UserOrganizationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserOrganizationCreateOrConnectWithoutOrganizationInput | UserOrganizationCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserOrganizationUpsertWithWhereUniqueWithoutOrganizationInput | UserOrganizationUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserOrganizationCreateManyOrganizationInputEnvelope
    set?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    disconnect?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    delete?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    connect?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    update?: UserOrganizationUpdateWithWhereUniqueWithoutOrganizationInput | UserOrganizationUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserOrganizationUpdateManyWithWhereWithoutOrganizationInput | UserOrganizationUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserOrganizationScalarWhereInput | UserOrganizationScalarWhereInput[]
  }

  export type OrganizationFeatureAccessUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationFeatureAccessCreateWithoutOrganizationInput, OrganizationFeatureAccessUncheckedCreateWithoutOrganizationInput> | OrganizationFeatureAccessCreateWithoutOrganizationInput[] | OrganizationFeatureAccessUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationFeatureAccessCreateOrConnectWithoutOrganizationInput | OrganizationFeatureAccessCreateOrConnectWithoutOrganizationInput[]
    upsert?: OrganizationFeatureAccessUpsertWithWhereUniqueWithoutOrganizationInput | OrganizationFeatureAccessUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationFeatureAccessCreateManyOrganizationInputEnvelope
    set?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    disconnect?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    delete?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    connect?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    update?: OrganizationFeatureAccessUpdateWithWhereUniqueWithoutOrganizationInput | OrganizationFeatureAccessUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OrganizationFeatureAccessUpdateManyWithWhereWithoutOrganizationInput | OrganizationFeatureAccessUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OrganizationFeatureAccessScalarWhereInput | OrganizationFeatureAccessScalarWhereInput[]
  }

  export type TelegramSettingUpdateManyWithoutOrgNestedInput = {
    create?: XOR<TelegramSettingCreateWithoutOrgInput, TelegramSettingUncheckedCreateWithoutOrgInput> | TelegramSettingCreateWithoutOrgInput[] | TelegramSettingUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: TelegramSettingCreateOrConnectWithoutOrgInput | TelegramSettingCreateOrConnectWithoutOrgInput[]
    upsert?: TelegramSettingUpsertWithWhereUniqueWithoutOrgInput | TelegramSettingUpsertWithWhereUniqueWithoutOrgInput[]
    createMany?: TelegramSettingCreateManyOrgInputEnvelope
    set?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    disconnect?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    delete?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    connect?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    update?: TelegramSettingUpdateWithWhereUniqueWithoutOrgInput | TelegramSettingUpdateWithWhereUniqueWithoutOrgInput[]
    updateMany?: TelegramSettingUpdateManyWithWhereWithoutOrgInput | TelegramSettingUpdateManyWithWhereWithoutOrgInput[]
    deleteMany?: TelegramSettingScalarWhereInput | TelegramSettingScalarWhereInput[]
  }

  export type OrganizationInviteUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationInviteCreateWithoutOrganizationInput, OrganizationInviteUncheckedCreateWithoutOrganizationInput> | OrganizationInviteCreateWithoutOrganizationInput[] | OrganizationInviteUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationInviteCreateOrConnectWithoutOrganizationInput | OrganizationInviteCreateOrConnectWithoutOrganizationInput[]
    upsert?: OrganizationInviteUpsertWithWhereUniqueWithoutOrganizationInput | OrganizationInviteUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationInviteCreateManyOrganizationInputEnvelope
    set?: OrganizationInviteWhereUniqueInput | OrganizationInviteWhereUniqueInput[]
    disconnect?: OrganizationInviteWhereUniqueInput | OrganizationInviteWhereUniqueInput[]
    delete?: OrganizationInviteWhereUniqueInput | OrganizationInviteWhereUniqueInput[]
    connect?: OrganizationInviteWhereUniqueInput | OrganizationInviteWhereUniqueInput[]
    update?: OrganizationInviteUpdateWithWhereUniqueWithoutOrganizationInput | OrganizationInviteUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OrganizationInviteUpdateManyWithWhereWithoutOrganizationInput | OrganizationInviteUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OrganizationInviteScalarWhereInput | OrganizationInviteScalarWhereInput[]
  }

  export type UserOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserOrganizationCreateWithoutOrganizationInput, UserOrganizationUncheckedCreateWithoutOrganizationInput> | UserOrganizationCreateWithoutOrganizationInput[] | UserOrganizationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserOrganizationCreateOrConnectWithoutOrganizationInput | UserOrganizationCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserOrganizationUpsertWithWhereUniqueWithoutOrganizationInput | UserOrganizationUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserOrganizationCreateManyOrganizationInputEnvelope
    set?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    disconnect?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    delete?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    connect?: UserOrganizationWhereUniqueInput | UserOrganizationWhereUniqueInput[]
    update?: UserOrganizationUpdateWithWhereUniqueWithoutOrganizationInput | UserOrganizationUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserOrganizationUpdateManyWithWhereWithoutOrganizationInput | UserOrganizationUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserOrganizationScalarWhereInput | UserOrganizationScalarWhereInput[]
  }

  export type OrganizationFeatureAccessUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationFeatureAccessCreateWithoutOrganizationInput, OrganizationFeatureAccessUncheckedCreateWithoutOrganizationInput> | OrganizationFeatureAccessCreateWithoutOrganizationInput[] | OrganizationFeatureAccessUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationFeatureAccessCreateOrConnectWithoutOrganizationInput | OrganizationFeatureAccessCreateOrConnectWithoutOrganizationInput[]
    upsert?: OrganizationFeatureAccessUpsertWithWhereUniqueWithoutOrganizationInput | OrganizationFeatureAccessUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationFeatureAccessCreateManyOrganizationInputEnvelope
    set?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    disconnect?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    delete?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    connect?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    update?: OrganizationFeatureAccessUpdateWithWhereUniqueWithoutOrganizationInput | OrganizationFeatureAccessUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OrganizationFeatureAccessUpdateManyWithWhereWithoutOrganizationInput | OrganizationFeatureAccessUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OrganizationFeatureAccessScalarWhereInput | OrganizationFeatureAccessScalarWhereInput[]
  }

  export type TelegramSettingUncheckedUpdateManyWithoutOrgNestedInput = {
    create?: XOR<TelegramSettingCreateWithoutOrgInput, TelegramSettingUncheckedCreateWithoutOrgInput> | TelegramSettingCreateWithoutOrgInput[] | TelegramSettingUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: TelegramSettingCreateOrConnectWithoutOrgInput | TelegramSettingCreateOrConnectWithoutOrgInput[]
    upsert?: TelegramSettingUpsertWithWhereUniqueWithoutOrgInput | TelegramSettingUpsertWithWhereUniqueWithoutOrgInput[]
    createMany?: TelegramSettingCreateManyOrgInputEnvelope
    set?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    disconnect?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    delete?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    connect?: TelegramSettingWhereUniqueInput | TelegramSettingWhereUniqueInput[]
    update?: TelegramSettingUpdateWithWhereUniqueWithoutOrgInput | TelegramSettingUpdateWithWhereUniqueWithoutOrgInput[]
    updateMany?: TelegramSettingUpdateManyWithWhereWithoutOrgInput | TelegramSettingUpdateManyWithWhereWithoutOrgInput[]
    deleteMany?: TelegramSettingScalarWhereInput | TelegramSettingScalarWhereInput[]
  }

  export type OrganizationInviteUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationInviteCreateWithoutOrganizationInput, OrganizationInviteUncheckedCreateWithoutOrganizationInput> | OrganizationInviteCreateWithoutOrganizationInput[] | OrganizationInviteUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationInviteCreateOrConnectWithoutOrganizationInput | OrganizationInviteCreateOrConnectWithoutOrganizationInput[]
    upsert?: OrganizationInviteUpsertWithWhereUniqueWithoutOrganizationInput | OrganizationInviteUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationInviteCreateManyOrganizationInputEnvelope
    set?: OrganizationInviteWhereUniqueInput | OrganizationInviteWhereUniqueInput[]
    disconnect?: OrganizationInviteWhereUniqueInput | OrganizationInviteWhereUniqueInput[]
    delete?: OrganizationInviteWhereUniqueInput | OrganizationInviteWhereUniqueInput[]
    connect?: OrganizationInviteWhereUniqueInput | OrganizationInviteWhereUniqueInput[]
    update?: OrganizationInviteUpdateWithWhereUniqueWithoutOrganizationInput | OrganizationInviteUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OrganizationInviteUpdateManyWithWhereWithoutOrganizationInput | OrganizationInviteUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OrganizationInviteScalarWhereInput | OrganizationInviteScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUserOrganizationInput = {
    create?: XOR<UserCreateWithoutUserOrganizationInput, UserUncheckedCreateWithoutUserOrganizationInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserOrganizationInput
    connect?: UserWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutUserOrganizationInput = {
    create?: XOR<OrganizationCreateWithoutUserOrganizationInput, OrganizationUncheckedCreateWithoutUserOrganizationInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUserOrganizationInput
    connect?: OrganizationWhereUniqueInput
  }

  export type NullableEnumOrganizationUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.OrganizationUserRole | null
  }

  export type UserUpdateOneRequiredWithoutUserOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutUserOrganizationInput, UserUncheckedCreateWithoutUserOrganizationInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserOrganizationInput
    upsert?: UserUpsertWithoutUserOrganizationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserOrganizationInput, UserUpdateWithoutUserOrganizationInput>, UserUncheckedUpdateWithoutUserOrganizationInput>
  }

  export type OrganizationUpdateOneRequiredWithoutUserOrganizationNestedInput = {
    create?: XOR<OrganizationCreateWithoutUserOrganizationInput, OrganizationUncheckedCreateWithoutUserOrganizationInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUserOrganizationInput
    upsert?: OrganizationUpsertWithoutUserOrganizationInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutUserOrganizationInput, OrganizationUpdateWithoutUserOrganizationInput>, OrganizationUncheckedUpdateWithoutUserOrganizationInput>
  }

  export type OrganizationCreateNestedOneWithoutOrganizationInviteInput = {
    create?: XOR<OrganizationCreateWithoutOrganizationInviteInput, OrganizationUncheckedCreateWithoutOrganizationInviteInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutOrganizationInviteInput
    connect?: OrganizationWhereUniqueInput
  }

  export type OrganizationUpdateOneRequiredWithoutOrganizationInviteNestedInput = {
    create?: XOR<OrganizationCreateWithoutOrganizationInviteInput, OrganizationUncheckedCreateWithoutOrganizationInviteInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutOrganizationInviteInput
    upsert?: OrganizationUpsertWithoutOrganizationInviteInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutOrganizationInviteInput, OrganizationUpdateWithoutOrganizationInviteInput>, OrganizationUncheckedUpdateWithoutOrganizationInviteInput>
  }

  export type OrganizationFeatureAccessCreateNestedManyWithoutFeatureInput = {
    create?: XOR<OrganizationFeatureAccessCreateWithoutFeatureInput, OrganizationFeatureAccessUncheckedCreateWithoutFeatureInput> | OrganizationFeatureAccessCreateWithoutFeatureInput[] | OrganizationFeatureAccessUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: OrganizationFeatureAccessCreateOrConnectWithoutFeatureInput | OrganizationFeatureAccessCreateOrConnectWithoutFeatureInput[]
    createMany?: OrganizationFeatureAccessCreateManyFeatureInputEnvelope
    connect?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
  }

  export type OrganizationFeatureAccessUncheckedCreateNestedManyWithoutFeatureInput = {
    create?: XOR<OrganizationFeatureAccessCreateWithoutFeatureInput, OrganizationFeatureAccessUncheckedCreateWithoutFeatureInput> | OrganizationFeatureAccessCreateWithoutFeatureInput[] | OrganizationFeatureAccessUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: OrganizationFeatureAccessCreateOrConnectWithoutFeatureInput | OrganizationFeatureAccessCreateOrConnectWithoutFeatureInput[]
    createMany?: OrganizationFeatureAccessCreateManyFeatureInputEnvelope
    connect?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
  }

  export type OrganizationFeatureAccessUpdateManyWithoutFeatureNestedInput = {
    create?: XOR<OrganizationFeatureAccessCreateWithoutFeatureInput, OrganizationFeatureAccessUncheckedCreateWithoutFeatureInput> | OrganizationFeatureAccessCreateWithoutFeatureInput[] | OrganizationFeatureAccessUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: OrganizationFeatureAccessCreateOrConnectWithoutFeatureInput | OrganizationFeatureAccessCreateOrConnectWithoutFeatureInput[]
    upsert?: OrganizationFeatureAccessUpsertWithWhereUniqueWithoutFeatureInput | OrganizationFeatureAccessUpsertWithWhereUniqueWithoutFeatureInput[]
    createMany?: OrganizationFeatureAccessCreateManyFeatureInputEnvelope
    set?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    disconnect?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    delete?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    connect?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    update?: OrganizationFeatureAccessUpdateWithWhereUniqueWithoutFeatureInput | OrganizationFeatureAccessUpdateWithWhereUniqueWithoutFeatureInput[]
    updateMany?: OrganizationFeatureAccessUpdateManyWithWhereWithoutFeatureInput | OrganizationFeatureAccessUpdateManyWithWhereWithoutFeatureInput[]
    deleteMany?: OrganizationFeatureAccessScalarWhereInput | OrganizationFeatureAccessScalarWhereInput[]
  }

  export type OrganizationFeatureAccessUncheckedUpdateManyWithoutFeatureNestedInput = {
    create?: XOR<OrganizationFeatureAccessCreateWithoutFeatureInput, OrganizationFeatureAccessUncheckedCreateWithoutFeatureInput> | OrganizationFeatureAccessCreateWithoutFeatureInput[] | OrganizationFeatureAccessUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: OrganizationFeatureAccessCreateOrConnectWithoutFeatureInput | OrganizationFeatureAccessCreateOrConnectWithoutFeatureInput[]
    upsert?: OrganizationFeatureAccessUpsertWithWhereUniqueWithoutFeatureInput | OrganizationFeatureAccessUpsertWithWhereUniqueWithoutFeatureInput[]
    createMany?: OrganizationFeatureAccessCreateManyFeatureInputEnvelope
    set?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    disconnect?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    delete?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    connect?: OrganizationFeatureAccessWhereUniqueInput | OrganizationFeatureAccessWhereUniqueInput[]
    update?: OrganizationFeatureAccessUpdateWithWhereUniqueWithoutFeatureInput | OrganizationFeatureAccessUpdateWithWhereUniqueWithoutFeatureInput[]
    updateMany?: OrganizationFeatureAccessUpdateManyWithWhereWithoutFeatureInput | OrganizationFeatureAccessUpdateManyWithWhereWithoutFeatureInput[]
    deleteMany?: OrganizationFeatureAccessScalarWhereInput | OrganizationFeatureAccessScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutFeatureAccessInput = {
    create?: XOR<OrganizationCreateWithoutFeatureAccessInput, OrganizationUncheckedCreateWithoutFeatureAccessInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutFeatureAccessInput
    connect?: OrganizationWhereUniqueInput
  }

  export type FeatureCreateNestedOneWithoutOrgAccessesInput = {
    create?: XOR<FeatureCreateWithoutOrgAccessesInput, FeatureUncheckedCreateWithoutOrgAccessesInput>
    connectOrCreate?: FeatureCreateOrConnectWithoutOrgAccessesInput
    connect?: FeatureWhereUniqueInput
  }

  export type OrganizationUpdateOneRequiredWithoutFeatureAccessNestedInput = {
    create?: XOR<OrganizationCreateWithoutFeatureAccessInput, OrganizationUncheckedCreateWithoutFeatureAccessInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutFeatureAccessInput
    upsert?: OrganizationUpsertWithoutFeatureAccessInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutFeatureAccessInput, OrganizationUpdateWithoutFeatureAccessInput>, OrganizationUncheckedUpdateWithoutFeatureAccessInput>
  }

  export type FeatureUpdateOneRequiredWithoutOrgAccessesNestedInput = {
    create?: XOR<FeatureCreateWithoutOrgAccessesInput, FeatureUncheckedCreateWithoutOrgAccessesInput>
    connectOrCreate?: FeatureCreateOrConnectWithoutOrgAccessesInput
    upsert?: FeatureUpsertWithoutOrgAccessesInput
    connect?: FeatureWhereUniqueInput
    update?: XOR<XOR<FeatureUpdateToOneWithWhereWithoutOrgAccessesInput, FeatureUpdateWithoutOrgAccessesInput>, FeatureUncheckedUpdateWithoutOrgAccessesInput>
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type NestedEnumLogTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LogType | EnumLogTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LogType[] | ListEnumLogTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogType[] | ListEnumLogTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLogTypeFilter<$PrismaModel> | $Enums.LogType
  }

  export type NestedEnumLogTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogType | EnumLogTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LogType[] | ListEnumLogTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogType[] | ListEnumLogTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLogTypeWithAggregatesFilter<$PrismaModel> | $Enums.LogType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLogTypeFilter<$PrismaModel>
    _max?: NestedEnumLogTypeFilter<$PrismaModel>
  }

  export type NestedEnumScopeFilter<$PrismaModel = never> = {
    equals?: $Enums.Scope | EnumScopeFieldRefInput<$PrismaModel>
    in?: $Enums.Scope[] | ListEnumScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Scope[] | ListEnumScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumScopeFilter<$PrismaModel> | $Enums.Scope
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumScopeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Scope | EnumScopeFieldRefInput<$PrismaModel>
    in?: $Enums.Scope[] | ListEnumScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Scope[] | ListEnumScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumScopeWithAggregatesFilter<$PrismaModel> | $Enums.Scope
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScopeFilter<$PrismaModel>
    _max?: NestedEnumScopeFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedEnumOrganizationUserRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.OrganizationUserRole | EnumOrganizationUserRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.OrganizationUserRole[] | ListEnumOrganizationUserRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.OrganizationUserRole[] | ListEnumOrganizationUserRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumOrganizationUserRoleNullableFilter<$PrismaModel> | $Enums.OrganizationUserRole | null
  }

  export type NestedEnumOrganizationUserRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrganizationUserRole | EnumOrganizationUserRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.OrganizationUserRole[] | ListEnumOrganizationUserRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.OrganizationUserRole[] | ListEnumOrganizationUserRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumOrganizationUserRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.OrganizationUserRole | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumOrganizationUserRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumOrganizationUserRoleNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    isTwoFactorEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    defaultOrgId?: string | null
    twoFactorConfirmation?: TwoFactorConfirmationCreateNestedOneWithoutUserInput
    UserOrganization?: UserOrganizationCreateNestedManyWithoutUserInput
    organizationCreated?: OrganizationCreateNestedManyWithoutCreatedByInput
    telegramBot?: TelegramSettingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    isTwoFactorEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    defaultOrgId?: string | null
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedCreateNestedOneWithoutUserInput
    UserOrganization?: UserOrganizationUncheckedCreateNestedManyWithoutUserInput
    organizationCreated?: OrganizationUncheckedCreateNestedManyWithoutCreatedByInput
    telegramBot?: TelegramSettingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    defaultOrgId?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorConfirmation?: TwoFactorConfirmationUpdateOneWithoutUserNestedInput
    UserOrganization?: UserOrganizationUpdateManyWithoutUserNestedInput
    organizationCreated?: OrganizationUpdateManyWithoutCreatedByNestedInput
    telegramBot?: TelegramSettingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    defaultOrgId?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedUpdateOneWithoutUserNestedInput
    UserOrganization?: UserOrganizationUncheckedUpdateManyWithoutUserNestedInput
    organizationCreated?: OrganizationUncheckedUpdateManyWithoutCreatedByNestedInput
    telegramBot?: TelegramSettingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTwoFactorConfirmationInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    isTwoFactorEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    defaultOrgId?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    UserOrganization?: UserOrganizationCreateNestedManyWithoutUserInput
    organizationCreated?: OrganizationCreateNestedManyWithoutCreatedByInput
    telegramBot?: TelegramSettingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTwoFactorConfirmationInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    isTwoFactorEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    defaultOrgId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    UserOrganization?: UserOrganizationUncheckedCreateNestedManyWithoutUserInput
    organizationCreated?: OrganizationUncheckedCreateNestedManyWithoutCreatedByInput
    telegramBot?: TelegramSettingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTwoFactorConfirmationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTwoFactorConfirmationInput, UserUncheckedCreateWithoutTwoFactorConfirmationInput>
  }

  export type UserUpsertWithoutTwoFactorConfirmationInput = {
    update: XOR<UserUpdateWithoutTwoFactorConfirmationInput, UserUncheckedUpdateWithoutTwoFactorConfirmationInput>
    create: XOR<UserCreateWithoutTwoFactorConfirmationInput, UserUncheckedCreateWithoutTwoFactorConfirmationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTwoFactorConfirmationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTwoFactorConfirmationInput, UserUncheckedUpdateWithoutTwoFactorConfirmationInput>
  }

  export type UserUpdateWithoutTwoFactorConfirmationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    defaultOrgId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    UserOrganization?: UserOrganizationUpdateManyWithoutUserNestedInput
    organizationCreated?: OrganizationUpdateManyWithoutCreatedByNestedInput
    telegramBot?: TelegramSettingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTwoFactorConfirmationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    defaultOrgId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    UserOrganization?: UserOrganizationUncheckedUpdateManyWithoutUserNestedInput
    organizationCreated?: OrganizationUncheckedUpdateManyWithoutCreatedByNestedInput
    telegramBot?: TelegramSettingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTelegramBotInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    isTwoFactorEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    defaultOrgId?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationCreateNestedOneWithoutUserInput
    UserOrganization?: UserOrganizationCreateNestedManyWithoutUserInput
    organizationCreated?: OrganizationCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutTelegramBotInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    isTwoFactorEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    defaultOrgId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedCreateNestedOneWithoutUserInput
    UserOrganization?: UserOrganizationUncheckedCreateNestedManyWithoutUserInput
    organizationCreated?: OrganizationUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutTelegramBotInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTelegramBotInput, UserUncheckedCreateWithoutTelegramBotInput>
  }

  export type OrganizationCreateWithoutTelegramBotInput = {
    id?: string
    number?: number | null
    name: string
    description?: string | null
    startedAt?: Date | string | null
    logoImage?: string | null
    Address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutOrganizationCreatedInput
    UserOrganization?: UserOrganizationCreateNestedManyWithoutOrganizationInput
    featureAccess?: OrganizationFeatureAccessCreateNestedManyWithoutOrganizationInput
    OrganizationInvite?: OrganizationInviteCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutTelegramBotInput = {
    id?: string
    number?: number | null
    name: string
    description?: string | null
    startedAt?: Date | string | null
    logoImage?: string | null
    Address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    UserOrganization?: UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInput
    featureAccess?: OrganizationFeatureAccessUncheckedCreateNestedManyWithoutOrganizationInput
    OrganizationInvite?: OrganizationInviteUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutTelegramBotInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutTelegramBotInput, OrganizationUncheckedCreateWithoutTelegramBotInput>
  }

  export type UserUpsertWithoutTelegramBotInput = {
    update: XOR<UserUpdateWithoutTelegramBotInput, UserUncheckedUpdateWithoutTelegramBotInput>
    create: XOR<UserCreateWithoutTelegramBotInput, UserUncheckedCreateWithoutTelegramBotInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTelegramBotInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTelegramBotInput, UserUncheckedUpdateWithoutTelegramBotInput>
  }

  export type UserUpdateWithoutTelegramBotInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    defaultOrgId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUpdateOneWithoutUserNestedInput
    UserOrganization?: UserOrganizationUpdateManyWithoutUserNestedInput
    organizationCreated?: OrganizationUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutTelegramBotInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    defaultOrgId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedUpdateOneWithoutUserNestedInput
    UserOrganization?: UserOrganizationUncheckedUpdateManyWithoutUserNestedInput
    organizationCreated?: OrganizationUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type OrganizationUpsertWithoutTelegramBotInput = {
    update: XOR<OrganizationUpdateWithoutTelegramBotInput, OrganizationUncheckedUpdateWithoutTelegramBotInput>
    create: XOR<OrganizationCreateWithoutTelegramBotInput, OrganizationUncheckedCreateWithoutTelegramBotInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutTelegramBotInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutTelegramBotInput, OrganizationUncheckedUpdateWithoutTelegramBotInput>
  }

  export type OrganizationUpdateWithoutTelegramBotInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutOrganizationCreatedNestedInput
    UserOrganization?: UserOrganizationUpdateManyWithoutOrganizationNestedInput
    featureAccess?: OrganizationFeatureAccessUpdateManyWithoutOrganizationNestedInput
    OrganizationInvite?: OrganizationInviteUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutTelegramBotInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    UserOrganization?: UserOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput
    featureAccess?: OrganizationFeatureAccessUncheckedUpdateManyWithoutOrganizationNestedInput
    OrganizationInvite?: OrganizationInviteUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TwoFactorConfirmationCreateWithoutUserInput = {
    id?: string
  }

  export type TwoFactorConfirmationUncheckedCreateWithoutUserInput = {
    id?: string
  }

  export type TwoFactorConfirmationCreateOrConnectWithoutUserInput = {
    where: TwoFactorConfirmationWhereUniqueInput
    create: XOR<TwoFactorConfirmationCreateWithoutUserInput, TwoFactorConfirmationUncheckedCreateWithoutUserInput>
  }

  export type UserOrganizationCreateWithoutUserInput = {
    id?: string
    role?: $Enums.OrganizationUserRole | null
    organization: OrganizationCreateNestedOneWithoutUserOrganizationInput
  }

  export type UserOrganizationUncheckedCreateWithoutUserInput = {
    id?: string
    role?: $Enums.OrganizationUserRole | null
    organizationId: string
  }

  export type UserOrganizationCreateOrConnectWithoutUserInput = {
    where: UserOrganizationWhereUniqueInput
    create: XOR<UserOrganizationCreateWithoutUserInput, UserOrganizationUncheckedCreateWithoutUserInput>
  }

  export type UserOrganizationCreateManyUserInputEnvelope = {
    data: UserOrganizationCreateManyUserInput | UserOrganizationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationCreateWithoutCreatedByInput = {
    id?: string
    number?: number | null
    name: string
    description?: string | null
    startedAt?: Date | string | null
    logoImage?: string | null
    Address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    UserOrganization?: UserOrganizationCreateNestedManyWithoutOrganizationInput
    featureAccess?: OrganizationFeatureAccessCreateNestedManyWithoutOrganizationInput
    telegramBot?: TelegramSettingCreateNestedManyWithoutOrgInput
    OrganizationInvite?: OrganizationInviteCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutCreatedByInput = {
    id?: string
    number?: number | null
    name: string
    description?: string | null
    startedAt?: Date | string | null
    logoImage?: string | null
    Address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    UserOrganization?: UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInput
    featureAccess?: OrganizationFeatureAccessUncheckedCreateNestedManyWithoutOrganizationInput
    telegramBot?: TelegramSettingUncheckedCreateNestedManyWithoutOrgInput
    OrganizationInvite?: OrganizationInviteUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutCreatedByInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutCreatedByInput, OrganizationUncheckedCreateWithoutCreatedByInput>
  }

  export type OrganizationCreateManyCreatedByInputEnvelope = {
    data: OrganizationCreateManyCreatedByInput | OrganizationCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type TelegramSettingCreateWithoutUserInput = {
    id?: string
    botToken: string
    chatId: string
    scope?: $Enums.Scope
    role?: $Enums.UserRole
    isEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    org?: OrganizationCreateNestedOneWithoutTelegramBotInput
  }

  export type TelegramSettingUncheckedCreateWithoutUserInput = {
    id?: string
    botToken: string
    chatId: string
    scope?: $Enums.Scope
    orgId?: string | null
    role?: $Enums.UserRole
    isEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TelegramSettingCreateOrConnectWithoutUserInput = {
    where: TelegramSettingWhereUniqueInput
    create: XOR<TelegramSettingCreateWithoutUserInput, TelegramSettingUncheckedCreateWithoutUserInput>
  }

  export type TelegramSettingCreateManyUserInputEnvelope = {
    data: TelegramSettingCreateManyUserInput | TelegramSettingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type TwoFactorConfirmationUpsertWithoutUserInput = {
    update: XOR<TwoFactorConfirmationUpdateWithoutUserInput, TwoFactorConfirmationUncheckedUpdateWithoutUserInput>
    create: XOR<TwoFactorConfirmationCreateWithoutUserInput, TwoFactorConfirmationUncheckedCreateWithoutUserInput>
    where?: TwoFactorConfirmationWhereInput
  }

  export type TwoFactorConfirmationUpdateToOneWithWhereWithoutUserInput = {
    where?: TwoFactorConfirmationWhereInput
    data: XOR<TwoFactorConfirmationUpdateWithoutUserInput, TwoFactorConfirmationUncheckedUpdateWithoutUserInput>
  }

  export type TwoFactorConfirmationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type TwoFactorConfirmationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type UserOrganizationUpsertWithWhereUniqueWithoutUserInput = {
    where: UserOrganizationWhereUniqueInput
    update: XOR<UserOrganizationUpdateWithoutUserInput, UserOrganizationUncheckedUpdateWithoutUserInput>
    create: XOR<UserOrganizationCreateWithoutUserInput, UserOrganizationUncheckedCreateWithoutUserInput>
  }

  export type UserOrganizationUpdateWithWhereUniqueWithoutUserInput = {
    where: UserOrganizationWhereUniqueInput
    data: XOR<UserOrganizationUpdateWithoutUserInput, UserOrganizationUncheckedUpdateWithoutUserInput>
  }

  export type UserOrganizationUpdateManyWithWhereWithoutUserInput = {
    where: UserOrganizationScalarWhereInput
    data: XOR<UserOrganizationUpdateManyMutationInput, UserOrganizationUncheckedUpdateManyWithoutUserInput>
  }

  export type UserOrganizationScalarWhereInput = {
    AND?: UserOrganizationScalarWhereInput | UserOrganizationScalarWhereInput[]
    OR?: UserOrganizationScalarWhereInput[]
    NOT?: UserOrganizationScalarWhereInput | UserOrganizationScalarWhereInput[]
    id?: StringFilter<"UserOrganization"> | string
    userId?: StringFilter<"UserOrganization"> | string
    role?: EnumOrganizationUserRoleNullableFilter<"UserOrganization"> | $Enums.OrganizationUserRole | null
    organizationId?: StringFilter<"UserOrganization"> | string
  }

  export type OrganizationUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: OrganizationWhereUniqueInput
    update: XOR<OrganizationUpdateWithoutCreatedByInput, OrganizationUncheckedUpdateWithoutCreatedByInput>
    create: XOR<OrganizationCreateWithoutCreatedByInput, OrganizationUncheckedCreateWithoutCreatedByInput>
  }

  export type OrganizationUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: OrganizationWhereUniqueInput
    data: XOR<OrganizationUpdateWithoutCreatedByInput, OrganizationUncheckedUpdateWithoutCreatedByInput>
  }

  export type OrganizationUpdateManyWithWhereWithoutCreatedByInput = {
    where: OrganizationScalarWhereInput
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type OrganizationScalarWhereInput = {
    AND?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
    OR?: OrganizationScalarWhereInput[]
    NOT?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
    id?: StringFilter<"Organization"> | string
    number?: IntNullableFilter<"Organization"> | number | null
    name?: StringFilter<"Organization"> | string
    description?: StringNullableFilter<"Organization"> | string | null
    startedAt?: DateTimeNullableFilter<"Organization"> | Date | string | null
    logoImage?: StringNullableFilter<"Organization"> | string | null
    Address?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    createdById?: StringFilter<"Organization"> | string
  }

  export type TelegramSettingUpsertWithWhereUniqueWithoutUserInput = {
    where: TelegramSettingWhereUniqueInput
    update: XOR<TelegramSettingUpdateWithoutUserInput, TelegramSettingUncheckedUpdateWithoutUserInput>
    create: XOR<TelegramSettingCreateWithoutUserInput, TelegramSettingUncheckedCreateWithoutUserInput>
  }

  export type TelegramSettingUpdateWithWhereUniqueWithoutUserInput = {
    where: TelegramSettingWhereUniqueInput
    data: XOR<TelegramSettingUpdateWithoutUserInput, TelegramSettingUncheckedUpdateWithoutUserInput>
  }

  export type TelegramSettingUpdateManyWithWhereWithoutUserInput = {
    where: TelegramSettingScalarWhereInput
    data: XOR<TelegramSettingUpdateManyMutationInput, TelegramSettingUncheckedUpdateManyWithoutUserInput>
  }

  export type TelegramSettingScalarWhereInput = {
    AND?: TelegramSettingScalarWhereInput | TelegramSettingScalarWhereInput[]
    OR?: TelegramSettingScalarWhereInput[]
    NOT?: TelegramSettingScalarWhereInput | TelegramSettingScalarWhereInput[]
    id?: StringFilter<"TelegramSetting"> | string
    botToken?: StringFilter<"TelegramSetting"> | string
    chatId?: StringFilter<"TelegramSetting"> | string
    scope?: EnumScopeFilter<"TelegramSetting"> | $Enums.Scope
    userId?: StringNullableFilter<"TelegramSetting"> | string | null
    orgId?: StringNullableFilter<"TelegramSetting"> | string | null
    role?: EnumUserRoleFilter<"TelegramSetting"> | $Enums.UserRole
    isEnabled?: BoolFilter<"TelegramSetting"> | boolean
    createdAt?: DateTimeFilter<"TelegramSetting"> | Date | string
    updatedAt?: DateTimeFilter<"TelegramSetting"> | Date | string
  }

  export type UserCreateWithoutOrganizationCreatedInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    isTwoFactorEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    defaultOrgId?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationCreateNestedOneWithoutUserInput
    UserOrganization?: UserOrganizationCreateNestedManyWithoutUserInput
    telegramBot?: TelegramSettingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrganizationCreatedInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    isTwoFactorEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    defaultOrgId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedCreateNestedOneWithoutUserInput
    UserOrganization?: UserOrganizationUncheckedCreateNestedManyWithoutUserInput
    telegramBot?: TelegramSettingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrganizationCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrganizationCreatedInput, UserUncheckedCreateWithoutOrganizationCreatedInput>
  }

  export type UserOrganizationCreateWithoutOrganizationInput = {
    id?: string
    role?: $Enums.OrganizationUserRole | null
    user: UserCreateNestedOneWithoutUserOrganizationInput
  }

  export type UserOrganizationUncheckedCreateWithoutOrganizationInput = {
    id?: string
    userId: string
    role?: $Enums.OrganizationUserRole | null
  }

  export type UserOrganizationCreateOrConnectWithoutOrganizationInput = {
    where: UserOrganizationWhereUniqueInput
    create: XOR<UserOrganizationCreateWithoutOrganizationInput, UserOrganizationUncheckedCreateWithoutOrganizationInput>
  }

  export type UserOrganizationCreateManyOrganizationInputEnvelope = {
    data: UserOrganizationCreateManyOrganizationInput | UserOrganizationCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationFeatureAccessCreateWithoutOrganizationInput = {
    id?: string
    isEnabled?: boolean
    feature: FeatureCreateNestedOneWithoutOrgAccessesInput
  }

  export type OrganizationFeatureAccessUncheckedCreateWithoutOrganizationInput = {
    id?: string
    featureId: string
    isEnabled?: boolean
  }

  export type OrganizationFeatureAccessCreateOrConnectWithoutOrganizationInput = {
    where: OrganizationFeatureAccessWhereUniqueInput
    create: XOR<OrganizationFeatureAccessCreateWithoutOrganizationInput, OrganizationFeatureAccessUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationFeatureAccessCreateManyOrganizationInputEnvelope = {
    data: OrganizationFeatureAccessCreateManyOrganizationInput | OrganizationFeatureAccessCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type TelegramSettingCreateWithoutOrgInput = {
    id?: string
    botToken: string
    chatId: string
    scope?: $Enums.Scope
    role?: $Enums.UserRole
    isEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutTelegramBotInput
  }

  export type TelegramSettingUncheckedCreateWithoutOrgInput = {
    id?: string
    botToken: string
    chatId: string
    scope?: $Enums.Scope
    userId?: string | null
    role?: $Enums.UserRole
    isEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TelegramSettingCreateOrConnectWithoutOrgInput = {
    where: TelegramSettingWhereUniqueInput
    create: XOR<TelegramSettingCreateWithoutOrgInput, TelegramSettingUncheckedCreateWithoutOrgInput>
  }

  export type TelegramSettingCreateManyOrgInputEnvelope = {
    data: TelegramSettingCreateManyOrgInput | TelegramSettingCreateManyOrgInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationInviteCreateWithoutOrganizationInput = {
    id?: string
    invitedBy: string
    email: string
    role?: $Enums.OrganizationUserRole | null
    token: string
    accepted?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type OrganizationInviteUncheckedCreateWithoutOrganizationInput = {
    id?: string
    invitedBy: string
    email: string
    role?: $Enums.OrganizationUserRole | null
    token: string
    accepted?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type OrganizationInviteCreateOrConnectWithoutOrganizationInput = {
    where: OrganizationInviteWhereUniqueInput
    create: XOR<OrganizationInviteCreateWithoutOrganizationInput, OrganizationInviteUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationInviteCreateManyOrganizationInputEnvelope = {
    data: OrganizationInviteCreateManyOrganizationInput | OrganizationInviteCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOrganizationCreatedInput = {
    update: XOR<UserUpdateWithoutOrganizationCreatedInput, UserUncheckedUpdateWithoutOrganizationCreatedInput>
    create: XOR<UserCreateWithoutOrganizationCreatedInput, UserUncheckedCreateWithoutOrganizationCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrganizationCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrganizationCreatedInput, UserUncheckedUpdateWithoutOrganizationCreatedInput>
  }

  export type UserUpdateWithoutOrganizationCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    defaultOrgId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUpdateOneWithoutUserNestedInput
    UserOrganization?: UserOrganizationUpdateManyWithoutUserNestedInput
    telegramBot?: TelegramSettingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrganizationCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    defaultOrgId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedUpdateOneWithoutUserNestedInput
    UserOrganization?: UserOrganizationUncheckedUpdateManyWithoutUserNestedInput
    telegramBot?: TelegramSettingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserOrganizationUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: UserOrganizationWhereUniqueInput
    update: XOR<UserOrganizationUpdateWithoutOrganizationInput, UserOrganizationUncheckedUpdateWithoutOrganizationInput>
    create: XOR<UserOrganizationCreateWithoutOrganizationInput, UserOrganizationUncheckedCreateWithoutOrganizationInput>
  }

  export type UserOrganizationUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: UserOrganizationWhereUniqueInput
    data: XOR<UserOrganizationUpdateWithoutOrganizationInput, UserOrganizationUncheckedUpdateWithoutOrganizationInput>
  }

  export type UserOrganizationUpdateManyWithWhereWithoutOrganizationInput = {
    where: UserOrganizationScalarWhereInput
    data: XOR<UserOrganizationUpdateManyMutationInput, UserOrganizationUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type OrganizationFeatureAccessUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: OrganizationFeatureAccessWhereUniqueInput
    update: XOR<OrganizationFeatureAccessUpdateWithoutOrganizationInput, OrganizationFeatureAccessUncheckedUpdateWithoutOrganizationInput>
    create: XOR<OrganizationFeatureAccessCreateWithoutOrganizationInput, OrganizationFeatureAccessUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationFeatureAccessUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: OrganizationFeatureAccessWhereUniqueInput
    data: XOR<OrganizationFeatureAccessUpdateWithoutOrganizationInput, OrganizationFeatureAccessUncheckedUpdateWithoutOrganizationInput>
  }

  export type OrganizationFeatureAccessUpdateManyWithWhereWithoutOrganizationInput = {
    where: OrganizationFeatureAccessScalarWhereInput
    data: XOR<OrganizationFeatureAccessUpdateManyMutationInput, OrganizationFeatureAccessUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type OrganizationFeatureAccessScalarWhereInput = {
    AND?: OrganizationFeatureAccessScalarWhereInput | OrganizationFeatureAccessScalarWhereInput[]
    OR?: OrganizationFeatureAccessScalarWhereInput[]
    NOT?: OrganizationFeatureAccessScalarWhereInput | OrganizationFeatureAccessScalarWhereInput[]
    id?: StringFilter<"OrganizationFeatureAccess"> | string
    organizationId?: StringFilter<"OrganizationFeatureAccess"> | string
    featureId?: StringFilter<"OrganizationFeatureAccess"> | string
    isEnabled?: BoolFilter<"OrganizationFeatureAccess"> | boolean
  }

  export type TelegramSettingUpsertWithWhereUniqueWithoutOrgInput = {
    where: TelegramSettingWhereUniqueInput
    update: XOR<TelegramSettingUpdateWithoutOrgInput, TelegramSettingUncheckedUpdateWithoutOrgInput>
    create: XOR<TelegramSettingCreateWithoutOrgInput, TelegramSettingUncheckedCreateWithoutOrgInput>
  }

  export type TelegramSettingUpdateWithWhereUniqueWithoutOrgInput = {
    where: TelegramSettingWhereUniqueInput
    data: XOR<TelegramSettingUpdateWithoutOrgInput, TelegramSettingUncheckedUpdateWithoutOrgInput>
  }

  export type TelegramSettingUpdateManyWithWhereWithoutOrgInput = {
    where: TelegramSettingScalarWhereInput
    data: XOR<TelegramSettingUpdateManyMutationInput, TelegramSettingUncheckedUpdateManyWithoutOrgInput>
  }

  export type OrganizationInviteUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: OrganizationInviteWhereUniqueInput
    update: XOR<OrganizationInviteUpdateWithoutOrganizationInput, OrganizationInviteUncheckedUpdateWithoutOrganizationInput>
    create: XOR<OrganizationInviteCreateWithoutOrganizationInput, OrganizationInviteUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationInviteUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: OrganizationInviteWhereUniqueInput
    data: XOR<OrganizationInviteUpdateWithoutOrganizationInput, OrganizationInviteUncheckedUpdateWithoutOrganizationInput>
  }

  export type OrganizationInviteUpdateManyWithWhereWithoutOrganizationInput = {
    where: OrganizationInviteScalarWhereInput
    data: XOR<OrganizationInviteUpdateManyMutationInput, OrganizationInviteUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type OrganizationInviteScalarWhereInput = {
    AND?: OrganizationInviteScalarWhereInput | OrganizationInviteScalarWhereInput[]
    OR?: OrganizationInviteScalarWhereInput[]
    NOT?: OrganizationInviteScalarWhereInput | OrganizationInviteScalarWhereInput[]
    id?: StringFilter<"OrganizationInvite"> | string
    invitedBy?: StringFilter<"OrganizationInvite"> | string
    email?: StringFilter<"OrganizationInvite"> | string
    organizationId?: StringFilter<"OrganizationInvite"> | string
    role?: EnumOrganizationUserRoleNullableFilter<"OrganizationInvite"> | $Enums.OrganizationUserRole | null
    token?: StringFilter<"OrganizationInvite"> | string
    accepted?: BoolFilter<"OrganizationInvite"> | boolean
    expiresAt?: DateTimeFilter<"OrganizationInvite"> | Date | string
    createdAt?: DateTimeFilter<"OrganizationInvite"> | Date | string
  }

  export type UserCreateWithoutUserOrganizationInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    isTwoFactorEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    defaultOrgId?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationCreateNestedOneWithoutUserInput
    organizationCreated?: OrganizationCreateNestedManyWithoutCreatedByInput
    telegramBot?: TelegramSettingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserOrganizationInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    isTwoFactorEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    defaultOrgId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedCreateNestedOneWithoutUserInput
    organizationCreated?: OrganizationUncheckedCreateNestedManyWithoutCreatedByInput
    telegramBot?: TelegramSettingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserOrganizationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserOrganizationInput, UserUncheckedCreateWithoutUserOrganizationInput>
  }

  export type OrganizationCreateWithoutUserOrganizationInput = {
    id?: string
    number?: number | null
    name: string
    description?: string | null
    startedAt?: Date | string | null
    logoImage?: string | null
    Address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutOrganizationCreatedInput
    featureAccess?: OrganizationFeatureAccessCreateNestedManyWithoutOrganizationInput
    telegramBot?: TelegramSettingCreateNestedManyWithoutOrgInput
    OrganizationInvite?: OrganizationInviteCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutUserOrganizationInput = {
    id?: string
    number?: number | null
    name: string
    description?: string | null
    startedAt?: Date | string | null
    logoImage?: string | null
    Address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    featureAccess?: OrganizationFeatureAccessUncheckedCreateNestedManyWithoutOrganizationInput
    telegramBot?: TelegramSettingUncheckedCreateNestedManyWithoutOrgInput
    OrganizationInvite?: OrganizationInviteUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutUserOrganizationInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutUserOrganizationInput, OrganizationUncheckedCreateWithoutUserOrganizationInput>
  }

  export type UserUpsertWithoutUserOrganizationInput = {
    update: XOR<UserUpdateWithoutUserOrganizationInput, UserUncheckedUpdateWithoutUserOrganizationInput>
    create: XOR<UserCreateWithoutUserOrganizationInput, UserUncheckedCreateWithoutUserOrganizationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserOrganizationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserOrganizationInput, UserUncheckedUpdateWithoutUserOrganizationInput>
  }

  export type UserUpdateWithoutUserOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    defaultOrgId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUpdateOneWithoutUserNestedInput
    organizationCreated?: OrganizationUpdateManyWithoutCreatedByNestedInput
    telegramBot?: TelegramSettingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    defaultOrgId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedUpdateOneWithoutUserNestedInput
    organizationCreated?: OrganizationUncheckedUpdateManyWithoutCreatedByNestedInput
    telegramBot?: TelegramSettingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrganizationUpsertWithoutUserOrganizationInput = {
    update: XOR<OrganizationUpdateWithoutUserOrganizationInput, OrganizationUncheckedUpdateWithoutUserOrganizationInput>
    create: XOR<OrganizationCreateWithoutUserOrganizationInput, OrganizationUncheckedCreateWithoutUserOrganizationInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutUserOrganizationInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutUserOrganizationInput, OrganizationUncheckedUpdateWithoutUserOrganizationInput>
  }

  export type OrganizationUpdateWithoutUserOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutOrganizationCreatedNestedInput
    featureAccess?: OrganizationFeatureAccessUpdateManyWithoutOrganizationNestedInput
    telegramBot?: TelegramSettingUpdateManyWithoutOrgNestedInput
    OrganizationInvite?: OrganizationInviteUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutUserOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    featureAccess?: OrganizationFeatureAccessUncheckedUpdateManyWithoutOrganizationNestedInput
    telegramBot?: TelegramSettingUncheckedUpdateManyWithoutOrgNestedInput
    OrganizationInvite?: OrganizationInviteUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateWithoutOrganizationInviteInput = {
    id?: string
    number?: number | null
    name: string
    description?: string | null
    startedAt?: Date | string | null
    logoImage?: string | null
    Address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutOrganizationCreatedInput
    UserOrganization?: UserOrganizationCreateNestedManyWithoutOrganizationInput
    featureAccess?: OrganizationFeatureAccessCreateNestedManyWithoutOrganizationInput
    telegramBot?: TelegramSettingCreateNestedManyWithoutOrgInput
  }

  export type OrganizationUncheckedCreateWithoutOrganizationInviteInput = {
    id?: string
    number?: number | null
    name: string
    description?: string | null
    startedAt?: Date | string | null
    logoImage?: string | null
    Address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    UserOrganization?: UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInput
    featureAccess?: OrganizationFeatureAccessUncheckedCreateNestedManyWithoutOrganizationInput
    telegramBot?: TelegramSettingUncheckedCreateNestedManyWithoutOrgInput
  }

  export type OrganizationCreateOrConnectWithoutOrganizationInviteInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutOrganizationInviteInput, OrganizationUncheckedCreateWithoutOrganizationInviteInput>
  }

  export type OrganizationUpsertWithoutOrganizationInviteInput = {
    update: XOR<OrganizationUpdateWithoutOrganizationInviteInput, OrganizationUncheckedUpdateWithoutOrganizationInviteInput>
    create: XOR<OrganizationCreateWithoutOrganizationInviteInput, OrganizationUncheckedCreateWithoutOrganizationInviteInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutOrganizationInviteInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutOrganizationInviteInput, OrganizationUncheckedUpdateWithoutOrganizationInviteInput>
  }

  export type OrganizationUpdateWithoutOrganizationInviteInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutOrganizationCreatedNestedInput
    UserOrganization?: UserOrganizationUpdateManyWithoutOrganizationNestedInput
    featureAccess?: OrganizationFeatureAccessUpdateManyWithoutOrganizationNestedInput
    telegramBot?: TelegramSettingUpdateManyWithoutOrgNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutOrganizationInviteInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    UserOrganization?: UserOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput
    featureAccess?: OrganizationFeatureAccessUncheckedUpdateManyWithoutOrganizationNestedInput
    telegramBot?: TelegramSettingUncheckedUpdateManyWithoutOrgNestedInput
  }

  export type OrganizationFeatureAccessCreateWithoutFeatureInput = {
    id?: string
    isEnabled?: boolean
    organization: OrganizationCreateNestedOneWithoutFeatureAccessInput
  }

  export type OrganizationFeatureAccessUncheckedCreateWithoutFeatureInput = {
    id?: string
    organizationId: string
    isEnabled?: boolean
  }

  export type OrganizationFeatureAccessCreateOrConnectWithoutFeatureInput = {
    where: OrganizationFeatureAccessWhereUniqueInput
    create: XOR<OrganizationFeatureAccessCreateWithoutFeatureInput, OrganizationFeatureAccessUncheckedCreateWithoutFeatureInput>
  }

  export type OrganizationFeatureAccessCreateManyFeatureInputEnvelope = {
    data: OrganizationFeatureAccessCreateManyFeatureInput | OrganizationFeatureAccessCreateManyFeatureInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationFeatureAccessUpsertWithWhereUniqueWithoutFeatureInput = {
    where: OrganizationFeatureAccessWhereUniqueInput
    update: XOR<OrganizationFeatureAccessUpdateWithoutFeatureInput, OrganizationFeatureAccessUncheckedUpdateWithoutFeatureInput>
    create: XOR<OrganizationFeatureAccessCreateWithoutFeatureInput, OrganizationFeatureAccessUncheckedCreateWithoutFeatureInput>
  }

  export type OrganizationFeatureAccessUpdateWithWhereUniqueWithoutFeatureInput = {
    where: OrganizationFeatureAccessWhereUniqueInput
    data: XOR<OrganizationFeatureAccessUpdateWithoutFeatureInput, OrganizationFeatureAccessUncheckedUpdateWithoutFeatureInput>
  }

  export type OrganizationFeatureAccessUpdateManyWithWhereWithoutFeatureInput = {
    where: OrganizationFeatureAccessScalarWhereInput
    data: XOR<OrganizationFeatureAccessUpdateManyMutationInput, OrganizationFeatureAccessUncheckedUpdateManyWithoutFeatureInput>
  }

  export type OrganizationCreateWithoutFeatureAccessInput = {
    id?: string
    number?: number | null
    name: string
    description?: string | null
    startedAt?: Date | string | null
    logoImage?: string | null
    Address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutOrganizationCreatedInput
    UserOrganization?: UserOrganizationCreateNestedManyWithoutOrganizationInput
    telegramBot?: TelegramSettingCreateNestedManyWithoutOrgInput
    OrganizationInvite?: OrganizationInviteCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutFeatureAccessInput = {
    id?: string
    number?: number | null
    name: string
    description?: string | null
    startedAt?: Date | string | null
    logoImage?: string | null
    Address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    UserOrganization?: UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInput
    telegramBot?: TelegramSettingUncheckedCreateNestedManyWithoutOrgInput
    OrganizationInvite?: OrganizationInviteUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutFeatureAccessInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutFeatureAccessInput, OrganizationUncheckedCreateWithoutFeatureAccessInput>
  }

  export type FeatureCreateWithoutOrgAccessesInput = {
    id?: string
    name: string
    slug: string
    isEnabled?: boolean
    createdAt?: Date | string
  }

  export type FeatureUncheckedCreateWithoutOrgAccessesInput = {
    id?: string
    name: string
    slug: string
    isEnabled?: boolean
    createdAt?: Date | string
  }

  export type FeatureCreateOrConnectWithoutOrgAccessesInput = {
    where: FeatureWhereUniqueInput
    create: XOR<FeatureCreateWithoutOrgAccessesInput, FeatureUncheckedCreateWithoutOrgAccessesInput>
  }

  export type OrganizationUpsertWithoutFeatureAccessInput = {
    update: XOR<OrganizationUpdateWithoutFeatureAccessInput, OrganizationUncheckedUpdateWithoutFeatureAccessInput>
    create: XOR<OrganizationCreateWithoutFeatureAccessInput, OrganizationUncheckedCreateWithoutFeatureAccessInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutFeatureAccessInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutFeatureAccessInput, OrganizationUncheckedUpdateWithoutFeatureAccessInput>
  }

  export type OrganizationUpdateWithoutFeatureAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutOrganizationCreatedNestedInput
    UserOrganization?: UserOrganizationUpdateManyWithoutOrganizationNestedInput
    telegramBot?: TelegramSettingUpdateManyWithoutOrgNestedInput
    OrganizationInvite?: OrganizationInviteUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutFeatureAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    UserOrganization?: UserOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput
    telegramBot?: TelegramSettingUncheckedUpdateManyWithoutOrgNestedInput
    OrganizationInvite?: OrganizationInviteUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type FeatureUpsertWithoutOrgAccessesInput = {
    update: XOR<FeatureUpdateWithoutOrgAccessesInput, FeatureUncheckedUpdateWithoutOrgAccessesInput>
    create: XOR<FeatureCreateWithoutOrgAccessesInput, FeatureUncheckedCreateWithoutOrgAccessesInput>
    where?: FeatureWhereInput
  }

  export type FeatureUpdateToOneWithWhereWithoutOrgAccessesInput = {
    where?: FeatureWhereInput
    data: XOR<FeatureUpdateWithoutOrgAccessesInput, FeatureUncheckedUpdateWithoutOrgAccessesInput>
  }

  export type FeatureUpdateWithoutOrgAccessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureUncheckedUpdateWithoutOrgAccessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserOrganizationCreateManyUserInput = {
    id?: string
    role?: $Enums.OrganizationUserRole | null
    organizationId: string
  }

  export type OrganizationCreateManyCreatedByInput = {
    id?: string
    number?: number | null
    name: string
    description?: string | null
    startedAt?: Date | string | null
    logoImage?: string | null
    Address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TelegramSettingCreateManyUserInput = {
    id?: string
    botToken: string
    chatId: string
    scope?: $Enums.Scope
    orgId?: string | null
    role?: $Enums.UserRole
    isEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOrganizationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
    organization?: OrganizationUpdateOneRequiredWithoutUserOrganizationNestedInput
  }

  export type UserOrganizationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type UserOrganizationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type OrganizationUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserOrganization?: UserOrganizationUpdateManyWithoutOrganizationNestedInput
    featureAccess?: OrganizationFeatureAccessUpdateManyWithoutOrganizationNestedInput
    telegramBot?: TelegramSettingUpdateManyWithoutOrgNestedInput
    OrganizationInvite?: OrganizationInviteUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserOrganization?: UserOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput
    featureAccess?: OrganizationFeatureAccessUncheckedUpdateManyWithoutOrganizationNestedInput
    telegramBot?: TelegramSettingUncheckedUpdateManyWithoutOrgNestedInput
    OrganizationInvite?: OrganizationInviteUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoImage?: NullableStringFieldUpdateOperationsInput | string | null
    Address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TelegramSettingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    scope?: EnumScopeFieldUpdateOperationsInput | $Enums.Scope
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    org?: OrganizationUpdateOneWithoutTelegramBotNestedInput
  }

  export type TelegramSettingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    scope?: EnumScopeFieldUpdateOperationsInput | $Enums.Scope
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TelegramSettingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    scope?: EnumScopeFieldUpdateOperationsInput | $Enums.Scope
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOrganizationCreateManyOrganizationInput = {
    id?: string
    userId: string
    role?: $Enums.OrganizationUserRole | null
  }

  export type OrganizationFeatureAccessCreateManyOrganizationInput = {
    id?: string
    featureId: string
    isEnabled?: boolean
  }

  export type TelegramSettingCreateManyOrgInput = {
    id?: string
    botToken: string
    chatId: string
    scope?: $Enums.Scope
    userId?: string | null
    role?: $Enums.UserRole
    isEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationInviteCreateManyOrganizationInput = {
    id?: string
    invitedBy: string
    email: string
    role?: $Enums.OrganizationUserRole | null
    token: string
    accepted?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type UserOrganizationUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
    user?: UserUpdateOneRequiredWithoutUserOrganizationNestedInput
  }

  export type UserOrganizationUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
  }

  export type UserOrganizationUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
  }

  export type OrganizationFeatureAccessUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    feature?: FeatureUpdateOneRequiredWithoutOrgAccessesNestedInput
  }

  export type OrganizationFeatureAccessUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureId?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrganizationFeatureAccessUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureId?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TelegramSettingUpdateWithoutOrgInput = {
    id?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    scope?: EnumScopeFieldUpdateOperationsInput | $Enums.Scope
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutTelegramBotNestedInput
  }

  export type TelegramSettingUncheckedUpdateWithoutOrgInput = {
    id?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    scope?: EnumScopeFieldUpdateOperationsInput | $Enums.Scope
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TelegramSettingUncheckedUpdateManyWithoutOrgInput = {
    id?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    scope?: EnumScopeFieldUpdateOperationsInput | $Enums.Scope
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationInviteUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    invitedBy?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
    token?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationInviteUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    invitedBy?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
    token?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationInviteUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    invitedBy?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumOrganizationUserRoleFieldUpdateOperationsInput | $Enums.OrganizationUserRole | null
    token?: StringFieldUpdateOperationsInput | string
    accepted?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationFeatureAccessCreateManyFeatureInput = {
    id?: string
    organizationId: string
    isEnabled?: boolean
  }

  export type OrganizationFeatureAccessUpdateWithoutFeatureInput = {
    id?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutFeatureAccessNestedInput
  }

  export type OrganizationFeatureAccessUncheckedUpdateWithoutFeatureInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrganizationFeatureAccessUncheckedUpdateManyWithoutFeatureInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
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