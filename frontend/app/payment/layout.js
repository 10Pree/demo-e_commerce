import Header from "@/components/header2";
import Footer from "@/components/footer"

export default function PaymentLayout({ children }) {
    return(
        <div>
            <Header/>
            { children }
            <Footer/>
        </div>
    )
}