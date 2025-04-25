'use client';


import dynamic from 'next/dynamic';
import supabase from '@/helpers/supabaseClient';
import { useState, useEffect, useContext } from 'react';
import { Header, Footer } from "@/components/ui";
import { translationsAboutUs } from '@/lang/translations';
import {
  FaSun,
  FaMoon,
  FaCoins,
  FaBuilding,
  FaTrophy,
  FaMapMarkedAlt,
  FaBoxOpen,
  FaChartBar,
  FaDragon,
  FaUsers,
  FaHeart,
  FaLightbulb,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';


const Map = dynamic(() => import('@/components/Map'), { ssr: false });


export default function AboutUs() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setUserRole, language, changeLanguage } = useContext(UserContext);
  const translation = translationsAboutUs[language] || translationsAboutUs['es'];
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, [setIsLoggedIn]);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setIsDarkMode(savedTheme === 'dark');
 
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
 
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
 
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);
 
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
     
      if (newMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }


      return newMode;
    });
  };


  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
     
      if (error) {
        console.error("Error al cerrar sesión:", error.message);
        return;
      }
     
      setIsLoggedIn(false);
      setUserRole(null);
      localStorage.removeItem('supabase.auth.token');
      router.push('/');
    } catch (err) {
      console.error("Error en el proceso de cierre de sesión:", err);
    }
  };


  const toggleCardExpand = (cardId) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
  };


  const features = [
    {
      id: 'currency',
      icon: <FaCoins className="text-4xl" />,
      title: translation.currency,
      details: translation.currency_details,
      color: "from-yellow-400 to-yellow-600"
    },
    {
      id: 'building',
      icon: <FaBuilding className="text-4xl" />,
      title: translation.building_construction,
      details: translation.building_details,
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 'competitions',
      icon: <FaTrophy className="text-4xl" />,
      title: translation.weekly_competitions,
      details: translation.weekly_competitions_details,
      color: "from-purple-400 to-purple-600"
    },
    {
      id: 'unlocking',
      icon: <FaMapMarkedAlt className="text-4xl" />,
      title: translation.area_unlocking,
      details: [translation.area_unlocking_details],
      color: "from-green-400 to-green-600"
    },
    {
      id: 'luckyboxes',
      icon: <FaBoxOpen className="text-4xl" />,
      title: translation.lucky_boxes,
      details: translation.lucky_boxes_details,
      color: "from-red-400 to-red-600"
    },
    {
      id: 'stats',
      icon: <FaChartBar className="text-4xl" />,
      title: translation.global_stats,
      details: translation.global_stats_details,
      color: "from-indigo-400 to-indigo-600"
    },
    {
      id: 'raids',
      icon: <FaDragon className="text-4xl" />,
      title: translation.raids,
      details: translation.raids_details,
      color: "from-orange-400 to-orange-600"
    }
  ];


  const teamMembers = [
    {
      icon: <img src="/assets/img/about_us/Dissenyador.jpg" alt="Designer" className="w-full h-full object-cover rounded-full" />,
      role: translation.developers || "Developers",
      description: translation.developers_description || "Technical team dedicated to creating the best gaming experience",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <img src="/assets/img/about_us/Developer.webp" alt="Designer" className="w-full h-full object-cover rounded-full" />,
      role: translation.designers || "Designers",
      description: translation.designers_description || "Creatives who bring the game world to life",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: <img src="/assets/img/about_us/Comunity.jpg" alt="Designer" className="w-full h-full object-cover rounded-full" />,
      role: translation.community || "Community",
      description: translation.community_description || "Our players, the heart of our project",
      color: "from-green-400 to-teal-500"
    }
  ];


  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 bg-gray-50">
      <Header
        language={language}
        changeLanguage={changeLanguage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        scrolled={isScrolled}
      />
     
      <main className="flex-grow overflow-y-auto px-4 pt-32 pb-16 text-gray-800 dark:text-gray-200">
        {/* Hero Section with animated gradient */}
        <section className="max-w-7xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 rounded-xl blur-3xl opacity-10 dark:opacity-20 -z-10"></div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {translation.title}
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              {translation.description}
            </p>
          </motion.div>
        </section>


        {/* Key Features Section */}
        <section className="max-w-7xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {translation.key_elements || "🌟 Key Elements and Features"}
          </h2>
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl opacity-10 dark:opacity-20 -z-10`}></div>
                <div className="h-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleCardExpand(feature.id)}
                  >
                    <div className={`p-3 rounded-full bg-gradient-to-br ${feature.color} mr-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold flex-grow">{feature.title}</h3>
                    {expandedCardId === feature.id ? (
                      <FaChevronUp className="text-gray-500" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )}
                  </div>
                 


                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedCardId === feature.id ? 'auto' : 0,
                      opacity: expandedCardId === feature.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {Array.isArray(feature.details) ? (
                        <ul className="space-y-3 pl-2">
                          {feature.details.map((detail, i) => (
                            <li key={i} className="flex items-start">
                              <span className={`text-${feature.color.split(' ')[1]} mr-2 mt-1`}>•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>{feature.details}</p>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* Add Map Component */}
        <section className="max-w-7xl mx-auto mb-24 mt-16">
          <Map />
        </section>


        {/* Team Section */}
        <section className="max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {translation.our_team || "Our Team"}
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              {translation.team_description || "Meet the passionate team behind this project"}
            </p>
          </div>
         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${member.color} p-1 mb-4`}>
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    {member.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-center">{member.role}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </section>


        {/* Experience Summary */}
        <section className="max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 p-0.5 rounded-xl"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-4">
                {translation.summary_experience || "📢 Summary of the experience"}
              </h2>
              <p className="text-lg">
                {translation.summary_experience_details}
              </p>
            </div>
          </motion.div>
        </section>
      </main>


      <Footer />
    </div>
  );
}
