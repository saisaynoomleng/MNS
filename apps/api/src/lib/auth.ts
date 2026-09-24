import { betterAuth } from 'better-auth';
import env from './env.js';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db, {
  AccountsTable,
  RateLimitsTable,
  SessionsTable,
  UsersTable,
  VerificationsTable,
} from '../db/index.js';
import { admin, createAccessControl, emailOTP } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';
import schema from '../db/index.js';
import { signUpVerification } from '../modules/auth/signUpVerification.js';
import { welcomeEmail } from '../modules/auth/welcomeEmail.js';

const statement = {
  user: [
    'create',
    'list',
    'set-role',
    'ban',
    'impersonate',
    'impersonate-admins',
    'delete',
    'set-password',
  ],
  session: ['list', 'revoke', 'delete'],
} as const;

const ac = createAccessControl(statement);

const userRole = ac.newRole({
  user: ['create'],
});

const adminRole = ac.newRole({
  user: [
    'create',
    'list',
    'set-role',
    'ban',
    'impersonate',
    'delete',
    'set-password',
  ],
  session: ['list', 'revoke'],
});
const superadmin = ac.newRole({
  user: [
    'create',
    'list',
    'set-role',
    'ban',
    'impersonate',
    'impersonate-admins',
    'delete',
    'set-password',
  ],
  session: ['list', 'revoke', 'delete'],
});

export const auth = betterAuth({
  appName: env.APP_NAME,

  plugins: [
    emailOTP({
      expiresIn: env.OTP_EXPIRES_IN,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === 'change-email') {
          // change email
        } else if (type === 'email-verification') {
          // email verification
        } else if (type === 'forget-password') {
          // email verification
        } else if (type === 'sign-in') {
          // email verification
        }
      },
      changeEmail: {
        enabled: true,
      },
      otpLength: 6,
      sendVerificationOnSignUp: true,
      disableSignUp: true,
    }),
    admin({
      ac,
      defaultRole: 'user',
      bannedUserMessage: `You've been banned`,
      defaultBanReason: 'Spamming',
      roles: {
        user: userRole,
        admin: adminRole,
        superadmin,
      },
    }),
    nextCookies(),
  ],

  baseURL: {
    allowedHosts: [
      'localhost:3000',
      'localhost:3001',
      'localhost:3002',
      'localhost:8000',
      'localhost:4000',
      '*.mnsart.com',
    ],
    protocol: env.NODE_ENV === 'production' ? 'https' : 'http',
  },

  trustedOrigins: [env.ALLOW_ORIGINS, 'https://*.mnsart.com'],

  secret: env.BETTER_AUTH_SECRET,

  database: drizzleAdapter(db, {
    provider: 'pg',
    camelCase: true,
    schema: {
      ...schema,
      users: UsersTable,
      sessions: SessionsTable,
      accounts: AccountsTable,
      verifications: VerificationsTable,
      rate_limits: RateLimitsTable,
    },
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    revokeSessionsOnPasswordReset: true,
    onExistingUserSignUp: async ({ user }) => {
      // existing sign up email
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      void signUpVerification({ name: user.name, email: user.email, url });
    },
    afterEmailVerification: async (user) => {
      void welcomeEmail({ name: user.name, email: user.email });
    },
  },

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    linkedin: {
      clientId: env.LINKEDIN_CLIENT_ID,
      clientSecret: env.LINKEDIN_CLIENT_SECRET,
    },
  },

  //   user
  user: {
    modelName: 'users',
    fields: {
      email: 'email',
      name: 'name',
      image: 'imageUrl',
    },
    additionalFields: {
      companyName: {
        type: 'string',
      },
      position: {
        type: 'string',
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url, token }) => {
        // delete email
      },
    },
  },

  //   sesseion
  session: {
    modelName: 'sessions',
    fields: {
      userId: 'userId',
    },
    expiresIn: env.SESSION_EXPIRES_IN,
    updateAge: env.SESSION_UPDATE_AGE,
    cookieCache: {
      enabled: true,
      maxAge: env.SESSION_COOKIE_CACHE_MAX_AGE,
    },
  },

  //   account
  account: {
    modelName: 'accounts',
    fields: {
      userId: 'userId',
    },
    encryptOAuthTokens: true,
    storeStateStrategy: 'database',
    storeAccountCookie: true,
    accountLinking: {
      enabled: true,
      trustedProviders: [
        'google',
        'facebook',
        'linkedin',
        'tiktok',
        'email-password',
      ],
      allowDifferentEmails: false,
    },
  },

  //   verification
  verification: {
    modelName: 'verifications',
    disableCleanup: false,
    storeIdentifier: 'hashed',
    storeInDatabase: true,
  },

  //   rate limit
  rateLimit: {
    enabled: true,
    window: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX_REQUESTS,
    modelName: 'rate_limits',
    storage: 'database',
  },

  //   advanced
  advanced: {
    database: {
      generateId: 'uuid',
    },
    crossSubDomainCookies: {
      enabled: true,
      domain: '.mnsart.com',
    },
  },
});
