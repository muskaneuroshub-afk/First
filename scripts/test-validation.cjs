console.log('=== RUNNING CONTACT FORM VALIDATION UNIT TESTS ===');

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

function validateContactForm(data) {
  const errors = {};

  if (data.honeypot && data.honeypot.trim().length > 0) {
    errors.form = 'Spam submission detected.';
    return { isValid: false, errors };
  }

  const trimmedName = data.fullName.trim();
  if (!trimmedName) {
    errors.fullName = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Name must be at least 2 characters.';
  } else if (trimmedName.length > 100) {
    errors.fullName = 'Name must not exceed 100 characters.';
  }

  const trimmedEmail = data.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!validateEmail(trimmedEmail)) {
    errors.email = 'Please provide a valid email address.';
  }

  const trimmedSubject = data.subject.trim();
  if (!trimmedSubject) {
    errors.subject = 'Please enter a message subject.';
  } else if (trimmedSubject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  } else if (trimmedSubject.length > 150) {
    errors.subject = 'Subject must not exceed 150 characters.';
  }

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

// 1. Valid submission test
const valid = validateContactForm({
  fullName: 'Jane Doe-Smith',
  email: 'jane.smith@example.co.uk',
  subject: 'Engineering Opportunity Inquiry',
  message: 'Hello, we would love to connect with you regarding an upcoming architect role.',
});
if (!valid.isValid) {
  console.error('FAIL: Expected valid form to pass.', valid.errors);
  process.exit(1);
}
console.log('✔ PASS: Standard valid submission accepted.');

// 2. Honeypot bot rejection test
const bot = validateContactForm({
  fullName: 'Spam Bot',
  email: 'bot@spam.com',
  subject: 'Cheap SEO',
  message: 'Click this link to buy cheap followers immediately.',
  honeypot: 'filled_by_malicious_bot',
});
if (bot.isValid || !bot.errors.form) {
  console.error('FAIL: Honeypot failed to block bot.');
  process.exit(1);
}
console.log('✔ PASS: Honeypot blocked bot submission.');

// 3. Invalid email test
const badEmail = validateContactForm({
  fullName: 'Valid Name',
  email: 'invalid-email-format',
  subject: 'Valid Subject',
  message: 'Valid message body with sufficient length.',
});
if (badEmail.isValid || !badEmail.errors.email) {
  console.error('FAIL: Invalid email was not caught.');
  process.exit(1);
}
console.log('✔ PASS: Invalid email format caught.');

// 4. International name with accent & apostrophe test
const intlName = validateContactForm({
  fullName: "René D'Angelo-O'Connor",
  email: 'rene@example.com',
  subject: 'Design Systems Project',
  message: 'Great portfolio! Would love to chat about design tokens.',
});
if (!intlName.isValid) {
  console.error('FAIL: International accented name rejected.', intlName.errors);
  process.exit(1);
}
console.log('✔ PASS: Legitimate international name accepted.');

// 5. Short message test
const shortMsg = validateContactForm({
  fullName: 'Valid Name',
  email: 'valid@example.com',
  subject: 'Valid Subject',
  message: 'Too short',
});
if (shortMsg.isValid || !shortMsg.errors.message) {
  console.error('FAIL: Short message under 10 chars was not caught.');
  process.exit(1);
}
console.log('✔ PASS: Minimum message length boundary enforced.');

console.log('\n✔ ALL 5 VALIDATION UNIT SUITES PASSED (100%)\n');

