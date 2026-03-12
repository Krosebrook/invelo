
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Eraser, 
  RotateCcw, 
  RotateCw, 
  Trash2, 
  CheckCircle, 
  Home, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Volume2,
  VolumeX,
  Heart,
  Star,
  Sun,
  Cloud,
  Bird,
  Fish,
  Rocket,
  Eye,
  EyeOff,
  Mic,
  MicOff
} from 'lucide-react';

// --- Types ---

type Scene = {
  id: string;
  name: string;
  icon: React.ReactNode;
  bgColor: string;
  paths: string[]; // SVG paths for outlines
  livingElements: React.ReactNode[];
};

type Color = {
  hex: string;
  name: string;
};

// --- Constants ---

const COLORS: Color[] = [
  { hex: '#FFB7B2', name: 'Soft Red' },
  { hex: '#FFDAC1', name: 'Peach' },
  { hex: '#E2F0CB', name: 'Light Green' },
  { hex: '#B5EAD7', name: 'Mint' },
  { hex: '#C7CEEA', name: 'Lavender' },
  { hex: '#FF9AA2', name: 'Pink' },
  { hex: '#FFB347', name: 'Orange' },
  { hex: '#FDFD96', name: 'Yellow' },
  { hex: '#77DD77', name: 'Green' },
  { hex: '#AEC6CF', name: 'Blue' },
  { hex: '#B19CD9', name: 'Purple' },
  { hex: '#FFFFFF', name: 'White' },
];

const COLOR_BLIND_COLORS: Color[] = [
  { hex: '#000000', name: 'Black' },
  { hex: '#E69F00', name: 'Orange' },
  { hex: '#56B4E9', name: 'Sky Blue' },
  { hex: '#009E73', name: 'Bluish Green' },
  { hex: '#F0E442', name: 'Yellow' },
  { hex: '#0072B2', name: 'Blue' },
  { hex: '#D55E00', name: 'Vermillion' },
  { hex: '#CC79A7', name: 'Reddish Purple' },
  { hex: '#999999', name: 'Gray' },
  { hex: '#FFFFFF', name: 'White' },
];

const SCENES: Scene[] = [
  {
    id: 'forest',
    name: 'Happy Forest',
    icon: <Bird className="w-8 h-8" />,
    bgColor: '#E2F0CB',
    paths: [
      "M100,300 L150,300 L150,250 L100,250 Z", // Trunk
      "M50,250 L200,250 L125,150 Z", // Leaves
      "M350,80 A30,30 0 1,1 350,81 Z", // Sun
      "M250,150 Q270,130 290,150 Q270,170 250,150" // Bird
    ],
    livingElements: [
      <motion.div key="sun" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-10 right-20 text-[#FDFD96]"><Sun size={60} fill="currentColor" /></motion.div>,
      <motion.div key="bird" animate={{ x: [0, 100, 0], y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-40 left-60 text-[#FFB7B2]"><Bird size={40} fill="currentColor" /></motion.div>
    ]
  },
  {
    id: 'ocean',
    name: 'Deep Sea',
    icon: <Fish className="w-8 h-8" />,
    bgColor: '#AEC6CF',
    paths: [
      "M100,200 Q150,150 200,200 Q150,250 100,200 M200,200 L230,180 L230,220 Z", // Fish
      "M300,350 Q280,300 300,250 Q320,200 300,150", // Seaweed
      "M350,350 Q370,300 350,250 Q330,200 350,150", // Seaweed
      "M150,100 A10,10 0 1,1 150,101 Z", // Bubble
      "M170,80 A5,5 0 1,1 170,81 Z" // Bubble
    ],
    livingElements: [
      <motion.div key="fish" animate={{ x: [0, 50, 0], scaleX: [1, -1, 1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/2 left-1/4 text-[#FFDAC1]"><Fish size={50} fill="currentColor" /></motion.div>,
      <motion.div key="bubble" animate={{ y: [0, -100], opacity: [1, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-20 left-1/3 text-white/50"><div className="w-4 h-4 rounded-full border-2 border-current" /></motion.div>
    ]
  },
  {
    id: 'space',
    name: 'Space Friends',
    icon: <Rocket className="w-8 h-8" />,
    bgColor: '#C7CEEA',
    paths: [
      "M200,100 L230,200 L170,200 Z", // Top
      "M170,200 L230,200 L230,300 L170,300 Z", // Body
      "M170,300 L150,330 L170,300 M230,300 L250,330 L230,300", // Fins
      "M350,100 L360,130 L390,130 L365,150 L375,180 L350,160 L325,180 L335,150 L310,130 L340,130 Z", // Star
      "M50,100 A40,40 0 1,1 50,180 A30,30 0 1,0 50,100" // Moon
    ],
    livingElements: [
      <motion.div key="rocket" animate={{ y: [0, -20, 0], rotate: [0, 2, -2, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-1/3 left-1/4 text-[#FF9AA2]"><Rocket size={60} fill="currentColor" /></motion.div>,
      <motion.div key="star" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-20 right-40 text-[#FDFD96]"><Star size={30} fill="currentColor" /></motion.div>
    ]
  }
];

// --- Helper Functions ---

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const colorsMatch = (a: Uint8ClampedArray, b: { r: number, g: number, b: number }, tolerance = 10) => {
  return Math.abs(a[0] - b.r) <= tolerance &&
         Math.abs(a[1] - b.g) <= tolerance &&
         Math.abs(a[2] - b.b) <= tolerance;
};

// --- Components ---

const LivingColoringWorld: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color>(COLORS[0]);
  const [isMuted, setIsMuted] = useState(false);
  const [isNarrationOn, setIsNarrationOn] = useState(false);
  const [isColorBlindMode, setIsColorBlindMode] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFinished, setIsFinished] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outlineCanvasRef = useRef<HTMLCanvasElement>(null);

  const speak = (text: string) => {
    if (isNarrationOn && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Initialize canvas
  useEffect(() => {
    if (currentScene && canvasRef.current && outlineCanvasRef.current) {
      const canvas = canvasRef.current;
      const outlineCanvas = outlineCanvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      const oCtx = outlineCanvas.getContext('2d');

      if (ctx && oCtx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        oCtx.clearRect(0, 0, outlineCanvas.width, outlineCanvas.height);

        oCtx.strokeStyle = '#333333';
        oCtx.lineWidth = 4;
        oCtx.lineJoin = 'round';
        oCtx.lineCap = 'round';

        currentScene.paths.forEach(pathStr => {
          const p = new Path2D(pathStr);
          oCtx.stroke(p);
        });

        const initialState = canvas.toDataURL();
        setHistory([initialState]);
        setHistoryIndex(0);
        setIsFinished(false);
        speak(`Welcome to the ${currentScene.name}! Let's color together.`);
      }
    }
  }, [currentScene]);

  const saveToHistory = useCallback(() => {
    if (canvasRef.current) {
      const newState = canvasRef.current.toDataURL();
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newState);
      if (newHistory.length > 20) newHistory.shift();
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [history, historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const img = new Image();
      img.src = history[prevIndex];
      img.onload = () => {
        const ctx = canvasRef.current?.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        setHistoryIndex(prevIndex);
      };
      speak("Oops! Let's try again.");
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const img = new Image();
      img.src = history[nextIndex];
      img.onload = () => {
        const ctx = canvasRef.current?.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        setHistoryIndex(nextIndex);
      };
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        saveToHistory();
        speak("All clean! Ready for a new masterpiece.");
      }
    }
  };

  const floodFill = (x: number, y: number, fillColor: Color) => {
    const canvas = canvasRef.current;
    const outlineCanvas = outlineCanvasRef.current;
    if (!canvas || !outlineCanvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const oCtx = outlineCanvas.getContext('2d', { willReadFrequently: true });
    if (!ctx || !oCtx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const outlineData = oCtx.getImageData(0, 0, outlineCanvas.width, outlineCanvas.height);
    const pixels = imageData.data;
    const oPixels = outlineData.data;

    const targetRgb = {
      r: pixels[(y * canvas.width + x) * 4],
      g: pixels[(y * canvas.width + x) * 4 + 1],
      b: pixels[(y * canvas.width + x) * 4 + 2]
    };

    const fillRgb = hexToRgb(fillColor.hex);

    if (colorsMatch(new Uint8ClampedArray([targetRgb.r, targetRgb.g, targetRgb.b]), fillRgb)) return;
    if (oPixels[(y * canvas.width + x) * 4 + 3] > 50) return;

    const stack: [number, number][] = [[x, y]];
    const visited = new Uint8Array(canvas.width * canvas.height);

    while (stack.length > 0) {
      const [curX, curY] = stack.pop()!;
      const idx = curY * canvas.width + curX;

      if (visited[idx]) continue;
      visited[idx] = 1;

      const pIdx = idx * 4;
      const curColor = new Uint8ClampedArray([pixels[pIdx], pixels[pIdx + 1], pixels[pIdx + 2]]);

      if (colorsMatch(curColor, targetRgb) && oPixels[pIdx + 3] < 50) {
        pixels[pIdx] = fillRgb.r;
        pixels[pIdx + 1] = fillRgb.g;
        pixels[pIdx + 2] = fillRgb.b;
        pixels[pIdx + 3] = 255;

        if (curX > 0) stack.push([curX - 1, curY]);
        if (curX < canvas.width - 1) stack.push([curX + 1, curY]);
        if (curY > 0) stack.push([curX, curY - 1]);
        if (curY < canvas.height - 1) stack.push([curX, curY + 1]);
      }
    }

    ctx.putImageData(imageData, 0, 0);
    saveToHistory();
  };

  const handleCanvasClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (isFinished) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = Math.floor((clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((clientY - rect.top) * (canvas.height / rect.height));

    floodFill(x, y, selectedColor);
  };

  const handleFinish = () => {
    setIsFinished(true);
    speak("Wow! Your world is coming to life! It looks magical.");
  };

  const palette = isColorBlindMode ? COLOR_BLIND_COLORS : COLORS;

  // --- Renderers ---

  if (!currentScene) {
    return (
      <div className="min-h-screen bg-[#FDFD96] flex flex-col items-center justify-center p-6 font-sans">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-7xl font-bold text-[#FF9AA2] mb-12 text-center drop-shadow-sm"
          style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive' }}
        >
          Living Coloring World
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {SCENES.map((scene, idx) => (
            <motion.button
              key={scene.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setCurrentScene(scene)}
              className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center gap-4 border-8 border-transparent hover:border-[#B5EAD7] transition-colors"
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: scene.bgColor }}>
                {scene.icon}
              </div>
              <span className="text-2xl font-bold text-gray-700">{scene.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-16 flex gap-6">
          <button 
            onClick={() => {
              const next = !isNarrationOn;
              setIsNarrationOn(next);
              if (next) speak("Narration is now on! I will help you play.");
            }}
            className={`p-4 rounded-full shadow-md transition-colors ${isNarrationOn ? 'bg-[#B5EAD7] text-[#4A7C59]' : 'bg-white text-gray-400'}`}
            title="Toggle Narration"
          >
            {isNarrationOn ? <Mic /> : <MicOff />}
          </button>
          <button 
            onClick={() => setIsColorBlindMode(!isColorBlindMode)}
            className={`p-4 rounded-full shadow-md transition-colors ${isColorBlindMode ? 'bg-[#C7CEEA] text-[#5A6A9A]' : 'bg-white text-gray-400'}`}
            title="Toggle Color Blind Mode"
          >
            {isColorBlindMode ? <Eye /> : <EyeOff />}
          </button>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-4 bg-white rounded-full shadow-md text-gray-400 hover:text-[#FF9AA2]"
            title="Toggle Sound"
          >
            {isMuted ? <VolumeX /> : <Volume2 />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F4] overflow-hidden">
      {/* Top Bar */}
      <div className="p-4 flex items-center justify-between bg-white shadow-sm z-10">
        <button 
          onClick={() => setCurrentScene(null)}
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full text-gray-600 font-bold hover:bg-gray-200 transition-colors text-lg"
        >
          <Home size={24} />
          <span className="hidden sm:inline">Home</span>
        </button>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-4 bg-white border-2 border-gray-100 rounded-full text-gray-500 disabled:opacity-30 hover:bg-gray-50 shadow-sm"
          >
            <RotateCcw size={24} />
          </button>
          <button 
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-4 bg-white border-2 border-gray-100 rounded-full text-gray-500 disabled:opacity-30 hover:bg-gray-50 shadow-sm"
          >
            <RotateCw size={24} />
          </button>
          <button 
            onClick={handleClear}
            className="p-4 bg-white border-2 border-gray-100 rounded-full text-gray-500 hover:text-red-400 hover:bg-red-50 shadow-sm"
          >
            <Trash2 size={24} />
          </button>
        </div>

        <button 
          onClick={handleFinish}
          className="flex items-center gap-2 px-8 py-3 bg-[#B5EAD7] text-[#4A7C59] font-bold rounded-full shadow-lg hover:bg-[#A0D9C1] transition-transform active:scale-95 text-lg"
        >
          <Sparkles size={24} />
          <span>Magic!</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative flex items-center justify-center p-4 md:p-8">
        <div className="relative bg-white rounded-[40px] shadow-2xl overflow-hidden border-[12px] border-white" style={{ width: '900px', height: '600px', maxWidth: '100%', maxHeight: '70vh' }}>
          {/* Coloring Layer */}
          <canvas 
            ref={canvasRef}
            width={900}
            height={600}
            onClick={handleCanvasClick}
            onTouchStart={handleCanvasClick}
            className="absolute inset-0 w-full h-full cursor-crosshair"
          />
          
          {/* Outline Layer */}
          <canvas 
            ref={outlineCanvasRef}
            width={900}
            height={600}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
          />

          {/* Living Animations Overlay */}
          <AnimatePresence>
            {isFinished && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 pointer-events-none"
              >
                {currentScene.livingElements}
                
                <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
                   <motion.div 
                     initial={{ scale: 0, rotate: -10 }}
                     animate={{ scale: 1, rotate: 0 }}
                     className="bg-white p-10 rounded-[40px] shadow-2xl flex flex-col items-center gap-6 border-8 border-[#FFDAC1]"
                   >
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                        <Sparkles className="text-[#FFB347] w-20 h-20" />
                      </motion.div>
                      <h2 className="text-4xl font-bold text-gray-700">It's Alive!</h2>
                      <p className="text-xl text-gray-500 text-center max-w-xs">Look at your beautiful creation dance!</p>
                      <button 
                        onClick={() => setIsFinished(false)}
                        className="px-10 py-4 bg-[#C7CEEA] text-[#5A6A9A] rounded-full font-bold text-xl shadow-md hover:bg-[#B19CD9] transition-colors pointer-events-auto"
                      >
                        Keep Coloring
                      </button>
                   </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Palette */}
      <div className="p-8 bg-white border-t-8 border-[#FFDAC1]/20 overflow-x-auto">
        <div className="flex items-center justify-center gap-6 min-w-max">
          {palette.map((color) => (
            <motion.button
              key={color.hex}
              whileHover={{ scale: 1.15, y: -8 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSelectedColor(color);
                speak(`Selected ${color.name}`);
              }}
              className={`w-14 h-14 md:w-20 md:h-20 rounded-3xl shadow-lg border-4 transition-all ${
                selectedColor.hex === color.hex ? 'border-gray-400 scale-110 -translate-y-3' : 'border-transparent'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          <div className="w-px h-16 bg-gray-200 mx-4" />
          <button 
            onClick={() => {
              setSelectedColor({ hex: '#FFFFFF', name: 'Eraser' });
              speak("Eraser selected. Let's clean up!");
            }}
            className={`w-14 h-14 md:w-20 md:h-20 rounded-3xl shadow-lg border-4 flex items-center justify-center bg-gray-50 transition-all ${
              selectedColor.hex === '#FFFFFF' ? 'border-gray-400 scale-110 -translate-y-3' : 'border-transparent'
            }`}
          >
            <Eraser size={32} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LivingColoringWorld;
