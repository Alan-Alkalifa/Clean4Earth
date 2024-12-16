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
    title: "Sustainable Living Guide: A Student's Perspective",
    description: "A comprehensive guide for university students and young adults on adopting eco-friendly practices in daily life. Learn practical, budget-friendly steps to reduce your environmental impact while living on campus or in your first apartment.",
    image: "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?ixlib=rb-4.0.3",
    category: "Lifestyle",
    type: "Guide",
    readTime: "12 min read",
    author: "Alan Alkalifa",
    authorRole: "College Student at Universitas Pembangunan Jaya",
    authorImage: "/AlanAlkalifa.jpeg",
    date: "October 15, 2023",
    slug: "sustainable-living-guide",
    tags: ["Sustainability", "Student Life", "Eco-friendly", "Budget Living", "Green Campus", "Zero Waste"],
    views: 1250,
    likes: 342,
    difficulty: "Beginner",
    estimatedImpact: "Reduce carbon footprint by ~20% more",
    relatedLinks: [
      {
        title: "EPA Sustainable Living Resources",
        url: "https://www.epa.gov/environmental-topics/greener-living"
      },
      {
        title: "Energy Saving Tips for Students",
        url: "https://www.energy.gov/energysaver/energy-saver"
      },
      {
        title: "Green Campus Initiative",
        url: "https://www.aashe.org/campus-sustainability-hub/"
      }
    ],
    content: `
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">Introduction to Sustainable Student Living</h2>
          <p class="mb-4">As university students, we have a unique opportunity to shape the future of our planet. Sustainable living isn't just about grand gestures – it's about the small, daily decisions that add up to make a significant difference, especially within our campus community.</p>
          <div class="bg-primary/5 p-6 rounded-lg mb-6">
            <h3 class="font-semibold mb-3">Campus Impact Facts</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>A typical university student generates about 640 pounds of solid waste each year</li>
              <li>Using a reusable water bottle can prevent 167 plastic bottles from landfills per semester</li>
              <li>Proper recycling in dorms can reduce waste by up to 70%</li>
              <li>Energy-efficient practices in student housing can reduce electricity usage by 30%</li>
            </ul>
          </div>
          <blockquote class="border-l-4 border-primary pl-4 italic my-6">
            "The decisions we make as students today will shape the environmental landscape of tomorrow." - Environmental Society, UPJ
          </blockquote>
        </div>
        
        <div>
          <h2 class="text-2xl font-bold mb-4">Key Areas for Student Impact</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-primary/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-3">Dorm/Apartment Living</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Use LED desk lamps and natural lighting</li>
                <li>Implement smart power strips for electronics</li>
                <li>Choose energy-efficient appliances</li>
                <li>Create a mini indoor garden</li>
                <li>Set up a recycling station</li>
              </ul>
            </div>
            <div class="bg-primary/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-3">Campus Life</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Use digital textbooks when possible</li>
                <li>Carry reusable utensils and containers</li>
                <li>Join environmental campus groups</li>
                <li>Support sustainable campus initiatives</li>
                <li>Start carpooling groups</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Budget-Friendly Sustainable Living</h2>
          <p class="mb-4">Being sustainable doesn't have to be expensive. Here are practical ways to save money while saving the planet:</p>
          <div class="bg-primary/5 p-6 rounded-lg">
            <div class="grid md:grid-cols-3 gap-6">
              <div>
                <h4 class="font-semibold text-primary mb-2">Save Money</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Thrift shopping for clothes</li>
                  <li>Buy second-hand textbooks</li>
                  <li>Use a bike or public transport</li>
                  <li>Cook meals in bulk</li>
                  <li>Use a reusable water bottle</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-primary mb-2">Reduce Waste</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Create a compost bin</li>
                  <li>Use cloth bags for shopping</li>
                  <li>Repair instead of replace</li>
                  <li>Borrow or share items</li>
                  <li>Go paperless for notes</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-primary mb-2">Campus Impact</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Start eco-friendly clubs</li>
                  <li>Organize campus cleanups</li>
                  <li>Advocate for green policies</li>
                  <li>Create awareness campaigns</li>
                  <li>Lead by example</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Technology and Sustainability</h2>
          <p class="mb-4">Leverage technology to enhance your sustainable lifestyle:</p>
          <div class="bg-primary/5 p-6 rounded-lg">
            <ul class="list-disc list-inside space-y-2">
              <li>Use apps to track your carbon footprint</li>
              <li>Join online environmental communities</li>
              <li>Utilize digital textbooks and notes</li>
              <li>Find local recycling centers through apps</li>
              <li>Share sustainable tips on social media</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Taking Action: Your Next Steps</h2>
          <div class="bg-primary/5 p-6 rounded-lg">
            <ol class="list-decimal list-inside space-y-3">
              <li>Start with one sustainable habit this week</li>
              <li>Calculate your current carbon footprint</li>
              <li>Join or create an environmental group on campus</li>
              <li>Share your journey with friends and family</li>
              <li>Set monthly sustainability goals</li>
            </ol>
          </div>
        </div>
      </div>
    `
  },
  {
    title: "Campus Waste Reduction Challenge",
    description: "Join our 30-day challenge to minimize waste on campus! Learn innovative ways to reduce, reuse, and recycle while inspiring your fellow students to create a more sustainable university environment.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3",
    category: "Challenge",
    type: "Interactive",
    readTime: "15 min read",
    author: "Cut Zhiffa Asharlyn",
    authorRole: "College Student at Universitas Pembangunan Jaya",
    authorImage: "/CutZhiffaAsharlyn.jpeg",
    date: "October 20, 2023",
    slug: "campus-waste-reduction",
    tags: ["Zero Waste", "Campus Life", "Recycling", "Student Initiative", "Environmental Challenge"],
    views: 980,
    likes: 245,
    difficulty: "Intermediate",
    estimatedImpact: "Reduce campus waste by 30%",
    relatedLinks: [
      {
        title: "Zero Waste Campus Guide",
        url: "https://www.epa.gov/transforming-waste-tool"
      },
      {
        title: "Student Recycling Programs",
        url: "https://recyclingpartnership.org/campus-recycling/"
      }
    ],
    content: `
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">The Campus Waste Challenge</h2>
          <p class="mb-4">Our university community generates significant waste daily. This 30-day challenge empowers students to make a measurable difference through simple, actionable steps.</p>
          <div class="bg-primary/5 p-6 rounded-lg mb-6">
            <h3 class="font-semibold mb-3">Challenge Impact</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Average student can reduce waste by 50% through mindful choices</li>
              <li>Campus-wide participation could prevent 5000+ kg of waste monthly</li>
              <li>Potential to inspire lasting behavioral changes</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">30-Day Challenge Breakdown</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-primary/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-3">Week 1-2: Assess & Reduce</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Track your daily waste</li>
                <li>Identify main waste sources</li>
                <li>Switch to reusable items</li>
                <li>Start composting food waste</li>
              </ul>
            </div>
            <div class="bg-primary/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-3">Week 3-4: Engage & Expand</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Share progress on social media</li>
                <li>Organize waste audit events</li>
                <li>Create waste-free zones</li>
                <li>Mentor other students</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Challenge Resources</h2>
          <div class="bg-primary/5 p-6 rounded-lg">
            <div class="grid md:grid-cols-3 gap-6">
              <div>
                <h4 class="font-semibold text-primary mb-2">Tools Needed</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Reusable water bottle</li>
                  <li>Food containers</li>
                  <li>Cloth bags</li>
                  <li>Digital note-taking device</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-primary mb-2">Support System</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Challenge community</li>
                  <li>Progress tracking app</li>
                  <li>Weekly meetups</li>
                  <li>Online resources</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-primary mb-2">Measuring Success</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Weekly waste audits</li>
                  <li>Photo documentation</li>
                  <li>Impact calculations</li>
                  <li>Community feedback</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    title: "Green Technology in Student Life",
    description: "Discover how students can leverage technology to promote sustainability. From eco-friendly apps to smart devices, learn how to use technology to reduce your environmental impact while enhancing your academic life.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3",
    category: "Technology",
    type: "Guide",
    readTime: "10 min read",
    author: "Alisha Sumahesa",
    authorRole: "College Student at Universitas Pembangunan Jaya",
    authorImage: "/AlishaSumahesa.jpeg",
    date: "October 25, 2023",
    slug: "green-technology-guide",
    tags: ["Technology", "Innovation", "Smart Devices", "Digital Solutions", "Energy Efficiency"],
    views: 850,
    likes: 230,
    difficulty: "Intermediate",
    estimatedImpact: "Reduce energy use by 25%",
    relatedLinks: [
      {
        title: "Green Tech Solutions",
        url: "https://www.energy.gov/green-technology"
      },
      {
        title: "Sustainable Apps Guide",
        url: "https://www.earthday.org/earth-day-tips-environmental-apps/"
      }
    ],
    content: `
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">Technology for Sustainable Student Life</h2>
          <p class="mb-4">As digital natives, we can harness technology to create positive environmental change. Learn how to use tech tools and innovations to reduce your carbon footprint while enhancing your academic experience.</p>
          <div class="bg-primary/5 p-6 rounded-lg mb-6">
            <h3 class="font-semibold mb-3">Tech Impact Stats</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Smart device usage can reduce energy consumption by 15-30%</li>
              <li>Digital notes save 500+ sheets of paper per semester</li>
              <li>Eco-friendly apps can help reduce personal carbon emissions by 20%</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Essential Green Tech Tools</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-primary/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-3">Academic Tech</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>E-readers and tablets</li>
                <li>Cloud storage solutions</li>
                <li>Digital note-taking apps</li>
                <li>Online collaboration tools</li>
              </ul>
            </div>
            <div class="bg-primary/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-3">Lifestyle Tech</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Smart power strips</li>
                <li>LED smart bulbs</li>
                <li>Water usage monitors</li>
                <li>Eco-friendly transport apps</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Recommended Apps and Tools</h2>
          <div class="bg-primary/5 p-6 rounded-lg">
            <div class="grid md:grid-cols-3 gap-6">
              <div>
                <h4 class="font-semibold text-primary mb-2">Study Apps</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Digital textbooks</li>
                  <li>Note-taking platforms</li>
                  <li>Cloud storage</li>
                  <li>PDF annotators</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-primary mb-2">Sustainability Apps</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Carbon footprint trackers</li>
                  <li>Recycling guides</li>
                  <li>Energy monitors</li>
                  <li>Eco-shopping assistants</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-primary mb-2">Smart Devices</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Smart thermostats</li>
                  <li>Energy monitors</li>
                  <li>Smart plugs</li>
                  <li>LED lighting systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    title: "Student's Guide to Sustainable Transportation",
    description: "Explore eco-friendly transportation options for students. From campus bike-sharing to carpooling apps, discover how to reduce your carbon footprint while commuting to and from campus.",
    image: "https://images.unsplash.com/photo-1519003300449-424ad0405076?ixlib=rb-4.0.3",
    category: "Transportation",
    type: "Guide",
    readTime: "8 min read",
    author: "Naufal Alghifary",
    authorRole: "College Student at Universitas Pembangunan Jaya",
    authorImage: "/NaufalAlghifary.png",
    date: "October 30, 2023",
    slug: "sustainable-transportation",
    tags: ["Transportation", "Campus Life", "Eco-friendly", "Commuting", "Carbon Reduction"],
    views: 720,
    likes: 185,
    difficulty: "Beginner",
    estimatedImpact: "Reduce transport emissions by 40%",
    relatedLinks: [
      {
        title: "Sustainable Transport Guide",
        url: "https://www.sustainabletransport.org"
      },
      {
        title: "Campus Cycling Resources",
        url: "https://www.bikeleague.org/university"
      }
    ],
    content: `
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">Sustainable Campus Transportation</h2>
          <p class="mb-4">Transportation is a significant source of carbon emissions. As students, we can make a huge impact by choosing sustainable commuting options. This guide explores practical solutions for eco-friendly campus travel.</p>
          <div class="bg-primary/5 p-6 rounded-lg mb-6">
            <h3 class="font-semibold mb-3">Transportation Impact</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Average student commute produces 2 tons of CO2 annually</li>
              <li>Cycling can save 250kg of CO2 per semester</li>
              <li>Carpooling reduces emissions by up to 50%</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Transportation Options</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-primary/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-3">Active Transport</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Campus bike-sharing</li>
                <li>Walking groups</li>
                <li>Electric scooters</li>
                <li>Skateboarding</li>
              </ul>
            </div>
            <div class="bg-primary/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-3">Shared Transport</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Student carpools</li>
                <li>Public transit</li>
                <li>Campus shuttles</li>
                <li>Ride-sharing services</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Implementation Strategies</h2>
          <div class="bg-primary/5 p-6 rounded-lg">
            <div class="grid md:grid-cols-3 gap-6">
              <div>
                <h4 class="font-semibold text-primary mb-2">Planning</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Map your routes</li>
                  <li>Check weather forecasts</li>
                  <li>Plan alternative options</li>
                  <li>Schedule travel time</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-primary mb-2">Resources</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Transit apps</li>
                  <li>Weather apps</li>
                  <li>Route planners</li>
                  <li>Carpool networks</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-primary mb-2">Safety</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Proper gear</li>
                  <li>Route lighting</li>
                  <li>Group travel</li>
                  <li>Emergency contacts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    title: "Campus Garden Initiative",
    description: "Start and maintain a sustainable campus garden. Learn how to create green spaces that provide fresh produce, reduce carbon footprint, and build community engagement among students.",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3",
    category: "Agriculture",
    type: "Project",
    readTime: "15 min read",
    author: "Alan Alkalifa",
    authorRole: "College Student at Universitas Pembangunan Jaya",
    authorImage: "/AlanAlkalifa.jpeg",
    date: "November 5, 2023",
    slug: "campus-garden-initiative",
    tags: ["Urban Farming", "Sustainability", "Community", "Food Security", "Education"],
    views: 650,
    likes: 175,
    difficulty: "Intermediate",
    estimatedImpact: "Produce 200kg food/year, reduce CO2 by 500kg",
    relatedLinks: [
      {
        title: "Campus Garden Network",
        url: "https://www.aashe.org/campus-gardens"
      },
      {
        title: "Urban Farming Guide",
        url: "https://www.urbanfarminginstitute.org"
      }
    ],
    content: `
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">Creating a Campus Garden</h2>
          <p class="mb-4">Campus gardens are powerful tools for sustainability education, community building, and food security. Learn how to start and maintain a successful garden project that engages the entire university community.</p>
          <div class="bg-primary/5 p-6 rounded-lg mb-6">
            <h3 class="font-semibold mb-3">Garden Benefits</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Provides fresh, local produce for campus community</li>
              <li>Reduces campus carbon footprint</li>
              <li>Creates hands-on learning opportunities</li>
              <li>Builds community connections</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Getting Started</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-primary/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-3">Planning Phase</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Site selection and analysis</li>
                <li>Stakeholder engagement</li>
                <li>Resource assessment</li>
                <li>Design development</li>
              </ul>
            </div>
            <div class="bg-primary/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-3">Implementation</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Soil preparation</li>
                <li>Infrastructure setup</li>
                <li>Planting schedule</li>
                <li>Maintenance plan</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Sustainable Practices</h2>
          <div class="bg-primary/5 p-6 rounded-lg">
            <div class="grid md:grid-cols-3 gap-6">
              <div>
                <h4 class="font-semibold text-primary mb-2">Water Management</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Rainwater harvesting</li>
                  <li>Drip irrigation</li>
                  <li>Mulching techniques</li>
                  <li>Water scheduling</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-primary mb-2">Soil Health</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Composting</li>
                  <li>Cover cropping</li>
                  <li>Crop rotation</li>
                  <li>Natural fertilizers</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-primary mb-2">Pest Management</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Companion planting</li>
                  <li>Natural predators</li>
                  <li>Physical barriers</li>
                  <li>Organic sprays</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Community Engagement</h2>
          <div class="bg-primary/5 p-6 rounded-lg">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-primary mb-2">Educational Programs</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Workshops and seminars</li>
                  <li>School visits</li>
                  <li>Research projects</li>
                  <li>Internship programs</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-primary mb-2">Community Activities</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Harvest festivals</li>
                  <li>Volunteer days</li>
                  <li>Cooking classes</li>
                  <li>Farmers markets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
];
