import type { ContactFormData, FormSubmissionResult } from '../types';

/**
 * Checks whether the backend API URL is configured.
 * Shows the unconfigured banner if VITE_API_BASE_URL is missing or empty.
 */
export function isContactFormConfigured(): boolean {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return Boolean(baseUrl && baseUrl.trim().length > 0 && !baseUrl.includes('placeholder'));
}

/**
 * Submits the contact form to the custom backend API: POST /api/contact
 * Returns { success, message, isConfigured } matching FormSubmissionResult.
 */
export async function submitContactForm(
  data: ContactFormData,
): Promise<FormSubmissionResult> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!isContactFormConfigured() || !baseUrl) {
    return {
      success: false,
      message:
        'The contact form backend is not configured yet. Please configure VITE_API_BASE_URL or reach out via email directly.',
      isConfigured: false,
    };
  }

  const endpoint = `${baseUrl.replace(/\/+$/, '')}/api/contact`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const payload = {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
      honeypot: data.honeypot?.trim() || undefined,
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const result = await response.json().catch(() => null);

    if (response.status === 201) {
      return {
        success: true,
        message:
          result?.message ||
          "Thank you! Your message has been received. I'll get back to you as soon as possible.",
        isConfigured: true,
      };
    }

    if (response.status === 400) {
      if (result?.errors && typeof result.errors === 'object') {
        const errorMessages = Object.values(result.errors)
          .flat()
          .filter(Boolean)
          .join('. ');
        return {
          success: false,
          message: errorMessages || result?.message || 'Please check the highlighted fields and try again.',
          isConfigured: true,
        };
      }
      return {
        success: false,
        message: result?.message || 'Invalid form submission. Please check your entries.',
        isConfigured: true,
      };
    }

    if (response.status === 429) {
      return {
        success: false,
        message:
          result?.message ||
          'You have sent too many messages recently. Please wait a few minutes before trying again.',
        isConfigured: true,
      };
    }

    return {
      success: false,
      message:
        result?.message ||
        'Something went wrong while sending your message. Please try again or use direct email.',
      isConfigured: true,
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        success: false,
        message: 'The request timed out. Please check your connection and try again.',
        isConfigured: true,
      };
    }

    return {
      success: false,
      message:
        'Could not connect to the server. Please check your internet connection or reach out via direct email.',
      isConfigured: true,
    };
  }
}
