import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

const base =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 min-h-[44px] text-[15px]";

export interface FieldProps {
  label?: string;
  error?: string;
  hint?: string;
}

function FieldWrap({ label, error, hint, children, id }: FieldProps & { children: React.ReactNode; id?: string }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p className="mt-1.5 text-sm text-rose-600" role="alert">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, FieldProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, className = "", ...rest },
  ref
) {
  const inputId = id || `input-${rest.name}`;
  return (
    <FieldWrap label={label} error={error} hint={hint} id={inputId}>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        className={`${base} h-11 ${error ? "border-rose-500" : ""} ${className}`}
        {...rest}
      />
    </FieldWrap>
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, id, className = "", ...rest },
  ref
) {
  const inputId = id || `ta-${rest.name}`;
  return (
    <FieldWrap label={label} error={error} hint={hint} id={inputId}>
      <textarea
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        className={`${base} py-2.5 ${error ? "border-rose-500" : ""} ${className}`}
        {...rest}
      />
    </FieldWrap>
  );
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, FieldProps {
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, id, options, className = "", ...rest },
  ref
) {
  const inputId = id || `select-${rest.name}`;
  return (
    <FieldWrap label={label} error={error} hint={hint} id={inputId}>
      <select
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        className={`${base} h-11 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_0.75rem_center] bg-no-repeat pr-10 ${error ? "border-rose-500" : ""} ${className}`}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </FieldWrap>
  );
});
