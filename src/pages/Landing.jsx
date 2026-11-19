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
  Why,
} from "../components/Sections.jsx";
import WorkflowDesigner from "../components/WorkflowDesigner.jsx";

// The landing talks to RFID integrators; end customers land on the plugin pages.
export default function Landing({ t, lang, onPartner, onSales }) {
  return (
    <main>
      <Hero t={t} onPartner={onPartner} />
      <Problem t={t} />
      <HowItWorks t={t} />
      <WorkflowDesigner lang={lang} accent={ACCENT} />
      <Partners t={t} onPartner={onPartner} onSales={onSales} />
      <Industries t={t} />
      <Plugins t={t} lang={lang} />
      <ArchIT t={t} />
      <Why t={t} />
      <LiveDemo t={t} />
      <CTABand t={t} onPartner={onPartner} onSales={onSales} />
    </main>
  );
}
