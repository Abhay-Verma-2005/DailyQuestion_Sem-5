// File Structure:
// influencexrn/
// ├── backend/
// │   ├── models/
// │   │   ├── Influencer.js
// │   │   ├── Brand.js
// │   │   ├── Campaign.js
// │   │   ├── Collaboration.js
// │   │   └── Earning.js
// │   ├── routes/
// │   │   ├── influencers.js
// │   │   ├── brands.js
// │   │   ├── campaigns.js
// │   │   └── collaborations.js
// │   ├── middleware/
// │   │   └── auth.js
// │   └── server.js
// ├── frontend/
// │   ├── src/
// │   │   ├── components/
// │   │   │   ├── Header.js
// │   │   │   ├── Hero.js
// │   │   │   ├── Services.js
// │   │   │   ├── InfluencerCard.js
// │   │   │   └── Dashboard.js
// │   │   ├── pages/
// │   │   │   ├── Home.js
// │   │   │   ├── Search.js
// │   │   │   ├── Profile.js
// │   │   │   └── BusinessDashboard.js
// │   │   ├── App.js
// │   │   └── index.js
// │   ├── public/
// │   │   └── index.html
// │   └── package.json
// └── package.json

// ===========================================
// BACKEND FILES
// ===========================================

// backend/package.json
{
  "name": "influencexrn-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.3",
    "cors": "^2.8.5",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}

// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/influencexrn');

app.use('/api/influencers', require('./routes/influencers'));
app.use('/api/brands', require('./routes/brands'));
app.use('/api/campaigns', require('./routes/campaigns'));
app.use('/api/collaborations', require('./routes/collaborations'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// backend/models/Influencer.js
const mongoose = require('mongoose');

const influencerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  city: String,
  category: String,
  followers: { type: Number, default: 0 },
  engagement_rate: { type: Number, default: 0 },
  portfolio_links: [String],
  bio: String,
  visibility_tier: { type: String, enum: ['bronze', 'silver', 'gold'], default: 'bronze' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Influencer', influencerSchema);

// backend/models/Brand.js
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  brand_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  city: String,
  industry: String,
  website: String,
  campaigns_posted: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Brand', brandSchema);

// backend/models/Campaign.js
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  brand_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
  campaign_title: { type: String, required: true },
  description: String,
  category: String,
  budget: Number,
  requirements: String,
  deadline: Date,
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', campaignSchema);

// backend/models/Collaboration.js
const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
  influencer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Influencer', required: true },
  brand_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
  campaign_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  deal_amount: Number,
  commission_charged: Number,
  status: { type: String, enum: ['pending', 'accepted', 'completed', 'rejected'], default: 'pending' },
  completed_on: Date,
  applied_influencers: Number,
  selected_influencer: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Collaboration', collaborationSchema);

// backend/models/Earning.js
const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  influencer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Influencer', required: true },
  total_earned: { type: Number, default: 0 },
  payouts: [{
    amount: Number,
    date: Date,
    method: String,
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
  }]
});

module.exports = mongoose.model('Earning', earningSchema);

// backend/routes/influencers.js
const express = require('express');
const router = express.Router();
const Influencer = require('../models/Influencer');

router.get('/', async (req, res) => {
  try {
    const { city, category, followers_min, followers_max } = req.query;
    let filter = {};
    
    if (city) filter.city = new RegExp(city, 'i');
    if (category) filter.category = category;
    if (followers_min) filter.followers = { $gte: parseInt(followers_min) };
    if (followers_max) filter.followers = { ...filter.followers, $lte: parseInt(followers_max) };

    const influencers = await Influencer.find(filter);
    res.json(influencers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const influencer = new Influencer(req.body);
    await influencer.save();
    res.status(201).json(influencer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const influencer = await Influencer.findById(req.params.id);
    if (!influencer) return res.status(404).json({ message: 'Influencer not found' });
    res.json(influencer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// backend/routes/brands.js
const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');

router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

// backend/routes/campaigns.js
const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');

router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: 'active' }).populate('brand_id');
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

// backend/routes/collaborations.js
const express = require('express');
const router = express.Router();
const Collaboration = require('../models/Collaboration');

router.get('/', async (req, res) => {
  try {
    const collaborations = await Collaboration.find()
      .populate('influencer_id')
      .populate('brand_id')
      .populate('campaign_id');
    res.json(collaborations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const collaboration = new Collaboration(req.body);
    await collaboration.save();
    res.status(201).json(collaboration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const collaboration = await Collaboration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(collaboration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// ===========================================
// FRONTEND FILES
// ===========================================

// frontend/package.json
{
  "name": "influencexrn-frontend",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "axios": "^1.3.4",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "proxy": "http://localhost:5000"
}

// frontend/public/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>InfluencerXRN</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>

// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import BusinessDashboard from './pages/BusinessDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/dashboard" element={<BusinessDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// frontend/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            InfluencerXRN
          </Link>
          <nav className="flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/search" className="text-gray-600 hover:text-gray-900">Search</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Sign Up
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

// frontend/src/components/Hero.js
import React from 'react';

function Hero() {
  return (
    <section className="bg-gradient-to-br from-orange-50 to-pink-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Discover, Connect & Grow with the Right Influencers
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect brands with authentic creators for powerful collaborations
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
              Find Influencers
            </button>
            <button className="border border-gray-300 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50">
              Join as Creator
            </button>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-amber-100 rounded-2xl p-6">
            <div className="text-amber-800 font-semibold mb-2">Targeted Creators</div>
            <p className="text-sm text-gray-600">Find creators that align with your brand values</p>
          </div>
          <div className="bg-green-100 rounded-2xl p-6">
            <div className="text-green-800 font-semibold mb-2">Authentic Engagement</div>
            <p className="text-sm text-gray-600">Real connections with genuine audiences</p>
          </div>
          <div className="bg-purple-100 rounded-2xl p-6">
            <div className="text-purple-800 font-semibold mb-2">Brand Collaborations</div>
            <p className="text-sm text-gray-600">Seamless campaign management</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

// frontend/src/components/Services.js
import React from 'react';

function Services() {
  return (
    <section className="py-20 bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-300">Everything you need for successful influencer marketing</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Business Model</h3>
            <p className="text-gray-300">Streamlined processes for brand-influencer partnerships</p>
          </div>
          <div className="text-center">
            <div className="bg-green-600 w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Business Execution</h3>
            <p className="text-gray-300">End-to-end campaign management and execution</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-600 w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Business Monitoring</h3>
            <p className="text-gray-300">Real-time analytics and performance tracking</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;

// frontend/src/components/InfluencerCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function InfluencerCard({ influencer }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {influencer.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{influencer.name}</h3>
          <p className="text-gray-600">@{influencer.username}</p>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Category:</span>
          <span className="font-medium">{influencer.category}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Followers:</span>
          <span className="font-medium">{influencer.followers?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Engagement:</span>
          <span className="font-medium">{influencer.engagement_rate}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Location:</span>
          <span className="font-medium">{influencer.city}</span>
        </div>
      </div>
      <Link 
        to={`/profile/${influencer._id}`}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors block text-center"
      >
        View Profile
      </Link>
    </div>
  );
}

export default InfluencerCard;

// frontend/src/pages/Home.js
import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';

function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600 mb-4">"Great platform for finding authentic influencers."</p>
                <div className="font-semibold">Brand Partner {i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

// frontend/src/pages/Search.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfluencerCard from '../components/InfluencerCard';

function Search() {
  const [influencers, setInfluencers] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    category: '',
    followers_min: '',
    followers_max: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInfluencers();
  }, []);

  const fetchInfluencers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/influencers', { params: filters });
      setInfluencers(response.data);
    } catch (error) {
      console.error('Error fetching influencers:', error);
    }
    setLoading(false);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchInfluencers();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Influencers</h1>
      
      <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">All Categories</option>
            <option value="Fashion">Fashion</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Food">Food</option>
          </select>
          <input
            type="number"
            name="followers_min"
            placeholder="Min Followers"
            value={filters.followers_min}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="number"
            name="followers_max"
            placeholder="Max Followers"
            value={filters.followers_max}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {influencers.map(influencer => (
            <InfluencerCard key={influencer._id} influencer={influencer} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;

// frontend/src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInfluencer();
  }, [id]);

  const fetchInfluencer = async () => {
    try {
      const response = await axios.get(`/api/influencers/${id}`);
      setInfluencer(response.data);
    } catch (error) {
      console.error('Error fetching influencer:', error);
    }
    setLoading(false);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!influencer) return <div className="text-center py-8">Influencer not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
            {influencer.name.charAt(0)}
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold">{influencer.name}</h1>
            <p className="text-xl text-gray-600">@{influencer.username}</p>
            <p className="text-gray-600">{influencer.city}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Followers:</span>
                <span className="font-medium">{influencer.followers?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Engagement Rate:</span>
                <span className="font-medium">{influencer.engagement_rate}%</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{influencer.category}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Tier:</span>
                <span className="font-medium capitalize">{influencer.visibility_tier}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{influencer.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{influencer.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {influencer.bio && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Bio</h2>
            <p className="text-gray-700">{influencer.bio}</p>
          </div>
        )}

        {influencer.portfolio_links && influencer.portfolio_links.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
            <div className="space-y-2">
              {influencer.portfolio_links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 underline"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
          Connect for Collaboration
        </button>
      </div>
    </div>
  );
}

export default Profile;

// frontend/src/pages/BusinessDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BusinessDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [collaborations, setCollaborations] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    campaign_title: '',
    description: '',
    category: '',
    budget: '',
    requirements: '',
    deadline: ''
  });

  useEffect(() => {
    fetchCampaigns();
    fetchCollaborations();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('/api/campaigns');
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const fetchCollaborations = async () => {
    try {
      const response = await axios.get('/api/collaborations');
      setCollaborations(response.data);
    } catch (error) {
      console.error('Error fetching collaborations:', error);
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/campaigns', {
        ...newCampaign,
        brand_id: '507f1f77bcf86cd799439011'
      });
      setNewCampaign({
        campaign_title: '',
        description: '',
        category: '',
        budget: '',
        requirements: '',
        deadline: ''
      });
      setShowCreateForm(false);
      fetchCampaigns();
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewCampaign({ ...newCampaign, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Business Dashboard</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Active Campaigns</h3>
          <p className="text-3xl font-bold text-blue-600">{campaigns.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Total Collaborations</h3>
          <p className="text-3xl font-bold text-green-600">{collaborations.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Pending Requests</h3>
          <p className="text-3xl font-bold text-orange-600">
            {collaborations.filter(c => c.status === 'pending').length}
          </p>
        </div>
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Create New Campaign</h2>
            <form onSubmit={handleCreateCampaign}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="campaign_title"
                  placeholder="Campaign Title"
                  value={newCampaign.campaign_title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={newCampaign.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"
                  required
                />
                <select
                  name="category"
                  value={newCampaign.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Tech">Tech</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Food">Food</option>
                </select>
                <input
                  type="number"
                  name="budget"
                  placeholder="Budget ($)"
                  value={newCampaign.budget}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
                <textarea
                  name="requirements"
                  placeholder="Requirements"
                  value={newCampaign.requirements}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 h-20"
                />
                <input
                  type="date"
                  name="deadline"
                  value={newCampaign.deadline}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Create Campaign
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Active Campaigns</h2>
          <div className="space-y-4">
            {campaigns.map(campaign => (
              <div key={campaign._id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold">{campaign.campaign_title}</h3>
                <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">{campaign.category}</span>
                  <span className="text-sm font-medium">${campaign.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Collaborations</h2>
          <div className="space-y-4">
            {collaborations.map(collaboration => (
              <div key={collaboration._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {collaboration.influencer_id?.name || 'Unknown Influencer'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {collaboration.campaign_id?.campaign_title || 'Unknown Campaign'}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    collaboration.status === 'completed' ? 'bg-green-100 text-green-800' :
                    collaboration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {collaboration.status}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">
                    Deal: ${collaboration.deal_amount}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(collaboration.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDashboard;

// ===========================================
// SETUP INSTRUCTIONS
// ===========================================

/*
SETUP INSTRUCTIONS:

1. Backend Setup:
   cd backend
   npm init -y
   npm install express mongoose cors bcryptjs jsonwebtoken dotenv
   npm install -D nodemon
   
2. Create .env file in backend folder:
   MONGODB_URI=mongodb://localhost:27017/influencexrn
   JWT_SECRET=your_jwt_secret_here
   PORT=5000

3. Frontend Setup:
   npx create-react-app frontend
   cd frontend
   npm install react-router-dom axios
   
4. Replace frontend/src files with the provided code

5. Add proxy to frontend/package.json:
   "proxy": "http://localhost:5000"

6. Run the application:
   Backend: cd backend && npm run dev
   Frontend: cd frontend && npm start

7. Sample Data (POST to respective endpoints):

   Sample Influencer:
   POST /api/influencers
   {
     "username": "fashionista_maya",
     "name": "Maya Sharma",
     "email": "maya@example.com",
     "phone": "+91-9876543210",
     "city": "Mumbai",
     "category": "Fashion",
     "followers": 125000,
     "engagement_rate": 4.2,
     "bio": "Fashion influencer and lifestyle blogger",
     "visibility_tier": "gold",
     "portfolio_links": ["https://instagram.com/fashionista_maya"]
   }

   Sample Brand:
   POST /api/brands
   {
     "brand_name": "StyleCo",
     "email": "hello@styleco.com",
     "phone": "+91-9876543211",
     "city": "Delhi",
     "industry": "Fashion",
     "website": "https://styleco.com"
   }

   Sample Campaign:
   POST /api/campaigns
   {
     "brand_id": "BRAND_ID_HERE",
     "campaign_title": "Summer Collection Launch",
     "description": "Promote our new summer collection",
     "category": "Fashion",
     "budget": 50000,
     "requirements": "Instagram posts and stories",
     "deadline": "2025-08-15"
   }

Features Included:
- Homepage with hero section and services
- Influencer search with filters
- Detailed influencer profiles
- Business dashboard for campaign management
- Create new campaigns
- View collaborations and statistics
- Responsive design with Tailwind CSS
- MongoDB integration with proper schemas
- RESTful API endpoints
- React routing and state management

Tech Stack Used:
✅ MongoDB (with Mongoose)
✅ Express.js
✅ React.js
✅ Node.js  
✅ Tailwind CSS
✅ HTML
✅ JavaScript (No TypeScript)
*/