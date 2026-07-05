import Image from "next/image";

export interface TimelineChapterProps {
  chapter: {
    heading: string;
    image_ref: string;
    image_alt: string;
    image_position: "left" | "right";
    body: string;
  };
  side: "left" | "right";
  isLast?: boolean;
}

export function TimelineChapter({
  chapter,
  side,
  isLast,
}: TimelineChapterProps) {
  if (side === "right") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 relative pb-12 md:pb-20">
        {/* Dot on the center line at heading level */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#111] z-10 hidden md:block"
          style={{ top: "250px" }}
        />

        {/* Mask to hide global line below the last dot */}
        {isLast && (
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[3px] bg-[#F0EDE8] z-0 -bottom-20"
            style={{ top: "250px" }}
          />
        )}

        {/* Left column — empty */}
        <div className="hidden md:block" />

        {/* Right column — content */}
        <div className="md:pl-16 pt-4 px-6 md:px-0">
          <div className="w-full max-w-[460px] mx-auto md:mx-0">
            <div className="relative w-full sm:max-w-[460px] md:max-w-[350px] aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] rounded-xl md:rounded-lg overflow-hidden mb-6 bg-[#E8E4DC] mx-auto md:mx-0">
              <Image
                fill
                src={chapter.image_ref}
                alt={chapter.image_alt}
                className="object-cover"
              />
            </div>
            <h2 className="font-display text-[26px] md:text-[30px] text-[#111] font-semibold mb-3 text-center md:text-left">
              {chapter.heading}
            </h2>
            <p className="text-[15px] text-[#555] leading-relaxed text-center md:text-left">
              {chapter.body}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 relative pb-12 md:pb-20">
      {/* Dot on the center line at heading level */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#111] z-10 hidden md:block"
        style={{ top: "250px" }}
      />

      {/* Mask to hide global line below the last dot */}
      {isLast && (
        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[3px] bg-[#F0EDE8] z-0 -bottom-20"
          style={{ top: "250px" }}
        />
      )}

      {/* Left column — content */}
      <div className="md:pr-16 pt-4 px-6 md:px-0">
        <div className="w-full max-w-[460px] mx-auto md:ml-auto md:mr-0">
          <div className="relative w-full sm:max-w-[460px] md:max-w-[350px] aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] rounded-xl md:rounded-lg overflow-hidden mb-6 bg-[#E8E4DC] mx-auto md:mx-0">
            <Image
              fill
              src={chapter.image_ref}
              alt={chapter.image_alt}
              className="object-cover"
            />
          </div>
          <h2 className="font-display text-[26px] md:text-[30px] text-[#111] font-semibold mb-3 text-center md:text-left">
            {chapter.heading}
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed text-center md:text-left">
            {chapter.body}
          </p>
        </div>
      </div>

      {/* Right column — empty */}
      <div className="hidden md:block" />
    </div>
  );
}
