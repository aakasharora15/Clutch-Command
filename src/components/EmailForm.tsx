'use client';

import { useState } from 'react';
import { z } from 'zod';
import styles from './EmailForm.module.css';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate email
      emailSchema.parse({ email });
      
      setStatus('loading');
      
      // Simulate API call for now (Supabase integration pending keys)
      // In a real app we would POST to /api/subscribe
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('You are on the list. Prepare for two more points.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      if (error instanceof z.ZodError) {
        setMessage((error as any).errors[0].message);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={styles.input}
            disabled={status === 'loading' || status === 'success'}
            required
          />
          <button 
            type="submit" 
            className={styles.button}
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? 'Joining...' : 'Secure Waitlist Spot'}
          </button>
        </div>
      </form>
      {message && (
        <p className={`${styles.message} ${status === 'success' ? styles.success : styles.error}`}>
          {message}
        </p>
      )}
    </div>
  );
}
