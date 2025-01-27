import { Button } from "@/components/ui/button"
import type { Media } from "@/payload-types"

interface Props {
  cta: {
    title: string;
    description?: string | null;
    images?: Array<{
      image: Media;
    }> | null;
    buttons?: Array<{
      label: string;
      variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary';
      link?: {
        newTab?: boolean | null;
        url?: string | null;
      } | null;
    }> | null;
  };
}

const CTA5: React.FC<Props> = ({ cta }) => {
  return (
    <section className="py-32">
      <div className="max-w-full overflow-hidden border-y border-border bg-accent pt-10 md:pt-16 lg:pt-20">
        <div className="container relative flex flex-col md:flex-row md:space-x-12">
          <div className="mb-[18rem] md:mb-28 md:w-2/3 lg:shrink-0 xl:mb-20 xl:w-1/2">
            <h3 className="mb-3 text-4xl font-semibold md:mb-4 md:text-5xl lg:mb-6">
              {cta.title}
            </h3>
            <p className="mb-8 text-muted-foreground lg:text-lg">
              {cta.description}
            </p>
            {cta.buttons?.[0] && (
              <Button asChild variant={cta.buttons[0].variant}>
                <a
                  href={cta.buttons[0].link?.url || "#"}
                  target={cta.buttons[0].link?.newTab ? "_blank" : undefined}
                  rel={cta.buttons[0].link?.newTab ? "noopener noreferrer" : undefined}
                >
                  {cta.buttons[0].label}
                </a>
              </Button>
            )}
          </div>
          <div className="absolute bottom-0 right-1/2 mr-6 h-min w-[110%] max-w-md translate-x-1/2 md:-right-36 md:mr-0 md:w-3/4 md:max-w-xl md:translate-x-0 lg:mt-auto xl:relative xl:right-0 xl:h-full xl:w-full xl:max-w-full">
            <div className="relative aspect-[8/5] h-full min-h-[16rem] w-full">
              {cta.images?.map((item, index) => (
                <div
                  key={index}
                  className={`absolute right-0 top-0 z-40 flex aspect-[3/5] w-3/5 items-center justify-center overflow-clip rounded-3xl bg-background shadow-2xl shadow-foreground/20 ${
                    index === 0
                      ? "-translate-x-[24%] translate-y-[24%] -rotate-[30deg] md:max-xl:-translate-x-[8%] md:max-xl:translate-y-[16%]"
                      : index === 1
                      ? "-translate-x-[16%] translate-y-[8%] -rotate-[15deg] md:max-xl:-translate-x-[6%] md:max-xl:translate-y-[6%]"
                      : ""
                  }`}
                >
                  {item.image.url && (
                    <img
                      src={item.image.url}
                      alt={item.image.alt || "Feature image"}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA5 