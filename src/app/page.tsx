import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AppSection from "@/components/AppSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AppSection />
      <section className="h-screen bg-primary-100 flex items-center justify-center">
        <p className="text-4xl font-bold text-white">Keep scrolling</p>
      </section>
    </main>
  );
}
