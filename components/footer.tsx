import Link from "next/link"
import { Github, Instagram, Linkedin, Globe, Facebook, Heart, ExternalLink } from "lucide-react"

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/anbuinfosec", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/anbuinfosec/", label: "Instagram" },
    { icon: Github, href: "https://github.com/anbuinfosec", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/anbuinfosec/", label: "LinkedIn" },
    { icon: Globe, href: "https://anbuinfosec.xyz", label: "Website" },
  ]

  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">bKash Next.js Integration</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A complete solution for integrating bKash payment gateway with Next.js applications.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/anbuinfosec/bkash-pgw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://developer.bka.sh/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <ExternalLink className="h-4 w-4" />
                bKash Docs
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/developer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Developer
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-left">
            &copy; {year}{" "}
            <a
              href="https://anbuinfosec.xyz"
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Mohammad Alamin
            </a>
            . All rights reserved.
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500" /> by{" "}
            <a
              href="https://github.com/anbuinfosec"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400"
            >
              @anbuinfosec
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
