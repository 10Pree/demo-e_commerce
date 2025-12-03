import Header from "@/components/header2";
import Footer from "@/components/footer"


export const metadata = {
  title: "Shop",
  description: "App shop",
};

export default function ProfileLayout({ children }) {
  return (
    <div>
        <Header/>
        {children}
        <Footer/>
    </div>
  );
}
