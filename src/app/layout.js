import './globals.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header class="h-16 bg-[#1F2937]">
          <div class="h-full container-auto px-6 flex justify-between items-center">
            <span class="font-poppins font-semibold text-2xl text-white tracking-wide">
              blog.
            </span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
