import { useState } from 'react';
import { Search, HelpCircle, MessageSquare, ChevronRight, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  
  // Mock FAQ data
  const faqs: FAQItem[] = [
    {
      question: 'How does the rental process work?',
      answer: 'Our rental process is simple: Browse items, select one you want to rent, choose dates, and complete the booking. You\'ll then arrange pickup or delivery with the owner. After using the item, return it by the agreed-upon time. The security deposit will be refunded after the owner confirms the item\'s condition.',
      category: 'General'
    },
    {
      question: 'What happens if an item is damaged during my rental?',
      answer: 'If an item is damaged during your rental period, you should notify the owner immediately. Depending on the extent of the damage, a portion or all of your security deposit may be withheld. For significant damage exceeding the deposit amount, our customer support team will mediate a fair resolution.',
      category: 'Returns & Damage'
    },
    {
      question: 'How is my security deposit calculated?',
      answer: 'Security deposits are typically set at 50% of the item\'s value or a minimum of ₹500, whichever is higher. For high-value items, the owner may set a custom deposit amount. The deposit is fully refundable when you return the item in its original condition.',
      category: 'Payments'
    },
    {
      question: 'Can I extend my rental period?',
      answer: 'Yes, you can request an extension through the app. Go to "My Rentals," select the active rental, and click "Request Extension." The owner will need to approve this request, and additional rental fees will apply for the extended period.',
      category: 'Bookings'
    },
    {
      question: 'How do I increase my trust score?',
      answer: 'You can increase your trust score by: verifying your identity, adding a payment method, completing successful rentals, receiving positive reviews, connecting social media accounts, and maintaining a good rental history without cancellations or damages.',
      category: 'Account'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards and UPI payments. All transactions are processed securely through our platform to protect both parties. We do not support cash payments to ensure transparency and protection for all users.',
      category: 'Payments'
    }
  ];
  
  const filteredFAQs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;
  
  const toggleFAQ = (question: string) => {
    if (expandedFAQ === question) {
      setExpandedFAQ(null);
    } else {
      setExpandedFAQ(question);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto animate-slide-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Help & Support</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to frequently asked questions or get in touch with our support team
        </p>
      </div>
      
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for help or FAQs..."
            className="input pl-12 py-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={24} className="absolute left-4 top-3.5 text-gray-400" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle size={32} className="text-purple-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">FAQs</h3>
          <p className="text-gray-600 mb-4">Find answers to frequently asked questions</p>
          <button className="btn btn-outline w-full">
            Browse FAQs
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={32} className="text-purple-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Chat Support</h3>
          <p className="text-gray-600 mb-4">Talk to our customer support team</p>
          <button className="btn btn-primary w-full">
            Start Chat
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Video Guides</h3>
          <p className="text-gray-600 mb-4">Watch tutorials and how-to videos</p>
          <button className="btn btn-outline w-full">
            Watch Videos
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Frequently Asked Questions</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div key={index} className="p-6">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleFAQ(faq.question)}
                >
                  <h3 className="font-medium text-gray-800">{faq.question}</h3>
                  {expandedFAQ === faq.question ? (
                    <ChevronDown size={20} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-500" />
                  )}
                </button>
                
                {expandedFAQ === faq.question && (
                  <div className="mt-3 text-gray-600 animate-fade-in">
                    <p>{faq.answer}</p>
                    <p className="mt-2 text-sm text-gray-500">Category: {faq.category}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <Search size={32} className="mx-auto mb-3 text-gray-300" />
              <h3 className="font-medium text-gray-700 mb-1">No results found</h3>
              <p className="text-gray-500">
                We couldn't find any FAQs matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-sm overflow-hidden mb-12 text-white">
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Our support team is available 7 days a week to assist you with any questions or issues you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-white text-purple-600 hover:bg-gray-100">
              Contact Support
            </button>
            <button className="btn bg-purple-500 text-white border border-white hover:bg-purple-600">
              Email Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;