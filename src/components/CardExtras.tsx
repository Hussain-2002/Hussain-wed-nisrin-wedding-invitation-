export function CornerMarks() {
  return (
    <>
      <span className="corner corner--tl" aria-hidden />
      <span className="corner corner--tr" aria-hidden />
      <span className="corner corner--bl" aria-hidden />
      <span className="corner corner--br" aria-hidden />
    </>
  );
}

export function CityStamps() {
  const stamps = [
    { city: "Ujjain", mark: "02 AUG" },
    { city: "Chechat", mark: "03 AUG" },
    { city: "Indore", mark: "06 AUG" },
  ];

  return (
    <ul className="stamp-row">
      {stamps.map((stamp) => (
        <li key={stamp.city} className="stamp">
          <span className="stamp__city">{stamp.city}</span>
          <span className="stamp__mark">{stamp.mark}</span>
        </li>
      ))}
    </ul>
  );
}

export function Khatam({ className = "" }: { className?: string }) {
  return (
    <div className={`khatam ${className}`} aria-hidden>
      <span />
      <svg viewBox="0 0 40 40">
        <rect x="11" y="11" width="18" height="18" />
        <rect x="11" y="11" width="18" height="18" transform="rotate(45 20 20)" />
      </svg>
      <span />
    </div>
  );
}

export function WaxSeal() {
  return (
    <div className="wax" aria-hidden>
      <span>H · N</span>
    </div>
  );
}
