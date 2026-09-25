export function BeanMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <ellipse cx="16" cy="16" rx="10.5" ry="14" transform="rotate(35 16 16)" fill="currentColor" />
      <path
        d="M9.2 25.4c5.4-3.2 2.4-9.6 6.8-13.4 2.6-2.3 5.7-2.6 7.4-5.1"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
