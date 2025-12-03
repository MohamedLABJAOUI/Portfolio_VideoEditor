import { motion } from 'framer-motion'
import Squares from '../components/Squares'

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const text = `📩 New Contact Message:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const whatsappNumber = "212625671316"; 

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Animated Squares Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction='diagonal'
          borderColor='rgba(155, 74, 254, 0.3)'
          hoverFillColor='rgba(155, 74, 254, 0.4)'
        />
      </div>
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-1 text-center">
            Get In <span className="text-secondary">Touch</span>
          </h1>
          <p className="text-text/70 text-center mb-4 text-sm">
            Have a project in mind? Let's work together to bring your vision to life.
          </p>

          <div className="bg-card/50 rounded-2xl p-4 md:p-6 border border-card">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-text mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary text-text text-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-text mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary text-text text-sm"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-text mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="3"
                  className="w-full px-3 py-2 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary text-text resize-none text-sm"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-2 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-secondary/90 transition-all transform hover:scale-105"
              >
                Send to WhatsApp
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact

