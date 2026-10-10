export function ArabicNames({
  className = "",
}: {
  className?: string;
}) {
  return (
    <p lang="ar" dir="rtl" className={`arabic-name ${className}`}>
      حسين و نسرين
    </p>
  );
}
