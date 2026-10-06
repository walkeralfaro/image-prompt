export function CustomInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-app-cream">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-app-border bg-app-bg px-3 py-2 text-sm text-app-cream outline-none placeholder:text-app-muted/60 focus:border-app-accent"
      />
    </label>
  );
}
