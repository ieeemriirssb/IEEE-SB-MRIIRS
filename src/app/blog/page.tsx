import { PageHeader } from "@/components/common/PageHeader";
import { BlogCard } from "@/components/cards";
import { Newsletter } from "@/components/sections/Newsletter";
import { posts, site } from "@/data/site";
import { Reveal } from "@/components/common/Reveal";
import { JoinCTA } from "@/components/sections/JoinCTA";

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Writing from our members"
        description="Explainers, roadmaps and field notes written by students and mentors of the branch."
      />
      <section className="py-20">
        <div className="container-page grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </div>
      </section>
      <JoinCTA />
      {/* <Newsletter /> */}
    </>
  );
}
