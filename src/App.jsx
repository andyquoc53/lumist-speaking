import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, ChevronRight, Lightbulb, RefreshCw, Volume2, Clock, Flame, Coins, Zap, Calendar, BookOpen, Target, Brain, MessageSquare, Trophy, Play, Pause, AlertCircle, CheckCircle, X, ChevronLeft, Timer, Globe } from 'lucide-react';

// Lumist Design System Colors
const colors = {
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  secondary: '#6366F1',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
  }
};

// Translations
const translations = {
  en: {
    hello: "Hello",
    daysUntil: "days until your IELTS exam",
    speakingScore: "Speaking Score",
    dailyStreaks: "Daily Streaks",
    coins: "Coins",
    aiSummary: "AI Summary",
    inProgress: "In Progress",
    continue: "Continue",
    dailyQuests: "Daily Quests",
    seeAll: "See all",
    completeToOpen: "Complete all tasks to open",
    aiPlanner: "AI Planner",
    viewCalendar: "View Calendar",
    noTasks: "No tasks",
    practiceTopics: "Practice Topics",
    part1: "Part 1",
    part2: "Part 2", 
    part3: "Part 3",
    questions: "questions",
    startPractice: "Start Practice",
    mockTest: "Mock Test",
    mockTestDesc: "Full 11-14 min exam simulation",
    question: "Question",
    yourResponse: "Your Response",
    startRecording: "Start Recording",
    stopRecording: "Stop Recording",
    getFeedback: "Get AI Feedback",
    analyzing: "Analyzing...",
    needIdeas: "Need ideas?",
    listeningStart: "Listening... Start speaking!",
    clickToRecord: "Click the microphone to start recording",
    playRecording: "Play Recording",
    score: "Score",
    feedback: "Feedback",
    strengths: "Strengths",
    improvements: "To Improve",
    sampleAnswer: "Sample Answer",
    fluency: "Fluency",
    vocabulary: "Vocabulary", 
    grammar: "Grammar",
    pronunciation: "Pronunciation",
    overall: "Overall",
    newQuestion: "New Question",
    back: "Back",
    exclusive: "Exclusive",
    duration: "Duration",
    resources: "Resources",
    progress: "Progress",
    speakingChallenge: "Speaking Challenge",
    vocabularyPractice: "Vocabulary Practice",
    prepTime: "Prep Time",
    speakNow: "Speak Now!",
    nextQuestion: "Next",
    finishTest: "Finish",
    testComplete: "Test Complete!",
    greatJob: "Great job completing the mock test!",
    tryAgain: "Try Again",
    exitTest: "Exit",
  },
  vi: {
    hello: "Xin chào",
    daysUntil: "ngày đến kỳ thi IELTS",
    speakingScore: "Điểm Speaking",
    dailyStreaks: "Chuỗi ngày",
    coins: "Xu",
    aiSummary: "AI Tổng hợp",
    inProgress: "Đang học",
    continue: "Tiếp tục",
    dailyQuests: "Nhiệm vụ hàng ngày",
    seeAll: "Xem tất cả",
    completeToOpen: "Hoàn thành để mở",
    aiPlanner: "AI Lập kế hoạch",
    viewCalendar: "Xem lịch",
    noTasks: "Chưa có",
    practiceTopics: "Chủ đề luyện tập",
    part1: "Phần 1",
    part2: "Phần 2",
    part3: "Phần 3",
    questions: "câu hỏi",
    startPractice: "Bắt đầu",
    mockTest: "Thi thử",
    mockTestDesc: "Mô phỏng bài thi 11-14 phút",
    question: "Câu hỏi",
    yourResponse: "Câu trả lời của bạn",
    startRecording: "Bắt đầu ghi âm",
    stopRecording: "Dừng ghi âm",
    getFeedback: "Nhận phản hồi AI",
    analyzing: "Đang phân tích...",
    needIdeas: "Cần gợi ý?",
    listeningStart: "Đang nghe... Hãy nói!",
    clickToRecord: "Nhấn mic để bắt đầu",
    playRecording: "Phát lại",
    score: "Điểm",
    feedback: "Nhận xét",
    strengths: "Điểm mạnh",
    improvements: "Cần cải thiện",
    sampleAnswer: "Câu trả lời mẫu",
    fluency: "Lưu loát",
    vocabulary: "Từ vựng",
    grammar: "Ngữ pháp",
    pronunciation: "Phát âm",
    overall: "Tổng",
    newQuestion: "Câu mới",
    back: "Quay lại",
    exclusive: "Độc quyền",
    duration: "Thời lượng",
    resources: "Tài liệu",
    progress: "Tiến độ",
    speakingChallenge: "Thử thách Speaking",
    vocabularyPractice: "Luyện từ vựng",
    prepTime: "Chuẩn bị",
    speakNow: "Nói ngay!",
    nextQuestion: "Tiếp",
    finishTest: "Kết thúc",
    testComplete: "Hoàn thành!",
    greatJob: "Tuyệt vời! Bạn đã hoàn thành bài thi thử!",
    tryAgain: "Làm lại",
    exitTest: "Thoát",
  }
};

// Question Bank
const questionBank = {
  part1: {
    name: { en: "Part 1 - Introduction", vi: "Phần 1 - Giới thiệu" },
    duration: "4-5 min",
    icon: "💬",
    color: "blue",
    topics: {
      "Work & Study 💼": [
        "What do you do for work or study?",
        "Why did you choose this job/field of study?",
        "What do you like most about your work/studies?",
        "Do you prefer to work alone or in a team?",
      ],
      "Hometown 🏠": [
        "Where is your hometown?",
        "What do you like about your hometown?",
        "Has your hometown changed much recently?",
        "Would you like to live there in the future?",
      ],
      "Technology 📱": [
        "What apps do you use most often?",
        "Do you think technology has made life easier?",
        "How often do you use social media?",
        "What technology could you not live without?",
      ],
      "Food & Cooking 🍳": [
        "What is your favorite food?",
        "Do you like cooking?",
        "How often do you eat out?",
        "What food would you recommend to visitors?",
      ],
      "Music & Entertainment 🎵": [
        "What kind of music do you like?",
        "Do you play any musical instruments?",
        "How often do you listen to music?",
        "Do you like going to concerts?",
      ],
    }
  },
  part2: {
    name: { en: "Part 2 - Long Turn", vi: "Phần 2 - Nói dài" },
    duration: "3-4 min",
    icon: "🎤",
    color: "purple",
    topics: {
      "People 👥": [
        "Describe a person who has influenced you.\n\nYou should say:\n• Who this person is\n• How you know them\n• What they have done\n• Why they influenced you",
        "Describe a friend you've known for a long time.\n\nYou should say:\n• Who this person is\n• How you met\n• What you do together\n• Why the friendship is important",
      ],
      "Places 🌍": [
        "Describe a place you would like to visit.\n\nYou should say:\n• Where it is\n• How you know about it\n• What you would do there\n• Why you want to visit",
        "Describe a quiet place you like.\n\nYou should say:\n• Where it is\n• How often you go\n• What you do there\n• Why you like it",
      ],
      "Experiences ⭐": [
        "Describe a skill you learned that you're proud of.\n\nYou should say:\n• What the skill is\n• How you learned it\n• How long it took\n• Why you're proud",
        "Describe a memorable trip.\n\nYou should say:\n• Where you went\n• Who you went with\n• What you did\n• Why it was memorable",
      ],
    }
  },
  part3: {
    name: { en: "Part 3 - Discussion", vi: "Phần 3 - Thảo luận" },
    duration: "4-5 min",
    icon: "💭",
    color: "indigo",
    topics: {
      "Education 📚": [
        "How has education changed in your country?",
        "Is online learning as effective as classroom learning?",
        "What skills are most important for students today?",
        "Should education focus on practical or academic skills?",
      ],
      "Technology & Society 💻": [
        "How has technology affected communication?",
        "Does social media have more positive or negative effects?",
        "How might AI change jobs in the future?",
        "Do children spend too much time on devices?",
      ],
      "Environment 🌱": [
        "What can individuals do to protect the environment?",
        "Are governments doing enough about climate change?",
        "How can cities become more eco-friendly?",
        "Should companies be penalized for pollution?",
      ],
    }
  }
};

// Mock Test Questions
const mockTestQuestions = {
  part1: [
    "Let's talk about your hometown. Where are you from?",
    "What do you like most about living there?",
    "Now let's talk about technology. What apps do you use regularly?",
    "Do you think people rely too much on technology?",
  ],
  part2: {
    cue: "Describe a skill you would like to learn.\n\nYou should say:\n• What the skill is\n• Why you want to learn it\n• How you would learn it\n• How this skill would benefit you",
  },
  part3: [
    "Why do some people learn skills faster than others?",
    "Should schools teach more practical skills?",
    "How has the internet changed learning?",
  ]
};

// Tiger Mascot SVG Component
const TigerMascot = ({ className = "w-12 h-12" }) => (
  <div className={`${className} bg-orange-100 rounded-full flex items-center justify-center text-2xl`}>
    🐯
  </div>
);

// Chest/Reward Icon
const ChestIcon = ({ locked = true }) => (
  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${locked ? 'bg-gray-200' : 'bg-yellow-100'}`}>
    {locked ? '🔒' : '🎁'}
  </div>
);

export default function LumistIELTSSpeaking() {
  const [lang, setLang] = useState('vi');
  const t = translations[lang];
  
  // User stats (mock data)
  const [userStats, setUserStats] = useState({
    score: 6.5,
    streaks: 3,
    coins: 150,
    daysUntilExam: 45,
    userName: "Learner"
  });

  // App state
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'practice' | 'mockTest'
  const [currentPart, setCurrentPart] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // AI state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showIdeas, setShowIdeas] = useState(false);
  const [ideas, setIdeas] = useState(null);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
  const [error, setError] = useState(null);

  // Mock test state
  const [mockTestPhase, setMockTestPhase] = useState(null);
  const [mockTestQuestionIndex, setMockTestQuestionIndex] = useState(0);
  const [mockTestTimer, setMockTestTimer] = useState(0);
  const [isPrepTime, setIsPrepTime] = useState(false);

  // Refs
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null); // Store stream separately
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            final += result[0].transcript + ' ';
          } else {
            interim += result[0].transcript;
          }
        }
        if (final) setTranscript(prev => prev + final);
        setInterimTranscript(interim);
      };

      recognitionRef.current.onend = () => {
        if (isRecording && recognitionRef.current) {
          try { recognitionRef.current.start(); } catch (e) {}
        }
      };
    }

    return () => {
      if (recognitionRef.current) try { recognitionRef.current.stop(); } catch(e) {}
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Timer
  useEffect(() => {
    if (isRecording || isPrepTime) {
      timerRef.current = setInterval(() => {
        if (isPrepTime) {
          setMockTestTimer(prev => {
            if (prev <= 1) {
              setIsPrepTime(false);
              setMockTestTimer(120);
              return 120;
            }
            return prev - 1;
          });
        } else if (isRecording) {
          setRecordingTime(prev => prev + 1);
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRecording, isPrepTime]);

  const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  const startRecording = async () => {
    setTranscript("");
    setInterimTranscript("");
    setRecordingTime(0);
    setFeedback(null);
    setError(null);
    setAudioUrl(null);
    audioChunksRef.current = [];

    // Check if browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError(lang === 'vi' 
        ? 'Trình duyệt không hỗ trợ ghi âm. Vui lòng dùng Chrome hoặc Edge.' 
        : 'Browser does not support recording. Please use Chrome or Edge.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream; // Store stream in separate ref
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorderRef.current.start();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.log("Speech recognition not available, using ElevenLabs STT only");
        }
      }
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone error:", err);
      
      // Provide specific error messages
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError(lang === 'vi' 
          ? 'Microphone bị chặn. Nhấn vào biểu tượng 🔒 trên thanh địa chỉ → cho phép Microphone → tải lại trang.' 
          : 'Microphone blocked. Click the 🔒 icon in address bar → Allow Microphone → Reload page.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError(lang === 'vi' 
          ? 'Không tìm thấy microphone. Vui lòng kết nối microphone.' 
          : 'No microphone found. Please connect a microphone.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setError(lang === 'vi' 
          ? 'Microphone đang được sử dụng bởi ứng dụng khác. Vui lòng đóng ứng dụng khác và thử lại.' 
          : 'Microphone is being used by another app. Please close other apps and try again.');
      } else {
        setError(lang === 'vi' 
          ? `Lỗi microphone: ${err.message}. Thử tải lại trang.` 
          : `Microphone error: ${err.message}. Try reloading the page.`);
      }
    }
  };

  const stopRecording = async () => {
    if (recognitionRef.current) try { recognitionRef.current.stop(); } catch(e) {}
    
    // Get the final audio blob before stopping
    const getAudioBlob = () => new Promise((resolve) => {
      if (mediaRecorderRef.current?.state !== 'inactive') {
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          // Clean up media stream
          if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
          }
          resolve(blob);
        };
        mediaRecorderRef.current.stop();
      } else {
        resolve(null);
      }
    });
    
    setIsRecording(false);
    setInterimTranscript("");
    
    const audioBlob = await getAudioBlob();
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      
      // Auto-transcribe with ElevenLabs if API key is set (more accurate than browser)
      if (ELEVENLABS_API_KEY) {
        const accurateTranscript = await transcribeWithElevenLabs(audioBlob);
        if (accurateTranscript) {
          setTranscript(accurateTranscript);
        }
      }
    }
  };

  // ElevenLabs Speech-to-Text - captures EXACT speech without auto-correction
  const transcribeWithElevenLabs = async (audioBlob) => {
    if (!ELEVENLABS_API_KEY) {
      console.log("No ElevenLabs key, using browser transcription");
      return null;
    }
    
    setIsTranscribing(true);
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');
      formData.append('model_id', 'scribe_v1'); // ElevenLabs Scribe model
      formData.append('language_code', 'en'); // English
      
      const response = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        // ElevenLabs returns { text: "transcription" }
        return data.text;
      }
      throw new Error('ElevenLabs STT error');
    } catch (err) {
      console.error('ElevenLabs STT error:', err);
      return null;
    } finally {
      setIsTranscribing(false);
    }
  };

  // Re-transcribe audio with ElevenLabs (for accurate results without auto-correct)
  const reTranscribeAudio = async () => {
    if (!audioUrl || !ELEVENLABS_API_KEY) {
      setError(lang === 'vi' ? 'Cần API key ElevenLabs' : 'ElevenLabs API key required');
      return;
    }
    
    setIsTranscribing(true);
    try {
      // Fetch the audio blob from the URL
      const response = await fetch(audioUrl);
      const audioBlob = await response.blob();
      
      const transcribedText = await transcribeWithElevenLabs(audioBlob);
      if (transcribedText) {
        setTranscript(transcribedText);
      }
    } catch (err) {
      setError(lang === 'vi' ? 'Lỗi chuyển đổi giọng nói' : 'Transcription error');
    } finally {
      setIsTranscribing(false);
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  // ============ CONFIGURATION ============
  // API key loaded from environment variable (secure)
  const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || "";
  
  // Voice options by accent
  const VOICES = {
    british: {
      id: "21m00Tcm4TlvDq8ikWAM", // Rachel - British female
      name: "Rachel",
      flag: "🇬🇧"
    },
    american: {
      id: "EXAVITQu4vr4xnSDxMaL", // Bella - American female  
      name: "Bella",
      flag: "🇺🇸"
    }
  };
  // =========================================

  const [voiceAccent, setVoiceAccent] = useState('british'); // 'british' or 'american'
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const audioPlayerRef = useRef(null);

  const speakQuestion = async (text) => {
    const textToSpeak = text || currentQuestion;
    
    // Stop any current playback
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    speechSynthesis.cancel();

    // Use ElevenLabs with selected accent
    if (ELEVENLABS_API_KEY) {
      setIsSpeaking(true);
      try {
        const selectedVoice = VOICES[voiceAccent];
        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "xi-api-key": ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
              text: textToSpeak.replace(/[•\n]/g, ' ').substring(0, 500),
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
                style: 0.3,
                use_speaker_boost: true
              }
            }),
          }
        );

        if (response.ok) {
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          audioPlayerRef.current = new Audio(audioUrl);
          audioPlayerRef.current.onended = () => setIsSpeaking(false);
          audioPlayerRef.current.onerror = () => setIsSpeaking(false);
          await audioPlayerRef.current.play();
        } else {
          throw new Error("ElevenLabs API error");
        }
      } catch (err) {
        console.error("ElevenLabs error, falling back to browser TTS:", err);
        setIsSpeaking(false);
        // Fallback to browser TTS
        const u = new SpeechSynthesisUtterance(textToSpeak);
        u.lang = voiceAccent === 'british' ? 'en-GB' : 'en-US';
        u.rate = 0.9;
        speechSynthesis.speak(u);
      }
    } else {
      // Use browser's built-in TTS (free but robotic)
      const u = new SpeechSynthesisUtterance(textToSpeak);
      u.lang = voiceAccent === 'british' ? 'en-GB' : 'en-US';
      u.rate = 0.9;
      speechSynthesis.speak(u);
    }
  };

  const analyzeResponse = async () => {
    if (!transcript.trim()) {
      setError(lang === 'vi' ? 'Chưa ghi nhận giọng nói' : 'No speech detected');
      return;
    }
    setIsAnalyzing(true);
    setError(null);

    try {
      // Call our Vercel serverless function (handles Claude API)
      const response = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion,
          transcript: transcript,
          duration: formatTime(recordingTime),
          language: lang
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const fb = await response.json();
      
      if (fb.error) {
        throw new Error(fb.error);
      }

      setFeedback(fb);
      // Award coins based on performance
      setUserStats(prev => ({
        ...prev,
        coins: prev.coins + Math.floor(fb.scores.overall * 5),
        streaks: prev.streaks + 1,
        score: Math.max(prev.score, fb.scores.overall)
      }));

    } catch (err) {
      console.error("Analysis error:", err);
      setError(lang === 'vi' 
        ? 'Lỗi phân tích. Vui lòng thử lại.' 
        : 'Analysis error. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getIdeas = async () => {
    setIsLoadingIdeas(true);
    setShowIdeas(true);
    try {
      const response = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion,
          language: lang
        })
      });
      
      if (!response.ok) {
        throw new Error('API error');
      }
      
      const data = await response.json();
      setIdeas(data);
    } catch (err) {
      console.error("Ideas error:", err);
      setIdeas({ ideas: [{ point: lang === 'vi' ? "Lỗi tải gợi ý" : "Error loading ideas", vocabulary: [] }], tip: "" });
    } finally {
      setIsLoadingIdeas(false);
    }
  };

  const resetPractice = () => {
    setCurrentPart(null);
    setCurrentTopic(null);
    setCurrentQuestion(null);
    setTranscript("");
    setRecordingTime(0);
    setFeedback(null);
    setShowIdeas(false);
    setIdeas(null);
    setAudioUrl(null);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setIsPlaying(false);
  };

  const startMockTest = () => {
    setCurrentView('mockTest');
    setMockTestPhase('part1');
    setMockTestQuestionIndex(0);
    resetPractice();
  };

  const handleMockTestNext = () => {
    setTranscript("");
    setRecordingTime(0);
    stopRecording();

    if (mockTestPhase === 'part1') {
      if (mockTestQuestionIndex < mockTestQuestions.part1.length - 1) {
        setMockTestQuestionIndex(prev => prev + 1);
      } else {
        setMockTestPhase('part2-prep');
        setMockTestTimer(60);
        setIsPrepTime(true);
      }
    } else if (mockTestPhase === 'part2-prep') {
      setMockTestPhase('part2-speak');
      setIsPrepTime(false);
      setMockTestTimer(120);
    } else if (mockTestPhase === 'part2-speak') {
      setMockTestPhase('part3');
      setMockTestQuestionIndex(0);
    } else if (mockTestPhase === 'part3') {
      if (mockTestQuestionIndex < mockTestQuestions.part3.length - 1) {
        setMockTestQuestionIndex(prev => prev + 1);
      } else {
        setMockTestPhase('complete');
      }
    }
  };

  const getScoreColor = (score) => {
    if (score >= 7) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    if (score >= 5) return 'text-orange-500 bg-orange-50';
    return 'text-red-500 bg-red-50';
  };

  // ==================== HEADER COMPONENT ====================
  const Header = () => (
    <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-gray-800">Lumist<span className="text-blue-600">.ai</span></span>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
        <button className="hover:text-blue-600 font-medium text-blue-600">AI Tutor</button>
        <button className="hover:text-blue-600">Vocabulary</button>
        <button className="hover:text-blue-600">Analytics</button>
        <button className="hover:text-blue-600">Leaderboard</button>
      </nav>
      <div className="flex items-center gap-3">
        {/* Voice Accent Toggle */}
        <div className="flex items-center bg-gray-100 rounded-full p-0.5">
          <button
            onClick={() => setVoiceAccent('british')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-full transition-all ${
              voiceAccent === 'british' 
                ? 'bg-white shadow text-gray-800 font-medium' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🇬🇧
          </button>
          <button
            onClick={() => setVoiceAccent('american')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-full transition-all ${
              voiceAccent === 'american' 
                ? 'bg-white shadow text-gray-800 font-medium' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🇺🇸
          </button>
        </div>
        
        {/* Language Toggle */}
        <button
          onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <Globe className="w-3 h-3" />
          {lang === 'en' ? 'VI' : 'EN'}
        </button>
        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5">
          <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">{userStats.userName}</span>
        </div>
      </div>
    </header>
  );

  // ==================== HOME VIEW ====================
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-6xl mx-auto p-4 md:p-6">
          {/* Greeting + Stats Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {t.hello}, {userStats.userName} 👋
              </h1>
              <p className="text-gray-500 text-sm">
                {lang === 'vi' ? `Còn ${userStats.daysUntilExam} ${t.daysUntil}` : `${userStats.daysUntilExam} ${t.daysUntil}`}
              </p>
            </div>
            
            <div className="flex gap-3">
              {/* Score */}
              <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center gap-3 min-w-[100px]">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{userStats.score}</div>
                  <div className="text-xs text-gray-500">{t.speakingScore}</div>
                </div>
              </div>
              
              {/* Streaks */}
              <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center gap-3 min-w-[100px]">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Flame className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{userStats.streaks}</div>
                  <div className="text-xs text-gray-500">{t.dailyStreaks}</div>
                </div>
              </div>
              
              {/* Coins */}
              <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center gap-3 min-w-[100px]">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Coins className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{userStats.coins}</div>
                  <div className="text-xs text-gray-500">{t.coins}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content - Left 2 columns */}
            <div className="md:col-span-2 space-y-6">
              {/* AI Summary Card */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      {t.aiSummary}
                      <span className="text-gray-400 text-sm">ⓘ</span>
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {lang === 'vi' 
                        ? 'Bạn đang tiến bộ tốt trong IELTS Speaking! Hãy tập trung vào Part 2 và Part 3 để nâng band điểm. Cố lên! 💪'
                        : 'You\'re making great progress in IELTS Speaking! Focus on Part 2 and Part 3 to improve your band score. Keep it up! 💪'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* In Progress Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">{t.inProgress}</h2>
                  <span className="text-gray-400 text-sm">ⓘ</span>
                </div>
                
                {/* Mock Test Card */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-purple-600 font-medium mb-1">
                        <Trophy className="w-3 h-3" /> {t.exclusive}
                      </div>
                      <h3 className="font-semibold text-gray-800">{t.mockTest}</h3>
                      <p className="text-gray-500 text-xs">{t.mockTestDesc}</p>
                    </div>
                    <div className="text-center px-4">
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>14m</span>
                      </div>
                    </div>
                    <button 
                      onClick={startMockTest}
                      className="px-5 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                    >
                      {t.startPractice}
                    </button>
                  </div>
                </div>
              </div>

              {/* Practice Topics */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">{t.practiceTopics}</h2>
                  <button className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline">
                    {t.seeAll} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {Object.entries(questionBank).map(([partKey, partData]) => (
                    <button
                      key={partKey}
                      onClick={() => { setCurrentView('practice'); setCurrentPart(partKey); }}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                          partData.color === 'blue' ? 'bg-blue-100' : 
                          partData.color === 'purple' ? 'bg-purple-100' : 'bg-indigo-100'
                        }`}>
                          {partData.icon}
                        </div>
                        <div>
                          <span className={`text-xs font-medium ${
                            partData.color === 'blue' ? 'text-blue-600' : 
                            partData.color === 'purple' ? 'text-purple-600' : 'text-indigo-600'
                          }`}>
                            {t[partKey] || partKey.toUpperCase()}
                          </span>
                          <h3 className="font-semibold text-gray-800 text-sm">{partData.name[lang]}</h3>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{Object.keys(partData.topics).length * 4}+ {t.questions}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {partData.duration}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Right column */}
            <div className="space-y-6">
              {/* Daily Quests */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-orange-500" />
                    </div>
                    <h3 className="font-semibold text-gray-800">{t.dailyQuests}</h3>
                  </div>
                  <div className="text-xs text-gray-500">1/300 <span className="text-yellow-500">🪙</span></div>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-gray-700">{t.speakingChallenge}</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 text-sm">
                      <ChevronRight className="w-4 h-4" />
                      <span>+7 🪙</span>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-700">{t.vocabularyPractice}</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 text-sm">
                      <ChevronRight className="w-4 h-4" />
                      <span>+15 🪙</span>
                    </div>
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{t.completeToOpen}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-0 h-full bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-xs text-gray-500">0/2</span>
                    <ChestIcon locked />
                  </div>
                </div>
              </div>

              {/* AI Planner */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">{t.aiPlanner}</h3>
                  </div>
                  <span className="text-gray-400 text-sm">ⓘ</span>
                </div>
                
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3].map(day => (
                    <button 
                      key={day}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        day === 2 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                
                <div className="text-center text-gray-400 text-sm py-4">
                  {t.noTasks}
                </div>
                
                <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors">
                  <Calendar className="w-4 h-4" />
                  {t.viewCalendar}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==================== MOCK TEST VIEW ====================
  if (currentView === 'mockTest') {
    if (mockTestPhase === 'complete') {
      return (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-lg mx-auto p-6 mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{t.testComplete}</h1>
              <p className="text-gray-600 mb-6">{t.greatJob}</p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl">🪙</div>
                  <div className="text-lg font-bold text-yellow-600">+50</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl">🔥</div>
                  <div className="text-lg font-bold text-orange-600">+1</div>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={startMockTest}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  {t.tryAgain}
                </button>
                <button 
                  onClick={() => { setCurrentView('home'); setMockTestPhase(null); }}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                >
                  {t.exitTest}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const getCurrentQ = () => {
      if (mockTestPhase === 'part1') return mockTestQuestions.part1[mockTestQuestionIndex];
      if (mockTestPhase?.startsWith('part2')) return mockTestQuestions.part2.cue;
      if (mockTestPhase === 'part3') return mockTestQuestions.part3[mockTestQuestionIndex];
      return '';
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto p-4">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => { setCurrentView('home'); setMockTestPhase(null); }}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm"
            >
              <X className="w-4 h-4" /> {t.exitTest}
            </button>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                mockTestPhase === 'part1' ? 'bg-blue-100 text-blue-700' :
                mockTestPhase?.startsWith('part2') ? 'bg-purple-100 text-purple-700' :
                'bg-indigo-100 text-indigo-700'
              }`}>
                {mockTestPhase === 'part1' ? t.part1 : mockTestPhase?.startsWith('part2') ? t.part2 : t.part3}
              </span>
            </div>
          </div>

          {/* Timer for Part 2 */}
          {(isPrepTime || mockTestPhase === 'part2-speak') && (
            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Timer className={`w-5 h-5 ${isPrepTime ? 'text-yellow-500' : 'text-green-500'}`} />
                <span className="font-medium">{isPrepTime ? t.prepTime : t.speakNow}</span>
              </div>
              <div className={`text-2xl font-mono font-bold ${mockTestTimer < 30 ? 'text-red-500' : 'text-gray-800'}`}>
                {formatTime(mockTestTimer)}
              </div>
            </div>
          )}

          {/* Question Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">{t.question}</h3>
                <p className="text-gray-800 whitespace-pre-line">{getCurrentQ()}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => speakQuestion(getCurrentQ())}
                  disabled={isSpeaking}
                  className={`p-2.5 rounded-full transition-colors ${isSpeaking ? 'bg-blue-200 animate-pulse' : 'bg-blue-50 hover:bg-blue-100'}`}
                >
                  <Volume2 className={`w-5 h-5 ${isSpeaking ? 'text-blue-800' : 'text-blue-600'}`} />
                </button>
                <span className="text-xs text-gray-400">{VOICES[voiceAccent].flag}</span>
              </div>
            </div>
          </div>

          {/* Recording UI (not during prep) */}
          {!isPrepTime && (
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">{t.yourResponse}</h3>
                <div className={`font-mono text-lg ${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}>
                  {formatTime(recordingTime)}
                </div>
              </div>

              <div className="min-h-24 max-h-36 overflow-y-auto p-4 bg-gray-50 rounded-xl mb-4 border border-gray-100">
                {transcript || interimTranscript ? (
                  <p className="text-gray-700">{transcript}<span className="text-gray-400">{interimTranscript}</span></p>
                ) : (
                  <p className="text-gray-400 italic text-sm">{isRecording ? t.listeningStart : t.clickToRecord}</p>
                )}
              </div>

              <div className="flex justify-center gap-3">
                {!isRecording ? (
                  <button 
                    onClick={startRecording}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors"
                  >
                    <Mic className="w-5 h-5" /> {t.startRecording}
                  </button>
                ) : (
                  <button 
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-full font-medium hover:bg-gray-800 animate-pulse"
                  >
                    <Square className="w-5 h-5" /> {t.stopRecording}
                  </button>
                )}
              </div>

              {audioUrl && !isRecording && (
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={togglePlayback}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 text-sm"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {t.playRecording}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              onClick={handleMockTestNext}
              disabled={isRecording}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {mockTestPhase === 'part3' && mockTestQuestionIndex === mockTestQuestions.part3.length - 1 
                ? t.finishTest 
                : t.nextQuestion}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== PRACTICE VIEW ====================
  // Topic Selection
  if (currentView === 'practice' && currentPart && !currentTopic) {
    const partData = questionBank[currentPart];
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto p-4">
          <button 
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 mb-4 text-sm"
          >
            <ChevronLeft className="w-4 h-4" /> {t.back}
          </button>
          
          <div className="text-center mb-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 ${
              partData.color === 'blue' ? 'bg-blue-100' : 
              partData.color === 'purple' ? 'bg-purple-100' : 'bg-indigo-100'
            }`}>
              {partData.icon}
            </div>
            <h1 className="text-xl font-bold text-gray-800">{partData.name[lang]}</h1>
            <p className="text-gray-500 text-sm">{t.selectTopic || 'Select a topic'}</p>
          </div>

          <div className="grid gap-3">
            {Object.entries(partData.topics).map(([topic, questions]) => (
              <button
                key={topic}
                onClick={() => setCurrentTopic(topic)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all text-left flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{topic}</h3>
                  <p className="text-gray-500 text-xs">{questions.length} {t.questions}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Question Selection
  if (currentView === 'practice' && currentPart && currentTopic && !currentQuestion) {
    const questions = questionBank[currentPart].topics[currentTopic];
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto p-4">
          <button 
            onClick={() => setCurrentTopic(null)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 mb-4 text-sm"
          >
            <ChevronLeft className="w-4 h-4" /> {t.back}
          </button>
          
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-gray-800">{currentTopic}</h1>
          </div>

          <div className="grid gap-3">
            {questions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(q)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all text-left"
              >
                <p className="text-gray-800 text-sm line-clamp-2">{q.split('\n')[0]}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Practice Interface
  if (currentView === 'practice' && currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto p-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={resetPractice}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <RefreshCw className="w-4 h-4" /> {t.newQuestion}
            </button>
            <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
              {questionBank[currentPart].name[lang]}
            </span>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">{t.question}</h3>
                <p className="text-gray-800 whitespace-pre-line">{currentQuestion}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => speakQuestion()}
                  disabled={isSpeaking}
                  className={`p-2.5 rounded-full transition-colors ${isSpeaking ? 'bg-blue-200 animate-pulse' : 'bg-blue-50 hover:bg-blue-100'}`}
                >
                  <Volume2 className={`w-5 h-5 ${isSpeaking ? 'text-blue-800' : 'text-blue-600'}`} />
                </button>
                <span className="text-xs text-gray-400">{VOICES[voiceAccent].flag}</span>
              </div>
            </div>

            {/* Ideas Button */}
            <button 
              onClick={getIdeas}
              className="mt-4 flex items-center gap-2 text-yellow-600 hover:text-yellow-700 text-sm"
            >
              <Lightbulb className="w-4 h-4" /> {t.needIdeas}
            </button>

            {/* Ideas Panel */}
            {showIdeas && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                {isLoadingIdeas ? (
                  <div className="flex items-center gap-2 text-yellow-600">
                    <div className="animate-spin w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full"></div>
                    Loading...
                  </div>
                ) : ideas ? (
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2 text-sm">💡 Ideas:</h4>
                    <ul className="space-y-1">
                      {ideas.ideas?.map((idea, idx) => (
                        <li key={idx} className="text-xs text-gray-700">
                          • {idea.point}
                          {idea.vocabulary?.length > 0 && (
                            <span className="text-yellow-600 ml-1">({idea.vocabulary.join(", ")})</span>
                          )}
                        </li>
                      ))}
                    </ul>
                    {ideas.tip && (
                      <p className="mt-2 text-xs text-yellow-700 bg-yellow-100 p-2 rounded">💡 {ideas.tip}</p>
                    )}
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Recording Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">{t.yourResponse}</h3>
              <div className={`font-mono text-lg ${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}>
                {formatTime(recordingTime)}
              </div>
            </div>

            <div className="min-h-28 max-h-40 overflow-y-auto p-4 bg-gray-50 rounded-xl mb-4 border border-gray-100">
              {transcript || interimTranscript ? (
                <p className="text-gray-700">{transcript}<span className="text-gray-400">{interimTranscript}</span></p>
              ) : (
                <p className="text-gray-400 italic text-sm">{isRecording ? t.listeningStart : t.clickToRecord}</p>
              )}
            </div>

            <div className="flex justify-center gap-3 flex-wrap">
              {!isRecording ? (
                <button 
                  onClick={startRecording}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors"
                >
                  <Mic className="w-5 h-5" /> {t.startRecording}
                </button>
              ) : (
                <button 
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-full font-medium hover:bg-gray-800 animate-pulse"
                >
                  <Square className="w-5 h-5" /> {t.stopRecording}
                </button>
              )}

              {!isRecording && transcript && (
                <button
                  onClick={analyzeResponse}
                  disabled={isAnalyzing}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isAnalyzing ? (
                    <><div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div> {t.analyzing}</>
                  ) : (
                    <><Zap className="w-5 h-5" /> {t.getFeedback}</>
                  )}
                </button>
              )}
            </div>

            {audioUrl && !isRecording && (
              <div className="mt-4 flex justify-center gap-3 flex-wrap">
                <button 
                  onClick={togglePlayback}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 text-sm"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {t.playRecording}
                </button>
                
                {ELEVENLABS_API_KEY && (
                  <button 
                    onClick={reTranscribeAudio}
                    disabled={isTranscribing}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 text-sm disabled:opacity-50"
                  >
                    {isTranscribing ? (
                      <><div className="animate-spin w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full"></div> {lang === 'vi' ? 'Đang xử lý...' : 'Processing...'}</>
                    ) : (
                      <><RefreshCw className="w-4 h-4" /> {lang === 'vi' ? 'Chép lại chính xác' : 'Accurate Transcribe'}</>
                    )}
                  </button>
                )}
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}
          </div>

          {/* Feedback Card */}
          {feedback && (
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
              {/* AI Summary */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">{t.aiSummary}</h4>
                  <p className="text-blue-700 text-sm">{feedback.encouragement}</p>
                </div>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(feedback.scores).map(([key, score]) => (
                  <div key={key} className={`text-center p-3 rounded-xl ${getScoreColor(score)}`}>
                    <div className="text-2xl font-bold">{score.toFixed(1)}</div>
                    <div className="text-xs capitalize">{key === 'overall' ? '⭐' : t[key]?.slice(0,4) || key.slice(0,4)}</div>
                  </div>
                ))}
              </div>

              {/* Band Descriptors */}
              {feedback.bandDescriptors && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
                    📋 {lang === 'vi' ? 'Mô tả Band điểm' : 'Band Descriptors'}
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(feedback.bandDescriptors).map(([key, desc]) => (
                      <div key={key} className="text-xs">
                        <span className="font-medium capitalize text-gray-700">{t[key] || key}:</span>
                        <span className="text-gray-600 ml-1">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Analysis - Grammar */}
              {feedback.errors?.grammar?.length > 0 && (
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <h4 className="font-semibold text-red-800 text-sm mb-3 flex items-center gap-2">
                    ❌ {lang === 'vi' ? 'Lỗi ngữ pháp' : 'Grammar Errors'}
                  </h4>
                  <div className="space-y-3">
                    {feedback.errors.grammar.map((err, i) => (
                      <div key={i} className="text-xs bg-white p-3 rounded-lg">
                        <div className="flex items-start gap-2 mb-1">
                          <span className="text-red-500 line-through">"{err.original}"</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-green-600 font-medium">"{err.corrected}"</span>
                        </div>
                        <p className="text-gray-600 text-xs mt-1">💡 {err.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Analysis - Vocabulary */}
              {feedback.errors?.vocabulary?.length > 0 && (
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <h4 className="font-semibold text-yellow-800 text-sm mb-3 flex items-center gap-2">
                    📚 {lang === 'vi' ? 'Từ vựng cần cải thiện' : 'Vocabulary to Improve'}
                  </h4>
                  <div className="space-y-3">
                    {feedback.errors.vocabulary.map((err, i) => (
                      <div key={i} className="text-xs bg-white p-3 rounded-lg">
                        <div className="flex items-start gap-2 mb-1">
                          <span className="text-yellow-600">"{err.original}"</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-green-600 font-medium">"{err.better}"</span>
                        </div>
                        <p className="text-gray-600 text-xs mt-1">💡 {err.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Analysis - Pronunciation */}
              {feedback.errors?.pronunciation?.length > 0 && (
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <h4 className="font-semibold text-purple-800 text-sm mb-3 flex items-center gap-2">
                    🗣️ {lang === 'vi' ? 'Phát âm cần sửa' : 'Pronunciation Issues'}
                  </h4>
                  <div className="space-y-3">
                    {feedback.errors.pronunciation.map((err, i) => (
                      <div key={i} className="text-xs bg-white p-3 rounded-lg">
                        <div className="font-medium text-purple-700 mb-1">"{err.word}"</div>
                        <p className="text-gray-600">{err.issue}</p>
                        <p className="text-green-600 mt-1">✓ {err.howToFix}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Analysis - Fluency */}
              {feedback.errors?.fluency?.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-800 text-sm mb-3 flex items-center gap-2">
                    🌊 {lang === 'vi' ? 'Vấn đề lưu loát' : 'Fluency Issues'}
                  </h4>
                  <div className="space-y-3">
                    {feedback.errors.fluency.map((err, i) => (
                      <div key={i} className="text-xs bg-white p-3 rounded-lg">
                        <div className="font-medium text-blue-700 mb-1">{err.issue}</div>
                        {err.example && <p className="text-gray-500 italic">"{err.example}"</p>}
                        <p className="text-green-600 mt-1">💡 {err.tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Tips */}
              {feedback.quickTips?.length > 0 && (
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="font-semibold text-green-800 text-sm mb-3 flex items-center gap-2">
                    🚀 {lang === 'vi' ? 'Mẹo cải thiện nhanh' : 'Quick Improvement Tips'}
                  </h4>
                  <ul className="space-y-2">
                    {feedback.quickTips.map((tip, i) => (
                      <li key={i} className="text-xs text-green-700 flex items-start gap-2">
                        <span className="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-bold">{i + 1}</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Strengths & General Improvements */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <h4 className="font-semibold text-emerald-800 mb-2 text-sm">✓ {t.strengths}</h4>
                  <ul className="text-xs text-emerald-700 space-y-1">
                    {feedback.strengths?.map((s, i) => <li key={i}>• {s}</li>)}
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <h4 className="font-semibold text-orange-800 mb-2 text-sm">↑ {t.improvements}</h4>
                  <ul className="text-xs text-orange-700 space-y-1">
                    {feedback.improvements?.map((s, i) => <li key={i}>• {s}</li>)}
                  </ul>
                </div>
              </div>

              {/* Sample Answer */}
              {feedback.sampleAnswer && (
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <h4 className="font-semibold text-indigo-800 mb-2 text-sm">📝 {t.sampleAnswer}</h4>
                  <p className="text-xs text-indigo-700 italic leading-relaxed">"{feedback.sampleAnswer}"</p>
                </div>
              )}

              {/* Coins Earned */}
              <div className="flex items-center justify-center gap-2 text-yellow-600 pt-2">
                <span className="text-lg">🪙</span>
                <span className="font-bold">+{Math.floor(feedback.scores.overall * 5)} {t.coins}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
