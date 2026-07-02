import HeroSection from '@/components/HeroSection'
import EntryCard from '@/components/EntryCard'
import { icons } from '@/components/icons'
import { homeData } from '@/data/home'
import { contacts } from '@/data/contacts'

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <HeroSection
        name={homeData.name}
        tagline={homeData.tagline}
        subtitle={homeData.subtitle}
      />

      <section className="max-w-content mx-auto px-8 w-full pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {homeData.entries.map(entry => (
            <EntryCard
              key={entry.href}
              icon={icons[entry.icon]}
              title={entry.title}
              description={entry.description}
              href={entry.href}
            />
          ))}
        </div>
      </section>

      <footer id="contact" className="max-w-content mx-auto px-8 w-full mt-auto pb-4 pt-4 border-t border-border-subtle">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
          <span className="text-text-tertiary">联系方式：</span>
          {contacts.map(contact => {
            const Icon = icons[contact.icon]
            const content = (
              <span className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors duration-base">
                {Icon}
                <span>{contact.value}</span>
              </span>
            )
            return contact.href ? (
              <a key={contact.label} href={contact.href}>{content}</a>
            ) : (
              <span key={contact.label}>{content}</span>
            )
          })}
        </div>
      </footer>
    </div>
  )
}
