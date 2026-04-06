"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useT } from "@/app/i18n/LanguageContext";
import styles from "./privacy.module.css";

const content = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: April 6, 2026",
    sections: [
      {
        number: "1",
        heading: "Introduction",
        body: `Spave ("we", "our", "us") operates the website spaveapp.com (the "Site"). We are committed to protecting the personal information of our users in accordance with the Act respecting the protection of personal information in the private sector (Law 25) of Quebec, Canada.

This Privacy Policy describes what information we collect, how we use it, and what rights you have regarding your personal information.`,
      },
      {
        number: "2",
        heading: "Privacy Officer",
        body: `Pursuant to Law 25, a privacy officer has been designated to oversee the protection of personal information at Spave.`,
        details: [
          { label: "Name", value: "Hendrik Tebeng" },
          { label: "Title", value: "Privacy Officer and Founder, Spave" },
          { label: "Email", value: "hendriktebeng@gmail.com", href: "mailto:hendriktebeng@gmail.com" },
        ],
        bodyAfter: `For any questions, requests, or complaints regarding your personal information, please contact the privacy officer directly.`,
      },
      {
        number: "3",
        heading: "Information We Collect",
        body: `We collect only the personal information necessary for the purposes described in this policy (privacy by default).`,
        subsections: [
          {
            number: "3.1",
            heading: "Email Address",
            body: "When you join our waitlist, we collect your email address. This is the only personal information stored on our servers.",
          },
          {
            number: "3.2",
            heading: "Geolocation",
            body: "If you grant permission, we access your device's geolocation to display the distance between you and nearby soccer courts. This data is processed locally in your browser and is never transmitted to or stored on our servers.",
          },
          {
            number: "3.3",
            heading: "Usage Data",
            body: "If you consent to analytics cookies, we collect anonymized data about how you interact with the Site, including pages visited and navigation patterns. This data does not identify you personally.",
          },
        ],
      },
      {
        number: "4",
        heading: "Purposes of Collection",
        body: `The personal information we collect is used for the following purposes, communicated to you at or before the time of collection:`,
        list: [
          "Email address: to notify you when Spave launches and to send occasional updates about the platform.",
          "Geolocation: to calculate and display the distance between your location and nearby courts. Processing occurs entirely on your device.",
          "Usage data: to understand how visitors use the Site and to improve the user experience.",
        ],
      },
      {
        number: "5",
        heading: "Legal Basis for Processing",
        body: `We process your personal information based on your consent:`,
        list: [
          "You provide your email address voluntarily by submitting the waitlist form, where the purpose of collection is disclosed.",
          "You grant or deny analytics cookie consent through our cookie banner, which is presented on your first visit.",
          "You grant or deny geolocation access through your browser's native permission dialog.",
        ],
        bodyAfter: "You may withdraw your consent at any time (see Section 9).",
      },
      {
        number: "6",
        heading: "Cookies and Tracking Technologies",
        subsections: [
          {
            number: "6.1",
            heading: "Essential Cookies",
            body: "Essential cookies are necessary for the Site to function and do not require your consent. They include session and security cookies.",
          },
          {
            number: "6.2",
            heading: "Analytics Cookies",
            body: `With your consent, we use analytics cookies to collect anonymized usage data. These cookies are only activated if you select "Accept all" in our cookie banner. You can manage or withdraw your cookie consent at any time by clicking "Cookie Preferences" in the footer of the Site.`,
          },
        ],
      },
      {
        number: "7",
        heading: "Third-Party Services and Cross-Border Data Transfers",
        body: `We use the following third-party service providers, some of which are located outside of Quebec and Canada. In using these services, personal information may be transferred to and processed in other jurisdictions.`,
        subsections: [
          {
            number: "7.1",
            heading: "Vercel Inc. (United States)",
            body: "Vercel hosts the Site and, with your consent, processes anonymized analytics data. Vercel complies with applicable data protection laws.",
            link: { label: "Privacy Policy", href: "https://vercel.com/legal/privacy-policy" },
          },
          {
            number: "7.2",
            heading: "MapTiler AG (Switzerland)",
            body: "MapTiler provides map tiles displayed on the Site. Map tile requests may include technical connection data (such as IP address) processed by MapTiler's servers.",
            link: { label: "Privacy Policy", href: "https://www.maptiler.com/privacy-policy/" },
          },
          {
            number: "7.3",
            heading: "Supabase Inc. (United States)",
            body: "Supabase provides the database where waitlist email addresses are stored.",
            link: { label: "Privacy Policy", href: "https://supabase.com/privacy" },
          },
        ],
        bodyAfter: "We have ensured that each of these providers maintains adequate data protection practices consistent with applicable law.",
      },
      {
        number: "8",
        heading: "Data Retention",
        list: [
          "Email addresses collected through the waitlist are retained until the purpose for which they were collected has been fulfilled, or until you unsubscribe, whichever comes first. After Spave's public launch, waitlist emails will be deleted within 90 days unless you have created an account or explicitly opted in to continued communications.",
          "Analytics data is retained in accordance with Vercel's data retention policies.",
          "Geolocation data is not retained, as it is never transmitted to our servers.",
        ],
      },
      {
        number: "9",
        heading: "Your Rights",
        body: "Under Law 25, you have the following rights regarding your personal information:",
        list: [
          "Right of access: You may request a copy of the personal information we hold about you.",
          "Right to rectification: You may request that inaccurate information be corrected.",
          "Right to deletion: You may request that your personal information be deleted.",
          "Right to withdraw consent: You may withdraw your consent to the processing of your personal information at any time, without affecting the lawfulness of processing carried out prior to withdrawal.",
          "Right to data portability: You may request that your personal information be communicated to you in a technological format.",
          "Right to de-indexing: If your personal information has been made public, you may request that access to it be restricted.",
        ],
        bodyAfter: `To exercise any of these rights, contact our privacy officer at hendriktebeng@gmail.com. We will respond within 30 days.\n\nTo unsubscribe from our waitlist, click the unsubscribe link included in any email we send you. To manage cookie preferences, click "Cookie Preferences" in the footer of the Site.`,
      },
      {
        number: "10",
        heading: "Security and Breach Notification",
        body: `We implement appropriate technical and organizational measures to protect personal information against unauthorized access, loss, or disclosure.

In the event of a confidentiality incident (data breach) involving your personal information that presents a risk of serious harm, we will notify affected individuals and the Commission d'acces a l'information (CAI) within 72 hours of becoming aware of the incident, in accordance with Law 25.`,
      },
      {
        number: "11",
        heading: "Privacy by Default and by Design",
        body: "We collect only the personal information that is necessary for the purposes identified in this policy. Privacy considerations are integrated into our systems and practices from the outset.",
      },
      {
        number: "12",
        heading: "Children's Privacy",
        body: "The Site is not directed at children under the age of 14. We do not knowingly collect personal information from anyone under 14. If we become aware that we have inadvertently collected such information, we will delete it promptly. If you believe a minor has submitted information to us, please contact us at contact@spaveapp.com.",
      },
      {
        number: "13",
        heading: "Changes to This Policy",
        body: `We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.`,
      },
      {
        number: "14",
        heading: "Contact",
        body: "For any questions about this Privacy Policy or our data practices:",
        details: [
          { label: "General inquiries", value: "contact@spaveapp.com", href: "mailto:contact@spaveapp.com" },
          { label: "Privacy Officer", value: "Hendrik Tebeng" },
          { label: "Privacy Officer email", value: "hendriktebeng@gmail.com", href: "mailto:hendriktebeng@gmail.com" },
          { label: "Address", value: "Montreal, Quebec, Canada" },
        ],
      },
    ],
  },

  fr: {
    title: "Politique de confidentialite",
    updated: "Derniere mise a jour : 6 avril 2026",
    sections: [
      {
        number: "1",
        heading: "Introduction",
        body: `Spave ("nous", "notre") exploite le site web spaveapp.com (le "Site"). Nous nous engageons a proteger les renseignements personnels de nos utilisateurs conformement a la Loi sur la protection des renseignements personnels dans le secteur prive (Loi 25) du Quebec, Canada.

Cette politique de confidentialite decrit les renseignements que nous collectons, la facon dont nous les utilisons et les droits dont vous disposez a leur egard.`,
      },
      {
        number: "2",
        heading: "Responsable de la protection des renseignements personnels",
        body: "Conformement a la Loi 25, un responsable de la protection des renseignements personnels a ete designe chez Spave.",
        details: [
          { label: "Nom", value: "Hendrik Tebeng" },
          { label: "Titre", value: "Responsable de la protection des renseignements personnels et fondateur, Spave" },
          { label: "Courriel", value: "hendriktebeng@gmail.com", href: "mailto:hendriktebeng@gmail.com" },
        ],
        bodyAfter: "Pour toute question, demande ou plainte concernant vos renseignements personnels, veuillez contacter directement le responsable.",
      },
      {
        number: "3",
        heading: "Renseignements que nous collectons",
        body: "Nous ne collectons que les renseignements personnels necessaires aux fins decrites dans la presente politique (protection de la vie privee par defaut).",
        subsections: [
          {
            number: "3.1",
            heading: "Adresse courriel",
            body: "Lorsque vous vous inscrivez a notre liste d'attente, nous collectons votre adresse courriel. Il s'agit du seul renseignement personnel stocke sur nos serveurs.",
          },
          {
            number: "3.2",
            heading: "Geolocalisation",
            body: "Si vous accordez la permission, nous accedons a la geolocalisation de votre appareil afin d'afficher la distance entre vous et les terrains de soccer a proximite. Ces donnees sont traitees localement dans votre navigateur et ne sont jamais transmises ni stockees sur nos serveurs.",
          },
          {
            number: "3.3",
            heading: "Donnees d'utilisation",
            body: "Si vous consentez aux cookies analytiques, nous collectons des donnees anonymisees sur la facon dont vous interagissez avec le Site, notamment les pages visitees et les parcours de navigation. Ces donnees ne permettent pas de vous identifier personnellement.",
          },
        ],
      },
      {
        number: "4",
        heading: "Fins de la collecte",
        body: "Les renseignements personnels que nous collectons sont utilises aux fins suivantes, qui vous sont communiquees au moment de la collecte ou avant celle-ci :",
        list: [
          "Adresse courriel : pour vous informer du lancement de Spave et vous envoyer des mises a jour occasionnelles sur la plateforme.",
          "Geolocalisation : pour calculer et afficher la distance entre votre position et les terrains a proximite. Le traitement s'effectue entierement sur votre appareil.",
          "Donnees d'utilisation : pour comprendre la facon dont les visiteurs utilisent le Site et ameliorer l'experience utilisateur.",
        ],
      },
      {
        number: "5",
        heading: "Base juridique du traitement",
        body: "Nous traitons vos renseignements personnels sur la base de votre consentement :",
        list: [
          "Vous fournissez votre adresse courriel volontairement en soumettant le formulaire d'inscription a la liste d'attente, sur lequel la finalite de la collecte est indiquee.",
          "Vous accordez ou refusez votre consentement aux cookies analytiques via notre bandeau de cookies, affiche lors de votre premiere visite.",
          "Vous accordez ou refusez l'acces a votre geolocalisation via la boite de dialogue native de votre navigateur.",
        ],
        bodyAfter: "Vous pouvez retirer votre consentement a tout moment (voir la section 9).",
      },
      {
        number: "6",
        heading: "Cookies et technologies de suivi",
        subsections: [
          {
            number: "6.1",
            heading: "Cookies essentiels",
            body: "Les cookies essentiels sont necessaires au fonctionnement du Site et ne requierent pas votre consentement. Ils comprennent les cookies de session et de securite.",
          },
          {
            number: "6.2",
            heading: "Cookies analytiques",
            body: `Avec votre consentement, nous utilisons des cookies analytiques pour collecter des donnees d'utilisation anonymisees. Ces cookies sont uniquement actives si vous selectionnez "Tout accepter" dans notre bandeau de cookies. Vous pouvez gerer ou retirer votre consentement aux cookies a tout moment en cliquant sur "Preferences de cookies" dans le pied de page du Site.`,
          },
        ],
      },
      {
        number: "7",
        heading: "Services tiers et transferts transfrontaliers de donnees",
        body: "Nous faisons appel aux prestataires de services tiers suivants, dont certains sont situes en dehors du Quebec et du Canada. En utilisant ces services, des renseignements personnels peuvent etre transferes et traites dans d'autres juridictions.",
        subsections: [
          {
            number: "7.1",
            heading: "Vercel Inc. (Etats-Unis)",
            body: "Vercel heberge le Site et, avec votre consentement, traite des donnees analytiques anonymisees. Vercel se conforme aux lois applicables en matiere de protection des donnees.",
            link: { label: "Politique de confidentialite", href: "https://vercel.com/legal/privacy-policy" },
          },
          {
            number: "7.2",
            heading: "MapTiler AG (Suisse)",
            body: "MapTiler fournit les tuiles cartographiques affichees sur le Site. Les requetes de tuiles peuvent inclure des donnees de connexion techniques (telles que l'adresse IP) traitees par les serveurs de MapTiler.",
            link: { label: "Politique de confidentialite", href: "https://www.maptiler.com/privacy-policy/" },
          },
          {
            number: "7.3",
            heading: "Supabase Inc. (Etats-Unis)",
            body: "Supabase fournit la base de donnees dans laquelle les adresses courriel de la liste d'attente sont stockees.",
            link: { label: "Politique de confidentialite", href: "https://supabase.com/privacy" },
          },
        ],
        bodyAfter: "Nous avons veille a ce que chacun de ces prestataires maintienne des pratiques de protection des donnees adequates, conformement au droit applicable.",
      },
      {
        number: "8",
        heading: "Conservation des donnees",
        list: [
          "Les adresses courriel collectees via la liste d'attente sont conservees jusqu'a ce que la finalite pour laquelle elles ont ete collectees soit atteinte, ou jusqu'a votre desabonnement, selon la premiere eventualite. Apres le lancement public de Spave, les courriels de la liste d'attente seront supprimes dans les 90 jours, sauf si vous avez cree un compte ou explicitement consenti a recevoir des communications continues.",
          "Les donnees analytiques sont conservees conformement aux politiques de conservation de donnees de Vercel.",
          "Les donnees de geolocalisation ne sont pas conservees, car elles ne sont jamais transmises a nos serveurs.",
        ],
      },
      {
        number: "9",
        heading: "Vos droits",
        body: "En vertu de la Loi 25, vous disposez des droits suivants concernant vos renseignements personnels :",
        list: [
          "Droit d'acces : Vous pouvez demander une copie des renseignements personnels que nous detenons a votre sujet.",
          "Droit de rectification : Vous pouvez demander la correction de renseignements inexacts.",
          "Droit a l'effacement : Vous pouvez demander la suppression de vos renseignements personnels.",
          "Droit de retrait du consentement : Vous pouvez retirer votre consentement au traitement de vos renseignements personnels a tout moment, sans que cela n'affecte la liceite du traitement effectue avant ce retrait.",
          "Droit a la portabilite : Vous pouvez demander que vos renseignements personnels vous soient communiques dans un format technologique.",
          "Droit a la deindexation : Si vos renseignements personnels ont ete rendus publics, vous pouvez demander la restriction de l'acces a ceux-ci.",
        ],
        bodyAfter: `Pour exercer l'un de ces droits, contactez notre responsable de la protection des renseignements personnels a l'adresse hendriktebeng@gmail.com. Nous repondrons dans un delai de 30 jours.\n\nPour vous desabonner de notre liste d'attente, cliquez sur le lien de desabonnement inclus dans tout courriel que nous vous envoyons. Pour gerer vos preferences en matiere de cookies, cliquez sur "Preferences de cookies" dans le pied de page du Site.`,
      },
      {
        number: "10",
        heading: "Securite et notification en cas d'incident",
        body: `Nous mettons en oeuvre des mesures techniques et organisationnelles appropriees pour proteger les renseignements personnels contre tout acces non autorise, perte ou divulgation.

En cas d'incident de confidentialite (violation de donnees) impliquant vos renseignements personnels et presentant un risque de prejudice grave, nous informerons les personnes concernees et la Commission d'acces a l'information (CAI) dans les 72 heures suivant la decouverte de l'incident, conformement a la Loi 25.`,
      },
      {
        number: "11",
        heading: "Protection de la vie privee par defaut et des la conception",
        body: "Nous ne collectons que les renseignements personnels necessaires aux fins identifiees dans la presente politique. Les considerations relatives a la vie privee sont integrees a nos systemes et pratiques des le depart.",
      },
      {
        number: "12",
        heading: "Protection des mineurs",
        body: "Le Site ne s'adresse pas aux enfants de moins de 14 ans. Nous ne collectons pas sciemment de renseignements personnels aupres de personnes de moins de 14 ans. Si nous apprenons que nous avons collecte par inadvertance de tels renseignements, nous les supprimerons promptement. Si vous pensez qu'un mineur nous a soumis des renseignements, veuillez nous contacter a l'adresse contact@spaveapp.com.",
      },
      {
        number: "13",
        heading: "Modifications de la presente politique",
        body: `Nous pouvons mettre a jour la presente politique de confidentialite de temps a autre. Le cas echeant, nous mettrons a jour la date de "Derniere mise a jour" en haut de cette page. Nous vous encourageons a consulter cette politique regulierement.`,
      },
      {
        number: "14",
        heading: "Nous contacter",
        body: "Pour toute question concernant la presente politique de confidentialite ou nos pratiques en matiere de donnees :",
        details: [
          { label: "Questions generales", value: "contact@spaveapp.com", href: "mailto:contact@spaveapp.com" },
          { label: "Responsable de la protection", value: "Hendrik Tebeng" },
          { label: "Courriel du responsable", value: "hendriktebeng@gmail.com", href: "mailto:hendriktebeng@gmail.com" },
          { label: "Adresse", value: "Montreal, Quebec, Canada" },
        ],
      },
    ],
  },
};

type Detail = { label: string; value: string; href?: string };
type Subsection = { number: string; heading: string; body: string; link?: { label: string; href: string } };
type Section = {
  number: string;
  heading: string;
  body?: string;
  bodyAfter?: string;
  list?: string[];
  details?: Detail[];
  subsections?: Subsection[];
};

function renderBody(text: string) {
  return text.split("\n\n").map((para, i) => (
    <p key={i} className={styles.body}>{para}</p>
  ));
}

export default function PrivacyPolicy() {
  const { lang } = useT();
  const c = lang === "fr" ? content.fr : content.en;

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.docHeader}>
            <p className={styles.eyebrow}>Legal</p>
            <h1 className={styles.title}>{c.title}</h1>
            <p className={styles.updated}>{c.updated}</p>
          </div>

          <div className={styles.document}>
            {c.sections.map((section: Section) => (
              <section key={section.number} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNumber}>{section.number}</span>
                  <h2 className={styles.sectionHeading}>{section.heading}</h2>
                </div>

                <div className={styles.sectionBody}>
                  {section.body && renderBody(section.body)}

                  {section.details && (
                    <dl className={styles.details}>
                      {section.details.map((d: Detail) => (
                        <div key={d.label} className={styles.detailRow}>
                          <dt className={styles.detailLabel}>{d.label}</dt>
                          <dd className={styles.detailValue}>
                            {d.href ? <a href={d.href} className={styles.inlineLink}>{d.value}</a> : d.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {section.list && (
                    <ul className={styles.list}>
                      {section.list.map((item: string, i: number) => (
                        <li key={i} className={styles.listItem}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.subsections && (
                    <div className={styles.subsections}>
                      {section.subsections.map((sub: Subsection) => (
                        <div key={sub.number} className={styles.subsection}>
                          <h3 className={styles.subsectionHeading}>
                            <span className={styles.subsectionNumber}>{sub.number}</span>
                            {sub.heading}
                          </h3>
                          <p className={styles.body}>{sub.body}</p>
                          {sub.link && (
                            <a href={sub.link.href} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                              {sub.link.label} &rarr;
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {section.bodyAfter && renderBody(section.bodyAfter)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
