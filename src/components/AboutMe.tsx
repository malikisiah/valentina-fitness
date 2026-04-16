"use client"
import Image from "next/image"
import aboutMe from "../../public/about_me.jpg"
import FadeIn from "./FadeIn"
import { Translations } from "~/lib/i18n"

export default function AboutMe({ t }: { t: Translations["about"] }) {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <FadeIn className="lg:pr-4">
            <div className="relative overflow-hidden rounded-3xl bg-primary shadow-2xl lg:max-w-lg">
              <Image
                alt="Valentina Fernandez"
                src={aboutMe}
                className="size-full rounded-3xl object-cover"
              />
            </div>
          </FadeIn>
          <div>
            <div className="text-base/7 text-foreground lg:max-w-lg">
              <FadeIn delay={0.1}>
                <p className="text-base/7 font-semibold text-primary">
                  {t.tagline}
                </p>
              </FadeIn>
              <div className="max-w-xl">
                <FadeIn delay={0.2}>
                  <p className="mt-6">{t.p1}</p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p className="mt-8">{t.p2}</p>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <p className="mt-8">{t.p3}</p>
                </FadeIn>
                <FadeIn delay={0.5}>
                  <p className="mt-8">{t.p4}</p>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
