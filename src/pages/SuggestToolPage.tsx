import Section, { SectionHeader } from '../components/ui/Section';
import SuggestToolForm from '../components/sections/SuggestToolForm';

export default function SuggestToolPage() {
  return (
    <Section className="pt-32!">
      <SectionHeader
        tag="Suggest"
        title="Suggest a Tool"
        description="Help us build the tools you need most. Every suggestion is reviewed by our team."
      />
      <SuggestToolForm />
    </Section>
  );
}
