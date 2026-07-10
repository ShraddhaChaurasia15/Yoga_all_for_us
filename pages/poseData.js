const yogaPoses = [
    {
        id: "mountain",
        name: "Mountain Pose",
        sanskrit: "Tadasana",
        level: "Beginner",
        duration: "20 sec",
        calories: "4 kcal",
        image: "assets/mountain.jpg",
        rating: 4.5,
        description: "A basic standing pose that improves posture, balance, and core stability.",
        benefits: [
            "Improves posture",
            "Builds balance",
            "Strengthens legs",
            "Firms abdomen"
        ],
        instructions: [
            "Stand tall with your feet together, big toes touching, and heels slightly apart.",
            "Distribute your weight evenly on both feet.",
            "Relax your shoulders down and back, opening your chest.",
            "Keep your arms hanging naturally by your sides, palms facing forward.",
            "Breathe deeply and hold the posture."
        ],
        mistakes: [
            "Locking the knees",
            "Shrugging shoulders",
            "Leaning forward or backward",
            "Arching the lower back too much"
        ],
        muscles: [
            "Quadriceps",
            "Core",
            "Ankles",
            "Calves"
        ]
    },
    {
        id: "tree",
        name: "Tree Pose",
        sanskrit: "Vrikshasana",
        level: "Beginner",
        duration: "30 sec",
        calories: "5 kcal",
        image: "assets/tree.jpg",
        rating: 4.6,
        description: "A balancing pose that develops focus, stability, and strengthens the legs.",
        benefits: [
            "Improves concentration",
            "Strengthens legs",
            "Opens hips",
            "Enhances ankle stability"
        ],
        instructions: [
            "Start standing tall in Mountain Pose.",
            "Shift your weight to your left foot and bend your right knee.",
            "Place the sole of your right foot on your inner left thigh or calf (avoid the knee joint).",
            "Bring your hands together at your chest, or extend them overhead.",
            "Find a focal point on the wall to help maintain your balance."
        ],
        mistakes: [
            "Placing the foot directly on the knee joint",
            "Leaning the torso to one side",
            "Holding your breath while balancing",
            "Letting the hips sink to the side"
        ],
        muscles: [
            "Ankles",
            "Calves",
            "Quadriceps",
            "Core"
        ]
    },
    {
        id: "warrior1",
        name: "Warrior I",
        sanskrit: "Virabhadrasana I",
        level: "Beginner",
        duration: "30 sec",
        calories: "8 kcal",
        image: "assets/warrior1.jpeg",
        rating: 4.8,
        description: "Warrior I strengthens the legs, opens the chest, improves balance, and increases stamina.",
        benefits: [
            "Strengthens legs",
            "Improves posture",
            "Opens hips",
            "Improves balance"
        ],
        instructions: [
            "Stand straight in Mountain Pose.",
            "Step one foot backward (about 3-4 feet) and turn it out slightly.",
            "Bend your front knee directly over your front ankle.",
            "Raise both hands overhead, keeping your arms straight.",
            "Keep your spine straight and gaze forward."
        ],
        mistakes: [
            "Front knee crossing over the toes",
            "Back heel lifting off the floor",
            "Bending the elbows",
            "Leaning forward too much"
        ],
        muscles: [
            "Quadriceps",
            "Hamstrings",
            "Core",
            "Shoulders"
        ]
    },
    {
        id: "warrior2",
        name: "Warrior II",
        sanskrit: "Virabhadrasana II",
        level: "Beginner",
        duration: "30 sec",
        calories: "8 kcal",
        image: "assets/warrior2.jpeg",
        rating: 4.8,
        description: "A standing pose that strengthens the legs, stretches the hips, and builds focus.",
        benefits: [
            "Builds endurance",
            "Improves posture",
            "Strengthens thighs",
            "Stretches shoulders"
        ],
        instructions: [
            "Step your feet wide apart, about 4 feet.",
            "Turn your right foot out 90 degrees and your left foot in slightly.",
            "Bend your right knee directly over your right ankle, making your thigh parallel to the floor.",
            "Extend your arms out to the sides, parallel to the floor, palms facing down.",
            "Turn your head and gaze out over your right fingers."
        ],
        mistakes: [
            "Front knee collapsing inwards",
            "Leaning the torso too far forward",
            "Dropping the back arm below shoulder height",
            "Arching the lower back"
        ],
        muscles: [
            "Quadriceps",
            "Hamstrings",
            "Glutes",
            "Shoulders"
        ]
    },
    {
        id: "downwarddog",
        name: "Downward Dog",
        sanskrit: "Adho Mukha Svanasana",
        level: "Beginner",
        duration: "25 sec",
        calories: "6 kcal",
        image: "assets/downward_dog.jpeg",
        rating: 4.7,
        description: "A core full-body stretch that energizes the body, stretches the calves and hamstrings.",
        benefits: [
            "Stretches back",
            "Strengthens shoulders",
            "Lengthens calves",
            "Calms the brain"
        ],
        instructions: [
            "Start on your hands and knees, with hands shoulder-width apart.",
            "Exhale and lift your knees off the floor, pushing your hips up and back.",
            "Form an inverted V-shape with your body.",
            "Press your palms firmly into the mat and extend your spine.",
            "Keep your head and neck relaxed between your arms."
        ],
        mistakes: [
            "Rounding the back instead of flattening it",
            "Shrugging shoulders towards the ears",
            "Locking the knee joints out",
            "Shifting too much weight forward onto hands"
        ],
        muscles: [
            "Hamstrings",
            "Calves",
            "Shoulders",
            "Core"
        ]
    },
    {
        id: "cobra",
        name: "Cobra Pose",
        sanskrit: "Bhujangasana",
        level: "Intermediate",
        duration: "20 sec",
        calories: "6 kcal",
        image: "assets/cobra.jpeg",
        rating: 4.6,
        description: "A gentle backbend that opens the chest, throat, and shoulders while strengthening the back.",
        benefits: [
            "Strengthens spine",
            "Improves posture",
            "Stretches chest",
            "Stimulates abdomen"
        ],
        instructions: [
            "Lie flat on your stomach with legs straight behind you.",
            "Place your hands flat under your shoulders, elbows close to your sides.",
            "Press your feet and thighs firmly into the floor.",
            "Inhale and lift your chest off the floor, straightening your arms slightly.",
            "Keep your shoulders relaxed down, away from your ears."
        ],
        mistakes: [
            "Lifting hips completely off the floor",
            "Locking elbows out completely and shrugging",
            "Straining the back of the neck",
            "Allowing knees to splay out too wide"
        ],
        muscles: [
            "Erector Spinae",
            "Shoulders",
            "Glutes",
            "Chest"
        ]
    },
    {
        id: "triangle",
        name: "Triangle Pose",
        sanskrit: "Trikonasana",
        level: "Intermediate",
        duration: "30 sec",
        calories: "7 kcal",
        image: "assets/triangle.jpeg",
        rating: 4.5,
        description: "A classic standing pose that stretches the legs and spine, opening the chest.",
        benefits: [
            "Improves flexibility",
            "Strengthens core",
            "Stretches hamstrings",
            "Stimulates organs"
        ],
        instructions: [
            "Stand with your feet wide apart, about 3.5 to 4 feet.",
            "Turn your right foot out 90 degrees and left foot in 15 degrees.",
            "Extend your arms out to the sides, shoulder height.",
            "Bend sideways at the hips, reaching down to rest your right hand on your shin, ankle, or floor.",
            "Extend your left arm straight up toward the ceiling, looking at your left thumb."
        ],
        mistakes: [
            "Bending the front knee",
            "Collapsing the chest forward instead of keeping it open",
            "Straining the neck to look up",
            "Locking the hip joints out rigidly"
        ],
        muscles: [
            "Hamstrings",
            "Obliques",
            "Chest",
            "Adductors"
        ]
    },
    {
        id: "bridge",
        name: "Bridge Pose",
        sanskrit: "Setu Bandhasana",
        level: "Intermediate",
        duration: "25 sec",
        calories: "7 kcal",
        image: "assets/bridge.jpeg",
        rating: 4.7,
        description: "A restorative backbend that opens the chest, stretches the spine, and strengthens the legs.",
        benefits: [
            "Strengthens glutes",
            "Opens chest",
            "Calms nervous system",
            "Stretches spine"
        ],
        instructions: [
            "Lie flat on your back, knees bent, feet flat on the floor.",
            "Keep your feet hip-width apart and close to your buttocks.",
            "Press your arms and feet firmly into the floor.",
            "Inhale and lift your hips up toward the ceiling.",
            "Clasp your hands underneath your back and roll your shoulders under."
        ],
        mistakes: [
            "Allowing the knees to splay out to the sides",
            "Lifting the toes or heels off the floor",
            "Squeezing the glutes too intensely",
            "Squeezing the chin hard against the chest"
        ],
        muscles: [
            "Glutes",
            "Hamstrings",
            "Lower Back",
            "Core"
        ]
    },
    {
        id: "camel",
        name: "Camel Pose",
        sanskrit: "Ustrasana",
        level: "Advanced",
        duration: "20 sec",
        calories: "8 kcal",
        image: "assets/camel.jpeg",
        rating: 4.8,
        description: "An advanced backbend that opens the entire front body, stretching chest and hip flexors.",
        benefits: [
            "Improves flexibility",
            "Opens chest",
            "Strengthens back",
            "Stretches abdomen"
        ],
        instructions: [
            "Kneel on the floor with knees hip-width apart and hips stacked over knees.",
            "Place your hands on your lower back, fingers pointing downward.",
            "Inhale, lift your chest, and begin to arch your spine backward.",
            "Gently reach down and grasp your heels with your hands.",
            "Push your hips forward to keep them aligned over your knees, and let your head drop back."
        ],
        mistakes: [
            "Squeezing the glutes too tightly, compressing lower back",
            "Letting the hips collapse backward behind the knees",
            "Forcing the head back too quickly, straining neck",
            "Holding your breath"
        ],
        muscles: [
            "Quadriceps",
            "Core",
            "Pectorals",
            "Spinal Extensors"
        ]
    },
    {
        id: "crow",
        name: "Crow Pose",
        sanskrit: "Bakasana",
        level: "Advanced",
        duration: "15 sec",
        calories: "9 kcal",
        image: "assets/crow.jpeg",
        rating: 4.9,
        description: "An arm-balancing pose that builds arm, shoulder, wrist, and core strength.",
        benefits: [
            "Strengthens arms",
            "Improves balance",
            "Fosters mental focus",
            "Builds core strength"
        ],
        instructions: [
            "Start in a low squat position with feet together, knees apart.",
            "Place your hands flat on the floor, shoulder-width apart.",
            "Place your knees against the backs of your upper arms, close to the armpits.",
            "Lean forward, shifting your weight onto your hands and lifting your hips.",
            "Slowly lift one foot, then the other off the floor, bringing your toes together."
        ],
        mistakes: [
            "Placing hands too wide or too close together",
            "Looking down at your hands instead of slightly forward",
            "Jumping to lift feet rather than shifting weight smoothly",
            "Allowing elbows to splay out to the sides"
        ],
        muscles: [
            "Triceps",
            "Shoulders",
            "Core",
            "Wrists"
        ]
    }
];

const poseAngles = {
    warrior2: {
        leftElbow: 175,
        rightElbow: 175,
        leftShoulder: 90,
        rightShoulder: 90,
        leftHip: 170,
        rightHip: 170,
        leftKnee: 90,
        rightKnee: 175
    },
    warrior1: {
        leftElbow: 175,
        rightElbow: 175,
        leftShoulder: 170,
        rightShoulder: 170,
        leftHip: 170,
        rightHip: 170,
        leftKnee: 90,
        rightKnee: 175
    },
    mountain: {
        leftElbow: 180,
        rightElbow: 180,
        leftShoulder: 180,
        rightShoulder: 180,
        leftHip: 180,
        rightHip: 180,
        leftKnee: 180,
        rightKnee: 180
    },
    tree: {
        leftElbow: 170,
        rightElbow: 170,
        leftShoulder: 170,
        rightShoulder: 170,
        leftHip: 180,
        rightHip: 45,
        leftKnee: 180,
        rightKnee: 45
    },
    cobra: {
        leftElbow: 170,
        rightElbow: 170,
        leftShoulder: 120,
        rightShoulder: 120,
        leftHip: 165,
        rightHip: 165,
        leftKnee: 180,
        rightKnee: 180
    },
    bridge: {
        leftElbow: 170,
        rightElbow: 170,
        leftShoulder: 170,
        rightShoulder: 170,
        leftHip: 150,
        rightHip: 150,
        leftKnee: 90,
        rightKnee: 90
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { yogaPoses, poseAngles };
}