import Header from "@/components/header2";
import Footer from "@/components/footer"


export default function BasketLayout({ children }) {
    return(
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}