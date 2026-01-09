// app/page.tsx
export const dynamic = "force-dynamic";

import Benefits from "./components/home/Benefits";
import BlogPreview from "./components/home/BlogPreview";
import Categories from "./components/home/Categories";
import FeaturedBooks from "./components/home/FeaturedBooks";
import Hero from "./components/home/Hero";
import Newsletter from "./components/home/NewsLetter";



export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedBooks />
      <Benefits />
      <div className="grid grid-cols-2 mx-auto px-6 py-16 gap-10">
        <BlogPreview />
        <Newsletter />
      </div>
    </>
  );
}
