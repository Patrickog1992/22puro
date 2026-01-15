import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, Heart, CheckCircle } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'pulsing-green';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = true, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-4 px-6 rounded-lg font-bold text-lg shadow-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none touch-manipulation";
  
  let variantStyles = "";
  if (variant === 'primary') {
    variantStyles = "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700";
  } else if (variant === 'secondary') {
    variantStyles = "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-50";
  } else if (variant === 'success') {
    variantStyles = "bg-green-500 hover:bg-green-600 text-white animate-pulse shadow-green-200/50";
  } else if (variant === 'pulsing-green') {
    variantStyles = "bg-green-600 hover:bg-green-700 text-white animate-pulse shadow-xl shadow-green-400/50 border-b-4 border-green-800";
  }

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${widthStyles} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl overflow-hidden flex flex-col relative">
    {children}
  </div>
);

export const ContentPadding: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-6 flex flex-col gap-6 flex-grow fade-in">
    {children}
  </div>
);

export const SelectableOption: React.FC<{
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ selected, onClick, children }) => (
  <div 
    onClick={onClick}
    className={`p-4 rounded-xl border-2 cursor-pointer transition-all select-none active:bg-gray-50 touch-manipulation ${
      selected 
        ? 'border-pink-500 bg-pink-50 text-pink-900 font-semibold' 
        : 'border-gray-200 hover:border-pink-300 text-gray-700'
    }`}
  >
    <div className="flex items-center gap-3 pointer-events-none">
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'border-pink-500 bg-pink-500' : 'border-gray-300'}`}>
        {selected && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
      </div>
      <span className="text-base leading-snug">{children}</span>
    </div>
  </div>
);

export const Mockup: React.FC = () => null; 

export const PhoneMockupCarousel: React.FC = () => {
  const images = [
    { src: "https://quentesecarentes.com.br/wp-content/uploads/2019/10/banner29112016-005.jpg", name: "O Abraço da Serpente" },
    { src: "https://sexshoperotica.com.br/wp-content/uploads/2016/11/banner29112016-001.jpg", name: "O Voo do Êxtase" },
    { src: "https://i0.statig.com.br/bancodeimagens/2d/xa/7l/2dxa7lvdi0j372n4yuhaioj96.jpg", name: "A Deusa no Trono" }
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto w-64 h-[500px] bg-gray-900 rounded-[2.5rem] shadow-2xl border-8 border-gray-900 overflow-hidden ring-1 ring-gray-900/50">
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl w-32 mx-auto z-20"></div>
      
      {/* Screen */}
      <div className="relative w-full h-full bg-black">
        {images.map((img, i) => (
          <div 
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 flex flex-col justify-center ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={img.src} alt={img.name} className="w-full h-full object-contain" />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-center pb-12">
              <span className="text-white font-bold text-xl uppercase tracking-wider drop-shadow-md">{img.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SocialProofCarousel: React.FC = () => {
  const testimonials = [
    {
      img: "https://i.imgur.com/nCdT1tV.jpg",
      name: "Patrícia Lima",
      text: "Gente, eu tava desacreditada! Meu marido nem olhava na minha cara direito. Apliquei a técnica da 'Deusa no Trono' e ele ficou chocado kkkk. Agora ele não me larga!",
      time: "há 2 horas"
    },
    {
      img: "https://i.imgur.com/UV9Z6gf.png",
      name: "Camila Rocha",
      text: "Eu achava que era golpe, mas paguei pra ver. O conteúdo é muito direto. A parte das frases mudou tudo pra mim. Me sinto muito mais poderosa.",
      time: "há 5 horas"
    },
    {
      img: "https://i.imgur.com/VhoVk3r.png",
      name: "Juliana Mendes",
      text: "Meninas, só comprem! É barato demais pelo que entrega. Meu namorado perguntou onde eu aprendi essas coisas rsrsrs 😈",
      time: "há 1 dia"
    },
    {
      img: "https://i.imgur.com/bCnVnmr.jpg",
      name: "Fernanda Costa",
      text: "Salvou meu relacionamento de 10 anos. A rotina tinha acabado com a gente. Ontem tivemos a melhor noite das nossas vidas. Obrigada Ana!",
      time: "há 2 dias"
    }
  ];

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[220px]">
      {testimonials.map((t, i) => (
        <div 
          key={i}
          className={`absolute inset-0 transition-all duration-700 transform ${
            i === idx ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          } bg-white rounded-xl shadow-md border border-gray-100 p-4`}
        >
          <div className="flex items-center gap-3 mb-3">
            <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-pink-200" />
            <div>
              <p className="font-bold text-gray-900">{t.name}</p>
              <div className="flex text-yellow-400 text-xs">
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
              </div>
            </div>
            <span className="ml-auto text-xs text-gray-400">{t.time}</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">"{t.text}"</p>
          <div className="flex items-center gap-4 border-t pt-2 border-gray-50">
            <button className="flex items-center gap-1 text-xs text-blue-600 font-semibold">
              <ThumbsUp size={14} /> Curtir
            </button>
            <button className="flex items-center gap-1 text-xs text-red-500 font-semibold">
              <Heart size={14} fill="currentColor" /> Amei
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CountdownBanner: React.FC<{ timeLeft: number }> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  return (
    <div className="bg-red-600 text-white text-center py-3 px-4 font-bold text-sm shadow-lg z-50 sticky top-0 w-full">
      Você acabou de ganhar 70% de desconto que expira em : 
      <span className="text-yellow-300 text-lg ml-2 font-mono">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

export const SalesPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: "", city: "" });

  const sales = [
    { name: "Amanda S.", city: "Rio de Janeiro" },
    { name: "Beatriz M.", city: "São Paulo" },
    { name: "Carol L.", city: "Belo Horizonte" },
    { name: "Daniela P.", city: "Curitiba" },
    { name: "Elena R.", city: "Salvador" },
    { name: "Fernanda C.", city: "Porto Alegre" },
    { name: "Gabriela T.", city: "Brasília" },
    { name: "Helena O.", city: "Recife" }
  ];

  useEffect(() => {
    // Initial delay
    const initialTimer = setTimeout(() => {
      showNextSale();
    }, 3000);

    const showNextSale = () => {
      const randomSale = sales[Math.floor(Math.random() * sales.length)];
      setData(randomSale);
      setVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setVisible(false);
        // Show next after random interval between 8-15 seconds
        setTimeout(showNextSale, Math.random() * 7000 + 8000);
      }, 4000);
    };

    return () => clearTimeout(initialTimer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-14 right-2 z-[60] bg-white rounded shadow-lg p-2 flex items-center gap-2 animate-fade-in-down border border-green-100 max-w-[170px]">
      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
        <CheckCircle size={12} />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-gray-800 leading-tight">{data.name}</span>
        <span className="text-[9px] text-gray-500 leading-tight">de {data.city} comprou</span>
        <span className="text-[8px] text-green-600 font-bold mt-0.5">há poucos segundos</span>
      </div>
    </div>
  );
};