import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mock data for the app
export const mockUsers = [
  { id: 1, telegramId: 123456, username: "trader1", nickname: "SilkMaster", balance: 1000, rank: 1 },
  { id: 2, telegramId: 234567, username: "trader2", nickname: "RoadWarrior", balance: 850, rank: 2 },
  { id: 3, telegramId: 345678, username: "trader3", nickname: "MerchantKing", balance: 720, rank: 3 },
  { id: 4, telegramId: 456789, username: "trader4", nickname: "CaravanLeader", balance: 650, rank: 4 },
  { id: 5, telegramId: 567890, username: "trader5", nickname: "SpiceTrader", balance: 580, rank: 5 },
  { id: 6, telegramId: 678901, username: "trader6", nickname: "SilkRogue", balance: 520, rank: 6 },
  { id: 7, telegramId: 789012, username: "trader7", nickname: "DesertFox", balance: 480, rank: 7 },
  { id: 8, telegramId: 890123, username: "trader8", nickname: "JadeMerchant", balance: 420, rank: 8 },
  { id: 9, telegramId: 901234, username: "trader9", nickname: "TeaTrader", balance: 380, rank: 9 },
  { id: 10, telegramId: 123450, username: "trader10", nickname: "GoldSeeker", balance: 350, rank: 10 },
]

export const tradeRoutes = [
  {
    id: 1,
    name: "The Classic Silk Road",
    difficulty: "Easy",
    cities: ["Xi'an", "Samarkand", "Istanbul", "London"],
    rewards: 200,
    risk: "Low",
    description: "The traditional route that connected East and West for centuries. Perfect for beginners.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    name: "The Spice Route",
    difficulty: "Medium",
    cities: ["Calicut", "Hormuz", "Cairo", "Venice"],
    rewards: 350,
    risk: "Medium",
    description: "Follow the path of exotic spices from India to Europe. Beware of pirates and storms!",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    name: "The Tea Horse Road",
    difficulty: "Hard",
    cities: ["Pu'er", "Lhasa", "Kathmandu", "Delhi"],
    rewards: 500,
    risk: "High",
    description: "Navigate the treacherous mountain passes of the Himalayas. Only for experienced traders!",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export const challenges = [
  {
    id: 1,
    title: "Mitigating Fraud in Cross-Border Deals",
    context: "A supplier you found may be a scammer!",
    solutions: {
      traditional: [
        {
          id: 1,
          name: "Use Trusted Intermediaries",
          successRate: 70,
          description: "Hire local agents who know the market",
        },
        {
          id: 2,
          name: "Escrow Payment",
          successRate: 80,
          description: "Use a third party to hold funds until goods are delivered",
        },
      ],
      modern: [
        {
          id: 3,
          name: "Blockchain Escrow",
          successRate: 90,
          description: "Use smart contracts to automate the escrow process",
        },
        {
          id: 4,
          name: "AI Fraud Detection",
          successRate: 85,
          description: "Employ AI to analyze the transaction for red flags",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Navigating Customs and Tariffs",
    context: "Your goods are stuck at the border due to unexpected tariffs!",
    solutions: {
      traditional: [
        {
          id: 5,
          name: "Negotiate with Officials",
          successRate: 60,
          description: "Try to reach an agreement with customs officials",
        },
        {
          id: 6,
          name: "Hire Local Broker",
          successRate: 75,
          description: "Use a local expert who knows the procedures",
        },
      ],
      modern: [
        {
          id: 7,
          name: "Digital Customs Platform",
          successRate: 85,
          description: "Use a platform that streamlines customs documentation",
        },
        {
          id: 8,
          name: "Trade Finance API",
          successRate: 80,
          description: "Integrate with customs systems for automated clearance",
        },
      ],
    },
  },
  {
    id: 3,
    title: "Currency Exchange Risks",
    context: "The local currency is rapidly devaluing, threatening your profits!",
    solutions: {
      traditional: [
        {
          id: 9,
          name: "Barter Trade",
          successRate: 65,
          description: "Exchange goods directly instead of using currency",
        },
        { id: 10, name: "Commodity Hedging", successRate: 70, description: "Use precious metals as a store of value" },
      ],
      modern: [
        {
          id: 11,
          name: "Stablecoin Settlement",
          successRate: 85,
          description: "Use cryptocurrency pegged to stable assets",
        },
        {
          id: 12,
          name: "Automated Forex Hedging",
          successRate: 80,
          description: "Use algorithms to optimize currency exchanges",
        },
      ],
    },
  },
  {
    id: 4,
    title: "Supply Chain Disruption",
    context: "A natural disaster has blocked your planned route!",
    solutions: {
      traditional: [
        { id: 13, name: "Alternative Route", successRate: 75, description: "Find a different path, even if longer" },
        { id: 14, name: "Wait it Out", successRate: 60, description: "Delay the journey until conditions improve" },
      ],
      modern: [
        {
          id: 15,
          name: "Predictive Analytics",
          successRate: 85,
          description: "Use data to predict and avoid disruptions",
        },
        { id: 16, name: "Drone Delivery", successRate: 80, description: "Use unmanned vehicles to bypass obstacles" },
      ],
    },
  },
  {
    id: 5,
    title: "Language and Cultural Barriers",
    context: "You can't communicate effectively with local merchants!",
    solutions: {
      traditional: [
        {
          id: 17,
          name: "Hire Translator",
          successRate: 80,
          description: "Work with someone who speaks the local language",
        },
        {
          id: 18,
          name: "Learn Key Phrases",
          successRate: 65,
          description: "Study enough to handle basic negotiations",
        },
      ],
      modern: [
        {
          id: 19,
          name: "Real-time Translation App",
          successRate: 85,
          description: "Use technology to translate conversations instantly",
        },
        {
          id: 20,
          name: "Cultural Intelligence Platform",
          successRate: 80,
          description: "Use data to understand cultural norms and expectations",
        },
      ],
    },
  },
]

// Helper function to get a random challenge
export function getRandomChallenge() {
  const randomIndex = Math.floor(Math.random() * challenges.length)
  return challenges[randomIndex]
}

// Helper function to determine challenge outcome
export function determineOutcome(successRate: number) {
  const random = Math.random() * 100
  return random <= successRate
}

