"use client";
import React from "react";
import LandingNavbar from "@/components/landing/landingNavbar";
import Hero from "@/components/landing/hero";
import Testimonial from "@/components/landing/testimonial";
import Footer from "@/components/landing/footer";
import FeaturesSection from "@/components/landing/features";
import PlanSection from "@/components/landing/pricing";

import HowItWorksSection from "@/components/landing/howItWorks";
const Page = () => {
  return (
    <div className="bg-background min-h-screen">
      <LandingNavbar />
      <main className="pt-16"> {/* Add padding-top to account for fixed navbar */}
        <Hero />
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="how-it-works">
          <HowItWorksSection />
        </section>
        <section id="plans">
          <PlanSection />
        </section>
        <section id="testimonials">
          <Testimonial />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
