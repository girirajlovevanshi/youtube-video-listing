const API_URL = "https://api.freeapi.app/api/v1/public/youtube/videos";
let videos = [];

// Fetch videos from API
async function fetchVideos() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        console.log("API Response:", result); // Debugging output

        // Check for valid data
        if (!result || !result.data || !result.data.data || !Array.isArray(result.data.data)) {
            throw new Error("Invalid data format received from API.");
        }

        videos = result.data.data.map(video => ({
            videoId: video.items.id,
            thumbnail: video.items.snippet.thumbnails.medium.url,
            title: video.items.snippet.title,
            channel: video.items.snippet.channelTitle
        }));

        displayVideos(videos);
    } catch (error) {
        console.error("Error fetching videos:", error.message);
        document.getElementById("video-list").innerHTML = `<p class="error">Failed to load videos. Please try again later.</p>`;
    }
}

// Display videos in the grid
function displayVideos(videoList) {
    const videoListContainer = document.getElementById("video-list");
    videoListContainer.innerHTML = ""; // Clear previous content

    if (!videoList || videoList.length === 0) {
        videoListContainer.innerHTML = `<p class="no-results">No videos found.</p>`;
        return;
    }

    videoList.forEach(({ videoId, thumbnail, title, channel }) => {
        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");

        videoCard.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                <img src="${thumbnail}" alt="${title}">
            </a>
            <h3 title="${title}">${title}</h3>
            <p>${channel}</p>
        `;

        videoListContainer.appendChild(videoCard);
    });
}

// Filter videos based on search input
function filterVideos() {
    const searchTerm = document.getElementById("search").value.trim().toLowerCase();

    const filteredVideos = videos.filter(({ title }) =>
        title.toLowerCase().includes(searchTerm)
    );

    displayVideos(filteredVideos);
}

// Load videos on page load
document.addEventListener("DOMContentLoaded", fetchVideos);