"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

type PasswordFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: "current-password" | "new-password";
};

export function PasswordField({
  id,
  value,
  onChange,
  onBlur,
  placeholder = "Mínimo 6 caracteres",
  required = true,
  minLength = 6,
  autoComplete = "current-password",
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
        <Lock size={18} aria-hidden />
      </div>
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500 transition-colors hover:text-slate-700"
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        aria-pressed={showPassword}
      >
        {showPassword ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
      </button>
    </div>
  );
}
