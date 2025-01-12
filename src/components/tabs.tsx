import { motion } from "motion/react";
import { useState } from "react";

interface Tab {
  content: React.ReactNode
  label: string
}

interface TabsProps {
  className?: string
  defaultTabIndex?: number
  tabs: Tab[]
}

const Tabs: React.FC<TabsProps> = ({
  className = "",
  defaultTabIndex,
  tabs
}) => {
  const [activeTab, setActiveTab] = useState(defaultTabIndex || 0);

  return (
    <div className={className}>
      <div className="flex border-b border-slate-200">
        <div className="flex space-x-0 md:space-x-12">
          {tabs.map((tab, index) => (
            <button
              className={`pb-3 px-3 text-base transition-colors relative ${activeTab === index
                ? "text-slate-900"
                : "text-slate-500 hover:text-slate-700"
                }`}
              key={index}
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`tabpanel-${tab.label}`}
            >
              {tab.label}
              {activeTab === index && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary"
                  layoutId="underline"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-10 flex-grow">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {tabs[activeTab].content}
        </motion.div>
      </div>
    </div>
  );
};

export default Tabs;
