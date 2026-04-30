'use client';

import { useForm, ValidationError } from '@formspree/react';

export default function ApplyForm() {
  const [state, handleSubmit] = useForm('xrejgzkw');
  if (state.succeeded) {
    return <p>Thank you! We will be in touch within 1-2 business days.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" required />
      <ValidationError field="email" prefix="Email" errors={state.errors} />
      <button type="submit" disabled={state.submitting}>
        {state.submitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}
