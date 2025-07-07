import React, { useState } from 'react';
import { BookOpen, AlertTriangle, Shield, Eye, ChevronRight, CheckCircle, X } from 'lucide-react';

const Education: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const topics = [
    {
      id: 'phishing-basics',
      title: 'Phishing Basics',
      description: 'Learn what phishing is and how to identify common attacks',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      content: {
        overview: 'Phishing is a type of cyber attack where criminals impersonate legitimate organizations to steal sensitive information.',
        keyPoints: [
          'Phishing emails often create urgency or fear',
          'Check sender addresses carefully',
          'Look for spelling and grammar errors',
          'Verify requests through official channels',
          'Never provide sensitive information via email'
        ],
        examples: [
          'Fake bank notifications requesting login credentials',
          'Urgent tax refund emails from fake government agencies',
          'Suspicious package delivery notifications',
          'Fake security alerts from tech companies'
        ]
      }
    },
    {
      id: 'email-security',
      title: 'Email Security',
      description: 'Best practices for secure email usage',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
      content: {
        overview: 'Email security involves protecting your email communications from unauthorized access and malicious content.',
        keyPoints: [
          'Use strong, unique passwords for email accounts',
          'Enable two-factor authentication',
          'Be cautious with email attachments',
          'Verify sender identity before responding',
          'Keep email software updated'
        ],
        examples: [
          'Using encrypted email services',
          'Scanning attachments before opening',
          'Checking email headers for authenticity',
          'Using secure email gateways'
        ]
      }
    },
    {
      id: 'social-engineering',
      title: 'Social Engineering',
      description: 'Understand psychological manipulation tactics',
      icon: Eye,
      color: 'from-purple-500 to-purple-600',
      content: {
        overview: 'Social engineering exploits human psychology to manipulate people into divulging confidential information.',
        keyPoints: [
          'Attackers often pose as authority figures',
          'They create artificial time pressure',
          'They exploit emotions like fear and curiosity',
          'They use publicly available information',
          'They build trust through small interactions'
        ],
        examples: [
          'Pretending to be IT support requesting passwords',
          'Fake surveys collecting personal information',
          'Impersonating executives in urgent requests',
          'Using social media information for targeted attacks'
        ]
      }
    }
  ];

  const quiz = {
    title: 'Phishing Awareness Quiz',
    questions: [
      {
        question: 'What is the most common way phishing attacks are delivered?',
        options: ['Email', 'Text messages', 'Phone calls', 'Social media'],
        correct: 0
      },
      {
        question: 'Which of these is a red flag for phishing emails?',
        options: ['Professional formatting', 'Generic greetings', 'Company logo', 'Proper grammar'],
        correct: 1
      },
      {
        question: 'What should you do if you receive a suspicious email?',
        options: ['Click links to verify', 'Forward to friends', 'Report and delete', 'Reply asking for proof'],
        correct: 2
      },
      {
        question: 'How can you verify if an email is legitimate?',
        options: ['Check the sender address only', 'Contact the organization directly', 'Click the provided links', 'Trust the content'],
        correct: 1
      }
    ]
  };

  const startQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setQuizScore(null);
  };

  const answerQuestion = (answerIndex: number) => {
    const newAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correctAnswers = newAnswers.filter((answer, index) => answer === quiz.questions[index].correct).length;
      setQuizScore(Math.round((correctAnswers / quiz.questions.length) * 100));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Security Education
        </h1>
        <p className="text-xl text-slate-400">
          Learn how to protect yourself from phishing and cyber threats
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${topic.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
              <p className="text-slate-400 mb-4">{topic.description}</p>
              <div className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                <span className="mr-2">Learn More</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Topic Detail */}
      {selectedTopic && (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {topics.find(t => t.id === selectedTopic)?.title}
            </h2>
            <button
              onClick={() => setSelectedTopic(null)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {(() => {
            const topic = topics.find(t => t.id === selectedTopic);
            if (!topic) return null;
            
            return (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Overview</h3>
                  <p className="text-slate-300">{topic.content.overview}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Key Points</h3>
                  <ul className="space-y-2">
                    {topic.content.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5" />
                        <span className="text-slate-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Examples</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {topic.content.examples.map((example, index) => (
                      <div key={index} className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                        <span className="text-slate-300">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Quiz Section */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-400" />
            {quiz.title}
          </h2>
          {quizScore === null && userAnswers.length === 0 && (
            <button
              onClick={startQuiz}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Start Quiz
            </button>
          )}
        </div>

        {/* Quiz Questions */}
        {userAnswers.length > 0 && quizScore === null && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </h3>
              <div className="text-sm text-slate-400">
                Progress: {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-white text-lg">{quiz.questions[currentQuestion].question}</p>
              <div className="space-y-3">
                {quiz.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => answerQuestion(index)}
                    className="w-full p-4 text-left bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-600/50 rounded-lg transition-all duration-200 text-white"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quiz Results */}
        {quizScore !== null && (
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <div className={`text-6xl font-bold ${
                quizScore >= 80 ? 'text-green-400' :
                quizScore >= 60 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {quizScore}%
              </div>
              <h3 className="text-2xl font-bold text-white">
                {quizScore >= 80 ? 'Excellent!' :
                 quizScore >= 60 ? 'Good Job!' :
                 'Keep Learning!'}
              </h3>
              <p className="text-slate-400">
                You got {userAnswers.filter((answer, index) => answer === quiz.questions[index].correct).length} out of {quiz.questions.length} questions correct.
              </p>
            </div>
            
            <button
              onClick={startQuiz}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;