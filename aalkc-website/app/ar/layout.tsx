export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      lang="ar"
      dir="rtl"
      style={{ fontFamily: "'Noto Sans Arabic', Arial, sans-serif" }}
    >
      {children}
    </div>
  );
}
