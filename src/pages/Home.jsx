import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Star, ChefHat, Utensils, Heart, Menu as MenuIcon } from 'lucide-react';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-95 backdrop-blur-sm shadow-lg border-b border-yellow-500">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors">
            LE MISTRAL
          </Link>
          <div className="flex gap-6">
            <Link to="/" className="text-gray-300 hover:text-yellow-500 transition-colors font-semibold">
              Accueil
            </Link>
            <Link to="/menu" className="text-gray-300 hover:text-yellow-500 transition-colors font-semibold">
              Menu
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-yellow-500 transition-colors font-semibold">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated background */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-16 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="bg-yellow-500 p-4 rounded-full shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <ChefHat size={64} className="text-gray-900" />
            </div>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-bold text-yellow-500 mb-4 tracking-wider" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
            LE MISTRAL
          </h1>
          
          <p className="text-2xl md:text-3xl text-yellow-400 mb-6 font-serif italic">
            Restaurant Traditionnel
          </p>
          
          <div className="bg-yellow-500 text-gray-900 inline-block px-8 py-4 rounded-full text-xl font-bold mb-8 shadow-2xl transform hover:scale-105 transition-transform">
            ✓ 100% HALAL ✓
          </div>
          
          <div className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            <p className="mb-2 font-semibold">Découvrez l'authenticité</p>
            <p className="mb-2">de la cuisine traditionnelle</p>
            <p className="mb-2">Tous nos plats sont préparés</p>
            <p className="mb-4">avec amour et passion</p>
            <p className="text-yellow-500 text-2xl font-bold">FAIT MAISON</p>
          </div>
          
          <Link to="/menu" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 px-12 rounded-full text-xl shadow-2xl transform hover:scale-110 transition-all duration-300 mb-12">
            Voir la Carte
          </Link>
          
          {/* Social and Contact */}
          <div className="space-y-4 text-gray-300">
            <div className="flex items-center justify-center gap-2 text-lg">
              <div className="bg-gray-800 px-6 py-3 rounded-lg">
                📸 Suivez-nous sur <span className="text-yellow-500 font-bold">Snapchat</span>
              </div>
            </div>
            <p className="text-yellow-400 font-semibold">@chikhou242850</p>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-yellow-500 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Star, title: "SUR PLACE", desc: "Ambiance chaleureuse et conviviale" },
            { icon: Utensils, title: "À EMPORTER", desc: "Profitez de nos plats chez vous" },
            { icon: Clock, title: "Livraison Possible", desc: "Service rapide et efficace" }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 hover:bg-gray-750 border-2 border-transparent hover:border-yellow-500 cursor-pointer"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="mb-4 flex justify-center">
                <feature.icon 
                  size={48} 
                  className={`${hoveredCard === idx ? 'text-yellow-500' : 'text-yellow-400'} transition-colors`}
                />
              </div>
              <h3 className="text-yellow-500 text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
        
        {/* Contact Section */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Nous Contacter</h2>
          
          <div className="space-y-6 text-gray-900">
            <div className="flex items-center justify-center gap-3 text-2xl font-bold hover:scale-110 transition-transform">
              <Phone size={32} />
              <a href="tel:0975629201" className="hover:text-white transition-colors">
                09 75 62 92 01
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-xl hover:scale-110 transition-transform">
              <MapPin size={28} />
              <span>6 Rte de Lodève, 34080 Montpellier</span>
            </div>
          </div>
          
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Link to="/menu" className="bg-gray-900 hover:bg-gray-800 text-yellow-500 font-bold py-4 px-10 rounded-full text-xl shadow-xl transform hover:scale-110 transition-all duration-300">
              Voir le Menu
            </Link>
            <Link to="/contact" className="bg-gray-900 hover:bg-gray-800 text-yellow-500 font-bold py-4 px-10 rounded-full text-xl shadow-xl transform hover:scale-110 transition-all duration-300">
              Réserver une Table
            </Link>
          </div>
        </div>
        
        {/* Footer decoration */}
        <div className="mt-16 text-center">
          <Heart className="inline text-yellow-500 animate-pulse" size={32} />
          <p className="text-gray-400 mt-4 text-lg">
            Fait avec amour et passion depuis Montpellier
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}