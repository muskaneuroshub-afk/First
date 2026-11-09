export interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
  form?: string;
}

export function validateEmail(email: string): boolean {
  // RFC 5322 compliant email regex accepting unicode domains and standard formats
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

export function validateContactForm(data: {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};

  // Honeypot check (bot prevention)
  if (data.honeypot && data.honeypot.trim().length > 0) {
    errors.form = 'Spam submission detected.';
    return { isValid: false, errors };
  }

  // Full Name validation: allows spaces, accents, hyphens, apostrophes
  const trimmedName = data.fullName.trim();
  if (!trimmedName) {
    errors.fullName = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Name must be at least 2 characters.';
  } else if (trimmedName.length > 100) {
    errors.fullName = 'Name must not exceed 100 characters.';
  }

  // Email validation
  const trimmedEmail = data.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!validateEmail(trimmedEmail)) {
    errors.email = 'Please provide a valid email address (e.g. name@domain.com).';
  }

  // Subject validation
  const trimmedSubject = data.subject.trim();
  if (!trimmedSubject) {
    errors.subject = 'Please enter a message subject.';
  } else if (trimmedSubject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  } else if (trimmedSubject.length > 150) {
    errors.subject = 'Subject must not exceed 150 characters.';
  }

  // Message validation
  const trimmedMessage = data.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please enter your message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  } else if (trimmedMessage.length > 3000) {
    errors.message = 'Message must not exceed 3,000 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

