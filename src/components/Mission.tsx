"use client"
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid"
import { Translations } from "~/lib/i18n"
import FadeIn from "./FadeIn"

const icons = [CloudArrowUpIcon, LockClosedIcon, ArrowPathIcon]

export default function Mission({ t }: { t: Translations["mission"] }) {
  return (
    <div id="mission" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <FadeIn>
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl lg:text-balance">
              {t.title}
            </h2>
          </FadeIn>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {t.features.map((feature, i) => {
              const Icon = icons[i]
              return (
                <FadeIn key={feature.name} delay={0.15 * (i + 1)}>
                  <div className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-foreground">
                      <Icon
                        aria-hidden="true"
                        className="size-5 flex-none text-primary"
                      />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base/7 text-muted-foreground">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                </FadeIn>
              )
            })}
          </dl>
        </div>
      </div>
    </div>
  )
}
