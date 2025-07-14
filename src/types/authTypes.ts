interface AuthFormLayoutProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  submitLabel: string;
  isSubmitting: boolean;
}
