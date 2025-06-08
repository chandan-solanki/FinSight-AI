import HeroSection from "@/components/HeroSection";
import { statsData } from "@/data/landing";

export default function Home() {
  return (
    <div className="mt-30">
      <HeroSection />
      <section>
        <div>
          <div className="stats-data">
            {statsData.map((stat, index) => {
              return (
                <div key={index} className="stat-item">
                  <h2 className="stat-value">{stat.value}</h2>
                  <p className="stat-label">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div></div>
    </div>
  );
}
