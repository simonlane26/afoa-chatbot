import './index.css';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageCircle, ExternalLink, Calendar, Users, Building, GraduationCap, Briefcase } from 'lucide-react';

const AFOAChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm the AFOA Navigation Assistant. I can help you find information about the Airport Fire Officers Association website, including membership, training, events, suppliers, and job opportunities. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const afoaKnowledgeBase = {
    about: {
      keywords: ['about', 'what is', 'afoa', 'organization', 'mission', 'purpose'],
      response: "The Airport Fire Officers Association (AFOA) is a professional organization dedicated to supporting and advancing the interests of airport fire officers and fire services. We focus on promoting high standards in airport fire safety, emergency response, and leadership through training, information sharing, and collaboration. AFOA provides a platform for members to exchange knowledge, discuss industry developments, and enhance their skills in fire safety management."
    },
    membership: {
      keywords: ['member', 'join', 'membership', 'benefits', 'how to join'],
      response: "AFOA has increasingly become more international and welcomes members from across the globe. We have member airports from around the world including major UK airports like Heathrow, Gatwick, Manchester, and international airports like Dubai and Shannon. For membership information, please visit our 'Current Members' section or contact us directly through the website."
    },
    events: {
      keywords: ['event', 'conference', 'training', 'workshop', 'calendar'],
      response: "Our upcoming major event is the AFOA/ARFF Conference 2025 (28-30th April 2025). This year's conference focuses on operational response and includes keynote speakers, industry updates from CAA/FAA, international fire chiefs, advanced aviation tactics, and workshops on contaminants & cancers. The conference also features an overview and visit to Dublin Airport Fire Station. Exhibitors and sponsors can express interest until January 15th."
    },
    training: {
      keywords: ['training', 'course', 'education', 'learn', 'certification'],
      response: "AFOA partners with several accredited training providers:\n\n• Newcastle International Training Academy - Accredited firefighting and safety courses\n• Emergency Response Driver Training Ltd (ERDT) - RoSPA accredited airport fire service driver training\n• SimTrainerUK Ltd - Interactive and immersive training courses\n• Serco International Fire Training Centre - Aviation fire training since 1981\n• Fire Service College - Over 40 years of fire safety training experience\n\nThese providers offer various specializations including aviation firefighting, high-speed driver training, and emergency response."
    },
    suppliers: {
      keywords: ['supplier', 'equipment', 'manufacturer', 'vendor', 'products'],
      response: "AFOA works with numerous suppliers and manufacturers in the aviation fire safety industry. Key suppliers include:\n\n• Vehicle Manufacturers: Rosenbauer UK Ltd, Emergency One UK Ltd, Terberg DTS UK Ltd\n• Equipment Suppliers: Angloco Ltd, Cold Cut Systems, Delta Fire Ltd\n• Safety Equipment: GORE-TEX Professional Fabrics, Hunter Apparel Solutions, Steroplast Healthcare\n• Training Equipment: Flaim Systems, KFT Fire Trainer GmbH\n• Technology: Redkite Systems, Rescue Intellitech UK Ltd\n\nFor the complete list of suppliers and direct links to their websites, visit our Commercial section."
    },
    jobs: {
      keywords: ['job', 'career', 'vacancy', 'employment', 'firefighter', 'position'],
      response: "Our Job Vacancies section features the latest opportunities in airport firefighting and officer roles. Current opportunities include:\n\n• Trainee Firefighter positions at various airports\n• Full-time permanent positions with competitive salaries\n• Recent listings include positions at Edinburgh Airport and other major UK airports\n\nSalaries typically range from £41,438 to £43,674+ with shift allowances. We regularly update job listings, so check back often for new opportunities."
    },
    contact: {
      keywords: ['contact', 'reach', 'get in touch', 'email', 'phone'],
      response: "You can contact AFOA through our website at www.afoa.org.uk. We also maintain a presence on social media including Facebook and Twitter (@AFOA_UK). For specific inquiries about membership, training, or partnerships, please use the contact forms available on our website."
    },
    committee: {
      keywords: ['committee', 'leadership', 'chair', 'board', 'officers'],
      response: "The AFOA is led by a dedicated committee. Our current Chairperson is Waine Weaver, who has served on the committee since 2019. Waine began his fire service career in the Fleet Air Arm of the Royal Navy in 1992 and has extensive experience in airport fire services. For more information about our committee members and their backgrounds, visit the 'Our Committee' section."
    }
  };

  const quickActions = [
    { icon: Calendar, text: "Upcoming Events", keywords: ['event', 'conference'] },
    { icon: Users, text: "Membership Info", keywords: ['member', 'join'] },
    { icon: Building, text: "Suppliers", keywords: ['supplier', 'equipment'] },
    { icon: GraduationCap, text: "Training", keywords: ['training', 'course'] },
    { icon: Briefcase, text: "Job Vacancies", keywords: ['job', 'career'] }
  ];

  const findBestResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let bestMatch = null;
    let maxScore = 0;

    for (const [key, data] of Object.entries(afoaKnowledgeBase)) {
      let score = 0;
      data.keywords.forEach(keyword => {
        if (input.includes(keyword)) {
          score += keyword.length; // Longer keywords get higher scores
        }
      });
      if (score > maxScore) {
        maxScore = score;
        bestMatch = data;
      }
    }

    if (bestMatch) {
      return bestMatch.response;
    }

    // Default response with helpful suggestions
    return "I'm not sure about that specific question. I can help you with information about:\n\n• AFOA membership and benefits\n• Upcoming events and conferences\n• Training providers and courses\n• Equipment suppliers and manufacturers\n• Job vacancies and career opportunities\n• Contact information and committee details\n\nTry asking about any of these topics, or use the quick action buttons below!";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      const botResponse = findBestResponse(inputText);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (keywords) => {
    const sampleQuery = keywords[0];
    setInputText(sampleQuery);
    // Auto-send the quick action
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const formatMessage = (text) => {
    return text.split('\n').map((line, index) => (
      <div key={index} className="mb-1">
        {line}
      </div>
    ));
  };

  return (
    


    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AFOA Navigation Assistant</h1>
            <p className="text-sm opacity-90">Airport Fire Officers Association Guide</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'bot' && (
                  <Bot className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
                )}
                <div className="text-sm">
                  {formatMessage(message.text)}
                </div>
                {message.type === 'user' && (
                  <User className="w-4 h-4 mt-0.5 text-white flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-red-500" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-white border-t">
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Quick Actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.keywords)}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
              >
                <action.icon className="w-4 h-4" />
                <span>{action.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about AFOA membership, training, events, or suppliers..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 bg-gray-100 text-center">
        <p className="text-xs text-gray-600">
          For more information, visit{' '}
          <a href="https://www.afoa.org.uk" className="text-red-600 hover:underline inline-flex items-center">
            www.afoa.org.uk <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </p>
      </div>
    </div>
  );
};

export default AFOAChatbot;
