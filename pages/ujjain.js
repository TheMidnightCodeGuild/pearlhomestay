import Link from 'next/link';

const blogs = [
  {
    title: "Why Pearl Homestay Is the Ideal Stay in Ujjain for Pilgrims and Travelers",
    firstLine: "Nestled in the spiritual heart of Madhya Pradesh, Pearl Homestay in Ujjain offers a cozy and affordable stay for travelers, pilgrims, and tourists alike."
  },
  {
    title: "Finding the Best Homestay Near Mahakal Mandir in Ujjain: Pearl Homestay in Nanakheda",
    firstLine: "When you think of Ujjain, what comes to mind first? For most travelers and devotees, it's the divine Mahakal Mandir — one of the most sacred Jyotirlingas in India."
  },
  {
    title: "Looking for a Guesthouse in Ujjain? Here's Why Pearl Homestay is Your Best and Budget-Friendly Choice",
    firstLine: "When planning a trip to Ujjain — whether it's for spiritual reasons, a weekend getaway, or attending one of its many festivals — your stay should be just as meaningful as your destination."
  },
  {
    title: "Pearl Homestay – The Best and Most Affordable Homestay in Ujjain Near Mahakal Mandir",
    firstLine: "If you're looking for a homestay in Ujjain that combines comfort, affordability, and authentic hospitality, your search ends here."
  },
  {
    title: "Your Ultimate Guide to the Best Places to Stay in Ujjain – Comfort, Budget & Bliss",
    firstLine: "Ujjain — the spiritual heartbeat of Madhya Pradesh — attracts lakhs of pilgrims and travelers each year."
  },
  {
    title: "Why Pearl Homestay Is the Perfect Alternative to Anjushree, Rudraksh, and Meghdoot Hotels in Ujjain",
    firstLine: "If you've been searching for places to stay in Ujjain, you've probably come across big names like Anjushree Hotel Ujjain, Hotel Rudraksh Ujjain, and Meghdoot Hotel Ujjain."
  },
  {
    title: "Looking for Hotels in Ujjain? Here's Why Pearl Homestay Might Be a Better Choice",
    firstLine: "If you're searching online for hotels in Ujjain, you're probably overwhelmed by hundreds of options — from big-budget hotels to unknown listings."
  },
  {
    title: "Your Ideal Stay in Ujjain: Why Pearl Homestay Is the Smart Traveler's Choice",
    firstLine: "When you plan a trip to Ujjain, your excitement often revolves around visiting the Mahakaleshwar Temple, taking a dip at Ram Ghat, and immersing yourself in the spiritual atmosphere of one of India's oldest cities."
  },
  {
    title: "Why Pearl Homestay is Your Ideal Place to Stay in Ujjain",
    firstLine: "When it comes to visiting the spiritual capital of India—Ujjain—choosing the right accommodation can greatly elevate your overall experience."
  },
  {
    title: "Discover the Heart of Ujjain with Pearl Homestay: Comfort, Affordability, and Divine Proximity",
    firstLine: "Ujjain is not just a city—it's an experience of devotion, heritage, and timeless culture."
  }
];

export default function Blogs() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Our Blog Posts
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => {
          // Blog file names are blogOne, blogTwo, ..., blogTen
          const blogNames = [
            "blogOne",
            "blogTwo",
            "blogThree",
            "blogFour",
            "blogFive",
            "blogSix",
            "blogSeven",
            "blogEight",
            "blogNine",
            "blogTen"
          ];
          const blogFile = blogNames[index] || `blog${index + 1}`;
          return (
            <Link
              href={`/blogs/${blogFile}`}
              key={index}
              className="group"
              passHref
            >
              <div
                className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-100 hover:border-indigo-400 p-6 flex flex-col h-full group"
                tabIndex={0}
                role="link"
                aria-label={blog.title}
              >
                <div className="flex items-center mb-3">
                  <span className="inline-block bg-indigo-100 text-indigo-600 rounded-full px-3 py-1 text-xs font-semibold mr-2">
                    Blog #{index + 1}
                  </span>
                  <span className="ml-auto text-indigo-400 group-hover:text-indigo-600 transition-colors">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-indigo-700 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm flex-1">
                  {blog.firstLine}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
