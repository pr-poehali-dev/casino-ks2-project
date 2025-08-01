import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
}

const Index = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<CSSkin[]>([]);
  const [isOpening, setIsOpening] = useState<string | null>(null);
  const [openedItem, setOpenedItem] = useState<CSSkin | null>(null);
  const [balance, setBalance] = useState(1000);

  const rarityColors = {
    common: 'text-gray-400 border-gray-400',
    uncommon: 'text-green-400 border-green-400',
    rare: 'text-blue-400 border-blue-400',
    epic: 'text-neon-purple border-neon-purple',
    legendary: 'text-neon-pink border-neon-pink'
  };

  const rarityGlow = {
    common: 'shadow-lg shadow-gray-400/20',
    uncommon: 'shadow-lg shadow-green-400/20',
    rare: 'shadow-lg shadow-blue-400/20',
    epic: 'shadow-lg shadow-neon-purple/20',
    legendary: 'shadow-lg shadow-neon-pink/20'
  };

  const cases: CSCase[] = [
    {
      id: 'neon-dreams',
      name: 'Neon Dreams Case',
      image: '/img/575142d6-0a14-45c7-95ad-e791d1fec2b7.jpg',
      price: 50,
      items: [
        { id: '1', name: 'AK-47 | Neon Revolution', rarity: 'legendary', image: '/img/50facf71-288e-4a72-7d7d-72b85e051c41.jpg', price: 500 },
        { id: '2', name: 'Karambit | Electric Hive', rarity: 'legendary', image: '/img/b939b035-5a5e-4a2e-a38d-595557f1aa88.jpg', price: 800 },
        { id: '3', name: 'AWP | Cyber Punk', rarity: 'epic', image: '/img/50facf71-288e-4a72-7d7d-72b85e051c41.jpg', price: 200 },
        { id: '4', name: 'M4A4 | Neon Tiger', rarity: 'rare', image: '/img/50facf71-288e-4a72-7d7d-72b85e051c41.jpg', price: 80 },
        { id: '5', name: 'Glock-18 | Digital Storm', rarity: 'uncommon', image: '/img/50facf71-288e-4a72-7d7d-72b85e051c41.jpg', price: 30 }
      ]
    },
    {
      id: 'cyber-collection',
      name: 'Cyber Collection',
      image: '/img/575142d6-0a14-45c7-95ad-e791d1fec2b7.jpg',
      price: 75,
      items: [
        { id: '6', name: 'Butterfly Knife | Code Red', rarity: 'legendary', image: '/img/b939b035-5a5e-4a2e-a38d-595557f1aa88.jpg', price: 1200 },
        { id: '7', name: 'Desert Eagle | Cyber Core', rarity: 'epic', image: '/img/50facf71-288e-4a72-7d7d-72b85e051c41.jpg', price: 150 }
      ]
    }
  ];

  const openCase = async (caseItem: CSCase) => {
    if (balance < caseItem.price) return;
    
    setBalance(prev => prev - caseItem.price);
    setIsOpening(caseItem.id);
    
    // Имитация анимации открытия
    setTimeout(() => {
      const randomItem = caseItem.items[Math.floor(Math.random() * caseItem.items.length)];
      setOpenedItem(randomItem);
      setInventory(prev => [...prev, randomItem]);
      setIsOpening(null);
    }, 2000);
  };

  const upgradeItems = () => {
    // Placeholder для системы апгрейда
    console.log('Upgrade system coming soon!');
  };

  return (
    <div className="min-h-screen bg-gaming-dark text-white">
      {/* Header */}
      <header className="border-b border-gaming-gray bg-gaming-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-montserrat text-neon-cyan neon-glow">
              CS2 CASINO
            </h1>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-neon-green border-neon-green text-lg px-4 py-2">
                <Icon name="Coins" size={16} className="mr-2" />
                ${balance}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="cases" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gaming-card border border-gaming-gray">
            <TabsTrigger value="cases" className="data-[state=active]:bg-neon-pink data-[state=active]:text-black">
              <Icon name="Package" size={16} className="mr-2" />
              Кейсы
            </TabsTrigger>
            <TabsTrigger value="contracts" className="data-[state=active]:bg-neon-cyan data-[state=active]:text-black">
              <Icon name="FileText" size={16} className="mr-2" />
              Контракты
            </TabsTrigger>
            <TabsTrigger value="upgrade" className="data-[state=active]:bg-neon-purple data-[state=active]:text-black">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Апгрейд
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-neon-green data-[state=active]:text-black">
              <Icon name="Package2" size={16} className="mr-2" />
              Инвентарь
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cases">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-montserrat text-neon-pink neon-glow">
                Открой кейсы и получи скины!
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cases.map((caseItem) => (
                  <Card key={caseItem.id} className="bg-gaming-card border-gaming-gray hover:border-neon-cyan transition-all duration-300">
                    <CardHeader>
                      <div className="relative">
                        <img 
                          src={caseItem.image} 
                          alt={caseItem.name}
                          className={`w-full h-48 object-cover rounded-lg ${
                            isOpening === caseItem.id ? 'animate-case-open' : ''
                          }`}
                        />
                        {isOpening === caseItem.id && (
                          <div className="absolute inset-0 bg-neon-cyan/20 rounded-lg animate-glow" />
                        )}
                      </div>
                      <CardTitle className="text-neon-cyan">{caseItem.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Badge variant="outline" className="text-neon-pink border-neon-pink">
                          ${caseItem.price}
                        </Badge>
                        <Button 
                          onClick={() => navigate(`/case/${caseItem.id}`)}
                          className="w-full bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-purple hover:to-neon-pink"
                        >
                          Открыть кейс
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Результат открытия */}
              {openedItem && (
                <Card className={`bg-gaming-card border-2 ${rarityColors[openedItem.rarity]} ${rarityGlow[openedItem.rarity]} animate-item-reveal`}>
                  <CardContent className="text-center py-8">
                    <h3 className="text-2xl font-bold mb-4 neon-glow">Поздравляем!</h3>
                    <img 
                      src={openedItem.image} 
                      alt={openedItem.name}
                      className="w-32 h-32 object-cover mx-auto rounded-lg mb-4"
                    />
                    <p className={`text-xl font-bold ${rarityColors[openedItem.rarity]}`}>
                      {openedItem.name}
                    </p>
                    <Badge className={`mt-2 ${rarityColors[openedItem.rarity]}`}>
                      {openedItem.rarity.toUpperCase()}
                    </Badge>
                    <p className="text-neon-green text-lg mt-2">${openedItem.price}</p>
                    <Button 
                      onClick={() => setOpenedItem(null)}
                      className="mt-4 bg-neon-cyan text-black hover:bg-neon-cyan/80"
                    >
                      Продолжить
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="contracts">
            <div className="text-center py-16">
              <Icon name="FileText" size={64} className="mx-auto mb-4 text-neon-cyan" />
              <h2 className="text-2xl font-bold mb-4 text-neon-cyan">Контракты</h2>
              <p className="text-gray-400 mb-8">Обменивай несколько скинов на один более редкий!</p>
              <Button onClick={upgradeItems} className="bg-neon-cyan text-black hover:bg-neon-cyan/80">
                Скоро доступно
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="upgrade">
            <div className="text-center py-16">
              <Icon name="TrendingUp" size={64} className="mx-auto mb-4 text-neon-purple" />
              <h2 className="text-2xl font-bold mb-4 text-neon-purple">Апгрейд</h2>
              <p className="text-gray-400 mb-8">Улучшай свои скины с шансом на более редкие варианты!</p>
              <Button onClick={upgradeItems} className="bg-neon-purple text-white hover:bg-neon-purple/80">
                Скоро доступно
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-montserrat text-neon-green neon-glow">
                Твой инвентарь ({inventory.length} предметов)
              </h2>
              
              {inventory.length === 0 ? (
                <div className="text-center py-16">
                  <Icon name="Package2" size={64} className="mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400">Инвентарь пуст. Открой кейсы, чтобы получить скины!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {inventory.map((item, index) => (
                    <Card key={`${item.id}-${index}`} className={`bg-gaming-card border ${rarityColors[item.rarity]} ${rarityGlow[item.rarity]}`}>
                      <CardContent className="p-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-24 object-cover rounded mb-2"
                        />
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <Badge className={`text-xs ${rarityColors[item.rarity]}`}>
                          {item.rarity}
                        </Badge>
                        <p className="text-neon-green text-sm mt-1">${item.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;