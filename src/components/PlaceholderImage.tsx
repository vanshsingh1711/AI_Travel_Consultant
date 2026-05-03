type PlaceholderImageProps = {
  className?: string
  label?: string
}

export function PlaceholderImage({ className = '', label }: PlaceholderImageProps) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 text-center text-[10px] font-medium uppercase tracking-wider text-slate-500 ${className}`}
      role="img"
      aria-label={label ?? 'Image placeholder'}
    >
      {label ? <span className="px-2 opacity-70">{label}</span> : null}
    </div>
  )
}
