import FeaturedClassesCarousel from "@/components/homePageUi/FeaturedClassesCarousel";
import FitnessJourneyTimeline from "@/components/homePageUi/Fitnessjourneytimeline";
import Hero from "@/components/homePageUi/Hero";
import LatestForumPosts from "@/components/homePageUi/LatestForumPosts";
import WhyChooseUs from "@/components/homePageUi/WhyChooseUs";

export default function Home() {
  return (
    <div className="">
      <Hero></Hero>
      <FeaturedClassesCarousel></FeaturedClassesCarousel>
      <WhyChooseUs></WhyChooseUs>
      <LatestForumPosts></LatestForumPosts>
      <FitnessJourneyTimeline></FitnessJourneyTimeline>
    </div>
  );
}
