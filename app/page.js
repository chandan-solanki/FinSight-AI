import HeroSection from "@/components/HeroSection";
import { Card, CardContent } from "@/components/ui/card";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-25">
      {/* Hero Section */}
      <HeroSection />
      {/* Stats Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-8 max-md:grid-cols-2">
            {statsData.map((stat, index) => {
              return (
                <div key={index} className="text-center">
                  <h2 className="text-4xl max-lg:text-3xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </h2>
                  <p className="stat-label text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {featuresData.map((feature, index) => {
              return (
                <Card key={index} className={"p-6 "}>
                  <CardContent className={"space-y-4"}>
                    <div>{feature.icon}</div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/*How it's works */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1 max-sm:grid-cols-1">
            {howItWorksData.map((step, index) => {
              return (
                <div className="text-center" key={index}>
                  <div className="w-16 h-16 flex bg-blue-100 items-center justify-center rounded-full border mx-auto mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4"> {step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {testimonialsData.map((testi, index) => {
              return (
                <Card key={index} className={"p-6 "}>
                  <CardContent className={"pt-4"}>
                    <div className="flex items-center mb-4 gap-3">
                      <Image
                        src={testi.image}
                        alt={testi.name}
                        className="rounded-full"
                        width={40}
                        height={40}
                      />
                      <div className="ml-">
                        <div className="font-semibold">{testi.name}</div>
                        <div className="text-sm text-gray-600">
                          {testi.role}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600">{testi.quote}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl max-lg:text-2xl font-bold text-center mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl max-sm:text-sm text-gray-700 mb-8">
            Smarter Money Decisions, Powered by FinSight AI.
          </p>
          <Link
            href="/dashboard"
            className="animate-bounce inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition max-sm:px-4 max-sm:py-3"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
