import HeroSection from '@/components/HeroSection'
import EntryCard from '@/components/EntryCard'
import Blockquote from '@/components/Blockquote'
import ContactCard from '@/components/ContactCard'
import CTAButton from '@/components/CTAButton'
import { icons } from '@/components/icons'
import { homeData } from '@/data/home'
import { contacts } from '@/data/contacts'

export default function Home() {
  return (
    <>
      <HeroSection
        name={homeData.name}
        tagline={homeData.tagline}
        subtitle={homeData.subtitle}
      />

      <section className="max-w-content mx-auto px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <section className="max-w-2xl mx-auto px-8 py-16">
        <Blockquote>{homeData.quote}</Blockquote>
      </section>

      <section id="contact" className="max-w-content mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Let&apos;s connect</h2>
          <p className="text-text-secondary">想聊聊？随时找我</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {contacts.map(contact => (
            <ContactCard
              key={contact.label}
              icon={icons[contact.icon]}
              label={contact.label}
              value={contact.value}
              href={contact.href}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <CTAButton href="/works" variant="arrow">查看我的作品</CTAButton>
        </div>
      </section>
    </>
  )
}
