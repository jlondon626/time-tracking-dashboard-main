let selectedTimeFrame = "weekly"
let dashboardData = []

const dashboard = document.querySelector(".dashboard")

const previousLabels = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month"
}

fetch("data.json")
    .then((response) => {
        if(!response.ok) {
            throw new Error("Could not fetch data")
        }
        return response.json()
    })
    .then((data) => {
        dashboardData = data;
        renderDashboard(selectedTimeFrame)
    })
    .catch((error) => {
        console.log(error)
    });
    
const removeArticles = () => {
    const timeTrackingContainers = document.querySelectorAll(".time-tracking");
    timeTrackingContainers.forEach((container) => {
        container.remove();
    });
}

const createTimeTrackingCard = (item, timeframePeriod) => {
    const timeTrackingContainer = document.createElement("article");
    const itemSlug = item.title.toLowerCase().replace(/\s+/g, "-");

    timeTrackingContainer.classList.add("time-tracking", `time-tracking-${itemSlug}`);

    
    timeTrackingContainer.innerHTML = `
    <img src="assets/images/icon-${itemSlug}.svg" alt="">
    <div class="time-tracking__content">
    <div class="time-tracking__header">
    <h2>${item.title}</h2>
    <button aria-label="More options"><img src="assets/images/icon-ellipsis.svg" alt=""></button>
    </div>
    <div class="time-tracking__hours">
    <h1 class="current">${item.timeframes[timeframePeriod].current}hrs</h1>
    <p class="previous">${previousLabels[timeframePeriod]} - ${item.timeframes[timeframePeriod].previous}hrs</p>
    </div>
    </div>
    </article>
    `;
    
    dashboard.appendChild(timeTrackingContainer);
}

function renderDashboard(timeFrame) {
        removeArticles();
        for (const item of dashboardData) {
            createTimeTrackingCard(item, timeFrame)
        }
    }

const timeframeButtons = document.querySelectorAll("[data-timeframe]");

timeframeButtons.forEach((timeFrameButton) => {
    timeFrameButton.addEventListener('click', () => {
        for (const button of timeframeButtons) {
            button.classList.remove('active')
        }

        timeFrameButton.classList.add('active');
        selectedTimeFrame = timeFrameButton.dataset.timeframe;
        renderDashboard(selectedTimeFrame);
    })
});