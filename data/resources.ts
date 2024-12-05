export interface Resource {
  title: string;
  description: string;
  image: string;
  category: string;
  type: string;
  readTime: string;
  author: string;
  authorRole?: string;
  authorImage?: string;
  date: string;
  content: string;
  slug: string;
  tags: string[];
  views?: number;
  likes?: number;
  estimatedImpact?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  relatedLinks?: {
    title: string;
    url: string;
  }[];
}

export const resources: Resource[] = [
  {
    title: "Sustainable Living Guide",
    description: "Comprehensive guide for adopting eco-friendly practices in daily life, focusing on practical steps anyone can take to reduce their environmental impact.",
    image: "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?ixlib=rb-4.0.3",
    category: "Lifestyle",
    type: "Guide",
    readTime: "8 min read",
    author: "Sarah Johnson",
    authorRole: "Environmental Specialist",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3",
    date: "October 15, 2023",
    slug: "sustainable-living-guide",
    tags: ["Sustainability", "Eco-friendly", "Lifestyle", "Green Living"],
    views: 1250,
    likes: 342,
    difficulty: "Beginner",
    estimatedImpact: "Reduce carbon footprint by ~20%",
    relatedLinks: [
      {
        title: "EPA Sustainable Living Resources",
        url: "https://www.epa.gov/environmental-topics/greener-living"
      },
      {
        title: "Energy Saving Tips",
        url: "https://www.energy.gov/energysaver/energy-saver"
      }
    ],
    content: `
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">Introduction to Sustainable Living</h2>
          <p class="mb-4">Sustainable living is about making conscious choices that reduce our environmental impact while creating a better future for generations to come. It's not just about grand gestures – it's about the small, daily decisions that add up to make a significant difference.</p>
          <div class="bg-primary/5 p-6 rounded-lg mb-6">
            <h3 class="font-semibold mb-3">Quick Impact Facts</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Switching to LED bulbs can save up to 75% on lighting energy</li>
              <li>A reusable water bottle can prevent 156 plastic bottles from landfills yearly</li>
              <li>Proper recycling can reduce your carbon footprint by up to 2.5 tons per year</li>
            </ul>
          </div>
          <blockquote class="border-l-4 border-primary pl-4 italic my-6">
            "The greatest threat to our planet is the belief that someone else will save it." - Robert Swan
          </blockquote>
        </div>
        
        <div>
          <h2 class="text-2xl font-bold mb-4">Key Areas of Focus</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-primary/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-3">Energy Conservation</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Switch to LED lighting</li>
                <li>Use energy-efficient appliances</li>
                <li>Implement smart home solutions</li>
                <li>Utilize natural lighting</li>
              </ul>
            </div>
            <div class="bg-primary/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-3">Water Management</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Install water-saving fixtures</li>
                <li>Harvest rainwater</li>
                <li>Fix leaks promptly</li>
                <li>Choose drought-resistant plants</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Getting Started Today</h2>
          <div class="bg-primary/5 p-6 rounded-lg">
            <h3 class="font-semibold mb-3">Simple First Steps</h3>
            <div class="grid md:grid-cols-3 gap-4">
              <div>
                <h4 class="font-semibold text-primary mb-2">Morning</h4>
                <ul class="list-disc list-inside space-y-1 text-sm">
                  <li>Take shorter showers</li>
                  <li>Use a reusable coffee cup</li>
                  <li>Walk or bike when possible</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-primary mb-2">Afternoon</h4>
                <ul class="list-disc list-inside space-y-1 text-sm">
                  <li>Use natural light</li>
                  <li>Pack waste-free lunch</li>
                  <li>Use reusable water bottle</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-primary mb-2">Evening</h4>
                <ul class="list-disc list-inside space-y-1 text-sm">
                  <li>Turn off unused lights</li>
                  <li>Unplug idle electronics</li>
                  <li>Plan tomorrow's eco-actions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    title: "Recycling 101",
    description: "Learn the basics of proper recycling and waste management.",
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-4.0.3",
    category: "Environment",
    type: "Educational",
    readTime: "6 min read",
    author: "Emily Chen",
    authorRole: "Environmental Educator",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3",
    date: "September 20, 2023",
    slug: "recycling-101",
    tags: ["Recycling", "Waste Management", "Sustainability"],
    views: 900,
    likes: 210,
    difficulty: "Beginner",
    estimatedImpact: "Reduce waste by ~30%",
    relatedLinks: [
      {
        title: "EPA Recycling Resources",
        url: "https://www.epa.gov/recycle"
      },
      {
        title: "Recycling Tips",
        url: "https://www.recyclingtips.org/"
      }
    ],
    content: `
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">Understanding Recycling</h2>
          <p class="mb-4">Recycling is a crucial process that helps reduce waste and conserve natural resources. By recycling, we can reduce the amount of waste sent to landfills and decrease greenhouse gas emissions.</p>
          <div class="bg-primary/5 p-6 rounded-lg mb-6">
            <h3 class="font-semibold mb-3">Recycling Basics</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Paper and cardboard</li>
              <li>Plastic bottles and containers</li>
              <li>Glass bottles and jars</li>
              <li>Metal cans</li>
            </ul>
          </div>
          <blockquote class="border-l-4 border-primary pl-4 italic my-6">
            "Recycling is not just about saving the planet, it's about saving ourselves." - Unknown
          </blockquote>
        </div>
        
        <div>
          <h2 class="text-2xl font-bold mb-4">Recycling Guidelines</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-primary/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-3">What Can Be Recycled</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Paper and cardboard</li>
                <li>Plastic bottles and containers</li>
                <li>Glass bottles and jars</li>
                <li>Metal cans</li>
              </ul>
            </div>
            <div class="bg-primary/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-3">What Cannot Be Recycled</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Food waste and liquids</li>
                <li>Plastic bags and wrap</li>
                <li>Styrofoam and ceramics</li>
                <li>Textiles and fabric</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    title: "Energy Conservation Tips",
    description: "Simple ways to reduce energy consumption and save money.",
    image: "https://images.unsplash.com/photo-1473341304170-e3c354a0b15b?ixlib=rb-4.0.3",
    category: "Lifestyle",
    type: "Tips",
    readTime: "5 min read",
    author: "David Lee",
    authorRole: "Energy Efficiency Expert",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3",
    date: "August 10, 2023",
    slug: "energy-conservation-tips",
    tags: ["Energy Efficiency", "Sustainability", "Money Saving"],
    views: 800,
    likes: 180,
    difficulty: "Beginner",
    estimatedImpact: "Reduce energy consumption by ~25%",
    relatedLinks: [
      {
        title: "Energy Efficiency Tips",
        url: "https://www.energy.gov/energysaver/energy-saver"
      },
      {
        title: "Energy Saving Resources",
        url: "https://www.energystar.gov/"
      }
    ],
    content: `
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">Energy Conservation Basics</h2>
          <p class="mb-4">Energy conservation is about using energy efficiently and avoiding unnecessary energy usage. By making a few simple changes, we can reduce our energy consumption and contribute to a more sustainable future.</p>
          <div class="bg-primary/5 p-6 rounded-lg mb-6">
            <h3 class="font-semibold mb-3">Quick Tips</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Use LED bulbs throughout your home</li>
              <li>Install a programmable thermostat</li>
              <li>Seal air leaks around windows and doors</li>
              <li>Unplug electronics when not in use</li>
              <li>Use natural light when possible</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    title: "Water Conservation Guide",
    description: "Practical tips for reducing water usage and protecting this vital resource.",
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-4.0.3",
    category: "Environment",
    type: "Guide",
    readTime: "7 min read",
    author: "Olivia Brown",
    authorRole: "Water Conservation Specialist",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3",
    date: "July 20, 2023",
    slug: "water-conservation-guide",
    tags: ["Water Conservation", "Sustainability", "Environmental Protection"],
    views: 700,
    likes: 150,
    difficulty: "Beginner",
    estimatedImpact: "Reduce water consumption by ~20%",
    relatedLinks: [
      {
        title: "Water Conservation Tips",
        url: "https://www.epa.gov/water-conservation"
      },
      {
        title: "Water Saving Resources",
        url: "https://www.water.org/"
      }
    ],
    content: `
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">Water Conservation Importance</h2>
          <p class="mb-4">Water is a precious resource that requires careful management and conservation. By reducing our water usage, we can help ensure a sustainable future for generations to come.</p>
          <div class="bg-primary/5 p-6 rounded-lg mb-6">
            <h3 class="font-semibold mb-3">Water-Saving Tips</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Fix leaky faucets and pipes</li>
              <li>Install water-efficient fixtures</li>
              <li>Take shorter showers</li>
              <li>Collect rainwater for gardens</li>
              <li>Use drought-resistant plants</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    title: "Zero Waste Living",
    description: "A comprehensive guide to reducing waste and living more sustainably.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3",
    category: "Lifestyle",
    type: "Guide",
    readTime: "10 min read",
    author: "Maya Patel",
    authorRole: "Zero Waste Expert",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3",
    date: "October 1, 2023",
    slug: "zero-waste-living",
    tags: ["Zero Waste", "Sustainability", "Minimalism"],
    views: 600,
    likes: 120,
    difficulty: "Intermediate",
    estimatedImpact: "Reduce waste by ~50%",
    relatedLinks: [
      {
        title: "Zero Waste Resources",
        url: "https://www.zerowaste.org/"
      },
      {
        title: "Minimalism Tips",
        url: "https://www.theminimalists.com/"
      }
    ],
    content: `
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">Getting Started with Zero Waste</h2>
          <p class="mb-4">Zero waste living is about reducing our waste output and making more sustainable choices in our daily lives. It's a journey, not a destination, and every small step counts.</p>
          <div class="bg-primary/5 p-6 rounded-lg mb-6">
            <h3 class="font-semibold mb-3">Basic Principles</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Refuse what you don't need</li>
              <li>Reduce what you do need</li>
              <li>Reuse what you consume</li>
              <li>Recycle what you cannot refuse, reduce, or reuse</li>
              <li>Rot (compost) the rest</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    title: "Sustainable Transportation",
    description: "Explore eco-friendly transportation options and their environmental impact.",
    image: "https://images.unsplash.com/photo-1519003300449-424ad0405076?ixlib=rb-4.0.3",
    category: "Environment",
    type: "Guide",
    readTime: "6 min read",
    author: "James Wilson",
    authorRole: "Sustainable Transportation Expert",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3",
    date: "September 5, 2023",
    slug: "sustainable-transportation",
    tags: ["Sustainable Transportation", "Eco-friendly", "Environmental Protection"],
    views: 500,
    likes: 100,
    difficulty: "Beginner",
    estimatedImpact: "Reduce carbon footprint by ~15%",
    relatedLinks: [
      {
        title: "Sustainable Transportation Resources",
        url: "https://www.epa.gov/smart-growth/sustainable-transportation"
      },
      {
        title: "Eco-friendly Transportation Options",
        url: "https://www.treehugger.com/"
      }
    ],
    content: `
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">Green Transportation Options</h2>
          <p class="mb-4">Transportation is one of the largest sources of greenhouse gas emissions. By choosing sustainable transportation options, we can significantly reduce our carbon footprint.</p>
          <div class="bg-primary/5 p-6 rounded-lg mb-6">
            <h3 class="font-semibold mb-3">Sustainable Options</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Walking and cycling for short distances</li>
              <li>Using public transportation</li>
              <li>Carpooling with colleagues</li>
              <li>Electric vehicles</li>
              <li>Remote work when possible</li>
            </ul>
          </div>
        </div>
      </div>
    `
  }
];
