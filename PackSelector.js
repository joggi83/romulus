const PackSelector = () => {
  const [selectedInternet, setSelectedInternet] = React.useState(0);
  const [selectedMobile, setSelectedMobile] = React.useState(0);

  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .pack-selector-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 40px 20px;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #ffffff;
      }
      
      .pack-selector-grid {
        display: grid;
        grid-template-columns: 2fr 0.8fr 2fr 0.8fr 1.2fr;
        gap: 30px;
        align-items: center;
      }

      .section-title {
        color: #ffffff;
        font-size: 28px;
        margin-bottom: 24px;
        font-weight: 700;
        text-align: center;
      }
      
      .pack-card {
        background: #161616;
        border-radius: 16px;
        padding: 32px;
        height: 460px;
        position: relative;
        border: 1px solid #333333;
        display: flex;
        flex-direction: column;
      }
      
      .pack-header {
        background: #FFCD0B;
        color: black;
        padding: 12px 20px;
        border-radius: 8px;
        margin-bottom: 24px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
      }
      
      .pack-title {
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 24px;
        color: #ffffff;
        text-align: center;
      }
      
      .pack-features {
        margin-bottom: 32px;
      }
      
      .pack-features li {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        color: #cccccc;
        font-size: 16px;
      }
      
      .pack-features li:before {
        content: "•";
        margin-right: 12px;
        color: #FF6600;
        font-size: 20px;
      }
      
      .pack-price {
        font-size: 36px;
        font-weight: 700;
        color: #FF6600;
        text-align: center;
        margin-top: auto;
      }
      
      .pack-price-period {
        font-size: 18px;
        color: #cccccc;
        font-weight: normal;
      }
      
      .pack-promo {
        font-size: 16px;
        margin-top: 12px;
        color: #cccccc;
        text-align: center;
      }
      
      .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: #232323;
        border: none;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        transition: background-color 0.3s;
        font-size: 24px;
      }

      .nav-button:hover {
        background: #FF6600;
      }
      
      .nav-button-left {
        left: -24px;
      }
      
      .nav-button-right {
        right: -24px;
      }
      
      .operator {
        font-size: 48px;
        font-weight: 700;
        text-align: center;
        color: #ffffff;
      }
      
      .total-card {
        background: #161616;
        border-radius: 16px;
        padding: 32px;
        border: 1px solid #333333;
      }
      
      .total-header {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 24px;
        color: #ffffff;
        text-align: center;
      }
      
      .total-discount {
        font-size: 36px;
        font-weight: 700;
        color: #FF6600;
        margin-bottom: 24px;
        text-align: center;
      }
      
      .total-price {
        font-size: 36px;
        font-weight: 700;
        color: #FF6600;
        text-align: center;
      }
      
      .total-details {
        font-size: 16px;
        margin-top: 12px;
        color: #cccccc;
        text-align: center;
      }

      .total-label {
        font-weight: 700;
        margin-bottom: 12px;
        color: #ffffff;
        text-align: center;
        font-size: 18px;
      }
      
      @media (max-width: 768px) {
        .pack-selector-grid {
          grid-template-columns: 1fr;
        }
        
        .operator {
          margin: 20px 0;
        }

        .pack-card {
          height: auto;
          min-height: 460px;
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
