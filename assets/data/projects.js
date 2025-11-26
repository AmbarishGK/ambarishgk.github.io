// Central project + video data for the site.
// Add new items here; they will automatically appear on Home and Portfolio.

window.PROJECTS = [
  {
    id: "robotic-oximeter-short",
    title: "Robotic Oximeter Placement (Shorts)",
    description: "Imitation learning + transformers to control a robotic arm for safe placement.",
    tech: ["Python", "VLM", "Transformers", "LeRobot"],
    youtubeId: "hojM0j5xG-c",
    type: "short",          // vertical short
    featured: true,          // show on Home
    featuredOnly: true,      // only on Home, not in full portfolio grid
    order: 1
  },
  {
    id: "robotic-oximeter",
    title: "Robotic Oximeter Placement",
    description: "Imitation learning (ACT) with VLMs to control a multi-DOF arm for safe placement.",
    tech: ["Python", "VLM", "Transformers", "LeRobot"],
    youtubeId: "9QC_FBc9_o8",
    type: "video",
    featured: false,
    featuredOnly: false,
    order: 2
  },
  {
    id: "sensor-fusion",
    title: "Multi-Modal Sensor Fusion",
    description: "LiDAR + stereo cameras for real-time 3D mapping on NVIDIA Orin; improved navigation accuracy.",
    tech: ["ROS 2", "ORB-SLAM3", "NvBlox", "LiDAR"],
    youtubeId: "9QC_FBc9_o8",
    type: "project",
    featured: true,
    featuredOnly: false,
    order: 3
  },
  {
    id: "parking-detection",
    title: "Parking Detection",
    description: "YOLOv8 model to detect available parking spaces (~95% accuracy on PKLot).",
    tech: ["YOLOv8", "TensorFlow"],
    type: "project",
    featured: true,
    featuredOnly: false,
    order: 4
  },
  {
    id: "ps5-dualsense-ros2",
    title: "PS5 DualSense ROS2 Wrapper",
    description: "Haptics + sensors + touchpad for richer robot teleop.",
    tech: ["ROS 2", "C++", "Python"],
    type: "project",
    featured: false,
    featuredOnly: false,
    order: 5
  },
  {
    id: "iot-trojan-image-scanner",
    title: "IoT Trojan Image Scanner",
    description: "Detects trojanized images via anomaly and file-integrity analysis.",
    tech: ["Python", "OpenCV"],
    type: "project",
    featured: false,
    featuredOnly: false,
    order: 6
  },
  {
    id: "aether-meeting-summarizer",
    title: "Aether — Meeting Summarizer",
    description: "Summarizes meetings, extracts code, and creates action items with LLMs.",
    tech: ["Python", "LLMs"],
    type: "project",
    featured: false,
    featuredOnly: false,
    order: 7
  }
];
