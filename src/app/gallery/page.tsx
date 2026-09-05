import { PageHeader } from "@/components/common/PageHeader";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { site } from "@/data/site";

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from the branch"
        description="Build nights, demo days, competitions and the people who make them happen."
      />
      <section className="py-20">
        <div className="container-page">
          <GalleryGrid />
        </div>
      </section>
      <JoinCTA />
    </>
  );
}
