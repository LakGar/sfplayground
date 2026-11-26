import AboutNetwork from "@/components/about-network";
import Faq from "@/components/faq";
import Featured from "@/components/featured";
import Footer from "@/components/footer";
import PartnerMarquee from "@/components/partner-marquee";
import PreviousEvents from "@/components/previous-events";
import CTAWithVerticalMarquee from "@/components/ui/cta-with-text-marquee";
import { FadeInView } from "@/components/ui/fade-in-view";
import UpcomingEvents from "@/components/upcoming-events";
import { getPublicEventLists } from "@/lib/public-events";

export default async function HomepageSections() {
  const { upcoming, previous } = await getPublicEventLists();
  return (<>
      <FadeInView direction="up">
        <UpcomingEvents events={upcoming} />
      </FadeInView>

      <FadeInView direction="down">
        <PartnerMarquee />
      </FadeInView>

      <FadeInView direction="up">
        <AboutNetwork />
      </FadeInView>

      <PreviousEvents events={previous} limit={6} showViewAll />

      <FadeInView direction="up">
        <Featured />
      </FadeInView>

      <Faq />

      <FadeInView direction="up" delay={0.08}>
        <CTAWithVerticalMarquee />
      </FadeInView>

      <FadeInView direction="up" delay={0.08}>
        <Footer />
      </FadeInView>
  </>);
}
