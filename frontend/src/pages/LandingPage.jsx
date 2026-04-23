import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Users, Shield, Zap, TrendingUp, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary-900/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-1.5 mb-8 rounded-full bg-slate-800 border border-slate-700 text-primary-400 text-sm font-medium animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
            v1.0.0 Now Live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
            Managing Students <br /> 
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Simplified & Secured
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-12 leading-relaxed">
            A comprehensive, high-performance platform for academic institutions to track student records, 
            monitor progress, and manage administrative tasks with ease.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg flex items-center gap-2">
                Get Started for Free <ChevronRight size={20} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg border-slate-700 hover:bg-slate-800">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Everything you need to run your institution effectively, built with security and speed in mind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Users size={24}/>} 
              title="Student Records" 
              desc="Comprehensive CRUD operations for student profiles with real-time updates."
            />
            <FeatureCard 
              icon={<Shield size={24}/>} 
              title="Secure Auth" 
              desc="JWT-based authentication and BCrypt password encryption for data privacy."
            />
            <FeatureCard 
              icon={<Zap size={24}/>} 
              title="Blazing Fast" 
              desc="Optimized backend with Express and MongoDB for millisecond responses."
            />
            <FeatureCard 
              icon={<TrendingUp size={24}/>} 
              title="Analytics" 
              desc="Monitor student enrollment patterns and institutional growth through data."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-primary-500/50 transition-all duration-300 group">
    <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-6 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
