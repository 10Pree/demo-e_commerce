import Header from "@/components/header";
import Footer from "@/components/footer"

export default function ProfileLayout({ children }) {
    return(
        <div>
            <Header/>
            { children}
            <Footer/>
        </div>
    )
}