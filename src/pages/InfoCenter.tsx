import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  HelpCircle, 
  FileText, 
  Building, 
  Clock,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export const InfoCenter: React.FC = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('basics');

  const sections = [
    { id: 'basics', title: t('info.sections.basics'), icon: BookOpen },
    { id: 'whatToAsk', title: t('info.sections.whatToAsk'), icon: HelpCircle },
    { id: 'process', title: t('info.sections.process'), icon: FileText },
    { id: 'departments', title: t('info.sections.departments'), icon: Building },
    { id: 'timeline', title: t('info.sections.timeline'), icon: Clock },
  ];

  const renderBasics = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-100 to-green-100 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is RTI?</h2>
        <p className="text-gray-700 leading-relaxed">
          The Right to Information (RTI) Act 2005 is a law that gives every Indian citizen the right to access information 
          from public authorities. It promotes transparency and accountability in government functioning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Rights</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Access to government information</li>
            <li>• Know how your taxes are used</li>
            <li>• Check status of applications</li>
            <li>• Get copies of documents</li>
            <li>• Question government decisions</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <AlertCircle className="h-8 w-8 text-orange-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Points</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• RTI application fee: ₹10</li>
            <li>• Response within 30 days</li>
            <li>• BPL citizens: No fee</li>
            <li>• Can file in any Indian language</li>
            <li>• Appeal if no response</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Sample RTI Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-700">"What is the status of my ration card application submitted on [date]?"</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-700">"How much budget was allocated for road construction in my area this year?"</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-700">"What are the eligibility criteria for the PM Housing Scheme?"</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-700">"How many teachers are sanctioned vs. actually working in my village school?"</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWhatToAsk = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold text-green-900 mb-4">You CAN Ask For</h3>
          <ul className="space-y-3 text-green-800">
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Status of your government applications</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Government policies and schemes</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Budget allocation and expenditure</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Selection criteria for government jobs</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Details of government contracts</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Environmental clearances</span>
            </li>
          </ul>
        </div>

        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <XCircle className="h-8 w-8 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-red-900 mb-4">You CANNOT Ask For</h3>
          <ul className="space-y-3 text-red-800">
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Personal information of other citizens</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Information affecting national security</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Cabinet papers before decisions are taken</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Trade secrets or commercial confidence</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Information from foreign governments</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Personal requests or complaints</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
        <AlertCircle className="h-8 w-8 text-orange-500 mb-4" />
        <h3 className="text-lg font-semibold text-orange-900 mb-4">Tips for Effective RTI</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-orange-900 mb-2">Be Specific</h4>
              <p className="text-orange-800 text-sm">Ask for exact information with dates, locations, and reference numbers.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-orange-900 mb-2">One Topic Per RTI</h4>
              <p className="text-orange-800 text-sm">Keep each RTI focused on a single topic for better responses.</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-orange-900 mb-2">Choose Right Department</h4>
              <p className="text-orange-800 text-sm">File RTI with the department that actually holds the information.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-orange-900 mb-2">Keep Records</h4>
              <p className="text-orange-800 text-sm">Always keep copies and track submission dates for follow-up.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProcess = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">RTI Process Step by Step</h2>
        
        <div className="space-y-6">
          {[
            {
              step: 1,
              title: "Prepare Your RTI Application",
              description: "Write a clear, specific request mentioning what information you need.",
              details: ["Use simple, clear language", "Be specific about dates and locations", "Mention the department/office name"]
            },
            {
              step: 2,
              title: "Submit to Public Information Officer (PIO)",
              description: "File your RTI with the relevant government department's PIO.",
              details: ["Pay ₹10 fee (free for BPL)", "Submit in person, by post, or online", "Get acknowledgment receipt"]
            },
            {
              step: 3,
              title: "Wait for Response",
              description: "PIO must respond within 30 days (48 hours if life/liberty matter).",
              details: ["Track using receipt number", "Response can be partial or complete", "PIO may transfer to correct department"]
            },
            {
              step: 4,
              title: "File First Appeal (if needed)",
              description: "If no response or unsatisfactory response, appeal to higher authority.",
              details: ["File within 30 days", "No additional fee required", "Appellate authority has 45 days to respond"]
            },
            {
              step: 5,
              title: "Second Appeal to Information Commission",
              description: "Final appeal to State/Central Information Commission if needed.",
              details: ["File within 90 days", "Commission has 45 days to decide", "Can impose penalties on officials"]
            }
          ].map((item, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {item.step}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-3">{item.description}</p>
                <ul className="space-y-1">
                  {item.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-500 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDepartments = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Government Departments</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Revenue Department",
              topics: ["Land records", "Property tax", "Revenue certificates", "Mutation records"],
              color: "from-blue-500 to-blue-600"
            },
            {
              name: "Health & Family Welfare",
              topics: ["Hospital records", "Medicine procurement", "Health schemes", "Medical staff"],
              color: "from-green-500 to-green-600"
            },
            {
              name: "Education Department",
              topics: ["School infrastructure", "Teacher appointments", "Scholarship schemes", "Exam results"],
              color: "from-purple-500 to-purple-600"
            },
            {
              name: "Public Works Department",
              topics: ["Road construction", "Building approvals", "Tender documents", "Project status"],
              color: "from-orange-500 to-orange-600"
            },
            {
              name: "Police Department",
              topics: ["FIR status", "Police verification", "Crime statistics", "Station records"],
              color: "from-red-500 to-red-600"
            },
            {
              name: "Municipal Corporation",
              topics: ["Water supply", "Waste management", "Building permissions", "Property tax"],
              color: "from-teal-500 to-teal-600"
            }
          ].map((dept, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <div className={`w-12 h-12 bg-gradient-to-br ${dept.color} rounded-xl flex items-center justify-center mb-4`}>
                <Building className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{dept.name}</h3>
              <ul className="space-y-2">
                {dept.topics.map((topic, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">RTI Timelines & Deadlines</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <Clock className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-4">Response Timelines</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-medium text-green-800">Normal RTI Response</span>
                <span className="text-green-600 font-bold">30 days</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-medium text-green-800">Life/Liberty Matter</span>
                <span className="text-green-600 font-bold">48 hours</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-medium text-green-800">BPL Citizen Response</span>
                <span className="text-green-600 font-bold">30 days</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
            <AlertCircle className="h-8 w-8 text-orange-500 mb-4" />
            <h3 className="text-lg font-semibold text-orange-900 mb-4">Appeal Timelines</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-medium text-orange-800">First Appeal Filing</span>
                <span className="text-orange-600 font-bold">30 days</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-medium text-orange-800">First Appeal Response</span>
                <span className="text-orange-600 font-bold">45 days</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-medium text-orange-800">Second Appeal Filing</span>
                <span className="text-orange-600 font-bold">90 days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Important Reminders</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Track Deadlines</h4>
              <p className="text-blue-800 text-sm">Always note the date you file RTI to track 30-day deadline.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">No Response = Deemed Refusal</h4>
              <p className="text-blue-800 text-sm">If no response after 30 days, you can file first appeal.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Penalty for Delay</h4>
              <p className="text-blue-800 text-sm">Information Commission can impose ₹25,000 penalty on defaulting officers.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Keep Records</h4>
              <p className="text-blue-800 text-sm">Maintain all receipts and correspondence for appeals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'basics': return renderBasics();
      case 'whatToAsk': return renderWhatToAsk();
      case 'process': return renderProcess();
      case 'departments': return renderDepartments();
      case 'timeline': return renderTimeline();
      default: return renderBasics();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('info.title')}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Everything you need to know about the Right to Information Act and how to use it effectively.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-orange-100 text-orange-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <section.icon className="h-5 w-5" />
                  <span>{section.title}</span>
                  <ChevronRight className={`h-4 w-4 ml-auto transition-transform ${
                    activeSection === section.id ? 'rotate-90' : ''
                  }`} />
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};