import React from "react";
import { BarChart, Link2, Settings } from "react-feather";
import { IoGitMerge } from "react-icons/io5";

const modifySVG = (WrappedComponent) => {
  const SVGH = (props) => {
    // Modify props, add styles, or inject new props
    const enhanceProps = {
      ...props,
      className: "mx-auto mb-6 w-12 h-12",
    };
    return <WrappedComponent {...enhanceProps} />;
  };
  return SVGH;
};

const OfferSection = () => {
  const list = [
    {
      gradiant: "#FAFDD1",
      color: "blue",
      svg: Link2,
      header: "URL Shortner",
      message: "Shorten URLs for easy haring and tracking",
    },
    {
      gradiant: "#DCF3EF",
      color: "pink",
      svg: BarChart,
      header: "Analytics",
      message: "Track your shortened links with detailed analytics.",
    },
    {
      gradiant: "#EBD5F3",
      color: "gray",
      svg: Settings,
      header: "Custom URLs",
      message: "Create custom short links for your branding.",
    },
  ];

  return (
    <div>
      {" "}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {list.map((item, index) => {
              const EnhancedSVG = modifySVG(item.svg);
              return (
                <>
                  <div
                    key={index}
                    className={`bg-gradient-to-t from-[${item.gradiant}] to-white p-6 rounded-lg shadow-lg`}
                  >
                    <div>
                      <div style={{ color: `${item.color}` }}>
                        <EnhancedSVG className={`text-${item.color}`} />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4">
                        {item.header}
                      </h3>
                      <p className="text-lg text-gray-600">{item.message}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OfferSection;
