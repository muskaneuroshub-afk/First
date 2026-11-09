export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateString: string): string {
  if (!dateString || dateString.toLowerCase() === 'present') {
    return 'Present';
  }
  return dateString;
}

