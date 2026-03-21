import Nav from "@/component/landing-main/nav";
import Footer from "@/component/landing-main/footer";
import Contact from "@/component/landing-main/contact";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-black">
      <Nav />
      <Contact />
      <Footer />
    </div>
  );
}
