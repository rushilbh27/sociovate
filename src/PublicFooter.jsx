import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Modal from './Modal.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

export default function PublicFooter() {
  const [openModal, setOpenModal] = useState(null);
  const currentYear = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer id="socials" className="relative w-full border-t border-white/10 backdrop-blur-2xl bg-[#070b14]/90 overflow-hidden">
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(148,163,184,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.35) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />
      )}

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(56,189,248,0.35) 50%, transparent)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="max-w-7xl mx-auto px-4 py-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div className="space-y-4" custom={0} variants={columnVariants}>
            <a href="#" className="flex items-center gap-2">
              <img src="/logu.svg" alt="Sociovate" className="w-7 h-7 rounded-md" />
              <span className="text-lg font-bold tracking-[0.015em]">Sociovate</span>
            </a>
            <p className="text-sm text-slate-400">
              Connect businesses for automation and growth.
            </p>
          </motion.div>

          <motion.div className="space-y-4" custom={1} variants={columnVariants}>
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-sm text-slate-400 hover:text-white transition-colors cursor-target">About</a></li>
              <li><button type="button" onClick={() => setOpenModal('careers')} className="text-sm text-slate-400 hover:text-white transition-colors cursor-target">Careers</button></li>
              <li><a href="#cases" className="text-sm text-slate-400 hover:text-white transition-colors cursor-target">Blog</a></li>
            </ul>
          </motion.div>

          <motion.div className="space-y-4" custom={2} variants={columnVariants}>
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li><button type="button" onClick={() => setOpenModal('privacy')} className="text-sm text-slate-400 hover:text-white transition-colors cursor-target">Privacy Policy</button></li>
              <li><button type="button" onClick={() => setOpenModal('terms')} className="text-sm text-slate-400 hover:text-white transition-colors cursor-target">Terms of Service</button></li>            </ul>
          </motion.div>

          <motion.div className="space-y-4" custom={3} variants={columnVariants}>
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/company/sociovate1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-target"
                whileHover={shouldReduceMotion ? {} : { scale: 1.06, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </motion.a>
              {/* X (Twitter) */}
              <motion.a
                href="https://sociovate.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-target"
                whileHover={shouldReduceMotion ? {} : { scale: 1.06, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                aria-label="X"
              >
                {/* X.com logo */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.801-5.979 6.801h-3.308l7.734-8.835L2.861 2.25h6.837l4.805 6.34L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </motion.a>
              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/rushil.bhor/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-target"
                whileHover={shouldReduceMotion ? {} : { scale: 1.06, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/></svg>
              </motion.a>
              {/* GitHub */}
              <motion.a
                href="https://sociovate.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-target"
                whileHover={shouldReduceMotion ? {} : { scale: 1.06, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-10 pt-6 border-t border-white/10" variants={fadeUp}>
          <p className="text-sm text-slate-400 text-center">© {currentYear} Sociovate. All rights reserved.</p>
        </motion.div>

        {/* Futuristic modal for legal / careers */}
        <Modal
          isOpen={!!openModal}
          onClose={() => setOpenModal(null)}
          title={
            openModal === 'privacy' ? 'Privacy Policy'
              : openModal === 'terms' ? 'Terms of Service'
              : openModal === 'guidelines' ? 'Community Guidelines'
              : openModal === 'careers' ? 'Careers at Sociovate'
              : ''
          }
        >

          {openModal === 'privacy' && (
            <div>
              <p>Last updated: November 28, 2025</p>
              <p style={{marginTop:12}}><b>Privacy Policy</b></p>
              <p style={{marginTop:8}}>We respect your privacy. We do not sell or share your personal information with third parties except as required to provide our services or comply with the law. Information you provide is used only to operate and improve our services. We use industry-standard security measures to protect your data. By using this site, you consent to our privacy practices. For questions, contact us at <a href="mailto:rushil@sociovate.com">rushil@sociovate.com</a>.</p>
            </div>
          )}

          {openModal === 'terms' && (
            <div>
              <p>Last updated: November 28, 2025</p>
              <p style={{marginTop:12}}><b>Terms of Service</b></p>
              <p style={{marginTop:8}}>By using this website, you agree to use it for lawful purposes only. We do not guarantee uninterrupted or error-free service. We are not liable for any damages arising from your use of this site. Content is provided as-is and may change at any time. If you do not agree to these terms, please do not use our services.</p>
            </div>
          )}

          {openModal === 'guidelines' && (
            <div>
              <p>Last updated: November 28, 2025</p>
              <p style={{marginTop:12}}><b>Community Guidelines</b></p>
              <p style={{marginTop:8}}>We expect all users to be respectful and constructive. Do not post illegal, harmful, or offensive content. We reserve the right to moderate or remove content and restrict access to our services at our discretion. For questions or to report issues, contact <a href="mailto:rushil@sociovate.com">rushil@sociovate.com</a>.</p>
            </div>
          )}

          {openModal === 'careers' && (
            <div>
              <p>We're hiring! Check back soon for open roles.</p>
              <p style={{marginTop:12}}>If you are interested in joining Sociovate, please send your CV and a short note to <a href="mailto:rushil@sociovate.com">rushil@sociovate.com</a>. We'll post openings here when available.</p>
            </div>
          )}
        </Modal>
      </motion.div>
    </footer>
  );
}
