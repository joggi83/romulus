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
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #ffffff;
      }
      
      .pack-selector-grid {
        display: grid;
        grid-template-columns: 2fr 0.5fr 2fr 0.5fr 1fr;
        gap: 20px;
        align-items: center;
      }

      .section-title {
        color: #ffffff;
        font-size: 18px;
        margin-bottom: 16px;
        font-weight: 500;
      }
      
      .pack-card {
        background: #161616;
        border-radius: 8px;
        padding: 24px;
        height: 400px;
        position: relative;
        border: 1px solid #333333;
      }
      
      .pack-header {
        background: #232323;
        color: white;
        padding: 12px;
        border-radius: 4px;
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: 500;
      }
      
      .pack-title {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 20px;
        color: #ffffff;
      }
      
      .pack-features {
        margin-bottom: 20px;
      }
      
      .pack-features li {
        margin-bottom: 12px;
        display: flex;
        align-items: flex-start;
        color: #cccccc;
        font-size: 14px;
      }
      
      .pack-features li:before {
        content: "•";
        margin-right: 8px;
        color: #FF6600;
      }
      
      .pack-price {
        font-size: 28px;
        font-weight: 500;
        color: #FF6600;
      }
      
      .pack-price-period {
        font-size: 16px;
        color: #cccccc;
      }
      
      .pack-promo {
        font-size: 14px;
        margin-top: 8px;
        color: #cccccc;
      }
      
      .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: #232323;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        transition: background-color 0.3s;
      }

      .nav-button:hover {
        background: #FF6600;
      }
      
      .nav-button-left {
        left: -20px;
      }
      
      .nav-button-right {
        right: -20px;
      }
      
      .operator {
        font-size: 32px;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
      }
      
      .total-card {
        background: #161616;
        border-radius: 8px;
        padding: 24px;
        border: 1px solid #333333;
      }
      
      .total-header {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 20px;
        color: #ffffff;
      }
      
      .total-discount {
        font-size: 28px;
        font-weight: 500;
        color: #FF6600;
        margin-bottom: 20px;
      }
      
      .total-price {
        font-size: 28px;
        font-weight: 500;
        color: #FF6600;
      }
      
      .total-details {
        font-size: 14px;
        margin-top: 8px;
        color: #cccccc;
      }

      .total-label {
        font-weight: 500;
        margin-bottom: 8px;
        color: #ffffff;
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

  // Rest of your component code remains the same
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
        React.createElement("h4", { className: "section-title" },
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
        React.createElement("h4", { className: "section-title" },
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
          React.createElement("div", { className: "total-label" },
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
