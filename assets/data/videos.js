// Central video data for the Videos page.
// Add new videos here and they will render automatically with category filtering.
//
// HOW TO ADD A NEW VIDEO:
//   1. Copy any block below
//   2. For regular YouTube videos: set type to "video"
//   3. For YouTube Shorts: set type to "short" (renders in vertical aspect ratio automatically)
//   4. The youtubeId is the part after "v=" in the URL (or after "shorts/" for shorts)
//
// FIELDS:
//   id          - unique slug
//   title       - video title
//   description - short description
//   youtubeId   - YouTube video ID
//   category    - group label for filtering (e.g. "Project Demo", "Tutorial", "Talk")
//   type        - "video" (horizontal 16:9) or "short" (vertical 9:16)

window.VIDEOS = [
    {
        id: "robotic-oximeter-demo",
        title: "Robotic Oximeter Placement: Full Demo",
        description: "Complete walkthrough of imitation learning (ACT) with VLMs for robotic arm control.",
        youtubeId: "9QC_FBc9_o8",
        category: "Project Demo",
        type: "video"
    },
    {
        id: "robotic-oximeter-short",
        title: "Robotic Oximeter: Quick Look",
        description: "Quick 60-second demo of the robotic oximeter placement system.",
        youtubeId: "hojM0j5xG-c",
        category: "Project Demo",
        type: "short"
    },
    {
        id: "sensor-fusion-demo",
        title: "Multi-Modal Sensor Fusion on NVIDIA Orin",
        description: "LiDAR + stereo cameras for real-time 3D mapping and autonomous navigation.",
        youtubeId: "9QC_FBc9_o8",
        category: "Project Demo",
        type: "video"
    }
];

// NOTE: The sensor-fusion-demo currently uses the same youtubeId as the oximeter demo.
// Replace youtubeId with the correct sensor fusion video ID when available.
