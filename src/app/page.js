import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}
