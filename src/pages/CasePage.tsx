import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CSSkin {
  id: string;
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  image: string;
  price: number;
}

interface CSCase {
  id: string;
  name: string;
  image: string;
  price: number;
  items: CSSkin[];
  description: string;
}

const CasePage = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [isOpening, setIsOpening] = useState(false);
  const [wonItem, setWonItem] = useState<CSSkin | null>(null);
  const [rouletteItems, setRouletteItems] = useState<CSSkin[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [balance, setBalance] = useState(1000);

  const cases: { [key: string]: CSCase } = {
    'neon-dreams': {
      id: 'neon-dreams',
      name: 'Neon Dreams Case',
      image: '/img/575142d6-0a14-45c7-95ad-e791d1fec2b7.jpg',
      price: 50,
      description: 'Коллекция футуристических скинов с неоновыми эффектами',
      items: [
        { id: '1', name: 'AK-47 | Neon Revolution', rarity: 'legendary', image: '/img/50facf71-288e-4a72-7d7d-72b85e051c41.jpg', price: 500 },
        { id: '2', name: 'Karambit | Electric Hive', rarity: 'legendary', image: '/img/b939b035-5a5e-4a2e-a38d-595557f1aa88.jpg', price: 800 },
        { id: '3', name: 'AWP | Cyber Punk', rarity: 'epic', image: '/img/50facf71-288e-4a72-7d7d-72b85e051c41.jpg', price: 200 },
        { id: '4', name: 'M4A4 | Neon Tiger', rarity: 'rare', image: '/img/50facf71-288e-4a72-7d7d-72b85e051c41.jpg', price: 80 },
        { id: '5', name: 'Glock-18 | Digital Storm', rarity: 'uncommon', image: '/img/50facf71-288e-4a72-7d7d-72b85e051c41.jpg', price: 30 },
        { id: '6', name: 'P250 | Circuit Board', rarity: 'common', image: '/img/50facf71-288e-4a72-7d7d-72b85e051c41.jpg', price: 15 }
      ]
    },
    'cyber-collection': {
      id: 'cyber-collection',
      name: 'Cyber Collection',
      image: '/img/575142d6-0a14-45c7-95ad-e791d1fec2b7.jpg',
      price: 75,
      description: 'Эксклюзивная коллекция кибер-скинов с высокой вероятностью редких предметов',
      items: [
        { id: '7', name: 'Butterfly Knife | Code Red', rarity: 'legendary', image: '/img/b939b035-5a5e-4a2e-a38d-595557f1aa88.jpg', price: 1200 },
        { id: '8', name: 'Desert Eagle | Cyber Core', rarity: 'epic', image: '/img/50facf71-288e-4a72-7d7d-72b85e051c41.jpg', price: 150 },
        { id: '9', name: 'AK-47 | Data Stream', rarity: 'rare', image: '/img/50facf71-288e-4a72-7d7d-72b85e051c41.jpg', price: 100 }
      ]
    }
  };

  const currentCase = cases[caseId || ''];

  const rarityColors = {
    common: 'border-gray-400 text-gray-400',
    uncommon: 'border-green-400 text-green-400',
    rare: 'border-blue-400 text-blue-400',
    epic: 'border-purple-400 text-purple-400',
    legendary: 'border-yellow-400 text-yellow-400'
  };

  const rarityBg = {
    common: 'from-gray-900 to-gray-800 shadow-gray-400/20',
    uncommon: 'from-green-900 to-green-800 shadow-green-400/20',
    rare: 'from-blue-900 to-blue-800 shadow-blue-400/20',
    epic: 'from-purple-900 to-purple-800 shadow-purple-400/20',
    legendary: 'from-yellow-900 to-yellow-800 shadow-yellow-400/20'
  };

  useEffect(() => {
    if (!currentCase) {
      navigate('/');
      return;
    }
    
    // Создаем массив для рулетки с повторениями для разных вероятностей
    const roulette: CSSkin[] = [];
    currentCase.items.forEach(item => {
      let count = 1;
      switch (item.rarity) {
        case 'legendary': count = 1; break;
        case 'epic': count = 3; break;
        case 'rare': count = 8; break;
        case 'uncommon': count = 15; break;
        case 'common': count = 25; break;
      }
      for (let i = 0; i < count; i++) {
        roulette.push(item);
      }
    });
    
    // Перемешиваем и создаем длинную ленту для анимации
    const shuffled = [...roulette].sort(() => Math.random() - 0.5);
    const longRoulette = [];
    for (let i = 0; i < 50; i++) {
      longRoulette.push(...shuffled);
    }
    setRouletteItems(longRoulette);
  }, [caseId, currentCase, navigate]);

  const openCase = async () => {
    if (balance < currentCase.price || isOpening) return;
    
    setBalance(prev => prev - currentCase.price);
    setIsOpening(true);
    setShowResult(false);
    setWonItem(null);

    // Определяем выигрышный предмет
    const random = Math.random();
    let winningItem: CSSkin;
    
    if (random < 0.02) { // 2% легендарные
      winningItem = currentCase.items.filter(i => i.rarity === 'legendary')[0] || currentCase.items[0];
    } else if (random < 0.08) { // 6% эпические
      winningItem = currentCase.items.filter(i => i.rarity === 'epic')[0] || currentCase.items[0];
    } else if (random < 0.25) { // 17% редкие
      winningItem = currentCase.items.filter(i => i.rarity === 'rare')[0] || currentCase.items[0];
    } else if (random < 0.55) { // 30% необычные
      winningItem = currentCase.items.filter(i => i.rarity === 'uncommon')[0] || currentCase.items[0];
    } else { // 45% обычные
      winningItem = currentCase.items.filter(i => i.rarity === 'common')[0] || currentCase.items[0];
    }

    // Находим индекс выигрышного предмета в рулетке
    const winningIndex = rouletteItems.findIndex(item => item.id === winningItem.id);
    const finalIndex = winningIndex + Math.floor(rouletteItems.length * 0.7);
    
    setSelectedIndex(finalIndex);
    
    // Показываем результат через 4 секунды
    setTimeout(() => {
      setWonItem(winningItem);
      setShowResult(true);
      setIsOpening(false);
    }, 4000);
  };

  if (!currentCase) {
    return <div>Кейс не найден</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 opacity-10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-cyan-500 opacity-5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-purple-800/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => navigate('/')}
                variant="outline" 
                className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {currentCase.name}
              </h1>
            </div>
            <Badge variant="outline" className="text-green-400 border-green-400 text-lg px-4 py-2">
              <Icon name="Coins" size={16} className="mr-2" />
              ${balance}
            </Badge>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Case Info */}
        <div className="mb-8 text-center">
          <div className="relative inline-block mb-6">
            <img 
              src={currentCase.image} 
              alt={currentCase.name}
              className="w-64 h-64 object-cover rounded-2xl shadow-2xl shadow-purple-500/30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
          </div>
          <p className="text-gray-300 text-lg mb-4">{currentCase.description}</p>
          <Badge className="text-2xl px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600">
            ${currentCase.price}
          </Badge>
        </div>

        {/* Roulette Container */}
        <div className="mb-8">
          <Card className="bg-black/60 border-purple-500/30 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              {/* Roulette */}
              <div className="relative h-40 overflow-hidden">
                {/* Selection Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-yellow-400 to-transparent z-20 shadow-lg shadow-yellow-400/50"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full z-20 shadow-lg shadow-yellow-400/50 animate-pulse"></div>
                
                {/* Items Strip */}
                <div 
                  className="flex h-full transition-transform duration-[4000ms] ease-out"
                  style={{
                    transform: isOpening ? `translateX(-${selectedIndex * 160 - window.innerWidth / 2 + 80}px)` : 'translateX(0)',
                    filter: isOpening ? 'blur(1px)' : 'none'
                  }}
                >
                  {rouletteItems.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className={`flex-shrink-0 w-40 h-full border-r border-gray-700 bg-gradient-to-b ${rarityBg[item.rarity]} flex flex-col items-center justify-center p-2 transition-all duration-300`}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg mb-2"
                      />
                      <p className={`text-xs text-center font-medium ${rarityColors[item.rarity]} truncate w-full`}>
                        {item.name}
                      </p>
                      <p className="text-green-400 text-xs">${item.price}</p>
                    </div>
                  ))}
                </div>

                {/* Glow effects */}
                {isOpening && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-pulse"></div>
                    <div className="absolute left-1/2 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent transform -translate-x-1/2 animate-pulse"></div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Open Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={openCase}
            disabled={balance < currentCase.price || isOpening}
            className="text-2xl px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-105"
          >
            {isOpening ? (
              <>
                <Icon name="Loader2" size={24} className="mr-3 animate-spin" />
                Открываем...
              </>
            ) : (
              `Открыть за $${currentCase.price}`
            )}
          </Button>
        </div>

        {/* Result Modal */}
        {showResult && wonItem && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-500">
            <Card className={`max-w-md mx-4 bg-gradient-to-b ${rarityBg[wonItem.rarity]} border-2 ${rarityColors[wonItem.rarity]} shadow-2xl animate-in zoom-in duration-700`}>
              <CardContent className="text-center py-12 px-8">
                {/* Celebration particles */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${1 + Math.random()}s`
                      }}
                    />
                  ))}
                </div>

                <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 animate-pulse">
                  🎉 ПОЗДРАВЛЯЕМ! 🎉
                </h3>
                
                <div className="relative mb-6">
                  <img 
                    src={wonItem.image} 
                    alt={wonItem.name}
                    className="w-40 h-40 object-cover mx-auto rounded-xl shadow-2xl animate-in zoom-in duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
                </div>
                
                <h4 className={`text-2xl font-bold mb-2 ${rarityColors[wonItem.rarity]}`}>
                  {wonItem.name}
                </h4>
                
                <Badge className={`mb-4 text-lg px-4 py-2 ${rarityColors[wonItem.rarity]} border-current bg-current/20`}>
                  {wonItem.rarity.toUpperCase()}
                </Badge>
                
                <p className="text-3xl font-bold text-green-400 mb-8">
                  ${wonItem.price}
                </p>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={() => setShowResult(false)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                  >
                    Продолжить
                  </Button>
                  <Button 
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="flex-1 border-purple-500 text-purple-400 hover:bg-purple-500/20"
                  >
                    В меню
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Available Items */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Возможные предметы
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCase.items.map((item) => (
              <Card key={item.id} className={`bg-gradient-to-b ${rarityBg[item.rarity]} border ${rarityColors[item.rarity]} hover:scale-105 transition-all duration-300 shadow-xl`}>
                <CardContent className="p-6 text-center">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h4 className={`font-bold mb-2 ${rarityColors[item.rarity]}`}>
                    {item.name}
                  </h4>
                  <Badge className={`mb-2 ${rarityColors[item.rarity]} border-current bg-current/20`}>
                    {item.rarity}
                  </Badge>
                  <p className="text-green-400 text-xl font-bold">
                    ${item.price}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasePage;