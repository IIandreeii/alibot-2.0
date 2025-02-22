import React, { useEffect } from 'react'
import Styles from './styles.module.scss'
import { Header } from 'landing/components/header'
import { Footer } from 'landing/components/footer'

const TerminosPage = () => {
  const { container, containerDetail } = Styles
  document.body.classList.add("show_scroll");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className={container}>
      <Header />

      <h2>Condiciones de uso</h2>
      
      <div className={containerDetail}>
        <div>
          <h4 className="my-4">Agreement</h4>
          <p>
            By accessing or using https://alibot.app you represent that you have the full authority to act to bind yourself, any third party, company, or legal entity, and that your use and/or interaction, as well as continuing to use or interact, with the website constitutes your having read and agreed to these terms of use as well as other agreements that we may post on the website.

            By viewing, visiting, using, or interacting with this website or with any banner, pop-up, or advertising that appears on it, you are agreeing to all the provisions of this terms of use policy as well as the privacypolicyurl and https://alibot.app/privacidad of this website.

            This website specifically denies access to any individual that is covered by the children’s online privacy protection act (coppa) of 1998.

            This site reserves the right to deny access to any person or viewer for any lawful reason. under the terms of the privacy policy, which you accept as a condition for viewing, this website is allowed to collect and store data and information for the purpose of exclusion and for many other uses.

            This terms of use agreement may change from time to time. Visitors have an affirmative duty, as part of the consideration for permission to access this website, to keep themselves informed of such changes by reviewing this terms of use page each time they visit this website.
          </p>

          <h4 className="my-4">Parties to the terms of use agreement</h4>
          <p>Los visitantes, espectadores, usuarios, suscriptores, miembros, afiliados o clientes, denominados colectivamente en este documento "Visitantes", son partes de este acuerdo. El sitio web y sus propietarios y / o operadores son partes de este acuerdo, en lo sucesivo denominado "Sitio Web."</p>

          <h4 className="my-4">Hyperlinking to site, co-branding, “framing” and referencing website prohibited</h4>
          <p>Unless expressly authorized by website, no one may hyperlink this website, or portions thereof, (including, but not limited to, logotypes, trademarks, branding or copyrighted material) to theirs for any reason. Furthermore, you are not permitted to reference the URL (website address) of this website or any page of this website in any commercial or non-commercial media without express permission from us, nor are you allowed to ‘frame’ the website. You specifically agree to cooperate with the website to remove or de-activate any such activities, and be liable for all damages arising from violating this provision. In recognition of the fact that it may be difficult to quantify the exact damages arising from infringement of this provision, you agree to compensate the owners of this website with liquidated damages, the actual costs and actual damages for breach of this provision, whichever is greater. You warrant that you understand that accepting this provision is a condition of accessing this website and that accessing this website constitutes acceptance.</p>

          <h4 className="my-4">Disclaimer for contents of website</h4>
          <p>The website disclaims any responsibility for the accuracy of the content appearing at, linked to on, or mentioned on this website. Visitors assume all risk relating to viewing, reading, using, or relying upon this information. Unless you have otherwise formed an express contract to the contrary with us, you have no right to rely on any information contained herein as accurate. We make no such warranty.We assume no responsibility for damage to computers or software of the visitor or any person the visitor subsequently communicates with from corrupting code or data that is inadvertently passed to the visitor’s computer. Again, visitor views and interacts with this website, or banners or pop-ups or advertising displayed thereon, at his own risk.</p>
          <p>
            This website is not part of the Facebook website or Facebook Inc. Additionally, this site is not endorsed by Facebook in any way. Facebook is a trademark of Facebook, Inc.

            We use Google remarketing pixels/cookies on this site to re-communicate with people who visit our site and ensure that we are able to reach them in the future with relevant messages and information. Google shows our ads across third party sites across the internet to help communicate our message and reach the right people who have shown interest in our information in the past.
          </p>

          <h4 className="my-4">Limitation of liability</h4>
          <p>By viewing, using, or interacting in any manner with this website, including banners, advertising, or pop-ups, downloads, and as a condition of the website to allow his lawful viewing. Visitor forever waives all right to claims of damage of any and all description based on any causal factor resulting in any possible harm, no matter how heinous or extensive, whether physical or emotional, foreseeable or unforeseeable, whether personal or commercial in nature. For any jurisdictions that may now allow for these exclusions our maximum liability will not exceed the amount paid by you, if any, for using our website or service. Additionally, you agree not to hold us liable for any damages related to issues beyond our control, including but not limited to, acts of God, war, terrorism, insurrection, riots, criminal activity, natural disasters, disruption of communications or infrastructure, labor shortages or disruptions (including unlawful strikes), shortages of materials, and any other events which are not within our control.</p>

          <h4 className="my-4">Indemnification</h4>
          <p>Visitor agrees that in the event he causes damage to us or a third party as a result of or relating to the use of this website, visitor will indemnify us for, and, if applicable, defend us against, any claims for damages.</p>

          <h4 className="my-4">Submissions</h4>
          <p>Visitor agrees as a condition of viewing, that any communication between visitor and Website is deemed a submission. All submissions, including portions thereof, graphics contained thereon, or any of the content of the submission, shall become the exclusive property of the Website and may be used, without further permission, for commercial use without additional consideration of any kind. Visitor agrees to only communicate that information to the Website, which it wishes to forever allow the Website to use in any manner as it sees fit. “Submissions” is also a provision of the privacy policy.</p>

          <h4 className="my-4">User registration</h4>
          <p>
            You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
          </p>
          <p>
            By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise; (6) you will not use the Site for any illegal or unauthorized purpose; and (7) your use of the Site will not violate any applicable law or regulation.
          </p>
          <p>
            If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof).
          </p>

          <h4 className="my-4">Intellectual property rights</h4>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, foreign jurisdictions, and international conventions. The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
          </p>
          <p>
            Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.
          </p>

          <h4 className="my-4">Site management</h4>
          <p>
            We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.
          </p>

          <h4 className="my-4">Term and termination</h4>
          <p>
            These Terms shall remain in full force and effect while you use the Site. Without limiting any other provision of these terms, we reserve the right to, in our sole discretion and without notice or liability, deny access to and use of the site (including blocking certain IP addresses), to any person for any reason or for no reason, including without limitation for breach of any representation, warranty, or covenant contained in these terms or any applicable law of regulation. We may terminate your use or participation in the site or delete your account and any content or information that you posted at any time, without warning, in our sole discretion.

            If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redres
          </p>

          <h4 className="my-4">Notice</h4>
          <p>No additional notice of any kind for any reason is required to be given to visitor and visitor expressly warrants an understanding that the right to notice is waived as a condition for permission to view or interact with the website.</p>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default TerminosPage
