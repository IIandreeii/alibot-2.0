import React, { useEffect } from 'react'
import { Header } from '../components/Header';
import { Footer } from '../components/Header/Footer';

const PrivacidadPage = () => {

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.add("show_scroll");
    }

  }, []);
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  return (
    <div className="container mx-auto px-4">
      <Header />

      <h2 className="text-2xl font-bold my-4">Política de privacidad</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div>
          <h4 className="text-lg font-semibold my-4">Introducción</h4>
          <p>
              Bienvenido a https://alibot.app. Entendemos que la privacidad en línea es importante para los usuarios de nuestro Sitio, especialmente cuando realizan negocios. Esta declaración rige nuestras políticas de privacidad con respecto a los usuarios del Sitio (`Visitantes`) que visitan sin realizar transacciones comerciales y los Visitantes que se registran para realizar transacciones comerciales en el Sitio y hacer uso de los diversos servicios ofrecidos por esta APP (colectivamente, `Servicios`) (`Clientes Autorizados`).
          </p>

          <h4 className="text-lg font-semibold my-4">Información personal</h4>
          <p>
           Se refiere a cualquier información que identifique o pueda utilizarse para identificar, contactar o localizar a la persona a la que pertenece dicha información, incluidos, entre otros, el nombre, la dirección, el número de teléfono, la dirección de correo electrónico, la dirección IP, la ubicación y el navegador. La información de identificación personal no incluye la información que se recoge de forma anónima (es decir, sin identificación del usuario individual) o la información demográfica no conectada a un individuo identificado.
          </p>

          <h4 className="text-lg font-semibold my-4">¿Qué datos personales se recogen?</h4>
          <p>Podemos recopilar información básica sobre el perfil de usuario de todos nuestros visitantes. Recopilamos la siguiente información adicional de nuestros Clientes Autorizados: el nombre, la dirección, el número de teléfono, la dirección de correo electrónico, la dirección IP, la ubicación y el navegador de los Clientes Autorizados, la naturaleza y el tamaño del negocio, y la naturaleza y el tamaño del inventario publicitario que el Cliente Autorizado pretende comprar.</p>

          <h4 className="text-lg font-semibold my-4">What organizations are collecting the information?</h4>
          <p>In addition to our direct collection of information, our third party service vendors (such as credit card companies, clearinghouses and banks) who may provide such services as credit, insurance, and escrow services may collect this information from our Visitors and Authorized Customers. We do not control how these third parties use such information, but we do ask them to disclose how they use personal information provided to them from Visitors and Authorized Customers. Some of these third parties may be intermediaries that act solely as links in the distribution chain, and do not store, retain, or use the information given to them. <b>Google Workspace APIs are not used to develop, improve, or train generalized AI and/or ML models.</b></p>

          <h4 className="text-lg font-semibold my-4">How does the Site use Personally Identifiable Information?</h4>
          <p>We use Personally Identifiable Information to customize the Site, to make appropriate service offerings, and to fulfill buying and selling requests on the Site. We may email Visitors and Authorized Customers about research or purchase and selling opportunities on the Site or information related to the subject matter of the Site. We may also use Personally Identifiable Information to contact Visitors and Authorized Customers in response to specific inquiries, or to provide requested information.</p>

          <h4 className="text-lg font-semibold my-4">With whom the information may be shared?</h4>
          <p>Personally Identifiable Information about Authorized Customers may be shared with other Authorized Customers who wish to evaluate potential transactions with other Authorized Customers. We may share aggregated information about our Visitors, including the demographics of our Visitors and Authorized Customers, with third party vendors.</p>

          <h4 className="text-lg font-semibold my-4">How is Personally Identifiable Information stored?</h4>
          <p>Personally Identifiable Information collected by This APP is securely stored and is not accessible to third parties or employees of This APP except for use as indicated above.</p>

          <h4 className="text-lg font-semibold my-4">What choices are available to Visitors regarding collection, use and distribution of the information?</h4>
          <p>Visitors and Authorized Customers may opt out of receiving unsolicited information from or being contacted by us and/or our vendors and affiliated agencies by responding to emails as instructed, or by contacting us.</p>

          <h4 className="text-lg font-semibold my-4">Are Cookies Used on the Site?</h4>
          <p>Cookies are used for a variety of reasons. We use Cookies to obtain information about the preferences of our Visitors and the services they select. We also use Cookies for security purposes to protect our Authorized Customers. For example, if an Authorized Customer is logged on and the site is unused, we will automatically log the Authorized Customer off.</p>

          <h4 className="text-lg font-semibold my-4">How does This APP use login information?</h4>
          <p>This APP uses login information, including, but not limited to, IP addresses, ISPs, and browser types, to analyze trends, administer the Site, track a user`s movement and use, and gather broad demographic information.</p>

          <h4 className="text-lg font-semibold my-4">What partners or service providers have access to Personally Identifiable Information from Visitors and/or Authorized Customers on the Site?</h4>
          <p>This APP has entered into and will continue to enter into partnerships and other affiliations with a number of vendors.Such vendors may have access to certain Personally Identifiable Information on a need to know basis for evaluating Authorized Customers for service eligibility. Our privacy policy does not cover their collection or use of this information. Disclosure of Personally Identifiable Information to comply with law. We will disclose Personally Identifiable Information in order to comply with a court order or subpoena or a request from a law enforcement agency to release information. We will also disclose Personally Identifiable Information when reasonably necessary to protect the safety of our Visitors and Authorized Customers.</p>

          <h4 className="text-lg font-semibold my-4">How does the Site keep Personally Identifiable Information secure?</h4>
          <p>All of our employees are familiar with our security policy and practices. The Personally Identifiable Information of our Visitors and Authorized Customers is only accessible to a limited number of qualified employees who are given a password in order to gain access to the information. We audit our security systems and processes on a regular basis. Sensitive information, such as credit card numbers or social security numbers, is protected by encryption protocols, in place to protect information sent over the Internet and we do not store them. While we take commercially reasonable measures to maintain a secure site, electronic communications and databases are subject to errors, tampering and break-ins, and we cannot guarantee or warrant that such events will not take place and we will not be liable to Visitors or Authorized Customers for any such occurrences.</p>

          <h4 className="text-lg font-semibold my-4">How can Visitors correct any inaccuracies in Personally Identifiable Information?</h4>
          <p>Visitors and Authorized Customers may contact us to update Personally Identifiable Information about them or to correct any inaccuracies by emailing us.</p>

          <h4 className="text-lg font-semibold my-4">Can a Visitor delete or deactivate Personally Identifiable Information collected by the Site?</h4>
          <p>We provide Visitors and Authorized Customers with a mechanism to delete/deactivate Personally Identifiable Information from the Site`s database by contacting . However, because of backups and records of deletions, it may be impossible to delete a Visitor`s entry without retaining some residual information. An individual who requests to have Personally Identifiable Information deactivated will have this information functionally deleted, and we will not sell, transfer, or use Personally Identifiable Information relating to that individual in any way moving forward.</p>
          <p>Contact deatils to delete or deactivate Personally Identifiable Information:          
            </p><ul>
              <li>Dirección : Av. Guzmán Blanco 297, Lima, Perú</li>
              <li>Asistencia técnica : https://wa.me/51953168435</li>
            </ul>
          <p></p>

          <h4 className="text-lg font-semibold my-4">What happens if the Privacy Policy Changes?</h4>
          <p>We will let our Visitors and Authorized Customers know about changes to our privacy policy by posting such changes on the Site. However, if we are changing our privacy policy in a manner that might cause disclosure of Personally Identifiable Information that a Visitor or Authorized Customer has previously requested not be disclosed, we will contact such Visitor or Authorized Customer to allow such Visitor or Authorized Customer to prevent such disclosure.</p>

          <h4 className="text-lg font-semibold my-4">Links</h4>
          <p>https://racksbot.com contains links to other web sites. Please note that when you click on one of these links, you are moving to another web site. We encourage you to read the privacy statements of these linked sites as their privacy policies may differ from ours.</p>

        </div>
      </div>

      <Footer isPage={false} />
    </div>
  )
}

export default PrivacidadPage
