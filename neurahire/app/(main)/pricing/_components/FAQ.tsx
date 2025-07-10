import React from 'react'
 import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
const FAQS = [
  {
    faqHeader: "Can I switch plans anytime?",
    faqContent: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    faqHeader: "Is there a setup fee?",
    faqContent: "No setup fees. You only pay for the plan you choose, and you can start immediately.",
  },
  {
    faqHeader: "What payment methods do you accept?",
    faqContent: "We accept all major credit cards and can invoice enterprise customers.",
  },
  {
    faqHeader: "Do you offer refunds?",
    faqContent: "Yes, we offer a 30-day money-back guarantee for all paid plans.",
  },
]
function FAQ() {
  return (
    <div>
      {/* FAQ Section */}
        <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-purple-600 mb-8">
            Frequently Asked Questions
            </h2>
            <Accordion
            type="single"
            collapsible
            className="w-[100%]"
            defaultValue="item-1"
            >
            {FAQS.map((faq, idx) => (
              <AccordionItem value={`item-${idx + 1}`} key={faq.faqHeader}>
              <AccordionTrigger className="font-semibold text-gray-900 mb-2">
                {faq.faqHeader}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-start">
                {faq.faqContent}
              </AccordionContent>
              </AccordionItem>
            ))}
            </Accordion>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8  max-w-4xl mx-auto">
    
          </div>

        </div>
    </div>
  )
}

export default FAQ

