import React, { useState, useRef } from 'react';
import { signInWithGoogle, signInWithGitHub, signInWithMicrosoft } from '../services/firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const modalRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const auth = getAuth();
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: email.split('@')[0],
        });
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin(userCredential.user);
      onClose();
    } catch (err) {
      const messages = {
        'auth/user-not-found': 'No account found. Try signing up instead.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/email-already-in-use': 'Email already registered. Try signing in.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/invalid-email': 'Please enter a valid email address.',
      };
      setError(messages[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSSO = async (provider) => {
    setError('');
    setLoading(true);
    try {
      let result;
      if (provider === 'google') result = await signInWithGoogle();
      else if (provider === 'github') result = await signInWithGitHub();
      else if (provider === 'microsoft') result = await signInWithMicrosoft();
      onLogin(result.user);
      onClose();
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') return;
      if (err.code === 'auth/account-exists-with-different-credential') {
        setError('An account already exists with this email. Try a different sign-in method.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-[440px] bg-surface border border-outline rounded-xl flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Subtle Gradient Line Top */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-tertiary to-inverse-primary"></div>
        
        {/* Close Button Absolute */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full hover:bg-on-surface/10 text-on-surface-variant transition-colors z-10"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center mx-auto mb-4 border border-outline">
              <span className="material-symbols-outlined text-primary text-2xl">shield_lock</span>
            </div>
            <h2 className="text-2xl font-bold text-on-surface tracking-tight font-headline-md mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-on-surface-variant">
              {isSignUp ? 'Sign up to start verifying media' : 'Sign in to access your secure workspace'}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/30 rounded-lg flex items-start gap-2">
              <span className="material-symbols-outlined text-error text-[18px] mt-0.5">error</span>
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="space-y-5">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">mail</span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface-container border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-on-surface placeholder:text-on-surface-variant/60 transition-all"
                  placeholder="name@company.com"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">lock</span>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-surface-container border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-on-surface placeholder:text-on-surface-variant/60 transition-all"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Options */}
            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-outline bg-surface-container text-primary focus:ring-primary/50 focus:ring-offset-surface cursor-pointer" 
                  />
                  <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group flex items-center justify-center gap-2 w-full py-3 px-4 bg-inverse-primary text-white rounded-lg font-medium hover:bg-inverse-primary/90 focus:ring-4 focus:ring-inverse-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? (
                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
              ) : (
                <>
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                  <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <p className="text-center text-sm text-on-surface-variant mt-4">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="text-primary font-medium hover:text-primary/80 transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-outline"></div>
            <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Or continue with</span>
            <div className="flex-1 h-px bg-outline"></div>
          </div>

          {/* SSO Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {/* Google */}
            <button
              onClick={() => handleSSO('google')}
              disabled={loading}
              type="button"
              className="flex items-center justify-center p-2.5 border border-outline rounded-lg bg-surface-container hover:bg-outline-variant/30 transition-colors active:scale-95 disabled:opacity-50"
              aria-label="Sign in with Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </button>
            {/* GitHub */}
            <button
              onClick={() => handleSSO('github')}
              disabled={loading}
              type="button"
              className="flex items-center justify-center p-2.5 border border-outline rounded-lg bg-surface-container hover:bg-outline-variant/30 text-on-surface transition-colors active:scale-95 disabled:opacity-50"
              aria-label="Sign in with GitHub"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </button>
            {/* Microsoft */}
            <button
              onClick={() => handleSSO('microsoft')}
              disabled={loading}
              type="button"
              className="flex items-center justify-center p-2.5 border border-outline rounded-lg bg-surface-container hover:bg-outline-variant/30 transition-colors active:scale-95 disabled:opacity-50"
              aria-label="Sign in with Microsoft"
            >
              <svg className="w-5 h-5" viewBox="0 0 21 21">
                <path fill="#f25022" d="M1 1h9v9H1z" />
                <path fill="#00a4ef" d="M1 11h9v9H1z" />
                <path fill="#7fba00" d="M11 1h9v9h-9z" />
                <path fill="#ffb900" d="M11 11h9v9h-9z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container border-t border-outline flex justify-center gap-4 text-xs text-on-surface-variant">
          <a href="#" className="hover:text-on-surface transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-on-surface transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-on-surface transition-colors">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
