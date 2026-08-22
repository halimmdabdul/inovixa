import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const fieldStyles =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-foreground placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";

function FieldWrapper({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {optional ? <span className="ml-1 font-normal text-slate-400">(optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  optional?: boolean;
};

export function InputField({ label, error, optional, id, className, ...props }: InputFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id!} error={error} optional={optional}>
      <input
        id={id}
        className={cn(fieldStyles, error && "border-red-400", className)}
        aria-invalid={Boolean(error)}
        {...props}
      />
    </FieldWrapper>
  );
}

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  optional?: boolean;
};

export function TextareaField({
  label,
  error,
  optional,
  id,
  className,
  rows = 4,
  ...props
}: TextareaFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id!} error={error} optional={optional}>
      <textarea
        id={id}
        rows={rows}
        className={cn(fieldStyles, "resize-none", error && "border-red-400", className)}
        aria-invalid={Boolean(error)}
        {...props}
      />
    </FieldWrapper>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  optional?: boolean;
  options: readonly string[];
  placeholder?: string;
};

export function SelectField({
  label,
  error,
  optional,
  id,
  className,
  options,
  placeholder = "Select an option",
  ...props
}: SelectFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id!} error={error} optional={optional}>
      <select
        id={id}
        className={cn(fieldStyles, error && "border-red-400", className)}
        aria-invalid={Boolean(error)}
        {...(props.value === undefined ? { defaultValue: "" } : {})}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
