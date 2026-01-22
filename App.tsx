import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, ContentPadding, SelectableOption, PhoneMockupCarousel, SocialProofCarousel, CountdownBanner, SalesPopup } from './components/UIComponents';
import { TestimonialData, BonusData } from './types';
import { CheckCircle, Lock, Clock, Star, Sparkles } from 'lucide-react';

// Preload images immediately when module loads
const imageUrls = [
  "https://i.imgur.com/xQjj8N5.png",
  "https://i.imgur.com/Fgw1OG5.jpeg",
  "https://i.imgur.com/zG4MT7C.jpeg",
  "https://quentesecarentes.com.br/wp-content/uploads/2019/10/banner29112016-009.jpg",
  "https://quentesecarentes.com.br/wp-content/uploads/2019/10/banner29112016-005.jpg",
  "https://sexshoperotica.com.br/wp-content/uploads/2016/11/banner29112016-001.jpg",
  "https://i0.statig.com.br/bancodeimagens/2d/xa/7l/2dxa7lvdi0j372n4yuhaioj96.jpg",
  "https://i.imgur.com/nCdT1tV.jpg",
  "https://i.imgur.com/UV9Z6gf.png",
  "https://i.imgur.com/VhoVk3r.png",
  "https://i.imgur.com/bCnVnmr.jpg"
];

// Start fetching immediately
imageUrls.forEach((url) => {
  const img = new Image();
  img.src = url;
});

export default function App() {
  const [step, setStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  // State for multi-select steps
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  // Store quiz answers for analysis
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string | string[]>>({});
  
  // Timer for sales page (10 minutes = 600 seconds)
  const [timeLeft, setTimeLeft] = useState(600);
  
  const checkoutUrl = "https://go.perfectpay.com.br/PPU38CQ6EFC";

  // Force scroll to top on every step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [step]);

  const nextStep = () => {
    setStep((s) => s + 1);
    setSelectedOptions([]);
  };

  const handleSingleAnswer = (answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [step]: answer }));
    nextStep();
  };

  const handleMultiAnswerSubmit = () => {
    setQuizAnswers(prev => ({ ...prev, [step]: selectedOptions }));
    nextStep();
  };

  const handleCheckout = () => {
    window.location.href = checkoutUrl;
  };

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(o => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const QuizLogo = () => (
    <div className="flex justify-center pt-6 px-6 mb-4">
      <img 
        src="https://i.imgur.com/xQjj8N5.png" 
        alt="Manual das Posições Secretas" 
        className="w-[100px] h-[100px] object-contain"
        loading="eager"
        decoding="sync"
      />
    </div>
  );

  // Loading Screen Logic
  const [currentLoadingTestimonial, setCurrentLoadingTestimonial] = useState(0);
  const loadingTestimonials = [
    {
      name: "Carla Souza",
      handle: "@carla.souza.fit",
      text: "Obrigada Ana Julia! O Manual salvou meu casamento. A gente vivia brigando, agora é só amor e carinho o dia todo. A posição 12 é surreal!"
    },
    {
      name: "Mariana Lima",
      handle: "@mari_lima99",
      text: "Nunca imaginei que fosse tão fácil. As aulas são curtas e diretas. Em uma noite já vi diferença."
    },
    {
      name: "Juliana Mendes",
      handle: "@ju.mendes_ofc",
      text: "Amei as posições! Meu namorado ficou doido kkkkk. Recomendo pra todas as minhas amigas."
    }
  ];

  useEffect(() => {
    if (step === 16) {
      // Progress Bar
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => nextStep(), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 50); // Adjust speed

      // Testimonial Cycler
      const testimonialInterval = setInterval(() => {
        setCurrentLoadingTestimonial((prev) => (prev + 1) % loadingTestimonials.length);
      }, 1800);

      return () => {
        clearInterval(interval);
        clearInterval(testimonialInterval);
      };
    }
  }, [step]);

  // Sales Page Timer Logic
  useEffect(() => {
    if (step === 17 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  // --- RENDER STEPS ---

  // Step 0: AGE QUESTION
  if (step === 0) {
    return (
      <Container>
        <QuizLogo />
        <ContentPadding>
          <h1 className="text-2xl font-bold text-red-600 leading-tight text-center">
            Surpreenda seu parceiro inovando com posições nunca vistas antes
          </h1>
          <p className="text-gray-700 font-bold text-center text-lg mt-2">
            Primeiramente nos conte sua idade
          </p>
          <div className="flex flex-col gap-3 mt-4">
            <SelectableOption selected={false} onClick={() => handleSingleAnswer("18-25")}>18-25</SelectableOption>
            <SelectableOption selected={false} onClick={() => handleSingleAnswer("25-39")}>25-39</SelectableOption>
            <SelectableOption selected={false} onClick={() => handleSingleAnswer("39-50")}>39-50</SelectableOption>
            <SelectableOption selected={false} onClick={() => handleSingleAnswer("50+")}>50+</SelectableOption>
          </div>
        </ContentPadding>
      </Container>
    );
  }

  // Step 1: Hook
  if (step === 1) {
    return (
      <Container>
        <QuizLogo />
        <div className="px-6 pb-2 fade-in">
          <h1 className="text-2xl font-bold text-red-600 leading-tight text-center">
            Conheça o MANUAL DAS POSIÇÕES
          </h1>
        </div>
        <img 
          src="https://i.imgur.com/Fgw1OG5.jpeg" 
          alt="Couple" 
          className="w-full h-auto shadow-sm"
          loading="eager"
          decoding="sync"
        />
        <div className="p-6 pt-4 flex flex-col gap-4 flex-grow fade-in">
          <p className="text-gray-700 text-center">
            😈 Essas 50 posições secretas vão fazer ele esquecer todas as outras mulheres e desejar apenas você
          </p>
          <p className="text-gray-700 font-medium text-center">
            🔥 Ele vai implorar pela sua atenção e pensar em você 24h por dia
          </p>
          <p className="text-gray-600 text-sm italic text-center">
            🤫 Você nunca mais vai ser ignorada, trocada ou se sentir insegura porque ele não te procura mais…
          </p>
          <div className="mt-auto">
            <Button onClick={nextStep}>Continuar</Button>
          </div>
        </div>
      </Container>
    );
  }

  // Step 2: Bio
  if (step === 2) {
    return (
      <Container>
        <QuizLogo />
        <div className="px-6 pb-4 fade-in">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Conheça sua professora: Ana Julia
          </h2>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wide text-center mt-1">
            Criadora do MANUAL DAS POSIÇÕES SECRETAS
          </p>
        </div>
        <img 
          src="https://i.imgur.com/zG4MT7C.jpeg" 
          alt="Ana Julia" 
          className="w-full h-auto shadow-sm"
          loading="eager"
        />
        <ContentPadding>
          <p className="text-gray-700 text-center">
            Uma sexóloga que se tornou uma das profissionais mais reconhecidas e respeitadas do país.
          </p>
          <p className="text-gray-700 text-center font-bold">
            Sexóloga e especialista em sexualidade feminina
          </p>
          <p className="text-gray-700 text-center">
            Já ajudou mais de 73 mil mulheres a dominarem a mente masculina se tornarem inesquecíveis na cama
          </p>
          <div className="mt-auto">
            <Button onClick={nextStep}>Continuar</Button>
          </div>
        </ContentPadding>
      </Container>
    );
  }

  // Step 3: Quiz 1
  if (step === 3) {
    return (
      <Container>
        <QuizLogo />
        <div className="bg-pink-100 h-2 w-full"><div className="bg-pink-500 h-2 w-[10%]"></div></div>
        <ContentPadding>
          <p className="text-gray-500 text-sm font-semibold text-center">Antes de liberar o seu acesso ao Manual das Posições Matadoras, preciso saber:</p>
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Em qual momento da sua vida amorosa você está nesse momento
          </h2>
          <div className="flex flex-col gap-3">
            {[
              "💍 Estou em um relacionamento",
              "💘 Estou vivendo um romance mas ainda não é oficial",
              "💃 Sou solteira e estou livre",
              "🤔 Minha situação é complicada…"
            ].map((opt) => (
              <SelectableOption key={opt} selected={false} onClick={() => handleSingleAnswer(opt)}>{opt}</SelectableOption>
            ))}
          </div>
        </ContentPadding>
      </Container>
    );
  }

  // Step 4: Quiz 2
  if (step === 4) {
    return (
      <Container>
        <QuizLogo />
        <div className="bg-pink-100 h-2 w-full"><div className="bg-pink-500 h-2 w-[25%]"></div></div>
        <ContentPadding>
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Quando o assunto é sexo, como você se classifica?
          </h2>
          <div className="flex flex-col gap-3">
            {[
              "🙈 Sou iniciante total, preciso aprender do zero",
              "😕 Dou pro gasto, mas fico insegura em algumas situações",
              "😏 Mando bem, mas falta variedade",
              "😈 Eu arraso, mas quero novas técnicas"
            ].map((opt) => (
              <SelectableOption key={opt} selected={false} onClick={() => handleSingleAnswer(opt)}>{opt}</SelectableOption>
            ))}
          </div>
        </ContentPadding>
      </Container>
    );
  }

  // Step 5: Quiz 3
  if (step === 5) {
    return (
      <Container>
        <QuizLogo />
        <div className="bg-pink-100 h-2 w-full"><div className="bg-pink-500 h-2 w-[40%]"></div></div>
        <ContentPadding>
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Qual sua maior dificuldade na hora do sexo?
          </h2>
          <div className="flex flex-col gap-3">
            {[
              "😶 Não conseguir surpreender de verdade",
              "👀 Fico sem graça de testar novas técnicas e acabo indo no básico",
              "🥱 Cansar rápido e perder o ritmo",
              "🥹 Não saber variar as técnicas"
            ].map((opt) => (
              <SelectableOption key={opt} selected={false} onClick={() => handleSingleAnswer(opt)}>{opt}</SelectableOption>
            ))}
          </div>
        </ContentPadding>
      </Container>
    );
  }

  // Step 6: Quiz 4 (Multi)
  if (step === 6) {
    return (
      <Container>
        <QuizLogo />
        <div className="bg-pink-100 h-2 w-full"><div className="bg-pink-500 h-2 w-[55%]"></div></div>
        <ContentPadding>
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
            O que você quer que aconteça depois de aplicar as 50 POSIÇÕES SECRETAS?
          </h2>
          <p className="text-sm text-gray-500 mb-4 text-center">Pode selecionar mais de uma opção</p>
          <div className="flex flex-col gap-3 mb-6">
            {[
              "🔥 Ver ele gemendo e perdendo o controle",
              "💦 Fazer ele gozar muito e tremer de prazer",
              "😈 Sentir que ele nunca vai me esquecer",
              "🤲 Sentir que ele está totalmente nas minhas mãos",
              "👑 Ouvir dele que eu sou a melhor que ele já teve"
            ].map((opt) => (
              <SelectableOption 
                key={opt}
                selected={selectedOptions.includes(opt)} 
                onClick={() => toggleOption(opt)}
              >
                {opt}
              </SelectableOption>
            ))}
          </div>
          <Button onClick={handleMultiAnswerSubmit} disabled={selectedOptions.length === 0}>Continuar</Button>
        </ContentPadding>
      </Container>
    );
  }

  // Step 7: Testimonials 1
  if (step === 7) {
    return (
      <Container>
        <QuizLogo />
        <ContentPadding>
          <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
            Veja o relato de algumas alunas que já aplicaram a técnica das posições secretas…
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-gray-700 italic">"Meu Deus, nunca imaginei que uma simples mudança de posição faria ele ficar tão obcecado. Ele me mandou flores hoje de manhã!"</p>
              <p className="text-pink-600 font-bold mt-2 text-right text-sm">- Fernanda S.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-gray-700 italic">"Achava que meu casamento tinha esfriado, mas depois do módulo 2, parece que estamos em lua de mel de novo."</p>
              <p className="text-pink-600 font-bold mt-2 text-right text-sm">- Claudia M.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-gray-700 italic">"Simplesmente funciona. Eu era tímida, agora me sinto uma deusa na cama."</p>
              <p className="text-pink-600 font-bold mt-2 text-right text-sm">- Renata L.</p>
            </div>
          </div>
          <div className="mt-6">
            <Button onClick={nextStep}>Continuar</Button>
          </div>
        </ContentPadding>
      </Container>
    );
  }

  // Step 8: Warning
  if (step === 8) {
    return (
      <Container>
        <QuizLogo />
        <ContentPadding>
          <h2 className="text-2xl font-extrabold text-red-600 uppercase text-center leading-tight">
            SE VOCÊ NÃO FAZ ESSAS 50 POSIÇÕES, OUTRA FARÁ POR VOCÊ.
          </h2>
          <img 
            src="https://quentesecarentes.com.br/wp-content/uploads/2019/10/banner29112016-009.jpg" 
            alt="Warning Banner" 
            className="w-full h-auto rounded-lg shadow-md my-4"
          />
          <p className="text-lg font-medium text-center text-gray-800">
            Enquanto você tenta ser a certinha… ele deseja Outra Mulher que sabe ser PUTA na hora CERTA
          </p>
          <div className="mt-8">
            <Button onClick={nextStep}>Continuar</Button>
          </div>
        </ContentPadding>
      </Container>
    );
  }

  // Step 9: Transformation
  if (step === 9) {
    return (
      <Container>
        <QuizLogo />
        <ContentPadding>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sua vida Sexual vai mudar da água pro vinho 🍷
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>Você vai descobrir os pontos ocultos de prazer do seu corpo e conseguir chegar ao orgasmo em qualquer relação - mesmo que o homem seja ruim de cama…</p>
            <p>Vai eliminar suas inseguranças e se tornar uma mulher mais confiante, sensual e desejada na cama…</p>
            <p>Vai surpreender na cama e fazer ele esquecer de todas as mulheres que já passaram pela vida dele…</p>
            <p className="font-semibold text-gray-900 border-l-4 border-pink-500 pl-4">
              Depois de aplicar essa técnica, se ele OUSAR a ir pra cama com outra mulher, vai perceber que elas não chegam aos seus pés…
            </p>
          </div>
          <div className="mt-auto pt-6">
            <Button onClick={nextStep}>Continuar</Button>
          </div>
        </ContentPadding>
      </Container>
    );
  }

  // Step 10: Promise
  if (step === 10) {
    return (
      <Container>
        <QuizLogo />
        <ContentPadding>
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Ao liberar acesso ao Manual das Posições você vai descobrir como:
          </h2>
          <ul className="space-y-3">
            {[
              "Fazer qualquer homem gozar implorando o seu nome.",
              "Trazer de volta o tesão do seu parceiro (mesmo que ele esteja distante).",
              "Deixar homens desesperados por mais uma noite com você.",
              "Usar técnicas secretas que criam dependência sexual imediata.",
              "Virar aquela mulher que entra no quarto e faz todas as outras parecerem amadoras.",
              "Ser a única capaz de dar a ele a sensação de prazer total!"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button onClick={nextStep}>Sim, quero isso!</Button>
          </div>
        </ContentPadding>
      </Container>
    );
  }

  // Step 11: Quiz 5 (Multi)
  if (step === 11) {
    return (
      <Container>
        <QuizLogo />
        <div className="bg-pink-100 h-2 w-full"><div className="bg-pink-500 h-2 w-[70%]"></div></div>
        <ContentPadding>
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
            Qual é a sua maior frustração na cama hoje?
          </h2>
          <p className="text-sm text-gray-500 mb-4 text-center">Pode escolher mais de uma opção</p>
          <div className="flex flex-col gap-3 mb-6">
            {[
              "Me sinto insegura por que não consigo fazer ele gozar",
              "Tenho impressão que ele pensa em outra quando está comigo",
              "Ele parece distante, como se fosse só obrigação",
              "Nunca me sinto realmente inesquecível",
              "Ele nem me procura mais..."
            ].map((opt) => (
              <SelectableOption 
                key={opt}
                selected={selectedOptions.includes(opt)} 
                onClick={() => toggleOption(opt)}
              >
                {opt}
              </SelectableOption>
            ))}
          </div>
          <Button onClick={handleMultiAnswerSubmit} disabled={selectedOptions.length === 0}>Continuar</Button>
        </ContentPadding>
      </Container>
    );
  }

  // Step 12: Quiz 6
  if (step === 12) {
    return (
      <Container>
        <QuizLogo />
        <div className="bg-pink-100 h-2 w-full"><div className="bg-pink-500 h-2 w-[85%]"></div></div>
        <ContentPadding>
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Quando foi a última vez que você realmente sentiu um homem louco de tesão por você a ponto de perder o controle?
          </h2>
          <div className="flex flex-col gap-3">
            {[
              "Há muito tempo…",
              "É tão difícil que sinto que não sou boa o suficiente",
              "Recentemente, mas acho que eu poderia ter sido melhor",
              "Nunca senti isso de verdade"
            ].map((opt) => (
              <SelectableOption key={opt} selected={false} onClick={() => handleSingleAnswer(opt)}>{opt}</SelectableOption>
            ))}
          </div>
        </ContentPadding>
      </Container>
    );
  }

  // Step 13: 3 Things
  if (step === 13) {
    return (
      <Container>
        <QuizLogo />
        <ContentPadding>
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Essas 3 coisas vão acontecer logo na primeira vez que você colocar em prática alguma das posições do Manual...
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-pink-600 mb-1">Ele Vai Pedir "Arrego"</h3>
              <p className="text-gray-700 text-sm">
                Muitas alunas relatam que, na primeira vez, o homem fica tão excitado que não dura muito. Isso é normal. O nível de estímulo é tão alto que ele vai precisar de um tempo para se acostumar com essa nova mulher potente que você se tornou.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-pink-600 mb-1">O Efeito "Cachorrinho"</h3>
              <p className="text-gray-700 text-sm">
                Prepare-se para ele ficar mais carinhoso, mandar mensagens do nada durante o dia e querer dormir abraçado. Isso não é mágica, é a liberação de Ocitocina que as técnicas causam no cérebro masculino.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-pink-600 mb-1">A Inversão de Poder</h3>
              <p className="text-gray-700 text-sm">
                Você vai parar de se perguntar 'será que eu sou boa o suficiente?'. Ao ver ele revirando os olhos, perdendo a fala e ficando totalmente entregue nas suas mãos, sua autoconfiança vai explodir.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Button onClick={nextStep}>Continuar</Button>
          </div>
        </ContentPadding>
      </Container>
    );
  }

  // Step 14: Final Gate
  if (step === 14) {
    return (
      <Container>
        <QuizLogo />
        <ContentPadding>
          <div className="flex flex-col items-center justify-center flex-grow text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Você quer ter acesso ao Manual das Posições SECRETAS?
            </h2>
            <div className="w-full space-y-4">
              <Button onClick={nextStep}>✅ Sim, quero muito</Button>
              <Button variant="secondary" onClick={nextStep}>🚫 Não sei...</Button>
            </div>
          </div>
        </ContentPadding>
      </Container>
    );
  }

  // Step 15: Loading
  if (step === 16) {
    const t = loadingTestimonials[currentLoadingTestimonial];

    return (
      <Container>
        <QuizLogo />
        <ContentPadding>
          <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
            <div className="w-24 h-24 rounded-full border-8 border-gray-200 border-t-pink-500 animate-spin"></div>
            
            <div className="w-full text-center">
              <span className="text-4xl font-bold text-pink-600">{loadingProgress}%</span>
              <p className="text-gray-600 mt-2 font-medium">Preparando seu acesso..</p>
            </div>

            {/* Testimonial Carousel in Loading */}
            <div className="w-full bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-sm transition-opacity duration-500 fade-in">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-bold">{t.name} <span className="text-gray-400 font-normal">{t.handle}</span></p>
                  <div className="flex text-yellow-400 mb-1">
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                  </div>
                  <p className="text-sm text-gray-800 italic">"{t.text}"</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 animate-pulse mt-auto">Verificando disponibilidade de vagas...</p>
          </div>
        </ContentPadding>
      </Container>
    );
  }

  // Handle the transition step
  if (step === 15) {
    // Immediate redirect to loading logic
    setTimeout(() => setStep(16), 100);
    return null;
  }

  // Step 17: Sales Page
  if (step === 17) {
    const age = quizAnswers[0] as string || "sua idade";
    const status = quizAnswers[3] as string || "";
    const skill = quizAnswers[4] as string || "";
    const struggle = quizAnswers[5] as string || "";
    const lastTime = quizAnswers[12] as string || "";

    return (
      <Container>
        <SalesPopup />
        <CountdownBanner timeLeft={timeLeft} />
        
        <ContentPadding>
          <h1 className="text-2xl font-black text-center text-gray-900 leading-tight mb-2">
            SEU MANUAL COM AS 50 POSIÇÕES SECRETAS ESTÁ PRONTO !
          </h1>
          
          <div className="bg-green-50 border border-green-200 p-3 rounded-lg mb-4 text-center">
             <p className="text-green-800 font-bold text-sm leading-tight">
               94% das mulheres com perfis semelhantes ao seu percebem melhora em apenas 2 semanas com o Manual das POSIÇÕES SECRETAS
             </p>
          </div>

          <div className="mb-8">
            <PhoneMockupCarousel />
          </div>

          {/* PERSONAL ANALYSIS SECTION */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-3">
              <Sparkles className="text-pink-600" size={24} />
              <h2 className="text-lg font-extrabold text-gray-900 uppercase">SUA ANÁLISE PERSONALIZADA</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold text-gray-500 uppercase">Sua Resposta (Idade): <span className="text-gray-800">{age}</span></p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold text-pink-600">Como o Manual Ajuda:</span> Não importa se você tem 20 ou 50 anos, o Manual foi desenhado para respeitar o ritmo do seu corpo, aumentando a libido naturalmente e garantindo que você tenha energia para surpreender.
                </p>
              </div>

              {status && (
                <div className="flex flex-col gap-1 border-t border-gray-200 pt-3">
                   <p className="text-xs font-bold text-gray-500 uppercase">Sua Resposta (Status): <span className="text-gray-800">{status}</span></p>
                   <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-bold text-pink-600">Como o Manual Ajuda:</span> Para o seu momento atual, o "Módulo de Conexão Profunda" vai ser essencial. Ele ensina exatamente como criar um vínculo emocional inquebrável através do sexo.
                  </p>
                </div>
              )}

              {skill && (
                <div className="flex flex-col gap-1 border-t border-gray-200 pt-3">
                   <p className="text-xs font-bold text-gray-500 uppercase">Sua Resposta (Nível): <span className="text-gray-800">{skill}</span></p>
                   <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-bold text-pink-600">Como o Manual Ajuda:</span> As aulas em vídeo com a Vanessa de Oliveira mostram o passo a passo prático, tirando qualquer dúvida ou insegurança sobre como executar os movimentos com perfeição.
                  </p>
                </div>
              )}

              {struggle && (
                <div className="flex flex-col gap-1 border-t border-gray-200 pt-3">
                   <p className="text-xs font-bold text-gray-500 uppercase">Sua Resposta (Dificuldade): <span className="text-gray-800">{struggle}</span></p>
                   <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-bold text-pink-600">Como o Manual Ajuda:</span> Você terá acesso a um arsenal de 50 opções. Nunca mais você vai sentir aquele "branco" na hora H ou medo de ser repetitiva. Você terá sempre uma carta na manga.
                  </p>
                </div>
              )}
              
               {lastTime && (
                <div className="flex flex-col gap-1 border-t border-gray-200 pt-3">
                   <p className="text-xs font-bold text-gray-500 uppercase">Sua Resposta (Última vez): <span className="text-gray-800">{lastTime}</span></p>
                   <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-bold text-pink-600">Como o Manual Ajuda:</span> As técnicas de "Gatilhos Mentais" inclusas no bônus vão reverter essa situação em dias, fazendo com que ele sinta uma urgência incontrolável de estar com você.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900 text-center">Dentro desse manual, você terá acesso a:</h2>
            
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800">As 50 Posições Matadoras</h3>
                  <p className="text-sm text-gray-600">Posições secretas que ativam prazer físico intenso e criam apego emocional, deixando ele completamente viciado em você</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800">Frases que Alteram a Química Cerebral</h3>
                  <p className="text-sm text-gray-600">e fazem ele ter 10x mais prazer. O que dizer antes, durante e depois de cada posição para potencializar o desejo e fazer ele pensar em você o tempo todo</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800">Aulas Práticas comigo, Vanessa de Oliveira</h3>
                  <p className="text-sm text-gray-600">Demonstrações reais de como executar cada posição, mesmo sendo iniciante</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800">Técnicas de Dominação Silenciosa</h3>
                  <p className="text-sm text-gray-600">Como assumir o controle na cama sem parecer forçada, criando uma experiência inesquecível que ele vai querer repetir</p>
                </div>
              </li>
            </ul>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <p className="font-medium text-green-800">
                Tudo 100% em vídeo e com conteúdo direto ao ponto, tão claro que qualquer mulher consegue aplicar na mesma noite.
              </p>
            </div>
          </div>

          <div className="my-8">
            <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 rounded-xl text-white text-center shadow-xl">
              <h3 className="font-bold text-xl mb-2">GARANTA SUA VAGA HOJE</h3>
              <p className="text-sm opacity-90 mb-4 uppercase">E RECEBA + 7 BÔNUS TOTALMENTE ESPECIAIS QUE VAI TE TORNAR UMA PROFISSIONAL NA CAMA</p>
              <Button variant="pulsing-green" onClick={handleCheckout}>QUERO O MEU ACESSO AO MANUAL</Button>
            </div>
          </div>

          <div className="space-y-6 bg-gray-50 p-4 rounded-xl">
            <h3 className="text-center font-bold text-gray-900 text-lg">Veja o que falam algumas de nossas clientes</h3>
            <SocialProofCarousel />
          </div>

          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-black text-center text-pink-600 uppercase">
              🎁 BÔNUS EXCLUSIVOS DO MANUAL DAS POSIÇÕES SECRETAS GRÁTIS - SOMENTE 4 VAGAS DISPONÍVEIS
            </h2>
            
            {[
              { title: "BÔNUS 1 — Frases que Criam Desejo Imediato", val: "R$47,00", desc: "O que dizer antes, durante e depois do momento íntimo para ativar desejo, conexão emocional e fazer ele pensar em você mesmo quando estiver longe." },
              { title: "BÔNUS 2 — Linguagem Corporal Feminina Irresistível", val: "R$67,00", desc: "Gestos, posturas e movimentos simples que aumentam sua presença, confiança e poder de atração sem precisar falar nada." },
              { title: "BÔNUS 3 — Técnicas de Dominação Silenciosa", val: "R$97,00", desc: "Como conduzir a experiência de forma natural, feminina e elegante, criando uma sensação de intensidade e exclusividade que ele vai querer repetir." },
              { title: "BÔNUS 4 — O Guia da Mulher Inesquecível", val: "R$57,00", desc: "Os comportamentos e atitudes que fazem um homem associar você a prazer, conforto e admiração — evitando que ele perca o interesse com o tempo." },
              { title: "BÔNUS 5 — Como Reacender o Desejo em Relacionamentos Mornos", val: "R$77,00", desc: "Estratégias práticas para quebrar a rotina, recuperar a tensão e fazer ele voltar a te olhar com o mesmo desejo do início." },
              { title: "BÔNUS 6 — Perfumes e Gatilhos Sensoriais", val: "R$37,00", desc: "Como usar aromas, ambientes e estímulos sutis para criar associações emocionais profundas e aumentar a atração." },
              { title: "BÔNUS 7 — Grupo VIP de Alunas", val: "R$97,00", desc: "Acesso a um grupo fechado com dicas extras, conteúdos complementares e suporte para acelerar seus resultados." }
            ].map((bonus, idx) => (
              <div key={idx} className="border-2 border-dashed border-pink-300 rounded-xl p-4 bg-pink-50">
                <span className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">GRÁTIS</span>
                <h3 className="font-bold text-gray-900 text-center">{bonus.title}</h3>
                <p className="text-xs text-gray-500 line-through mb-2 text-center">Valor: {bonus.val}</p>
                <p className="text-sm text-gray-700">{bonus.desc}</p>
              </div>
            ))}

            <div className="text-center bg-gray-100 p-4 rounded-lg">
              <p className="font-bold text-gray-900">💎 VALOR TOTAL DOS BÔNUS: R$479,00</p>
              <p className="text-sm text-gray-600 mt-2">
                Mas hoje, você vai receber TODOS esses bônus TOTALMENTE GRÁTIS ao garantir seu acesso ao MANUAL DAS POSIÇÕES SECRETAS.
              </p>
              <p className="text-sm text-gray-600 mt-1">Nenhum custo adicional. Nenhuma pegadinha. É só entrar agora e aproveitar.</p>
            </div>
          </div>

          <div className="my-8 border-4 border-green-600 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-green-600 text-center py-2 font-bold uppercase tracking-wider text-sm text-white">
              😈🔥 CONDIÇÃO ESPECIAL LIBERADA SOMENTE NESSA PÁGINA
            </div>
            <div className="p-6 bg-white text-center">
              <p className="text-gray-600 font-medium mb-2">TENHA ACESSO AO MANUAL + 7 BÔNUS INÉDITOS POR APENAS:</p>
              <div className="text-5xl font-black text-green-600 mb-2 tracking-tighter">R$ 37,00</div>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-6">Pagamento Único</p>
              <p className="text-sm text-red-500 mb-4 bg-red-50 p-2 rounded">
                Você está recebendo <span className="font-bold line-through">R$442,00</span> de desconto pra ter acesso ao conteúdo mais poderoso pra transformar sua vida sexual e dominar o poder de deixar qualquer homem aos seus pés
              </p>
              <Button variant="pulsing-green" className="text-xl" onClick={handleCheckout}>QUERO O MEU ACESSO AO MANUAL</Button>
              <p className="text-xs text-gray-400 mt-2">(teste hoje mesmo)</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-bold text-yellow-800 uppercase flex items-center justify-center gap-2">
                <Clock size={20} /> Atenção
              </h3>
              <p className="text-yellow-900 font-bold mt-2 text-center">SE VOCÊ NÃO FIZER ISSO AINDA HOJE, OUTRA VAI FAZER EM SEU LUGAR! 💔</p>
              <p className="text-yellow-800 text-sm mt-2 text-center">Enquanto você tenta ser a certinha… ele deseja Outra Mulher que sabe ser PUTA na hora CERTA. 😈</p>
            </div>

            <div className="prose prose-sm prose-pink text-gray-700">
              <p>Se você deseja salvar seu relacionamento e fazer ele te olhar com o mesmo desejo de quando se conheceram, você precisa muito desse manual…</p>
              <p>Seu homem nunca mais vai sentir desejo por nenhuma outra mulher além de você.... Você será para ele a Rainha das Rainhas...</p>
              <p>E se você é solteira, com essas posições você vai deixar os homens comendo na sua mão, Eles não vão parar de te procurar, dizendo que precisam te ver de novo…</p>
              <p>Você vai ter tantos homens aos seus pés que vai poder escolher qualquer homem que você quiser pra se relacionar…</p>
            </div>
            
            <Button variant="pulsing-green" onClick={handleCheckout}>QUERO SER ÚNICA</Button>
            
            <p className="text-gray-700 leading-relaxed">
              A verdade é dura: Homens esquecem mulheres comuns todos os dias. Mas eles nunca esquecem uma mulher que sabe fazer as 5 Posições Matadoras. Essas mulheres dominam algo que a maioria nunca aprende: transformar prazer em vício. É como uma droga invisível: quanto mais ele prova, mais precisa.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Enquanto você sofre por atenção, outras estão usando esses segredos para prender homens poderosos, receber presentes, viagens e fidelidade absoluta.
            </p>
            
            <p className="font-bold text-center text-gray-900 text-lg">
              💋 Faça essas posições matadoras hoje mesmo… antes que outra mais “esperta” roube o que você chama de “seu homem”. 😉💋
            </p>

            <ul className="space-y-2 font-semibold text-gray-800">
              <li className="flex gap-2"><span className="text-red-500">🔥</span> Torne Ele Um "Víciado" pela sua Buceta.</li>
              <li className="flex gap-2"><span className="text-red-500">🔥</span> Faça Ele Nunca Mais Querer Outra Mulher.</li>
              <li className="flex gap-2"><span className="text-red-500">🔥</span> Salve Seu Relacionamento "morno".</li>
              <li className="flex gap-2"><span className="text-red-500">🔥</span> Faça ele pensar em você e querer te agradar o Tempo todo.</li>
            </ul>

            <Button variant="pulsing-green" onClick={handleCheckout}>QUERO DEIXAR ELE VICIADO EM MIM</Button>
          </div>

          <div className="mt-12 mb-8 bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
             <div className="flex justify-center mb-4">
               <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white">
                 <Lock size={32} />
               </div>
             </div>
             <h2 className="text-xl font-bold text-gray-900">GARANTIA TOTAL DE 7 DIAS</h2>
             <h3 className="text-lg font-medium text-gray-600 mb-4">Risco Zero para Você</h3>
             <p className="text-sm text-gray-600 mb-4">
               Você tem 7 dias completos para acessar o Manual, aplicar as posições, assistir às aulas com Vanessa e avaliar se o método realmente entrega a transformação que promete.
             </p>
             <p className="text-sm text-gray-600 mb-4">
               Se por qualquer motivo — e eu disse qualquer motivo — você não ficar satisfeita com o Manual das Posições Matadoras, basta enviar um e-mail e devolvemos 100% do seu investimento na mesma hora.
             </p>
             <p className="text-sm font-bold text-gray-800 mb-6">
               A responsabilidade é toda minha. Você não tem nada a perder.
             </p>
             <Button variant="pulsing-green" onClick={handleCheckout}>QUERO COMPRAR SEM RISCOS</Button>
          </div>
          
          <footer className="text-center text-xs text-gray-400 pb-8">
            <p>© 2024 Manual das Posições Secretas. Todos os direitos reservados.</p>
          </footer>

        </ContentPadding>
      </Container>
    );
  }

  return null;
}