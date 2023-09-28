// import Footer from './Footer'
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {<Header />}
      <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto">
        {children}
      </div>
      {/* <Footer /> */}
    </>
  );
}
