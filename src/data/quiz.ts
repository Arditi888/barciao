import type { QuizQuestion } from '../types';

/* ==================================================================
   FIND YOUR DRINK — the five questions.
   Question copy lives here; the scoring lives in
   src/utils/drinkRecommendation.ts. Neither knows about the other's
   presentation.
   ================================================================== */

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'alcohol',
    question: 'Me alkool apo pa alkool?',
    caption: 'Fillojmë nga e para.',
    options: [
      { value: 'yes', label: 'Me alkool' },
      { value: 'no', label: 'Pa alkool' },
    ],
  },
  {
    id: 'mood',
    question: 'Në ç’humor je?',
    caption: 'Zgjidh atë që të shkon më shumë tani.',
    options: [
      { value: 'refreshing', label: 'Diçka freskuese' },
      { value: 'strong', label: 'Diçka e fortë' },
      { value: 'sweet', label: 'Diçka e ëmbël' },
      { value: 'bitter', label: 'Diçka amare' },
      { value: 'coffee', label: 'Kafe' },
      { value: 'surprise', label: 'Surprizomë', hint: 'Zgjedhim ne për ty.' },
    ],
  },
  {
    id: 'flavour',
    question: 'Çfarë shije preferon?',
    options: [
      { value: 'fruity', label: 'Frutore' },
      { value: 'citrus', label: 'Citrus' },
      { value: 'herbal', label: 'Bimore' },
      { value: 'classic', label: 'Klasike' },
      { value: 'any', label: 'S’ka rëndësi' },
    ],
  },
  {
    id: 'strength',
    question: 'Sa e fortë?',
    options: [
      { value: 'light', label: 'E lehtë' },
      { value: 'medium', label: 'Mesatare' },
      { value: 'strong', label: 'E fortë' },
    ],
  },
  {
    id: 'occasion',
    question: 'Për çfarë rasti?',
    caption: 'Kjo na ndihmon të gjejmë gotën e duhur.',
    options: [
      { value: 'coffee-break', label: 'Një pushim kafeje' },
      { value: 'after-work', label: 'Pas punës' },
      { value: 'football', label: 'Duke parë futboll' },
      { value: 'date', label: 'Takim' },
      { value: 'night-out', label: 'Mbrëmje jashtë' },
      { value: 'one-drink', label: 'Vetëm një gotë' },
    ],
  },
];
