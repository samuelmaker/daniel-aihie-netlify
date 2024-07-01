import Header from "./Header";

type Props = {
  children: React.ReactNode;
  isHeader?: boolean;
  className?: string;
};

const Layout = ({ children, isHeader = true, className }: Props) => {
  return (
    <>
      {isHeader && <Header className={className} />}
      <div className={`min-h-screen ${className}`}>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
