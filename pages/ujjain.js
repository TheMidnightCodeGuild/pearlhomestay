import Link from "next/link";

const blogs = [
  {
    title:
      "Why Pearl Homestay Is the Ideal Stay in Ujjain for Pilgrims and Travelers",
    firstLine:
      "Nestled in the spiritual heart of Madhya Pradesh, Pearl Homestay in Ujjain offers a cozy and affordable stay for travelers, pilgrims, and tourists alike.",
  },
  {
    title:
      "Finding the Best Homestay Near Mahakal Mandir in Ujjain: Pearl Homestay in Nanakheda",
    firstLine:
      "When you think of Ujjain, what comes to mind first? For most travelers and devotees, it's the divine Mahakal Mandir — one of the most sacred Jyotirlingas in India.",
  },
  {
    title:
      "Looking for a Guesthouse in Ujjain? Here's Why Pearl Homestay is Your Best and Budget-Friendly Choice",
    firstLine:
      "When planning a trip to Ujjain — whether it's for spiritual reasons, a weekend getaway, or attending one of its many festivals — your stay should be just as meaningful as your destination.",
  },
  {
    title:
      "Pearl Homestay – The Best and Most Affordable Homestay in Ujjain Near Mahakal Mandir",
    firstLine:
      "If you're looking for a homestay in Ujjain that combines comfort, affordability, and authentic hospitality, your search ends here.",
  },
  {
    title:
      "Your Ultimate Guide to the Best Places to Stay in Ujjain – Comfort, Budget & Bliss",
    firstLine:
      "Ujjain — the spiritual heartbeat of Madhya Pradesh — attracts lakhs of pilgrims and travelers each year.",
  },
  {
    title:
      "Why Pearl Homestay Is the Perfect Alternative to Anjushree, Rudraksh, and Meghdoot Hotels in Ujjain",
    firstLine:
      "If you've been searching for places to stay in Ujjain, you've probably come across big names like Anjushree Hotel Ujjain, Hotel Rudraksh Ujjain, and Meghdoot Hotel Ujjain.",
  },
  {
    title:
      "Looking for Hotels in Ujjain? Here's Why Pearl Homestay Might Be a Better Choice",
    firstLine:
      "If you're searching online for hotels in Ujjain, you're probably overwhelmed by hundreds of options — from big-budget hotels to unknown listings.",
  },
  {
    title:
      "Your Ideal Stay in Ujjain: Why Pearl Homestay Is the Smart Traveler's Choice",
    firstLine:
      "When you plan a trip to Ujjain, your excitement often revolves around visiting the Mahakaleshwar Temple, taking a dip at Ram Ghat, and immersing yourself in the spiritual atmosphere of one of India's oldest cities.",
  },
  {
    title: "Why Pearl Homestay is Your Ideal Place to Stay in Ujjain",
    firstLine:
      "When it comes to visiting the spiritual capital of India—Ujjain—choosing the right accommodation can greatly elevate your overall experience.",
  },
  {
    title:
      "Discover the Heart of Ujjain with Pearl Homestay: Comfort, Affordability, and Divine Proximity",
    firstLine:
      "Ujjain is not just a city—it's an experience of devotion, heritage, and timeless culture.",
  },
];

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
  "blogTen",
];

export default function Blogs() {
  return (
    <section className="bg-gradient-to-br from-[#C6A38D] via-[#e9d6c3] to-[#C6A38D] min-h-screen w-full py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#7A4A2F] drop-shadow-lg">
          <span className="inline-block border-b-4 border-[#8B593E] pb-2">
            Pearl Homestay Blog: Spiritual Experiences, Perfect Stays, and
            Temple Insights
          </span>
        </h1>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => {
            const blogFile = blogNames[index] || `blog${index + 1}`;
            return (
              <Link
                href={`/blogs/${blogFile}`}
                key={index}
                className="group"
                passHref
              >
                <article
                  className="relative cursor-pointer bg-white/90 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#e2c7b2] hover:border-[#8B593E] p-8 flex flex-col h-full group focus:outline-none focus:ring-4 focus:ring-[#C6A38D]/50"
                  tabIndex={0}
                  role="link"
                  aria-label={blog.title}
                >
                  <div className="flex items-center mb-4">
                    <span className="inline-block bg-[#8B593E]/10 text-[#8B593E] rounded-full px-4 py-1 text-xs font-bold mr-2 tracking-wide shadow-sm">
                      Blog #{index + 1}
                    </span>
                    <span className="ml-auto text-[#8B593E] group-hover:text-[#4A2511] transition-colors">
                      <svg
                        width="26"
                        height="26"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          opacity="0.15"
                        />
                        <path
                          d="M9 18l6-6-6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#4A2511] mb-3 group-hover:text-[#8B593E] transition-colors leading-snug">
                    {blog.title}
                  </h2>
                  <p className="text-[#4A2511]/80 text-base flex-1 mb-4">
                    {blog.firstLine}
                  </p>
                  <span className="mt-auto inline-flex items-center text-[#8B593E] font-semibold group-hover:underline group-hover:text-[#4A2511] transition-colors text-sm">
                    Read More
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#8B593E]/40 pointer-events-none transition-all duration-300"></div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
