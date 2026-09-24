//================================
// Shared Props
//================================

export type PasswordRuleProps = {
  id: string;
  label: string;
  test: (value: string) => boolean;
};

export type MediaProps = {
  src: string;
  alt: string;
};

export type CallToActionProps = {
  label: string;
  href: string;
};

export type PageParamsProps = {
  params: Promise<{ slug: string }>;
};

export type ActionResponse<T> =
  | {
      success: true;
      message: string;
      data?: T;
    }
  | {
      success: false;
      message: string;
      field?: keyof T;
    };

export type ImageResponse =
  { success: true; file: File } | { success: false; message: string };

export type OAuthProviders = 'google' | 'linkedIn' | 'facebook' | 'tiktok';

//================================
// Email Props
//================================
export type OTPValidationEmailProps = {
  otp: number;
  expiresAt?: number;
  name: string;
};

export type SignUpVerificationEmailProps = {
  name: string;
  url: string;
  expiresAt?: number;
};

export type WelcomeEmailProps = {
  name: string;
};
