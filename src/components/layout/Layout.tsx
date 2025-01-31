import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen bg-gray-100">
    <Header />
    <main className="container mx-auto px-4 py-8">{children}</main>
  </div>
);

export default Layout;
