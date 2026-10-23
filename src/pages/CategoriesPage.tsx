import Section, { SectionHeader } from '../components/ui/Section';
import CategoryGrid from '../components/categories/CategoryGrid';

export default function CategoriesPage() {
  return (
    <Section className="pt-32!">
      <SectionHeader
        tag="Categories"
        title="All Tool Categories"
        description="Browse tools organized by category. Find exactly what you need."
      />
      <CategoryGrid />
    </Section>
  );
}
