import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Groq from 'groq-sdk'
import axios from 'axios'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/cities', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.length < 3) return res.json([]);

    if (!process.env.RAPIDAPI_KEY) {
      return res.json([]);
    }

    const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
      params: { namePrefix: query, limit: 5, sort: '-population' },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    });

    const cities = response.data.data.map((c) => ({
      city: c.city,
      country: c.country
    }));

    const uniqueCities = cities.filter((v, i, a) => a.findIndex(t => (t.city === v.city && t.country === v.country)) === i);
    res.json(uniqueCities);
  } catch (error) {
    console.error('GeoDB API Error:', error.message);
    // Return bypass option directly with 200 OK to prevent console errors
    res.json([{ city: req.query.query, country: '(Click to bypass API limit)' }]);
  }
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key'
})

app.post('/api/generate-itinerary', async (req, res) => {
  try {
    const { origin, destination, startDate, endDate, adults, children, infants, customise, budget, vibe, pacing, diet } = req.body

    const travellers = adults + children + infants

    // Customisation Enforcers
    let customisationString = "";
    if (customise) {
      customisationString = `
      CRITICAL USER-DEFINED CONSTRAINTS (MUST FOLLOW STRICTLY):
      ${budget ? `- BUDGET CEILING: The TOTAL estimated cost of the entire trip (hotels, transport, food, activities) MUST NOT EXCEED ₹${budget}. You MUST select cheaper transport, budget accommodations, and free/cheap activities to rigorously stay under this limit.` : ''}
      ${vibe ? `- VIBE / THEME: The main theme of this trip is "${vibe}". All activities, descriptions, and hotel choices must deeply reflect this vibe.` : ''}
      ${pacing ? `- PACING: The schedule pacing must be "${pacing}". If Relaxed, only 1-2 major things per day. If Action-Packed, fill the day from morning to night.` : ''}
      ${diet ? `- DIETARY NEEDS: All food and restaurant recommendations MUST strictly be ${diet}. Do not suggest places that do not cater to this diet.` : ''}
      `;
    }

    // 1. Fetch Weather
    let weatherData = "22°C, Mostly Sunny" // Fallback
    if (process.env.OPENWEATHER_API_KEY) {
      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`)
        weatherData = `${Math.round(weatherResponse.data.main.temp)}°C, ${weatherResponse.data.weather[0].main}`
      } catch (e) {
        console.error("OpenWeatherMap Error:", e.message)
      }
    }

    // 2. Fetch Hotels (TripAdvisor RapidAPI apidojo)
    let fetchedHotels = null;
    if (process.env.RAPIDAPI_KEY && (!customise || !budget || parseInt(budget) > 10000)) {
      try {
        console.log("Fetching TripAdvisor Location GeoId...");
        const locRes = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation', {
          params: { query: destination },
          headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
          }
        });
        const geoId = locRes.data?.data?.[0]?.geoId;

        if (geoId) {
          console.log(`Found GeoId: ${geoId}. Fetching hotels...`);
          const hotelRes = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels', {
            params: {
              geoId: String(geoId).replace(/^g/i, ''),
              checkIn: startDate,
              checkOut: endDate,
              adults: adults.toString()
            },
            headers: {
              'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
              'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
            }
          });

          const rawHotels = hotelRes.data?.data?.data || [];
          if (rawHotels.length > 0) {
            fetchedHotels = rawHotels.slice(0, 3).map((h) => ({
              name: h.title || 'Premium Hotel',
              type: h.bubbleRating ? `${h.bubbleRating} Star Rating` : 'Boutique Hotel',
              price: h.priceForDisplay || '₹8,500/night',
              image: h.cardPhotos?.[0]?.sizes?.urlTemplate?.replace('{width}', '600').replace('{height}', '400') || '/images/image2.jpg',
              bookingLink: '#'
            }));
            console.log("TripAdvisor hotels fetched successfully.");
          }
        }
      } catch (e) {
        console.error("TripAdvisor API Error:", e.message);
      }
    }

    const hotelPromptInstruction = fetchedHotels
      ? `Use exactly these hotels in the logistics.hotels array: ${JSON.stringify(fetchedHotels)}`
      : `Generate 2-3 highly realistic hotel recommendations in the logistics.hotels array${budget ? ` that perfectly fit within the total trip budget of ₹${budget}` : ''}.`;

    // 3. Generate Complete Itinerary JSON using Groq
    const prompt = `
      You are an elite, highly intelligent AI travel consultant.
      Create a highly detailed, professional travel itinerary.
      
      Trip Details:
      Origin: ${origin}
      Destination: ${destination}
      Dates: ${startDate} to ${endDate}
      Travellers: ${travellers} (${adults} Adults, ${children} Children, ${infants} Infants)

      ${customisationString}

      CRITICAL COST & DISTANCE FRAMEWORK:
      1. Calculate the approximate real-world distance between ${origin} and ${destination}.
      2. If the distance is very short (e.g., < 100km), DO NOT estimate astronomical prices like 2 Lakhs. A 50km weekend trip should cost a fraction of a cross-country trip. 
      3. Base the budget strictly on Indian Rupees (INR) using standard regional pricing. 
      4. Structure the "metrics.cost" intelligently: (Cost of living per day * number of days * travellers) + (Transport fare). ${budget ? `TOTAL MUST BE <= ₹${budget}.` : ''}

      CRITICAL TRANSPORT FRAMEWORK (TRAINS & FLIGHTS):
      1. Under "logistics.transport", you must generate 3-4 of the BEST and CHEAPEST realistic Train options between ${origin} and ${destination}.
      2. Include Train Name, Train Number, Departure Time, Arrival Time, Duration, and estimated Fare in INR. 
      3. VERY IMPORTANT: ONLY suggest Flights if BOTH the origin and destination actually have commercial passenger airports. For example, "Mathura" does not have an airport, so a flight from Mathura to Delhi is impossible and MUST NOT be suggested. If no commercial airport exists in either city, provide ONLY Trains or Buses.
      4. Format the "route" string to include the time and duration (e.g. "08:00 AM - 12:30 PM (4h 30m)").
      5. Use "TrainBig" for train icons, "Plane" for flights.

      HOTELS INSTRUCTION:
      ${hotelPromptInstruction}

      Instructions:
      1. Create a JSON response matching the exact structure below. Output ONLY valid JSON, no markdown.
      2. Create day-by-day activities. Break them into Morning, Afternoon, Evening. Include estimated transit methods between them (e.g., "15 min walk").
      
      JSON Structure:
      {
        "title": "A [Number]-Day [Adjective] Trip to [Destination]",
        "overview": "A 2-3 sentence engaging overview.",
        "metrics": {
          "cost": "[Intelligent Total Cost in INR, e.g. ₹24,000]",
          "dates": "${startDate} - ${endDate}",
          "destination": "${destination}",
          "weather": "${weatherData}"
        },
        "days": [
          {
            "day": 1,
            "title": "[Day Theme/Title]",
            "activities": [
              {
                "timeOfDay": "Morning",
                "iconName": "Sun",
                "title": "[Activity Name]",
                "description": "[Description]",
                "duration": "[e.g. 2 hours]",
                "cost": "[e.g. ₹500 entry]",
                "transit": "[e.g. 15 min walk to next stop]",
                "transitIconName": "Footprints"
              }
            ]
          }
        ],
        "logistics": {
          "hotels": [
            {
              "name": "[Hotel Name]",
              "type": "[e.g. Boutique Hotel]",
              "price": "[e.g. ₹8,000/night]",
              "image": "/images/image2.jpg",
              "bookingLink": "#"
            }
          ],
          "transport": [
            {
              "type": "[e.g. Train - Shatabdi Express (12001)]",
              "route": "[e.g. 06:00 AM - 10:30 AM (4h 30m)]",
              "airline": "[e.g. Indian Railways]",
              "price": "[e.g. \u20b91,200]",
              "iconName": "TrainBig"
            }
          ]
        },
        "routeMap": {
          "totalDistance": "[e.g. 1,250 km]",
          "totalDuration": "[e.g. 6h 30m by fastest option]",
          "legs": [
            {
              "from": "[City, e.g. Mathura]",
              "to": "[City, e.g. Delhi]",
              "distanceKm": 180,
              "options": [
                {
                  "mode": "Train",
                  "iconName": "TrainBig",
                  "name": "[e.g. Shatabdi Express]",
                  "duration": "[e.g. 2h 15m]",
                  "price": "[e.g. \u20b9450]",
                  "recommended": true
                },
                {
                  "mode": "Bus",
                  "iconName": "Bus",
                  "name": "[e.g. UPSRTC Express]",
                  "duration": "[e.g. 3h 30m]",
                  "price": "[e.g. \u20b9200]",
                  "recommended": false
                }
              ]
            }
          ],
          "alternativeRoutes": [
            {
              "label": "[e.g. Via Agra]",
              "summary": "[e.g. Scenic detour adding ~45 min]",
              "totalDuration": "[e.g. 7h 15m]"
            }
          ]
        },
        "finance": [
          { "name": "Flights & Transport", "value": COMPUTE_REAL_TRANSPORT_COST_IN_INR_AS_INTEGER, "color": "#31A8FF" },
          { "name": "Accommodation", "value": COMPUTE_REAL_ACCOMMODATION_COST_IN_INR_AS_INTEGER, "color": "#0a3d5c" },
          { "name": "Food & Dining", "value": COMPUTE_REAL_FOOD_COST_IN_INR_AS_INTEGER, "color": "#38bdf8" },
          { "name": "Activities & Fees", "value": COMPUTE_REAL_ACTIVITIES_COST_IN_INR_AS_INTEGER, "color": "#7dd3fc" }
        ],
        "budgetAnalysis": {
          "minimumBudget": "₹[Minimum realistically possible cost in INR for this trip]",
          "minimumBudgetInt": MINIMUM_COST_AS_INTEGER,
          "isBudgetFeasible": true_or_false,
          "budgetWarning": "[If user budget is too low: explain minimum required. If feasible, leave empty string.]",
          "costSavings": [
            { "category": "[e.g. Accommodation]", "saving": "[e.g. Chose budget guesthouse instead of 4-star hotel, saving ₹3,500/night]" }
          ]
        }
      }

      CRITICAL FINANCE RULES:
      - The "finance" array values MUST be real computed integer numbers in INR, NOT 0 or placeholders.
      - Compute transport cost = cheapest recommended transport fare × travellers.
      - Compute accommodation = nightly rate × number of nights.
      - Compute food = ₹500–₹2,000 per person per day depending on destination tier.
      - Compute activities = sum of entry fees and activity costs across all days.
      - The sum of all 4 finance values must approximately equal metrics.cost (numeric total).

      BUDGET FEASIBILITY RULES:
      - Always compute and return minimumBudgetInt = the absolute minimum realistic cost for this trip.
      - If the user's requested budget (${budget || 'not set'}) is LESS than minimumBudgetInt, set isBudgetFeasible=false and write a clear budgetWarning explaining the actual minimum.
      - If budget IS feasible, set isBudgetFeasible=true, budgetWarning="", and list specific cost reductions in costSavings (e.g. "Chose AC bus instead of flight, saving ₹4,200").
      - If no custom budget was set, still return minimumBudget and set isBudgetFeasible=true.

      ROUTE MAP RULES:
      - Break the journey into realistic geographic intermediate legs (hub cities).
      - For each leg list ALL realistic transport options. Only add Flight if BOTH endpoints have airports.
      - Mark the best value option as recommended:true.
      - Provide 2-3 alternative full routes in alternativeRoutes.

      INTELLIGENCE RULES:
      - All train names, numbers, timings and fares must be realistic for the Indian railway system.
      - Hotel prices must reflect real market rates for the destination city.
      - Food costs must reflect local economy (tier-1 city vs small town).
      - Activities must be real attractions with accurate entry fees.
    `

    // Fallback if no Groq Key
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
      throw new Error("Missing valid GROQ_API_KEY in .env");
    }

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 3500,
      response_format: { type: "json_object" }
    })

    const resultStr = completion.choices[0]?.message?.content || '{}'
    const sanitizedStr = resultStr.replace(/```json/g, '').replace(/```/g, '').trim()
    let parsedResult = JSON.parse(sanitizedStr)

    // Send the generated JSON back to the client
    res.json(parsedResult)

  } catch (error) {
    console.error('Error generating itinerary:', error)
    res.status(500).json({ error: 'Failed to generate itinerary. Please try again.' })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
