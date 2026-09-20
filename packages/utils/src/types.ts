export type PasswordRuleProps = {
  id: string;
  label: string;
  test: (value: string) => boolean;
};
