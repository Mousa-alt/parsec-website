import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Industry = 'real-estate' | 'healthcare' | 'construction' | 'ecommerce' | 'other';
export type Channel = 'whatsapp' | 'voice' | 'email' | 'telegram';
export type Skill = 'lead-qualification' | 'booking' | 'support' | 'payments' | 'reminders' | 'data-entry';

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
  score: number;
}

export interface QuizResults {
  industry: Industry | null;
  companyName: string;
  answers: QuizAnswer[];
  totalScore: number;
  completedAt: Date | null;
}

export interface ConfiguratorState {
  selectedIndustry: Industry | null;
  selectedChannels: Channel[];
  selectedSkills: Skill[];
  estimatedSavings: number;
}

export interface UserContact {
  name: string;
  whatsapp: string;
  email: string;
  submitted: boolean;
}

export interface PlaygroundState {
  // Language
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;

  // Quiz State
  quizStep: number;
  quizResults: QuizResults;
  setQuizStep: (step: number) => void;
  setQuizIndustry: (industry: Industry) => void;
  setCompanyName: (name: string) => void;
  addQuizAnswer: (answer: QuizAnswer) => void;
  completeQuiz: () => void;
  resetQuiz: () => void;

  // Configurator State
  configuratorState: ConfiguratorState;
  setConfiguratorIndustry: (industry: Industry) => void;
  toggleChannel: (channel: Channel) => void;
  toggleSkill: (skill: Skill) => void;
  resetConfigurator: () => void;

  // User Contact
  userContact: UserContact;
  setUserContact: (contact: Partial<UserContact>) => void;
  submitContact: () => void;

  // UI State
  showLeadCapture: boolean;
  setShowLeadCapture: (show: boolean) => void;
}

const initialQuizResults: QuizResults = {
  industry: null,
  companyName: '',
  answers: [],
  totalScore: 0,
  completedAt: null,
};

const initialConfiguratorState: ConfiguratorState = {
  selectedIndustry: null,
  selectedChannels: [],
  selectedSkills: [],
  estimatedSavings: 0,
};

const initialUserContact: UserContact = {
  name: '',
  whatsapp: '',
  email: '',
  submitted: false,
};

// Calculate estimated savings based on selections
const calculateSavings = (channels: Channel[], skills: Skill[]): number => {
  const channelValue: Record<Channel, number> = {
    whatsapp: 15,
    voice: 25,
    email: 10,
    telegram: 12,
  };

  const skillValue: Record<Skill, number> = {
    'lead-qualification': 20,
    booking: 15,
    support: 18,
    payments: 25,
    reminders: 8,
    'data-entry': 22,
  };

  const channelHours = channels.reduce((sum, ch) => sum + channelValue[ch], 0);
  const skillHours = skills.reduce((sum, sk) => sum + skillValue[sk], 0);

  return (channelHours + skillHours) * 4; // Monthly hours saved
};

export const usePlaygroundStore = create<PlaygroundState>()(
  persist(
    (set, get) => ({
      // Language
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      // Quiz State
      quizStep: 0,
      quizResults: initialQuizResults,
      setQuizStep: (step) => set({ quizStep: step }),
      setQuizIndustry: (industry) => set((state) => ({
        quizResults: { ...state.quizResults, industry }
      })),
      setCompanyName: (name) => set((state) => ({
        quizResults: { ...state.quizResults, companyName: name }
      })),
      addQuizAnswer: (answer) => set((state) => ({
        quizResults: {
          ...state.quizResults,
          answers: [...state.quizResults.answers, answer],
          totalScore: state.quizResults.totalScore + answer.score,
        }
      })),
      completeQuiz: () => set((state) => ({
        quizResults: {
          ...state.quizResults,
          completedAt: new Date(),
        },
        showLeadCapture: true,
      })),
      resetQuiz: () => set({
        quizStep: 0,
        quizResults: initialQuizResults,
      }),

      // Configurator State
      configuratorState: initialConfiguratorState,
      setConfiguratorIndustry: (industry) => set((state) => ({
        configuratorState: { ...state.configuratorState, selectedIndustry: industry }
      })),
      toggleChannel: (channel) => set((state) => {
        const channels = state.configuratorState.selectedChannels.includes(channel)
          ? state.configuratorState.selectedChannels.filter(c => c !== channel)
          : [...state.configuratorState.selectedChannels, channel];
        return {
          configuratorState: {
            ...state.configuratorState,
            selectedChannels: channels,
            estimatedSavings: calculateSavings(channels, state.configuratorState.selectedSkills),
          }
        };
      }),
      toggleSkill: (skill) => set((state) => {
        const skills = state.configuratorState.selectedSkills.includes(skill)
          ? state.configuratorState.selectedSkills.filter(s => s !== skill)
          : [...state.configuratorState.selectedSkills, skill];
        return {
          configuratorState: {
            ...state.configuratorState,
            selectedSkills: skills,
            estimatedSavings: calculateSavings(state.configuratorState.selectedChannels, skills),
          }
        };
      }),
      resetConfigurator: () => set({
        configuratorState: initialConfiguratorState,
      }),

      // User Contact
      userContact: initialUserContact,
      setUserContact: (contact) => set((state) => ({
        userContact: { ...state.userContact, ...contact }
      })),
      submitContact: () => set((state) => ({
        userContact: { ...state.userContact, submitted: true }
      })),

      // UI State
      showLeadCapture: false,
      setShowLeadCapture: (show) => set({ showLeadCapture: show }),
    }),
    {
      name: 'parsec-playground',
      partialize: (state) => ({
        quizResults: state.quizResults,
        configuratorState: state.configuratorState,
        userContact: state.userContact,
        language: state.language,
      }),
    }
  )
);
