export function PageIntro({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="container page-intro"><h1>{title}</h1><div className="intro-description">{children}</div></div>;
}
