import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Next.js'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
