import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PackSelector = () => {
  const [selectedInternet, setSelectedInternet] = useState(0);
  const [selectedMobile, setSelectedMobile] = useState(0);

  const internetPlans = [
    {
      name: "Livebox Découverte Fibre",
      price: 24.90,
      regularPrice: 39.90,
      promoLength: 6,
      features: ["Débit jusqu'à 2Gbs", "Livebox 5", "Répéteur Wifi 6 offert 12 mois", "Appels illimités"]
    },
    {
      name: "Livebox Fibre",
      price: 29.90,
      regularPrice: 54.90,
      promoLength: 6,
      features: ["Débit jusqu'à 2Gbs", "Livebox 6 (Wifi 6E)", "Répéteur Wifi 6 mis à disposition", "90 chaînes TV", "Cybersecure"]
    },
    {
      name: "Livebox Fibre Plus",
      price: 38.90,
      regularPrice: 63.90,
      promoLength: 6,
      features: ["Débit XGSPON jusqu'à 5Gbs", "Livebox 7 (Wifi 6E)", "Répéteur Wifi 6 mis à disposition", "2 décodeurs TV", "Cybersecure"]
    }
  ];

  const mobilePlans = [
    {
      name: "Forfait 1Go 5G",
      price: 10,
      discount: 2,
      features: ["Appels illimités", "SMS/MMS illimités", "1Go d'internet"]
    },
    {
      name: "Forfait 5Go 5G",
      price: 19.99,
      discount: 2,
      features: ["Appels illimités", "SMS/MMS illimités", "5Go d'internet"]
    },
    {
      name: "Forfait 30Go 5G",
      price: 26.99,
      discount: 5,
      features: ["Appels illimités", "SMS/MMS illimités", "30Go d'internet"]
    }
  ];

  const selectedInternetPlan = internetPlans[selectedInternet];
  const selectedMobilePlan = mobilePlans[selectedMobile];
  
  const totalPrice = selectedInternetPlan.price + selectedMobilePlan.price - selectedMobilePlan.discount;
  const regularTotalPrice = selectedInternetPlan.regularPrice + selectedMobilePlan.price - selectedMobilePlan.discount;

  const PlanCard = ({ plan, isInternet }) => (
    <div className="bg-white rounded-lg shadow-md p-6 h-96">
      <div className="bg-black text-white p-2 rounded mb-4">
        <h4 className="text-sm font-bold">{isInternet ? "L'essentiel de la Fibre" : "Le mobile à prix attractif"}</h4>
      </div>
      
      <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
      
      <ul className="mb-4 text-sm space-y-2">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2">•</span>
            {feature}
          </li>
        ))}
      </ul>
      
      <div className="mt-auto">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{plan.price.toFixed(2)}€</span>
          <span className="text-sm ml-1">/mois</span>
        </div>
        {isInternet && (
          <p className="text-sm mt-1">
            pendant {plan.promoLength} mois, puis {plan.regularPrice.toFixed(2)}€/mois
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
        {/* Internet Plans */}
        <div className="md:col-span-2">
          <h4 className="text-lg font-bold mb-4">Choisissez votre abonnement internet</h4>
          <div className="relative">
            <PlanCard plan={selectedInternetPlan} isInternet={true} />
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button 
                onClick={() => setSelectedInternet((prev) => prev > 0 ? prev - 1 : internetPlans.length - 1)}
                className="bg-white shadow-md rounded-full p-2 -ml-3"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button 
                onClick={() => setSelectedInternet((prev) => (prev + 1) % internetPlans.length)}
                className="bg-white shadow-md rounded-full p-2 -mr-3"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Plus Sign */}
        <div className="md:col-span-1 flex justify-center items-center text-4xl font-bold">
          +
        </div>

        {/* Mobile Plans */}
        <div className="md:col-span-2">
          <h4 className="text-lg font-bold mb-4">Choisissez votre forfait mobile</h4>
          <div className="relative">
            <PlanCard plan={selectedMobilePlan} isInternet={false} />
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button 
                onClick={() => setSelectedMobile((prev) => prev > 0 ? prev - 1 : mobilePlans.length - 1)}
                className="bg-white shadow-md rounded-full p-2 -ml-3"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button 
                onClick={() => setSelectedMobile((prev) => (prev + 1) % mobilePlans.length)}
                className="bg-white shadow-md rounded-full p-2 -mr-3"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Equals Sign */}
        <div className="md:col-span-1 flex justify-center items-center text-4xl font-bold">
          =
        </div>

        {/* Total */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-bold text-lg mb-4">VOTRE AVANTAGE 100% ORANGE</h4>
            <div className="text-3xl font-bold text-orange-500 mb-4">
              -{selectedMobilePlan.discount}€<span className="text-lg">/mois</span>
            </div>
            <div>
              <h4 className="font-bold mb-2">Soit au total :</h4>
              <div className="text-3xl font-bold">
                {totalPrice.toFixed(2)}€<span className="text-sm">/mois</span>
              </div>
              <p className="text-sm mt-1">
                pendant {selectedInternetPlan.promoLength} mois,
                <br />puis {regularTotalPrice.toFixed(2)}€/mois
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackSelector;
