export const metadata = {
  title: "Kambaz",
  description: "Kambaz Learning Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Kambaz</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}