export const options = {
  scales: {
    x: {
      type: "category", // Define the x-axis as categorical
      title: {
        display: true,
        text: "Timestamp",
        font: {
          size: 14,
        },
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Usage %",
        font: {
          size: 14,
        },
      },
      ticks: {
        stepSize: 5, // Customize tick intervals
      },
    },
  },
};
