/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Car, 
  Truck, 
  Wrench, 
  Settings, 
  Droplets, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Navigation,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Star,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useTranslation } from 'react-i18next';

// --- Variants for Animations ---

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

// --- Components ---

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-1.5 mt-2 justify-center md:justify-end">
      {['es', 'en'].map((lng) => (
        <button
          key={lng}
          onClick={() => changeLanguage(lng)}
          className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border transition-all ${
            i18n.language.startsWith(lng)
              ? 'bg-brand-orange border-brand-orange text-white' 
              : 'border-white/10 text-gray-500 hover:border-brand-orange/50 hover:text-brand-orange'
          }`}
        >
          {lng}
        </button>
      ))}
    </div>
  );
};

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.inicio'), href: '#inicio' },
    { name: t('nav.sobre'), href: '#sobre-nosotros' },
    { name: t('nav.servicios'), href: '#servicios' },
    { name: t('nav.como'), href: '#como-funciona' },
    { name: t('nav.contacto'), href: '#contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/90 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <span className="text-2xl font-display font-bold text-brand-orange tracking-tighter">
              FAST<span className="text-white">MEC</span>
            </span>
          </motion.div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link, i) => (
              <motion.a 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-gray-400 hover:text-brand-orange transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full" />
              </motion.a>
            ))}
            <div className="flex flex-col items-end">
              <motion.a 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                href="#contacto" 
                className="px-6 py-3 bg-brand-orange text-white text-sm font-bold rounded-full hover:shadow-[0_0_20px_rgba(242,125,38,0.4)] transition-all active:scale-95"
              >
                {t('nav.solicitar')}
              </motion.a>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-brand-dark flex flex-col p-8"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400"><X size={32} /></button>
            </div>
            <div className="space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-4xl font-display font-bold text-white hover:text-brand-orange transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <a 
                href="#contacto"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-5 bg-brand-orange text-white text-xl font-bold rounded-2xl"
              >
                {t('nav.solicitar')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    variants={fadeInUp}
    whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.05)" }}
    className="glass-card p-10 flex flex-col items-start group transition-all duration-500"
  >
    <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-8 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white transition-all duration-500">
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-bold mb-4 font-display group-hover:text-brand-orange transition-colors">{title}</h3>
    <p className="text-gray-400 text-base leading-relaxed">{description}</p>
    <div className="mt-8 flex items-center gap-2 text-brand-orange font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
      Saber más <ArrowRight size={16} />
    </div>
  </motion.div>
);

const Step = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <motion.div 
    variants={fadeInUp}
    className="relative flex flex-col items-center text-center px-6"
  >
    <div className="w-20 h-20 rounded-3xl bg-brand-gray border border-white/10 flex items-center justify-center text-3xl font-bold text-brand-orange mb-8 z-10 shadow-xl group-hover:border-brand-orange transition-colors">
      {number}
    </div>
    <h4 className="text-2xl font-bold mb-4 font-display">{title}</h4>
    <p className="text-gray-400 text-base leading-relaxed">{description}</p>
  </motion.div>
);

export default function App() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  useEffect(() => {
    if (showPrivacy || showLegal || showCookies) {
      window.scrollTo(0, 0);
    }
  }, [showPrivacy, showLegal, showCookies]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        setFormData({ name: '', phone: '', message: '' });
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t('contacto.form.error') || 'Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    }
  };

  const resetViews = () => {
    setShowPrivacy(false);
    setShowLegal(false);
    setShowCookies(false);
  };

  if (showPrivacy) {
    return (
      <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-orange selection:text-white font-sans">
        <nav className="fixed top-0 left-0 w-full z-50 bg-brand-dark/90 backdrop-blur-xl py-6 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <span className="text-2xl font-display font-bold text-brand-orange tracking-tighter cursor-pointer" onClick={resetViews}>
              FAST<span className="text-white">MEC</span>
            </span>
            <button 
              onClick={resetViews}
              className="flex items-center gap-2 text-gray-400 hover:text-brand-orange transition-colors font-bold"
            >
              <X size={20} /> {t('common.volver')}
            </button>
          </div>
        </nav>

        <main className="pt-40 pb-32 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto glass-card p-8 md:p-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 text-brand-orange">{t('footer.privacidad')}</h1>
            
            <div className="prose prose-invert prose-orange max-w-none space-y-8 text-gray-300 leading-relaxed text-lg">
              <p>
                {t('privacy.intro')}
              </p>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Responsable del tratamiento</h2>
                <ul className="list-none space-y-2">
                  <li><span className="text-brand-orange font-bold">Razón social:</span> FASTMEC</li>
                  <li><span className="text-brand-orange font-bold">Dirección:</span> Málaga, España</li>
                  <li><span className="text-brand-orange font-bold">Teléfono:</span> +34 642 379 218</li>
                  <li><span className="text-brand-orange font-bold">Correo electrónico:</span> info@fastmec.me</li>
                </ul>
                <p className="mt-4 italic">
                  FASTMEC es responsable del tratamiento de los datos personales recogidos a través de este sitio web.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Finalidad del treatment de los datos</h2>
                <p className="mb-4">Los datos personales que el usuario facilite a través de los formularios de contacto del sitio web serán tratados con las siguientes finalidades:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Gestionar solicitudes de información o presupuestos.</li>
                  <li>Atender consultas o peticiones realizadas por los usuarios.</li>
                  <li>Gestionar la prestación de servicios mecánicos a domicilio.</li>
                  <li>Mantener la comunicación con los clientes y potenciales clientes.</li>
                  <li>Elaborar, en su caso, un perfil comercial basado en la información facilitada para ofrecer servicios relacionados.</li>
                </ul>
                <p className="mt-4">No se tomarán decisiones automatizadas basadas en perfiles.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Legitimación para el tratamiento de datos</h2>
                <p className="mb-4">La base legal para el tratamiento de los datos personales es:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>El consentimiento del interesado, otorgado al aceptar el formulario de contacto o al comunicarse con FASTMEC.</li>
                  <li>El interés legítimo del responsable para atender solicitudes y prestar los servicios solicitados.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Conservación de los datos</h2>
                <p>
                  Los datos personales se conservarán mientras exista una relación comercial o mientras el usuario no solicite su supresión. Cuando los datos ya no sean necesarios para los fines para los que fueron recogidos, serán eliminados aplicando las medidas de seguridad adecuadas.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Destinatarios de los datos</h2>
                <p className="mb-4">Los datos personales no se cederán a terceros, salvo en los siguientes casos:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cuando exista una obligación legal.</li>
                  <li>Cuando sea necesario para la prestación del servicio solicitado.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Derechos de los usuarios</h2>
                <p className="mb-4">Los usuarios tienen derecho a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Solicitar el acceso a sus datos personales.</li>
                  <li>Solicitar la rectificación de datos inexactos.</li>
                  <li>Solicitar la supresión de sus datos (derecho al olvido).</li>
                  <li>Solicitar la limitación del tratamiento.</li>
                  <li>Oponerse al tratamiento de sus datos.</li>
                  <li>Solicitar la portabilidad de los datos.</li>
                  <li>Retirar el consentimiento en cualquier momento.</li>
                </ul>
                <p className="mt-6">
                  Para ejercer estos derechos, el usuario puede contactar con el responsable a través del correo electrónico: <a href="mailto:info@fastmec.me" className="text-brand-orange hover:underline font-bold">info@fastmec.me</a>
                </p>
              </section>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex justify-center">
              <button 
                onClick={resetViews}
                className="px-10 py-4 bg-brand-orange text-white font-bold rounded-2xl hover:shadow-[0_0_30px_rgba(242,125,38,0.4)] transition-all"
              >
                {t('common.volver')}
              </button>
            </div>
          </motion.div>
        </main>

        <footer className="bg-brand-dark border-t border-white/5 py-12 text-center text-gray-500 text-sm">
          <p>{t('footer.derechos')}</p>
        </footer>
      </div>
    );
  }

  if (showLegal) {
    return (
      <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-orange selection:text-white font-sans">
        <nav className="fixed top-0 left-0 w-full z-50 bg-brand-dark/90 backdrop-blur-xl py-6 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <span className="text-2xl font-display font-bold text-brand-orange tracking-tighter cursor-pointer" onClick={resetViews}>
              FAST<span className="text-white">MEC</span>
            </span>
            <button 
              onClick={resetViews}
              className="flex items-center gap-2 text-gray-400 hover:text-brand-orange transition-colors font-bold"
            >
              <X size={20} /> {t('common.volver')}
            </button>
          </div>
        </nav>

        <main className="pt-40 pb-32 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto glass-card p-8 md:p-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 text-brand-orange">{t('footer.aviso')}</h1>
            
            <div className="prose prose-invert prose-orange max-w-none space-y-8 text-gray-300 leading-relaxed text-lg">
              <p>
                En cumplimiento con el deber de información establecido en la Ley 34/2002 de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan a continuación los datos identificativos del titular del sitio web.
              </p>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Datos identificativos</h2>
                <ul className="list-none space-y-2">
                  <li><span className="text-brand-orange font-bold">Titular:</span> FASTMEC</li>
                  <li><span className="text-brand-orange font-bold">Dirección:</span> Málaga, España</li>
                  <li><span className="text-brand-orange font-bold">Teléfono:</span> +34 642 379 218</li>
                  <li><span className="text-brand-orange font-bold">Correo electrónico:</span> info@fastmec.me</li>
                </ul>
                <p className="mt-4">
                  El presente sitio web tiene como finalidad ofrecer información sobre los servicios de mecánica a domicilio ofrecidos por FASTMEC.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Condiciones de uso</h2>
                <p>El acceso y uso del sitio web atribuye la condición de usuario e implica la aceptación plena y sin reservas de todas las disposiciones incluidas en este Aviso Legal.</p>
                <p>El usuario se compromete a utilizar el sitio web de conformidad con la ley, la buena fe, el orden público y el presente Aviso Legal.</p>
                <p>Queda prohibido el uso del sitio web con fines ilícitos o que puedan causar perjuicios a FASTMEC o a terceros.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Propiedad intelectual e industrial</h2>
                <p>Todos los contenidos del sitio web, incluyendo textos, imágenes, logotipos, diseños, estructura, código fuente y demás elementos, están protegidos por la normativa de propiedad intelectual e industrial.</p>
                <p>Queda prohibida su reproducción, distribución o modificación sin la autorización previa y expresa del titular del sitio web.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Responsabilidad</h2>
                <p>FASTMEC no se responsabiliza de los daños o perjuicios derivados del uso de la información contenida en este sitio web ni de posibles errores u omisiones en los contenidos.</p>
                <p>Asimismo, FASTMEC no garantiza la disponibilidad permanente del sitio web ni se hace responsable de posibles interrupciones del servicio.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Enlaces externos</h2>
                <p>Este sitio web puede contener enlaces a sitios web de terceros. FASTMEC no se responsabiliza del contenido, políticas o prácticas de dichos sitios externos.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Protección de datos personales</h2>
                <p>Los datos personales que el usuario facilite a través del sitio web serán tratados de conformidad con lo establecido en el General Data Protection Regulation y la Ley Orgánica de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).</p>
                <p>Para más información sobre el tratamiento de los datos personales, el usuario puede consultar la correspondiente Política de Privacidad del sitio web.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Legislación aplicable y jurisdicción</h2>
                <p>La relación entre FASTMEC and el usuario se regirá por la normativa vigente en Spain.</p>
                <p>Para la resolución de cualquier controversia que pudiera surgir en relación con el acceso o uso del sitio web, las partes se someterán a los juzgados y tribunales de Málaga, salvo que la legislación aplicable disponga otra cosa.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Resolución de conflictos en línea</h2>
                <p>De acuerdo con la normativa europea de protección al consumidor, los usuarios tienen la posibilidad de acudir a la plataforma de resolución de litigios en línea facilitada por la European Commission.</p>
                <p>La plataforma está disponible en el siguiente enlace: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">https://ec.europa.eu/consumers/odr/</a></p>
              </section>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex justify-center">
              <button 
                onClick={resetViews}
                className="px-10 py-4 bg-brand-orange text-white font-bold rounded-2xl hover:shadow-[0_0_30px_rgba(242,125,38,0.4)] transition-all"
              >
                {t('common.volver')}
              </button>
            </div>
          </motion.div>
        </main>

        <footer className="bg-brand-dark border-t border-white/5 py-12 text-center text-gray-500 text-sm">
          <p>{t('footer.derechos')}</p>
        </footer>
      </div>
    );
  }

  if (showCookies) {
    return (
      <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-orange selection:text-white font-sans">
        <nav className="fixed top-0 left-0 w-full z-50 bg-brand-dark/90 backdrop-blur-xl py-6 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <span className="text-2xl font-display font-bold text-brand-orange tracking-tighter cursor-pointer" onClick={resetViews}>
              FAST<span className="text-white">MEC</span>
            </span>
            <button 
              onClick={resetViews}
              className="flex items-center gap-2 text-gray-400 hover:text-brand-orange transition-colors font-bold"
            >
              <X size={20} /> {t('common.volver')}
            </button>
          </div>
        </nav>

        <main className="pt-40 pb-32 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto glass-card p-8 md:p-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 text-brand-orange">{t('footer.cookies')}</h1>
            
            <div className="prose prose-invert prose-orange max-w-none space-y-8 text-gray-300 leading-relaxed text-lg">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">¿Qué son las cookies?</h2>
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario cuando visita un sitio web. Su finalidad es recordar información sobre la visita del usuario para mejorar la experiencia de navegación.
                </p>
                <p className="mt-4">
                  El sitio web de FASTMEC utiliza cookies propias y de terceros con el objetivo de mejorar la navegación del usuario, analizar el uso del sitio web y ofrecer contenidos adaptados a los intereses de los usuarios.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">¿Qué tipos de cookies utilizamos?</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-brand-orange mb-2">Cookies técnicas</h3>
                    <p>Son aquellas necesarias para el funcionamiento básico del sitio web y permiten la navegación y el uso de sus diferentes opciones o servicios.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-orange mb-2">Cookies de análisis</h3>
                    <p>Estas cookies permiten analizar el comportamiento de los usuarios en el sitio web con el fin de mejorar el funcionamiento del mismo.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-orange mb-2">Cookies de personalización</h3>
                    <p>Permiten recordar información para que el usuario acceda al servicio con determinadas características que pueden diferenciar su experiencia de la de otros usuarios.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-orange mb-2">Cookies de terceros</h3>
                    <p>Este sitio web puede utilizar servicios de terceros que recopilarán información con fines estadísticos y de uso del sitio web.</p>
                    <p className="mt-2">Entre ellos pueden incluirse herramientas como:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Google Analytics para el análisis del tráfico web.</li>
                      <li>Integraciones de WhatsApp para facilitar el contacto con los usuarios.</li>
                    </ul>
                    <p className="mt-2 text-sm italic">Estas herramientas pueden utilizar cookies para recopilar información anónima sobre el uso del sitio web.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">¿Cómo gestionar o desactivar las cookies?</h2>
                <p>El usuario puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo mediante la configuración de las opciones del navegador utilizado.</p>
                <p className="mt-4">A continuación se proporcionan enlaces con información sobre cómo gestionar las cookies en los navegadores más utilizados:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Microsoft Edge</a></li>
                </ul>
                <p className="mt-4 text-sm text-gray-400 italic">La desactivación de cookies puede afectar al funcionamiento correcto del sitio web.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Aceptación de la política de cookies</h2>
                <p>Al acceder a este sitio web, el usuario verá un aviso o banner de cookies. Al continuar navegando o aceptar el aviso, el usuario consiente el uso de cookies conforme a esta política.</p>
                <p className="mt-4">El usuario puede modificar su consentimiento en cualquier momento a través de la configuración de su navegador.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Cambios en la política de cookies</h2>
                <p>FASTMEC se reserva el derecho a modificar la presente política de cookies para adaptarla a cambios legislativos o técnicos. Se recomienda a los usuarios revisar esta página periódicamente.</p>
              </section>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex justify-center">
              <button 
                onClick={resetViews}
                className="px-10 py-4 bg-brand-orange text-white font-bold rounded-2xl hover:shadow-[0_0_30px_rgba(242,125,38,0.4)] transition-all"
              >
                {t('common.volver')}
              </button>
            </div>
          </motion.div>
        </main>

        <footer className="bg-brand-dark border-t border-white/5 py-12 text-center text-gray-500 text-sm">
          <p>{t('footer.derechos')}</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section id="inicio" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Image with Parallax-like effect */}
        <motion.div style={{ scale }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=2000" 
            alt="Mecánico trabajando en motor" 
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-sm font-bold uppercase tracking-widest mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              {t('hero.disponible')}
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-8 tracking-tight">
              {t('hero.titulo')} <br />
              <span className="text-brand-orange italic">{t('hero.subtitulo')}</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl font-medium">
              {t('hero.descripcion')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 relative z-20">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contacto" 
                className="px-10 py-5 bg-brand-orange text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(242,125,38,0.3)] hover:shadow-[0_25px_50px_rgba(242,125,38,0.4)] transition-all"
              >
                {t('hero.cta_ahora')} <ChevronRight size={24} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.95 }}
                href="#contacto" 
                className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all"
              >
                <Phone size={24} /> {t('hero.cta_llamar')}
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
          </div>
        </motion.div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="sobre-nosotros" className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1000" 
                  alt="Herramientas mecánicas profesionales" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="absolute -bottom-10 -right-10 glass-card p-10 max-w-[280px] shadow-2xl"
              >
                <div className="flex items-center gap-2 text-brand-orange mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="font-bold text-xl mb-2">{t('about.premium')}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{t('about.premium_desc')}</p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-10 leading-tight">{t('about.titulo_start')} <span className="text-brand-orange">{t('about.titulo_accent')}</span></h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                {t('about.desc1')}
              </p>
              <p className="text-lg text-gray-500 mb-12 leading-relaxed">
                {t('about.desc2')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  t('about.items.asistencia'),
                  t('about.items.maquinaria'),
                  t('about.items.vehiculos'),
                  t('about.items.diagnosis'),
                  t('about.items.garantia'),
                  t('about.items.precios')
                ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={item} 
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="font-bold text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="servicios" className="py-32 bg-brand-gray/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">{t('servicios.titulo')}</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              {t('servicios.subtitulo')}
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <ServiceCard 
              icon={Car} 
              title={t('servicios.coche.title')} 
              description={t('servicios.coche.desc')} 
            />
            <ServiceCard 
              icon={Truck} 
              title={t('servicios.camion.title')} 
              description={t('servicios.camion.desc')} 
            />
            <ServiceCard 
              icon={Settings} 
              title={t('servicios.tractor.title')} 
              description={t('servicios.tractor.desc')} 
            />
            <ServiceCard 
              icon={Zap} 
              title={t('servicios.diagnosis.title')} 
              description={t('servicios.diagnosis.desc')} 
            />
            <ServiceCard 
              icon={Droplets} 
              title={t('servicios.aceite.title')} 
              description={t('servicios.aceite.desc')} 
            />
            <ServiceCard 
              icon={Wrench} 
              title={t('servicios.frenos.title')} 
              description={t('servicios.frenos.desc')} 
            />
          </motion.div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="como-funciona" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">{t('como.titulo')}</h2>
            <p className="text-xl text-gray-400">{t('como.subtitulo')}</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-16 relative"
          >
            <div className="hidden lg:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent z-0" />
            
            <Step 
              number="01" 
              title={t('como.paso1.title')} 
              description={t('como.paso1.desc')} 
            />
            <Step 
              number="02" 
              title={t('como.paso2.title')} 
              description={t('como.paso2.desc')} 
            />
            <Step 
              number="03" 
              title={t('como.paso3.title')} 
              description={t('como.paso3.desc')} 
            />
          </motion.div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contacto" className="py-32 bg-brand-gray/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-10">{t('contacto.titulo_start')} <span className="text-brand-orange">{t('contacto.titulo_accent')}</span></h2>
              <p className="text-xl text-gray-400 mb-16 leading-relaxed">
                {t('contacto.subtitulo')}
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: Phone, label: t('contacto.labels.llamada'), value: "+34 642 379 218", color: "brand-orange" },
                  { icon: MessageCircle, label: t('contacto.labels.whatsapp'), value: t('contacto.values.whatsapp'), color: "green-500" },
                  { icon: Mail, label: t('contacto.labels.correo'), value: "info@fastmec.me", color: "brand-orange" }
                ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={item.label} 
                    className="flex items-center gap-6 p-8 glass-card hover:bg-white/5 transition-all group cursor-pointer"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-${item.color}/10 flex items-center justify-center text-${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon size={32} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase font-bold tracking-widest mb-1">{item.label}</p>
                      <p className="text-2xl font-bold text-white">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-12 md:p-16 relative"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/20 blur-[80px] -z-10" />
              <h3 className="text-3xl font-bold mb-10 font-display">{t('contacto.form.titulo')}</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t('contacto.form.nombre')}</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-6 py-5 bg-brand-dark/50 border border-white/10 rounded-2xl focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all text-lg"
                      placeholder={t('contacto.form.placeholder_nombre')}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t('contacto.form.telefono')}</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-6 py-5 bg-brand-dark/50 border border-white/10 rounded-2xl focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all text-lg"
                      placeholder={t('contacto.form.placeholder_telefono')}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t('contacto.form.vehiculo')}</label>
                  <textarea 
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-6 py-5 bg-brand-dark/50 border border-white/10 rounded-2xl focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all text-lg resize-none"
                    placeholder={t('contacto.form.placeholder_mensaje')}
                  ></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-6 bg-brand-orange text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-brand-orange/20 transition-all"
                >
                  {t('contacto.form.enviar')}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-brand-dark border-t border-white/5 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
            <div className="col-span-1 lg:col-span-1">
              <span className="text-4xl font-display font-bold text-brand-orange tracking-tighter mb-8 block">
                FAST<span className="text-white">MEC</span>
              </span>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                {t('footer.desc')}
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xl mb-10 font-display">{t('footer.especialidades')}</h4>
              <ul className="space-y-6 text-gray-500 font-medium">
                <li><a href="#servicios" className="hover:text-brand-orange transition-colors">{t('footer.items.turismos')}</a></li>
                <li><a href="#servicios" className="hover:text-brand-orange transition-colors">{t('footer.items.transporte')}</a></li>
                <li><a href="#servicios" className="hover:text-brand-orange transition-colors">{t('footer.items.maquinaria')}</a></li>
                <li><a href="#servicios" className="hover:text-brand-orange transition-colors">{t('footer.items.hibridos')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xl mb-10 font-display">{t('footer.navegacion')}</h4>
              <ul className="space-y-6 text-gray-500 font-medium">
                <li><a href="#inicio" className="hover:text-brand-orange transition-colors">{t('nav.inicio')}</a></li>
                <li><a href="#sobre-nosotros" className="hover:text-brand-orange transition-colors">{t('nav.sobre')}</a></li>
                <li><a href="#servicios" className="hover:text-brand-orange transition-colors">{t('nav.servicios')}</a></li>
                <li><a href="#contacto" className="hover:text-brand-orange transition-colors">{t('nav.contacto')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xl mb-10 font-display">{t('footer.contacto')}</h4>
              <div className="space-y-8">
                <div className="flex gap-4 text-gray-500">
                  <MapPin size={24} className="text-brand-orange flex-shrink-0" />
                  <p className="font-medium">{t('footer.ubicacion')}</p>
                </div>
                <div className="flex gap-4 text-gray-500">
                  <Phone size={24} className="text-brand-orange flex-shrink-0" />
                  <p className="font-bold text-white text-xl">+34 642 379 218</p>
                </div>
                <div className="flex gap-4 text-gray-500">
                  <Clock size={24} className="text-brand-orange flex-shrink-0" />
                  <p className="font-medium">{t('footer.disponible')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-gray-600 text-sm font-medium">
              {t('footer.derechos')}
            </p>
            <div className="flex gap-10 text-gray-600 text-sm font-medium">
              <button 
                onClick={() => setShowLegal(true)}
                className="hover:text-white transition-colors"
              >
                {t('footer.aviso')}
              </button>
              <button 
                onClick={() => setShowPrivacy(true)}
                className="hover:text-white transition-colors"
              >
                {t('footer.privacidad')}
              </button>
              <button 
                onClick={() => setShowCookies(true)}
                className="hover:text-white transition-colors"
              >
                {t('footer.cookies')}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
