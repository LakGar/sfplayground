"use client";

import { PP_GLANCE } from "@/data/pitch-playoffs-page-data";
import { StatCountUp } from "@/components/ui/stat-count-up";
import {
  PPRevealItem,
  PPRevealStagger,
} from "@/components/pitch-playoffs/pp-reveal";

export default function PPAtAGlance() {
  return (
    <section className="pp-glance" aria-label="At a glance">
      <div className="pp-container pp-glance-inner">
        <PPRevealStagger className="pp-glance-stats" stagger={0.12}>
          {PP_GLANCE.stats.map((stat, index) => (
            <PPRevealItem key={stat.label}>
              <div className="pp-glance-stat">
                <p className="pp-glance-value">
                  <StatCountUp
                    end={stat.end}
                    prefix={stat.prefix ?? ""}
                    suffix={stat.suffix ?? ""}
                    delay={index * 0.12}
                    className="pp-glance-value-inner"
                  />
                </p>
                <p className="pp-glance-stat-label">{stat.label}</p>
              </div>
            </PPRevealItem>
          ))}
        </PPRevealStagger>
      </div>
    </section>
  );
}
