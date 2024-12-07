'use client';

import Image from 'next/image';
import ProgressBar from '../animations/ProgressBar';
import FadeIn from '../animations/FadeIn';
import StaggerChildren from '../animations/StaggerChildren';
import { FaRecycle, FaSeedling, FaTrash, FaArrowRight, FaQuoteLeft, FaLaptop, FaUtensils } from 'react-icons/fa';
import Link from "next/link";

export default function CampaignClient() {
  const campaigns = [
    {
      title: "Campus Recycling Program",
      description: "Implementation of comprehensive recycling stations across campus with clear sorting guidelines. Join us in making our campus waste-free!",
      progress: 75,
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3",
      icon: <FaRecycle className="w-8 h-8 text-primary" />,
      goals: ["Install 50 recycling stations", "Reduce waste by 30%", "Train 100 student volunteers"]
    },
    {
      title: "Smart Canteen Initiative",
      description: "Introducing a self-service system in our campus canteen where students clean up after meals. This initiative promotes responsibility, cleanliness, and reduces the need for additional cleaning staff.",
      progress: 30,
      image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3",
      icon: <FaUtensils className="w-8 h-8 text-primary" />,
      goals: ["Install Self-Service Stations", "Implement Waste Sorting System", "Reduce Food Waste by 40%"]
    },
    {
      title: "Digital Transformation Initiative",
      description: "Transform UPJ into a paperless campus through digital solutions. We're implementing e-documents, digital submissions, and smart learning platforms to reduce paper waste and increase efficiency.",
      progress: 45,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3",
      icon: <FaLaptop className="w-8 h-8 text-primary" />,
      goals: ["100% Digital Assignment Submissions", "E-library Implementation", "Paperless Administrative Processes"]
    },
    {
      title: "Zero Waste Challenge",
      description: "Join our campus-wide initiative to reduce waste and promote sustainable practices.",
      progress: 10,
      image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-4.0.3",
      icon: <FaTrash className="w-8 h-8 text-primary" />,
      goals: ["500 participants", "Reduce single-use plastics", "Weekly waste audits"]
    }
  ];

  const testimonials = [
    {
      name: "Alan Alkalifa",
      role: "College Student",
      quote: "Being part of Clean4Earth has shown me how small actions can create big impacts. The community support and engagement make it truly special.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
    },
    {
      name: "Cut Zhiffa Asharlyn",
      role: "College Student",
      quote: "The campus recycling program has transformed how our department handles waste. It's inspiring to see students taking the lead in sustainability.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3"
    },
    {
      name: "Alisha Sumahesa",
      role: "College Student",
      quote: "Clean4Earth has opened my eyes to the importance of environmental conservation. It's amazing to see how our collective efforts make a difference.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3"
    },
    {
      name: "Naufal Al Ghifary",
      role: "College Student",
      quote: "Joining Clean4Earth was one of the best decisions I made in college. Together, we're creating a more sustainable future for our campus and beyond.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3"
    }
  ];

  return (
    <div className="space-y-24">
      {/* Campaign Overview */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Current Initiatives</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">
                Our campaigns focus on creating lasting change through practical
                solutions and community engagement.
              </p>
            </div>
          </FadeIn>

          <StaggerChildren className="space-y-24">
            {campaigns.map((campaign, index) => (
              <div
                key={index}
                className="group"
              >
                <div className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}>
                  <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      {campaign.icon}
                      <h3 className="text-2xl sm:text-3xl font-bold">{campaign.title}</h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">{campaign.description}</p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600">Target Progress</span>
                        </div>
                      </div>
                      <ProgressBar
                        percentage={campaign.progress}
                        label={`${campaign.progress}% Complete`}
                      />
                    </div>
                    <ul className="space-y-3">
                      {campaign.goals.map((goal, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                          <FaArrowRight className="text-primary w-4 h-4" />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/events" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all">
                      Join our Events <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50">
        <div className="container px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Our Founder</h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <FaQuoteLeft className="text-primary/20 w-12 h-12 mb-6" />
                <p className="text-gray-600 text-lg mb-8 leading-relaxed italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </div>
  );
}
