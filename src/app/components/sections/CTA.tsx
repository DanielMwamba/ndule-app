"use client"

import { motion } from "framer-motion"
import { HiSparkles } from "react-icons/hi2"
import { Button } from "@/components/ui/button"
import { Badge } from "@/app/components/ui/badge"

export function CTASection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-green-500/5 to-transparent" />
      </div>

      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-green-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Badge className="mb-4 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                <HiSparkles className="mr-1 h-3 w-3 text-green-400" />
                Accès premium
              </Badge>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Prêt à vivre une expérience musicale sans limites ?
              </h2>

              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Créez votre compte dès maintenant et profitez d&apos;un accès illimité à des millions de titres, des
                recommandations personnalisées et bien plus encore.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto">
                  Créer un compte
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  En savoir plus
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

