import React, { useState, useEffect } from 'react';
import { Shuffle, Camera, User, Map, Palette, Sun, Aperture, Film, Video, Zap } from 'lucide-react';

const options = {
  Type: [
    'Half body shot of - Shows upper body and face',
    'Full body shot of - Captures entire body from head to toe',
    'Close-up of - Focuses on face or specific detail',
    'Portrait of - Emphasizes facial features and expression'
  ],
  Age: [
    'child - Young person, typically under 12',
    'teenager - Person between 13-19 years old',
    'adult - Fully grown person, typically 20+',
    'elderly - Older person, typically 65+'
  ],
  Race: [
    'caucasian - Of European origin',
    'african - Of African descent',
    'asian - Of Asian descent',
    'latino - Of Latin American origin',
    'middle eastern - Of Middle Eastern descent',
    'south asian - Of South Asian descent'
  ],
  Subject: [
    'man - Adult male',
    'woman - Adult female',
    'person - Gender-neutral term',
    'genderqueer person - Non-binary individual'
  ],
  Descriptor: [
    'who is smiling - Showing happiness or amusement',
    'who is serious - Displaying a stern or thoughtful expression',
    'who is bald - Without hair on the head',
    'with long hair - Having hair extending well past the shoulders'
  ],
  Action: [
    'standing - In an upright position',
    'sitting - In a seated position',
    'running - Moving at a fast pace',
    'biking - Riding a bicycle'
  ],
  Location: [
    'in a city - Urban environment',
    'in nature - Natural, outdoor setting',
    'at home - Domestic, indoor setting',
    'at a beach - Coastal, sandy environment'
  ],
  Style: [
    'Realistic - True to life representation',
    'Abstract - Non-representational, focusing on colors and shapes',
    'Cartoon - Simplified, exaggerated style',
    'Minimalist - Simple, using only essential elements'
  ],
  Lighting: [
    'Natural light - Illumination from the sun or sky',
    'Studio lighting - Controlled, artificial light setup',
    'Golden Hour - Warm, soft light just after sunrise or before sunset',
    'Moody - Dramatic, often low-key lighting'
  ],
  Color: [
    'Vibrant - Bright, intense colors',
    'Monochrome - Using only one color or shades of one color',
    'Pastel - Soft, pale colors',
    'Bleach Bypass - High contrast, desaturated look'
  ],
  VisualFX: [
    'Bokeh - Blurred, out-of-focus areas',
    'Lens flare - Light artifacts caused by bright light sources',
    'Motion blur - Streaking effect from movement',
    'Double exposure - Overlapping of two different images'
  ],
  Camera: [
    'Canon EOS R5 - High-resolution mirrorless camera',
    'Sony A7III - Versatile full-frame mirrorless camera',
    'RED Monstro 8K - High-end digital cinema camera',
    'Hasselblad X1D II - Medium format mirrorless camera'
  ],
  Lens: [
    'Canon 50mm f/1.2 - Fast standard prime lens',
    'Sony 24-70mm f/2.8 - Versatile standard zoom lens',
    'Zeiss Otus 85mm - High-quality portrait lens',
    'Canon 24-70mm - Standard zoom lens'
  ],
  Film: [
    'Kodak Portra 400 - Color negative film with natural skin tones',
    'Fujifilm Velvia 50 - Slide film known for vibrant colors',
    'Ilford HP5 Plus - High-speed black and white film',
    'Rollei Retro - Fine-grained black and white film'
  ],
  Filmmaker: [
    'James Cameron - Known for action and sci-fi (Terminator, Avatar)',
    'Quentin Tarantino - Known for nonlinear storytelling and stylized violence',
    'Wes Anderson - Known for symmetrical compositions and pastel color palettes',
    'Christopher Nolan - Known for mind-bending narratives and practical effects'
  ],
  Photographer: [
    'Annie Leibovitz - Known for intimate portraits of celebrities',
    'Ansel Adams - Known for dramatic black and white landscapes',
    'Steve McCurry - Known for vibrant travel and cultural photography',
    'Cindy Sherman - Known for conceptual self-portraits'
  ],
  Material: [
    'Glossy - Shiny, smooth surfaces',
    'Matte - Non-reflective surfaces',
    'Transparent - See-through elements',
    'Iridescent - Rainbow-like effect from different angles'
  ],
  Emotion: [
    'Joy - A feeling of great pleasure and happiness',
    'Fear - A distressing emotion aroused by impending danger',
    'Nostalgia - A sentimental longing for the past',
    'Anticipation - Expectation or prediction of future events'
  ]
};

const icons = {
  Type: Camera,
  Age: User,
  Race: User,
  Subject: User,
  Descriptor: User,
  Action: User,
  Location: Map,
  Style: Palette,
  Lighting: Sun,
  Color: Palette,
  VisualFX: Aperture,
  Camera: Camera,
  Lens: Camera,
  Film: Film,
  Filmmaker: Video,
  Photographer: Camera,
  Material: Palette,
  Emotion: Zap
};

const PromptGenerator = () => {
  const [selections, setSelections] = useState({});
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    const newPrompt = Object.keys(options)
      .map(key => selections[key]?.split(' - ')[0])
      .filter(Boolean)
      .join(' ');
    setPrompt(newPrompt);
  }, [selections]);

  const handleChange = (category, value) => {
    setSelections(prev => ({ ...prev, [category]: value }));
  };

  const shuffleOption = (category) => {
    const values = options[category];
    const randomIndex = Math.floor(Math.random() * values.length);
    handleChange(category, values[randomIndex]);
  };

  const randomizeAll = () => {
    const randomSelections = {};
    Object.keys(options).forEach(category => {
      const values = options[category];
      const randomIndex = Math.floor(Math.random() * values.length);
      randomSelections[category] = values[randomIndex];
    });
    setSelections(randomSelections);
  };

  const clearAll = () => {
    setSelections({});
    setPrompt('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 font-lato">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6">
          <h1 className="text-3xl font-bold text-white mb-2">Enhanced Image Prompt Generator</h1>
          <p className="text-sm text-white opacity-80">Create cinematic and stylized image prompts</p>
        </div>
        <div className="p-8">
          <div className="flex justify-between mb-6">
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={randomizeAll}
            >
              <Shuffle className="mr-2 h-5 w-5" />
              Random All
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={clearAll}
            >
              <Shuffle className="mr-2 h-5 w-5" />
              Clear All
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {Object.entries(options).map(([category, values]) => {
              const Icon = icons[category];
              return (
                <div key={category} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 flex items-center mb-2">
                    {category}
                    {Icon && <Icon className="ml-2 h-5 w-5 text-gray-400" />}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <select
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none bg-gray-50"
                      onChange={(e) => handleChange(category, e.target.value)}
                      value={selections[category] || ''}
                    >
                      <option value="">Select {category}</option>
                      {values.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <button
                        type="button"
                        className="p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full hover:bg-gray-200"
                        onClick={() => shuffleOption(category)}
                      >
                        <Shuffle className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Generated Prompt</label>
            <div className="bg-gray-50 rounded-md p-4 shadow-inner">
              <p className="text-gray-800 min-h-[100px]">
                {prompt || "Your generated prompt will appear here..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;