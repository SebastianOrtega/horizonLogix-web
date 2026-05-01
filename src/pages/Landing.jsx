import { ACCENT } from "../theme.js";
import {
  ArchIT,
  CTABand,
  Hero,
  HowItWorks,
  Industries,
  Partners,
  LiveDemo,
  Plugins,
  Problem,
  Testimonial,
  Why,
} from "../components/Sections.jsx";
import WorkflowDesigner from "../components/WorkflowDesigner.jsx";

export default function Landing({ t, lang, onDemo, onSales }) {
  return (
    <main>
      <Hero t={t} onDemo={onDemo} />
      <Problem t={t} />
      <HowItWorks t={t} />
      <WorkflowDesigner lang={lang} accent={ACCENT} />
      <Plugins t={t} lang={lang} />
      <Industries t={t} />
      <Partners t={t} />
      <LiveDemo t={t} />
      <Why t={t} />
      <ArchIT t={t} />
      <Testimonial t={t} />
      <CTABand t={t} onDemo={onDemo} onSales={onSales} />
    </main>
  );
}
