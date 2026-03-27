/**
 * GRID DOWN — Game Data
 * All content separated from logic: events, locations, NPCs, items, text templates.
 */

const GAME_DATA = {

  // ─── STARTING RESOURCE VALUES (Normal difficulty) ───
  startingResources: {
    food: 14,
    water: 20,
    medicine: 6,
    fuel: 8,
    cohesion: 7
  },

  // ─── RESOURCE DRAIN RATES ───
  drainRates: {
    food: { normal: 1.0, tight: 0.5, survival: 0.3 },
    water: { normal: 4, hygiene: 6 },
    fuel: { generator: 0.5, heating: 1.0, off: 0 },
    stressBase: 0.5,
    cohesionDrift: 0.1 // drifts toward 5
  },

  // ─── CRISIS THRESHOLDS ───
  crisisThresholds: {
    food: 3,
    water: 8,
    medicine: 2,
    fuel: 2,
    cohesionLow: 3,
    stressHigh: 7,
    stressCritical: 8
  },

  // ─── RESOURCE MAXIMUMS (for bar display) ───
  resourceMax: {
    food: 30,
    water: 50,
    medicine: 20,
    fuel: 20,
    cohesion: 10
  },

  // ─── FOOD TYPES (for menu fatigue tracking) ───
  foodTypes: ['canned', 'dried', 'fresh', 'foraged', 'mre', 'snack'],

  // ─── CHARACTERS ───
  characters: {
    player: {
      id: 'player',
      role: 'Leader',
      defaultName: 'Alex',
      skill: 'leadership',
      skillDesc: 'Manages the group. Cannot be assigned to tasks.',
      vulnerability: 'decision_fatigue',
      vulnerabilityDesc: 'Stress rises 1.5x faster than others.',
      stressMult: 1.5,
      canAssign: false,
      startHealth: 10,
      startStress: 3
    },
    spouse: {
      id: 'spouse',
      role: 'Spouse',
      defaultName: 'Jordan',
      skills: {
        medical: {
          name: 'Medical',
          desc: 'Treat injuries, 2x medicine effectiveness.',
          effect: 'medicine_efficiency_2x'
        },
        mechanical: {
          name: 'Mechanical',
          desc: 'Build upgrades 50% faster, repair items.',
          effect: 'build_speed_1_5x'
        }
      },
      vulnerability: 'chronic_condition',
      vulnerabilityDesc: 'Needs 1 medicine every 5 days or health -1/day.',
      chronicMedInterval: 5,
      canAssign: true,
      startHealth: 10,
      startStress: 3
    },
    teen: {
      id: 'teen',
      role: 'Teen',
      defaultName: 'Casey',
      skill: 'scouting',
      skillDesc: 'Explores faster, finds bonus items 30% of the time.',
      bonusLootChance: 0.3,
      vulnerability: 'anxiety',
      vulnerabilityDesc: 'Stress rises 2x from security-related events.',
      securityStressMult: 2.0,
      canAssign: true,
      startHealth: 10,
      startStress: 3
    },
    elder: {
      id: 'elder',
      role: 'Elderly Parent',
      defaultName: 'Pat',
      skill: 'morale_anchor',
      skillDesc: 'Cohesion +0.5/day when healthy. Adds wisdom choices to events.',
      cohesionBonus: 0.5,
      vulnerability: 'fragile_health',
      vulnerabilityDesc: 'Illness events hit 2x harder.',
      illnessMult: 2.0,
      canAssign: false,
      canAssignPhysical: false,
      startHealth: 8,
      startStress: 3
    }
  },

  // ─── RECRUITABLE NPCs ───
  recruitableNPCs: {
    marcus: {
      id: 'marcus',
      name: 'Marcus',
      role: 'Neighbor',
      skill: 'security',
      skillDesc: '+2 security on watch duty.',
      securityBonus: 2,
      personality: 'controlling',
      personalityDesc: 'Demands input on decisions.',
      startTrust: 4,
      trustThreshold: 3, // below this: steals fuel and leaves
      canAssign: true,
      startHealth: 10,
      startStress: 4,
      recruitDay: { min: 7, max: 12 },
      recruitEvent: 'marcus_arrival',
      consumesFood: 1,
      consumesWater: 4
    },
    rivera: {
      id: 'rivera',
      name: 'The Riveras',
      role: 'Refugees',
      skill: 'agriculture',
      skillDesc: 'Can build garden. +0.5 food/day after 7 days.',
      gardenBonus: 0.5,
      personality: 'grateful',
      personalityDesc: 'If trust > 7, takes double watch shifts.',
      startTrust: 6,
      trustThreshold: 3,
      canAssign: true,
      startHealth: 8,
      startStress: 6,
      recruitDay: { min: 10, max: 18 },
      recruitEvent: 'rivera_arrival',
      consumesFood: 2,  // parent + child
      consumesWater: 8, // parent + child
      memberCount: 2
    }
  },

  // ─── TASKS ───
  tasks: {
    guard: {
      id: 'guard',
      name: 'Guard',
      desc: 'Stand watch over the house.',
      securityBonus: 1,
      stressCost: 0.5,
      physical: true
    },
    scavenge: {
      id: 'scavenge',
      name: 'Scavenge',
      desc: 'Search a location for supplies.',
      physical: true,
      removesForDay: true
    },
    forage: {
      id: 'forage',
      name: 'Forage / Garden',
      desc: 'Small reliable food gain if garden built.',
      physical: true,
      requiresGarden: false,
      foodGainBase: 0.3,
      foodGainGarden: 0.8
    },
    rest: {
      id: 'rest',
      name: 'Rest',
      desc: 'Recover health and reduce stress.',
      healthGain: 1,
      stressReduction: 1,
      physical: false
    },
    build: {
      id: 'build',
      name: 'Build / Repair',
      desc: 'Work on a shelter upgrade.',
      physical: true
    },
    trade: {
      id: 'trade',
      name: 'Trade',
      desc: 'Barter with NPCs if available.',
      physical: false,
      requiresNPC: true,
      visibilityIncrease: 1
    }
  },

  // ─── LOCATIONS ───
  locations: {
    home: {
      id: 'home',
      name: 'Your House',
      distance: 0,
      riskLevel: 'none',
      maxVisits: Infinity,
      description: 'The kitchen counter is covered in half-empty cans and a hand-drawn inventory list. Blankets are nailed over the front windows, letting in thin strips of daylight. The house smells like propane and stale cereal. This is home now, in a way it never was before.',
      scavengeable: false,
      alwaysAccessible: true
    },
    neighbor: {
      id: 'neighbor',
      name: "Neighbor's House",
      distance: 1,
      riskLevel: 'low',
      maxVisits: 5,
      description: "The Hendersons left two days after the grid went down, their SUV packed to the roof. Their back door swings on one hinge. Inside, the air is stale and warm. Family photos stare from the mantle. The pantry door is ajar, revealing shadowed shelves that haven't been fully cleared.",
      lootTable: [
        { item: 'canned_food', weight: 30, quantity: [1, 3] },
        { item: 'tools', weight: 20, quantity: [1, 1] },
        { item: 'medicine_basic', weight: 15, quantity: [1, 2] },
        { item: 'batteries', weight: 15, quantity: [1, 4] },
        { item: 'blankets', weight: 10, quantity: [1, 2] },
        { item: 'nothing', weight: 10, quantity: [0, 0] }
      ],
      depletedDesc: "The house has been picked clean. Drawers hang open, cabinets bare. There is nothing left here worth carrying.",
      encounters: ['neighbor_guilt', 'neighbor_squatter'],
      scavengeable: true,
      visibilityGain: 0
    },
    quikmart: {
      id: 'quikmart',
      name: 'QuikMart',
      distance: 2,
      riskLevel: 'medium',
      maxVisits: 6,
      description: "The QuikMart's automatic doors are jammed halfway open. Inside, most shelves have been swept clean, but a few toppled displays still hold scattered cans and cracker boxes. The floor is sticky with spilled soda. Somebody has spray-painted TAKEN on the register counter, though the claim seems optimistic given what remains.",
      lootTable: [
        { item: 'canned_food', weight: 25, quantity: [1, 2] },
        { item: 'water_bottles', weight: 20, quantity: [1, 3] },
        { item: 'batteries', weight: 15, quantity: [1, 3] },
        { item: 'snack_food', weight: 20, quantity: [1, 3] },
        { item: 'lighter', weight: 5, quantity: [1, 1] },
        { item: 'nothing', weight: 15, quantity: [0, 0] }
      ],
      depletedDesc: "The QuikMart is gutted. Bare shelving stretches in every direction, and the smell of spoiled dairy hangs in the warm air. Others have been here since your last visit.",
      encounters: ['store_scavengers', 'store_confrontation'],
      scavengeable: true,
      visibilityGain: 1
    },
    pharmacy: {
      id: 'pharmacy',
      name: 'Walgreens Pharmacy',
      distance: 2,
      riskLevel: 'high',
      maxVisits: 4,
      description: "The pharmacy doors hang open at an angle. Glass crunches under your boots. The front of the store has been ransacked, cosmetics and candy scattered across the tile. Behind the pharmacy counter, the real shelves stand in shadow. Some of the prescription bins have been pried open; others remain intact, their contents a question mark.",
      lootTable: [
        { item: 'medicine_basic', weight: 25, quantity: [1, 2] },
        { item: 'medicine_advanced', weight: 10, quantity: [1, 1] },
        { item: 'first_aid_kit', weight: 15, quantity: [1, 1] },
        { item: 'vitamins', weight: 15, quantity: [1, 2] },
        { item: 'rubbing_alcohol', weight: 10, quantity: [1, 2] },
        { item: 'bandages', weight: 15, quantity: [1, 3] },
        { item: 'nothing', weight: 10, quantity: [0, 0] }
      ],
      depletedDesc: "Every drawer behind the counter has been emptied. The shelves are bare, littered with torn packaging and pill organizer trays. The medicine is gone.",
      encounters: ['pharmacy_occupied', 'pharmacy_desperate_parent'],
      scavengeable: true,
      visibilityGain: 1
    },
    hardware: {
      id: 'hardware',
      name: 'Ace Hardware',
      distance: 2,
      riskLevel: 'medium',
      maxVisits: 6,
      description: "The hardware store sits behind a mostly intact storefront. Inside, the aisles still hold some order, though the camping and generator sections have been raided hard. Hammers, rope, and lumber remain in the back. The air smells like sawdust and WD-40. Heavy items here, but valuable ones.",
      lootTable: [
        { item: 'tools', weight: 20, quantity: [1, 2] },
        { item: 'fuel_can', weight: 10, quantity: [1, 1], heavy: true },
        { item: 'lumber', weight: 15, quantity: [1, 2], heavy: true },
        { item: 'tarps', weight: 15, quantity: [1, 2] },
        { item: 'rope', weight: 10, quantity: [1, 2] },
        { item: 'nails', weight: 15, quantity: [1, 3] },
        { item: 'wire', weight: 10, quantity: [1, 2] },
        { item: 'nothing', weight: 5, quantity: [0, 0] }
      ],
      depletedDesc: "The useful aisles have been stripped. Paint cans and decorative hardware remain, but anything practical for survival is gone.",
      encounters: ['hardware_trap', 'hardware_handyman'],
      scavengeable: true,
      visibilityGain: 1
    },
    creek: {
      id: 'creek',
      name: 'Millbrook Creek',
      distance: 3,
      riskLevel: 'low-medium',
      maxVisits: Infinity,
      description: "The creek runs shallow and clear over smooth stones, cutting through a wooded gully half a mile south of the neighborhood. Birdsong fills the canopy above. The water looks clean but you know better. With the right setup, this could be a lifeline. Cattails and wild onion grow along the muddy bank.",
      lootTable: [
        { item: 'water_unpurified', weight: 40, quantity: [2, 6] },
        { item: 'fish', weight: 20, quantity: [1, 2], requiresItem: 'fishing_line' },
        { item: 'wild_edibles', weight: 20, quantity: [1, 2] },
        { item: 'cattails', weight: 15, quantity: [1, 3] },
        { item: 'nothing', weight: 5, quantity: [0, 0] }
      ],
      depletedDesc: null,
      encounters: ['creek_stranger', 'creek_animal'],
      scavengeable: true,
      visibilityGain: 0
    },
    church: {
      id: 'church',
      name: 'First Baptist Church',
      distance: 2,
      riskLevel: 'variable',
      maxVisits: Infinity,
      description: "The church parking lot holds a half-dozen cars that haven't moved in days. Inside, the fellowship hall has become an informal gathering point. Folding tables hold dwindling community supplies. A hand-lettered sign reads INFORMATION BOARD beside a corkboard pinned with notes, missing-persons flyers, and a water purification diagram torn from a manual.",
      lootTable: [
        { item: 'information', weight: 30, quantity: [1, 1] },
        { item: 'morale_boost', weight: 25, quantity: [1, 1] },
        { item: 'trade_opportunity', weight: 25, quantity: [1, 1] },
        { item: 'canned_food', weight: 10, quantity: [1, 1] },
        { item: 'nothing', weight: 10, quantity: [0, 0] }
      ],
      depletedDesc: null,
      encounters: ['church_preacher', 'church_volunteer'],
      scavengeable: true,
      visibilityGain: 1
    },
    gasstation: {
      id: 'gasstation',
      name: 'Shell Gas Station',
      distance: 3,
      riskLevel: 'high',
      maxVisits: 4,
      description: "The gas station sits at the four-way intersection where traffic lights dangle dark. Someone has barricaded the front entrance with shopping carts and plywood. Around back, the service door is cracked. The air inside reeks of gasoline and something burned. Coolers line one wall, their contents warm and questionable. The underground tanks might still hold fuel, if you could access them.",
      lootTable: [
        { item: 'fuel_can', weight: 20, quantity: [1, 2], heavy: true },
        { item: 'propane', weight: 15, quantity: [1, 1], heavy: true },
        { item: 'snack_food', weight: 20, quantity: [1, 3] },
        { item: 'car_battery', weight: 10, quantity: [1, 1], heavy: true },
        { item: 'lighter', weight: 10, quantity: [1, 2] },
        { item: 'nothing', weight: 25, quantity: [0, 0] }
      ],
      depletedDesc: "The gas station has been claimed. A rough barricade blocks every entrance, and you can hear voices inside. This is not a place to linger.",
      encounters: ['gasstation_hostile', 'gasstation_siphon'],
      scavengeable: true,
      visibilityGain: 1
    },
    school: {
      id: 'school',
      name: 'Lincoln Elementary School',
      distance: 2,
      riskLevel: 'medium',
      maxVisits: 5,
      description: "The school building sits quiet, its playground equipment casting long shadows. The cafeteria entrance is unlocked. Inside, industrial shelving holds #10 cans of vegetables, bags of rice, and cases of juice boxes. The nurse's office is down the hall, and the art room next to it still has supplies on the tables. This is a significant find.",
      lootTable: [
        { item: 'bulk_food', weight: 25, quantity: [2, 4], heavy: true },
        { item: 'water_containers', weight: 15, quantity: [1, 2], heavy: true },
        { item: 'medicine_basic', weight: 15, quantity: [1, 2] },
        { item: 'art_supplies', weight: 10, quantity: [1, 2] },
        { item: 'juice_boxes', weight: 15, quantity: [1, 4] },
        { item: 'cleaning_supplies', weight: 10, quantity: [1, 2] },
        { item: 'nothing', weight: 10, quantity: [0, 0] }
      ],
      depletedDesc: "The cafeteria shelving stands empty. Even the juice boxes are gone. Someone else discovered this place.",
      encounters: ['school_family', 'school_cache'],
      scavengeable: true,
      visibilityGain: 1
    },
    woods: {
      id: 'woods',
      name: 'Pine Ridge Woods',
      distance: 4,
      riskLevel: 'medium',
      maxVisits: Infinity,
      description: "The trail into Pine Ridge climbs through dense pine and oak, the air cool and sharp with resin. Deadfall branches litter the ground in every direction. Squirrels chatter warnings overhead. Game trails cross the human path in several places. Deep in, past the second creek crossing, the forest opens to a clearing where someone once built a fire ring from river stones.",
      lootTable: [
        { item: 'firewood', weight: 30, quantity: [2, 4] },
        { item: 'wild_edibles', weight: 20, quantity: [1, 3] },
        { item: 'small_game', weight: 15, quantity: [1, 1], requiresItem: 'snare' },
        { item: 'herbs', weight: 10, quantity: [1, 2] },
        { item: 'geocache', weight: 3, quantity: [1, 1], oneTime: true },
        { item: 'nothing', weight: 22, quantity: [0, 0] }
      ],
      depletedDesc: null,
      encounters: ['woods_hunter', 'woods_camp'],
      scavengeable: true,
      visibilityGain: 0
    }
  },

  // ─── ITEMS ───
  items: {
    // Food items
    canned_food:      { name: 'Canned Food', type: 'food', foodValue: 1.5, weight: 1, foodType: 'canned', desc: 'Assorted cans of beans, soup, and vegetables.' },
    bulk_food:        { name: 'Bulk Food', type: 'food', foodValue: 3, weight: 2, foodType: 'canned', desc: 'Large institutional cans of vegetables and rice.' },
    snack_food:       { name: 'Snack Food', type: 'food', foodValue: 0.5, weight: 1, foodType: 'snack', desc: 'Chips, crackers, and candy bars.' },
    fish:             { name: 'Fresh Fish', type: 'food', foodValue: 1, weight: 1, foodType: 'fresh', desc: 'Freshly caught creek fish.' },
    wild_edibles:     { name: 'Wild Edibles', type: 'food', foodValue: 0.5, weight: 1, foodType: 'foraged', desc: 'Dandelion greens, wild onion, edible berries.' },
    cattails:         { name: 'Cattail Roots', type: 'food', foodValue: 0.3, weight: 1, foodType: 'foraged', desc: 'Starchy roots pulled from the creek bank.' },
    small_game:       { name: 'Small Game', type: 'food', foodValue: 2, weight: 1, foodType: 'fresh', desc: 'A rabbit or squirrel, field dressed.' },
    juice_boxes:      { name: 'Juice Boxes', type: 'food', foodValue: 0.3, weight: 1, foodType: 'snack', desc: 'Cases of apple juice from the school cafeteria.' },

    // Water items
    water_bottles:    { name: 'Water Bottles', type: 'water', waterValue: 2, weight: 1, desc: 'Sealed bottles of drinking water.' },
    water_unpurified: { name: 'Creek Water', type: 'water_raw', waterValue: 0, weight: 1, desc: 'Unpurified water. Must be boiled or filtered before drinking.' },
    water_containers: { name: 'Water Containers', type: 'water', waterValue: 5, weight: 2, desc: 'Large containers of water from the school kitchen.' },

    // Medicine items
    medicine_basic:   { name: 'Basic Medicine', type: 'medicine', medicineValue: 1, weight: 1, desc: 'Over-the-counter painkillers and cold medicine.' },
    medicine_advanced:{ name: 'Prescription Medicine', type: 'medicine', medicineValue: 2, weight: 1, desc: 'Antibiotics and prescription-strength medication.' },
    first_aid_kit:    { name: 'First Aid Kit', type: 'medicine', medicineValue: 2, weight: 1, desc: 'Bandages, antiseptic, gauze, and medical tape.' },
    vitamins:         { name: 'Vitamins', type: 'medicine', medicineValue: 0.5, weight: 1, desc: 'Multivitamins and supplements.' },
    bandages:         { name: 'Bandages', type: 'medicine', medicineValue: 0.5, weight: 1, desc: 'Rolls of gauze and adhesive bandages.' },
    rubbing_alcohol:  { name: 'Rubbing Alcohol', type: 'medicine', medicineValue: 0.5, weight: 1, desc: 'Isopropyl alcohol for disinfection.' },
    herbs:            { name: 'Medicinal Herbs', type: 'medicine', medicineValue: 0.5, weight: 1, desc: 'Wild yarrow, plantain, and chamomile.' },

    // Fuel items
    fuel_can:         { name: 'Fuel Can', type: 'fuel', fuelValue: 3, weight: 2, desc: 'A 2-gallon can of gasoline.' },
    propane:          { name: 'Propane Tank', type: 'fuel', fuelValue: 4, weight: 2, desc: 'A small propane tank for cooking or heating.' },
    car_battery:      { name: 'Car Battery', type: 'material', weight: 2, desc: 'A 12-volt car battery with some charge remaining.' },
    firewood:         { name: 'Firewood', type: 'fuel', fuelValue: 1, weight: 1, desc: 'Dry hardwood branches, good for burning.' },

    // Materials (for upgrades)
    tools:            { name: 'Tools', type: 'material', weight: 1, desc: 'Hammers, screwdrivers, wrenches, and pliers.' },
    lumber:           { name: 'Lumber', type: 'material', weight: 2, desc: 'Boards and planks suitable for construction.' },
    tarps:            { name: 'Tarps', type: 'material', weight: 1, desc: 'Heavy-duty waterproof tarps.' },
    rope:             { name: 'Rope', type: 'material', weight: 1, desc: 'Fifty-foot coils of nylon rope.' },
    nails:            { name: 'Nails', type: 'material', weight: 1, desc: 'Boxes of assorted nails and screws.' },
    wire:             { name: 'Wire', type: 'material', weight: 1, desc: 'Spools of copper and steel wire.' },
    batteries:        { name: 'Batteries', type: 'material', weight: 1, desc: 'AA and D-cell batteries.' },
    lighter:          { name: 'Lighter', type: 'material', weight: 1, desc: 'Disposable butane lighters.' },

    // Special items
    solar_panel:      { name: 'Solar Panel', type: 'material', weight: 2, desc: 'A small portable solar panel.' },
    electronics:      { name: 'Electronics', type: 'material', weight: 1, desc: 'Circuit boards, transistors, and capacitors.' },
    seeds:            { name: 'Seeds', type: 'material', weight: 1, desc: 'Packets of vegetable seeds.' },
    sand:             { name: 'Sand', type: 'material', weight: 1, desc: 'Clean sand for water filtration.' },
    charcoal:         { name: 'Charcoal', type: 'material', weight: 1, desc: 'Charcoal briquettes or wood charcoal.' },
    container:        { name: 'Large Container', type: 'material', weight: 1, desc: 'A large bucket or barrel.' },
    buckets:          { name: 'Buckets', type: 'material', weight: 1, desc: 'Five-gallon plastic buckets.' },
    fishing_line:     { name: 'Fishing Line & Hooks', type: 'material', weight: 1, desc: 'Monofilament line and assorted hooks.' },
    snare:            { name: 'Snare Kit', type: 'material', weight: 1, desc: 'Wire snares for small game.' },
    cans_empty:       { name: 'Empty Cans', type: 'material', weight: 1, desc: 'Cleaned tin cans for the alarm system.' },
    light_source:     { name: 'Light Source', type: 'material', weight: 1, desc: 'A working flashlight or lantern.' },
    table:            { name: 'Folding Table', type: 'material', weight: 2, desc: 'A sturdy folding table.' },
    cleaning_supplies:{ name: 'Cleaning Supplies', type: 'material', weight: 1, desc: 'Bleach, soap, and disinfectant.' },
    art_supplies:     { name: 'Art Supplies', type: 'morale', weight: 1, moraleValue: 1, desc: 'Crayons, paper, and paint from the school.' },

    // Special quest items
    geocache:         { name: 'Geocache', type: 'special', weight: 1, desc: 'A waterproof container hidden in the woods. Inside: water purification tablets, a folding knife, emergency blanket, and 3 days of freeze-dried food.', contains: { food: 3, medicine: 1, water: 4 } },
    blankets:         { name: 'Blankets', type: 'morale', weight: 1, moraleValue: 0.5, desc: 'Warm blankets and quilts.' },

    // Abstract items from church
    information:      { name: 'Information', type: 'info', weight: 0, desc: 'Useful intelligence gathered from the community.' },
    morale_boost:     { name: 'Morale Boost', type: 'morale', weight: 0, moraleValue: 1, desc: 'Social contact and a sense of community.' },
    trade_opportunity:{ name: 'Trade Opportunity', type: 'trade', weight: 0, desc: 'A contact willing to barter goods.' }
  },

  // ─── SHELTER UPGRADES ───
  upgrades: {
    rain_collection: {
      id: 'rain_collection',
      name: 'Rain Collection System',
      desc: '+2 gal water/day (weather dependent)',
      materials: { tarps: 1, buckets: 1 },
      laborDays: 2,
      effect: { waterPerDay: 2 },
      weatherDependent: true,
      visible: false
    },
    water_filter: {
      id: 'water_filter',
      name: 'DIY Water Filter',
      desc: 'Purify creek water without fuel',
      materials: { sand: 1, charcoal: 1, container: 1 },
      laborDays: 1,
      effect: { purifyWithoutFuel: true },
      visible: false
    },
    garden: {
      id: 'garden',
      name: 'Garden Plot',
      desc: '+0.5 food/day starting 7 days after build',
      materials: { seeds: 1, tools: 1 },
      laborDays: 3,
      effect: { foodPerDay: 0.5, delayDays: 7 },
      visible: false
    },
    perimeter_alarm: {
      id: 'perimeter_alarm',
      name: 'Perimeter Alarm',
      desc: 'Security +1, early warning on intrusions. Prevents visibility from visible upgrades.',
      materials: { wire: 1, cans_empty: 1 },
      laborDays: 1,
      effect: { securityPassive: 1, earlyWarning: true, preventsUpgradeVisibility: true },
      visible: true
    },
    reinforced_doors: {
      id: 'reinforced_doors',
      name: 'Reinforced Doors',
      desc: 'Security +2 passive',
      materials: { lumber: 1, tools: 1, nails: 1 },
      laborDays: 2,
      effect: { securityPassive: 2 },
      visible: true
    },
    medical_station: {
      id: 'medical_station',
      name: 'Medical Station',
      desc: 'Medicine 2x effective',
      materials: { first_aid_kit: 1, table: 1, light_source: 1 },
      laborDays: 1,
      effect: { medicineEfficiency: 2 },
      visible: false
    },
    radio_antenna: {
      id: 'radio_antenna',
      name: 'Radio Antenna',
      desc: 'Unlock information events, receive weather forecasts',
      materials: { wire: 1, electronics: 1, batteries: 1 },
      laborDays: 1,
      effect: { unlockInfoEvents: true, weatherForecast: true },
      visible: false
    },
    solar_charger: {
      id: 'solar_charger',
      name: 'Solar Charger',
      desc: 'Fuel consumption -50% for electronics/light',
      materials: { solar_panel: 1, batteries: 1, wire: 1 },
      laborDays: 2,
      effect: { fuelReduction: 0.5 },
      visible: false
    }
  },

  // ─── RATION SETTINGS ───
  rationSettings: [
    { id: 'normal', name: 'Normal Rations', foodMult: 1.0, desc: 'Full meals. No stress impact.' },
    { id: 'tight', name: 'Tight Rations', foodMult: 0.5, desc: 'Reduced portions. Stress +0.5/day.' },
    { id: 'survival', name: 'Survival Rations', foodMult: 0.3, desc: 'Bare minimum. Stress +1/day, health -0.5/day.' }
  ],

  // ─── WATER SETTINGS ───
  waterSettings: [
    { id: 'conservation', name: 'Water Conservation', waterMult: 2, desc: 'Drinking only. Stress +0.5/day. Health risk.' },
    { id: 'normal', name: 'Normal Water Use', waterMult: 4, desc: 'Drinking and basic hygiene.' },
    { id: 'hygiene', name: 'Full Hygiene', waterMult: 6, desc: 'Drinking, cooking, and bathing. Stress -0.3/day.' }
  ],

  // ─── FUEL SETTINGS ───
  fuelSettings: [
    { id: 'off', name: 'Generator Off', fuelMult: 0, desc: 'No fuel usage. No power.' },
    { id: 'generator', name: 'Generator (Minimal)', fuelMult: 0.5, desc: 'Lights and charging. Stress -0.3/day.' },
    { id: 'heating', name: 'Generator + Heating', fuelMult: 1.0, desc: 'Full power. Stress -0.5/day. Health +0.5/day.' }
  ],

  // ─── VISIBILITY ───
  visibility: {
    start: 2,
    max: 10,
    revealThreshold: 5,
    confrontationThreshold: 7,
    dailyThreatThreshold: 9,
    decayRate: 0.2, // -1 per 5 days with no external interaction
    confrontationWindow: 3 // days after hitting 7
  },

  // ─── WIN/LOSE CONDITIONS ───
  winConditions: {
    rescued: {
      id: 'rescued',
      name: 'Rescued',
      desc: 'Survive 30 days with 2+ family members alive and cohesion > 3.',
      check: (state) => state.day >= 30 && state.aliveFamily >= 2 && state.cohesion > 3
    },
    selfsufficient: {
      id: 'selfsufficient',
      name: 'Self-Sufficient',
      desc: 'Day 30 with garden + water system + security > 6 + 3+ group members alive.',
      check: (state) => state.day >= 30 && state.hasGarden && state.hasWaterSystem && state.security > 6 && state.aliveTotal >= 3
    },
    evacuated: {
      id: 'evacuated',
      name: 'Evacuated',
      desc: 'Day 20+: 5+ gal fuel, 7+ days food, vehicle access.',
      check: (state) => state.day >= 20 && state.fuel >= 5 && state.food >= 7 && state.hasVehicle
    }
  },

  loseConditions: {
    fracture: {
      id: 'fracture',
      name: 'Group Fracture',
      desc: 'Cohesion hits 0 while any character stress > 8.'
    },
    death: {
      id: 'death',
      name: 'Total Loss',
      desc: 'All characters dead.'
    },
    deprivation: {
      id: 'deprivation',
      name: 'Deprivation',
      desc: 'Food AND water at 0 for 2 consecutive days.'
    }
  },

  // ─── SCORING ───
  scoring: {
    daysSurvived: { max: 30, perDay: 1 },
    charactersAlive: { perChar: 10, max: 60 },
    npcsHelped: { perNPC: 5 },
    upgradesCompleted: { perUpgrade: 3 },
    generosity: { max: 20 },
    moralChoices: { max: 20 },
    grades: [
      { grade: 'S', min: 140 },
      { grade: 'A', min: 120 },
      { grade: 'B', min: 90 },
      { grade: 'C', min: 60 },
      { grade: 'D', min: 30 },
      { grade: 'F', min: 0 }
    ]
  },

  // ─── MAJOR DECISION EVENTS (every 5 days) ───
  majorEvents: [
    {
      id: 'major_day5',
      day: 5,
      title: 'The Knock at the Door',
      category: 'stranger',
      description: "A sharp knock at the front door echoes through the quiet house. Through the peephole, you see your neighbor from three streets over, Mrs. Chen, standing on the porch with her two grandchildren. The children look pale and thin. Mrs. Chen's voice is steady but strained: she ran out of food yesterday, and the grandchildren need water.",
      choices: [
        {
          text: 'Give them 2 days of food and 4 gallons of water',
          result: "Mrs. Chen's eyes fill with tears as you hand over the supplies. The children grab the water bottles with trembling hands. She promises to send her son-in-law to help if he makes it back from the city. The children wave from the sidewalk as they leave.",
          effects: { food: -2, water: -4, cohesion: 1, visibility: 1, morality: 2, generosity: 2 },
          condition: (state) => state.food >= 2 && state.water >= 4
        },
        {
          text: 'Give them a small amount — 1 day of food',
          result: "You hand over a bag of canned goods. It is not much, but it is something. Mrs. Chen nods, her expression guarded. The older grandchild stares at you as they leave, and you are not sure what they see in your face.",
          effects: { food: -1, cohesion: 0.5, visibility: 0.5, morality: 1, generosity: 1 }
        },
        {
          text: 'Turn them away — you cannot afford to share',
          result: "You tell Mrs. Chen through the door that you barely have enough for your own family. The silence that follows is worse than any argument. You hear the children's footsteps recede down the walkway. Your family says nothing at dinner, but the teen stares at the table.",
          effects: { cohesion: -1, morality: -1 },
          stressEffects: { teen: 1 }
        },
        {
          text: 'Offer to trade — food for labor or information',
          result: "Mrs. Chen considers for a moment, then agrees. She tells you about a stash of bottled water in the school nurse's office that nobody has found yet. You hand over a day of food. Information in this world may be worth more than calories.",
          effects: { food: -1, visibility: 0.5, morality: 0, generosity: 1 },
          special: 'school_bonus_loot'
        }
      ]
    },
    {
      id: 'major_day10',
      day: 10,
      title: 'The Armed Demand',
      category: 'security',
      description: "Three men stand at the end of your driveway in the gray morning light. They are not neighbors. The one in front carries a hunting rifle slung over his shoulder and speaks with rehearsed authority: their group is collecting a 'community contribution' from every house in the area. Food, fuel, or medicine. They will be back tomorrow for your answer.",
      choices: [
        {
          text: 'Agree to pay tribute — 3 days of food',
          result: "You set the cans on the porch the next morning and watch from the window as the man with the rifle loads them into a shopping cart. They move on to the next house. It feels like extortion, but they leave without incident. For now.",
          effects: { food: -3, visibility: 1, morality: -1 },
          special: 'tribute_track'
        },
        {
          text: 'Refuse and reinforce — board up and prepare',
          result: "You tell them through the window that you have nothing to spare. The lead man stares at the house for a long moment, then turns away. Your family spends the rest of the day moving furniture against doors and filling containers. The tension in the house is thick enough to taste.",
          effects: { cohesion: -0.5, visibility: 1 },
          stressEffects: { all: 2 },
          special: 'security_threat_increase'
        },
        {
          text: 'Negotiate — offer fuel instead of food',
          result: "You meet them on the porch with two gallons of gas. The lead man weighs the cans, then nods. Fuel is harder to find than food right now, and he knows it. They seem satisfied. You have bought time, but you wonder at what cost.",
          effects: { fuel: -2, visibility: 1, morality: 0 },
          condition: (state) => state.fuel >= 2
        },
        {
          text: 'Bluff — pretend to be armed and dangerous',
          result: "You rack a shell in the old shotgun loudly enough for them to hear through the door. You tell them your family is armed and trained. The lead man studies the house, weighing odds. After a long pause, they back off the property. Whether this bought safety or made enemies, you cannot tell.",
          effects: { visibility: 2 },
          stressEffects: { all: 1 },
          special: 'bluff_consequence',
          condition: (state) => true
        }
      ]
    },
    {
      id: 'major_day15',
      day: 15,
      title: 'The Radio Broadcast',
      category: 'information',
      description: "Static gives way to a clear voice on the AM band. A woman identifies herself as part of FEMA Region IV and reads a prepared statement: relief convoys are staging two counties north, but roads are blocked by abandoned vehicles and downed infrastructure. Estimated arrival to your area: 10 to 20 days. She repeats the message three times, then the signal fades back to static.",
      choices: [
        {
          text: 'Share the news with the family — honest assessment',
          result: "You gather everyone and relay the broadcast exactly as you heard it. Ten to twenty days could mean rescue by Day 25 or Day 35. The uncertainty is its own weight, but at least there is a timeline now. The teen sits up straighter. Even Pat looks more alert.",
          effects: { cohesion: 1 },
          stressEffects: { all: -1 }
        },
        {
          text: 'Share it optimistically — emphasize the 10-day estimate',
          result: "You tell the family that help is coming in about ten days. You see the relief wash through the room like a physical thing. Shoulders drop, someone laughs for the first time in a week. You keep the twenty-day possibility to yourself. Hope is a resource too.",
          effects: { cohesion: 1.5 },
          stressEffects: { all: -2 },
          special: 'false_hope'
        },
        {
          text: 'Keep it to yourself for now',
          result: "You turn off the radio and sit with the information. If rescue does not come in ten days, the disappointment could break what is left of morale. Better to plan around self-sufficiency and let rescue be a surprise. The weight of the secret sits behind your sternum.",
          effects: {},
          stressEffects: { player: 2 }
        },
        {
          text: 'Share it with the church community',
          result: "You make the trip to First Baptist and share the broadcast with whoever will listen. The effect is electric — people start organizing, pooling resources, making plans. Pastor Jennings asks if you will help coordinate the neighborhood response. Your profile in the community rises sharply.",
          effects: { cohesion: 0.5, visibility: 2, morality: 1 },
          stressEffects: { all: -1 },
          special: 'community_leader'
        }
      ]
    },
    {
      id: 'major_day20',
      day: 20,
      title: 'The Evacuation Decision',
      category: 'resource',
      description: "A family two blocks over packed their van at dawn and headed north toward the rumored FEMA staging area. You watched them go from the upstairs window. The roads are uncertain — reports of blockages, desperate people, and at least one bridge out. But staying means ten more days of dwindling supplies and rising tension. The van in the garage has a quarter tank and room for everyone.",
      choices: [
        {
          text: 'Stay the course — hunker down for the remaining days',
          result: "You tell the family you are staying. This house, these walls, the systems you have built — this is where you make your stand. The teen argues, but your spouse backs you. Ten more days. You have made it this far.",
          effects: { cohesion: 0.5 },
          stressEffects: { teen: 1 }
        },
        {
          text: 'Prepare to evacuate — start staging supplies for the road',
          result: "You start loading the van. Food, water, medicine, fuel — every gallon and can counts now. The family moves with purpose for the first time in days. You will leave at first light tomorrow, heading north on back roads.",
          effects: {},
          special: 'evacuation_prep',
          condition: (state) => state.fuel >= 5 && state.food >= 7
        },
        {
          text: 'Send the teen to scout the route first',
          result: "You send the teen north on a bicycle with instructions to check the first five miles and report back. They return by afternoon with useful intelligence: the main road is blocked at the overpass, but the old farm road through Millbrook is clear as far as they could see. The teen is winded but proud.",
          effects: {},
          stressEffects: { teen: 1 },
          special: 'route_scouted'
        },
        {
          text: 'Propose splitting up — send strongest members for help',
          result: "The suggestion lands like a grenade. Your spouse stares at you. The elder sits very still. The teen says nothing, which is worse. You lay out the logic: a small, fast group could reach the staging area in two days and send help back. Nobody agrees, but nobody can offer a better plan.",
          effects: { cohesion: -2 },
          stressEffects: { all: 2 }
        }
      ]
    },
    {
      id: 'major_day25',
      day: 25,
      title: 'The Final Push',
      category: 'morale',
      description: "Five days left. You can feel the finish line, but so can everyone else, and the fraying is accelerating. The food situation is what it is. Water is what it is. The elder has been quiet for two days, and the teen sleeps in fits. Your spouse catches your eye across the dim kitchen and mouths the words: almost there.",
      choices: [
        {
          text: 'Organize a family council — address everything openly',
          result: "You sit everyone down and lay it all out: what you have, what you need, how many days remain. No spin, no optimism. The honesty is bracing. Pat speaks up with a story about waiting out a hurricane in 1989. The teen rolls their eyes, then leans closer to listen. Something shifts. Not fixed, but acknowledged.",
          effects: { cohesion: 2 },
          stressEffects: { all: -1 }
        },
        {
          text: 'Sacrifice your own comfort — give extra rations to others',
          result: "You start taking smaller portions, standing watch during the cold hours, taking the tasks nobody wants. Your family notices even when you try to hide it. The teen brings you a blanket without being asked. Your body is paying the price, but the group holds.",
          effects: { cohesion: 1.5, morality: 2 },
          stressEffects: { player: 2 },
          healthEffects: { player: -1 }
        },
        {
          text: 'Make a final scavenging push — one big run',
          result: "You plan the most ambitious run yet: the pharmacy for medicine, the hardware store for anything remaining, the creek for water. It will take all day and most of the available hands. The risk is real, but five days of supplies would end the uncertainty.",
          effects: {},
          special: 'final_scavenge'
        },
        {
          text: 'Focus on security — the last days are the most dangerous',
          result: "You lock everything down. No unnecessary trips. No lights after dark. Every entry point reinforced, every noise investigated. The house becomes a fortress and a pressure cooker at the same time. But no one gets in.",
          effects: { visibility: -1 },
          stressEffects: { all: 1 },
          special: 'lockdown_mode'
        }
      ]
    },
    {
      id: 'marcus_recruitment',
      day: -1, // dynamically assigned day 7-12
      title: 'The Veteran Next Door',
      category: 'stranger',
      prereq: (state) => !state.npcs.marcus && state.day >= 7 && state.day <= 12,
      description: "Marcus Cole appears at your back fence, one hand raised in a careful greeting. He is your neighbor from two houses down — ex-Army, kept to himself before the grid went down. His house was broken into last night while he was sleeping. They took everything except what he could grab on the way out. He stands there with a military surplus backpack, a flashlight, and his pride.",
      choices: [
        {
          text: 'Welcome him in — you could use the help',
          result: "Marcus nods once, the kind of nod that means more than a handshake. He drops his pack in the corner of the living room and immediately starts assessing your defenses. Within an hour he has identified three blind spots in your perimeter. He is not easy to be around, but he is competent.",
          effects: { visibility: 1, cohesion: -0.5 },
          special: 'recruit_marcus'
        },
        {
          text: 'Offer temporary shelter — one week, then reassess',
          result: "Marcus accepts the terms without argument. He sleeps by the back door and keeps watch without being asked. By the third night, you notice the teen sleeping more soundly. Marcus has that effect — a kind of grim reassurance that someone is standing guard who has done it before.",
          effects: {},
          special: 'recruit_marcus_temp'
        },
        {
          text: 'Turn him away — you cannot take on another mouth to feed',
          result: "Marcus looks at you for a long moment. He does not argue. He shoulders his pack and walks back the way he came, moving with the careful awareness of someone who expects to be followed. You watch him disappear around the corner and wonder whether you just lost an ally or shed a liability.",
          effects: { morality: -1 }
        }
      ]
    },
    {
      id: 'rivera_recruitment',
      day: -1, // dynamically assigned day 10-18
      title: 'The Refugees',
      category: 'stranger',
      prereq: (state) => !state.npcs.rivera && state.day >= 10 && state.day <= 18,
      description: "You hear them before you see them: a child crying, and a parent trying to soothe. Sofia Rivera and her daughter Lucia stand at the end of your driveway, exhausted. Sofia's hands are dirt-stained and capable-looking. She tells you they walked six miles from the apartments by the highway after the building manager locked everyone out. She is a landscaper by trade and knows how to make things grow. Lucia is maybe seven, clutching a stuffed rabbit.",
      choices: [
        {
          text: 'Take them in — the child settles it',
          result: "Lucia falls asleep on the couch within minutes of coming inside. Sofia sits at the kitchen table and lays out what she can offer: she has seeds in her pack, knowledge of edible plants, and she is not afraid of hard work. She meets your eyes directly. Two more mouths, but two more hands.",
          effects: { food: -1, water: -2, cohesion: 0.5, morality: 2, generosity: 2 },
          special: 'recruit_rivera'
        },
        {
          text: 'Offer one night and supplies for the road',
          result: "Sofia accepts with dignity. She puts Lucia to bed and spends the evening telling you about every edible plant within a mile radius, as if paying for the shelter with information. In the morning she packs the food you gave her and leads Lucia back out into the uncertain world. You notice she left the seed packets on the counter.",
          effects: { food: -1, morality: 1, generosity: 1 },
          special: 'rivera_seeds'
        },
        {
          text: 'Direct them to the church — they have resources',
          result: "Sofia nods and takes Lucia's hand. You give them directions and watch them walk south toward First Baptist. The child looks back once. You tell yourself the church can help them better than you can, and maybe that is even true.",
          effects: { morality: 0 }
        }
      ]
    }
  ],

  // ─── DAILY EVENTS (62+ events across 8 categories) ───
  events: [

    // ─── WEATHER EVENTS (8) ───
    {
      id: 'weather_01',
      category: 'weather',
      dayRange: [1, 30],
      prereq: null,
      title: 'Heavy Rain',
      description: "Rain hammers the roof in sheets, turning the gutters into waterfalls. The yard is a shallow lake by noon. The sound is relentless, and the windows fog with condensation.",
      choices: [
        {
          text: 'Set out every container to collect rainwater',
          result: "You line the porch and yard with pots, buckets, and Tupperware. By evening you have collected several gallons of reasonably clean water. The house smells like wet earth.",
          effects: { water: 3 }
        },
        {
          text: 'Check the house for leaks and reinforce weak spots',
          result: "You find two leaks in the upstairs bedroom and one in the garage. An hour with towels and tarps keeps the damage manageable. Prevention is cheaper than repair.",
          effects: {}
        }
      ]
    },
    {
      id: 'weather_02',
      category: 'weather',
      dayRange: [1, 30],
      prereq: null,
      title: 'Oppressive Heat',
      description: "The thermometer in the shade reads 97 degrees. Without air conditioning, the house is a slow oven. The kids are listless, the elder is flushed. Even the tap water is warm.",
      choices: [
        {
          text: 'Use extra water for cooling — wet towels, cold compresses',
          result: "You soak towels and drape them over everyone. The elder revives visibly. It costs water, but heatstroke would cost more.",
          effects: { water: -2 },
          stressEffects: { all: -0.5 }
        },
        {
          text: 'Run the generator for the fan',
          result: "The small box fan moves enough air to drop the temperature from miserable to merely uncomfortable. The generator hums outside, drinking fuel.",
          effects: { fuel: -1 },
          stressEffects: { all: -1 },
          condition: (state) => state.fuel >= 1
        },
        {
          text: 'Endure it — conserve resources',
          result: "You sit in the darkest room and wait for evening. The heat is a weight on everything: tempers, energy, patience. The teen snaps at the elder. Nobody sleeps well.",
          effects: {},
          stressEffects: { all: 1 }
        }
      ]
    },
    {
      id: 'weather_03',
      category: 'weather',
      dayRange: [3, 30],
      prereq: null,
      title: 'Cold Snap',
      description: "The temperature drops sharply overnight. Frost rims the inside of the windows by morning. Breath hangs visible in every room. The house has never felt so large and so exposed.",
      choices: [
        {
          text: 'Run the generator for heat',
          result: "Warmth seeps through the house within the hour. Everyone gravitates to the living room, and for a moment the evening feels almost normal. The fuel gauge drops steadily.",
          effects: { fuel: -1.5 },
          stressEffects: { all: -1 },
          condition: (state) => state.fuel >= 1.5
        },
        {
          text: 'Bundle up with blankets and share body heat',
          result: "You pile every blanket and sleeping bag into the living room and huddle together. It is uncomfortable but survivable. The elder shivers despite the layers.",
          effects: {},
          stressEffects: { all: 0.5 },
          healthEffects: { elder: -0.5 }
        },
        {
          text: 'Burn firewood if you have any',
          result: "The fireplace crackles to life, filling the room with warmth and the smell of wood smoke. The smoke from the chimney is visible for blocks, but tonight that feels like an acceptable trade.",
          effects: { visibility: 0.5 },
          stressEffects: { all: -1 },
          condition: (state) => state.inventory && state.inventory.firewood > 0,
          inventoryCost: { firewood: 1 }
        }
      ]
    },
    {
      id: 'weather_04',
      category: 'weather',
      dayRange: [5, 25],
      prereq: null,
      title: 'Thunderstorm',
      description: "Lightning splits the sky in continuous flashes. Thunder rattles the dishes. The power was already out, but somehow the darkness during the storm feels deeper. The teen counts seconds between flash and boom, each interval shorter than the last.",
      choices: [
        {
          text: 'Use the storm as cover to collect water unobserved',
          result: "Nobody is watching in this weather. You set out containers and collect a good amount of rainwater while the storm masks any activity. Soaked to the bone, but productive.",
          effects: { water: 4 }
        },
        {
          text: 'Stay inside and use the time for group maintenance',
          result: "You gather the family and take inventory, mend clothing, and organize supplies. The storm provides a strange sense of shelter — nobody is coming to the door in this weather. The elder tells stories about storms they remember. Cohesion holds.",
          effects: { cohesion: 0.5 },
          stressEffects: { all: -0.5 }
        }
      ]
    },
    {
      id: 'weather_05',
      category: 'weather',
      dayRange: [1, 30],
      prereq: null,
      title: 'Fog',
      description: "A thick fog rolls in before dawn and refuses to lift. Visibility beyond the front yard drops to nothing. The world shrinks to the dimensions of your property, the silence broken only by distant, unidentifiable sounds.",
      choices: [
        {
          text: 'Use the cover to make a quick scavenging trip nearby',
          result: "The fog hides your movement as effectively as darkness, with better footing. You make a quick trip to the closest location and return unseen. The neighbor's dog barks at shadows but not at you.",
          effects: { visibility: -0.5 },
          special: 'fog_scavenge_bonus'
        },
        {
          text: 'Stay home — fog makes you blind too',
          result: "You lock the doors and wait. Every sound in the fog could be anything. The family sits in tense quiet, listening to footsteps that may or may not be real.",
          effects: {},
          stressEffects: { all: 0.5 }
        }
      ]
    },
    {
      id: 'weather_06',
      category: 'weather',
      dayRange: [7, 30],
      prereq: null,
      title: 'Wind Storm',
      description: "Wind howls through the neighborhood at sustained forty miles per hour, ripping shingles and sending trash tumbling down the street. A branch crashes onto the carport. The house groans and shudders under each gust.",
      choices: [
        {
          text: 'Secure the house — cover windows, anchor loose items',
          result: "You spend two hours battening down. The carport loses another section of roof, but the house holds. The preparation was worth the effort.",
          effects: {}
        },
        {
          text: 'Check for damage and salvage blown debris',
          result: "A tarp from someone's roof has blown into your yard. Two plastic containers and a length of PVC pipe roll against the fence. You collect them quickly before the wind takes them further.",
          effects: {},
          special: 'salvage_materials'
        }
      ]
    },
    {
      id: 'weather_07',
      category: 'weather',
      dayRange: [10, 30],
      prereq: (state) => state.upgrades.rain_collection,
      title: 'Three-Day Drizzle',
      description: "A light, persistent rain settles in with no sign of stopping. Not dramatic enough to worry about, but steady. The rain collection system catches a slow, constant stream. Everything outside turns to mud.",
      choices: [
        {
          text: 'Maximize collection — redirect gutters to your containers',
          result: "You rig the remaining gutters to feed directly into your collection barrels. The persistent drizzle adds up over the day. Water security improves measurably.",
          effects: { water: 5 }
        },
        {
          text: 'Use the rain day for indoor projects',
          result: "A day of enforced indoor time turns productive. You organize supplies, work on an upgrade, and the elder teaches the teen a card game with a battered deck. The house feels almost peaceful.",
          effects: { cohesion: 0.5 },
          stressEffects: { all: -0.5 }
        }
      ]
    },
    {
      id: 'weather_08',
      category: 'weather',
      dayRange: [15, 30],
      prereq: null,
      title: 'Clear Skies',
      description: "A perfect day. Blue sky, mild temperature, light breeze. It feels cruel, in a way — the world looks beautiful and normal, and none of the normal things work. Birds sing in the oak tree like nothing has changed.",
      choices: [
        {
          text: 'Take advantage — do laundry, air out the house, boost morale',
          result: "You open every window. Blankets and clothes hang on improvised lines in the yard. The fresh air changes the atmosphere inside the house. The teen sits on the porch steps and lets the sun hit their face. It is a small thing, but small things are currency now.",
          effects: { cohesion: 0.5 },
          stressEffects: { all: -1 }
        },
        {
          text: 'Use the good weather for an extended scavenging trip',
          result: "Clear skies mean clear sight lines in both directions. You plan a longer route than usual, hitting two locations in a single trip. The daylight gives you time and confidence.",
          effects: {},
          special: 'extended_scavenge'
        }
      ]
    },

    // ─── MEDICAL EVENTS (8) ───
    {
      id: 'medical_01',
      category: 'medical',
      dayRange: [3, 30],
      prereq: null,
      title: 'Stomach Bug',
      description: "Someone wakes up vomiting at 3 AM. Within hours, the cramping and nausea spread to a second family member. Whether it was the water, the food, or just stress, the result is the same: two people down, and your medicine supply is the only line of defense.",
      choices: [
        {
          text: 'Use medicine to treat the symptoms',
          result: "You break out the anti-nausea tablets and oral rehydration salts. By afternoon the worst has passed, but the patients are weak and depleted. Medicine well spent.",
          effects: { medicine: -1 },
          healthEffects: { random2: -1 }
        },
        {
          text: 'Let it run its course — conserve medicine',
          result: "You push fluids and rest, letting the illness burn through on its own. It takes two full days of misery. The affected members are unable to perform any tasks, and the elder watches with quiet worry.",
          effects: { water: -2 },
          healthEffects: { random2: -2 },
          stressEffects: { all: 1 }
        }
      ]
    },
    {
      id: 'medical_02',
      category: 'medical',
      dayRange: [1, 30],
      prereq: null,
      title: 'Cut Hand',
      description: "A slip with a kitchen knife opens a deep gash across someone's palm. Blood wells up immediately, dripping onto the counter. In normal times this would mean a trip to urgent care and a few stitches. Now it means whatever you have on hand.",
      choices: [
        {
          text: 'Clean and bandage it properly with medical supplies',
          result: "You wash the wound with clean water and rubbing alcohol, then close it with butterfly bandages and wrap it tight. The hand will be stiff for days, but infection risk is low. A good outcome for a bad situation.",
          effects: { medicine: -0.5 },
          healthEffects: { randomOne: -1 }
        },
        {
          text: 'Improvise — clean cloth and pressure',
          result: "You tear a clean shirt into strips and bind the wound as tightly as you can. It stops bleeding eventually, but the cut is deep and the bandage needs changing twice a day. You watch for infection with growing unease.",
          effects: {},
          healthEffects: { randomOne: -2 },
          special: 'infection_risk'
        }
      ]
    },
    {
      id: 'medical_03',
      category: 'medical',
      dayRange: [5, 30],
      prereq: null,
      title: 'Chronic Condition Flare',
      description: "Your spouse sits on the edge of the bed, breathing carefully. The chronic condition that was managed with regular medication is flaring. The prescription ran out days ago, and the over-the-counter alternatives are a poor substitute. Doing nothing is not an option.",
      choices: [
        {
          text: 'Use your medicine supply to manage the symptoms',
          result: "You ration out the closest available medication and keep a careful eye on dosing. The flare subsides to manageable levels by evening, but the supply is thinner now. This will happen again.",
          effects: { medicine: -1 },
          healthEffects: { spouse: 1 }
        },
        {
          text: 'Plan a trip to the pharmacy specifically for this',
          result: "You add the pharmacy to tomorrow's priority list, with specific medications to look for. In the meantime, rest and careful hydration are the only tools available. Your spouse does not complain, which worries you more than complaints would.",
          effects: {},
          healthEffects: { spouse: -1 },
          special: 'pharmacy_priority'
        }
      ]
    },
    {
      id: 'medical_04',
      category: 'medical',
      dayRange: [7, 30],
      prereq: null,
      title: 'Infection',
      description: "The wound from a few days ago is not healing right. The skin around it is red, swollen, and hot to the touch. A thin line of red tracks up from the injury site. Without proper antibiotics, this could become serious within days.",
      choices: [
        {
          text: 'Use antibiotics if you have them',
          result: "You start the antibiotic course immediately, splitting the available supply to cover the minimum treatment period. The swelling begins to recede by the second day. Close call.",
          effects: { medicine: -2 },
          healthEffects: { randomOne: 2 },
          condition: (state) => state.medicine >= 2
        },
        {
          text: 'Try to treat it with alcohol and hot compresses',
          result: "You clean the wound aggressively with rubbing alcohol and apply hot, damp cloths to draw out the infection. It is painful and uncertain. The patient runs a low fever overnight. By morning the infection is holding steady — not spreading, but not retreating.",
          effects: { medicine: -0.5 },
          healthEffects: { randomOne: -1 },
          special: 'infection_watch'
        }
      ]
    },
    {
      id: 'medical_05',
      category: 'medical',
      dayRange: [8, 25],
      prereq: null,
      title: 'Anxiety Attack',
      description: "The teen is sitting on the bathroom floor, knees pulled up, breathing too fast and too shallow. They cannot explain what triggered it. The walls are closing in, they say. Everything is wrong and nothing is safe. The elder kneels nearby, speaking in a low, steady voice.",
      choices: [
        {
          text: 'Sit with them and help them breathe through it',
          result: "You sit on the cold tile beside them and breathe slowly, counting out loud. Four in, seven hold, eight out. It takes twenty minutes before their breathing matches yours. The episode passes, but the fragility of it stays in the room.",
          effects: {},
          stressEffects: { teen: -2 },
          healthEffects: { player: 0 }
        },
        {
          text: 'Give them a task — something concrete and physical',
          result: "You tell them you need their help organizing the food supplies right now, that only they can do it. The distraction works. By the time the cans are sorted and counted, the shaking has stopped. The teen looks drained but functional. Sometimes busy hands quiet a racing mind.",
          effects: {},
          stressEffects: { teen: -1 }
        }
      ]
    },
    {
      id: 'medical_06',
      category: 'medical',
      dayRange: [10, 30],
      prereq: null,
      title: 'Dehydration Symptoms',
      description: "Someone is showing signs of dehydration: headache, dizziness, dark urine, cracked lips. The water ration has been tight, and the body is keeping count even when the mind tries not to.",
      choices: [
        {
          text: 'Increase their water ration for the next two days',
          result: "You redistribute the water supply to give the affected person extra. The symptoms improve within hours of increased hydration. Others accept smaller shares without complaint, though the math is getting harder.",
          effects: { water: -2 },
          healthEffects: { randomOne: 1 }
        },
        {
          text: 'Boil creek water if you have fuel',
          result: "You make the trip to the creek and haul back water, then spend the fuel to boil it properly. It is not efficient, but it closes the gap. The patient drinks greedily and looks better by evening.",
          effects: { fuel: -0.5, water: 2 },
          healthEffects: { randomOne: 1 },
          condition: (state) => state.fuel >= 0.5
        }
      ]
    },
    {
      id: 'medical_07',
      category: 'medical',
      dayRange: [12, 30],
      prereq: null,
      title: 'Elder Health Scare',
      description: "Pat does not come downstairs for breakfast. You find them sitting on the edge of the bed, one hand pressed to their chest, face gray. Their pulse is rapid and irregular. They wave you off and say it is nothing, just indigestion. It does not look like indigestion.",
      choices: [
        {
          text: 'Full medical attention — use supplies and dedicate a caretaker',
          result: "You set up a makeshift monitoring station with everything you have. Aspirin, careful positioning, constant observation. By evening Pat's color returns and the pulse steadies. The scare passes, but it is a reminder of the stakes.",
          effects: { medicine: -1 },
          healthEffects: { elder: 1 },
          stressEffects: { all: 1 }
        },
        {
          text: 'Keep them comfortable and monitor — conserve medicine',
          result: "You make Pat as comfortable as possible with pillows and water, and check on them every hour. The episode resolves on its own by afternoon, but the color does not fully return. Pat's resilience has limits.",
          effects: {},
          healthEffects: { elder: -1 },
          stressEffects: { all: 0.5 }
        }
      ]
    },
    {
      id: 'medical_08',
      category: 'medical',
      dayRange: [5, 30],
      prereq: null,
      title: 'Insomnia',
      description: "Nobody is sleeping well, but one family member has not managed more than an hour or two for three nights running. The dark circles under their eyes tell the story. They drift through the day in a fog, dropping things, forgetting tasks, starting at shadows.",
      choices: [
        {
          text: 'Use a sedative from the medicine supply',
          result: "A single dose of sleep aid buys a full night of rest. The difference in the morning is visible — clearer eyes, steadier hands. One good night does not solve the problem, but it stops the spiral.",
          effects: { medicine: -0.5 },
          stressEffects: { randomOne: -2 }
        },
        {
          text: 'Try herbal tea and relaxation techniques',
          result: "Chamomile from the supply stash, a dark room, the elder reading aloud in a low voice. It takes an hour, but sleep comes. Not deep, not long, but enough. You wonder how many more nights like this there will be.",
          effects: {},
          stressEffects: { randomOne: -1 }
        }
      ]
    },

    // ─── STRANGER EVENTS (10) ───
    {
      id: 'stranger_01',
      category: 'stranger',
      dayRange: [2, 15],
      prereq: null,
      title: 'The Walker',
      description: "A lone figure walks slowly down the middle of your street, pulling a wheeled suitcase. They stop at each house, peer at the windows, then move on. When they reach yours, they pause longer than the others. From behind the blanket over the window, you watch them study your house.",
      choices: [
        {
          text: 'Stay hidden and wait for them to move on',
          result: "After a long minute, the figure adjusts their grip on the suitcase handle and continues down the street. They do not look back. Your heart rate returns to normal, and you make a mental note to check the back entry points.",
          effects: {},
          stressEffects: { all: 0.5 }
        },
        {
          text: 'Open the door and ask if they need directions',
          result: "The walker turns out to be a woman in her fifties, walking to her sister's house two towns over. She is dehydrated but not threatening. She tells you the neighborhoods east of here are mostly empty now — people left for the highway. You give her water and she leaves grateful.",
          effects: { water: -1, visibility: 1, morality: 1 }
        }
      ]
    },
    {
      id: 'stranger_02',
      category: 'stranger',
      dayRange: [4, 20],
      prereq: null,
      title: 'The Barking Dog',
      description: "A dog has been barking non-stop from the house three doors down since yesterday. It is getting hoarse now, the barks turning to ragged yelps. No one goes in or out of that house. The sound is driving everyone to distraction.",
      choices: [
        {
          text: 'Go check on the dog — it might be trapped',
          result: "You find a border collie locked in a bedroom with an empty water bowl and a bag of dog food torn open on the floor. The owners are gone. The dog is thin but healthy. You fill the bowl from the kitchen tap, which still has pressure. The dog drinks like it is the last water on earth.",
          effects: { visibility: 0.5 },
          special: 'dog_rescue'
        },
        {
          text: 'Ignore it — you cannot take on a dog right now',
          result: "The barking continues through the afternoon, then weakens. By evening it has stopped. No one mentions it at dinner. The teen pushes food around their plate.",
          effects: {},
          stressEffects: { teen: 1, all: 0.5 }
        },
        {
          text: 'Leave food and water at the house but do not bring the dog home',
          result: "You slip over to the neighbor's house and push food and water through the doggy door. The barking stops within minutes, replaced by sounds of frantic eating. The dog will be okay for a few more days. Not a solution, but better than nothing.",
          effects: { food: -0.5, water: -1, morality: 1 }
        }
      ]
    },
    {
      id: 'stranger_03',
      category: 'stranger',
      dayRange: [5, 25],
      prereq: null,
      title: 'The Trading Post',
      description: "A hand-lettered sign has appeared on the corner: TRADE FAIR - BAPTIST CHURCH PARKING LOT - SATURDAY. Below it, in smaller text: bring goods not trouble. Someone has organized a barter market. It could be an opportunity, or it could be a trap to identify who has supplies worth taking.",
      choices: [
        {
          text: 'Attend and trade — bring surplus items',
          result: "The parking lot holds twenty people and a nervous energy. Trading is simple and direct. You trade items you can spare for things you need. The pastor oversees with quiet authority. It feels almost civilized.",
          effects: { visibility: 2, cohesion: 0.5 },
          special: 'trade_fair'
        },
        {
          text: 'Send the teen to observe but not participate',
          result: "The teen returns with useful intelligence: who has what, who looks desperate, and who looks dangerous. No supplies exchanged, but information gained. The teen seems energized by the mission.",
          effects: { visibility: 0.5 },
          stressEffects: { teen: -1 },
          special: 'trade_intel'
        },
        {
          text: 'Stay away — OPSEC is more important',
          result: "You stay home and reinforce the message to the family: what you have is nobody's business. It is the safe choice. It is also the isolating one.",
          effects: {},
          stressEffects: { all: 0.5 }
        }
      ]
    },
    {
      id: 'stranger_04',
      category: 'stranger',
      dayRange: [6, 20],
      prereq: null,
      title: 'The Teenager Alone',
      description: "A teenage boy, maybe sixteen, sits on the curb two houses down. He has been there for an hour. No backpack, no supplies, no apparent destination. He stares at the ground between his shoes. Occasionally he wipes his face with his sleeve.",
      choices: [
        {
          text: 'Approach and offer food',
          result: "His name is Jaylen. His family drove north three days ago and told him to stay with his uncle, but his uncle's house is empty. He has not eaten since yesterday. He takes the food with shaking hands and does not cry, though the effort of not crying is obvious.",
          effects: { food: -0.5, visibility: 0.5, morality: 2, generosity: 1 }
        },
        {
          text: 'Send the teen to check on him — peer to peer',
          result: "Your teen walks over with a casual air that does not fool anyone. They sit on the curb beside the boy and talk for thirty minutes. When they come back, they relay his situation and ask if he can stay. You have a decision to make.",
          effects: {},
          stressEffects: { teen: -0.5 },
          special: 'jaylen_question'
        },
        {
          text: 'Leave him be — you cannot help everyone',
          result: "When you look out the window an hour later, the curb is empty. The teen does not ask where he went.",
          effects: { morality: -1 },
          stressEffects: { teen: 1 }
        }
      ]
    },
    {
      id: 'stranger_05',
      category: 'stranger',
      dayRange: [8, 25],
      prereq: null,
      title: 'The Offer',
      description: "A man knocks on the door — polite, clean-shaven, wearing a polo shirt that still looks pressed. He introduces himself as David from the community council. He says the neighborhood is organizing a watch rotation and resource-sharing pool. Everyone contributes, everyone benefits. He hands you a photocopied flyer with a schedule.",
      choices: [
        {
          text: 'Join the neighborhood council',
          result: "You attend the first meeting at David's house. Eight families, organized around mutual defense and shared resources. It is structured and earnest. Your contribution is noted, and in return you gain information, manpower, and a sense that you are not entirely alone.",
          effects: { visibility: 2, cohesion: 1, morality: 1 },
          special: 'join_council'
        },
        {
          text: 'Decline politely — too much exposure',
          result: "David nods and leaves the flyer anyway. You hear him knock on the next door. There is something admirable about it, and something foolish. You file the flyer and keep your own counsel.",
          effects: { visibility: 0.5 }
        },
        {
          text: 'Ask questions first — what exactly is expected',
          result: "David lays it out: each household contributes one person for a four-hour watch shift every three days, and shares any surplus food or water during emergencies. Nobody is forced. The transparency is reassuring. You tell him you will think about it.",
          effects: {},
          special: 'council_option'
        }
      ]
    },
    {
      id: 'stranger_06',
      category: 'stranger',
      dayRange: [10, 28],
      prereq: null,
      title: 'The Night Visitor',
      description: "A noise wakes you at 2 AM. Through the window you see a figure in the backyard, crouched near the shed. They are moving slowly, methodically, checking the shed door, testing the lock. This is not a neighbor checking on you.",
      choices: [
        {
          text: 'Confront them loudly from the window',
          result: "You slam the window open and shout. The figure freezes, then bolts over the fence and disappears into the dark. Your heart hammers. The family is awake now, frightened. Nobody sleeps for the rest of the night.",
          effects: { visibility: 1 },
          stressEffects: { all: 2 }
        },
        {
          text: 'Watch silently and note details',
          result: "You watch from the dark window, memorizing what you can: height, build, clothing, direction of escape. They fail to open the shed and move on after five minutes. You now know someone is casing houses on your street. Tomorrow you check every lock.",
          effects: {},
          stressEffects: { all: 1 }
        },
        {
          text: 'Activate the perimeter alarm',
          result: "You trigger the cans-and-wire alarm line. The crash of tin on concrete splits the silence. The intruder scrambles over the fence so fast they leave a piece of clothing on the wire. Nobody on the street will try that approach again soon.",
          effects: {},
          stressEffects: { all: 1 },
          condition: (state) => state.upgrades && state.upgrades.perimeter_alarm
        }
      ]
    },
    {
      id: 'stranger_07',
      category: 'stranger',
      dayRange: [7, 22],
      prereq: null,
      title: 'The Nurse',
      description: "A woman in scrubs walks down the street carrying a large medical bag. She stops at houses where people flag her down. She is a nurse from the urgent care clinic, making rounds on foot now that the clinic has closed. She sees your family watching and waves.",
      choices: [
        {
          text: 'Invite her in for a checkup in exchange for food',
          result: "She examines everyone with practiced efficiency. The elder's blood pressure concerns her. She adjusts their position and gives specific instructions for monitoring. She accepts a can of food and two bottles of water, and tells you she will be back in a week.",
          effects: { food: -0.5, water: -1, visibility: 1, morality: 1 },
          healthEffects: { all: 1 },
          special: 'nurse_contact'
        },
        {
          text: 'Wave back but keep your distance',
          result: "She nods and moves on. You watch her stop at two more houses before disappearing around the corner. A medical professional, walking the streets for free. The world has not entirely stopped working.",
          effects: {}
        }
      ]
    },
    {
      id: 'stranger_08',
      category: 'stranger',
      dayRange: [12, 28],
      prereq: null,
      title: 'The Couple Fleeing',
      description: "An older couple hurries down the sidewalk, each carrying a single bag. They glance over their shoulders repeatedly. When they see you, the woman calls out: a group is going house to house on Pine Street, taking what they want. Pine Street is four blocks east.",
      choices: [
        {
          text: 'Thank them and prepare defenses',
          result: "You lock every door, move the heaviest furniture against the ground-floor entries, and distribute flashlights. The family moves with grim purpose. The threat may not reach you, but the preparation is its own kind of calm.",
          effects: {},
          stressEffects: { all: 1 },
          special: 'defense_prep'
        },
        {
          text: 'Offer them shelter for the night',
          result: "They accept with visible relief. The husband turns out to be a retired electrician. Over a shared meal, he sketches out a way to wire your solar panel more efficiently. They leave in the morning with food and water and your good wishes.",
          effects: { food: -1, water: -2, visibility: 1, morality: 2, generosity: 2 },
          special: 'electrician_tip'
        },
        {
          text: 'Ask them for details about the group — numbers, weapons, direction',
          result: "The woman describes six or seven people, some armed, moving systematically. They started on the east end of Pine Street and are working west. Your street is not in their immediate path. The couple hurries on. You have intelligence now, and time to decide what to do with it.",
          effects: {},
          stressEffects: { all: 1 }
        }
      ]
    },
    {
      id: 'stranger_09',
      category: 'stranger',
      dayRange: [14, 28],
      prereq: (state) => state.visibility >= 5,
      title: 'The Watcher',
      description: "For the second day in a row, you spot the same person standing at the end of the block, studying houses. They carry a notebook and seem to be making notes. When they notice you watching from the window, they do not look away.",
      choices: [
        {
          text: 'Confront them directly — walk out and ask their business',
          result: "The watcher turns out to be cataloging which houses are occupied. They say it is for the community council, but their manner does not match David's earnest transparency. They leave without giving their name. You are now certain that your house is on someone's list.",
          effects: { visibility: 1 },
          stressEffects: { all: 1 }
        },
        {
          text: 'Make your house look abandoned from the outside',
          result: "You spend the afternoon removing signs of habitation: close all curtains, let mail pile up visibly, scatter debris on the porch. The effect is convincing. You run the generator only at night from now on, muffled with blankets.",
          effects: { visibility: -2 },
          stressEffects: { all: 0.5 }
        }
      ]
    },
    {
      id: 'stranger_10',
      category: 'stranger',
      dayRange: [3, 15],
      prereq: null,
      title: 'The Children',
      description: "Two children, no older than eight or nine, stand at the end of your driveway. They are dirty and quiet, watching the house with wide eyes. No adults in sight. The girl holds the boy's hand tightly.",
      choices: [
        {
          text: 'Bring them inside, feed them, find out where their parents are',
          result: "They eat canned peaches in solemn silence. Their mother is at the church, they say. She told them to wait outside but they got lost. You walk them to First Baptist, where a frantic woman pulls them into her arms. She offers you the only thing she has: a prayer.",
          effects: { food: -0.5, visibility: 1, morality: 2, generosity: 1 },
          stressEffects: { all: -0.5 }
        },
        {
          text: 'Give them food and directions to the church',
          result: "You hand them water and crackers through a barely opened door and point them toward First Baptist, three blocks south. They walk away holding hands. You watch until they turn the corner. The teen stares at you but says nothing.",
          effects: { food: -0.3, water: -0.5, morality: 1 }
        },
        {
          text: 'Tell them to go back the way they came',
          result: "They stand there for a moment longer, then turn and walk away. The girl looks back once. You close the door. The house is very quiet.",
          effects: { morality: -2 },
          stressEffects: { teen: 2, all: 0.5 }
        }
      ]
    },

    // ─── RESOURCE EVENTS (8) ───
    {
      id: 'resource_01',
      category: 'resource',
      dayRange: [1, 10],
      prereq: null,
      title: 'The Water Heater',
      description: "The water heater in the basement holds forty gallons. The water has been sitting since the grid went down, but it was clean when the power cut. With no electricity to heat it, the tank is just sitting there — a reservoir hiding in plain sight.",
      choices: [
        {
          text: 'Drain it carefully into clean containers',
          result: "You attach a hose to the drain valve and fill every container you can find. The water is lukewarm but clear. Forty gallons, just like that. Sometimes the house gives back.",
          effects: { water: 10 }
        },
        {
          text: 'Save it for an emergency — leave it in the tank',
          result: "You mark the water heater with a note: EMERGENCY RESERVE. Knowing it is there provides a quiet comfort. The tank is its own storage container, sealed and safe.",
          effects: {},
          special: 'water_reserve'
        }
      ]
    },
    {
      id: 'resource_02',
      category: 'resource',
      dayRange: [3, 15],
      prereq: null,
      title: 'The Pantry Inventory',
      description: "While reorganizing the kitchen, you discover forgotten supplies: a case of ramen behind the pet food, two jars of peanut butter in the back of the top shelf, and a gallon of cooking oil that rolled behind the flour bin. Small finds, but they add up.",
      choices: [
        {
          text: 'Add everything to the main supply',
          result: "You catalog and integrate the finds. The peanut butter alone is dense calories that stretch meals further. The cooking oil makes bland rice and beans palatable. Morale ticks up with the supply count.",
          effects: { food: 2, cohesion: 0.3 }
        },
        {
          text: 'Set aside as hidden reserve — do not tell the others',
          result: "You stash the finds in a box behind the furnace. Insurance against the worst-case scenario. The secret sits uncomfortably, but having a fallback feels necessary.",
          effects: {},
          stressEffects: { player: 0.5 },
          special: 'hidden_reserve'
        }
      ]
    },
    {
      id: 'resource_03',
      category: 'resource',
      dayRange: [5, 20],
      prereq: null,
      title: 'Spoiled Food',
      description: "The smell from the chest freezer in the garage has become impossible to ignore. Everything inside has thawed and rotted, a full week's worth of meat and frozen vegetables turned to a reeking biohazard. Flies have found it.",
      choices: [
        {
          text: 'Clean it out immediately — health hazard',
          result: "The cleanup takes an hour and is thoroughly unpleasant. You bag the spoiled food and bury it in the back corner of the yard. The freezer, once cleaned, makes a useful airtight storage container for other supplies.",
          effects: {},
          special: 'freezer_storage'
        },
        {
          text: 'Seal it shut and deal with it later',
          result: "You duct tape the freezer lid shut. Out of sight, out of mind — except for the smell, which lingers faintly on warm days. Flies cluster around the garage door.",
          effects: {},
          stressEffects: { all: 0.5 },
          healthEffects: { all: -0.3 }
        }
      ]
    },
    {
      id: 'resource_04',
      category: 'resource',
      dayRange: [7, 25],
      prereq: null,
      title: 'The Garden Discovery',
      description: "The elder points out a patch of the backyard where wild mint and what looks like volunteer tomato plants are growing. The previous owner must have had a garden here. The soil is dark and fertile. With seeds and some work, this ground could produce.",
      choices: [
        {
          text: 'Start cultivating immediately with whatever you have',
          result: "You clear the weeds and turn the soil by hand. The mint is already usable for tea, and the tomato plants, if tended, might produce in two weeks. It is not a garden yet, but it is a start.",
          effects: { food: 0.3 },
          special: 'garden_head_start'
        },
        {
          text: 'Note it for later when you have proper seeds and tools',
          result: "You mark the spot mentally and cover the tomato plants with a clear container to protect them. Having the option is enough for now. First, the immediate crises.",
          effects: {}
        }
      ]
    },
    {
      id: 'resource_05',
      category: 'resource',
      dayRange: [4, 18],
      prereq: null,
      title: 'Pipes Draining',
      description: "The taps have been losing pressure for days. This morning, the kitchen faucet coughs air and a thin stream of brown water before going dry. The municipal water system has finally exhausted its gravity-fed reserves. Whatever is in your containers is what you have.",
      choices: [
        {
          text: 'Run every tap and collect whatever comes out',
          result: "You work through the house systematically: every sink, the bathtub, the outdoor spigot. The last dregs amount to about three gallons of slightly discolored but usable water. Then silence from the pipes.",
          effects: { water: 3 }
        },
        {
          text: 'Accept it and focus on alternative water sources',
          result: "The era of tap water is over. You brief the family on the new reality: creek water, rain collection, and strict conservation. Everyone nods. They already knew.",
          effects: {},
          stressEffects: { all: 0.5 }
        }
      ]
    },
    {
      id: 'resource_06',
      category: 'resource',
      dayRange: [8, 25],
      prereq: null,
      title: 'The Vehicle',
      description: "The minivan in the garage still has a quarter tank of gas and a functional battery. You have been ignoring it — driving anywhere seems absurd — but the gas in the tank is a resource, and the battery could power small electronics. Then again, if evacuation becomes necessary, a working vehicle is priceless.",
      choices: [
        {
          text: 'Siphon the gas for the generator',
          result: "You run a hose from the tank into fuel cans. Three gallons — enough for six days of minimal generator use. The van sits on empty now, but the trade feels right.",
          effects: { fuel: 3 },
          special: 'vehicle_drained'
        },
        {
          text: 'Keep the vehicle fueled and ready — evacuation option',
          result: "You leave the gas in the tank and check the battery, tires, and fluid levels. The van will start when you need it. The evacuation option stays on the table.",
          effects: {},
          special: 'vehicle_ready'
        },
        {
          text: 'Use the car battery to charge small electronics',
          result: "You disconnect the battery and wire it to a power inverter from the garage. Flashlights, the radio, and a couple of USB devices get a full charge. The battery still has juice left. You reconnect it to the van afterward.",
          effects: {},
          special: 'battery_charge'
        }
      ]
    },
    {
      id: 'resource_07',
      category: 'resource',
      dayRange: [10, 28],
      prereq: null,
      title: 'Fuel Running Low',
      description: "The generator coughs and sputters, and for a terrible moment you think it has died. It catches again, but the fuel gauge is touching the red line. You have been running it conservatively, but even conservative use has a cost. Every hour of light and heat is a gamble now.",
      choices: [
        {
          text: 'Shut down the generator entirely — go dark',
          result: "You flip the switch and the hum dies. The silence is immediate and total. No lights, no charging, no heating. The darkness feels heavier than it should. But the remaining fuel is saved for true emergencies.",
          effects: {},
          stressEffects: { all: 1 },
          special: 'generator_off'
        },
        {
          text: 'Ration to one hour per day — essential tasks only',
          result: "One hour of power per day: enough to charge the radio, boil water, and run a light for the evening meal. The schedule becomes a ritual. Everyone gathers for the hour of normalcy.",
          effects: { fuel: -0.2 },
          stressEffects: { all: 0.5 }
        }
      ]
    },
    {
      id: 'resource_08',
      category: 'resource',
      dayRange: [12, 28],
      prereq: null,
      title: 'The Pool Next Door',
      description: "The above-ground swimming pool in the yard behind yours still holds several hundred gallons of water. It is green with algae and debris, but water is water. With proper treatment — boiling, filtering, chemical purification — it could keep you hydrated for weeks.",
      choices: [
        {
          text: 'Haul and purify pool water — it is worth the effort',
          result: "You bucket-brigade the green water over the fence, then boil or filter it in batches. The process is slow and fuel-intensive, but the yield is significant. The water tastes of chlorine and effort.",
          effects: { water: 8, fuel: -0.5 },
          condition: (state) => state.fuel >= 0.5
        },
        {
          text: 'Use pool water for non-drinking purposes only',
          result: "Cleaning, washing, flushing — the pool water handles everything that does not go in a mouth. It stretches your clean water supply significantly by taking pressure off the drinking supply.",
          effects: { water: 3 }
        }
      ]
    },

    // ─── SECURITY EVENTS (8) ───
    {
      id: 'security_01',
      category: 'security',
      dayRange: [3, 20],
      prereq: null,
      title: 'Gunshots in the Distance',
      description: "Three sharp reports echo across the neighborhood, followed by silence. They came from the east, maybe half a mile away. The sound is unmistakable and final. The teen drops to the floor. The elder goes very still. Your spouse looks at you for direction.",
      choices: [
        {
          text: 'Lock down — nobody goes outside today',
          result: "You bar the doors and keep everyone inside. The day passes in tense quiet. No more shots. No explanation. The uncertainty may be worse than knowing. By evening the tension has settled into something the family can carry.",
          effects: {},
          stressEffects: { teen: 2, all: 1 }
        },
        {
          text: 'Cautiously investigate from a safe distance',
          result: "You move through back yards, staying low and behind cover. Two blocks east, a house has its front door wide open. Shell casings on the porch. No bodies visible. The story writes itself in implications you would rather not read. You return home with nothing useful except confirmation that things have escalated.",
          effects: { visibility: 0.5 },
          stressEffects: { all: 1.5 }
        }
      ]
    },
    {
      id: 'security_02',
      category: 'security',
      dayRange: [5, 25],
      prereq: null,
      title: 'The Break-In Attempt',
      description: "A sharp crack from the back of the house jolts everyone awake. Someone is trying to pry open the back door. You can hear the wood frame splitting, the screwdriver or crowbar grinding against the deadbolt plate. The noise is deliberate, unhurried. They expect the house to be empty.",
      choices: [
        {
          text: 'Make noise — turn on lights, shout, make it clear the house is occupied',
          result: "You flip on a flashlight and bang on the walls, shouting that you are armed and calling the police — an empty threat, but they do not know that. The prying stops. Footsteps retreat quickly across the yard. They expected an empty house and got a surprise.",
          effects: { visibility: 1 },
          stressEffects: { all: 2 }
        },
        {
          text: 'Stay silent and let the reinforced door hold',
          result: "You motion everyone to silence and wait. The prying continues for another minute, then stops. The deadbolt and the reinforced frame did their job. Footsteps circle the house, testing other entries, finding nothing easy. They leave. The family breathes.",
          effects: {},
          stressEffects: { all: 1.5 },
          condition: (state) => state.upgrades && state.upgrades.reinforced_doors
        },
        {
          text: 'Confront them at the door',
          result: "You stand on the other side of the back door and speak in a level voice: this house is occupied, the door is reinforced, and you are not going to make this easy. A pause. Then a voice outside: sorry, thought it was empty. Footsteps leaving. Probably true. Probably.",
          effects: { visibility: 1 },
          stressEffects: { all: 1 }
        }
      ]
    },
    {
      id: 'security_03',
      category: 'security',
      dayRange: [8, 28],
      prereq: (state) => state.visibility >= 5,
      title: 'The Demand',
      description: "A note is pinned to your front door when you check the porch in the morning. Block letters on lined paper: WE KNOW WHAT YOU HAVE. LEAVE 5 CANS ON THE PORCH TONIGHT OR WE COME INSIDE. No signature. The paper is clean and the letters are steady. This was not written in desperation.",
      choices: [
        {
          text: 'Comply — leave the food and avoid confrontation',
          result: "You set five cans on the porch at dusk and watch from the upstairs window. A figure collects them after midnight and walks north. The porch is empty by morning. The family is fed one less day, but unharmed. You do not know if this ends it.",
          effects: { food: -2.5, morality: 0 },
          stressEffects: { all: 1 }
        },
        {
          text: 'Refuse — reinforce and prepare for confrontation',
          result: "You crumple the note and spend the day hardening every entry point. The family sleeps in shifts. Two tense nights pass before you realize: they are not coming. The bluff held, or they moved to easier targets. The knot in your chest loosens by degrees.",
          effects: {},
          stressEffects: { all: 2 },
          special: 'demand_defied'
        },
        {
          text: 'Leave a note back — propose a fair trade instead',
          result: "You write: WE TRADE FAIR. MEET AT THE CHURCH. SATURDAY. You pin it where their note was. The next morning, your note is gone. Saturday at the church, a man approaches you with hard eyes and an offer: his group provides security for the block in exchange for regular food. It is extortion dressed as a service, but at least it is talking.",
          effects: { visibility: 1 },
          special: 'protection_racket'
        }
      ]
    },
    {
      id: 'security_04',
      category: 'security',
      dayRange: [6, 22],
      prereq: null,
      title: 'The Vandals',
      description: "You hear glass breaking down the street, followed by shouts and laughter. Through the window you see three young men — late teens or early twenties — moving through a front yard, kicking in garden gnomes, overturning mailboxes. They are not scavenging. They are breaking things because they can.",
      choices: [
        {
          text: 'Stay dark and quiet until they pass',
          result: "You kill every light and whisper the family into silence. The group passes your house without stopping. Their energy is chaotic but directionless — they are bored and angry, not strategic. Still, the sound of casual destruction stays with you.",
          effects: {},
          stressEffects: { teen: 1, all: 0.5 }
        },
        {
          text: 'Shine a light at them from the window — show occupancy',
          result: "The flashlight beam catches them mid-stride. They freeze, then one of them makes a rude gesture and they move on faster. They now know someone lives here and watches. Whether that is a deterrent or an invitation, time will tell.",
          effects: { visibility: 1 },
          stressEffects: { all: 0.5 }
        }
      ]
    },
    {
      id: 'security_05',
      category: 'security',
      dayRange: [10, 28],
      prereq: null,
      title: 'Missing Supplies',
      description: "During morning inventory, the numbers do not add up. Two cans of food and a fuel container are missing from the garage storage. No signs of forced entry. Nothing else is disturbed. Someone with access took them, either from inside or close to inside.",
      choices: [
        {
          text: 'Call a family meeting and address it directly',
          result: "You lay out the facts without accusation. The silence is heavy. The teen swears it was not them. Your spouse looks uncomfortable. Marcus, if present, says nothing. The supplies are gone regardless, but clearing the air prevents worse fractures.",
          effects: { food: -1, fuel: -1, cohesion: -0.5 },
          stressEffects: { all: 1 }
        },
        {
          text: 'Quietly move high-value supplies to a locked area',
          result: "You relocate the most critical supplies to the upstairs closet and install a simple combination lock. Nobody asks why. The missing items are a tax you pay for the lesson. Going forward, inventory is logged daily.",
          effects: { food: -1, fuel: -1 },
          special: 'supply_security'
        }
      ]
    },
    {
      id: 'security_06',
      category: 'security',
      dayRange: [12, 28],
      prereq: null,
      title: 'The Patrol',
      description: "A group of five adults walks down the center of your street in a loose formation. They carry improvised weapons: a baseball bat, a length of pipe, what might be a machete. They move with purpose, checking houses, conferring in low voices. They are not military or police.",
      choices: [
        {
          text: 'Stay hidden and observe their pattern',
          result: "You watch from the upstairs window as they work their way down the block. They skip occupied houses and try doors on vacant ones. Scavengers, not raiders. Organized enough to avoid confrontation, desperate enough to keep searching. They do not try your door.",
          effects: {},
          stressEffects: { all: 1 }
        },
        {
          text: 'Display deterrence — make your security visible',
          result: "You stand on the porch with a flashlight and a stern posture. The group's leader makes eye contact, nods once, and steers the group to the other side of the street. Mutual recognition: you have something worth defending, and they have easier options. For now.",
          effects: { visibility: 1 },
          stressEffects: { all: 0.5 }
        }
      ]
    },
    {
      id: 'security_07',
      category: 'security',
      dayRange: [15, 28],
      prereq: (state) => state.visibility >= 7,
      title: 'The Confrontation',
      description: "Four people stand at the end of your driveway. They are not asking. The leader — a heavy-set man with a hunting vest and a calm voice — says they are collecting a neighborhood tax. Everyone contributes. He lists what they want: food, fuel, and any medicine. His companions stand spread out, covering angles. This is practiced.",
      choices: [
        {
          text: 'Negotiate a reduced payment',
          result: "You counter with half of what they asked. The man considers, looks at his companions, and agrees. He takes the supplies and tells you they will be back in a week. The transaction is businesslike and that makes it worse.",
          effects: { food: -2, fuel: -1, medicine: -1 },
          stressEffects: { all: 2 }
        },
        {
          text: 'Refuse outright — this is your home and your property',
          result: "The man stares at you for a long time. His companions shift their weight. Finally he nods, slowly, and they back off the property. But the look in his eyes says this is not over. You spend the next three days sleeping in shifts.",
          effects: {},
          stressEffects: { all: 3 },
          special: 'confrontation_escalation'
        },
        {
          text: 'Offer to join their group — better inside than outside',
          result: "The man's expression changes to something like respect. He lays out terms: your group joins their network, contributes a percentage of resources, and takes watch shifts. In return, nobody touches your house. It is a protection racket with a community label. But it is protection.",
          effects: { food: -1, visibility: 2 },
          stressEffects: { all: 1 },
          special: 'joined_group'
        }
      ]
    },
    {
      id: 'security_08',
      category: 'security',
      dayRange: [7, 25],
      prereq: null,
      title: 'The False Alarm',
      description: "A crash from the garage sends the whole house into high alert. Everyone scrambles for positions. Hearts pound. Your spouse grabs the heaviest implement within reach. Ten seconds of absolute terror before you discover the source: a raccoon knocked over a shelf of canned goods.",
      choices: [
        {
          text: 'Laugh it off — the tension needs a release valve',
          result: "The laughter starts small and builds until everyone is leaning against walls, gasping. The teen doubles over. Even the elder chuckles. The raccoon, indignant, squeezes through a gap in the garage wall and disappears. The shared laugh does more for morale than any rationed meal.",
          effects: { cohesion: 1 },
          stressEffects: { all: -1 }
        },
        {
          text: 'Use it as a learning moment — review your response',
          result: "You walk through what happened: who went where, what the communication breakdown was, where the gaps are. The family listens with the residual adrenaline still humming. Next time — and there will be a next time — the response will be faster and more organized.",
          effects: {},
          stressEffects: { all: 0.5 },
          special: 'security_drill'
        }
      ]
    },

    // ─── MORALE EVENTS (8) ───
    {
      id: 'morale_01',
      category: 'morale',
      dayRange: [1, 15],
      prereq: null,
      title: 'The Family Photo',
      description: "While cleaning, someone knocks a framed family photo off the shelf. It is from last Christmas — everyone smiling, the tree in the background, the elder wearing a paper crown from a cracker. Nobody picks it up immediately. They just look at it.",
      choices: [
        {
          text: 'Put it somewhere visible — remember what you are fighting for',
          result: "You prop the photo on the kitchen table where everyone can see it during meals. It becomes an anchor. The elder touches the frame sometimes in passing. The teen stops staring at the table during dinner. A reminder is not a solution, but it is not nothing.",
          effects: { cohesion: 1 },
          stressEffects: { all: -0.5 }
        },
        {
          text: 'Put it away — the reminder is too painful right now',
          result: "You tuck the photo into a drawer. Out of sight, where the gap between then and now cannot cut as deep. Practical, maybe. Cold, maybe. Necessary.",
          effects: {},
          stressEffects: { all: 0.3 }
        }
      ]
    },
    {
      id: 'morale_02',
      category: 'morale',
      dayRange: [3, 25],
      prereq: null,
      title: 'The Card Game',
      description: "The elder produces a battered deck of cards from a coat pocket and challenges the teen to a game of rummy. It is such a normal, mundane gesture that it takes everyone off guard. The teen rolls their eyes but sits down. Within twenty minutes, the whole family is gathered around the table.",
      choices: [
        {
          text: 'Join in — let the evening be about something besides survival',
          result: "For two hours, nobody mentions water ratios or security protocols. The teen wins three hands in a row and grins without self-consciousness. Your spouse catches your eye and holds the look. This is what you are protecting.",
          effects: { cohesion: 1.5 },
          stressEffects: { all: -1.5 }
        },
        {
          text: 'Let them play while you keep watch',
          result: "You stand by the window while the card game plays out behind you. The sounds of normalcy — shuffling cards, the elder's mock outrage at losing, the teen's quiet laughter — fill the room. You keep watch and feel a complicated kind of peace.",
          effects: { cohesion: 0.5 },
          stressEffects: { player: 0.5, teen: -1, elder: -1, spouse: -1 }
        }
      ]
    },
    {
      id: 'morale_03',
      category: 'morale',
      dayRange: [5, 20],
      prereq: null,
      title: 'The Argument',
      description: "It starts over something trivial — who left the back door unlocked — and escalates faster than anyone expects. Your spouse and the teen are shouting, voices raw with accumulated stress. The elder retreats to the bedroom. The accusations cut deeper than the topic warrants.",
      choices: [
        {
          text: 'Mediate — sit everyone down and address the underlying tension',
          result: "You call a halt and sit them both at the table. Twenty minutes of hard conversation follows. The issue is not the door. The issue is fear, and powerlessness, and living on top of each other with no escape. Naming it does not fix it, but the temperature drops.",
          effects: { cohesion: -0.5 },
          stressEffects: { teen: -0.5, spouse: -0.5 }
        },
        {
          text: 'Separate them — send the teen to a different room',
          result: "You direct the teen upstairs and stay with your spouse. The immediate fire cools, but the coals remain. The teen's door closes with deliberate force. The house settles into a charged silence.",
          effects: { cohesion: -1 },
          stressEffects: { teen: 1, spouse: 0.5 }
        },
        {
          text: 'Side with your spouse — the teen needs to follow rules',
          result: "You back your spouse publicly and tell the teen the rules are the rules. The teen's face closes like a door. Your spouse looks relieved but uneasy. The elder does not come downstairs for the rest of the evening.",
          effects: { cohesion: -1.5 },
          stressEffects: { teen: 2 }
        }
      ]
    },
    {
      id: 'morale_04',
      category: 'morale',
      dayRange: [7, 25],
      prereq: null,
      title: 'The Sunset',
      description: "Without the constant glow of streetlights and screens, the sunset is staggering. The sky runs through every shade of amber and crimson, reflected in the windows of dark houses. The family gathers on the porch without being asked, watching the light fade into purple. Nobody speaks.",
      choices: [
        {
          text: 'Sit together in silence — let the moment be what it is',
          result: "The sunset lasts twenty minutes, and for twenty minutes nobody is a survivor. They are just people watching something beautiful. When the dark comes, the mood carries indoors. The evening feels lighter. The elder says: some things the grid cannot take away.",
          effects: { cohesion: 0.5 },
          stressEffects: { all: -1 }
        },
        {
          text: 'Use the light for practical tasks — there is work to do',
          result: "You break the spell to assign evening tasks while there is still light. The family complies, but the moment fractures. The teen shoots you a look that says something you would rather not hear. Efficiency is not always wisdom.",
          effects: {},
          stressEffects: { all: 0.3 }
        }
      ]
    },
    {
      id: 'morale_05',
      category: 'morale',
      dayRange: [8, 28],
      prereq: null,
      title: 'The Birthday',
      description: "Today is the elder's birthday. In normal times this would mean a cake, candles, and a gathering of extended family. Today there are no candles, no guests, and the cake options are limited to canned frosting on stale crackers. The teen remembered and told you this morning in a whisper.",
      choices: [
        {
          text: 'Celebrate — use a little extra food for a special meal',
          result: "You open the good canned food: fruit cocktail, the last jar of peanut butter, crackers arranged on a plate with improvised birthday decorations from newspaper. The elder cries, which they have not done since this started. Happy tears. The first happy tears.",
          effects: { food: -0.5, cohesion: 2 },
          stressEffects: { all: -2 }
        },
        {
          text: 'Acknowledge it simply — no extra resources',
          result: "You wish Pat a happy birthday and the family echoes it. The teen drew a card from scrap paper. It is modest and genuine and enough. The elder holds the card for the rest of the day.",
          effects: { cohesion: 0.5 },
          stressEffects: { elder: -1, all: -0.5 }
        }
      ]
    },
    {
      id: 'morale_06',
      category: 'morale',
      dayRange: [10, 28],
      prereq: null,
      title: 'The Confession',
      description: "Late at night, when the others are asleep, your spouse sits next to you and speaks quietly. They are scared. Not the managed fear that carries you through each day, but a deeper, more personal terror: that this is the new reality, that rescue is not coming, that they are failing as a parent and a partner. The words come out in a rush, like pressure from a cracked valve.",
      choices: [
        {
          text: 'Listen and be honest — you are scared too',
          result: "You tell them the truth: you do not know if rescue is coming. You do not know if you are doing enough. But you know that together, the odds are better than apart. The conversation does not solve anything. It does not need to. The sharing is the point.",
          effects: { cohesion: 1 },
          stressEffects: { player: -1, spouse: -2 }
        },
        {
          text: 'Reassure them — be the steady one',
          result: "You tell them it will be okay. You do not entirely believe it, but they need to hear it. Your spouse leans against you and the tension in their shoulders eases. The weight transfers to yours. This is part of the job description now.",
          effects: { cohesion: 0.5 },
          stressEffects: { spouse: -1.5, player: 1 }
        }
      ]
    },
    {
      id: 'morale_07',
      category: 'morale',
      dayRange: [5, 25],
      prereq: null,
      title: 'The Project',
      description: "The elder has been working on something at the kitchen table for two days, hunched over paper and pencil. They finally reveal it: a detailed map of the neighborhood from memory, marking every house they know to be occupied, every resource location, every potential hazard. It is meticulous and useful.",
      choices: [
        {
          text: 'Praise the work and incorporate it into planning',
          result: "The map becomes a centerpiece of daily planning sessions. The elder sits taller, contributing observations and corrections as the family adds to it. Purpose is medicine, and this is a dose.",
          effects: { cohesion: 1 },
          stressEffects: { elder: -2 },
          special: 'neighborhood_map'
        },
        {
          text: 'Thank them but worry about OPSEC if the map is found',
          result: "You express genuine appreciation, then gently suggest keeping the map hidden when not in use. The elder nods, understanding the dual edge. The map is stored in the locked closet with the valuable supplies.",
          effects: { cohesion: 0.5 },
          stressEffects: { elder: -1 }
        }
      ]
    },
    {
      id: 'morale_08',
      category: 'morale',
      dayRange: [15, 30],
      prereq: null,
      title: 'The Milestone',
      description: "You mark another day on the kitchen wall with a pencil tick. The family watches. The elder counts quietly. The teen does the math out loud: more than halfway through. The number hangs in the air like a held breath. More than half. The second half is supposed to be the harder half.",
      choices: [
        {
          text: 'Celebrate the milestone — you have made it this far',
          result: "You call it officially: more than half. The family needs a marker, a waypoint. You open one special food item and share it. The gesture matters more than the calories. The teen says: we are going to make it. Nobody argues.",
          effects: { food: -0.3, cohesion: 1.5 },
          stressEffects: { all: -1 }
        },
        {
          text: 'Acknowledge it but stay focused — the hardest part is ahead',
          result: "You tell them the truth: past the halfway mark, but resources decline faster than time passes. The family nods. They know. Realistic is not the same as hopeless, and they have learned the difference.",
          effects: { cohesion: 0.5 },
          stressEffects: { all: 0.5 }
        }
      ]
    },

    // ─── INFRASTRUCTURE EVENTS (6) ───
    {
      id: 'infra_01',
      category: 'infrastructure',
      dayRange: [1, 10],
      prereq: null,
      title: 'The Gas Leak',
      description: "A faint smell of natural gas lingers in the kitchen. The stove knobs are off, but the pilot light is out and the line may have shifted. Without a utility crew to call, a gas leak is more than an inconvenience — it is an explosive waiting for a spark.",
      choices: [
        {
          text: 'Shut off the gas main at the meter',
          result: "You locate the shutoff valve at the meter and close it with a wrench. The smell dissipates within the hour. The gas stove is dead now, but propane or firewood will have to serve. Losing the gas hurts, but keeping the house intact hurts less.",
          effects: { fuel: -0.5 }
        },
        {
          text: 'Ventilate and monitor — you need the gas for cooking',
          result: "You open every window and check the line connections carefully. The leak seems to be from a loose fitting on the stove. You tighten it with pliers and relight the pilot. The smell fades. You keep the windows cracked for the rest of the day and sleep uneasily.",
          effects: {},
          stressEffects: { all: 1 },
          special: 'gas_risk'
        }
      ]
    },
    {
      id: 'infra_02',
      category: 'infrastructure',
      dayRange: [3, 15],
      prereq: null,
      title: 'Roof Leak',
      description: "A brown stain spreads across the upstairs ceiling during the rain, and a steady drip starts into the bedroom. The leak is coming from a missing shingle, visible from the yard. Without repair, the damage will spread to the walls and insulation.",
      choices: [
        {
          text: 'Patch it with tarps and roofing material if you have it',
          result: "You climb to the roof with a tarp and nails, working carefully on the wet surface. The patch holds. It is not permanent, but it does not need to be — it just needs to last thirty days.",
          effects: {},
          condition: (state) => state.inventory && state.inventory.tarps > 0,
          inventoryCost: { tarps: 1 }
        },
        {
          text: 'Improvise with plastic bags and duct tape',
          result: "The improvised patch reduces the drip to a seep. You place a bucket under the remaining moisture. It is a temporary fix on a temporary timeline, and that is all it needs to be.",
          effects: {},
          stressEffects: { all: 0.3 }
        }
      ]
    },
    {
      id: 'infra_03',
      category: 'infrastructure',
      dayRange: [5, 20],
      prereq: null,
      title: 'Sewer Backup',
      description: "The downstairs toilet will not flush, and a dark puddle is spreading from the drain in the basement. Without the municipal pumping station operating, the sewer system is failing. The smell is immediate and overwhelming.",
      choices: [
        {
          text: 'Set up an outdoor latrine — adapt to the new reality',
          result: "You dig a trench in the back corner of the yard and rig a privacy screen from tarps. Dignity takes a hit, but health is preserved. You seal the affected drain with rags and bleach. The family adjusts with minimal complaint, which tells you everything about how far expectations have shifted.",
          effects: {},
          stressEffects: { all: 1 }
        },
        {
          text: 'Try to clear the main line with a plunger and effort',
          result: "After an unpleasant hour, you manage to clear the immediate blockage. The toilet flushes, but slowly. This is a temporary reprieve — the system will back up again. You ration flush usage to critical needs only.",
          effects: {},
          stressEffects: { all: 0.5 }
        }
      ]
    },
    {
      id: 'infra_04',
      category: 'infrastructure',
      dayRange: [7, 25],
      prereq: null,
      title: 'Window Breach',
      description: "A rock — or something heavier — has cracked one of the ground-floor windows. Whether it was thrown deliberately or knocked loose by wind, the result is the same: a weakness in the barrier between inside and outside. Through the crack, you can feel the outside air.",
      choices: [
        {
          text: 'Board it up with lumber and nails',
          result: "You cover the window with boards and nail them tight. The room goes dark but secure. One more window covered, one less vulnerability. The house looks more like a fortress and less like a home.",
          effects: {},
          condition: (state) => state.inventory && state.inventory.lumber > 0 && state.inventory.nails > 0,
          inventoryCost: { lumber: 1, nails: 1 }
        },
        {
          text: 'Tape it and cover with cardboard — save materials for upgrades',
          result: "Packing tape and flattened boxes patch the crack. It will not hold against a determined push, but it blocks the wind and the visibility. A good-enough solution for a good-enough moment.",
          effects: {},
          stressEffects: { all: 0.3 }
        }
      ]
    },
    {
      id: 'infra_05',
      category: 'infrastructure',
      dayRange: [10, 25],
      prereq: null,
      title: 'Generator Trouble',
      description: "The generator coughs, stutters, and dies. The sudden silence is startling. Something mechanical has failed — the spark plug, the carburetor, or the fuel line. Without it, there is no power for charging, boiling water electrically, or running lights.",
      choices: [
        {
          text: 'Attempt a repair — check spark plug and fuel line',
          result: "Your spouse's mechanical knowledge, or an hour of trial and error, identifies the problem: a fouled spark plug. You clean it with rubbing alcohol and a wire brush, and the generator sputters back to life. Relief washes through the house.",
          effects: {},
          special: 'generator_repair',
          condition: (state) => state.spouseSkill === 'mechanical' || (state.inventory && state.inventory.tools > 0)
        },
        {
          text: 'Accept the loss — adapt to no generator',
          result: "You tell the family the generator is done. Candles and flashlights from now on. Water boiled over fire. Charging is a luxury of the past. The adjustment is harsh, but knowing is better than hoping.",
          effects: {},
          stressEffects: { all: 1.5 },
          special: 'no_generator'
        }
      ]
    },
    {
      id: 'infra_06',
      category: 'infrastructure',
      dayRange: [12, 28],
      prereq: null,
      title: 'Fallen Tree',
      description: "A large oak in the front yard has come down overnight, its root ball torn from the softened earth. It blocks the driveway and leans against the garage roof. The damage is structural: the garage door is bent and the roof sags. Inside, your stored supplies may be compromised.",
      choices: [
        {
          text: 'Clear a path to the garage and assess supplies',
          result: "With a handsaw and several hours of work, you cut enough branches to reach the garage door. The roof is damaged but standing. The supplies inside are dusty but intact. The tree itself becomes a source of firewood — a silver lining of bark and heartwood.",
          effects: {},
          special: 'tree_firewood'
        },
        {
          text: 'Focus on securing the garage roof from further collapse',
          result: "You prop lumber under the sagging section and redirect anything on the shelves to the house interior. The garage is compromised as a secure storage space, but nothing was lost. The driveway remains blocked by the fallen trunk.",
          effects: {},
          special: 'garage_compromised'
        }
      ]
    },

    // ─── INFORMATION EVENTS (6) ───
    {
      id: 'info_01',
      category: 'information',
      dayRange: [2, 15],
      prereq: null,
      title: 'The AM Radio',
      description: "You find an old AM/FM radio in a drawer, still with batteries. Scanning the dial produces mostly static, but two stations come through: a repeating Emergency Alert System tone with a recorded message to shelter in place, and a faint station playing music — someone, somewhere, is still broadcasting.",
      choices: [
        {
          text: 'Keep it on the emergency frequency for updates',
          result: "The recorded message repeats every fifteen minutes: shelter in place, conserve resources, emergency services are aware of the situation. Not new information, but official confirmation is its own kind of comfort. You leave the radio on low in the kitchen.",
          effects: {},
          stressEffects: { all: -0.5 },
          special: 'radio_monitoring'
        },
        {
          text: 'Tune to the music station — morale matters',
          result: "Classic country plays through the small speaker, scratchy and intermittent. The elder closes their eyes and hums along. The teen listens despite themselves. Music, it turns out, is a basic human need.",
          effects: { cohesion: 0.5 },
          stressEffects: { all: -1 }
        },
        {
          text: 'Conserve batteries — turn it off until you need it',
          result: "You power off the radio and store the batteries separately. They may be more valuable later. Information is free when you have power, and expensive when you do not.",
          effects: {},
          special: 'batteries_saved'
        }
      ]
    },
    {
      id: 'info_02',
      category: 'information',
      dayRange: [5, 20],
      prereq: null,
      title: 'Neighbor Intelligence',
      description: "A neighbor you recognize — Jim from the blue house on the corner — waves you over to the fence. He is chatty and nervous. He has been walking the neighborhood daily and has useful intel: which houses are empty, where he saw unfamiliar vehicles, and a rumor about the National Guard staging at the county fairgrounds thirty miles north.",
      choices: [
        {
          text: 'Share information in return — build the relationship',
          result: "You trade observations carefully, revealing some of what you know without exposing your supply situation. Jim mentions that the house on Elm Street has been taken over by a group from out of area. Useful. You part with a handshake and an agreement to check in regularly.",
          effects: { visibility: 1, morality: 1 },
          special: 'jim_intel'
        },
        {
          text: 'Listen but do not share — gather without giving',
          result: "You let Jim talk and nod in the right places. He gives freely, glad for an audience. You take the information and offer nothing in return. Jim's face falls slightly as he realizes the exchange is one-sided. He waves goodbye with less enthusiasm.",
          effects: { visibility: 0.5, morality: -0.5 }
        }
      ]
    },
    {
      id: 'info_03',
      category: 'information',
      dayRange: [8, 22],
      prereq: (state) => state.upgrades && state.upgrades.radio_antenna,
      title: 'The CB Broadcast',
      description: "The radio antenna picks up CB chatter for the first time. Voices crackle in and out — truck drivers, ham radio operators, people scanning for news. One voice, clear and methodical, reads off a list of road conditions and relief supply drop points. The nearest drop point is twelve miles north.",
      choices: [
        {
          text: 'Note the information and plan a supply run',
          result: "You map the route and calculate the fuel cost. Twelve miles each way is doable with the vehicle, if you have the fuel. The supply drop could be a game-changer: food, water, medical supplies, and confirmed contact with organized relief.",
          effects: {},
          special: 'supply_drop_intel'
        },
        {
          text: 'Share the frequency with the neighborhood',
          result: "You spread the word about the CB frequency through Jim and the church network. Within two days, several households have rigged antennas. The flow of information improves dramatically. You become a node in an informal intelligence network.",
          effects: { visibility: 2, cohesion: 1, morality: 1 },
          stressEffects: { all: -0.5 }
        }
      ]
    },
    {
      id: 'info_04',
      category: 'information',
      dayRange: [10, 25],
      prereq: null,
      title: 'The Flyer',
      description: "Someone has been distributing photocopied flyers door to door. The text is dense and poorly formatted but the content is specific: a list of edible plants in the area, water purification methods, and basic first aid. At the bottom: KNOWLEDGE IS THE ONLY RESOURCE THAT MULTIPLIES WHEN SHARED.",
      choices: [
        {
          text: 'Study it carefully and apply what you can',
          result: "The wild edibles guide alone is worth the paper it is printed on. You identify three plants in your yard you had been ignoring. The water purification section confirms your methods and adds a technique you had not considered. Somebody out there is trying to help.",
          effects: { food: 0.5 },
          stressEffects: { all: -0.5 },
          special: 'survival_knowledge'
        },
        {
          text: 'It could be disinformation — verify before trusting',
          result: "Caution is warranted. You cross-reference what you can and find most of it checks out. The plant identifications are accurate, the water methods are sound. You keep the flyer but add your own corrections in the margins.",
          effects: {},
          stressEffects: { player: 0.5 }
        }
      ]
    },
    {
      id: 'info_05',
      category: 'information',
      dayRange: [15, 28],
      prereq: null,
      title: 'The Signal Fire',
      description: "After dark, a column of smoke is visible against the stars, maybe two miles north. It is too large and too sustained to be accidental — someone is burning something deliberately, and they want it seen. The glow flickers orange against the low clouds.",
      choices: [
        {
          text: 'Investigate in the morning — it could be a signal for help',
          result: "A dawn reconnaissance reveals the source: a family had burned a shed to signal a helicopter they heard. No helicopter came. The family is dejected but alive. They share information about conditions north of your area. The intelligence is worth the trip.",
          effects: { visibility: 0.5 },
          stressEffects: { all: 0.5 },
          special: 'north_intel'
        },
        {
          text: 'Note the location and stay away — fire draws attention',
          result: "You mark the bearing and distance and file it away. Fire means people, and people mean unpredictability. The practical choice is distance. You watch the glow fade before dawn and tell the family what you saw over breakfast.",
          effects: {},
          stressEffects: { all: 0.3 }
        }
      ]
    },
    {
      id: 'info_06',
      category: 'information',
      dayRange: [20, 30],
      prereq: null,
      title: 'The Helicopter',
      description: "The unmistakable sound of rotor blades cuts through the afternoon quiet. Everyone rushes outside. A military helicopter — Black Hawk, by the silhouette — passes overhead at maybe five hundred feet, heading north. It is the first sign of organized authority in weeks. It does not stop. It does not hover. It passes and the sound fades and the sky is empty again.",
      choices: [
        {
          text: 'Take it as confirmation — they know we are here',
          result: "The helicopter means infrastructure. Radio contact. Chain of command. Someone is assessing the situation from above. It does not change your daily reality, but it changes the horizon. The family's mood lifts measurably.",
          effects: { cohesion: 1 },
          stressEffects: { all: -2 }
        },
        {
          text: 'Do not read too much into it — one helicopter changes nothing',
          result: "You tell the family not to pin hopes on a flyover. One helicopter could mean anything: reconnaissance, transport, or a mission that has nothing to do with your neighborhood. The family's brief excitement fades, replaced by the practical acceptance that has become baseline.",
          effects: {},
          stressEffects: { all: -0.5 }
        },
        {
          text: 'Try to signal it with mirrors or fire',
          result: "By the time you get to the roof with a mirror, the helicopter is a speck on the horizon. The attempt fails, but the reflex — the reach toward rescue — tells you something about where the family's spirit is. Not broken. Still reaching.",
          effects: { visibility: 1 },
          stressEffects: { all: 0.5 }
        }
      ]
    }
  ],

  // ─── EVACUATION GAUNTLET EVENTS (3-event sequence) ───
  evacuationEvents: [
    {
      id: 'evac_01',
      title: 'The Roadblock',
      category: 'security',
      description: "Two miles north, the road is blocked by a jackknifed semi-trailer and a scatter of abandoned cars. A group of people has set up camp around the blockage, using the vehicles as walls. A man with a reflective vest and a clipboard approaches your van as you slow to a stop. He looks tired but organized.",
      choices: [
        {
          text: 'Talk to them — ask about passage',
          result: "The man explains they are charging a toll: fuel or food for passage through the gap they have cleared in the blockade. It is extortion with a veneer of civility. But the gap is real, and the alternative is backtracking miles on dwindling fuel.",
          effects: { food: -2, fuel: -1 },
          gauntletResult: 'pass'
        },
        {
          text: 'Try the back road — avoid the blockade entirely',
          result: "You reverse and take the farm road that runs parallel. It adds three miles and costs fuel, but you pass the blockade without incident. The road is rough and the van protests, but it holds.",
          effects: { fuel: -1.5 },
          gauntletResult: 'pass',
          condition: (state) => state.routeScouted || state.fuel >= 3
        },
        {
          text: 'Bluff through — say you have armed passengers',
          result: "The man stares at you, then at the van windows where your family tries to look intimidating. He steps aside. Whether he bought the bluff or decided you were not worth the trouble, you will never know. The van rolls through the gap with inches to spare.",
          effects: {},
          gauntletResult: 'risky_60'
        },
        {
          text: 'Turn back — this route is too dangerous',
          result: "You make the hard call. The van U-turns on the narrow road. The family watches the blockade shrink in the rearview mirror. You head home with the fuel you have left.",
          effects: { fuel: -1 },
          gauntletResult: 'abort'
        }
      ]
    },
    {
      id: 'evac_02',
      title: 'The Bridge',
      category: 'infrastructure',
      description: "The Millbrook Creek bridge is still standing, but barely. A section of the railing is gone, and the road surface has cracked and shifted. Water runs high below. The van can probably make it across, but slowly. On the far bank, you can see the road continues north, clear and empty.",
      choices: [
        {
          text: 'Cross slowly and carefully',
          result: "You put the van in first gear and crawl across. The bridge groans under the weight. Concrete dust sifts down into the water below. Halfway across, a crack spiders out from under the front tire. Nobody breathes. The van reaches the other side and you do not stop for a quarter mile.",
          effects: {},
          gauntletResult: 'pass'
        },
        {
          text: 'Unload the van first to reduce weight, carry supplies across on foot',
          result: "It takes an hour you do not really have. The family shuttles supplies across the bridge on foot while you drive the lightened van across. The bridge holds. On the other side, you reload and press on. Cautious and slow wins this round.",
          effects: {},
          gauntletResult: 'pass'
        },
        {
          text: 'Find a ford downstream — cross the creek directly',
          result: "The teen spotted a shallow crossing half a mile downstream. The van lurches through eighteen inches of cold creek water, engine straining. For a terrible moment the tires spin on the creek bed. Then they catch, and the van climbs the far bank, dripping and victorious.",
          effects: { fuel: -0.5 },
          gauntletResult: 'risky_70'
        }
      ]
    },
    {
      id: 'evac_03',
      title: 'The Final Miles',
      category: 'stranger',
      description: "Five miles from the FEMA staging area, a family stands in the middle of the road, waving you down. A man, a woman, and two small children. Their car is dead on the shoulder, hood up, steam rising. The woman holds a baby. The man's face is a mask of controlled desperation. They need a ride. Your van is full, but five miles is five miles.",
      choices: [
        {
          text: 'Pick them up — make room somehow',
          result: "You rearrange supplies and bodies until everyone fits, barely. The man sits on the wheel well. The children squeeze in beside your family. Nobody is comfortable. Everyone is alive. The last five miles pass in tense, crowded silence. When the FEMA tents appear on the horizon, the woman in the back seat starts to cry.",
          effects: { morality: 3, generosity: 3 },
          gauntletResult: 'pass'
        },
        {
          text: 'Give them food and water but keep driving',
          result: "You hand over what you can spare through the window. The man takes it with both hands and says nothing. The woman mouths thank you. You pull away and watch them shrink in the mirror, standing on the road with their dead car and their children. Five miles is walkable. It has to be.",
          effects: { food: -1, water: -2, morality: 1 },
          gauntletResult: 'pass'
        },
        {
          text: 'Stop and share your fuel — try to get their car running',
          result: "You pour a gallon of gas into their tank while the man tries the engine. It catches on the third try. The family follows you the rest of the way in their sputtering sedan. At the staging area, the man finds you and grips your hand for a long time without speaking.",
          effects: { fuel: -1, morality: 3, generosity: 2 },
          gauntletResult: 'pass',
          condition: (state) => state.fuel >= 2
        },
        {
          text: 'Drive past — you cannot risk stopping',
          result: "You accelerate past the stranded family. In the rearview mirror, the man lowers his arms. Your family is silent. The teen stares out the window and does not look at you for the rest of the drive.",
          effects: { morality: -2 },
          stressEffects: { teen: 2, player: 1 },
          gauntletResult: 'pass'
        }
      ]
    }
  ],

  // ─── ENDING NARRATIVES ───
  endings: {
    rescued: {
      title: 'Rescued',
      text: "Day 30 dawns gray and quiet. By noon, the sound of diesel engines rumbles down the main road — a National Guard convoy, mud-caked and overloaded. A soldier with a bullhorn walks your street, announcing evacuation centers and supply distribution. Your family stands on the porch, watching the trucks pass. {spouse_name} takes your hand. {teen_name} waves at a soldier and gets a tired thumbs-up in return. {elder_name} sits in the folding chair and says, very quietly: I knew we would make it. You are not sure you did. But you are here. All of you. Together."
    },
    selfsufficient: {
      title: 'Self-Sufficient',
      text: "The convoy arrives on Day 30, but you watch it pass with a different feeling than your neighbors. The garden is producing. The water system works. The security perimeter holds. A National Guard officer asks if you need immediate assistance, and you hear yourself say: we are okay for now, help the people who need it. The officer nods with something like respect. {spouse_name} brings water to the soldiers who stop at your driveway. {teen_name} helps distribute supplies to less-prepared households. You built something here. Not just survival — self-sufficiency. When the infrastructure comes back, you will rejoin it. But you proved you do not need it to stand."
    },
    evacuated: {
      title: 'Evacuated',
      text: "The van rolls north on back roads, every gallon of fuel a prayer and every mile a gift. {spouse_name} navigates from the passenger seat with the hand-drawn map. {teen_name} watches the mirror. {elder_name} sleeps in the back seat, trusting completely. The roadblocks are navigable. The encounters are tense but not fatal. On the second day, you see the FEMA staging area from a hill: rows of tents, generators humming, the American flag hanging limp in the still air. A volunteer in a reflective vest waves you through. The van is running on fumes when you park it. You made it out. Not everyone did."
    },
    fracture: {
      title: 'Group Fracture',
      text: "The breaking point, when it comes, is quieter than you expected. No dramatic confrontation, no single catastrophic event. Just a morning when {spouse_name} will not get out of bed, and {teen_name} is gone — left a note saying they are heading to the church, that they cannot stay here anymore. The elder sits in the kitchen, staring at nothing. The house that was supposed to be a shelter has become a cage. Cohesion was the invisible resource, the one you did not watch closely enough. When it ran out, everything else became meaningless."
    },
    death_all: {
      title: 'Total Loss',
      text: "The house is quiet now. Whatever happened — the slow arithmetic of deprivation, the sudden violence of a world without rules, the accumulation of injuries without treatment — the result is the same. The family photographs on the mantle show four people who believed they could make it through thirty days. The calendar on the wall marks {days_survived} days. Someone will find this house eventually, and they will piece together the story from what remains: the empty cans, the boarded windows, the careful inventory lists in your handwriting. They will know that someone tried."
    },
    deprivation: {
      title: 'Deprivation',
      text: "On the second day without food or water, the human body begins shutting down in a specific, clinical order. But there is nothing clinical about watching it happen to the people you love. The last clear thought you have is that you should have made different choices three days ago, five days ago, from the very beginning. The house holds four people who ran out of everything except time, and time without resources is just a slower clock counting down."
    }
  },

  // ─── DAY 1 OPENING TEXT ───
  openingText: {
    morning: "The power went out 72 hours ago. At first, it seemed like a normal outage — a storm, a blown transformer, something the utility company would fix by morning. Morning came and went. Then a day. Then two. The phone networks went silent on the second day. The water pressure dropped yesterday.\n\nYour neighborhood is quiet in a way it has never been. No hum of air conditioning, no television murmur through open windows, no garage doors rising and falling. Cars sit in driveways with nowhere useful to go. The grocery stores were emptied on day one.\n\nYou have your family. You have your house. You have what was in the pantry and the garage when the world went sideways. Help is supposedly coming — the last radio broadcast before the batteries in your phone died mentioned FEMA and National Guard deployment — but the timeline was vague. Thirty days, maybe. Maybe more.\n\nThirty days. You can do thirty days.\n\nYou gather the family at the kitchen table and take stock of what you have.",
    instructions: "Welcome to Grid Down. Each day has three phases: Morning (assign tasks), Midday (events), and Evening (assessment). Assign your family members to tasks wisely — every choice costs something and gains something. Your goal: survive 30 days until rescue arrives."
  }
};

// Make available globally
if (typeof window !== 'undefined') {
  window.GAME_DATA = GAME_DATA;
}
