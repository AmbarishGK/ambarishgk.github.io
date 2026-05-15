// Central project data for the site.
// Add new items here and they will automatically appear on Home and Portfolio pages.
//
// HOW TO ADD A NEW PROJECT:
//   1. Copy any block below
//   2. Fill in the fields. Only `id` and `title` are required, everything else is optional.
//   3. Set `featured: true` if you want it on the homepage
//
// FIELDS:
//   id          - unique slug (used internally)
//   title       - project name (displayed as card heading)
//   description - one-liner about the project
//   tech        - array of tech tags shown on the card
//   youtubeId   - YouTube video ID
//   type        - "video" | "short" | "project"
//   github      - full URL to the GitHub repo
//   links       - array of extra links, each with { label, url }
//   featured    - true to show on homepage featured section
//   featuredOnly - true to show ONLY on homepage (not on /portfolio)
//   order       - controls display order (lower = first)

window.PROJECTS = [
  {
    id: "moral",
    title: "MoRAL: VLM for Autonomous Driving and ADAS Reasoning",
    description: "Fine-tuned Cosmos-Reason2-2B on nuScenes for 3D autonomous driving scene reasoning using BEV and radar inputs. Zone F1=0.89, composite score 0.565 vs 0.439 zero-shot 8B. Emergency braking recall improved from 10.8% to 47.8%. Runs at 42 tok/s in 4.61 GB VRAM. IEEE IMC 2026 under review.",
    tech: ["PyTorch", "VLMs", "nuScenes", "BEV", "ADAS", "LoRA", "CUDA", "Python"],
    github: "https://github.com/AmbarishGK",
    links: [
      { label: "HuggingFace", url: "https://huggingface.co/AmbarishGK/moral-v4-nuscenes" }
    ],
    type: "project",
    featured: true,
    featuredOnly: false,
    order: 1
  },
  {
    id: "robotic-oximeter-short",
    title: "Robotic Oximeter Placement (Short)",
    description: "Imitation learning + transformers to control a robotic arm for safe placement.",
    tech: ["Python", "VLM", "Transformers", "LeRobot"],
    youtubeId: "hojM0j5xG-c",
    type: "short",
    featured: true,
    featuredOnly: true,
    order: 2
  },
  {
    id: "robotic-oximeter",
    title: "Robotic Oximeter Placement",
    description: "Imitation learning (ACT) with VLMs to control a multi-DOF arm for safe placement.",
    tech: ["Python", "VLM", "Transformers", "LeRobot"],
    youtubeId: "9QC_FBc9_o8",
    github: "https://github.com/AmbarishGK",
    links: [],
    type: "video",
    featured: false,
    featuredOnly: false,
    order: 3
  },
  {
    id: "sensor-fusion",
    title: "Multi-Modal Sensor Fusion",
    description: "LiDAR + stereo cameras for real-time 3D mapping on NVIDIA Orin. Improved navigation accuracy.",
    tech: ["ROS2", "ORB-SLAM3", "NvBlox", "LiDAR"],
    youtubeId: "9QC_FBc9_o8",
    github: "https://github.com/AmbarishGK/Nvidia-Isaac-ROS",
    links: [],
    type: "project",
    featured: true,
    featuredOnly: false,
    order: 4
  },
  {
    id: "ps5-dualsense-ros2",
    title: "PS5 DualSense ROS2 Wrapper",
    description: "Haptics, sensors, and touchpad for richer humanoid and robot teleoperation. Sub-50ms glass-to-glass latency.",
    tech: ["ROS2", "C++", "Python"],
    github: "https://github.com/AmbarishGK/joy_ps5_ros2",
    links: [],
    type: "project",
    featured: false,
    featuredOnly: false,
    order: 5
  },
  {
    id: "parking-detection",
    title: "Parking Detection",
    description: "YOLOv8 model to detect available parking spaces with around 95% accuracy on PKLot dataset.",
    tech: ["YOLOv8", "TensorFlow"],
    github: "https://github.com/AmbarishGK",
    links: [],
    type: "project",
    featured: false,
    featuredOnly: false,
    order: 6
  },
  {
    id: "iot-trojan-image-scanner",
    title: "IoT Trojan Image Scanner",
    description: "Detects trojanized images through anomaly and file-integrity analysis. Containerized with Docker.",
    tech: ["Python", "OpenCV", "Docker"],
    github: "https://github.com/AmbarishGK/IoT-Trojan-image-scanner",
    links: [],
    type: "project",
    featured: false,
    featuredOnly: false,
    order: 7
  },
  {
    id: "aether-meeting-summarizer",
    title: "Aether: Meeting Summarizer",
    description: "Summarizes meetings, extracts code, and creates action items using LLMs.",
    tech: ["Python", "LLMs"],
    github: "https://github.com/AmbarishGK",
    links: [],
    type: "project",
    featured: false,
    featuredOnly: false,
    order: 8
  },
  {
    id: "zed-jetson",
    title: "ZED Camera 3D Mapping",
    description: "ZED camera integration with Jetson Nano for 3D maps used in autonomous navigation.",
    tech: ["Python", "NVIDIA Jetson", "ZED SDK", "Point Clouds"],
    github: "https://github.com/AmbarishGK/ZED-jetson",
    links: [],
    type: "project",
    featured: false,
    featuredOnly: false,
    order: 9
  },
  {
    id: "therobotsim",
    title: "TheRobotSim: IoT Simulator",
    description: "Open-source hardware-aware unified simulator for IoT devices and robotic agents.",
    tech: ["Go", "HTML", "IoT"],
    github: "https://github.com/AmbarishGK/therobotsim",
    links: [],
    type: "project",
    featured: false,
    featuredOnly: false,
    order: 10
  }
];
