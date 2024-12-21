const PackSelector = () => {
  const [selectedInternet, setSelectedInternet] = React.useState(0);
  const [selectedMobile, setSelectedMobile] = React.useState(0);

  // Add scoped styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .pack-selector-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        font-family: inherit;
      }
      
      .pack-selector-grid {
        display: grid;
        grid-template-columns: 2fr 0.5fr 2fr 0.5fr 1fr;
        gap: 20px;
        align-items: center;
      }
      
      .pack-card {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 24px;
        height: 400px;
        position: relative;
      }
      
      .pack-header {
        background: black;
        color: white;
        padding: 8px;
        border-radius: 4px;
        margin-bottom: 16px;
      }
      
      .pack-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 16px;
      }
      
      .pack-features {
        margin-bottom: 16px;
      }
      
      .pack-features li {
        margin-bottom: 8px;
        display: flex;
        align-items: flex-start;
      }
      
      .pack-features li:before {
        content: "•";
        margin-right: 8px;
      }
      
      .pack-price {
        font-size: 24px;
        font-weight: bold;
      }
      
      .pack-price-period {
        font-size: 14px;
      }
      
      .pack-promo {
        font-size: 14px;
        margin-top: 4px;
      }
      
      .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .nav-button-left {
        left: -20px;
      }
      
      .nav-button-right {
        right: -20px;
      }
      
      .operator {
        font-size: 32px;
        font-weight: bold;
        text-align: center;
      }
      
      .total-card {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 24px;
      }
      
      .total-header {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 16px;
      }
      
      .total-discount {
        font-size: 24px;
        font-weight: bold;
        color: #F16E00;
        margin-bottom: 16px;
      }
      
      .total-price {
        font-size: 24px;
        font-weight: bold;
      }
      
      .total-details {
        font-size: 14px;
        margin-top: 4px;
      }
      
      @media (max-width: 768px) {
        .pack-selector-grid {
          grid-template-columns: 1fr;
        }
        
        .operator {
          margin: 20px 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
    React.createElement("div", { className: "pack-card" },
      React.createElement("div", { className: "pack-header" },
        isInternet ? "L'essentiel de la Fibre" : "Le mobile à prix attractif"
      ),
      React.createElement("div", { className: "pack-title" }, plan.name),
      React.createElement("ul", { className: "pack-features" },
        plan.features.map((feature, index) =>
          React.createElement("li", { key: index }, feature)
        )
      ),
      React.createElement("div", { className: "pack-price" },
        `${plan.price.toFixed(2)}€`,
        React.createElement("span", { className: "pack-price-period" }, "/mois")
      ),
      isInternet && React.createElement("div", { className: "pack-promo" },
        `pendant ${plan.promoLength} mois, puis ${plan.regularPrice.toFixed(2)}€/mois`
      )
    )
  );

  return React.createElement("div", { className: "pack-selector-container" },
    React.createElement("div", { className: "pack-selector-grid" },
      React.createElement("div", { style: { position: 'relative' } },
        React.createElement("h4", { style: { marginBottom: '16px', fontWeight: 'bold' } },
          "Choisissez votre abonnement internet"
        ),
        React.createElement(PlanCard, { plan: selectedInternetPlan, isInternet: true }),
        React.createElement("button", {
          className: "nav-button nav-button-left",
          onClick: () => setSelectedInternet(prev => prev > 0 ? prev - 1 : internetPlans.length - 1)
        }, "←"),
        React.createElement("button", {
          className: "nav-button nav-button-right",
          onClick: () => setSelectedInternet(prev => (prev + 1) % internetPlans.length)
        }, "→")
      ),
      React.createElement("div", { className: "operator" }, "+"),
      React.createElement("div", { style: { position: 'relative' } },
        React.createElement("h4", { style: { marginBottom: '16px', fontWeight: 'bold' } },
          "Choisissez votre forfait mobile"
        ),
        React.createElement(PlanCard, { plan: selectedMobilePlan, isInternet: false }),
        React.createElement("button", {
          className: "nav-button nav-button-left",
          onClick: () => setSelectedMobile(prev => prev > 0 ? prev - 1 : mobilePlans.length - 1)
        }, "←"),
        React.createElement("button", {
          className: "nav-button nav-button-right",
          onClick: () => setSelectedMobile(prev => (prev + 1) % mobilePlans.length)
        }, "→")
      ),
      React.createElement("div", { className: "operator" }, "="),
      React.createElement("div", { className: "total-card" },
        React.createElement("div", { className: "total-header" },
          "VOTRE AVANTAGE 100% ORANGE"
        ),
        React.createElement("div", { className: "total-discount" },
          `-${selectedMobilePlan.discount}€/mois`
        ),
        React.createElement("div", null,
          React.createElement("div", { style: { fontWeight: 'bold', marginBottom: '8px' } },
            "Soit au total :"
          ),
          React.createElement("div", { className: "total-price" },
            `${totalPrice.toFixed(2)}€/mois`
          ),
          React.createElement("div", { className: "total-details" },
            `pendant ${selectedInternetPlan.promoLength} mois,`,
            React.createElement("br"),
            `puis ${regularTotalPrice.toFixed(2)}€/mois`
          )
        )
      )
    )
  );
};
